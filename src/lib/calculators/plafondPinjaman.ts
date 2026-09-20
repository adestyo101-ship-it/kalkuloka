// Kalkulator Plafond Pinjaman dari Persentase Gaji
// Formula: Present Value (PV) dari Excel — seberapa besar pinjaman yang bisa dilayani
// dari cicilan maksimal = persentase tertentu dari gaji bersih

export interface PlafondResult {
  plafondMaksimal: number;          // PV — nilai pinjaman yang bisa diterima
  cicilanBulanan: number;           // angsuran yang direncanakan (= % gaji)
  totalBayar: number;               // total semua cicilan
  totalBunga: number;               // total bunga yang dibayar
  rasioDebt: number;                // debt-to-income ratio (%)
  rekomendasiKategori: 'aman' | 'perhatian' | 'berisiko';
  tabelAmortisasi: {
    bulan: number;
    pokok: number;
    bunga: number;
    saldo: number;
  }[];
}

/**
 * Menghitung plafond pinjaman maksimal menggunakan formula Excel PV:
 * PV = PMT × [1 - (1 + r)^(-n)] / r
 *
 * @param gajiBersih - Take home pay bulanan (Rp)
 * @param persenMaksimal - Persentase gaji yang boleh jadi cicilan (misal: 30 untuk 30%)
 * @param bungaTahunan - Bunga kredit per tahun (%)
 * @param tenorBulan - Jangka waktu pinjaman (bulan)
 * @param modeBunga - 'anuitas' (flat rate) atau 'efektif'
 */
export function hitungPlafond(
  gajiBersih: number,
  persenMaksimal: number,
  bungaTahunan: number,
  tenorBulan: number,
  modeBunga: 'anuitas' | 'efektif' = 'anuitas'
): PlafondResult | null {
  if (gajiBersih <= 0 || persenMaksimal <= 0 || persenMaksimal > 100 || tenorBulan <= 0) {
    return null;
  }

  const cicilanBulanan = (gajiBersih * persenMaksimal) / 100;
  const r = bungaTahunan / 100 / 12; // bunga per bulan

  let plafondMaksimal: number;

  if (r === 0) {
    // Tanpa bunga: PV = PMT × n
    plafondMaksimal = cicilanBulanan * tenorBulan;
  } else {
    // Excel PV formula: PV = PMT × [1 - (1+r)^-n] / r
    plafondMaksimal = cicilanBulanan * (1 - Math.pow(1 + r, -tenorBulan)) / r;
  }

  const totalBayar = cicilanBulanan * tenorBulan;
  const totalBunga = totalBayar - plafondMaksimal;
  const rasioDebt = persenMaksimal;

  let rekomendasiKategori: PlafondResult['rekomendasiKategori'];
  if (rasioDebt <= 30) rekomendasiKategori = 'aman';
  else if (rasioDebt <= 40) rekomendasiKategori = 'perhatian';
  else rekomendasiKategori = 'berisiko';

  // Tabel amortisasi (anuitas — cicilan tetap)
  const tabelAmortisasi: PlafondResult['tabelAmortisasi'] = [];
  let saldo = plafondMaksimal;

  for (let i = 1; i <= Math.min(tenorBulan, 12); i++) {
    const bunga = r > 0 ? saldo * r : 0;
    const pokok = cicilanBulanan - bunga;
    saldo = Math.max(0, saldo - pokok);
    tabelAmortisasi.push({
      bulan: i,
      pokok: Math.round(pokok),
      bunga: Math.round(bunga),
      saldo: Math.round(saldo),
    });
  }

  return {
    plafondMaksimal: Math.round(plafondMaksimal),
    cicilanBulanan: Math.round(cicilanBulanan),
    totalBayar: Math.round(totalBayar),
    totalBunga: Math.round(totalBunga),
    rasioDebt,
    rekomendasiKategori,
    tabelAmortisasi,
  };
}
