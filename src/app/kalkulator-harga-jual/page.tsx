'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { hitungHargaJual, MetodeHargaJual } from '@/lib/calculators/hargaJual';
import { formatRupiah, formatPercent } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import InputNumber from '@/components/ui/InputNumber';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';

function HargaJualContent() {
  const params = useSearchParams();
  const hppParam = params.get('hpp');

  const [hpp, setHpp] = useState(hppParam ? parseInt(hppParam, 10) : 0);
  const [target, setTarget] = useState(0);
  const [metode, setMetode] = useState<MetodeHargaJual>('margin');
  const [hasil, setHasil] = useState<ReturnType<typeof hitungHargaJual> | null>(null);

  function handleHitung() {
    setHasil(hitungHargaJual(hpp, target, metode));
  }

  function handleReset() {
    setHpp(0);
    setTarget(0);
    setHasil(null);
  }

  const shareText = hasil
    ? `HPP: ${formatRupiah(hpp)}\nHarga jual: ${formatRupiah(hasil.hargaJual)}\nLaba: ${formatRupiah(hasil.laba)}\nMargin: ${formatPercent(hasil.margin)} | Markup: ${formatPercent(hasil.markup)}`
    : '';

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>💵 Bisnis</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator Harga Jual</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Tentukan harga jual ideal dari HPP dan target margin atau markup keuntungan.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <InputCurrency id="hpp-hargajual" label="HPP (Harga Pokok Produksi)" value={hpp} onChange={setHpp} placeholder="10.000" hint={hppParam ? '✅ Diisi otomatis dari Kalkulator HPP' : undefined} />

          {/* Toggle Metode */}
          <div className="input-group">
            <label className="input-label">Metode Target Keuntungan</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['margin', 'markup'] as MetodeHargaJual[]).map((m) => (
                <button
                  key={m}
                  className={`btn ${metode === m ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setMetode(m)}
                  style={{ flex: 1, minWidth: 0, padding: '0.75rem 0.5rem', textTransform: 'capitalize' }}
                  id={`btn-metode-${m}`}
                >
                  {m === 'margin' ? 'Target Margin' : 'Target Markup'}
                </button>
              ))}
            </div>
            <div className="disclaimer" style={{ marginTop: '0.5rem', fontSize: '0.78rem' }}>
              {metode === 'margin'
                ? '💡 Margin = laba ÷ harga jual. Contoh: margin 30% dari harga jual Rp 14.286 = laba Rp 4.286.'
                : '💡 Markup = laba ÷ HPP. Contoh: markup 43% dari HPP Rp 10.000 = harga jual Rp 14.286.'}
            </div>
          </div>

          <InputNumber
            id="target-keuntungan"
            label={metode === 'margin' ? 'Target Margin' : 'Target Markup'}
            value={target}
            onChange={setTarget}
            suffix="%"
            placeholder={metode === 'margin' ? '30' : '43'}
            min={0}
            max={metode === 'margin' ? 99 : 10000}
            step={0.5}
            decimals={2}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button id="btn-hitung-hargajual" className="btn btn-primary btn-lg" onClick={handleHitung} disabled={hpp <= 0 || target <= 0} style={{ flex: 1 }}>
            💵 Hitung Harga Jual
          </button>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-hargajual">Reset</button>
        </div>
      </div>

      {hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            <div className="result-main">
              <div className="result-label">Harga Jual</div>
              <div className="result-value" style={{ color: 'var(--color-teal-400)' }}>{formatRupiah(hasil.hargaJual)}</div>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <div className="label">HPP (Modal)</div>
                <div className="value">{formatRupiah(hpp)}</div>
              </div>
              <div className="result-item">
                <div className="label">Laba per Unit</div>
                <div className="value" style={{ color: 'var(--color-teal-400)' }}>{formatRupiah(hasil.laba)}</div>
              </div>
              <div className="result-item">
                <div className="label">Margin</div>
                <div className="value" style={{ color: 'var(--color-gold-400)' }}>{formatPercent(hasil.margin)}</div>
              </div>
              <div className="result-item">
                <div className="label">Markup</div>
                <div className="value" style={{ color: 'var(--color-gold-400)' }}>{formatPercent(hasil.markup)}</div>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <ShareResult title="Kalkulator Harga Jual" text={shareText} />
            </div>
          </div>

          <RelatedTools currentSlug="kalkulator-harga-jual" />
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Perbedaan margin dan markup',
            content: (
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Margin</strong> = (Harga Jual − HPP) ÷ Harga Jual × 100
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Markup</strong> = (Harga Jual − HPP) ÷ HPP × 100
                </p>
                <p>Margin 30% ≠ Markup 30%. Jika HPP Rp 10.000 dengan <strong>margin 30%</strong>, harga jual = Rp 14.286. Namun dengan <strong>markup 30%</strong>, harga jual = Rp 13.000.</p>
              </div>
            ),
          },
          {
            title: 'Contoh: HPP kopi Rp 9.000, target margin 40%',
            content: <p>Harga jual = Rp 9.000 ÷ (1 − 0,40) = Rp 9.000 ÷ 0,60 = <strong style={{ color: 'var(--text-accent)' }}>Rp 15.000</strong>. Laba = Rp 6.000. Margin = Rp 6.000 ÷ Rp 15.000 = 40%.</p>,
          },
        ]}
      />
    </div>
  );
}

export default function KalkulatorHargaJualPage() {
  return (
    <Suspense fallback={<div className="container-narrow" style={{ padding: '4rem 1.25rem', textAlign: 'center', color: 'var(--text-muted)' }}>Memuat...</div>}>
      <HargaJualContent />
    </Suspense>
  );
}
