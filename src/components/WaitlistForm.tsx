'use client';

import { useRef, useState } from 'react';

/* Mirror the server-side caps so the UI fails fast and identically. */
const LIMITS = {
  name: 80,
  email: 120,
  interest: 400,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'ok'; msg: string }
  | { state: 'error'; msg: string };

type Fields = { name: string; email: string; interest: string };

export default function WaitlistForm() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', interest: '' });
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const [emailError, setEmailError] = useState<string | undefined>();
  const [attempted, setAttempted] = useState(false);

  // Honeypot + time-trap: bots fill hidden fields and submit instantly.
  const honeypotRef = useRef<HTMLInputElement>(null);
  const mountedAt = useRef<number>(Date.now());
  const emailRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Fields, max: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, max);
    setFields((f) => ({ ...f, [k]: value }));
    // Typing may correct an error already on screen, but must not raise a new
    // one mid-word — before a submit attempt that's blur's job.
    if (k === 'email' && (attempted || emailError)) {
      setEmailError(EMAIL_RE.test(value.trim()) ? undefined : 'A reachable email, please.');
    }
  };

  const onEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (!value && !attempted) return;
    setEmailError(EMAIL_RE.test(value) ? undefined : 'A reachable email, please.');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.state === 'submitting') return;

    setAttempted(true);

    if (!EMAIL_RE.test(fields.email.trim())) {
      setEmailError('A reachable email, please.');
      emailRef.current?.focus();
      return;
    }
    setEmailError(undefined);
    setStatus({ state: 'submitting' });

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          interest: fields.interest.trim(),
          company: honeypotRef.current?.value ?? '',
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok) {
        setStatus({
          state: 'ok',
          msg: "You're on the list. I'll email you when the first track opens — no drip campaign, no noise.",
        });
        setFields({ name: '', email: '', interest: '' });
        setAttempted(false);
        return;
      }

      setStatus({
        state: 'error',
        msg: data?.error ?? 'Signup failed. Email academy@zephryx.in directly.',
      });
    } catch {
      setStatus({
        state: 'error',
        msg: 'Network error. The channel may be offline — reach me at academy@zephryx.in.',
      });
    }
  };

  const disabled = status.state === 'submitting';

  return (
    <form onSubmit={onSubmit} noValidate className="panel clip-corner relative overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line bg-elevated/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-blood/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
        <span className="ml-3 font-mono text-[11px] tracking-wide text-ink-faint">
          zephryx@academy — ./enroll --waitlist
        </span>
      </div>

      <div className="space-y-5 p-6 sm:p-8">
        {/* honeypot — visually hidden, off the a11y tree, off tab order */}
        <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company">Company (leave blank)</label>
          <input ref={honeypotRef} id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <LabelRow htmlFor="name" label="name" hint="optional" />
            <input
              id="name"
              name="name"
              type="text"
              value={fields.name}
              onChange={set('name', LIMITS.name)}
              maxLength={LIMITS.name}
              disabled={disabled}
              autoComplete="name"
              spellCheck={false}
              className="w-full border border-line bg-void/70 px-3.5 py-2.5 font-mono text-[13.5px] text-ink placeholder:text-ink-faint focus:border-red-deep/70 focus:outline-none disabled:opacity-60"
            />
          </div>

          <div>
            <LabelRow htmlFor="email" label="email" hint="you@domain" />
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              value={fields.email}
              onChange={set('email', LIMITS.email)}
              onBlur={onEmailBlur}
              maxLength={LIMITS.email}
              disabled={disabled}
              required
              autoComplete="email"
              spellCheck={false}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'email-error' : undefined}
              className="w-full border border-line bg-void/70 px-3.5 py-2.5 font-mono text-[13.5px] text-ink placeholder:text-ink-faint focus:border-red-deep/70 focus:outline-none disabled:opacity-60"
            />
            {emailError ? (
              <p id="email-error" className="mt-1.5 font-mono text-[12px] text-red-blood">
                ! {emailError}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <LabelRow htmlFor="interest" label="what do you want to learn?" hint={`${fields.interest.length} / ${LIMITS.interest}`} />
          <textarea
            id="interest"
            name="interest"
            rows={3}
            value={fields.interest}
            onChange={set('interest', LIMITS.interest)}
            maxLength={LIMITS.interest}
            disabled={disabled}
            spellCheck
            placeholder="Optional — but it genuinely shapes which track I build first."
            className="w-full resize-y border border-line bg-void/70 p-3.5 font-mono text-[13.5px] leading-relaxed text-ink placeholder:text-ink-faint focus:border-red-deep/70 focus:outline-none disabled:opacity-60"
          />
        </div>

        {/* Both regions stay mounted so assistive tech is already watching them
            when the result lands — a live region injected at the same moment as
            its text is routinely missed. */}
        <div
          role="status"
          className="empty:m-0 border border-signal/30 bg-signal/5 px-4 py-3 font-mono text-[13px] text-signal empty:border-0 empty:p-0"
        >
          {status.state === 'ok' ? (
            <>
              <span className="mr-1">[OK]</span> {status.msg}
            </>
          ) : null}
        </div>
        <div
          role="alert"
          className="empty:m-0 border border-red-deep/40 bg-red-ash/10 px-4 py-3 font-mono text-[13px] text-red-blood empty:border-0 empty:p-0"
        >
          {status.state === 'error' ? (
            <>
              <span className="mr-1">[ERR]</span> {status.msg}
            </>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-ink-faint">
            <span className="text-red-blood/70"># </span>
            no spam · no trackers · unsubscribe anytime
          </p>
          <button
            type="submit"
            disabled={disabled}
            className="clip-tab inline-flex items-center gap-2 border border-red-deep bg-red-core px-7 py-3 font-mono text-sm font-medium text-void transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(255,45,75,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {disabled ? (
              <>
                <span className="animate-blink">▌</span> sending…
              </>
            ) : (
              <>./join</>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

function LabelRow({ htmlFor, label, hint }: { htmlFor: string; label: string; hint?: string }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="font-mono text-[12px] tracking-wide text-ink-dim">
        <span className="text-red-blood/70">$</span> {label}
      </label>
      {hint ? <span className="font-mono text-[10px] text-ink-faint">{hint}</span> : null}
    </div>
  );
}
