'use client';

import { useState, useId } from 'react';
import { hitungHPP, KomponenBiaya } from '@/lib/calculators/hpp';
import { formatRupiah } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import InputNumber from '@/components/ui/InputNumber';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';
import Link from 'next/link';

const DEFAULT_KOMPONEN: KomponenBiaya[] = [
  { id: '1', nama: 'Bahan Baku', biaya: 0 },
  { id: '2', nama: 'Tenaga Kerja', biaya: 0 },
  { id: '3', nama: 'Kemasan', biaya: 0 },
  { id: '4', nama: 'Overhead', biaya: 0 },
];

export default function KalkulatorHPPPage() {
  const [komponen, setKomponen] = useState<KomponenBiaya[]>(DEFAULT_KOMPONEN);
  const [jumlah, setJumlah] = useState(1);
  const [hasil, setHasil] = useState<ReturnType<typeof hitungHPP> | null>(null);
  const uid = useId();

  function updateKomponen(id: string, field: keyof KomponenBiaya, value: string | number) {
    setKomponen((prev) => prev.map((k) => (k.id === id ? { ...k, [field]: value } : k)));
  }

  function addKomponen() {
    setKomponen((prev) => [
      ...prev,
      { id: String(Date.now()), nama: 'Biaya Tambahan', biaya: 0 },
    ]);
  }

  function removeKomponen(id: string) {
    setKomponen((prev) => prev.filter((k) => k.id !== id));
  }

  function handleHitung() {
    setHasil(hitungHPP(komponen, jumlah));
  }

  function handleReset() {
    setKomponen(DEFAULT_KOMPONEN);
    setJumlah(1);
    setHasil(null);
  }

  const shareText = hasil
    ? `HPP per produk: ${formatRupiah(hasil.hppPerProduk)}\nTotal biaya: ${formatRupiah(hasil.totalBiaya)}\nJumlah produk: ${jumlah}`
    : '';

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>🧾 Bisnis</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator HPP</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Hitung Harga Pokok Produksi (HPP) secara detail. Masukkan setiap komponen biaya produksi Anda.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <p className="input-label" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Komponen Biaya
            </p>
            <button className="btn btn-ghost btn-sm" onClick={addKomponen} id="btn-tambah-komponen">
              + Tambah
            </button>
          </div>

          {komponen.map((k, i) => (
            <div
              key={k.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr auto',
                gap: '0.75rem',
                alignItems: 'end',
                padding: '0.875rem',
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-default)',
              }}
            >
              <div className="input-group">
                <label className="input-label" htmlFor={`${uid}-nama-${i}`}>Nama</label>
                <input
                  id={`${uid}-nama-${i}`}
                  type="text"
                  className="input-field"
                  value={k.nama}
                  onChange={(e) => updateKomponen(k.id, 'nama', e.target.value)}
                  placeholder="Nama biaya"
                />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor={`${uid}-biaya-${i}`}>Biaya</label>
                <div className="input-wrapper">
                  <span className="input-prefix">Rp</span>
                  <input
                    id={`${uid}-biaya-${i}`}
                    type="text"
                    inputMode="numeric"
                    className="input-field input-currency"
                    value={k.biaya > 0 ? k.biaya.toLocaleString('id-ID') : ''}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '');
                      updateKomponen(k.id, 'biaya', digits ? parseInt(digits, 10) : 0);
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              <button
                className="btn btn-secondary btn-icon"
                onClick={() => removeKomponen(k.id)}
                disabled={komponen.length <= 1}
                aria-label="Hapus komponen"
                title="Hapus"
                style={{ marginBottom: '0' }}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="divider" />

          <InputNumber id="jumlah-produk" label="Jumlah Produk yang Diproduksi" value={jumlah} onChange={setJumlah} suffix="unit" min={1} />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button id="btn-hitung-hpp" className="btn btn-primary btn-lg" onClick={handleHitung} disabled={komponen.every((k) => k.biaya === 0)} style={{ flex: 1 }}>
            🧾 Hitung HPP
          </button>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-hpp">Reset</button>
        </div>
      </div>

      {hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            <div className="result-main">
              <div className="result-label">HPP per Produk</div>
              <div className="result-value">{formatRupiah(hasil.hppPerProduk)}</div>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <div className="label">Total Biaya</div>
                <div className="value">{formatRupiah(hasil.totalBiaya)}</div>
              </div>
              <div className="result-item">
                <div className="label">Jumlah Produk</div>
                <div className="value">{jumlah} unit</div>
              </div>
            </div>

            {/* Breakdown */}
            {hasil.breakdown.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Breakdown Biaya
                </p>
                {hasil.breakdown.map((item) => (
                  <div key={item.nama} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', width: 130, flexShrink: 0 }}>{item.nama}</div>
                    <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                      <div style={{ height: '100%', width: `${item.persentase}%`, background: 'var(--color-teal-500)', borderRadius: 3, transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-accent)', fontWeight: 600, width: 45, textAlign: 'right' }}>{item.persentase}%</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', width: 100, textAlign: 'right' }}>{formatRupiah(item.biaya)}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="divider" />
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href={`/kalkulator-harga-jual?hpp=${hasil.hppPerProduk}`} className="btn btn-ghost btn-sm" id="btn-lanjut-harga-jual">
                → Hitung Harga Jual
              </Link>
              <ShareResult title="Kalkulator HPP" text={shareText} />
            </div>
          </div>

          <RelatedTools currentSlug="kalkulator-hpp" />
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Apa itu HPP?',
            content: <p>HPP (Harga Pokok Produksi/Penjualan) adalah total biaya yang dikeluarkan untuk memproduksi satu unit produk. HPP menjadi dasar penentuan harga jual dan analisis profitabilitas bisnis Anda.</p>,
          },
          {
            title: 'Komponen HPP yang umum',
            content: (
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <li><strong style={{ color: 'var(--text-primary)' }}>Bahan baku:</strong> Material utama produk</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Tenaga kerja:</strong> Upah karyawan produksi (per unit)</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Kemasan:</strong> Packaging, label, dll.</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Overhead:</strong> Listrik, sewa, peralatan (dibagi per unit)</li>
              </ul>
            ),
          },
          {
            title: 'HPP vs Harga Jual vs Margin',
            content: <p>HPP adalah modal. Harga jual adalah HPP + keuntungan. Margin adalah keuntungan dibagi harga jual. Markup adalah keuntungan dibagi HPP. Kalkuloka punya kalkulator khusus untuk masing-masing.</p>,
          },
        ]}
      />
    </div>
  );
}
