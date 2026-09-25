'use client';

import { useState } from 'react';
import { hitungMarginMarkup } from '@/lib/calculators/marginMarkup';
import { formatRupiah, formatPercent } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';

export default function MarginMarkupPage() {
  const [modal, setModal] = useState(0);
  const [hargaJual, setHargaJual] = useState(0);
  const [hasil, setHasil] = useState<ReturnType<typeof hitungMarginMarkup> | null>(null);

  // Auto calculate on input
  function handleModal(val: number) {
    setModal(val);
    if (val > 0 && hargaJual > 0) setHasil(hitungMarginMarkup(val, hargaJual));
  }

  function handleHargaJual(val: number) {
    setHargaJual(val);
    if (modal > 0 && val > 0) setHasil(hitungMarginMarkup(modal, val));
  }

  function handleReset() {
    setModal(0);
    setHargaJual(0);
    setHasil(null);
  }

  const shareText = hasil
    ? `Modal: ${formatRupiah(modal)} | Harga Jual: ${formatRupiah(hargaJual)}\nLaba: ${formatRupiah(hasil.laba)}\nMarkup: ${formatPercent(hasil.markup)} | Margin: ${formatPercent(hasil.margin)}`
    : '';

  const valid = modal > 0 && hargaJual > 0;

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>📊 Bisnis</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator Margin & Markup</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Masukkan modal dan harga jual — Kalkuloka langsung menghitung margin dan markup serta menjelaskan perbedaannya.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <InputCurrency id="modal-margin" label="Modal / HPP" value={modal} onChange={handleModal} placeholder="10.000" />
          <InputCurrency id="harga-jual-margin" label="Harga Jual" value={hargaJual} onChange={handleHargaJual} placeholder="15.000" hint="Hasil dihitung otomatis saat kedua angka diisi" />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-margin" style={{ flex: 1 }}>Reset</button>
        </div>
      </div>

      {valid && hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            {/* Visual: modal vs laba */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                <span>Modal (HPP)</span>
                <span>Laba</span>
              </div>
              <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden' }}>
                <div
                  style={{
                    background: 'rgba(61,107,179,0.7)',
                    width: `${(modal / hargaJual) * 100}%`,
                    transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
                <div
                  style={{
                    background: 'rgba(0,194,168,0.8)',
                    flex: 1,
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginTop: '0.35rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{formatRupiah(modal)}</span>
                <span style={{ color: 'var(--color-teal-400)', fontWeight: 600 }}>+{formatRupiah(hasil.laba)}</span>
              </div>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <div className="label">Laba</div>
                <div className="value" style={{ color: 'var(--color-teal-400)' }}>{formatRupiah(hasil.laba)}</div>
              </div>
              <div className="result-item">
                <div className="label">Harga Jual</div>
                <div className="value">{formatRupiah(hargaJual)}</div>
              </div>
              <div className="result-item">
                <div className="label">
                  Markup
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 400, marginTop: '0.1rem' }}>% dari modal</div>
                </div>
                <div className="value" style={{ color: 'var(--color-gold-400)' }}>{formatPercent(hasil.markup)}</div>
              </div>
              <div className="result-item">
                <div className="label">
                  Margin
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 400, marginTop: '0.1rem' }}>% dari harga jual</div>
                </div>
                <div className="value" style={{ color: 'var(--color-gold-400)' }}>{formatPercent(hasil.margin)}</div>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <ShareResult title="Kalkulator Margin & Markup" text={shareText} />
            </div>
          </div>

          <RelatedTools currentSlug="kalkulator-margin-markup" />
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Apa perbedaan margin dan markup?',
            content: (
              <div>
                <p style={{ marginBottom: '0.75rem' }}>Banyak pemilik usaha mencampuradukkan keduanya. Ini perbedaannya:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(61,107,179,0.1)', borderRadius: 8, border: '1px solid rgba(61,107,179,0.2)' }}>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>Markup</strong>
                    <p style={{ fontSize: '0.82rem' }}>Laba ÷ Modal × 100</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Referensinya modal/HPP</p>
                  </div>
                  <div style={{ padding: '0.75rem', background: 'rgba(0,194,168,0.1)', borderRadius: 8, border: '1px solid rgba(0,194,168,0.2)' }}>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.3rem' }}>Margin</strong>
                    <p style={{ fontSize: '0.82rem' }}>Laba ÷ Harga Jual × 100</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Referensinya harga jual</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: 'Contoh: Modal Rp 10.000, Harga Jual Rp 15.000',
            content: (
              <div>
                <p>Laba = Rp 15.000 − Rp 10.000 = Rp 5.000</p>
                <p>Markup = Rp 5.000 ÷ Rp 10.000 = <strong style={{ color: 'var(--color-gold-400)' }}>50%</strong></p>
                <p>Margin = Rp 5.000 ÷ Rp 15.000 = <strong style={{ color: 'var(--color-teal-400)' }}>33,33%</strong></p>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>Markup 50% ≠ Margin 50%!</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
