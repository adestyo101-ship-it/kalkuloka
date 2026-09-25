import { Metadata } from 'next';
import { generateMeta } from '@/lib/metadata';
import CategoryPage from '@/components/calculator/CategoryPage';

export const metadata: Metadata = generateMeta({
  title: 'Tools Umum',
  description: 'Tools kalkulator umum: persentase, konversi, dan kalkulasi sehari-hari.',
  slug: 'umum',
  keywords: ['persentase', 'umur', 'konversi', 'kalkulator'],
});

export default function UmumPage() {
  return <CategoryPage categoryId="umum" />;
}
