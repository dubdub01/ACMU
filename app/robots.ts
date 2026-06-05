import type { MetadataRoute } from 'next';
import { getSiteUrl, isIndexingEnabled } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled()) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
