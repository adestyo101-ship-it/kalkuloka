'use client';

import { useState } from 'react';
import { hitungCicilanKendaraan } from '@/lib/calculators/cicilanKendaraan';
import type { MetodeCicilan } from '@/lib/calculators/cicilan';
import { formatRupiah } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import InputNumber from '@/components/ui/InputNumber';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';

const METODE_OPTIONS: { value: MetodeCicilan; label: string; desc: string }[] = [
  { value: 'flat', label: 'Flat', desc: 'Bunga dari pokok awal, cicilan tetap (umum di kredit kendaraan)' },
  { value: 'anuitas', label: 'Anuitas', desc: 'Bunga dari saldo berjalan, cicilan tetap' },
];

export default function KalkulatorCicilanKendaraanPage() {
  const [harga, setHarga] = useState(0);
  const [dp, setDp] = useState(0);
  const [bunga, setBunga] = useState(0);
  const [tenor, setTenor] = useState(0);
  const [biaya, setBiaya] = useState(0);
  const [biayaDibiayai, setBiayaDibiayai] = useState(true);
  const [metode, setMetode] = useState<MetodeCicilan>('flat');
  const [hasil, setHasil] = useState<ReturnType<typeof hitungCicilanKendaraan> | null>(null);

  const dpPersen = harga > 0 ? (dp / harga) * 100 : 0;
  const dpTerlaluBesar = harga > 0 && dp >= harga;

  function handleHitung() {
    setHasil(hitungCicilanKendaraan(harga, dp, bunga, tenor, biaya, biayaDibiayai, metode));
  }

  function handleReset() {
    setHarga(0);
    setDp(0);
    setBunga(0);
    setTenor(0);
    setBiaya(0);
    setBiayaDibiayai(true);
    setMetode('flat');
    setHasil(null);
  }

  const shareText = hasil
    ? `Harga: ${formatRupiah(harga)}, DP: ${formatRupiah(dp)}, Bunga: ${bunga}%/thn, Tenor: ${tenor} bulan\nPokok Pinjaman: ${formatRupiah(hasil.pokokPinjaman)}\nCicilan: ${formatRupiah(hasil.cicilanBulanan)}/bulan\nTotal Bunga: ${formatRupiah(hasil.totalBunga)}\nTotal Pembayaran: ${formatRupiah(hasil.totalPembayaran)}`
    : '';

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>🚗 Kendaraan</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator Cicilan Kendaraan</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Hitung pokok pinjaman, cicilan bulanan, total bunga, dan total pembayaran kredit motor atau mobil Anda.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <InputCurrency id="kendaraan-harga" label="Harga Kendaraan" value={harga} onChange={setHarga} placeholder="250.000.000" />
          <InputCurrency
            id="kendaraan-dp"
            label="Uang Muka (DP)"
            value={dp}
            onChange={setDp}
            placeholder="50.000.000"
            hint={harga > 0 && dp > 0 ? `≈ ${dpPersen.toFixed(1)}% dari harga kendaraan` : undefined}
          />
          <InputNumber id="kendaraan-bunga" label="Bunga per Tahun" value={bunga} onChange={setBunga} suffix="% / thn" placeholder="8" min={0} max={100} step={0.1} decimals={2} />
          <InputNumber id="kendaraan-tenor" label="Tenor" value={tenor} onChange={setTenor} suffix="bulan" placeholder="36" min={1} max={120} />
          <InputCurrency
            id="kendaraan-biaya"
            label="Biaya Tambahan"
            value={biaya}
            onChange={setBiaya}
            placeholder="5.000.000"
            hint="Contoh: administrasi, asuransi, provisi, fidusia"
          />

          {biaya > 0 && (
            <div className="input-group">
              <label className="input-label">Biaya tambahan…</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { v: true, label: 'Ikut dibiayai kredit', desc: 'Ditambahkan ke pokok pinjaman dan ikut berbunga' },
                  { v: false, label: 'Dibayar di muka', desc: 'Dibayar tunai bersama DP, tidak masuk pinjaman' },
                ].map((opt) => (
                  <label
                    key={String(opt.v)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      background: biayaDibiayai === opt.v ? 'rgba(0, 194, 168, 0.1)' : 'var(--bg-input)',
                      border: `1px solid ${biayaDibiayai === opt.v ? 'var(--border-accent)' : 'var(--border-default)'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="biaya-mode"
                      checked={biayaDibiayai === opt.v}
                      onChange={() => setBiayaDibiayai(opt.v)}
                      style={{ accentColor: 'var(--color-teal-500)', marginTop: '2px', flexShrink: 0 }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

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
                    padding: '0.75rem 1rem',
                    background: metode === opt.value ? 'rgba(0, 194, 168, 0.1)' : 'var(--bg-input)',
                    border: `1px solid ${metode === opt.value ? 'var(--border-accent)' : 'var(--border-default)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="metode-kendaraan"
                    checked={metode === opt.value}
                    onChange={() => setMetode(opt.value)}
                    style={{ accentColor: 'var(--color-teal-500)', marginTop: '2px', flexShrink: 0 }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {dpTerlaluBesar && (
            <div style={{ fontSize: '0.82rem', color: 'var(--color-gold-400)' }}>
              DP sama dengan atau lebih besar dari harga kendaraan, tidak ada pinjaman yang perlu dicicil.
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button
            id="btn-hitung-kendaraan"
            className="btn btn-primary btn-lg"
            onClick={handleHitung}
            disabled={harga <= 0 || dpTerlaluBesar || bunga <= 0 || tenor <= 0}
            style={{ flex: 1 }}
          >
            🚗 Hitung Cicilan
          </button>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-kendaraan">Reset</button>
        </div>
      </div>

      {hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            <div className="result-main">
              <div className="result-label">Cicilan Bulanan</div>
              <div className="result-value">{formatRupiah(hasil.cicilanBulanan)}</div>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <div className="label">Pokok Pinjaman</div>
                <div className="value">{formatRupiah(hasil.pokokPinjaman)}</div>
              </div>
              <div className="result-item">
                <div className="label">Total Bunga</div>
                <div className="value" style={{ color: 'var(--color-gold-400)' }}>{formatRupiah(hasil.totalBunga)}</div>
              </div>
              <div className="result-item">
                <div className="label">Total Pembayaran</div>
                <div className="value" style={{ color: 'var(--color-teal-400)' }}>{formatRupiah(hasil.totalPembayaran)}</div>
              </div>
              <div className="result-item">
                <div className="label">Tenor</div>
                <div className="value">{tenor} bulan</div>
              </div>
            </div>

            <div className="divider" />
            <div className="disclaimer">
              ℹ️ Total pembayaran adalah seluruh cicilan (pokok + bunga). Total pengeluaran Anda termasuk DP
              {!biayaDibiayai && biaya > 0 ? ' dan biaya di muka' : ''}: <strong>{formatRupiah(hasil.totalPengeluaran)}</strong>.
              Estimasi ini belum memperhitungkan denda, asuransi tahunan, atau ketentuan khusus leasing.
            </div>

            <div style={{ marginTop: '1rem' }}>
              <ShareResult title="Kalkulator Cicilan Kendaraan" text={shareText} />
            </div>
          </div>

          <RelatedTools currentSlug="kalkulator-cicilan-kendaraan" />
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Bagaimana pokok pinjaman dihitung?',
            content: <p>Pokok pinjaman = harga kendaraan − DP (+ biaya tambahan bila ikut dibiayai kredit). Cicilan dan bunga dihitung dari pokok pinjaman ini.</p>,
          },
          {
            title: 'Flat atau anuitas?',
            content: <p>Kebanyakan leasing kendaraan memakai bunga flat: bunga dihitung dari pokok awal sehingga cicilan sama tiap bulan. Anuitas menghitung bunga dari saldo yang menurun, sehingga total bunga umumnya lebih kecil untuk angka bunga yang sama. Karena itu, bunga flat 8% tidak setara dengan anuitas 8%.</p>,
          },
          {
            title: 'Contoh: Mobil Rp 250 juta, DP Rp 50 juta, bunga 8% flat, 36 bulan',
            content: (
              <div>
                <p>Pokok pinjaman = Rp 250.000.000 − Rp 50.000.000 = Rp 200.000.000</p>
                <p>Total bunga = Rp 200.000.000 × 8% × 3 tahun = Rp 48.000.000</p>
                <p>Cicilan = (Rp 200.000.000 + Rp 48.000.000) ÷ 36 = <strong style={{ color: 'var(--text-accent)' }}>Rp 6.888.889/bulan</strong></p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
