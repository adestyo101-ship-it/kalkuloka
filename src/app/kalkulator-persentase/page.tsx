'use client';

import { useState } from 'react';
import { hitungPersentase, ModePersentase } from '@/lib/calculators/persentase';
import { formatRupiah } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import InputNumber from '@/components/ui/InputNumber';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';

const MODES: { value: ModePersentase; label: string; emoji: string; desc: string }[] = [
  { value: 'xPersenDariY', label: 'X% dari Y', emoji: '🔢', desc: 'Hitung nilai dari suatu persentase' },
  { value: 'kenaikanAkeB', label: 'Kenaikan', emoji: '📈', desc: 'Berapa % kenaikan dari A ke B?' },
  { value: 'penurunanAkeB', label: 'Penurunan', emoji: '📉', desc: 'Berapa % penurunan dari A ke B?' },
  { value: 'xPersenDariTotal', label: 'Bagian dari Total', emoji: '🍕', desc: 'X adalah berapa % dari Y?' },
];

export default function PersentasePage() {
  const [mode, setMode] = useState<ModePersentase>('xPersenDariY');
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [hasil, setHasil] = useState<ReturnType<typeof hitungPersentase> | null>(null);

  function handleChange(newA = a, newB = b) {
    if (newA > 0 || newB > 0) {
      setHasil(hitungPersentase(mode, newA, newB));
    }
  }

  function handleModeChange(newMode: ModePersentase) {
    setMode(newMode);
    setA(0);
    setB(0);
    setHasil(null);
  }

  function handleA(val: number) {
    setA(val);
    if (val > 0 || b > 0) setHasil(hitungPersentase(mode, val, b));
  }

  function handleB(val: number) {
    setB(val);
    if (a > 0 || val > 0) setHasil(hitungPersentase(mode, a, val));
  }

  const shareText = hasil ? `${hasil.keterangan}` : '';

  const currentMode = MODES.find((m) => m.value === mode)!;

  function renderInputs() {
    switch (mode) {
      case 'xPersenDariY':
        return (
          <>
            <InputNumber id="persen-x" label="Persentase" value={a} onChange={handleA} suffix="%" placeholder="20" min={0} />
            <InputCurrency id="angka-y" label="Dari Angka" value={b} onChange={handleB} placeholder="500.000" />
          </>
        );
      case 'kenaikanAkeB':
        return (
          <>
            <InputCurrency id="nilai-awal-naik" label="Nilai Awal" value={a} onChange={handleA} placeholder="500.000" />
            <InputCurrency id="nilai-akhir-naik" label="Nilai Akhir" value={b} onChange={handleB} placeholder="650.000" />
          </>
        );
      case 'penurunanAkeB':
        return (
          <>
            <InputCurrency id="nilai-awal-turun" label="Nilai Awal" value={a} onChange={handleA} placeholder="100.000" />
            <InputCurrency id="nilai-akhir-turun" label="Nilai Akhir" value={b} onChange={handleB} placeholder="75.000" />
          </>
        );
      case 'xPersenDariTotal':
        return (
          <>
            <InputCurrency id="bagian" label="Bagian (X)" value={a} onChange={handleA} placeholder="50.000" />
            <InputCurrency id="total-keseluruhan" label="Total (Y)" value={b} onChange={handleB} placeholder="200.000" />
          </>
        );
    }
  }

  const isPercent = mode !== 'xPersenDariY';

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>% Tools Umum</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator Persentase</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Satu halaman untuk semua jenis perhitungan persentase. Hasil langsung tampil saat Anda mengetik.
        </p>
      </div>

      {/* Mode Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {MODES.map((m) => (
          <button
            key={m.value}
            className={`btn ${mode === m.value ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleModeChange(m.value)}
            id={`tab-${m.value}`}
            style={{
              justifyContent: 'flex-start',
              textAlign: 'left',
              padding: '0.75rem 0.875rem',
              gap: '0.5rem',
              whiteSpace: 'normal',
              minWidth: 0,
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{m.emoji}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{m.label}</div>
              <div style={{ fontSize: '0.72rem', opacity: 0.7, fontWeight: 400 }}>{m.desc}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-accent)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {currentMode.emoji} {currentMode.label} — {currentMode.desc}
        </p>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {renderInputs()}
        </div>

        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => { setA(0); setB(0); setHasil(null); }}
            id="btn-reset-persentase"
          >
            Reset
          </button>
        </div>
      </div>

      {hasil && (hasil.hasil !== 0 || mode === 'xPersenDariY') && (
        <div style={{ animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)', marginBottom: '1rem' }}>
          <div className="result-section">
            <div className="result-main">
              <div className="result-label">Hasil</div>
              <div className="result-value" style={{ color: 'var(--color-teal-400)' }}>
                {isPercent
                  ? `${hasil.hasil.toFixed(2).replace('.', ',')}%`
                  : formatRupiah(hasil.hasil)}
              </div>
            </div>
            <div
              style={{
                textAlign: 'center',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                padding: '0.5rem',
              }}
            >
              {hasil.keterangan}
            </div>
            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center' }}>
              <ShareResult title="Kalkulator Persentase" text={shareText} />
            </div>
          </div>
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Cara menghitung persentase',
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <p><strong style={{ color: 'var(--text-primary)' }}>X% dari Y:</strong> Y × (X/100). Contoh: 20% dari 500.000 = 100.000</p>
                <p><strong style={{ color: 'var(--text-primary)' }}>Kenaikan A ke B:</strong> (B−A)/A × 100. Contoh: 500.000 ke 650.000 = 30%</p>
                <p><strong style={{ color: 'var(--text-primary)' }}>Penurunan A ke B:</strong> (A−B)/A × 100. Contoh: 100.000 ke 75.000 = 25%</p>
                <p><strong style={{ color: 'var(--text-primary)' }}>X dari total Y:</strong> X/Y × 100. Contoh: 50.000 dari 200.000 = 25%</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
