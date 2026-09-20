import { round } from '../formatters';

export type ModePersentase =
  | 'xPersenDariY'      // X% dari Y = ?
  | 'kenaikanAkeB'      // A naik ke B = berapa %?
  | 'penurunanAkeB'     // A turun ke B = berapa %?
  | 'xPersenDariTotal'; // X adalah berapa % dari Y?

export interface HasilPersentase {
  hasil: number;
  keterangan: string;
}

export function hitungPersentase(
  mode: ModePersentase,
  a: number,
  b: number
): HasilPersentase {
  switch (mode) {
    case 'xPersenDariY': {
      // a = persen, b = angka
      const hasil = round((a / 100) * b);
      return { hasil, keterangan: `${a}% dari ${b.toLocaleString('id-ID')} = ${hasil.toLocaleString('id-ID')}` };
    }
    case 'kenaikanAkeB': {
      if (a <= 0) return { hasil: 0, keterangan: 'Angka awal harus lebih dari 0.' };
      const persen = round(((b - a) / a) * 100);
      return { hasil: persen, keterangan: `${a.toLocaleString('id-ID')} → ${b.toLocaleString('id-ID')} = naik ${persen}%` };
    }
    case 'penurunanAkeB': {
      if (a <= 0) return { hasil: 0, keterangan: 'Angka awal harus lebih dari 0.' };
      const persen = round(((a - b) / a) * 100);
      return { hasil: persen, keterangan: `${a.toLocaleString('id-ID')} → ${b.toLocaleString('id-ID')} = turun ${persen}%` };
    }
    case 'xPersenDariTotal': {
      // a = bagian, b = total
      if (b <= 0) return { hasil: 0, keterangan: 'Total harus lebih dari 0.' };
      const persen = round((a / b) * 100);
      return { hasil: persen, keterangan: `${a.toLocaleString('id-ID')} adalah ${persen}% dari ${b.toLocaleString('id-ID')}` };
    }
  }
}
