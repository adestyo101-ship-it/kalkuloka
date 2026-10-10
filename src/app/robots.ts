import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.kalkuloka.id/sitemap.xml',
    host: 'https://www.kalkuloka.id',
  };
}
