import { round } from '../formatters';

export interface KomponenBiaya {
  id: string;
  nama: string;
  biaya: number;
}

export interface HasilHPP {
  hppPerProduk: number;
  totalBiaya: number;
  breakdown: { nama: string; biaya: number; persentase: number }[];
}

export function hitungHPP(
  komponen: KomponenBiaya[],
  jumlahProduk: number
): HasilHPP {
  const jumlah = Math.max(1, jumlahProduk);
  const totalBiaya = round(komponen.reduce((sum, k) => sum + (k.biaya || 0), 0));
  const hppPerProduk = round(totalBiaya / jumlah);

  const breakdown = komponen
    .filter((k) => k.biaya > 0)
    .map((k) => ({
      nama: k.nama,
      biaya: k.biaya,
      persentase: totalBiaya > 0 ? round((k.biaya / totalBiaya) * 100) : 0,
    }));

  return { hppPerProduk, totalBiaya, breakdown };
}
