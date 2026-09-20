'use client';

import { useState } from 'react';

interface ShareResultProps {
  title: string;
  text: string;
}

export default function ShareResult({ title, text }: ShareResultProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareData = {
      title: `Kalkuloka — ${title}`,
      text,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${text}\n\nHitung di Kalkuloka: ${shareData.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="btn btn-secondary btn-sm"
      title="Bagikan hasil"
      id="share-result-btn"
    >
      {copied ? '✅ Disalin!' : '🔗 Bagikan'}
    </button>
  );
}
