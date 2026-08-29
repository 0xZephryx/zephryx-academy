/**
 * academy.zephryx.in — Cloudflare Worker entrypoint.
 *
 * The site is a static Next.js export (`next build` -> ./out) served by Workers
 * Static Assets. There is no API surface — the waitlist endpoint that used to
 * live here was removed along with the waitlist itself, so every request now
 * falls straight through to env.ASSETS.fetch(), which serves the static build
 * (including out/404.html for unmatched routes, and out/_headers).
 *
 * wrangler.jsonc still sets run_worker_first: true so this file stays the
 * single place to reintroduce an endpoint later, but until one exists this
 * Worker does no request handling of its own.
 */

interface AssetsFetcher {
  fetch: (input: Request | URL | string) => Promise<Response>;
}

interface Env {
  ASSETS: AssetsFetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
};
