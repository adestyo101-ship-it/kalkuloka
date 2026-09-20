// Kalkulator Hitung Umur — Tahun, Bulan, Hari
export interface HitungUmurResult {
  tahun: number;
  bulan: number;
  hari: number;
  totalHari: number;
  totalBulan: number;
  totalMinggu: number;
  hari1: Date;
  hari2: Date;
  nextBirthday: {
    tanggal: Date;
    hariLagi: number;
  } | null;
  milestones: { label: string; tanggal: Date; sudahLewat: boolean }[];
}

export function hitungUmur(
  tanggalLahir: Date,
  tanggalAcuan: Date = new Date()
): HitungUmurResult | null {
  if (tanggalLahir >= tanggalAcuan) return null;

  let tahun = tanggalAcuan.getFullYear() - tanggalLahir.getFullYear();
  let bulan = tanggalAcuan.getMonth() - tanggalLahir.getMonth();
  let hari = tanggalAcuan.getDate() - tanggalLahir.getDate();

  if (hari < 0) {
    bulan--;
    const daysInPrevMonth = new Date(
      tanggalAcuan.getFullYear(),
      tanggalAcuan.getMonth(),
      0
    ).getDate();
    hari += daysInPrevMonth;
  }

  if (bulan < 0) {
    tahun--;
    bulan += 12;
  }

  const totalHari = Math.floor(
    (tanggalAcuan.getTime() - tanggalLahir.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalBulan = tahun * 12 + bulan;
  const totalMinggu = Math.floor(totalHari / 7);

  // Next birthday
  const thisYear = tanggalAcuan.getFullYear();
  let nextBirthday: HitungUmurResult['nextBirthday'] = null;
  const bdThisYear = new Date(
    thisYear,
    tanggalLahir.getMonth(),
    tanggalLahir.getDate()
  );
  const bdNextYear = new Date(
    thisYear + 1,
    tanggalLahir.getMonth(),
    tanggalLahir.getDate()
  );
  const bdCandidate =
    bdThisYear > tanggalAcuan ? bdThisYear : bdNextYear;
  const hariLagiBirthday = Math.ceil(
    (bdCandidate.getTime() - tanggalAcuan.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (hariLagiBirthday <= 365) {
    nextBirthday = { tanggal: bdCandidate, hariLagi: hariLagiBirthday };
  }

  // Milestones
  const milestones = [
    { label: '🎂 Ulang tahun ke-17', tahun: 17 },
    { label: '🎓 Ulang tahun ke-21', tahun: 21 },
    { label: '🎂 Ulang tahun ke-25', tahun: 25 },
    { label: '🎂 Ulang tahun ke-30', tahun: 30 },
    { label: '🎂 Ulang tahun ke-40', tahun: 40 },
    { label: '🎂 Ulang tahun ke-50', tahun: 50 },
    { label: '🎂 Ulang tahun ke-60', tahun: 60 },
  ].map((m) => {
    const tanggal = new Date(
      tanggalLahir.getFullYear() + m.tahun,
      tanggalLahir.getMonth(),
      tanggalLahir.getDate()
    );
    return {
      label: m.label,
      tanggal,
      sudahLewat: tanggal <= tanggalAcuan,
    };
  });

  return {
    tahun,
    bulan,
    hari,
    totalHari,
    totalBulan,
    totalMinggu,
    hari1: tanggalLahir,
    hari2: tanggalAcuan,
    nextBirthday,
    milestones,
  };
}

export function hitungSelisihTanggal(
  tanggal1: Date,
  tanggal2: Date
): { tahun: number; bulan: number; hari: number; totalHari: number } {
  const [start, end] = tanggal1 <= tanggal2 ? [tanggal1, tanggal2] : [tanggal2, tanggal1];

  let tahun = end.getFullYear() - start.getFullYear();
  let bulan = end.getMonth() - start.getMonth();
  let hari = end.getDate() - start.getDate();

  if (hari < 0) {
    bulan--;
    const daysInPrevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    hari += daysInPrevMonth;
  }
  if (bulan < 0) {
    tahun--;
    bulan += 12;
  }

  const totalHari = Math.abs(
    Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );

  return { tahun, bulan, hari, totalHari };
}
