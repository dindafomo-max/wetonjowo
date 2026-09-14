// ============================================================================
// Modul Analitik & Data Telemetri Anonim - WETON JOWO SaaS
// Menghitung tren pencarian firasat, watak weton terpopuler, dan distribusi hajat
// ============================================================================

export interface WetonStatItem {
  rank: number;
  hari: string;
  pasaran: string;
  wetonName: string;
  neptu: number;
  totalHits: number;
  persentase: number;
  trenMingguan: number; // Persen kenaikan/penurunan (misal +14.2%)
  tujuanTerbanyak: 'Salaki-Rabi' | 'Ijab Kabul' | 'Watak & Wuku' | 'Pal Srigati' | 'Naga Dina';
  sentimen: 'Sangat Tinggi' | 'Tinggi' | 'Sedang';
  lambangUnsur: string;
}

export interface FirasatStatItem {
  rank: number;
  kataKunci: string;
  kategori: 'Kedutan Wajah/Mata' | 'Telinga Berdenging' | 'Kedutan Badan' | 'Gejala Alam' | 'Perilaku Hewan';
  totalPencarian: number;
  persentase: number;
  waktuPuncak: string; // Misal: "06:00 - 08:00 (Pagi)"
  ringkasanMakna: string;
  kategoriPertanda: 'Rezeki / Kabar Baik' | 'Peringatan / Hati-hati' | 'Tamu / Kerinduan';
}

export interface DailyTimeSeriesItem {
  tanggal: string; // YYYY-MM-DD
  labelHari: string;
  totalAkses: number;
  pencarianFirasat: number;
  hitungWeton: number;
  hitungNikahJodoh: number;
  cekNagaDina: number;
}

export interface ModulStatItem {
  id: string;
  namaModul: string;
  kategori: string;
  totalPenggunaan: number;
  persentase: number;
  color: string;
}

export interface NeptuDistributionItem {
  neptu: number;
  jumlah: number;
  persentase: number;
  wetonContoh: string;
}

export interface HourlyHeatmapItem {
  jam: string;
  akses: number;
}

// ----------------------------------------------------------------------------
// DATA STATISTIK DASAR TREN PENCARIAN & WETON TERPOPULER (ANONIM AGREGAT)
// ----------------------------------------------------------------------------

export const TOP_WETON_ANALYTICS: WetonStatItem[] = [
  {
    rank: 1,
    hari: 'Jemuwah',
    pasaran: 'Kliwon',
    wetonName: 'Jumat Kliwon',
    neptu: 14,
    totalHits: 48920,
    persentase: 16.8,
    trenMingguan: 18.5,
    tujuanTerbanyak: 'Salaki-Rabi',
    sentimen: 'Sangat Tinggi',
    lambangUnsur: 'Air (Banyu)',
  },
  {
    rank: 2,
    hari: 'Selasa',
    pasaran: 'Kliwon',
    wetonName: 'Selasa Kliwon (Anggara Kasih)',
    neptu: 11,
    totalHits: 39450,
    persentase: 13.5,
    trenMingguan: 12.3,
    tujuanTerbanyak: 'Watak & Wuku',
    sentimen: 'Sangat Tinggi',
    lambangUnsur: 'Api (Geni)',
  },
  {
    rank: 3,
    hari: 'Rebo',
    pasaran: 'Pahing',
    wetonName: 'Rabu Pahing',
    neptu: 16,
    totalHits: 32180,
    persentase: 11.0,
    trenMingguan: 9.7,
    tujuanTerbanyak: 'Ijab Kabul',
    sentimen: 'Tinggi',
    lambangUnsur: 'Angin (Maruta)',
  },
  {
    rank: 4,
    hari: 'Setu',
    pasaran: 'Kliwon',
    wetonName: 'Sabtu Kliwon',
    neptu: 17,
    totalHits: 28430,
    persentase: 9.8,
    trenMingguan: 7.4,
    tujuanTerbanyak: 'Pal Srigati',
    sentimen: 'Tinggi',
    lambangUnsur: 'Tanah (Bumi)',
  },
  {
    rank: 5,
    hari: 'Ahad',
    pasaran: 'Pon',
    wetonName: 'Minggu Pon',
    neptu: 12,
    totalHits: 24760,
    persentase: 8.5,
    trenMingguan: 14.1,
    tujuanTerbanyak: 'Salaki-Rabi',
    sentimen: 'Tinggi',
    lambangUnsur: 'Air (Banyu)',
  },
  {
    rank: 6,
    hari: 'Kemis',
    pasaran: 'Wage',
    wetonName: 'Kamis Wage',
    neptu: 12,
    totalHits: 21900,
    persentase: 7.5,
    trenMingguan: 5.2,
    tujuanTerbanyak: 'Naga Dina',
    sentimen: 'Sedang',
    lambangUnsur: 'Angin (Maruta)',
  },
  {
    rank: 7,
    hari: 'Senen',
    pasaran: 'Legi',
    wetonName: 'Senin Legi',
    neptu: 9,
    totalHits: 19840,
    persentase: 6.8,
    trenMingguan: -2.1,
    tujuanTerbanyak: 'Ijab Kabul',
    sentimen: 'Sedang',
    lambangUnsur: 'Api (Geni)',
  },
  {
    rank: 8,
    hari: 'Rebo',
    pasaran: 'Wage',
    wetonName: 'Rabu Wage',
    neptu: 11,
    totalHits: 17350,
    persentase: 6.0,
    trenMingguan: 3.8,
    tujuanTerbanyak: 'Watak & Wuku',
    sentimen: 'Sedang',
    lambangUnsur: 'Tanah (Bumi)',
  },
  {
    rank: 9,
    hari: 'Setu',
    pasaran: 'Pahing',
    wetonName: 'Sabtu Pahing',
    neptu: 18,
    totalHits: 15920,
    persentase: 5.5,
    trenMingguan: 8.9,
    tujuanTerbanyak: 'Salaki-Rabi',
    sentimen: 'Sedang',
    lambangUnsur: 'Api (Geni)',
  },
  {
    rank: 10,
    hari: 'Ahad',
    pasaran: 'Legi',
    wetonName: 'Minggu Legi',
    neptu: 10,
    totalHits: 13210,
    persentase: 4.6,
    trenMingguan: 1.5,
    tujuanTerbanyak: 'Watak & Wuku',
    sentimen: 'Sedang',
    lambangUnsur: 'Angin (Maruta)',
  },
];

export const TOP_FIRASAT_ANALYTICS: FirasatStatItem[] = [
  {
    rank: 1,
    kataKunci: 'Kedutan Kelopak Mata Kanan Atas',
    kategori: 'Kedutan Wajah/Mata',
    totalPencarian: 64280,
    persentase: 21.5,
    waktuPuncak: '07:00 - 09:00 (Pagi)',
    ringkasanMakna: 'Pertanda akan memperoleh rezeki halal tak terduga atau kedatangan tamu yang membawa kegembiraan batin.',
    kategoriPertanda: 'Rezeki / Kabar Baik',
  },
  {
    rank: 2,
    kataKunci: 'Telinga Kanan Berdenging Siang Hari',
    kategori: 'Telinga Berdenging',
    totalPencarian: 51940,
    persentase: 17.4,
    waktuPuncak: '11:00 - 13:00 (Siang)',
    ringkasanMakna: 'Pertanda sedang dibicarakan kebaikannya oleh sanak saudara atau ada kabar baik mengenai urusan pekerjaan.',
    kategoriPertanda: 'Rezeki / Kabar Baik',
  },
  {
    rank: 3,
    kataKunci: 'Kedutan Kelopak Mata Kiri Bawah',
    kategori: 'Kedutan Wajah/Mata',
    totalPencarian: 43120,
    persentase: 14.4,
    waktuPuncak: '20:00 - 22:00 (Malam)',
    ringkasanMakna: 'Peringatan halus agar berhati-hati dalam menjaga lisan dan emosi saat berinteraksi dengan kerabat.',
    kategoriPertanda: 'Peringatan / Hati-hati',
  },
  {
    rank: 4,
    kataKunci: 'Kedutan Bibir Kanan Atas & Bawah',
    kategori: 'Kedutan Wajah/Mata',
    totalPencarian: 35890,
    persentase: 12.0,
    waktuPuncak: '12:00 - 14:00 (Siang)',
    ringkasanMakna: 'Akan menikmati jamuan lezat atau beroleh wejangan/kata-kata bijak yang membawa rezeki.',
    kategoriPertanda: 'Rezeki / Kabar Baik',
  },
  {
    rank: 5,
    kataKunci: 'Telinga Kiri Berdenging Malam Hari',
    kategori: 'Telinga Berdenging',
    totalPencarian: 29400,
    persentase: 9.8,
    waktuPuncak: '23:00 - 01:00 (Tengah Malam)',
    ringkasanMakna: 'Ada kerabat jauh yang sedang mendoakan keselamatan Anda atau merindukan perjumpaan silaturahmi.',
    kategoriPertanda: 'Tamu / Kerinduan',
  },
  {
    rank: 6,
    kataKunci: 'Kedutan Telapak Tangan Kanan',
    kategori: 'Kedutan Badan',
    totalPencarian: 26150,
    persentase: 8.7,
    waktuPuncak: '08:00 - 10:00 (Pagi)',
    ringkasanMakna: 'Pertanda akan menerima uang tunai, pesanan perniagaan, atau hadiah dari sahabat luhur.',
    kategoriPertanda: 'Rezeki / Kabar Baik',
  },
  {
    rank: 7,
    kataKunci: 'Komet / Lintang Kemukus Muncul di Utara',
    kategori: 'Gejala Alam',
    totalPencarian: 18920,
    persentase: 6.3,
    waktuPuncak: '04:00 - 06:00 (Fajar)',
    ringkasanMakna: 'Pertanda pergeseran dinamika iklim pangan, panen raya, dan perlunya memperbanyak sedekah tolak bala.',
    kategoriPertanda: 'Peringatan / Hati-hati',
  },
  {
    rank: 8,
    kataKunci: 'Suara Burung Kedasih / Wiwik Uncuing',
    kategori: 'Perilaku Hewan',
    totalPencarian: 15470,
    persentase: 5.2,
    waktuPuncak: '17:00 - 19:00 (Senja)',
    ringkasanMakna: 'Anjuran membaca doa keselamatan keluarga dan menyalakan penerangan pelataran rumah menjelang malam.',
    kategoriPertanda: 'Peringatan / Hati-hati',
  },
  {
    rank: 9,
    kataKunci: 'Kedutan Siku & Lengan Kanan',
    kategori: 'Kedutan Badan',
    totalPencarian: 13800,
    persentase: 4.6,
    waktuPuncak: '14:00 - 16:00 (Sore)',
    ringkasanMakna: 'Akan mendapatkan kawan kerja baru yang amanah atau memperoleh amanah kepemimpinan.',
    kategoriPertanda: 'Rezeki / Kabar Baik',
  },
];

export const MODULE_USAGE_ANALYTICS: ModulStatItem[] = [
  { id: 'nikah', namaModul: 'Ijab Kabul & Hari Baik Nikah', kategori: 'Pernikahan', totalPenggunaan: 98400, persentase: 28.5, color: '#be123c' },
  { id: 'jodoh', namaModul: 'Salaki-Rabi (Kecocokan 8 Petung)', kategori: 'Perjodohan', totalPenggunaan: 82100, persentase: 23.8, color: '#e11d48' },
  { id: 'firasat', namaModul: 'Kramadana Firasat & Kedutan', kategori: 'Ensiklopedia', totalPenggunaan: 52300, persentase: 15.1, color: '#4338ca' },
  { id: 'kalender', namaModul: 'Kalender Abadi Tri-Penanggalan', kategori: 'Kalender', totalPenggunaan: 41200, persentase: 11.9, color: '#2563eb' },
  { id: 'nagadina', namaModul: 'Naga Dina & Arah Rejeki', kategori: 'Perniagaan', totalPenggunaan: 29800, persentase: 8.6, color: '#d97706' },
  { id: 'wuku', namaModul: '30 Wuku Pawukon', kategori: 'Watak Lahir', totalPenggunaan: 22400, persentase: 6.5, color: '#b45309' },
  { id: 'rejeki', namaModul: 'Pal Srigati Pasang Surut', kategori: 'Rezeki', totalPenggunaan: 19500, persentase: 5.6, color: '#059669' },
];

export const NEPTU_DISTRIBUTION_ANALYTICS: NeptuDistributionItem[] = [
  { neptu: 7, jumlah: 6800, persentase: 2.3, wetonContoh: 'Selasa Wage' },
  { neptu: 8, jumlah: 12400, persentase: 4.2, wetonContoh: 'Senin Wage, Selasa Legi' },
  { neptu: 9, jumlah: 18200, persentase: 6.2, wetonContoh: 'Senin Legi, Minggu Wage' },
  { neptu: 10, jumlah: 24500, persentase: 8.4, wetonContoh: 'Minggu Legi, Selasa Pon, Jumat Wage' },
  { neptu: 11, jumlah: 31200, persentase: 10.7, wetonContoh: 'Senin Pon, Selasa Kliwon, Rabu Wage, Jumat Legi' },
  { neptu: 12, jumlah: 36800, persentase: 12.6, wetonContoh: 'Minggu Pon, Senin Kliwon, Selasa Pahing, Rabu Legi, Kamis Wage' },
  { neptu: 13, jumlah: 39400, persentase: 13.5, wetonContoh: 'Minggu Kliwon, Senin Pahing, Kamis Legi, Jumat Pon, Sabtu Wage' },
  { neptu: 14, jumlah: 48920, persentase: 16.8, wetonContoh: 'Minggu Pahing, Rabu Pon, Jumat Kliwon, Sabtu Legi' },
  { neptu: 15, jumlah: 34100, persentase: 11.7, wetonContoh: 'Rabu Kliwon, Kamis Pon, Jumat Pahing' },
  { neptu: 16, jumlah: 32180, persentase: 11.0, wetonContoh: 'Rabu Pahing, Kamis Kliwon, Sabtu Pon' },
  { neptu: 17, jumlah: 28430, persentase: 9.8, wetonContoh: 'Kamis Pahing, Sabtu Kliwon' },
  { neptu: 18, jumlah: 15920, persentase: 5.5, wetonContoh: 'Sabtu Pahing' },
];

export const HOURLY_HEATMAP_ANALYTICS: HourlyHeatmapItem[] = [
  { jam: '00:00', akses: 1420 },
  { jam: '02:00', akses: 890 },
  { jam: '04:00', akses: 2100 },
  { jam: '06:00', akses: 5890 },
  { jam: '08:00', akses: 8940 },
  { jam: '10:00', akses: 12400 },
  { jam: '12:00', akses: 14100 },
  { jam: '14:00', akses: 11800 },
  { jam: '16:00', akses: 10900 },
  { jam: '18:00', akses: 13500 },
  { jam: '20:00', akses: 18900 },
  { jam: '22:00', akses: 12200 },
];

// Helper Generator untuk Time Series (Rentang 7, 30, atau 90 Hari)
export function generateTimeSeriesData(days: 7 | 30 | 90 | 365 = 30): DailyTimeSeriesItem[] {
  const result: DailyTimeSeriesItem[] = [];
  const now = new Date();
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = `${dayNames[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}`;
    
    // Variasi tren realistis dengan spike di akhir pekan dan malam hari
    const isWeekend = d.getDay() === 0 || d.getDay() === 6 || d.getDay() === 5;
    const baseMult = isWeekend ? 1.4 : 1.0;
    const randomFactor = 0.85 + Math.sin(i * 0.4) * 0.15;

    const hitungWeton = Math.round(1200 * baseMult * randomFactor);
    const pencarianFirasat = Math.round(950 * baseMult * (0.9 + Math.cos(i * 0.3) * 0.1));
    const hitungNikahJodoh = Math.round(1450 * baseMult * randomFactor);
    const cekNagaDina = Math.round(520 * baseMult * randomFactor);
    const totalAkses = hitungWeton + pencarianFirasat + hitungNikahJodoh + cekNagaDina;

    result.push({
      tanggal: dateStr,
      labelHari: dayLabel,
      totalAkses,
      pencarianFirasat,
      hitungWeton,
      hitungNikahJodoh,
      cekNagaDina,
    });
  }

  return result;
}

// ----------------------------------------------------------------------------
// SISTEM LOGGING ANONIM DI SISI KLIEN (LOCAL TELEMETRY)
// ----------------------------------------------------------------------------
const LOCAL_ANALYTICS_KEY = 'weton_jowo_anonymous_telemetry_v1';

export interface LocalTelemetryStore {
  totalSearches: number;
  recentSearches: { query: string; category: string; timestamp: number }[];
  recentWetonLookups: { weton: string; neptu: number; timestamp: number }[];
}

export function getLocalTelemetry(): LocalTelemetryStore {
  try {
    const raw = localStorage.getItem(LOCAL_ANALYTICS_KEY);
    if (!raw) {
      return { totalSearches: 0, recentSearches: [], recentWetonLookups: [] };
    }
    return JSON.parse(raw);
  } catch {
    return { totalSearches: 0, recentSearches: [], recentWetonLookups: [] };
  }
}

export function logAnonymousSearch(query: string, category: string = 'Firasat') {
  if (!query || query.trim().length < 2) return;
  try {
    const data = getLocalTelemetry();
    data.totalSearches += 1;
    data.recentSearches.unshift({
      query: query.trim(),
      category,
      timestamp: Date.now(),
    });
    // Simpan maksimal 50 log terbaru
    if (data.recentSearches.length > 50) data.recentSearches.pop();
    localStorage.setItem(LOCAL_ANALYTICS_KEY, JSON.stringify(data));
  } catch {
    // Fail-safe silently for quota or privacy restrictions
  }
}

export function logAnonymousWetonLookup(weton: string, neptu: number) {
  if (!weton) return;
  try {
    const data = getLocalTelemetry();
    data.recentWetonLookups.unshift({
      weton,
      neptu,
      timestamp: Date.now(),
    });
    if (data.recentWetonLookups.length > 50) data.recentWetonLookups.pop();
    localStorage.setItem(LOCAL_ANALYTICS_KEY, JSON.stringify(data));
  } catch {
    // Fail-safe silently
  }
}
