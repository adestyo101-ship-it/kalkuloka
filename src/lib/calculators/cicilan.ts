import { round } from '../formatters';

export type MetodeCicilan = 'flat' | 'anuitas' | 'efektif';

export interface AmortisasiRow {
  bulan: number;
  angsuranPokok: number;
  angsuranBunga: number;
  totalAngsuran: number;
  sisaPinjaman: number;
}

export interface HasilCicilan {
  cicilanBulanan: number;
  totalBunga: number;
  totalPembayaran: number;
  tabelAmortisasi: AmortisasiRow[];
}

export function hitungCicilan(
  pinjaman: number,
  bungaTahunan: number,
  tenorBulan: number,
  metode: MetodeCicilan
): HasilCicilan {
  if (pinjaman <= 0 || tenorBulan <= 0) {
    return { cicilanBulanan: 0, totalBunga: 0, totalPembayaran: 0, tabelAmortisasi: [] };
  }

  const bungaBulanan = bungaTahunan / 100 / 12;
  let cicilanBulanan = 0;
  const tabel: AmortisasiRow[] = [];

  if (metode === 'flat') {
    const totalBunga = pinjaman * (bungaTahunan / 100) * (tenorBulan / 12);
    cicilanBulanan = round((pinjaman + totalBunga) / tenorBulan);
    const angsuranPokok = round(pinjaman / tenorBulan);
    const angsuranBunga = round(totalBunga / tenorBulan);
    let sisa = pinjaman;
    for (let i = 1; i <= tenorBulan; i++) {
      sisa = round(sisa - angsuranPokok);
      tabel.push({
        bulan: i,
        angsuranPokok,
        angsuranBunga,
        totalAngsuran: cicilanBulanan,
        sisaPinjaman: Math.max(0, sisa),
      });
    }
    return {
      cicilanBulanan,
      totalBunga: round(totalBunga),
      totalPembayaran: round(cicilanBulanan * tenorBulan),
      tabelAmortisasi: tabel,
    };
  }

  if (metode === 'anuitas') {
    if (bungaBulanan === 0) {
      cicilanBulanan = round(pinjaman / tenorBulan);
    } else {
      cicilanBulanan = round(
        (pinjaman * bungaBulanan * Math.pow(1 + bungaBulanan, tenorBulan)) /
          (Math.pow(1 + bungaBulanan, tenorBulan) - 1)
      );
    }
    let sisa = pinjaman;
    for (let i = 1; i <= tenorBulan; i++) {
      const bunga = round(sisa * bungaBulanan);
      const pokok = round(cicilanBulanan - bunga);
      sisa = round(sisa - pokok);
      tabel.push({
        bulan: i,
        angsuranPokok: pokok,
        angsuranBunga: bunga,
        totalAngsuran: cicilanBulanan,
        sisaPinjaman: Math.max(0, sisa),
      });
    }
    const totalPembayaran = round(cicilanBulanan * tenorBulan);
    return {
      cicilanBulanan,
      totalBunga: round(totalPembayaran - pinjaman),
      totalPembayaran,
      tabelAmortisasi: tabel,
    };
  }

  // Efektif — bunga dihitung dari saldo berjalan
  const angsuranPokok = round(pinjaman / tenorBulan);
  let sisa = pinjaman;
  let totalBunga = 0;
  for (let i = 1; i <= tenorBulan; i++) {
    const bunga = round(sisa * bungaBulanan);
    totalBunga += bunga;
    const total = round(angsuranPokok + bunga);
    sisa = round(sisa - angsuranPokok);
    tabel.push({
      bulan: i,
      angsuranPokok,
      angsuranBunga: bunga,
      totalAngsuran: total,
      sisaPinjaman: Math.max(0, sisa),
    });
  }
  // Cicilan bulan pertama sebagai referensi
  cicilanBulanan = tabel[0]?.totalAngsuran ?? 0;
  return {
    cicilanBulanan,
    totalBunga: round(totalBunga),
    totalPembayaran: round(tabel.reduce((s, r) => s + r.totalAngsuran, 0)),
    tabelAmortisasi: tabel,
  };
}
