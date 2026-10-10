'use client';

import { useState } from 'react';
import { hitungKprBerjenjang, TahapBunga, BarisKpr } from '@/lib/calculators/kprBungaBerjenjang';
import { formatRupiah } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import InputNumber from '@/components/ui/InputNumber';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';

interface TahapForm extends TahapBunga {
  id: number;
}

export default function KalkulatorKprBungaBerjenjangPage() {
  const [pinjaman, setPinjaman] = useState(0);
  const [tenor, setTenor] = useState(0);
  const [tahap, setTahap] = useState<TahapForm[]>([{ id: 1, mulaiTahun: 1, bunga: 0 }]);
  const [nextId, setNextId] = useState(2);
  const [hasil, setHasil] = useState<ReturnType<typeof hitungKprBerjenjang> | null>(null);
  const [showTabel, setShowTabel] = useState(false);

  function updateTahap(id: number, patch: Partial<TahapBunga>) {
    setTahap((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function tambahTahap() {
    const terakhir = tahap[tahap.length - 1];
    setTahap([...tahap, { id: nextId, mulaiTahun: terakhir.mulaiTahun + 1, bunga: terakhir.bunga }]);
    setNextId(nextId + 1);
  }

  function hapusTahap(id: number) {
    setTahap((prev) => prev.filter((t) => t.id !== id));
  }

  function handleHitung() {
    setHasil(hitungKprBerjenjang(pinjaman, tenor, tahap));
    setShowTabel(false);
  }

  function handleReset() {
    setPinjaman(0);
    setTenor(0);
    setTahap([{ id: 1, mulaiTahun: 1, bunga: 0 }]);
    setNextId(2);
    setHasil(null);
    setShowTabel(false);
  }

  const tahapDiluarTenor = tenor > 0 && tahap.some((t) => t.mulaiTahun > tenor);
  const valid = pinjaman > 0 && tenor > 0 && tahap.every((t) => t.bunga > 0 && t.mulaiTahun >= 1);

  const shareText = hasil
    ? `KPR ${formatRupiah(pinjaman)}, tenor ${tenor} tahun\n` +
      hasil.ringkasan
        .map((r) => `Bunga ${r.bungaTahunan}% (thn ${Math.ceil(r.dariBulan / 12)}-${Math.ceil(r.sampaiBulan / 12)}): ${formatRupiah(r.cicilanBulanan)}/bulan`)
        .join('\n') +
      `\nTotal Bunga: ${formatRupiah(hasil.totalBunga)}\nTotal Bayar: ${formatRupiah(hasil.totalPembayaran)}`
    : '';

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>🏠 Keuangan</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator KPR Bunga Berjenjang</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Hitung cicilan KPR dengan bunga yang berubah di tahun tertentu, misalnya bunga promo di awal lalu naik
          di tahun ke-6 dan ke-10. Cicilan dihitung ulang setiap bunga berubah.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <InputCurrency id="kpr-pinjaman" label="Jumlah Pinjaman KPR" value={pinjaman} onChange={setPinjaman} placeholder="500.000.000" />
          <InputNumber id="kpr-tenor" label="Tenor" value={tenor} onChange={setTenor} suffix="tahun" placeholder="20" min={1} max={35} />

          <div className="input-group">
            <label className="input-label">Bunga per Periode</label>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {tahap.map((t, i) => (
                <div
                  key={t.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: '0.75rem',
                    alignItems: 'start',
                    padding: '0.75rem',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  {i === 0 ? (
                    <div className="input-group">
                      <label className="input-label">Mulai tahun ke</label>
                      <div style={{ padding: '0.65rem 0', fontWeight: 600 }}>1 (awal)</div>
                    </div>
                  ) : (
                    <InputNumber
                      id={`kpr-mulai-${t.id}`}
                      label="Mulai tahun ke"
                      value={t.mulaiTahun}
                      onChange={(v) => updateTahap(t.id, { mulaiTahun: v })}
                      min={2}
                      max={35}
                    />
                  )}
                  <InputNumber
                    id={`kpr-bunga-${t.id}`}
                    label="Bunga"
                    value={t.bunga}
                    onChange={(v) => updateTahap(t.id, { bunga: v })}
                    suffix="% / thn"
                    placeholder="10"
                    min={0}
                    max={100}
                    step={0.1}
                    decimals={2}
                  />
                  {i > 0 && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => hapusTahap(t.id)}
                      id={`kpr-hapus-${t.id}`}
                      style={{ gridColumn: '1 / -1', justifySelf: 'end' }}
                    >
                      ✕ Hapus periode
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button className="btn btn-secondary btn-sm" onClick={tambahTahap} id="kpr-tambah-tahap" style={{ marginTop: '0.75rem' }}>
              + Tambah perubahan bunga
            </button>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Bunga berlaku mulai tahun yang ditentukan sampai tahun sebelum perubahan berikutnya.
            </div>
            {tahapDiluarTenor && (
              <div style={{ fontSize: '0.78rem', color: 'var(--color-gold-400)', marginTop: '0.25rem' }}>
                Periode yang dimulai setelah tenor berakhir akan diabaikan.
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button id="btn-hitung-kpr" className="btn btn-primary btn-lg" onClick={handleHitung} disabled={!valid} style={{ flex: 1 }}>
            🏠 Hitung KPR
          </button>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-kpr">Reset</button>
        </div>
      </div>

      {hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            <div className="result-main">
              <div className="result-label">Cicilan Bulan Pertama</div>
              <div className="result-value">{formatRupiah(hasil.ringkasan[0]?.cicilanBulanan ?? 0)}</div>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <div className="label">Total Bunga</div>
                <div className="value" style={{ color: 'var(--color-gold-400)' }}>{formatRupiah(hasil.totalBunga)}</div>
              </div>
              <div className="result-item">
                <div className="label">Total Pembayaran</div>
                <div className="value">{formatRupiah(hasil.totalPembayaran)}</div>
              </div>
            </div>

            <div className="divider" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>Cicilan per Periode Bunga</h3>
            <div style={{ overflow: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Periode</th>
                    <th>Bunga</th>
                    <th>Cicilan / bulan</th>
                    <th>Bunga dibayar</th>
                  </tr>
                </thead>
                <tbody>
                  {hasil.ringkasan.map((r) => (
                    <tr key={r.dariBulan}>
                      <td>Tahun {Math.ceil(r.dariBulan / 12)}–{Math.ceil(r.sampaiBulan / 12)}</td>
                      <td>{r.bungaTahunan}%</td>
                      <td style={{ color: 'var(--text-accent)', fontWeight: 700 }}>{formatRupiah(r.cicilanBulanan)}</td>
                      <td style={{ color: 'var(--color-gold-400)' }}>{formatRupiah(r.totalBunga)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divider" />
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowTabel(!showTabel)} id="btn-toggle-amortisasi-kpr">
                📋 {showTabel ? 'Sembunyikan' : 'Lihat'} Tabel Amortisasi
              </button>
              <ShareResult title="Kalkulator KPR Bunga Berjenjang" text={shareText} />
            </div>
          </div>

          {showTabel && (
            <div className="glass-card" style={{ padding: '1.25rem', overflow: 'auto', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>
                📋 Tabel Amortisasi ({hasil.tabelAmortisasi.length} baris)
              </h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Bulan</th>
                    <th>Bunga %</th>
                    <th>Pokok</th>
                    <th>Bunga</th>
                    <th>Total Cicilan</th>
                    <th>Sisa Pinjaman</th>
                  </tr>
                </thead>
                <tbody>
                  {hasil.tabelAmortisasi.map((row: BarisKpr) => (
                    <tr key={row.bulan}>
                      <td>{row.bulan}</td>
                      <td>{row.bungaTahunan}%</td>
                      <td>{formatRupiah(row.angsuranPokok)}</td>
                      <td style={{ color: 'var(--color-gold-400)' }}>{formatRupiah(row.angsuranBunga)}</td>
                      <td style={{ color: 'var(--text-accent)', fontWeight: 700 }}>{formatRupiah(row.totalAngsuran)}</td>
                      <td>{formatRupiah(row.sisaPinjaman)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <RelatedTools currentSlug="kalkulator-kpr-bunga-berjenjang" />
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Apa itu KPR bunga berjenjang?',
            content: <p>KPR dengan bunga yang berubah sesuai periode, misalnya bunga tetap (fixed) beberapa tahun pertama, lalu naik atau mengambang di tahun-tahun berikutnya. Setiap kali bunga berubah, bank menghitung ulang cicilan dari sisa pokok dan sisa tenor.</p>,
          },
          {
            title: 'Cara mengisi periode bunga',
            content: <p>Isi bunga tahun pertama, lalu tekan &quot;Tambah perubahan bunga&quot; untuk setiap kenaikan. Contoh: 10% dari tahun 1, 12% mulai tahun ke-6, dan 14% mulai tahun ke-10. Bunga 10% berlaku sampai tahun ke-5 dan seterusnya sampai perubahan berikutnya.</p>,
          },
          {
            title: 'Apakah hasilnya sama dengan bank?',
            content: <p>Ini estimasi dengan metode anuitas. Biaya provisi, administrasi, asuransi, dan pembulatan bank tidak termasuk, jadi angka di bank bisa sedikit berbeda. Konfirmasi selalu dengan bank Anda.</p>,
          },
        ]}
      />
    </div>
  );
}
