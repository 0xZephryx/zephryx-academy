# Deploying academy.zephryx.in

The site is a static Next.js export (`out/`) served by a Cloudflare Worker.
This is a **separate Worker** from `zephryx-in` — the two deploy
independently on purpose.

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

## 3. Verifying

```bash
curl -I https://academy.zephryx.in/                    # 200, security headers present
curl -I https://academy.zephryx.in/nope/               # 404 from out/404.html
```

## Notes

- `public/_headers` carries the CSP and the rest of the security headers, applied
  at the edge to every static asset. Adding an external script, font or analytics
  origin means widening that policy — `default-src 'self'` blocks it otherwise.
- The Worker runs first on every request (`run_worker_first: true`), but does
  no request handling of its own right now — everything falls through to the
  static assets. That is the seam to use if this site ever needs an API again.
- To roll back, `npx wrangler rollback` or redeploy from an earlier commit. The
  static assets are versioned with the Worker.
