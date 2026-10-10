import { Metadata } from 'next';

const BASE_URL = 'https://www.kalkuloka.id';
const SITE_NAME = 'Kalkuloka';
const DEFAULT_DESCRIPTION =
  'Platform micro-tools kalkulator berbahasa Indonesia. Hitung cicilan, HPP, deposito, margin, BEP, THR, dan puluhan tools lainnya secara mudah dan cepat.';

interface MetaInput {
  title: string;
  description?: string;
  slug?: string;
  keywords?: string[];
}

export function generateMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  slug = '',
  keywords = [],
}: MetaInput): Metadata {
  const fullTitle = slug ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${title}`;
  const url = slug ? `${BASE_URL}/${slug}` : BASE_URL;

  return {
    title: { absolute: fullTitle },
    description,
    keywords: [
      'kalkulator',
      'kalkuloka',
      'hitung',
      'keuangan',
      'bisnis',
      'umkm',
      ...keywords,
    ],
    authors: [{ name: 'Kalkuloka' }],
    creator: 'Kalkuloka',
    publisher: 'Kalkuloka',
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'id_ID',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1376,
          height: 768,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
