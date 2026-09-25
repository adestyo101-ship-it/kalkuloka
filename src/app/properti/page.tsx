import { Metadata } from 'next';
import { generateMeta } from '@/lib/metadata';
import CategoryPage from '@/components/calculator/CategoryPage';

export const metadata: Metadata = generateMeta({
  title: 'Kalkulator Properti',
  description: 'Tools kalkulator properti: KPR, cicilan rumah, dan perhitungan properti. Gratis dan mudah digunakan.',
  slug: 'properti',
  keywords: ['properti', 'kpr', 'rumah', 'cicilan rumah'],
});

export default function PropertiPage() {
  return <CategoryPage categoryId="properti" />;
}
