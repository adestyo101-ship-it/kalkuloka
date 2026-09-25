'use client';

import { useState } from 'react';
import { hitungBEP } from '@/lib/calculators/bep';
import { formatRupiah, formatNumber, formatPercent } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';

export default function BEPPage() {
  const [biayaTetap, setBiayaTetap] = useState(0);
  const [hargaJual, setHargaJual] = useState(0);
  const [biayaVariabel, setBiayaVariabel] = useState(0);
  const [targetPenjualan, setTargetPenjualan] = useState(0);
  const [hasil, setHasil] = useState<ReturnType<typeof hitungBEP> | null>(null);

  function handleHitung() {
    setHasil(hitungBEP(biayaTetap, hargaJual, biayaVariabel));
  }

  function handleReset() {
    setBiayaTetap(0);
    setHargaJual(0);
    setBiayaVariabel(0);
    setTargetPenjualan(0);
    setHasil(null);
  }

  const shareText = hasil
    ? `BEP: ${formatNumber(hasil.bepUnit)} unit atau ${formatRupiah(hasil.bepRupiah)} omzet\nBiaya tetap: ${formatRupiah(biayaTetap)}\nKontribusi margin: ${formatRupiah(hasil.kontribusiMargin)}/unit`
    : '';

  const valid = biayaTetap > 0 && hargaJual > biayaVariabel;

  // Hitung posisi target vs BEP
  const posisiTarget = hasil && targetPenjualan > 0
    ? targetPenjualan >= hasil.bepUnit
      ? 'untung'
      : 'rugi'
    : null;

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>⚖️ Bisnis</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator BEP</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Hitung Break Even Point (titik impas) bisnis Anda. Berapa unit yang harus terjual agar tidak rugi.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <InputCurrency id="biaya-tetap" label="Biaya Tetap (per bulan)" value={biayaTetap} onChange={setBiayaTetap} placeholder="5.000.000" hint="Sewa, gaji tetap, listrik, dll." />
          <InputCurrency id="harga-jual-bep" label="Harga Jual per Unit" value={hargaJual} onChange={setHargaJual} placeholder="20.000" />
          <InputCurrency id="biaya-variabel" label="Biaya Variabel per Unit" value={biayaVariabel} onChange={setBiayaVariabel} placeholder="12.000" hint="Biaya bahan baku + kemasan per unit" />

          {hargaJual > 0 && biayaVariabel >= hargaJual && (
            <div className="disclaimer">
              ⚠️ Biaya variabel harus lebih kecil dari harga jual. Saat ini bisnis akan selalu rugi per unit.
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button id="btn-hitung-bep" className="btn btn-primary btn-lg" onClick={handleHitung} disabled={!valid} style={{ flex: 1 }}>
            ⚖️ Hitung BEP
          </button>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-bep">Reset</button>
        </div>
      </div>

      {hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            <div className="result-main">
              <div className="result-label">BEP (Titik Impas)</div>
              <div className="result-value">{formatNumber(hasil.bepUnit)} <span style={{ fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-muted)' }}>unit</span></div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                atau <strong style={{ color: 'var(--text-accent)' }}>{formatRupiah(hasil.bepRupiah)}</strong> omzet
              </p>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <div className="label">Kontribusi Margin/unit</div>
                <div className="value">{formatRupiah(hasil.kontribusiMargin)}</div>
              </div>
              <div className="result-item">
                <div className="label">CM Ratio</div>
                <div className="value" style={{ color: 'var(--color-gold-400)' }}>{formatPercent(hasil.kontribusiMarginPersen)}</div>
              </div>
              <div className="result-item">
                <div className="label">Biaya Tetap</div>
                <div className="value">{formatRupiah(biayaTetap)}</div>
              </div>
              <div className="result-item">
                <div className="label">Harga Jual</div>
                <div className="value">{formatRupiah(hargaJual)}</div>
              </div>
            </div>

            {/* Visualisasi BEP */}
            <div style={{ margin: '1.5rem 0 1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: '0.8rem',
              }}>
                <span style={{ color: '#ef4444' }}>😟 RUGI</span>
                <span style={{ color: 'var(--text-accent)' }}>TITIK IMPAS</span>
                <span style={{ color: 'var(--color-teal-400)' }}>😊 UNTUNG</span>
              </div>
              <div className="bep-bar">
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 16,
                  height: 16,
                  background: 'var(--color-teal-500)',
                  borderRadius: '50%',
                  border: '2px solid var(--text-primary)',
                  boxShadow: '0 0 8px rgba(0,194,168,0.6)',
                }} />
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                {formatNumber(hasil.bepUnit)} unit
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <ShareResult title="Kalkulator BEP" text={shareText} />
            </div>
          </div>

          <RelatedTools currentSlug="kalkulator-bep" />
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Apa itu BEP?',
            content: <p>BEP (Break Even Point) atau titik impas adalah kondisi dimana total pendapatan sama dengan total biaya. Tidak untung, tidak rugi. Di atas BEP = untung. Di bawah BEP = rugi.</p>,
          },
          {
            title: 'Formula BEP',
            content: (
              <div>
                <p><strong style={{ color: 'var(--text-primary)' }}>Kontribusi Margin</strong> = Harga Jual − Biaya Variabel</p>
                <p style={{ marginTop: '0.4rem' }}><strong style={{ color: 'var(--text-primary)' }}>BEP Unit</strong> = Biaya Tetap ÷ Kontribusi Margin</p>
                <p style={{ marginTop: '0.4rem' }}><strong style={{ color: 'var(--text-primary)' }}>BEP Rupiah</strong> = BEP Unit × Harga Jual</p>
              </div>
            ),
          },
          {
            title: 'Contoh: Warung kopi',
            content: (
              <div>
                <p>Biaya tetap: Rp 5.000.000/bulan (sewa + gaji)</p>
                <p>Harga jual kopi: Rp 20.000</p>
                <p>Biaya variabel per cup: Rp 12.000</p>
                <p style={{ marginTop: '0.5rem' }}>Kontribusi margin = Rp 20.000 − Rp 12.000 = Rp 8.000/cup</p>
                <p>BEP = Rp 5.000.000 ÷ Rp 8.000 = <strong style={{ color: 'var(--text-accent)' }}>625 cup/bulan</strong></p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
