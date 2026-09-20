import Link from 'next/link';
import { getToolsByCategory } from '@/data/tools';
import { Metadata } from 'next';
import { generateMeta } from '@/lib/metadata';

export const metadata: Metadata = generateMeta({
  title: 'Kalkulator Gaji & Pekerjaan',
  description: 'Tools kalkulator untuk gaji dan pekerjaan: THR, pajak penghasilan, dan tunjangan. Hitung hak-hak karyawan Anda.',
  slug: 'pekerjaan',
  keywords: ['gaji', 'thr', 'tunjangan', 'karyawan', 'pajak penghasilan'],
});

export default function PekerjaanPage() {
  const tools = getToolsByCategory('pekerjaan');

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem 5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <Link href="/" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'inline-block' }}>← Semua Kategori</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', background: 'rgba(0,194,168,0.12)', border: '1px solid rgba(0,194,168,0.2)' }}>💼</div>
          <div>
            <h1 style={{ marginBottom: '0.25rem' }}>Gaji & Pekerjaan</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>THR, gaji, dan hak-hak karyawan</p>
          </div>
        </div>
      </div>

      {tools.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/${tool.slug}`} className="tool-card" id={`tool-${tool.slug}`}>
              <span className="tool-card-icon">{tool.icon}</span>
              <div className="tool-card-name">{tool.name}</div>
              <div className="tool-card-desc">{tool.description}</div>
              <span style={{ color: 'var(--text-accent)', fontSize: '0.85rem', fontWeight: 600, alignSelf: 'flex-end' }}>Buka →</span>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚧</div>
          <p>Tools tambahan sedang dalam pengembangan. Pantau terus!</p>
        </div>
      )}
    </div>
  );
}
