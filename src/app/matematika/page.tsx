import { Metadata } from 'next';
import { generateMeta } from '@/lib/metadata';
import CategoryPage from '@/components/calculator/CategoryPage';

export const metadata: Metadata = generateMeta({
  title: 'Kalkulator Matematika',
  description: 'Tools kalkulator matematika: rumus, geometri, statistik, dan hitungan matematika.',
  slug: 'matematika',
  keywords: ['matematika', 'rumus', 'geometri', 'statistik'],
});

export default function MatematikaPage() {
  return <CategoryPage categoryId="matematika" />;
}
