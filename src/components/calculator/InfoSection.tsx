'use client';

import { useState } from 'react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface InfoSectionProps {
  items: AccordionItem[];
  title?: string;
}

export default function InfoSection({ items, title = '📚 Panduan & FAQ' }: InfoSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {items.map((item, i) => (
          <div key={i} className="accordion-item">
            <button
              className="accordion-trigger"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              id={`accordion-trigger-${i}`}
            >
              <span>{item.title}</span>
              <span
                style={{
                  fontSize: '1.1rem',
                  transition: 'transform 200ms',
                  transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: 'var(--text-accent)',
                }}
              >
                ⌄
              </span>
            </button>
            {openIndex === i && (
              <div className="accordion-content" style={{ animation: 'slideDown 0.2s ease-out' }}>
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
