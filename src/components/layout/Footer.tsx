'use client';

import Link from 'next/link';
import { TOOLS, CATEGORIES } from '@/data/tools';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                letterSpacing: '-0.03em',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              KALKULO<span style={{ color: 'var(--color-teal-500)' }}>KA</span>
            </Link>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Hitung Mudah, Pahami Hasilnya.
              <br />
              Platform micro-tools kalkulator untuk kebutuhan keuangan, bisnis, dan sehari-hari.
            </p>
          </div>

          {/* Kategori */}
          <div>
            <h3
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '1rem',
              }}
            >
              Kategori
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${cat.id}`}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      transition: 'color 150ms',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Populer */}
          <div>
            <h3
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '1rem',
              }}
            >
              Tools Populer
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {TOOLS.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      transition: 'color 150ms',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {tool.icon} {tool.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tentang */}
          <div>
            <h3
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '1rem',
              }}
            >
              Kalkuloka
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '/', label: 'Beranda' },
                { href: '/tentang', label: 'Tentang Kalkuloka' },
                { href: '/artikel', label: 'Artikel & Panduan' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li style={{ marginTop: '0.5rem' }}>
                <Link
                  href="https://trakteer.id/kalkuloka"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-trakteer-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.9rem',
                    background: 'linear-gradient(135deg, #FFAA00, #FF8C00)',
                    color: '#0A1729',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  ☕ Dukung Kalkuloka
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider" />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {currentYear} Kalkuloka. Dibuat dengan ❤️ untuk Indonesia.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ⚠️ Hasil kalkulasi bersifat estimasi. Konsultasikan dengan profesional untuk keputusan finansial penting.
          </p>
        </div>
      </div>
    </footer>
  );
}
