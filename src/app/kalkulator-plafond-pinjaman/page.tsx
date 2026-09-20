'use client';

import { useState } from 'react';
import { hitungPlafond } from '@/lib/calculators/plafondPinjaman';
import { formatRupiah, formatPercent } from '@/lib/formatters';
import InputCurrency from '@/components/ui/InputCurrency';
import InputNumber from '@/components/ui/InputNumber';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';
import TrakteerCTA from '@/components/calculator/TrakteerCTA';

const PERSEN_PRESETS = [25, 30, 35, 40];

const KATEGORI_COLOR: Record<string, string> = {
  aman: 'var(--color-teal-400)',
  perhatian: '#FFAA00',
  berisiko: '#ef4444',
};

const KATEGORI_ICON: Record<string, string> = {
  aman: '✅',
  perhatian: '⚠️',
  berisiko: '🚨',
};

const KATEGORI_LABEL: Record<string, string> = {
  aman: 'Aman — cicilan tidak memberatkan',
  perhatian: 'Perhatian — mendekati batas aman',
  berisiko: 'Berisiko — cicilan terlalu berat',
};

export default function PlafondPinjamanPage() {
  const [gajiBersih, setGajiBersih] = useState(0);
  const [persenMaksimal, setPersenMaksimal] = useState(30);
  const [bungaTahunan, setBungaTahunan] = useState(10);
  const [tenorBulan, setTenorBulan] = useState(36);
  const [hasil, setHasil] = useState<ReturnType<typeof hitungPlafond> | null>(null);

  function handleHitung() {
    setHasil(hitungPlafond(gajiBersih, persenMaksimal, bungaTahunan, tenorBulan));
  }

  function handleReset() {
    setGajiBersih(0);
    setPersenMaksimal(30);
    setBungaTahunan(10);
    setTenorBulan(36);
    setHasil(null);
  }

  const valid = gajiBersih > 0 && persenMaksimal > 0 && tenorBulan > 0;

  const shareText = hasil
    ? `Plafond pinjaman: ${formatRupiah(hasil.plafondMaksimal)}\nCicilan maks: ${formatRupiah(hasil.cicilanBulanan)}/bulan (${persenMaksimal}% gaji)\nTenor: ${tenorBulan} bulan @ ${bungaTahunan}% p.a.`
    : '';

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>💰 Keuangan</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator Plafond Pinjaman</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Hitung berapa besar pinjaman yang bisa disetujui bank berdasarkan gaji dan persentase cicilan. Menggunakan formula <strong>Present Value (PV)</strong> seperti di Excel.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <InputCurrency
            id="gaji-bersih"
            label="Gaji Bersih (Take Home Pay) per Bulan"
            value={gajiBersih}
            onChange={setGajiBersih}
            placeholder="5.000.000"
            hint="Gaji yang benar-benar diterima setelah potongan pajak, BPJS, dll."
          />

          {/* Preset tombol persentase */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              Maksimal Cicilan dari Gaji: <span style={{ color: 'var(--text-accent)' }}>{persenMaksimal}%</span>
              {gajiBersih > 0 && (
                <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
                  {' '}= {formatRupiah((gajiBersih * persenMaksimal) / 100)}/bulan
                </span>
              )}
            </label>
            {/* Quick-select preset */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
              {PERSEN_PRESETS.map((p) => (
                <button
                  key={p}
                  id={`preset-persen-${p}`}
                  onClick={() => setPersenMaksimal(p)}
                  className={persenMaksimal === p ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                  style={{ minWidth: 52 }}
                >
                  {p}%
                </button>
              ))}
            </div>
            {/* Slider + input angka manual — sinkron */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <input
                id="persen-cicilan"
                type="range"
                min={1}
                max={100}
                step={1}
                value={persenMaksimal}
                onChange={(e) => setPersenMaksimal(Number(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--color-teal-500)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
                <input
                  id="persen-cicilan-manual"
                  type="number"
                  min={1}
                  max={100}
                  step={1}
                  value={persenMaksimal}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(1, Number(e.target.value)));
                    if (!isNaN(val)) setPersenMaksimal(val);
                  }}
                  style={{
                    width: '4rem',
                    padding: '0.4rem 0.5rem',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-secondary)' }}>%</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>1% (minimum)</span>
              <span>100% (seluruh gaji)</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <InputNumber
              id="bunga-tahunan"
              label="Bunga per Tahun (%)"
              value={bungaTahunan}
              onChange={setBungaTahunan}
              placeholder="10"
              min={0}
              max={30}
              step={0.1}
              hint="Misal KTA 10-15%, KPR 7-9%"
            />
            <InputNumber
              id="tenor-bulan"
              label="Tenor (bulan)"
              value={tenorBulan}
              onChange={setTenorBulan}
              placeholder="36"
              min={1}
              max={360}
              step={1}
              hint="Misal 12, 24, 36, 60 bulan"
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button
            id="btn-hitung-plafond"
            className="btn btn-primary btn-lg"
            onClick={handleHitung}
            disabled={!valid}
            style={{ flex: 1 }}
          >
            💰 Hitung Plafond
          </button>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-plafond">Reset</button>
        </div>
      </div>

      {hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            <div className="result-main">
              <div className="result-label">Plafond Pinjaman Maksimal</div>
              <div className="result-value">{formatRupiah(hasil.plafondMaksimal)}</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Dengan cicilan <strong style={{ color: 'var(--text-accent)' }}>{formatRupiah(hasil.cicilanBulanan)}</strong>/bulan selama{' '}
                <strong style={{ color: 'var(--text-accent)' }}>{tenorBulan} bulan</strong>
              </p>
            </div>

            {/* Kategori risiko */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1rem',
              background: `${KATEGORI_COLOR[hasil.rekomendasiKategori]}12`,
              border: `1px solid ${KATEGORI_COLOR[hasil.rekomendasiKategori]}30`,
              borderRadius: '10px',
              marginTop: '1rem',
            }}>
              <span style={{ fontSize: '1.3rem' }}>{KATEGORI_ICON[hasil.rekomendasiKategori]}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: KATEGORI_COLOR[hasil.rekomendasiKategori] }}>
                  Rasio Cicilan: {formatPercent(hasil.rasioDebt, 0)} dari Gaji
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                  {KATEGORI_LABEL[hasil.rekomendasiKategori]}
                </div>
              </div>
            </div>

            <div className="result-grid" style={{ marginTop: '1rem' }}>
              <div className="result-item">
                <div className="label">Cicilan per Bulan</div>
                <div className="value">{formatRupiah(hasil.cicilanBulanan)}</div>
              </div>
              <div className="result-item">
                <div className="label">Total Bayar</div>
                <div className="value">{formatRupiah(hasil.totalBayar)}</div>
              </div>
              <div className="result-item">
                <div className="label">Total Bunga</div>
                <div className="value" style={{ color: '#ef4444' }}>{formatRupiah(hasil.totalBunga)}</div>
              </div>
              <div className="result-item">
                <div className="label">Efektif Bunga</div>
                <div className="value">{formatPercent(bungaTahunan, 1)} p.a.</div>
              </div>
            </div>

            {/* Tabel amortisasi mini */}
            {hasil.tabelAmortisasi.length > 0 && (
              <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Simulasi Amortisasi (12 bulan pertama)
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                      <th style={{ padding: '0.4rem 0.6rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600 }}>Bln</th>
                      <th style={{ padding: '0.4rem 0.6rem', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 600 }}>Pokok</th>
                      <th style={{ padding: '0.4rem 0.6rem', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 600 }}>Bunga</th>
                      <th style={{ padding: '0.4rem 0.6rem', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 600 }}>Sisa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hasil.tabelAmortisasi.map((row) => (
                      <tr key={row.bulan} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '0.4rem 0.6rem', color: 'var(--text-muted)' }}>{row.bulan}</td>
                        <td style={{ padding: '0.4rem 0.6rem', textAlign: 'right', color: 'var(--text-secondary)' }}>{formatRupiah(row.pokok)}</td>
                        <td style={{ padding: '0.4rem 0.6rem', textAlign: 'right', color: '#ef4444' }}>{formatRupiah(row.bunga)}</td>
                        <td style={{ padding: '0.4rem 0.6rem', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 600 }}>{formatRupiah(row.saldo)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {tenorBulan > 12 && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    * Menampilkan 12 bulan pertama dari total {tenorBulan} bulan.
                  </p>
                )}
              </div>
            )}

            <div style={{ marginTop: '1.25rem' }}>
              <ShareResult title="Kalkulator Plafond Pinjaman" text={shareText} />
            </div>

            <TrakteerCTA />
          </div>

          <RelatedTools currentSlug="kalkulator-plafond-pinjaman" />
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Apa itu Plafond Pinjaman?',
            content: (
              <p>
                Plafond adalah batas maksimal pinjaman yang disetujui bank. Bank umumnya mensyaratkan cicilan tidak lebih dari <strong>30–40% gaji bersih</strong>. Dengan formula ini, kamu bisa tahu di awal berapa plafond yang realistis sebelum mengajukan kredit.
              </p>
            ),
          },
          {
            title: 'Formula Present Value (PV)',
            content: (
              <div>
                <p>Kalkulator ini menggunakan formula Excel <code style={{ color: 'var(--color-teal-400)', fontSize: '0.875rem' }}>PV(rate, nper, pmt)</code>:</p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Plafond = Cicilan × [1 − (1 + r)^(−n)] / r</strong>
                </p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Di mana r = bunga per bulan, n = tenor bulan, Cicilan = % × gaji bersih.
                </p>
              </div>
            ),
          },
          {
            title: 'Panduan rasio cicilan',
            content: (
              <div>
                <p><strong style={{ color: 'var(--color-teal-400)' }}>≤ 30% gaji</strong> — Sangat aman, disarankan untuk peminjam pertama kali.</p>
                <p style={{ marginTop: '0.4rem' }}><strong style={{ color: '#FFAA00' }}>31–40% gaji</strong> — Masih bisa, tapi perlu disiplin finansial ketat.</p>
                <p style={{ marginTop: '0.4rem' }}><strong style={{ color: '#ef4444' }}>&gt; 40% gaji</strong> — Berisiko. Bank banyak yang menolak di atas threshold ini.</p>
              </div>
            ),
          },
          {
            title: 'Disclaimer',
            content: (
              <p>
                Hasil kalkulasi bersifat estimasi berdasarkan formula standar. Plafond aktual ditentukan oleh bank dan mempertimbangkan faktor lain: skor kredit (BI Checking/SLIK), riwayat kredit, jaminan, dan kebijakan internal bank masing-masing.
              </p>
            ),
          },
        ]}
      />
    </div>
  );
}
