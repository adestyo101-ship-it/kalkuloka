import { round } from '../formatters';

export interface TahapBunga {
  mulaiTahun: number; // bunga berlaku mulai tahun ke-N (tahun pertama = 1)
  bunga: number; // % per tahun
}

export interface BarisKpr {
  bulan: number;
  tahun: number;
  bungaTahunan: number;
  angsuranPokok: number;
  angsuranBunga: number;
  totalAngsuran: number;
  sisaPinjaman: number;
}

export interface RingkasanTahap {
  bungaTahunan: number;
  dariBulan: number;
  sampaiBulan: number;
  cicilanBulanan: number;
  totalBunga: number;
}

export interface HasilKpr {
  ringkasan: RingkasanTahap[];
  totalBunga: number;
  totalPembayaran: number;
  tabelAmortisasi: BarisKpr[];
}

const KOSONG: HasilKpr = { ringkasan: [], totalBunga: 0, totalPembayaran: 0, tabelAmortisasi: [] };

// Anuitas: cicilan dihitung ulang setiap bunga berubah, dari sisa pokok dan sisa tenor
function hitungAnuitas(saldo: number, bungaBulanan: number, sisaBulan: number): number {
  if (bungaBulanan === 0) return saldo / sisaBulan;
  const f = Math.pow(1 + bungaBulanan, sisaBulan);
  return (saldo * bungaBulanan * f) / (f - 1);
}

export function hitungKprBerjenjang(
  pinjaman: number,
  tenorTahun: number,
  tahap: TahapBunga[]
): HasilKpr {
  const totalBulan = Math.round(tenorTahun * 12);
  if (pinjaman <= 0 || totalBulan <= 0 || tahap.length === 0) return KOSONG;

  // Urutkan; tahap pertama selalu berlaku sejak tahun 1
  const urut = [...tahap]
    .filter((t) => t.mulaiTahun <= tenorTahun)
    .sort((a, b) => a.mulaiTahun - b.mulaiTahun);
  if (urut.length === 0) return KOSONG;
  urut[0] = { ...urut[0], mulaiTahun: 1 };

  function bungaPadaTahun(tahun: number): number {
    let b = urut[0].bunga;
    for (const t of urut) if (t.mulaiTahun <= tahun) b = t.bunga;
    return b;
  }

  const tabel: BarisKpr[] = [];
  const ringkasan: RingkasanTahap[] = [];
  let saldo = pinjaman;
  let cicilan = 0;
  let bungaSaatIni = -1;

  for (let bulan = 1; bulan <= totalBulan; bulan++) {
    const tahun = Math.ceil(bulan / 12);
    const bunga = bungaPadaTahun(tahun);

    if (bunga !== bungaSaatIni) {
      bungaSaatIni = bunga;
      cicilan = hitungAnuitas(saldo, bunga / 100 / 12, totalBulan - bulan + 1);
      ringkasan.push({
        bungaTahunan: bunga,
        dariBulan: bulan,
        sampaiBulan: bulan,
        cicilanBulanan: round(cicilan),
        totalBunga: 0,
      });
    }

    const angsuranBunga = saldo * (bunga / 100 / 12);
    const terakhir = bulan === totalBulan;
    const angsuranPokok = terakhir ? saldo : cicilan - angsuranBunga;
    saldo = terakhir ? 0 : saldo - angsuranPokok;

    const tahapIni = ringkasan[ringkasan.length - 1];
    tahapIni.sampaiBulan = bulan;
    tahapIni.totalBunga += angsuranBunga;

    tabel.push({
      bulan,
      tahun,
      bungaTahunan: bunga,
      angsuranPokok: round(angsuranPokok),
      angsuranBunga: round(angsuranBunga),
      totalAngsuran: round(angsuranPokok + angsuranBunga),
      sisaPinjaman: round(Math.max(0, saldo)),
    });
  }

  const totalBunga = round(tabel.reduce((s, r) => s + r.angsuranBunga, 0));
  return {
    ringkasan: ringkasan.map((r) => ({ ...r, totalBunga: round(r.totalBunga) })),
    totalBunga,
    totalPembayaran: round(pinjaman + totalBunga),
    tabelAmortisasi: tabel,
  };
}
