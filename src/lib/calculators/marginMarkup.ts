import { round } from '../formatters';

export interface HasilMarginMarkup {
  laba: number;
  margin: number; // % dari harga jual
  markup: number; // % dari modal/HPP
}

/**
 * Hitung margin dan markup dari modal (HPP) dan harga jual.
 * 
 * Markup = (Harga Jual - Modal) / Modal × 100
 * Margin  = (Harga Jual - Modal) / Harga Jual × 100
 */
export function hitungMarginMarkup(modal: number, hargaJual: number): HasilMarginMarkup {
  if (modal <= 0 || hargaJual <= 0) {
    return { laba: 0, margin: 0, markup: 0 };
  }

  const laba = round(hargaJual - modal);
  const markup = modal > 0 ? round((laba / modal) * 100) : 0;
  const margin = hargaJual > 0 ? round((laba / hargaJual) * 100) : 0;

  return { laba, margin, markup };
}
