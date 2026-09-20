'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/keuangan', label: 'Keuangan' },
  { href: '/bisnis', label: 'Bisnis & UMKM' },
  { href: '/pekerjaan', label: 'Pekerjaan' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
            KALKULO<span>KA</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="navbar-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar-link ${pathname.startsWith(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <Link href="/" className="btn btn-ghost btn-sm" style={{ fontSize: '0.8rem' }}>
              🔍 Cari Tools
            </Link>
            <Link
              href="https://trakteer.id/kalkuloka"
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-trakteer-btn"
              className="btn btn-sm"
              style={{
                background: 'linear-gradient(135deg, #FFAA00, #FF8C00)',
                color: '#0A1729',
                fontWeight: 700,
                fontSize: '0.78rem',
              }}
            >
              ☕ Dukung
            </Link>
            {/* Mobile Hamburger */}
            <button
              className="btn btn-icon btn-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ display: 'none' }}
              id="mobile-menu-btn"
            >
              <span style={{ fontSize: '1.1rem' }}>{mobileOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-default)',
            padding: '1rem',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="navbar-link"
              style={{ display: 'block', padding: '0.75rem 1rem', marginBottom: '0.25rem' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
