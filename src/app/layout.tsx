import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Kalkuloka — Hitung Mudah, Pahami Hasilnya',
    template: '%s | Kalkuloka',
  },
  description:
    'Platform micro-tools kalkulator berbahasa Indonesia. Hitung cicilan, HPP, deposito, margin, BEP, THR, dan puluhan kalkulator lainnya secara mudah dan cepat.',
  metadataBase: new URL('https://kalkuloka.id'),
  keywords: ['kalkulator', 'kalkuloka', 'hitung', 'keuangan', 'bisnis', 'umkm', 'cicilan', 'hpp'],
  authors: [{ name: 'Kalkuloka' }],
  openGraph: {
    siteName: 'Kalkuloka',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1376, height: 768, alt: 'Kalkuloka — Hitung Mudah, Pahami Hasilnya' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-mesh">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
