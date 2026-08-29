# zephryx-academy

The site behind [academy.zephryx.in](https://academy.zephryx.in) — Zephryx Academy,
a hands-on offensive security training ground.

Free offensive security education: cheatsheets are live now, and the learning
paths on `/tracks/` are being written in public. No waitlist, no signup, no
paywall — whether anything paid gets added is a separate decision for later.

## Stack

- **Next.js 15** (App Router), built as a fully static export to `out/`
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Cloudflare Workers** serving `out/` as static assets — `worker/index.ts`
  has no API surface right now, it just forwards to the static assets

Same shape as [zephryx.in](https://github.com/zephryxsec/zephryx.in), deployed as
its own Worker so a bad push here can't take the main site down.

## Local development

```bash
npm install
npm run dev          # next dev on :3000
npm run build        # static export to out/
npm run preview      # build + wrangler dev — the full stack
```

`npm run lint` is not usable (no ESLint config; `next lint` drops into an
interactive setup prompt). Use `npx tsc --noEmit` plus `npm run build`.

## Deploying

See [DEPLOY.md](DEPLOY.md) for first-time Cloudflare setup — the custom domain
and verification steps.

```bash
npm run deploy       # build + wrangler deploy
```

## Adding a course later

Course content is deliberately not modelled yet. When the first track is ready,
the shape to follow is the sibling repo's: Markdown under `content/`, rendered at
build time, with the build acting as the validator. `src/lib/site.ts` holds the
track list that the home and `/tracks/` pages render from — updating a track's
`status` there is all a "now open" announcement needs.
