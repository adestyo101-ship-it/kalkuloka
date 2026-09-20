import Link from 'next/link';
import { getToolsByCategory } from '@/data/tools';
import { Metadata } from 'next';
import { generateMeta } from '@/lib/metadata';

export const metadata: Metadata = generateMeta({
  title: 'Kalkulator Bisnis & UMKM',
  description: 'Tools kalkulator untuk bisnis dan UMKM: HPP, harga jual, margin, markup, BEP. Bantu usaha Anda lebih menguntungkan.',
  slug: 'bisnis',
  keywords: ['bisnis', 'umkm', 'hpp', 'harga jual', 'margin', 'bep'],
});

export default function BisnisPage() {
  const tools = getToolsByCategory('bisnis');

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem 5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <Link href="/" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'inline-block' }}>← Semua Kategori</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', background: 'rgba(0,194,168,0.12)', border: '1px solid rgba(0,194,168,0.2)' }}>🏪</div>
          <div>
            <h1 style={{ marginBottom: '0.25rem' }}>Bisnis & UMKM</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>HPP, harga jual, margin, markup, dan BEP untuk usaha Anda</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/${tool.slug}`} className="tool-card" id={`tool-${tool.slug}`}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <span className="tool-card-icon">{tool.icon}</span>
              {tool.isPopular && <span className="badge badge-popular">⭐ Populer</span>}
            </div>
            <div className="tool-card-name">{tool.name}</div>
            <div className="tool-card-desc">{tool.description}</div>
            <span style={{ color: 'var(--text-accent)', fontSize: '0.85rem', fontWeight: 600, alignSelf: 'flex-end' }}>Buka →</span>
          </Link>
        ))}
      </div>

      {/* Journey hint */}
      <div className="glass-card" style={{ padding: '1.25rem', marginTop: '2rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.75rem' }}>💡 Perjalanan kalkulasi UMKM yang direkomendasikan:</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
          {[
            { slug: 'kalkulator-hpp', label: '🧾 HPP' },
            { slug: 'kalkulator-harga-jual', label: '💵 Harga Jual' },
            { slug: 'kalkulator-margin-markup', label: '📊 Margin' },
            { slug: 'kalkulator-bep', label: '⚖️ BEP' },
          ].map((item, i, arr) => (
            <>
              <Link key={item.slug} href={`/${item.slug}`} className="badge badge-teal" style={{ textDecoration: 'none' }}>{item.label}</Link>
              {i < arr.length - 1 && <span style={{ color: 'var(--text-muted)' }}>→</span>}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
