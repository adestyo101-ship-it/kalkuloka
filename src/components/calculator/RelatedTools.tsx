'use client';

import Link from 'next/link';
import { Tool, getRelatedTools } from '@/data/tools';

interface RelatedToolsProps {
  currentSlug: string;
}

export default function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const related = getRelatedTools(currentSlug);
  if (related.length === 0) return null;

  return (
    <section style={{ marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        🔗 Tools Terkait
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="popular-card"
            style={{ flex: '1 1 200px', minWidth: 0 }}
          >
            <span className="popular-card-icon" style={{ fontSize: '1.25rem' }}>
              {tool.icon}
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {tool.shortName}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                {tool.description.slice(0, 50)}…
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
