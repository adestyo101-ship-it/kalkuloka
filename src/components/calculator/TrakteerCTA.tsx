'use client';

import Link from 'next/link';

interface TrakteerCTAProps {
  /** URL Trakteer milik Kalkuloka */
  trakteerUrl?: string;
}

/**
 * CTA Trakteer yang muncul setelah pengguna mendapatkan hasil kalkulasi.
 * Non-intrusive: tidak mengunci fitur, hanya mengajak mendukung.
 */
export default function TrakteerCTA({
  trakteerUrl = 'https://trakteer.id/kalkuloka',
}: TrakteerCTAProps) {
  return (
    <div
      style={{
        marginTop: '1.5rem',
        padding: '1.25rem 1.5rem',
        background: 'linear-gradient(135deg, rgba(255,170,0,0.08) 0%, rgba(0,194,168,0.08) 100%)',
        border: '1px solid rgba(255,170,0,0.2)',
        borderRadius: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
      id="trakteer-cta"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '1.25rem' }}>☕</span>
        <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
          Kalkuloka membantu?
        </strong>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
        Kalkuloka dikembangkan agar berbagai tools ini tetap <strong>gratis dan mudah digunakan</strong>.
        Jika merasa terbantu, kamu bisa ikut mendukung pengembangannya melalui Trakteer.
      </p>
      <div>
        <Link
          href={trakteerUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="trakteer-cta-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.55rem 1.1rem',
            background: 'linear-gradient(135deg, #FFAA00, #FF8C00)',
            color: '#0A1729',
            fontWeight: 700,
            fontSize: '0.85rem',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'opacity 0.2s, transform 0.2s',
            boxShadow: '0 2px 8px rgba(255,170,0,0.25)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.88';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          ☕ Dukung Kalkuloka
        </Link>
      </div>
    </div>
  );
}
