'use client';

import { useState } from 'react';
import { hitungTargetTabungan } from '@/lib/calculators/targetTabungan';
import { formatRupiah } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import InputNumber from '@/components/ui/InputNumber';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';

export default function TargetTabunganPage() {
  const [target, setTarget] = useState(0);
  const [danaAwal, setDanaAwal] = useState(0);
  const [durasi, setDurasi] = useState(0);
  const [bunga, setBunga] = useState(0);
  const [hasil, setHasil] = useState<ReturnType<typeof hitungTargetTabungan> | null>(null);

  function handleHitung() {
    setHasil(hitungTargetTabungan(target, danaAwal, durasi, bunga));
  }

  function handleReset() {
    setTarget(0);
    setDanaAwal(0);
    setDurasi(0);
    setBunga(0);
    setHasil(null);
  }

  const shareText = hasil
    ? `Target: ${formatRupiah(target)} dalam ${durasi} tahun\nTabungan bulanan: ${formatRupiah(hasil.tabunganBulanan)}`
    : '';

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>🎯 Keuangan</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator Target Tabungan</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Ingin beli rumah, mobil, atau liburan? Hitung berapa yang harus ditabung setiap bulan untuk mencapai target finansial Anda.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <InputCurrency id="target-tabungan" label="Target Nominal" value={target} onChange={setTarget} placeholder="100.000.000" hint="Berapa total yang ingin dicapai?" />
          <InputCurrency id="dana-awal-tabungan" label="Dana Awal (opsional)" value={danaAwal} onChange={setDanaAwal} placeholder="0" hint="Tabungan yang sudah ada saat ini" />
          <InputNumber id="durasi-tabungan" label="Durasi" value={durasi} onChange={setDurasi} suffix="tahun" placeholder="3" min={1} max={30} />
          <InputNumber id="bunga-tabungan" label="Estimasi Bunga per Tahun (opsional)" value={bunga} onChange={setBunga} suffix="% / thn" placeholder="0" min={0} max={100} step={0.1} decimals={2} hint="Isi 0 jika tidak ada bunga" />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button id="btn-hitung-target" className="btn btn-primary btn-lg" onClick={handleHitung} disabled={target <= 0 || durasi <= 0} style={{ flex: 1 }}>
            🎯 Hitung Target
          </button>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-target">Reset</button>
        </div>
      </div>

      {hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            <div className="result-main">
              <div className="result-label">Tabungan Bulanan yang Dibutuhkan</div>
              <div className="result-value">{formatRupiah(hasil.tabunganBulanan)}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                per bulan selama {durasi} tahun
              </p>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <div className="label">Target</div>
                <div className="value">{formatRupiah(target)}</div>
              </div>
              <div className="result-item">
                <div className="label">Dana Awal</div>
                <div className="value">{formatRupiah(danaAwal)}</div>
              </div>
              <div className="result-item">
                <div className="label">Total Setoran</div>
                <div className="value">{formatRupiah(hasil.totalTabungan)}</div>
              </div>
              <div className="result-item">
                <div className="label">Estimasi Bunga</div>
                <div className="value" style={{ color: 'var(--color-teal-400)' }}>
                  +{formatRupiah(hasil.bungaEstimasi)}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <ShareResult title="Kalkulator Target Tabungan" text={shareText} />
            </div>
          </div>

          <RelatedTools currentSlug="kalkulator-target-tabungan" />
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Cara menghitung target tabungan',
            content: <p>Kalkuloka menggunakan formula Present Value (PV) untuk menghitung berapa yang harus ditabung per bulan. Jika ada estimasi bunga, efek bunga majemuk diperhitungkan sehingga tabungan bulanan yang dibutuhkan lebih kecil.</p>,
          },
          {
            title: 'Contoh: Target Rp 100 juta dalam 3 tahun',
            content: (
              <div>
                <p>Tanpa bunga: Rp 100.000.000 ÷ 36 bulan = <strong style={{ color: 'var(--text-accent)' }}>Rp 2.777.778/bulan</strong></p>
                <p style={{ marginTop: '0.4rem' }}>Dengan bunga 5%/tahun: ≈ <strong style={{ color: 'var(--text-accent)' }}>Rp 2.610.000/bulan</strong> (lebih hemat karena bunga membantu)</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
