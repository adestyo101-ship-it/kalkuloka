import { round } from '../formatters';

// Tarif pajak PPh Final deposito: 20% (PP No. 131 Tahun 2000)
const TARIF_PAJAK = 0.2;
const SUMBER_REGULASI = 'PP No. 131 Tahun 2000. Terakhir diverifikasi: 2024.';

export interface HasilDeposito {
  bungaKotor: number;
  estimasiPajak: number;
  bungaBersih: number;
  saldoAkhir: number;
  tarifPajak: number;
  sumberRegulasi: string;
}

export function hitungDeposito(
  dana: number,
  bungaTahunan: number,
  tenorBulan: number
): HasilDeposito {
  if (dana <= 0 || bungaTahunan <= 0 || tenorBulan <= 0) {
    return {
      bungaKotor: 0,
      estimasiPajak: 0,
      bungaBersih: 0,
      saldoAkhir: dana,
      tarifPajak: TARIF_PAJAK,
      sumberRegulasi: SUMBER_REGULASI,
    };
  }

  // Bunga per bulan = dana x bunga per tahun / 365 x 30 hari, dikali jumlah bulan tenor
  const bungaPerBulan = (dana * (bungaTahunan / 100)) / 365 * 30;
  const bungaKotor = round(bungaPerBulan * tenorBulan);
  const estimasiPajak = round(bungaKotor * TARIF_PAJAK);
  const bungaBersih = round(bungaKotor - estimasiPajak);
  const saldoAkhir = round(dana + bungaBersih);

  return {
    bungaKotor,
    estimasiPajak,
    bungaBersih,
    saldoAkhir,
    tarifPajak: TARIF_PAJAK,
    sumberRegulasi: SUMBER_REGULASI,
  };
}
