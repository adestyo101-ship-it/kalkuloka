'use client';

import { useState } from 'react';
import { hitungTHR } from '@/lib/calculators/thr';
import { formatRupiah } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import InputNumber from '@/components/ui/InputNumber';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';

export default function THRPage() {
  const [gaji, setGaji] = useState(0);
  const [tahun, setTahun] = useState(0);
  const [bulan, setBulan] = useState(0);
  const [hasil, setHasil] = useState<ReturnType<typeof hitungTHR> | null>(null);

  function handleHitung() {
    setHasil(hitungTHR(gaji, tahun, bulan));
  }

  function handleReset() {
    setGaji(0);
    setTahun(0);
    setBulan(0);
    setHasil(null);
  }

  const shareText = hasil
    ? `Gaji: ${formatRupiah(gaji)}, Masa kerja: ${tahun} thn ${bulan} bln\nEstimasi THR: ${formatRupiah(hasil.estimasiTHR)}\n${hasil.keterangan}`
    : '';

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>🎁 Pekerjaan</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator THR</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Estimasi Tunjangan Hari Raya (THR) berdasarkan gaji pokok dan masa kerja Anda, sesuai Permenaker No. 6 Tahun 2016.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <InputCurrency id="gaji-thr" label="Gaji Pokok" value={gaji} onChange={setGaji} placeholder="6.000.000" hint="Gaji pokok, tidak termasuk tunjangan lain" />

          <div className="input-group">
            <label className="input-label">Masa Kerja</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <InputNumber id="masa-kerja-tahun" label="Tahun" value={tahun} onChange={setTahun} suffix="tahun" min={0} max={50} />
              <InputNumber id="masa-kerja-bulan" label="Bulan" value={bulan} onChange={setBulan} suffix="bulan" min={0} max={11} hint="0–11 bulan" />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button id="btn-hitung-thr" className="btn btn-primary btn-lg" onClick={handleHitung} disabled={gaji <= 0} style={{ flex: 1 }}>
            🎁 Hitung THR
          </button>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-thr">Reset</button>
        </div>
      </div>

      {hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            <div className="result-main">
              <div className="result-label">Estimasi THR</div>
              <div className="result-value" style={{ color: hasil.estimasiTHR > 0 ? 'var(--color-teal-400)' : 'var(--text-muted)' }}>
                {formatRupiah(hasil.estimasiTHR)}
              </div>
            </div>

            <div
              style={{
                padding: '0.875rem 1rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-default)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              📋 {hasil.keterangan}
            </div>

            <div className="divider" />
            <div className="disclaimer">
              ⚠️ <strong>Sumber regulasi:</strong> {hasil.sumberRegulasi} Hasil ini adalah estimasi. THR aktual dapat berbeda berdasarkan kebijakan perusahaan dan komponen gaji lainnya. Konsultasikan dengan HR perusahaan Anda.
            </div>

            <div style={{ marginTop: '1rem' }}>
              <ShareResult title="Kalkulator THR" text={shareText} />
            </div>
          </div>
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Ketentuan THR berdasarkan Permenaker No. 6/2016',
            content: (
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>Masa kerja <strong style={{ color: 'var(--text-primary)' }}>{"< 1 bulan"}</strong>: Belum berhak menerima THR</li>
                <li>Masa kerja <strong style={{ color: 'var(--text-primary)' }}>1–11 bulan</strong>: THR = (masa_kerja/12) × gaji</li>
                <li>Masa kerja <strong style={{ color: 'var(--text-primary)' }}>≥ 12 bulan</strong>: THR = 1 bulan gaji</li>
                <li>THR wajib dibayarkan <strong style={{ color: 'var(--text-primary)' }}>paling lambat 7 hari</strong> sebelum hari raya keagamaan</li>
              </ul>
            ),
          },
          {
            title: 'Contoh: Gaji Rp 6 juta, masa kerja 8 bulan',
            content: <p>THR = (8/12) × Rp 6.000.000 = 0,667 × Rp 6.000.000 = <strong style={{ color: 'var(--text-accent)' }}>Rp 4.000.000</strong></p>,
          },
          {
            title: 'Apakah tunjangan masuk hitungan THR?',
            content: <p>Berdasarkan regulasi, THR dihitung dari <strong style={{ color: 'var(--text-primary)' }}>upah pokok</strong> ditambah tunjangan tetap. Tunjangan tidak tetap (makan, transport per hari) biasanya tidak termasuk. Konfirmasi dengan bagian HR atau peraturan perusahaan Anda.</p>,
          },
        ]}
      />
    </div>
  );
}
