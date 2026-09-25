import { round } from '../formatters';
import { hitungCicilan, MetodeCicilan } from './cicilan';

export interface HasilCicilanKendaraan {
  dp: number;
  pokokPinjaman: number;
  cicilanBulanan: number;
  totalBunga: number;
  totalPembayaran: number; // total seluruh cicilan (pokok + bunga)
  totalPengeluaran: number; // DP + biaya di muka + total cicilan
}

export function hitungCicilanKendaraan(
  harga: number,
  dp: number,
  bungaTahunan: number,
  tenorBulan: number,
  biayaTambahan: number,
  biayaDibiayai: boolean,
  metode: MetodeCicilan
): HasilCicilanKendaraan {
  const pokokDasar = harga - dp;
  const pokokPinjaman = round(Math.max(0, pokokDasar + (biayaDibiayai ? biayaTambahan : 0)));
  const biayaDimuka = biayaDibiayai ? 0 : biayaTambahan;

  if (pokokPinjaman <= 0 || tenorBulan <= 0) {
    return {
      dp,
      pokokPinjaman,
      cicilanBulanan: 0,
      totalBunga: 0,
      totalPembayaran: 0,
      totalPengeluaran: round(dp + biayaDimuka),
    };
  }

  const h = hitungCicilan(pokokPinjaman, bungaTahunan, tenorBulan, metode);
  return {
    dp,
    pokokPinjaman,
    cicilanBulanan: h.cicilanBulanan,
    totalBunga: h.totalBunga,
    totalPembayaran: h.totalPembayaran,
    totalPengeluaran: round(dp + biayaDimuka + h.totalPembayaran),
  };
}
