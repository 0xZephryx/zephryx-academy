import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so a stray parent lockfile can't confuse tracing.
  outputFileTracingRoot: __dirname,

  // Fully static build -> ./out, served by Cloudflare Workers static assets.
  // Security headers live in public/_headers because static assets have no
  // server to set them; worker/index.ts handles /api/waitlist.
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,

  // No Node image optimizer exists in a static export.
  images: { unoptimized: true },

  // Do not leak framework fingerprint in the (rare) dev-server responses.
  poweredByHeader: false,

  skipTrailingSlashRedirect: false,
};

export default nextConfig;
