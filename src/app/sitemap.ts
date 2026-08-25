import type { MetadataRoute } from 'next';
import { NAV, SITE } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return NAV.map((item) => ({
    url: `${SITE.url}${item.href}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: item.href === '/' ? 1 : 0.7,
  }));
}
