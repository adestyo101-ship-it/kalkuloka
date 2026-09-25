import Link from 'next/link';
import { getToolsByCategory, CATEGORIES, ToolCategory } from '@/data/tools';

export default function CategoryPage({ categoryId }: { categoryId: ToolCategory }) {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  const tools = getToolsByCategory(categoryId);

  if (!cat) return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Kategori tidak ditemukan.</div>;

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem 5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <Link href="/" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'inline-block' }}>
          ← Semua Kategori
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              background: 'rgba(0,194,168,0.12)',
              border: '1px solid rgba(0,194,168,0.2)',
            }}
          >
            {cat.icon}
          </div>
          <div>
            <h1 style={{ marginBottom: '0.25rem' }}>{cat.name}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{cat.description}</p>
          </div>
        </div>
      </div>

      {tools.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚧</div>
          <p>Tools untuk kategori ini sedang dalam pengembangan. Pantau terus Kalkuloka!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/${tool.slug}`} className="tool-card" id={`tool-${tool.slug}`}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <span className="tool-card-icon">{tool.icon}</span>
                {tool.isPopular && <span className="badge badge-popular">⭐ Populer</span>}
              </div>
              <div className="tool-card-name">{tool.name}</div>
              <div className="tool-card-desc">{tool.description}</div>
              <span style={{ color: 'var(--text-accent)', fontSize: '0.85rem', fontWeight: 600, alignSelf: 'flex-end' }}>
                Buka →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
