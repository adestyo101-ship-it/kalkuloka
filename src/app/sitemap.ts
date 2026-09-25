import { MetadataRoute } from 'next';
import { TOOLS, CATEGORIES } from '@/data/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = 'https://kalkuloka.id';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...CATEGORIES.map((cat) => ({
      url: `${BASE_URL}/${cat.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${BASE_URL}/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...toolPages];
}
