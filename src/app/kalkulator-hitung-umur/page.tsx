'use client';

import { useState } from 'react';
import { hitungUmur, hitungSelisihTanggal } from '@/lib/calculators/hitungUmur';
import RelatedTools from '@/components/calculator/RelatedTools';
import InfoSection from '@/components/calculator/InfoSection';
import ShareResult from '@/components/calculator/ShareResult';
import TrakteerCTA from '@/components/calculator/TrakteerCTA';

const MODE_TABS = [
  { id: 'umur', label: '🎂 Hitung Umur' },
  { id: 'selisih', label: '📅 Selisih Tanggal' },
];

function formatTanggal(d: Date): string {
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function HitungUmurPage() {
  const [mode, setMode] = useState<'umur' | 'selisih'>('umur');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [tanggalAcuan, setTanggalAcuan] = useState(getToday());
  const [tanggal1, setTanggal1] = useState('');
  const [tanggal2, setTanggal2] = useState(getToday());
  const [hasil, setHasil] = useState<ReturnType<typeof hitungUmur> | null>(null);
  const [hasilSelisih, setHasilSelisih] = useState<ReturnType<typeof hitungSelisihTanggal> | null>(null);

  function handleHitung() {
    if (mode === 'umur') {
      if (!tanggalLahir) return;
      const lahir = new Date(tanggalLahir);
      const acuan = tanggalAcuan ? new Date(tanggalAcuan) : new Date();
      setHasil(hitungUmur(lahir, acuan));
      setHasilSelisih(null);
    } else {
      if (!tanggal1 || !tanggal2) return;
      const d1 = new Date(tanggal1);
      const d2 = new Date(tanggal2);
      setHasilSelisih(hitungSelisihTanggal(d1, d2));
      setHasil(null);
    }
  }

  function handleReset() {
    setTanggalLahir('');
    setTanggalAcuan(getToday());
    setTanggal1('');
    setTanggal2(getToday());
    setHasil(null);
    setHasilSelisih(null);
  }

  const shareText = hasil
    ? `Umur saya: ${hasil.tahun} tahun, ${hasil.bulan} bulan, ${hasil.hari} hari\nTotal: ${hasil.totalHari.toLocaleString('id-ID')} hari${hasil.milestones.filter((m) => m.sisa).map((m) => `\n${m.label.replace(/^\S+\s/, '')}: ${m.sisa!.bulanLagi} bulan lagi`).join('')}`
    : hasilSelisih
    ? `Selisih: ${hasilSelisih.tahun} tahun, ${hasilSelisih.bulan} bulan, ${hasilSelisih.hari} hari (${hasilSelisih.totalHari.toLocaleString('id-ID')} hari)`
    : '';

  const canCalculate =
    mode === 'umur' ? !!tanggalLahir : !!tanggal1 && !!tanggal2;

  const showResult = hasil || hasilSelisih;

  return (
    <div className="container-narrow" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>🗓️ Tools Umum</span>
        <h1 style={{ marginBottom: '0.5rem' }}>Kalkulator Hitung Umur</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Hitung umur tepat dalam tahun, bulan, dan hari — atau hitung selisih antara dua tanggal.
        </p>
      </div>

      {/* Mode tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {MODE_TABS.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => { setMode(tab.id as 'umur' | 'selisih'); handleReset(); }}
            className={mode === tab.id ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {mode === 'umur' ? (
            <>
              <div>
                <label htmlFor="tanggal-lahir" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Tanggal Lahir
                </label>
                <input
                  id="tanggal-lahir"
                  type="date"
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  max={getToday()}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.875rem',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label htmlFor="tanggal-acuan" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Hitung sampai tanggal <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(default: hari ini)</span>
                </label>
                <input
                  id="tanggal-acuan"
                  type="date"
                  value={tanggalAcuan}
                  onChange={(e) => setTanggalAcuan(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.875rem',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="tanggal-1" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Tanggal Pertama
                </label>
                <input
                  id="tanggal-1"
                  type="date"
                  value={tanggal1}
                  onChange={(e) => setTanggal1(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.875rem',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label htmlFor="tanggal-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Tanggal Kedua
                </label>
                <input
                  id="tanggal-2"
                  type="date"
                  value={tanggal2}
                  onChange={(e) => setTanggal2(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.875rem',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button
            id="btn-hitung-umur"
            className="btn btn-primary btn-lg"
            onClick={handleHitung}
            disabled={!canCalculate}
            style={{ flex: 1 }}
          >
            🗓️ {mode === 'umur' ? 'Hitung Umur' : 'Hitung Selisih'}
          </button>
          <button className="btn btn-secondary" onClick={handleReset} id="btn-reset-umur">Reset</button>
        </div>
      </div>

      {/* Hasil — Umur */}
      {hasil && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            <div className="result-main">
              <div className="result-label">Umur Saat Ini</div>
              <div className="result-value" style={{ lineHeight: 1.2 }}>
                {hasil.tahun}{' '}
                <span style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-muted)' }}>tahun</span>{' '}
                {hasil.bulan}{' '}
                <span style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-muted)' }}>bulan</span>{' '}
                {hasil.hari}{' '}
                <span style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-muted)' }}>hari</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Lahir {formatTanggal(hasil.hari1)} · Dihitung per {formatTanggal(hasil.hari2)}
              </p>
            </div>

            <div className="result-grid">
              <div className="result-item">
                <div className="label">Total Hari</div>
                <div className="value">{hasil.totalHari.toLocaleString('id-ID')}</div>
              </div>
              <div className="result-item">
                <div className="label">Total Minggu</div>
                <div className="value">{hasil.totalMinggu.toLocaleString('id-ID')}</div>
              </div>
              <div className="result-item">
                <div className="label">Total Bulan</div>
                <div className="value">{hasil.totalBulan.toLocaleString('id-ID')}</div>
              </div>
              {hasil.nextBirthday && (
                <div className="result-item">
                  <div className="label">Ulang Tahun Berikutnya</div>
                  <div className="value" style={{ color: 'var(--color-gold-400)' }}>
                    {hasil.nextBirthday.hariLagi === 0
                      ? '🎉 Hari ini!'
                      : `${hasil.nextBirthday.hariLagi} hari lagi`}
                  </div>
                </div>
              )}
            </div>

            {/* Milestones */}
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Tonggak Usia
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {hasil.milestones.map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                      background: m.sudahLewat ? 'var(--color-teal-500)' : 'var(--border-default)',
                    }} />
                    <span style={{ color: m.sudahLewat ? 'var(--text-secondary)' : 'var(--text-muted)', flex: 1 }}>
                      {m.label}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'right' }}>
                      {m.sisa && (
                        <span style={{ color: 'var(--color-gold-400)', display: 'block', fontSize: '0.75rem', fontWeight: 500 }}>
                          {m.sisa.bulanLagi.toLocaleString('id-ID')} bulan{m.sisa.hariSisa > 0 ? ` ${m.sisa.hariSisa} hari` : ''} lagi
                        </span>
                      )}
                      {formatTanggal(m.tanggal)}
                      {m.sudahLewat ? ' ✓' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <ShareResult title="Kalkulator Hitung Umur" text={shareText} />
            </div>

            <TrakteerCTA />
          </div>

          <RelatedTools currentSlug="kalkulator-hitung-umur" />
        </div>
      )}

      {/* Hasil — Selisih Tanggal */}
      {hasilSelisih && (
        <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="result-section" style={{ marginBottom: '1rem' }}>
            <div className="result-main">
              <div className="result-label">Selisih Tanggal</div>
              <div className="result-value" style={{ lineHeight: 1.2 }}>
                {hasilSelisih.tahun > 0 && (
                  <>{hasilSelisih.tahun}{' '}<span style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-muted)' }}>tahun</span>{' '}</>
                )}
                {hasilSelisih.bulan > 0 && (
                  <>{hasilSelisih.bulan}{' '}<span style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-muted)' }}>bulan</span>{' '}</>
                )}
                {hasilSelisih.hari}{' '}
                <span style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-muted)' }}>hari</span>
              </div>
            </div>
            <div className="result-grid">
              <div className="result-item">
                <div className="label">Total Hari</div>
                <div className="value">{hasilSelisih.totalHari.toLocaleString('id-ID')}</div>
              </div>
              <div className="result-item">
                <div className="label">Total Minggu</div>
                <div className="value">{Math.floor(hasilSelisih.totalHari / 7).toLocaleString('id-ID')}</div>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <ShareResult title="Selisih Tanggal" text={shareText} />
            </div>

            <TrakteerCTA />
          </div>

          <RelatedTools currentSlug="kalkulator-hitung-umur" />
        </div>
      )}

      <InfoSection
        items={[
          {
            title: 'Cara menghitung umur',
            content: (
              <div>
                <p>Umur dihitung dengan mengurangi tahun, bulan, dan hari dari tanggal lahir ke tanggal acuan secara presisi — mempertimbangkan panjang tiap bulan yang berbeda-beda.</p>
                <p style={{ marginTop: '0.5rem' }}>Contoh: Lahir 15 Maret 1990, dihitung per 20 September 2025 = <strong>35 tahun, 6 bulan, 5 hari.</strong></p>
              </div>
            ),
          },
          {
            title: 'Selisih dua tanggal',
            content: <p>Mode Selisih Tanggal berguna untuk menghitung durasi antara dua peristiwa — misalnya lama masa kerja, jatuh tempo kontrak, atau usia pernikahan.</p>,
          },
        ]}
      />
    </div>
  );
}
