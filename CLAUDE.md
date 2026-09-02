# Working notes for this repo

Next.js 15 App Router, static export (`out/`) served by Cloudflare Workers.
Sibling of `zephryx.in` and deliberately a separate Worker — the two deploy
independently so a bad push here can't take the main site down.

**No waitlist, no paid tracks, no lead capture.** That was the earlier
posture; it was deliberately removed. This site is free offensive security and
pentesting education, full stop, for now. `/cheatsheets/` is the free
quick-reference PDF library (migrated over from `zephryx.in` so all study
material lives on this domain).

A structured course catalog (`/tracks/`, the `COURSES` array in `site.ts`,
a "Courses" nav entry) existed briefly and was removed — the courses were
mostly unwritten ("Planned"/"Writing now" placeholders), and having a page
that only half-delivered on that promise did more harm than not having the
page. `/roadmap/` stays: it still lays out the learning order stage by
stage, but each stage now points only at cheatsheets, never at a course.
Don't add a `courseId`/course link back onto a `Stage` in `roadmap/page.tsx`
without also bringing the course content itself. Whether a course catalog
comes back, and whether any of it is ever paid, are both real, separate
decisions that haven't been made — do not reintroduce a waitlist, a "coming
soon, join to hear first" framing, a `/tracks/` route, or any pricing/plan
copy speculatively. When either decision is made, it'll be made explicitly,
here.

There is currently **no attack surface**: the site accepts no input anywhere.
`worker/index.ts` does nothing but forward every request to the static
assets. If a form or endpoint gets added back, give it the same layered
treatment the old waitlist handler had (same-origin check, size caps, a
honeypot, DNS check on any email domain) — that discipline was correct, it's
just unused right now.

## Where things live

- `src/lib/site.ts` is the single source of truth for identity and nav.
  Nothing else should hardcode a link or an email address. There is no
  course/track list here anymore (see above) — if one comes back, keep the
  same discipline: a status of `'Writing now'` or `'Planned'`, never a
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
