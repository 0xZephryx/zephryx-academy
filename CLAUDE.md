# Working notes for this repo

Next.js 15 App Router, static export (`out/`) served by Cloudflare Workers.
Sibling of `zephryx.in` and deliberately a separate Worker — the two deploy
independently so a bad push here can't take the main site down.

**No waitlist, no paid tracks, no lead capture.** That was the earlier
posture; it was deliberately removed. This site is free offensive security and
pentesting education, full stop, for now. `/cheatsheets/` is the free
quick-reference PDF library (migrated over from `zephryx.in` so all study
material lives on this domain), and `/tracks/` is the in-progress free
curriculum. Whether paid material gets added later is a real, separate
decision that hasn't been made — do not reintroduce a waitlist, a "coming
soon, join to hear first" framing, or any pricing/plan copy speculatively.
When that decision is made, it'll be made explicitly, here.

There is currently **no attack surface**: the site accepts no input anywhere.
`worker/index.ts` does nothing but forward every request to the static
assets. If a form or endpoint gets added back, give it the same layered
treatment the old waitlist handler had (same-origin check, size caps, a
honeypot, DNS check on any email domain) — that discipline was correct, it's
just unused right now.

## Where things live

- `src/lib/site.ts` is the single source of truth for identity, nav and the
  track list. Nothing else should hardcode a link, an email address or a
  track name. `TRACKS[].status` is `'Writing now'` or `'Planned'` — never a
  price, a plan tier, or "open"/"closed" language that implies payment.
- `content/cheatsheets/` + `src/lib/cheatsheets.ts` are the cheatsheets
  pipeline, ported from `zephryx.in`'s: frontmatter-only `.md` files, each
  naming a PDF under `public/cheatsheets/`. The build throws if a cheatsheet's
  `file` field is malformed or the PDF is missing — the build is the
  validator, same rule as the sibling repo. `CheatsheetsIndex.tsx` is a
  standalone client filter (category + local text match); it does not pull in
  `zephryx.in`'s cross-content search machinery, because this site has no
  writeups or detections to cross-link against.
- `public/_headers` carries the CSP and the rest of the security headers,
  applied at the edge because a static export has no server to set them.

## Visual tone: premium, not a terminal emulator

The dark base + red accent + monospace kicker labels are the brand and stay.
What doesn't belong is anything that reads as a literal terminal widget —
fake shell prompts (`$ ./cmd`), traffic-light window chrome, blinking
cursors standing in for a console. The old waitlist form had exactly that
(a fake `zephryx@academy — ./enroll` title bar); it's gone with the form.
Keep the technical identity in typography and structure, not in cosplay.

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
