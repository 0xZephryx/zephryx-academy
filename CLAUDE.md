# Working notes for this repo

Next.js 15 App Router, static export (`out/`) served by Cloudflare Workers.
Sibling of `zephryx.in` and deliberately a separate Worker — the two deploy
independently so a bad push here can't take the main site down.

This is still **pre-launch** for the paid tracks: no course content is
published and the waitlist is the only thing that collects a lead. The one
exception is `/cheatsheets/` — free quick-reference PDFs, migrated over from
`zephryx.in` so all study material lives on this domain. Free stays free; that
migration is not a preview of the paid tracks.

## Where things live

- `src/lib/site.ts` is the single source of truth for identity, nav and the
  track list. Nothing else should hardcode a link, an email address or a course
  name. Announcing a track as open is a `status` change in that file.
- `content/cheatsheets/` + `src/lib/cheatsheets.ts` are the cheatsheets
  pipeline, ported from `zephryx.in`'s: frontmatter-only `.md` files, each
  naming a PDF under `public/cheatsheets/`. The build throws if a cheatsheet's
  `file` field is malformed or the PDF is missing — the build is the
  validator, same rule as the sibling repo. `CheatsheetsIndex.tsx` is a
  standalone client filter (category + local text match); it does not pull in
  `zephryx.in`'s cross-content search machinery, because this site has no
  writeups or detections to cross-link against.
- `worker/index.ts` handles `/api/waitlist` and nothing else; every other
  request falls through to the static assets.
- `public/_headers` carries the CSP and the rest of the security headers,
  applied at the edge because a static export has no server to set them.

## The waitlist endpoint is the only attack surface — keep it that way

It is the sole piece of this site that accepts input, so the layers matter:
same-origin check, body-size cap, per-field caps, honeypot, submission
time-trap, DNS check on the email domain, optional KV rate limit. If you extend
it, keep all of them and mirror any new caps in `WaitlistForm.tsx` so the client
fails fast and identically.

Two rules worth stating outright:

- **Store before you notify.** A signup persisted to KV is the durable record;
  the email is a notification. A Resend outage must not lose someone who signed
  up, which is why the handler returns success when the KV write succeeded even
  if the mail failed.
- **Never reflect a secret or an upstream error to the client.** Generic message
  to the visitor, detail to `console.error`.

## Other things worth knowing

- `npm run lint` is not usable — there's no ESLint config, so `next lint` drops
  into an interactive setup prompt. Use `npx tsc --noEmit` plus `npm run build`.
- The CSP is `default-src 'self'`. Any external script, font or analytics origin
  needs `public/_headers` widened first, and that should be a deliberate
  decision rather than a fix for a broken embed.
- When the paid course content arrives, follow the same shape the cheatsheets
  pipeline already established: Markdown under `content/`, rendered at build
  time, with the build acting as the validator. `zephryx.in`'s CLAUDE.md also
  carries a standing rule about copy controls on anything a reader might take
  (fenced code blocks, single values); it applies here the moment this site
  publishes commands or rules, not just PDFs.
