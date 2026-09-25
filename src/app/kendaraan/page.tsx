import { Metadata } from 'next';
import { generateMeta } from '@/lib/metadata';
import CategoryPage from '@/components/calculator/CategoryPage';

export const metadata: Metadata = generateMeta({
  title: 'Kalkulator Kendaraan',
  description: 'Tools kalkulator kendaraan: kredit kendaraan, BBM, dan biaya otomotif.',
  slug: 'kendaraan',
  keywords: ['kendaraan', 'kredit motor', 'kredit mobil', 'bbm'],
});

export default function KendaraanPage() {
  return <CategoryPage categoryId="kendaraan" />;
}
