import { round } from '../formatters';

export type MetodeHargaJual = 'margin' | 'markup';

export interface HasilHargaJual {
  hargaJual: number;
  laba: number;
  margin: number;
  markup: number;
}

/**
 * Hitung harga jual dari HPP + target margin atau markup.
 * 
 * Margin: % dari harga jual → hargaJual = HPP / (1 - margin%)
 * Markup: % dari HPP → hargaJual = HPP * (1 + markup%)
 */
export function hitungHargaJual(
  hpp: number,
  targetPersen: number,
  metode: MetodeHargaJual
): HasilHargaJual {
  if (hpp <= 0 || targetPersen <= 0) {
    return { hargaJual: hpp, laba: 0, margin: 0, markup: 0 };
  }

  let hargaJual = 0;

  if (metode === 'margin') {
    // margin = laba / harga_jual
    if (targetPersen >= 100) {
      return { hargaJual: 0, laba: 0, margin: 0, markup: 0 };
    }
    hargaJual = round(hpp / (1 - targetPersen / 100));
  } else {
    // markup = laba / hpp
    hargaJual = round(hpp * (1 + targetPersen / 100));
  }

  const laba = round(hargaJual - hpp);
  const margin = round((laba / hargaJual) * 100);
  const markup = round((laba / hpp) * 100);

  return { hargaJual, laba, margin, markup };
}
