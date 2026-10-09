'use client';

import { useState } from 'react';
import { hitungDeposito, PembagiHari } from '@/lib/calculators/deposito';
import { formatRupiah, formatPercent } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import InputNumber from '@/components/ui/InputNumber';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';

export default function KalkulatorDepositoPage() {
  const [dana, setDana] = useState(0);
  const [bunga, setBunga] = useState(0);
  const [tenor, setTenor] = useState(0);
  const [pembagi, setPembagi] = useState<PembagiHari>(365);
  const [hasil, setHasil] = useState<ReturnType<typeof hitungDeposito> | null>(null);

  function handleHitung() {
    setHasil(hitungDeposito(dana, bunga, tenor, pembagi));
  }

  function handleReset() {
    setDana(0);
    setBunga(0);
    setTenor(0);
    setPembagi(365);
    setHasil(null);
  }

  const shareText = hasil
    ? `Dana: ${formatRupiah(dana)}, Bunga: ${bunga}%/thn, Tenor: ${tenor} bulan, Pembagi: ${pembagi} hari\nBunga Kotor: ${formatRupiah(hasil.bungaKotor)}\nPajak (20%): ${formatRupiah(hasil.estimasiPajak)}\nBunga Bersih: ${formatRupiah(hasil.bungaBersih)}\nSaldo Akhir: ${formatRupiah(hasil.saldoAkhir)}`
    : '';

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>🏦 Keuangan</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator Deposito</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Hitung bunga deposito, estimasi pajak PPh Final, bunga bersih, dan saldo akhir deposito Anda.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <InputCurrency id="dana-deposito" label="Dana Deposito" value={dana} onChange={setDana} placeholder="100.000.000" />
          <InputNumber id="bunga-deposito" label="Bunga per Tahun" value={bunga} onChange={setBunga} suffix="% / thn" placeholder="5" min={0} max={100} step={0.1} decimals={2} />
          <InputNumber id="tenor-deposito" label="Tenor" value={tenor} onChange={setTenor} suffix="bulan" placeholder="12" min={1} max={120} />
          <div className="input-group">
            <label className="input-label">Pembagi Hari dalam Setahun</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {([365, 360] as PembagiHari[]).map((p) => (
                <label
                  key={p}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem 1rem',
                    background: pembagi === p ? 'rgba(0, 194, 168, 0.1)' : 'var(--bg-input)',
                    border: `1px solid ${pembagi === p ? 'var(--border-accent)' : 'var(--border-default)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                  }}
                >
                  <input type="radio" name="pembagi-deposito" checked={pembagi === p} onChange={() => setPembagi(p)} style={{ accentColor: 'var(--color-teal-500)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p} hari</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button id="btn-hitung-deposito" className="btn btn-primary btn-lg" onClick={handleHitung} disabled={dana <= 0 || bunga <= 0 || tenor <= 0} style={{ flex: 1 }}>
            🏦 Hitung Deposito
          </button>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-deposito">Reset</button>
        </div>
      </div>

      {hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            <div className="result-main">
              <div className="result-label">Saldo Akhir</div>
              <div className="result-value">{formatRupiah(hasil.saldoAkhir)}</div>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <div className="label">Bunga Kotor</div>
                <div className="value">{formatRupiah(hasil.bungaKotor)}</div>
              </div>
              <div className="result-item">
                <div className="label">Pajak PPh (20%)</div>
                <div className="value" style={{ color: 'var(--color-gold-400)' }}>{formatRupiah(hasil.estimasiPajak)}</div>
              </div>
              <div className="result-item">
                <div className="label">Bunga Bersih</div>
                <div className="value" style={{ color: 'var(--color-teal-400)' }}>{formatRupiah(hasil.bungaBersih)}</div>
              </div>
              <div className="result-item">
                <div className="label">Modal Awal</div>
                <div className="value">{formatRupiah(dana)}</div>
              </div>
            </div>

            <div className="divider" />
            <div className="disclaimer">
              ⚠️ <strong>Asumsi pajak:</strong> {hasil.sumberRegulasi} Tarif berlaku untuk deposito &gt; Rp 7,5 juta.
              Di bawah Rp 7,5 juta bebas pajak.
            </div>

            <div style={{ marginTop: '1rem' }}>
              <ShareResult title="Kalkulator Deposito" text={shareText} />
            </div>
          </div>

          <RelatedTools currentSlug="kalkulator-deposito" />
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Apa itu deposito?',
            content: <p>Deposito adalah produk simpanan bank dengan bunga tetap selama jangka waktu (tenor) tertentu. Dana tidak bisa ditarik sebelum jatuh tempo, namun bunganya lebih tinggi dari tabungan biasa.</p>,
          },
          {
            title: 'Berapa pajak bunga deposito?',
            content: <p>Bunga deposito dikenakan PPh Final sebesar <strong style={{ color: 'var(--text-accent)' }}>20%</strong> (PP No. 131 Tahun 2000). Khusus untuk deposito dengan nilai di bawah Rp 7.500.000, bunga bebas pajak.</p>,
          },
          {
            title: 'Contoh: Deposito Rp 100 juta, bunga 5%, tenor 12 bulan',
            content: (
              <div>
                <p>Bunga per bulan = Rp 100.000.000 × 5% ÷ 365 × 30 (bila pembagi 360: Rp 416.667) = Rp 410.959</p>
                <p>Bunga kotor 12 bulan = <strong style={{ color: 'var(--text-accent)' }}>Rp 4.931.507</strong></p>
                <p>Pajak = Rp 4.931.507 × 20% = Rp 986.301</p>
                <p>Bunga bersih = Rp 3.945.205</p>
                <p>Saldo akhir = Rp 103.945.205</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
