# Deploying academy.zephryx.in

The site is a static Next.js export (`out/`) served by a Cloudflare Worker that
also answers `/api/waitlist`. This is a **separate Worker** from `zephryx-in` —
the two deploy independently on purpose.

## 1. First deploy

```bash
npm install
npx wrangler login      # once per machine
npm run deploy          # next build + wrangler deploy
```

That creates a Worker named `zephryx-academy` and uploads `out/` as its static
assets. It will be live on its `*.workers.dev` URL immediately.

## 2. Custom domain

In the Cloudflare dashboard: **Workers & Pages → zephryx-academy → Settings →
Domains & Routes → Add → Custom domain**, and enter `academy.zephryx.in`.

Cloudflare creates the DNS record itself — you do not need to add a CNAME by
hand, and you should not, because a manually created record will conflict with
the one the Worker binding wants.

`zephryx.in` must already be on Cloudflare nameservers (it is — the main site
runs there), so no nameserver change is involved.

## 3. Secrets and variables

The waitlist endpoint needs a mail sender. Set the secret from the CLI:

```bash
npx wrangler secret put RESEND_API_KEY
```

The two non-secret values are already in `wrangler.jsonc` and deploy with the
Worker:

| Variable        | Value                                          |
| --------------- | ---------------------------------------------- |
| `WAITLIST_TO`   | `academy@zephryx.in`                           |
| `WAITLIST_FROM` | `Zephryx Academy <noreply@mail.zephryx.in>`    |

`WAITLIST_FROM` must be a sender on a domain verified in Resend. `mail.zephryx.in`
is already verified for the main site's contact form, so this reuses it.

If `academy@zephryx.in` does not exist yet, create it (or point it at whatever
inbox you actually read) before the first signup arrives.

## 4. Optional: KV namespaces

Both are optional and the endpoint degrades cleanly without them, but the
signup list is worth having — it is the durable record, and the email is only a
notification.

```bash
npx wrangler kv namespace create WAITLIST
npx wrangler kv namespace create WAITLIST_RL
```

Each command prints an `id`. Add them to `wrangler.jsonc`:

```jsonc
"kv_namespaces": [
  { "binding": "WAITLIST", "id": "<id from the first command>" },
  { "binding": "WAITLIST_RL", "id": "<id from the second command>" }
]
```

- **`WAITLIST`** — stores each signup under `sub:<lowercased email>`, so a
  re-signup updates in place instead of duplicating. With this bound, a Resend
  outage no longer loses a signup: the Worker stores first, mails second, and
  returns success if the store succeeded.
- **`WAITLIST_RL`** — IP rate limit, 5 signups per hour. Without it the endpoint
  still has the origin check, the size caps, the honeypot and the time-trap, but
  no per-IP ceiling.

Read the list back with:

```bash
npx wrangler kv key list --binding WAITLIST
```

## 5. Verifying

```bash
curl -I https://academy.zephryx.in/                    # 200, security headers present
curl -I https://academy.zephryx.in/nope/               # 404 from out/404.html
curl -X GET https://academy.zephryx.in/api/waitlist    # 405
curl -X POST https://academy.zephryx.in/api/waitlist \
  -H 'content-type: application/json' -d '{}'          # 403 — no Origin header
```

The last one returning 403 is the point: the endpoint only accepts same-origin
submissions, so a bare `curl` is supposed to be rejected. Test the real path by
submitting the form on the live site.

## Notes

- `public/_headers` carries the CSP and the rest of the security headers, applied
  at the edge to every static asset. Adding an external script, font or analytics
  origin means widening that policy — `default-src 'self'` blocks it otherwise.
- The Worker runs first on every request (`run_worker_first: true`). Anything
  that is not `/api/*` falls straight through to the static assets.
- To roll back, `npx wrangler rollback` or redeploy from an earlier commit. The
  static assets are versioned with the Worker.
