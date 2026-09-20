import { round } from '../formatters';

export interface HasilTargetTabungan {
  tabunganBulanan: number;
  totalTabungan: number;
  bungaEstimasi: number;
  kekurangan: number;
}

export function hitungTargetTabungan(
  targetNominal: number,
  danaAwal: number,
  durasiTahun: number,
  bungaTahunan: number
): HasilTargetTabungan {
  if (targetNominal <= 0 || durasiTahun <= 0) {
    return { tabunganBulanan: 0, totalTabungan: 0, bungaEstimasi: 0, kekurangan: 0 };
  }

  const totalBulan = durasiTahun * 12;
  const r = bungaTahunan / 100 / 12; // bunga bulanan

  if (bungaTahunan <= 0) {
    // Tanpa bunga: hitung linear
    const sisa = Math.max(0, targetNominal - danaAwal);
    const tabunganBulanan = round(sisa / totalBulan);
    return {
      tabunganBulanan,
      totalTabungan: round(danaAwal + tabunganBulanan * totalBulan),
      bungaEstimasi: 0,
      kekurangan: 0,
    };
  }

  // Dengan bunga majemuk:
  // FV = PV*(1+r)^n + PMT * [((1+r)^n - 1) / r]
  // Solve for PMT (tabungan bulanan)
  const faktor = Math.pow(1 + r, totalBulan);
  const fvDanaAwal = danaAwal * faktor;
  const sisaTarget = targetNominal - fvDanaAwal;

  let tabunganBulanan = 0;
  if (sisaTarget > 0) {
    tabunganBulanan = round((sisaTarget * r) / (faktor - 1));
  }

  const totalTabungan = round(danaAwal + tabunganBulanan * totalBulan);
  const bungaEstimasi = round(targetNominal - totalTabungan);

  return {
    tabunganBulanan: Math.max(0, tabunganBulanan),
    totalTabungan,
    bungaEstimasi: Math.max(0, bungaEstimasi),
    kekurangan: 0,
  };
}
