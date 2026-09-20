/**
 * Formatters — utility functions untuk format angka ke format Indonesia
 */

/**
 * Format angka ke format Rupiah (Rp 1.000.000)
 */
export function formatRupiah(value: number | string, withPrefix = true): string {
  const num = typeof value === 'string' ? parseFloat(value.replace(/\D/g, '')) : value;
  if (isNaN(num)) return withPrefix ? 'Rp 0' : '0';
  const formatted = Math.abs(num).toLocaleString('id-ID');
  const prefix = withPrefix ? (num < 0 ? '-Rp ' : 'Rp ') : '';
  return `${prefix}${formatted}`;
}

/**
 * Parse string Rupiah ke number
 * "Rp 1.000.000" → 1000000
 */
export function parseRupiah(value: string): number {
  if (!value) return 0;
  const cleaned = value.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Format angka ke format angka Indonesia (1.000.000)
 */
export function formatNumber(value: number): string {
  if (isNaN(value)) return '0';
  return value.toLocaleString('id-ID');
}

/**
 * Format ke persen (33,33%)
 */
export function formatPercent(value: number, decimals = 2): string {
  if (isNaN(value)) return '0%';
  return `${value.toFixed(decimals).replace('.', ',')}%`;
}

/**
 * Format input saat pengguna mengetik — auto-format Rupiah
 * "100000" → "100.000"
 */
export function formatInputRupiah(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  return parseInt(digits, 10).toLocaleString('id-ID');
}

/**
 * Parse input Rupiah dari formatted string
 * "100.000" → 100000
 */
export function parseInputRupiah(formatted: string): number {
  const digits = formatted.replace(/\D/g, '');
  if (!digits) return 0;
  return parseInt(digits, 10);
}

/**
 * Format bulan ke keterangan
 * 12 → "12 bulan (1 tahun)"
 * 18 → "18 bulan (1,5 tahun)"
 */
export function formatTenor(months: number): string {
  const years = months / 12;
  if (months < 12) return `${months} bulan`;
  if (months % 12 === 0) return `${months} bulan (${months / 12} tahun)`;
  return `${months} bulan (${years.toFixed(1).replace('.', ',')} tahun)`;
}

/**
 * Round ke N decimal places
 */
export function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Clamp value ke range [min, max]
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
