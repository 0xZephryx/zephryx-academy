# zephryx-academy

The site behind [academy.zephryx.in](https://academy.zephryx.in) — Zephryx Academy,
a hands-on offensive security training ground.

Currently pre-launch: the site is complete and live, but no course content is
published. The waitlist is the only thing it collects.

## Stack

- **Next.js 15** (App Router), built as a fully static export to `out/`
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Cloudflare Workers** serving `out/` as static assets, with `worker/index.ts`
  handling `/api/waitlist`

Same shape as [zephryx.in](https://github.com/zephryxsec/zephryx.in), deployed as
its own Worker so a bad push here can't take the main site down.

## Local development

```bash
npm install
npm run dev          # next dev on :3000 — /api/waitlist is NOT available here
npm run build        # static export to out/
npm run preview      # build + wrangler dev — the full stack, API included
```

`npm run lint` is not usable (no ESLint config; `next lint` drops into an
interactive setup prompt). Use `npx tsc --noEmit` plus `npm run build`.

## Deploying

See [DEPLOY.md](DEPLOY.md) for first-time Cloudflare setup — the custom domain,
the secrets the waitlist endpoint needs, and the optional KV namespaces.

```bash
npm run deploy       # build + wrangler deploy
```

## Adding a course later

Course content is deliberately not modelled yet. When the first track is ready,
the shape to follow is the sibling repo's: Markdown under `content/`, rendered at
build time, with the build acting as the validator. `src/lib/site.ts` holds the
track list that the home and `/tracks/` pages render from — updating a track's
`status` there is all a "now open" announcement needs.
