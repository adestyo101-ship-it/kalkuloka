// Master list semua tools Kalkuloka
export type ToolCategory = 'keuangan' | 'bisnis' | 'pekerjaan' | 'properti' | 'kendaraan' | 'umum';

export interface Tool {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  category: ToolCategory;
  icon: string;
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
  relatedTools?: string[];
}

export const TOOLS: Tool[] = [
  // === KEUANGAN ===
  {
    slug: 'kalkulator-cicilan',
    name: 'Kalkulator Cicilan',
    shortName: 'Cicilan',
    description: 'Hitung cicilan bulanan, total bunga, dan tabel amortisasi untuk pinjaman Anda.',
    category: 'keuangan',
    icon: '💳',
    tags: ['cicilan', 'kredit', 'pinjaman', 'angsuran', 'bunga', 'kpr', 'ktb'],
    isPopular: true,
    relatedTools: ['kalkulator-deposito', 'kalkulator-bunga-majemuk'],
  },
  {
    slug: 'kalkulator-deposito',
    name: 'Kalkulator Deposito',
    shortName: 'Deposito',
    description: 'Hitung bunga deposito, estimasi pajak PPh, dan saldo akhir deposito Anda.',
    category: 'keuangan',
    icon: '🏦',
    tags: ['deposito', 'bunga', 'tabungan', 'investasi', 'pajak', 'ppn'],
    isPopular: false,
    relatedTools: ['kalkulator-bunga-majemuk', 'kalkulator-target-tabungan'],
  },
  {
    slug: 'kalkulator-bunga-majemuk',
    name: 'Kalkulator Bunga Majemuk',
    shortName: 'Bunga Majemuk',
    description: 'Simulasikan pertumbuhan investasi dengan efek bunga berbunga. Lengkap dengan grafik.',
    category: 'keuangan',
    icon: '📈',
    tags: ['bunga majemuk', 'compound interest', 'investasi', 'reksa dana', 'pertumbuhan'],
    isPopular: false,
    relatedTools: ['kalkulator-target-tabungan', 'kalkulator-deposito'],
  },
  {
    slug: 'kalkulator-target-tabungan',
    name: 'Kalkulator Target Tabungan',
    shortName: 'Target Tabungan',
    description: 'Berapa yang harus ditabung setiap bulan untuk mencapai target finansial Anda?',
    category: 'keuangan',
    icon: '🎯',
    tags: ['tabungan', 'target', 'finansial', 'menabung', 'rencana'],
    isPopular: false,
    relatedTools: ['kalkulator-bunga-majemuk', 'kalkulator-deposito'],
  },
  {
    slug: 'kalkulator-plafond-pinjaman',
    name: 'Kalkulator Plafond Pinjaman',
    shortName: 'Plafond Pinjaman',
    description: 'Hitung berapa besar pinjaman yang bisa disetujui bank dari persentase gaji. Formula Present Value (PV) seperti Excel.',
    category: 'keuangan',
    icon: '\uD83D\uDCB0',
    tags: ['plafond', 'pinjaman', 'kredit', 'kta', 'kpr', 'gaji', 'cicilan', 'present value', 'pv'],
    isPopular: true,
    relatedTools: ['kalkulator-cicilan', 'kalkulator-target-tabungan'],
  },

  // === BISNIS & UMKM ===
  {
    slug: 'kalkulator-hpp',
    name: 'Kalkulator HPP',
    shortName: 'HPP',
    description: 'Hitung Harga Pokok Produksi dari bahan baku, tenaga kerja, kemasan, dan overhead.',
    category: 'bisnis',
    icon: '🧾',
    tags: ['hpp', 'harga pokok', 'produksi', 'biaya', 'umkm', 'usaha'],
    isPopular: true,
    relatedTools: ['kalkulator-harga-jual', 'kalkulator-margin-markup', 'kalkulator-bep'],
  },
  {
    slug: 'kalkulator-harga-jual',
    name: 'Kalkulator Harga Jual',
    shortName: 'Harga Jual',
    description: 'Tentukan harga jual ideal berdasarkan HPP dan target margin atau markup keuntungan.',
    category: 'bisnis',
    icon: '💵',
    tags: ['harga jual', 'margin', 'markup', 'keuntungan', 'laba', 'umkm'],
    isPopular: false,
    relatedTools: ['kalkulator-hpp', 'kalkulator-margin-markup', 'kalkulator-bep'],
  },
  {
    slug: 'kalkulator-margin-markup',
    name: 'Kalkulator Margin & Markup',
    shortName: 'Margin & Markup',
    description: 'Hitung margin dan markup dari modal dan harga jual. Pahami perbedaannya.',
    category: 'bisnis',
    icon: '📊',
    tags: ['margin', 'markup', 'keuntungan', 'laba', 'bisnis'],
    isPopular: true,
    relatedTools: ['kalkulator-hpp', 'kalkulator-harga-jual', 'kalkulator-bep'],
  },
  {
    slug: 'kalkulator-bep',
    name: 'Kalkulator BEP',
    shortName: 'BEP',
    description: 'Hitung Break Even Point bisnis Anda — berapa unit atau omzet agar tidak rugi.',
    category: 'bisnis',
    icon: '⚖️',
    tags: ['bep', 'break even point', 'titik impas', 'biaya tetap', 'biaya variabel'],
    isPopular: true,
    relatedTools: ['kalkulator-hpp', 'kalkulator-harga-jual', 'kalkulator-margin-markup'],
  },

  // === PEKERJAAN ===
  {
    slug: 'kalkulator-thr',
    name: 'Kalkulator THR',
    shortName: 'THR',
    description: 'Estimasi Tunjangan Hari Raya berdasarkan gaji dan masa kerja Anda.',
    category: 'pekerjaan',
    icon: '🎁',
    tags: ['thr', 'tunjangan hari raya', 'gaji', 'lebaran', 'idul fitri', 'karyawan'],
    isPopular: false,
    relatedTools: [],
  },

  // === UMUM ===
  {
    slug: 'kalkulator-persentase',
    name: 'Kalkulator Persentase',
    shortName: 'Persentase',
    description: 'Hitung persen dari angka, kenaikan, penurunan, dan perbandingan persentase.',
    category: 'umum',
    icon: '%',
    tags: ['persentase', 'persen', 'diskon', 'kenaikan', 'penurunan'],
    isPopular: false,
    relatedTools: ['kalkulator-margin-markup', 'kalkulator-harga-jual'],
  },
  {
    slug: 'kalkulator-hitung-umur',
    name: 'Kalkulator Hitung Umur',
    shortName: 'Hitung Umur',
    description: 'Hitung umur tepat dalam tahun, bulan, dan hari — atau hitung selisih dua tanggal.',
    category: 'umum',
    icon: '🎂',
    tags: ['umur', 'usia', 'tanggal lahir', 'ulang tahun', 'selisih tanggal', 'hitung usia'],
    isPopular: true,
    relatedTools: ['kalkulator-thr', 'kalkulator-persentase'],
  },
];

export const CATEGORIES = [
  {
    id: 'keuangan' as ToolCategory,
    name: 'Keuangan',
    icon: '💰',
    description: 'Cicilan, deposito, investasi, dan tabungan',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 'bisnis' as ToolCategory,
    name: 'Bisnis & UMKM',
    icon: '🏪',
    description: 'HPP, harga jual, margin, dan BEP',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
  },
  {
    id: 'pekerjaan' as ToolCategory,
    name: 'Gaji & Pekerjaan',
    icon: '💼',
    description: 'THR, gaji, tunjangan, dan pajak penghasilan',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500/20',
  },
  {
    id: 'properti' as ToolCategory,
    name: 'Properti',
    icon: '🏠',
    description: 'KPR, cicilan rumah, dan perhitungan properti',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/20',
  },
  {
    id: 'kendaraan' as ToolCategory,
    name: 'Kendaraan',
    icon: '🚗',
    description: 'Kredit kendaraan, BBM, dan biaya otomotif',
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-400',
    borderColor: 'border-red-500/20',
  },
  {
    id: 'umum' as ToolCategory,
    name: 'Tools Umum',
    icon: '🧰',
    description: 'Persentase, konversi, dan kalkulasi sehari-hari',
    color: 'from-slate-400 to-gray-500',
    bgColor: 'bg-slate-500/10',
    textColor: 'text-slate-400',
    borderColor: 'border-slate-500/20',
  },
];

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getRelatedTools(slug: string): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool || !tool.relatedTools) return [];
  return tool.relatedTools.map((s) => getToolBySlug(s)).filter(Boolean) as Tool[];
}

export function getPopularTools(): Tool[] {
  return TOOLS.filter((t) => t.isPopular);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return TOOLS;
  return TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}
