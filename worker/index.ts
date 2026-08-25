/**
 * academy.zephryx.in — Cloudflare Worker entrypoint.
 *
 * The site is a static Next.js export (`next build` -> ./out) served by Workers
 * Static Assets. This script handles the one thing static assets can't: the
 * /api/waitlist endpoint.
 *
 * wrangler.jsonc sets run_worker_first: true, so every request reaches fetch()
 * below. Anything that isn't /api/* falls straight through to
 * env.ASSETS.fetch(), which serves the static build (including out/404.html for
 * unmatched routes, and out/_headers).
 *
 * Security posture for /api/waitlist:
 *  - same-origin only (Origin/Referer checked against the deployment host)
 *  - strict body-size cap + per-field length caps + type checks
 *  - honeypot field + submission time-trap (bots fill hidden fields, submit fast)
 *  - optional KV-backed IP rate limit when the WAITLIST_RL namespace is bound
 *  - signups persisted to KV when WAITLIST is bound, so a mail outage can't
 *    silently drop someone who signed up
 *  - all user content HTML-escaped before it ever reaches the email body
 *  - never reflects secrets; generic errors to the client, details to console
 *
 * Required environment (Worker → Settings → Variables and Secrets):
 *  - RESEND_API_KEY   (secret)  Resend API key
 *  - WAITLIST_TO      inbox that receives signups     e.g. academy@zephryx.in
 *  - WAITLIST_FROM    verified Resend sender          e.g. "Zephryx Academy <noreply@mail.zephryx.in>"
 * Optional:
 *  - WAITLIST         KV namespace binding storing the signup list
 *  - WAITLIST_RL      KV namespace binding for rate limiting
 */

interface KVLike {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string, opts?: { expirationTtl?: number }) => Promise<void>;
}

interface AssetsFetcher {
  fetch: (input: Request | URL | string) => Promise<Response>;
}

interface Env {
  ASSETS: AssetsFetcher;
  RESEND_API_KEY?: string;
  WAITLIST_TO?: string;
  WAITLIST_FROM?: string;
  WAITLIST?: KVLike;
  WAITLIST_RL?: KVLike;
}

type Body = {
  name?: unknown;
  email?: unknown;
  interest?: unknown;
  company?: unknown; // honeypot
  elapsedMs?: unknown;
};

const LIMITS = {
  name: 80,
  email: 120,
  interest: 400,
  bodyBytes: 8 * 1024,
  minElapsedMs: 2000,
  rlWindowSec: 3600,
  rlMax: 5,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;',
  );

const str = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/waitlist' || url.pathname === '/api/waitlist/') {
      if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed.' }, 405);
      return handleWaitlist(request, env);
    }

    if (url.pathname.startsWith('/api/')) {
      return json({ ok: false, error: 'Not found.' }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleWaitlist(request: Request, env: Env): Promise<Response> {
  // --- origin check -------------------------------------------------------
  const host = request.headers.get('host') ?? '';
  const sameSite = (val: string | null): boolean => {
    if (!val) return false;
    try {
      return new URL(val).host === host;
    } catch {
      return false;
    }
  };
  if (!(sameSite(request.headers.get('origin')) || sameSite(request.headers.get('referer')))) {
    return json({ ok: false, error: 'Bad origin.' }, 403);
  }

  // --- size guard ---------------------------------------------------------
  if (Number(request.headers.get('content-length') ?? '0') > LIMITS.bodyBytes) {
    return json({ ok: false, error: 'Payload too large.' }, 413);
  }

  // --- parse --------------------------------------------------------------
  let body: Body;
  try {
    const raw = await request.text();
    if (raw.length > LIMITS.bodyBytes) return json({ ok: false, error: 'Payload too large.' }, 413);
    body = JSON.parse(raw) as Body;
  } catch {
    return json({ ok: false, error: 'Malformed request.' }, 400);
  }

  const name = str(body.name, LIMITS.name);
  const email = str(body.email, LIMITS.email);
  const interest = str(body.interest, LIMITS.interest);
  const honeypot = str(body.company, 100);
  const elapsedMs = typeof body.elapsedMs === 'number' ? body.elapsedMs : 0;

  // --- silent bot rejection ----------------------------------------------
  if (honeypot.length > 0 || (elapsedMs > 0 && elapsedMs < LIMITS.minElapsedMs)) {
    return json({ ok: true });
  }

  // --- validation ---------------------------------------------------------
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: 'A valid email is required.' }, 422);

  if (!(await domainAcceptsMail(email))) {
    return json(
      { ok: false, error: "That email domain doesn't appear to accept mail — check for a typo." },
      422,
    );
  }

  // --- rate limit (optional, KV-backed) ----------------------------------
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  if (env.WAITLIST_RL) {
    const key = `rl:${ip}`;
    const count = Number((await env.WAITLIST_RL.get(key)) ?? '0');
    if (count >= LIMITS.rlMax) {
      return json({ ok: false, error: 'Too many signups. Try again later.' }, 429);
    }
    await env.WAITLIST_RL.put(key, String(count + 1), { expirationTtl: LIMITS.rlWindowSec });
  }

  // --- persist ------------------------------------------------------------
  // Stored under the lowercased address so a re-signup updates in place rather
  // than creating a duplicate. This is the durable record; the email below is
  // only a notification, so a mail failure must not lose the signup.
  let stored = false;
  if (env.WAITLIST) {
    try {
      await env.WAITLIST.put(
        `sub:${email.toLowerCase()}`,
        JSON.stringify({ name, email, interest, at: new Date().toISOString() }),
      );
      stored = true;
    } catch (e) {
      console.error('waitlist kv put failed', e);
    }
  }

  // --- notify --------------------------------------------------------------
  if (!env.RESEND_API_KEY || !env.WAITLIST_TO || !env.WAITLIST_FROM) {
    console.error('waitlist: missing RESEND_API_KEY / WAITLIST_TO / WAITLIST_FROM');
    // A stored signup is the outcome that matters; don't fail the visitor for a
    // notification channel they can't see and didn't ask about.
    if (stored) return json({ ok: true });
    return json(
      { ok: false, error: 'Signup channel not configured. Email academy@zephryx.in directly.' },
      503,
    );
  }

  const html = renderEmail({ name, email, interest, ip });
  const text = `New waitlist signup\n\nName: ${name || '(not given)'}\nEmail: ${email}\nIP: ${ip}\n\nInterest:\n${interest || '(none)'}`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.WAITLIST_FROM,
        to: [env.WAITLIST_TO],
        reply_to: email,
        subject: `[academy] waitlist signup — ${email}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('resend error', res.status, detail);
      if (stored) return json({ ok: true });
      return json({ ok: false, error: 'Signup failed. Please email academy@zephryx.in.' }, 502);
    }
  } catch (e) {
    console.error('resend fetch failed', e);
    if (stored) return json({ ok: true });
    return json({ ok: false, error: 'Signup failed. Please email academy@zephryx.in.' }, 502);
  }

  return json({ ok: true });
}

/**
 * Confirms the email's domain can plausibly receive mail at all, catching typos
 * and made-up domains without claiming to verify the specific mailbox. Checks
 * MX first, then falls back to A/AAAA per RFC 5321 (a domain with no MX can
 * still receive mail at its host record).
 *
 * Fails open on lookup errors — "the resolver didn't answer" is not the same
 * finding as "the domain has no records", and only the second one justifies
 * turning a visitor away. So anything short of a definitive answer throws and
 * lands in the catch, rather than being read as an absent record.
 */
async function domainAcceptsMail(email: string): Promise<boolean> {
  const domain = email.split('@')[1];
  if (!domain) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  /** True/false only on a definitive answer; throws when the lookup failed. */
  const hasRecords = async (type: 'MX' | 'A' | 'AAAA'): Promise<boolean> => {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
      { headers: { accept: 'application/dns-json' }, signal: controller.signal },
    );
    if (!res.ok) throw new Error(`resolver http ${res.status}`);

    const data = (await res.json()) as { Answer?: unknown[]; Status?: number };
    // RFC 1035 RCODEs: 0 NOERROR, 3 NXDOMAIN. Both are definitive; every other
    // code (SERVFAIL and friends) is the resolver failing, not an answer.
    if (data.Status === 3) return false;
    if (data.Status !== 0) throw new Error(`resolver rcode ${data.Status}`);

    return Array.isArray(data.Answer) && data.Answer.length > 0;
  };

  try {
    if (await hasRecords('MX')) return true;
    if (await hasRecords('A')) return true;
    return await hasRecords('AAAA');
  } catch (e) {
    console.error('dns check failed, allowing signup', e);
    return true;
  } finally {
    clearTimeout(timeout);
  }
}

function renderEmail(v: { name: string; email: string; interest: string; ip: string }): string {
  const n = escapeHtml(v.name || '(not given)');
  const e = escapeHtml(v.email);
  const i = escapeHtml(v.interest || '(none)').replace(/\n/g, '<br>');
  const ip = escapeHtml(v.ip);
  return `<!doctype html>
<html>
  <body style="margin:0;background:#06070a;font-family:ui-monospace,Menlo,monospace;color:#e8ebef;padding:24px">
    <table role="presentation" style="max-width:560px;margin:0 auto;border:1px solid #1c2230;background:#0a0c11">
      <tr><td style="border-bottom:1px solid #1c2230;padding:14px 20px;color:#ff2d4b;font-weight:bold">
        academy.zephryx.in — waitlist signup
      </td></tr>
      <tr><td style="padding:20px">
        <p style="margin:0 0 6px"><span style="color:#5c6675">name</span> ${n}</p>
        <p style="margin:0 0 6px"><span style="color:#5c6675">email</span> ${e}</p>
        <p style="margin:0 0 16px"><span style="color:#5c6675">ip</span> ${ip}</p>
        <div style="border-top:1px solid #1c2230;padding-top:16px;line-height:1.7;color:#98a1af">
          <span style="color:#5c6675">wants to learn</span><br>${i}
        </div>
      </td></tr>
    </table>
  </body>
</html>`;
}
