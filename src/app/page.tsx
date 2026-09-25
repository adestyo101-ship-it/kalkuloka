'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TOOLS, CATEGORIES, searchTools } from '@/data/tools';

const POPULAR_TOOLS = TOOLS.filter((t) => t.isPopular);

export default function HomePage() {
  const [query, setQuery] = useState('');
  const results = query.trim() ? searchTools(query) : null;

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <p className="hero-tagline">PLATFORM KALKULATOR LENGKAP DAN MUDAH DIPAHAMI</p>
          <h1 className="hero-title">
            Hitung Apa <span className="accent">Hari Ini?</span>
          </h1>
          <p className="hero-subtitle">
            Temukan yang kamu butuhkan, pelajari cara menghitungnya, dan pahami hasilnya.
          </p>

          {/* Search Bar */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="search-container">
              <span className="search-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                id="search-tools"
                type="search"
                className="search-input"
                placeholder="Cari kalkulator atau tools... (cicilan, HPP, BEP)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2.5rem',
              marginTop: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { num: '14', label: 'Tools Gratis' },
              { num: '7', label: 'Kategori' },
              { num: '100%', label: 'Browser-Based' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: 'var(--color-teal-500)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {stat.num}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {/* SEARCH RESULTS */}
        {results !== null && (
          <section style={{ marginBottom: '3rem', animation: 'fadeIn 0.2s ease' }}>
            <div className="section-header">
              <h2 className="section-title">
                <span className="dot" />
                Hasil pencarian &ldquo;{query}&rdquo; ({results.length} tools)
              </h2>
            </div>
            {results.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: 'var(--text-muted)',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
                <p>Tidak ada tools yang ditemukan. Coba kata kunci lain.</p>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '1rem',
                }}
              >
                {results.map((tool) => (
                  <Link key={tool.slug} href={`/${tool.slug}`} className="tool-card">
                    <span className="tool-card-icon">{tool.icon}</span>
                    <div className="tool-card-name">{tool.name}</div>
                    <div className="tool-card-desc">{tool.description}</div>
                    <span className="badge badge-teal" style={{ alignSelf: 'flex-start' }}>
                      {tool.category}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TOOL POPULER */}
        {!results && (
          <>
            <section style={{ marginBottom: '3rem' }}>
              <div className="section-header">
                <h2 className="section-title">
                  <span className="dot" />
                  Tools Populer
                </h2>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '0.875rem',
                }}
              >
                {POPULAR_TOOLS.map((tool) => (
                  <Link key={tool.slug} href={`/${tool.slug}`} className="popular-card">
                    <span className="popular-card-icon">{tool.icon}</span>
                    <div>
                      <div
                        style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}
                      >
                        {tool.name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          marginTop: '0.15rem',
                        }}
                      >
                        {tool.description.slice(0, 55)}…
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* KATEGORI */}
            <section style={{ marginBottom: '3rem' }}>
              <div className="section-header">
                <h2 className="section-title">
                  <span className="dot" />
                  Kategori
                </h2>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '0.875rem',
                }}
              >
                {CATEGORIES.map((cat) => {
                  const count = TOOLS.filter((t) => t.category === cat.id).length;
                  return (
                    <Link
                      key={cat.id}
                      href={`/${cat.id}`}
                      className="category-card"
                      id={`category-${cat.id}`}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.4rem',
                          background: 'rgba(0, 194, 168, 0.1)',
                          flexShrink: 0,
                        }}
                      >
                        {cat.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                          {cat.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                          {cat.description}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: 'var(--text-accent)',
                          background: 'rgba(0, 194, 168, 0.1)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '100px',
                          flexShrink: 0,
                        }}
                      >
                        {count}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* SEMUA TOOLS */}
            <section>
              <div className="section-header">
                <h2 className="section-title">
                  <span className="dot" />
                  Semua Tools
                </h2>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                  }}
                >
                  {TOOLS.length} tools tersedia
                </span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '1rem',
                }}
              >
                {TOOLS.map((tool) => (
                  <Link key={tool.slug} href={`/${tool.slug}`} className="tool-card" id={`tool-${tool.slug}`}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <span className="tool-card-icon">{tool.icon}</span>
                      {tool.isPopular && (
                        <span className="badge badge-popular">⭐ Populer</span>
                      )}
                    </div>
                    <div className="tool-card-name">{tool.name}</div>
                    <div className="tool-card-desc">{tool.description}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                      <span className="badge badge-teal">{tool.category}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-accent)' }}>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
