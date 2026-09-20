import { round } from '../formatters';

export type FrekuensiBunga = 'tahunan' | 'bulanan' | 'harian';

export interface DataPoinGrafik {
  tahun: number;
  modalDisetor: number;
  bungaAkumulasi: number;
  totalSaldo: number;
}

export interface HasilBungaMajemuk {
  modalDisetor: number;
  estimasiPertumbuhan: number;
  saldoAkhir: number;
  dataGrafik: DataPoinGrafik[];
}

function getFrekuensiN(frekuensi: FrekuensiBunga): number {
  switch (frekuensi) {
    case 'tahunan': return 1;
    case 'bulanan': return 12;
    case 'harian': return 365;
  }
}

export function hitungBungaMajemuk(
  modalAwal: number,
  kontribusiBulanan: number,
  bungaTahunan: number,
  frekuensi: FrekuensiBunga,
  durasiTahun: number
): HasilBungaMajemuk {
  if (durasiTahun <= 0) {
    return { modalDisetor: modalAwal, estimasiPertumbuhan: 0, saldoAkhir: modalAwal, dataGrafik: [] };
  }

  const r = bungaTahunan / 100;
  const n = getFrekuensiN(frekuensi);
  const totalBulan = durasiTahun * 12;
  const dataGrafik: DataPoinGrafik[] = [];

  let saldo = modalAwal;
  let modalDisetor = modalAwal;

  // Simulasi bulanan untuk akurasi
  for (let bulan = 1; bulan <= totalBulan; bulan++) {
    // Kontribusi di awal bulan
    saldo += kontribusiBulanan;
    modalDisetor += kontribusiBulanan;

    // Bunga compound per periode
    // A = P * (1 + r/n)^(n/12) untuk setiap bulan
    const faktor = Math.pow(1 + r / n, n / 12);
    saldo *= faktor;

    // Catat per tahun
    if (bulan % 12 === 0) {
      const tahun = bulan / 12;
      dataGrafik.push({
        tahun,
        modalDisetor: round(modalDisetor),
        bungaAkumulasi: round(saldo - modalDisetor),
        totalSaldo: round(saldo),
      });
    }
  }

  // Jika durasi bukan kelipatan tahun, tambah poin terakhir
  if (totalBulan % 12 !== 0) {
    dataGrafik.push({
      tahun: durasiTahun,
      modalDisetor: round(modalDisetor),
      bungaAkumulasi: round(saldo - modalDisetor),
      totalSaldo: round(saldo),
    });
  }

  return {
    modalDisetor: round(modalDisetor),
    estimasiPertumbuhan: round(saldo - modalDisetor),
    saldoAkhir: round(saldo),
    dataGrafik,
  };
}
