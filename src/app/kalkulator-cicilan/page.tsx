'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { hitungCicilan, MetodeCicilan, AmortisasiRow } from '@/lib/calculators/cicilan';
import { formatRupiah } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import InputNumber from '@/components/ui/InputNumber';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';

const METODE_OPTIONS: { value: MetodeCicilan; label: string; desc: string }[] = [
  { value: 'anuitas', label: 'Anuitas', desc: 'Cicilan tetap setiap bulan (paling umum)' },
  { value: 'flat', label: 'Flat', desc: 'Bunga dihitung dari pokok awal' },
  { value: 'efektif', label: 'Efektif', desc: 'Bunga dari saldo berjalan, cicilan menurun' },
];

export default function KalkulatorCicilanPage() {
  const [pinjaman, setPinjaman] = useState(0);
  const [bunga, setBunga] = useState(0);
  const [tenor, setTenor] = useState(0);
  const [metode, setMetode] = useState<MetodeCicilan>('anuitas');
  const [hasil, setHasil] = useState<ReturnType<typeof hitungCicilan> | null>(null);
  const [showTabel, setShowTabel] = useState(false);

  function handleHitung() {
    const h = hitungCicilan(pinjaman, bunga, tenor, metode);
    setHasil(h);
    setShowTabel(false);
  }

  function handleReset() {
    setPinjaman(0);
    setBunga(0);
    setTenor(0);
    setMetode('anuitas');
    setHasil(null);
    setShowTabel(false);
  }

  const shareText = hasil
    ? `Pinjaman: ${formatRupiah(pinjaman)}, Bunga: ${bunga}%/thn, Tenor: ${tenor} bulan\nCicilan: ${formatRupiah(hasil.cicilanBulanan)}/bulan\nTotal Bunga: ${formatRupiah(hasil.totalBunga)}\nTotal Bayar: ${formatRupiah(hasil.totalPembayaran)}`
    : '';

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-teal">💳 Keuangan</span>
          <span className="badge badge-popular">⭐ Populer</span>
        </div>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator Cicilan</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Hitung cicilan bulanan, total bunga, dan tabel amortisasi untuk pinjaman Anda.
          Mendukung metode Flat, Anuitas, dan Efektif.
        </p>
      </div>

      {/* Form */}
      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <InputCurrency
            id="pinjaman"
            label="Jumlah Pinjaman"
            value={pinjaman}
            onChange={setPinjaman}
            placeholder="100.000.000"
          />

          <InputNumber
            id="bunga"
            label="Bunga per Tahun"
            value={bunga}
            onChange={setBunga}
            suffix="% / thn"
            placeholder="12"
            min={0}
            max={100}
            step={0.1}
            decimals={2}
          />

          <InputNumber
            id="tenor"
            label="Tenor"
            value={tenor}
            onChange={setTenor}
            suffix="bulan"
            placeholder="36"
            min={1}
            max={360}
          />

          {/* Metode */}
          <div className="input-group">
            <label className="input-label">Metode Bunga</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {METODE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.875rem 1rem',
                    background: metode === opt.value ? 'rgba(0, 194, 168, 0.1)' : 'var(--bg-input)',
                    border: `1px solid ${metode === opt.value ? 'var(--border-accent)' : 'var(--border-default)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all 150ms',
                  }}
                >
                  <input
                    type="radio"
                    name="metode"
                    value={opt.value}
                    checked={metode === opt.value}
                    onChange={() => setMetode(opt.value)}
                    style={{ accentColor: 'var(--color-teal-500)', marginTop: '2px', flexShrink: 0 }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                      {opt.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button
            id="btn-hitung-cicilan"
            className="btn btn-primary btn-lg"
            onClick={handleHitung}
            disabled={pinjaman <= 0 || bunga <= 0 || tenor <= 0}
            style={{ flex: 1 }}
          >
            💳 Hitung Cicilan
          </button>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-cicilan">
            Reset
          </button>
        </div>
      </div>

      {/* HASIL */}
      {hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            <div className="result-main">
              <div className="result-label">
                {metode === 'efektif' ? 'Cicilan Bulan Pertama' : 'Cicilan Bulanan'}
              </div>
              <div className="result-value">{formatRupiah(hasil.cicilanBulanan)}</div>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <div className="label">Total Bunga</div>
                <div className="value" style={{ color: 'var(--color-gold-400)' }}>
                  {formatRupiah(hasil.totalBunga)}
                </div>
              </div>
              <div className="result-item">
                <div className="label">Total Pembayaran</div>
                <div className="value">{formatRupiah(hasil.totalPembayaran)}</div>
              </div>
              <div className="result-item">
                <div className="label">Tenor</div>
                <div className="value">{tenor} bulan</div>
              </div>
              <div className="result-item">
                <div className="label">Metode</div>
                <div className="value" style={{ textTransform: 'capitalize' }}>{metode}</div>
              </div>
            </div>

            <div className="divider" />

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowTabel(!showTabel)}
                id="btn-toggle-amortisasi"
              >
                📋 {showTabel ? 'Sembunyikan' : 'Lihat'} Tabel Amortisasi
              </button>
              <ShareResult title="Kalkulator Cicilan" text={shareText} />
            </div>
          </div>

          {/* Tabel Amortisasi */}
          {showTabel && (
            <div
              className="glass-card"
              style={{ padding: '1.25rem', overflow: 'auto', animation: 'slideDown 0.3s ease-out' }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>
                📋 Tabel Amortisasi ({tenor} baris)
              </h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Bulan</th>
                    <th>Pokok</th>
                    <th>Bunga</th>
                    <th>Total Cicilan</th>
                    <th>Sisa Pinjaman</th>
                  </tr>
                </thead>
                <tbody>
                  {hasil.tabelAmortisasi.map((row: AmortisasiRow) => (
                    <tr key={row.bulan}>
                      <td>{row.bulan}</td>
                      <td>{formatRupiah(row.angsuranPokok)}</td>
                      <td style={{ color: 'var(--color-gold-400)' }}>
                        {formatRupiah(row.angsuranBunga)}
                      </td>
                      <td style={{ color: 'var(--text-accent)', fontWeight: 700 }}>
                        {formatRupiah(row.totalAngsuran)}
                      </td>
                      <td>{formatRupiah(row.sisaPinjaman)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <RelatedTools currentSlug="kalkulator-cicilan" />
        </div>
      )}

      {/* INFO */}
      <InfoSection
        items={[
          {
            title: 'Apa itu kalkulator cicilan?',
            content: (
              <p>
                Kalkulator cicilan membantu Anda menghitung berapa angsuran yang harus dibayar setiap bulan
                untuk sebuah pinjaman, beserta total bunga yang dibayarkan selama tenor pinjaman berlangsung.
              </p>
            ),
          },
          {
            title: 'Perbedaan metode Flat, Anuitas, dan Efektif',
            content: (
              <div>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Flat:</strong> Bunga dihitung dari pokok awal
                  dan dibagi rata setiap bulan. Cicilan selalu sama, total bunga lebih besar.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Anuitas:</strong> Cicilan tetap setiap bulan,
                  namun komposisi pokok dan bunga berubah. Bulan awal banyak bunga, bulan akhir banyak pokok.
                  Ini yang paling umum digunakan bank.
                </p>
                <p>
                  <strong style={{ color: 'var(--text-primary)' }}>Efektif:</strong> Bunga dihitung dari saldo
                  tersisa. Cicilan akan menurun seiring waktu karena saldo pokok berkurang.
                </p>
              </div>
            ),
          },
          {
            title: 'Contoh perhitungan cicilan anuitas',
            content: (
              <p>
                Pinjaman Rp 50.000.000, bunga 12%/tahun, tenor 12 bulan: cicilan anuitas ≈{' '}
                <strong style={{ color: 'var(--text-accent)' }}>Rp 4.440.741/bulan</strong>. Total bunga{' '}
                ≈ Rp 2.288.892. Total bayar ≈ Rp 52.288.892.
              </p>
            ),
          },
          {
            title: 'FAQ: Apakah kalkulator ini akurat untuk KPR?',
            content: (
              <p>
                Kalkulator ini menggunakan formula standar. Untuk KPR, bank biasanya menggunakan metode anuitas.
                Namun hasil ini bersifat estimasi — biaya administrasi, asuransi, dan biaya lain belum termasuk.
                Selalu konfirmasi dengan bank atau leasing Anda.
              </p>
            ),
          },
        ]}
      />
    </div>
  );
}
