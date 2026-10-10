import type { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateMeta } from './metadata';

// Metadata per kalkulator, diambil dari data tools.
// Halaman kalkulator adalah client component sehingga tidak bisa mengekspor metadata sendiri;
// layout.tsx di tiap folder kalkulator memakai fungsi ini.
export function toolMetadata(slug: string): Metadata {
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return generateMeta({
    title: tool.name,
    description: tool.description,
    slug: tool.slug,
    keywords: tool.tags,
  });
}
