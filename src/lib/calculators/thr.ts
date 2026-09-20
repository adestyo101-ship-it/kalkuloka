import { round } from '../formatters';

// Berdasarkan Permenaker No. 6 Tahun 2016
const SUMBER_REGULASI = 'Permenaker No. 6 Tahun 2016. Terakhir diverifikasi: 2024.';

export interface HasilTHR {
  estimasiTHR: number;
  keterangan: string;
  sumberRegulasi: string;
}

/**
 * Hitung estimasi THR berdasarkan Permenaker No. 6 Tahun 2016.
 * 
 * Masa kerja < 1 bulan: 0 (belum berhak)
 * Masa kerja 1 bulan–12 bulan: (masa_kerja / 12) × gaji
 * Masa kerja ≥ 12 bulan (1 tahun): 1 × gaji
 */
export function hitungTHR(gajiPokok: number, masaKerjaTahun: number, masaKerjaBulan: number): HasilTHR {
  const totalBulan = masaKerjaTahun * 12 + masaKerjaBulan;

  if (gajiPokok <= 0) {
    return { estimasiTHR: 0, keterangan: 'Masukkan gaji pokok yang valid.', sumberRegulasi: SUMBER_REGULASI };
  }

  if (totalBulan < 1) {
    return {
      estimasiTHR: 0,
      keterangan: 'Masa kerja kurang dari 1 bulan. Karyawan belum berhak mendapat THR.',
      sumberRegulasi: SUMBER_REGULASI,
    };
  }

  if (totalBulan >= 12) {
    return {
      estimasiTHR: round(gajiPokok),
      keterangan: `Masa kerja ${masaKerjaTahun} tahun ${masaKerjaBulan} bulan (≥ 12 bulan). THR = 1 bulan gaji.`,
      sumberRegulasi: SUMBER_REGULASI,
    };
  }

  // Proporsional
  const thr = round((totalBulan / 12) * gajiPokok);
  return {
    estimasiTHR: thr,
    keterangan: `Masa kerja ${totalBulan} bulan. THR = (${totalBulan}/12) × gaji = ${thr.toLocaleString('id-ID')}.`,
    sumberRegulasi: SUMBER_REGULASI,
  };
}
