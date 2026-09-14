import { HariJawa, PasaranJawa } from '../types/weton';
import { getHariPasaranFromDate, getTahunJawa, checkLaranganAdat } from '../utils/javaneseCalendar';

// -------------------------------------------------------------------
// NAMA-NAMA BULAN DALAM 3 SISTEM KALENDER
// -------------------------------------------------------------------

export const BULAN_MASEHI = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export const BULAN_HIJRIAH = [
  'Muharram', 'Safar', "Rabi'ul Awwal", "Rabi'ul Akhir",
  'Jumadil Awwal', 'Jumadil Akhir', 'Rajab', "Sya'ban",
  'Ramadhan', 'Syawal', "Dzulqa'dah", 'Dzulhijjah'
];

export const BULAN_JAWA = [
  'Sura', 'Sapar', 'Mulud', 'Bakda Mulud',
  'Jumadilawal', 'Jumadilakhir', 'Rejeb', 'Ruwah',
  'Pasa', 'Sawal', 'Dulkangidah (Sela)', 'Besar'
];

export const UMUR_BULAN_JAWA = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29]; // Besar kabisat 30 hari

export const SIKLUS_TAHUN_JAWA = [
  { nama: 'Alip', neptu: 1, hariAwal: 'Selasa Pon (Asapon)', umurHari: 354, isKabisat: false, makna: 'Awal siklus, melambangkan pembukaan niat dan laku hidup.' },
  { nama: 'Ehe', neptu: 5, hariAwal: 'Ahad Wage', umurHari: 355, isKabisat: true, makna: 'Tahun kabisat (panjang), kemakmuran dan pertumbuhan pangan.' },
  { nama: 'Jimawal', neptu: 3, hariAwal: 'Kemis Pon', umurHari: 354, isKabisat: false, makna: 'Keteguhan cipta rasa karsa, stabilitas usaha.' },
  { nama: 'Je', neptu: 7, hariAwal: 'Senen Pahing', umurHari: 354, isKabisat: false, makna: 'Tahun kehati-hatian, menjaga persaudaraan.' },
  { nama: 'Dal', neptu: 4, hariAwal: 'Jumat Legi', umurHari: 355, isKabisat: true, makna: 'Tahun Dal kabisat mulia (Grebeg Dal), penuh berkah agung.' },
  { nama: 'Be', neptu: 2, hariAwal: 'Rebo Kliwon', umurHari: 354, isKabisat: false, makna: 'Tahun ketenangan, kelimpahan sandang dan pangan.' },
  { nama: 'Wawu', neptu: 6, hariAwal: 'Ahad Kliwon', umurHari: 354, isKabisat: false, makna: 'Tahun perenungan dan pembersihan batin.' },
  { nama: 'Jimakir', neptu: 3, hariAwal: 'Kemis Wage', umurHari: 355, isKabisat: true, makna: 'Penutup windu kabisat, waktu bersyukur dan evaluasi diri.' }
];

export const SIKLUS_WINDU = [
  { nama: 'Adi (Kuntara)', perlambang: 'Kancana (Emas)', makna: 'Masa kejayaan, kemakmuran kepemimpinan, dan keluhuran budi.' },
  { nama: 'Sengara', perlambang: 'Banyu (Air)', makna: 'Masa dinamika, perubahan zaman, perlunya kesiapsiagaan rohani.' },
  { nama: 'Sancaya', perlambang: 'Bumi (Tanah)', makna: 'Masa kesuburan agraris, kestabilan ekonomi dan kesejahteraan rakyat.' },
  { nama: 'Boma', perlambang: 'Geni (Api)', makna: 'Masa semangat keberanian, pembangunan infrastruktur, dan kemajuan karsa.' }
];

// -------------------------------------------------------------------
// INTERFACE DATA HARI KALENDER ABADI
// -------------------------------------------------------------------

export interface HariBesarEvent {
  nama: string;
  kategori: 'nasional' | 'islam' | 'jawa' | 'adat';
  isLiburNasional: boolean;
  keterangan: string;
}

export interface TanggalKalenderDetail {
  tanggalMasehi: number; // 1 - 31
  bulanMasehi: number; // 1 - 12
  tahunMasehi: number;
  isoString: string; // YYYY-MM-DD
  hariMasehi: string; // Minggu, Senin, ...
  hariJawa: HariJawa;
  pasaran: PasaranJawa;
  neptuHari: number;
  neptuPasaran: number;
  neptuTotal: number;
  wuku: string;
  wukuIndex: number;
  
  // Penanggalan Hijriah
  tanggalHijriah: number;
  bulanHijriah: number; // 1 - 12
  namaBulanHijriah: string;
  tahunHijriah: number;

  // Penanggalan Jawa
  tanggalJawa: number;
  bulanJawa: number; // 1 - 12
  namaBulanJawa: string;
  tahunJawa: number;
  namaTahunJawa: string;
  namaWindu: string;
  lambangWindu: string;

  // Pranata Mangsa
  pranataMangsa: string;

  // Hari Besar & Peristiwa
  hariBesar: HariBesarEvent[];

  // Penanda Khusus Jawa
  isJumatKliwon: boolean;
  isSelasaKliwon: boolean;
  isReboWage: boolean;
  isPurnama: boolean; // Sidi 14-15
  isTilem: boolean; // Bulan Mati 29-30 / 1
  isReboWekasan?: boolean;
  isMaleman?: boolean;

  // Pantangan Adat
  isTaliwangke: boolean;
  isSamparwangke: boolean;
  isDinaSangar: boolean;
  isNaasTanggal: boolean;
  keteranganAdat: string[];

  isCurrentMonth: boolean;
  isToday: boolean;
}

// -------------------------------------------------------------------
// DAFTAR HARI BESAR NASIONAL TETAP (MASEHI)
// -------------------------------------------------------------------
const HARI_LIBUR_NASIONAL_MASEHI: Record<string, { nama: string; libur: boolean; ket: string }> = {
  '01-01': { nama: 'Tahun Baru Masehi', libur: true, ket: 'Awal tahun kalender Gregorian.' },
  '05-01': { nama: 'Hari Buruh Internasional', libur: true, ket: 'Peringatan hak tenaga kerja sedunia.' },
  '06-01': { nama: 'Hari Lahir Pancasila', libur: true, ket: 'Dasar negara Republik Indonesia.' },
  '08-17': { nama: 'Hari Kemerdekaan RI', libur: true, ket: 'Proklamasi Kemerdekaan Republik Indonesia 17 Agustus 1945.' },
  '10-01': { nama: 'Hari Kesaktian Pancasila', libur: false, ket: 'Peringatan keutuhan ideologi bangsa.' },
  '10-28': { nama: 'Hari Sumpah Pemuda', libur: false, ket: 'Ikrar persatuan pemuda Indonesia 1928.' },
  '11-10': { nama: 'Hari Pahlawan', libur: false, ket: 'Mengenang pertempuran Surabaya 10 November 1945.' },
  '12-25': { nama: 'Hari Raya Natal', libur: true, ket: 'Kelahiran Yesus Kristus.' }
};

// -------------------------------------------------------------------
// KONVERSI ASTRONOMI & KALENDER HIJRIAH / JAWA
// Menggunakan Julian Day Number (JDN) untuk kepastian abadi
// -------------------------------------------------------------------

export function gregorianToJDN(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

export function jdnToHijri(jdn: number): { day: number; month: number; year: number } {
  // Epok Hijriah: JDN 1948439.5 (1 Muharram 1 H = 16 Juli 622 M)
  const l = Math.floor(jdn - 1948439.5) + 10632;
  const n = Math.floor((l - 1) / 10631);
  const lPrime = l - 10631 * n + 354;
  const j = (Math.floor((10985 - lPrime) / 5316)) * (Math.floor((50 * lPrime) / 17719)) + (Math.floor(lPrime / 5670)) * (Math.floor((43 * lPrime) / 15238));
  const lDoublePrime = lPrime - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  const m = Math.floor((24 * lDoublePrime) / 709);
  const d = lDoublePrime - Math.floor((709 * m) / 24);
  const y = 30 * n + j - 30;

  // Koreksi 1-indexed
  const day = Math.max(1, Math.min(30, Math.floor(d)));
  const month = Math.max(1, Math.min(12, Math.floor(m)));
  const year = Math.floor(y);

  return { day, month, year };
}

// Konversi Kalender Jawa Sultan Agung (Sistem Anno Javanico / AJ)
// 1 Sura 1555 AJ = 1 Muharram 1043 H = 8 Juli 1633 M
export function getJavaneseCalendarDetail(yearMasehi: number, monthMasehi: number, dayMasehi: number) {
  const jdn = gregorianToJDN(yearMasehi, monthMasehi, dayMasehi);
  const hijri = jdnToHijri(jdn);

  // Kalender Jawa Sultan Agungan mengadopsi bulan Kamariah Hijriah
  // Tahun Jawa = Tahun Hijriah + 512 (karena 1043 H = 1555 Jawa -> selisih konstan 512)
  const tahunJawa = hijri.year + 512;
  const bulanJawa = hijri.month;
  const tanggalJawa = hijri.day;
  const namaBulanJawa = BULAN_JAWA[bulanJawa - 1];

  // Siklus Windu 8 Tahun Jawa: Alip(0), Ehe(1), Jimawal(2), Je(3), Dal(4), Be(5), Wawu(6), Jimakir(7)
  // 1555 AJ adalah Tahun Alip (index 0)
  const indexTahun = ((tahunJawa - 1555) % 8 + 8) % 8;
  const infoTahun = SIKLUS_TAHUN_JAWA[indexTahun];

  // Siklus 4 Windu (32 Tahun): Adi/Kuntara(0), Sengara(1), Sancaya(2), Boma(3)
  const indexWindu = Math.floor(((tahunJawa - 1555) / 8) % 4 + 4) % 4;
  const infoWindu = SIKLUS_WINDU[indexWindu];

  return {
    tanggalJawa,
    bulanJawa,
    namaBulanJawa,
    tahunJawa,
    namaTahunJawa: infoTahun.nama,
    maknaTahun: infoTahun.makna,
    namaWindu: infoWindu.nama,
    lambangWindu: infoWindu.perlambang,
    maknaWindu: infoWindu.makna,
    hijriah: {
      tanggal: hijri.day,
      bulan: hijri.month,
      namaBulan: BULAN_HIJRIAH[hijri.month - 1],
      tahun: hijri.year
    }
  };
}

// -------------------------------------------------------------------
// PENGECEKAN HARI BESAR ISLAM & TRADISI JAWA
// -------------------------------------------------------------------
export function getHariBesarDanBudaya(
  bulanHijriah: number,
  tanggalHijriah: number,
  bulanMasehi: number,
  tanggalMasehi: number,
  hariJawa: HariJawa,
  pasaran: PasaranJawa
): HariBesarEvent[] {
  const events: HariBesarEvent[] = [];

  // 1. Libur Nasional Masehi
  const keyM = `${String(bulanMasehi).padStart(2, '0')}-${String(tanggalMasehi).padStart(2, '0')}`;
  if (HARI_LIBUR_NASIONAL_MASEHI[keyM]) {
    const l = HARI_LIBUR_NASIONAL_MASEHI[keyM];
    events.push({
      nama: l.nama,
      kategori: 'nasional',
      isLiburNasional: l.libur,
      keterangan: l.ket
    });
  }

  // 2. Hari Besar Islam & Tradisi Keraton Jawa
  // 1 Muharram / 1 Sura
  if (bulanHijriah === 1 && tanggalHijriah === 1) {
    events.push({
      nama: 'Tahun Baru Islam (1 Muharram / 1 Sura)',
      kategori: 'islam',
      isLiburNasional: true,
      keterangan: 'Tahun Baru Hijriah & Tahun Baru Kalender Jawa Sultan Agung (Mubeng Beteng & Siraman Pusaka).'
    });
  }

  // 10 Muharram (Asyura)
  if (bulanHijriah === 1 && tanggalHijriah === 10) {
    events.push({
      nama: 'Hari Asyura (10 Sura)',
      kategori: 'islam',
      isLiburNasional: false,
      keterangan: 'Hari mulia puasa Asyura dan sedekah Bubur Sura.'
    });
  }

  // Rebo Wekasan (Rabu Terakhir Bulan Safar / Sapar)
  if (bulanHijriah === 2 && hariJawa === 'Rebo' && tanggalHijriah >= 22) {
    events.push({
      nama: 'Rebo Wekasan (Rebo Pungkasan)',
      kategori: 'jawa',
      isLiburNasional: false,
      keterangan: 'Tradisi tolak bala, sholat lidaf\'il bala, sedekah kue apem, dan doa bersama memohon keselamatan semesta.'
    });
  }

  // 12 Rabi'ul Awwal / Mulud (Maulid Nabi Muhammad SAW & Grebeg Mulud)
  if (bulanHijriah === 3 && tanggalHijriah === 12) {
    events.push({
      nama: 'Maulid Nabi SAW (Grebeg Mulud / Sekaten)',
      kategori: 'islam',
      isLiburNasional: true,
      keterangan: 'Peringatan kelahiran Nabi Muhammad SAW & Upacara Adat Sekaten Grebeg Gunungan Keraton Mataram.'
    });
  }

  // 27 Rajab / Rejeb (Isra Miraj)
  if (bulanHijriah === 7 && tanggalHijriah === 27) {
    events.push({
      nama: "Isra Mi'raj Nabi Muhammad SAW (27 Rejeb)",
      kategori: 'islam',
      isLiburNasional: true,
      keterangan: 'Perjalanan agung Rasulullah SAW menerima perintah ibadah shalat 5 waktu.'
    });
  }

  // Nisfu Sya'ban / Ruwahan (15 Sya'ban / Ruwah)
  if (bulanHijriah === 8 && tanggalHijriah === 15) {
    events.push({
      nama: "Nisfu Sya'ban (Tradisi Ruwahan & Sadranan)",
      kategori: 'jawa',
      isLiburNasional: false,
      keterangan: 'Malam pencatatan amal dan tradisi Nyadran ziarah kubur mendoakan para leluhur.'
    });
  }

  // 1 Ramadhan / Pasa (Awal Puasa)
  if (bulanHijriah === 9 && tanggalHijriah === 1) {
    events.push({
      nama: '1 Ramadhan (Awal Ibadah Puasa)',
      kategori: 'islam',
      isLiburNasional: false,
      keterangan: 'Awal ibadah puasa wajib bulan suci Ramadhan.'
    });
  }

  // 17 Ramadhan (Nuzulul Qur'an)
  if (bulanHijriah === 9 && tanggalHijriah === 17) {
    events.push({
      nama: "Nuzulul Qur'an (17 Pasa)",
      kategori: 'islam',
      isLiburNasional: false,
      keterangan: 'Malam diturunkannya wahyu pertama Al-Qur\'an kepada Nabi Muhammad SAW.'
    });
  }

  // Maleman Selikuran (21, 23, 25, 27, 29 Ramadhan)
  if (bulanHijriah === 9 && [21, 23, 25, 27, 29].includes(tanggalHijriah)) {
    events.push({
      nama: `Maleman ${tanggalHijriah} (Lailatul Qadar)`,
      kategori: 'jawa',
      isLiburNasional: false,
      keterangan: `Tradisi Maleman Selikuran Keraton dan iktikaf memburu berkah malam seribu bulan Lailatul Qadar.`
    });
  }

  // 1 Syawal / Sawal (Hari Raya Idul Fitri)
  if (bulanHijriah === 10 && tanggalHijriah === 1) {
    events.push({
      nama: 'Hari Raya Idul Fitri 1 Syawal',
      kategori: 'islam',
      isLiburNasional: true,
      keterangan: 'Hari Kemenangan Umat Islam & Tradisi Sungkeman Lebaran / Halal Bihalal Nusantara.'
    });
  }
  if (bulanHijriah === 10 && tanggalHijriah === 2) {
    events.push({
      nama: 'Hari Raya Idul Fitri Hari Ke-2',
      kategori: 'islam',
      isLiburNasional: true,
      keterangan: 'Silaturahmi keluarga besar dan kerabat.'
    });
  }

  // 8 Syawal (Lebaran Ketupat / Kupatan)
  if (bulanHijriah === 10 && tanggalHijriah === 8) {
    events.push({
      nama: 'Lebaran Ketupat (Bada Kupat)',
      kategori: 'jawa',
      isLiburNasional: false,
      keterangan: 'Tradisi luhur Bada Kupat ciptaan Sunan Kalijaga setelah berpuasa Syawal 6 hari.'
    });
  }

  // 1-9 Dzulhijjah (Ayyamul Asyr & Hari Arafah)
  if (bulanHijriah === 12 && tanggalHijriah === 9) {
    events.push({
      nama: 'Hari Arafah (9 Besar)',
      kategori: 'islam',
      isLiburNasional: false,
      keterangan: 'Puncak wukuf jamaah haji di Arafah dan puasa sunnah Arafah.'
    });
  }

  // 10 Dzulhijjah / Besar (Hari Raya Idul Adha & Grebeg Besar)
  if (bulanHijriah === 12 && tanggalHijriah === 10) {
    events.push({
      nama: 'Hari Raya Idul Adha (Grebeg Besar)',
      kategori: 'islam',
      isLiburNasional: true,
      keterangan: 'Hari Raya Kurban 10 Dzulhijjah & Upacara Adat Grebeg Besar Keraton Mataram.'
    });
  }

  // Hari Tasyrik (11, 12, 13 Dzulhijjah)
  if (bulanHijriah === 12 && [11, 12, 13].includes(tanggalHijriah)) {
    events.push({
      nama: `Hari Tasyrik (${tanggalHijriah} Dzulhijjah)`,
      kategori: 'islam',
      isLiburNasional: false,
      keterangan: 'Hari penyembelihan kurban dan dilarang berpuasa.'
    });
  }

  // 3. Hari Pasaran Sakral Tradisi Jawa
  if (hariJawa === 'Jemuwah' && pasaran === 'Kliwon') {
    events.push({
      nama: 'Malam / Hari Jumat Kliwon',
      kategori: 'adat',
      isLiburNasional: false,
      keterangan: 'Hari sakral Jawa berbobot spiritual tinggi, doa arwah leluhur, tirakat batin, dan kebersihan rohani.'
    });
  }

  if (hariJawa === 'Selasa' && pasaran === 'Kliwon') {
    events.push({
      nama: 'Selasa Kliwon (Anggara Kasih)',
      kategori: 'adat',
      isLiburNasional: false,
      keterangan: 'Dina Anggara Kasih untuk merawat pusaka, meditasi ketenangan batin, dan welas asih.'
    });
  }

  return events;
}

// -------------------------------------------------------------------
// GENERATOR MATRIX SATU BULAN PENUH (GRID KALENDER)
// -------------------------------------------------------------------
export function generateBulanKalenderAbadi(year: number, month: number): TanggalKalenderDetail[] {
  // month: 1 - 12
  const results: TanggalKalenderDetail[] = [];

  // Hari pertama dalam bulan Masehi
  const firstDayObj = new Date(year, month - 1, 1);
  const dayOfWeek = firstDayObj.getDay(); // 0 = Minggu (Ahad)
  const totalDaysInMonth = new Date(year, month, 0).getDate();

  // Tanggal hari ini
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // 1. Hari-hari dari bulan sebelumnya (leading padding)
  const prevMonthTotalDays = new Date(year, month - 1, 0).getDate();
  for (let i = dayOfWeek - 1; i >= 0; i--) {
    const prevDay = prevMonthTotalDays - i;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const iso = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(prevDay).padStart(2, '0')}`;
    
    results.push(createSingleDayDetail(prevYear, prevMonth, prevDay, iso, false, iso === todayStr));
  }

  // 2. Hari-hari bulan berjalan
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const iso = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    results.push(createSingleDayDetail(year, month, d, iso, true, iso === todayStr));
  }

  // 3. Hari-hari dari bulan berikutnya (trailing padding ke kelipatan 7 atau 35/42)
  const remainingCells = (7 - (results.length % 7)) % 7;
  // Pastikan minimum 35 atau 42 kotak agar layout stabil
  const totalTarget = results.length + remainingCells < 35 ? 35 : (results.length + remainingCells <= 42 ? results.length + remainingCells : 42);
  const trailingNeeded = totalTarget - results.length;

  for (let nextDay = 1; nextDay <= trailingNeeded; nextDay++) {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const iso = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`;

    results.push(createSingleDayDetail(nextYear, nextMonth, nextDay, iso, false, iso === todayStr));
  }

  return results;
}

function createSingleDayDetail(
  year: number,
  month: number,
  day: number,
  isoString: string,
  isCurrentMonth: boolean,
  isToday: boolean
): TanggalKalenderDetail {
  const hp = getHariPasaranFromDate(isoString);
  const javanese = getJavaneseCalendarDetail(year, month, day);
  const larangan = checkLaranganAdat(hp.hari, hp.pasaran, hp.wuku, javanese.bulanJawa, javanese.tanggalJawa);
  const events = getHariBesarDanBudaya(
    javanese.hijriah.bulan,
    javanese.hijriah.tanggal,
    month,
    day,
    hp.hari,
    hp.pasaran
  );

  const isJumatKliwon = hp.hari === 'Jemuwah' && hp.pasaran === 'Kliwon';
  const isSelasaKliwon = hp.hari === 'Selasa' && hp.pasaran === 'Kliwon';
  const isReboWage = hp.hari === 'Rebo' && hp.pasaran === 'Wage';
  const isPurnama = javanese.tanggalJawa === 14 || javanese.tanggalJawa === 15;
  const isTilem = javanese.tanggalJawa === 1 || javanese.tanggalJawa === 29 || javanese.tanggalJawa === 30;

  return {
    tanggalMasehi: day,
    bulanMasehi: month,
    tahunMasehi: year,
    isoString,
    hariMasehi: hp.hariMasehi,
    hariJawa: hp.hari,
    pasaran: hp.pasaran,
    neptuHari: hp.neptuHari,
    neptuPasaran: hp.neptuPasaran,
    neptuTotal: hp.neptuTotal,
    wuku: hp.wuku,
    wukuIndex: hp.wukuIndex,
    
    tanggalHijriah: javanese.hijriah.tanggal,
    bulanHijriah: javanese.hijriah.bulan,
    namaBulanHijriah: javanese.hijriah.namaBulan,
    tahunHijriah: javanese.hijriah.tahun,

    tanggalJawa: javanese.tanggalJawa,
    bulanJawa: javanese.bulanJawa,
    namaBulanJawa: javanese.namaBulanJawa,
    tahunJawa: javanese.tahunJawa,
    namaTahunJawa: javanese.namaTahunJawa,
    namaWindu: javanese.namaWindu,
    lambangWindu: javanese.lambangWindu,

    pranataMangsa: '', // Dihitung di view
    hariBesar: events,

    isJumatKliwon,
    isSelasaKliwon,
    isReboWage,
    isPurnama,
    isTilem,

    isTaliwangke: larangan.isTaliwangke,
    isSamparwangke: larangan.isSamparwangke,
    isDinaSangar: larangan.isDinaSangar,
    isNaasTanggal: larangan.isNaasTanggal,
    keteranganAdat: larangan.keteranganAdat,

    isCurrentMonth,
    isToday
  };
}
