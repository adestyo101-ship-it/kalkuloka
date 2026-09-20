'use client';

import { useState } from 'react';
import { hitungBungaMajemuk, FrekuensiBunga } from '@/lib/calculators/bungaMajemuk';
import { formatRupiah } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import InputNumber from '@/components/ui/InputNumber';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const FREKUENSI_OPTIONS: { value: FrekuensiBunga; label: string }[] = [
  { value: 'tahunan', label: 'Tahunan (1×/tahun)' },
  { value: 'bulanan', label: 'Bulanan (12×/tahun)' },
  { value: 'harian', label: 'Harian (365×/tahun)' },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-accent)',
      borderRadius: 'var(--radius-md)',
      padding: '0.75rem 1rem',
      fontSize: '0.82rem',
    }}>
      <p style={{ fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
        Tahun ke-{label}
      </p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} style={{ color: entry.color, margin: '0.15rem 0' }}>
          {entry.name}: {formatRupiah(entry.value)}
        </p>
      ))}
    </div>
  );
}

export default function BungaMajemukPage() {
  const [modalAwal, setModalAwal] = useState(0);
  const [kontribusi, setKontribusi] = useState(0);
  const [bunga, setBunga] = useState(0);
  const [frekuensi, setFrekuensi] = useState<FrekuensiBunga>('bulanan');
  const [durasi, setDurasi] = useState(0);
  const [hasil, setHasil] = useState<ReturnType<typeof hitungBungaMajemuk> | null>(null);

  function handleHitung() {
    setHasil(hitungBungaMajemuk(modalAwal, kontribusi, bunga, frekuensi, durasi));
  }

  function handleReset() {
    setModalAwal(0);
    setKontribusi(0);
    setBunga(0);
    setDurasi(0);
    setHasil(null);
  }

  const shareText = hasil
    ? `Modal: ${formatRupiah(modalAwal)} + ${formatRupiah(kontribusi)}/bulan\nBunga: ${bunga}%/thn selama ${durasi} tahun\nModal disetor: ${formatRupiah(hasil.modalDisetor)}\nEstimasi bunga: ${formatRupiah(hasil.estimasiPertumbuhan)}\nSaldo akhir: ${formatRupiah(hasil.saldoAkhir)}`
    : '';

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>📈 Keuangan</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator Bunga Majemuk</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Simulasikan kekuatan bunga berbunga (compound interest). Lihat pertumbuhan investasi Anda secara visual.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <InputCurrency id="modal-awal" label="Modal Awal" value={modalAwal} onChange={setModalAwal} placeholder="10.000.000" />
          <InputCurrency id="kontribusi-bulanan" label="Kontribusi Bulanan (opsional)" value={kontribusi} onChange={setKontribusi} placeholder="1.000.000" hint="Berapa yang ditambahkan setiap bulan?" />
          <InputNumber id="bunga-majemuk" label="Bunga per Tahun" value={bunga} onChange={setBunga} suffix="% / thn" placeholder="8" min={0} max={100} step={0.1} decimals={2} />

          <div className="input-group">
            <label className="input-label">Frekuensi Penggandaan</label>
            <select className="select-field" value={frekuensi} onChange={(e) => setFrekuensi(e.target.value as FrekuensiBunga)} id="frekuensi-bunga">
              {FREKUENSI_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <InputNumber id="durasi-investasi" label="Durasi Investasi" value={durasi} onChange={setDurasi} suffix="tahun" placeholder="10" min={1} max={50} />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button id="btn-hitung-bunga-majemuk" className="btn btn-primary btn-lg" onClick={handleHitung} disabled={modalAwal <= 0 || bunga <= 0 || durasi <= 0} style={{ flex: 1 }}>
            📈 Hitung Pertumbuhan
          </button>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-bunga-majemuk">Reset</button>
        </div>
      </div>

      {hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1.5rem' }}>
            <div className="result-main">
              <div className="result-label">Saldo Akhir</div>
              <div className="result-value" style={{ color: 'var(--color-teal-400)' }}>
                {formatRupiah(hasil.saldoAkhir)}
              </div>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <div className="label">Modal Disetor</div>
                <div className="value">{formatRupiah(hasil.modalDisetor)}</div>
              </div>
              <div className="result-item">
                <div className="label">Estimasi Bunga</div>
                <div className="value" style={{ color: 'var(--color-teal-400)' }}>
                  +{formatRupiah(hasil.estimasiPertumbuhan)}
                </div>
              </div>
              <div className="result-item">
                <div className="label">Return</div>
                <div className="value" style={{ color: 'var(--color-gold-400)' }}>
                  {hasil.modalDisetor > 0
                    ? `${((hasil.estimasiPertumbuhan / hasil.modalDisetor) * 100).toFixed(1)}%`
                    : '-'}
                </div>
              </div>
              <div className="result-item">
                <div className="label">Durasi</div>
                <div className="value">{durasi} tahun</div>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <ShareResult title="Kalkulator Bunga Majemuk" text={shareText} />
            </div>
          </div>

          {/* GRAFIK */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              📊 Grafik Pertumbuhan
            </h3>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hasil.dataGrafik} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis
                    dataKey="tahun"
                    tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: 'Tahun', position: 'insideBottom', offset: -2, fill: 'var(--text-muted)', fontSize: 11 }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: '0.8rem', paddingTop: '0.5rem' }}
                    formatter={(value) => (
                      <span style={{ color: 'var(--text-secondary)' }}>{value}</span>
                    )}
                  />
                  <Bar dataKey="modalDisetor" name="Modal Disetor" stackId="a" fill="rgba(61,107,179,0.7)" radius={[0,0,4,4]} />
                  <Bar dataKey="bungaAkumulasi" name="Bunga Akumulasi" stackId="a" fill="rgba(0,194,168,0.8)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="disclaimer">
            ⚠️ Hasil ini adalah estimasi berdasarkan bunga tetap. Reksa dana, saham, dan investasi lain memiliki return yang berfluktuasi. Konsultasikan dengan perencana keuangan profesional.
          </div>

          <RelatedTools currentSlug="kalkulator-bunga-majemuk" />
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Apa itu bunga majemuk?',
            content: <p>Bunga majemuk (compound interest) adalah bunga yang dihitung bukan hanya dari modal awal, tetapi juga dari bunga yang sudah terkumpul sebelumnya. Inilah yang Einstein disebut &ldquo;keajaiban dunia ke-8.&rdquo;</p>,
          },
          {
            title: 'Kenapa kontribusi rutin sangat penting?',
            content: <p>Dengan menambahkan kontribusi rutin bulanan, Anda mempercepat pertumbuhan secara eksponensial. Misalnya, Rp 1 juta/bulan selama 10 tahun dengan bunga 8%/tahun bisa menghasilkan lebih dari Rp 180 juta dari total modal Rp 120 juta.</p>,
          },
        ]}
      />
    </div>
  );
}
