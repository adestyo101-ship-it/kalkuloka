import { round } from '../formatters';

export interface HasilBEP {
  bepUnit: number;
  bepRupiah: number;
  kontribusiMargin: number;
  kontribusiMarginPersen: number;
}

/**
 * Hitung BEP (Break Even Point).
 * 
 * Kontribusi Margin = Harga Jual - Biaya Variabel
 * BEP Unit = Biaya Tetap / Kontribusi Margin
 * BEP Rupiah = BEP Unit × Harga Jual
 */
export function hitungBEP(
  biayaTetap: number,
  hargaJual: number,
  biayaVariabel: number
): HasilBEP {
  if (hargaJual <= biayaVariabel || hargaJual <= 0) {
    return { bepUnit: 0, bepRupiah: 0, kontribusiMargin: 0, kontribusiMarginPersen: 0 };
  }

  const kontribusiMargin = round(hargaJual - biayaVariabel);
  const kontribusiMarginPersen = round((kontribusiMargin / hargaJual) * 100);
  const bepUnit = round(biayaTetap / kontribusiMargin);
  const bepRupiah = round(bepUnit * hargaJual);

  return { bepUnit, bepRupiah, kontribusiMargin, kontribusiMarginPersen };
}
