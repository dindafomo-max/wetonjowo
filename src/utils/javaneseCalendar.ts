import {
  DAFTAR_HARI,
  DAFTAR_PASARAN,
  DAFTAR_WUKU,
  DINA_SANGAR_BULAN,
  PRANATA_MANGSA_DATA,
  SAMPARWANGKE_MAP,
  TALIWANGKE_MAP
} from '../data/primbonData';
import {
  PAL_SRIGATI_MAP,
  RENTANG_USIA_PAL_SRIGATI,
  SKOR_PAL_SRIGATI_INFO,
  PANCASUDA_REZEKI_MAP,
  PANGARASAN_MAP,
  ARAH_REZEKI_HARI_MAP
} from '../data/palSrigatiData';
import { SATRIYA_JAYABAYA_DATA } from '../data/jayabayaData';
import { DAFTAR_SUKERTA } from '../data/ruwatanData';
import {
  HariJawa,
  PasaranJawa,
  PranataMangsaInfo,
  WetonInfo,
  PalSrigatiResult,
  PalSrigatiPoint,
  ArahRezekiHarian,
  SatriyaJayabayaInfo,
  SukertaDefinisi,
  PrediksiHarianWeton
} from '../types/weton';

// Anchor historis terpercaya:
// 17 Agustus 1945 = Jumat (Jemuwah) Legi, Wuku Julungpujut (Wuku ke-15)
// 24 Maret 2024 = Ahad Legi, Wuku Sinta (Wuku ke-1, awal siklus 210 hari Pawukon)
const ANCHOR_DATE_UTC = Date.UTC(2024, 2, 24); // 24 Maret 2024 (Ahad Legi, Wuku Sinta)

/**
 * Mengambil tanggal lokal saat ini langsung dari sistem komputer / perangkat pengguna.
 * Menggunakan getFullYear(), getMonth(), dan getDate() lokal sehingga tidak terpengaruh selisih UTC.
 * Format output: YYYY-MM-DD
 */
export function getDeviceLocalDateString(customDate?: Date): string {
  const d = customDate || new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format tanggal lokal perangkat ke bahasa Indonesia lengkap
 * Contoh: "Senin, 14 September 2026"
 */
export function getDeviceFormattedDate(customDate?: Date): string {
  const d = customDate || new Date();
  try {
    return d.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return getDeviceLocalDateString(d);
  }
}

export function getDaysDiffFromAnchor(year: number, month: number, day: number): number {
  const targetUtc = Date.UTC(year, month - 1, day);
  return Math.round((targetUtc - ANCHOR_DATE_UTC) / (24 * 60 * 60 * 1000));
}

export function parseDateComponents(dateStr: string): { year: number; month: number; day: number } {
  const [y, m, d] = dateStr.split('-').map(Number);
  return { year: y, month: m, day: d };
}

export function getHariPasaranFromDate(dateStr: string): {
  hari: HariJawa;
  hariMasehi: string;
  pasaran: PasaranJawa;
  neptuHari: number;
  neptuPasaran: number;
  neptuTotal: number;
  wuku: string;
  wukuIndex: number;
} {
  const { year, month, day } = parseDateComponents(dateStr);
  const diffDays = getDaysDiffFromAnchor(year, month, day);

  // 24 Maret 2024 adalah Ahad (index 0)
  const hariIndex = ((diffDays % 7) + 7) % 7;
  const hariObj = DAFTAR_HARI[hariIndex];

  // 24 Maret 2024 adalah Legi (index 0)
  const pasaranIndex = ((diffDays % 5) + 5) % 5;
  const pasaranObj = DAFTAR_PASARAN[pasaranIndex];

  // Siklus wuku 210 hari (30 wuku x 7 hari)
  const daysInCycle = ((diffDays % 210) + 210) % 210;
  const wukuIndex = Math.floor(daysInCycle / 7); // 0 sampai 29
  const wukuName = DAFTAR_WUKU[wukuIndex];

  return {
    hari: hariObj.nama,
    hariMasehi: hariObj.aliasMasehi,
    pasaran: pasaranObj.nama,
    neptuHari: hariObj.neptu,
    neptuPasaran: pasaranObj.neptu,
    neptuTotal: hariObj.neptu + pasaranObj.neptu,
    wuku: wukuName,
    wukuIndex: wukuIndex + 1,
  };
}

export function getTahunJawa(year: number): { tahunJawa: string; namaTahun: string; windu: string } {
  // Tahun Jawa berjarak ~67 tahun di belakang Masehi
  // Siklus Windu 8 Tahun: Alip, Ehe, Jimawal, Je, Dal, Be, Wawu, Jimakhir
  const DAFTAR_TAHUN_WINDU = ['Alip', 'Ehe', 'Jimawal', 'Je', 'Dal', 'Be', 'Wawu', 'Jimakhir'];
  const DAFTAR_WINDU = ['Adi (Kuntara)', 'Sengara', 'Sancaya', 'Boma'];
  
  const tahunJawaNum = year - 67; // Pendekatan kalender Sultan Agung
  const indexTahun = ((tahunJawaNum % 8) + 8) % 8;
  const indexWindu = Math.floor((tahunJawaNum / 8) % 4);

  return {
    tahunJawa: `${tahunJawaNum} Saka/Jawa`,
    namaTahun: DAFTAR_TAHUN_WINDU[indexTahun],
    windu: DAFTAR_WINDU[indexWindu],
  };
}

export function getWatakDanUnsur(neptuTotal: number): { lambangUnsur: string; watakLahir: string } {
  const unsurList = ['Tanah (Pemberi Dasar & Pengayom)', 'Api (Semangat & Tegas)', 'Angin (Luwes & Ramah)', 'Air (Tenang & Bijaksana)'];
  const lambangUnsur = unsurList[neptuTotal % 4];

  const watakMap: Record<number, string> = {
    7: 'Pendito Kang Lelaku: Senang mengembara, suka berwisata atau bepergian, tekun belajar hal baru, dan mandiri.',
    8: 'Lakuning Geni: Berjiwa pemberani, emosi cepat menyala namun cepat reda, tegas memegang prinsip, dan pelindung.',
    9: 'Lakuning Angin: Mudah bergaul, luwes berbicara, disenangi kawan, pandai menghibur, dan lincah berikhtiar.',
    10: 'Pendito Mbangun Deso: Berpikiran tajam, suka memberi nasihat bijak, cinta kedamaian, dan berwawasan luas.',
    11: 'Lakuning Setan: Berani membela pendirian, tidak mudah gentar oleh gertakan, cerdas berstrategi, perlu kesabaran.',
    12: 'Lakuning Kembang: Berkarisma memikat, harum budi pekertinya, disukai banyak orang, cinta seni dan keindahan.',
    13: 'Lakuning Bintang: Tenang bersahaja, berpenampilan rapi, pandai menyimpan rahasia, dan tekun dalam pekerjaan.',
    14: 'Lakuning Mbulan: Pengayom sejati, tutur katanya menyejukkan hati pendengar, bijaksana, dan menjadi rujukan banyak orang.',
    15: 'Lakuning Srengenge: Berwibawa tinggi, menerangi kegelapan, disegani lawan dan kawan, suka membimbing.',
    16: 'Lakuning Bumi: Penuh welas asih, sabar menerima cobaan hidup, murah hati, dan menjadi tumpuan harapan keluarga.',
    17: 'Lakuning Gunung: Pendiam namun berhati kokoh, teguh memegang rahasia, ulet, dan menyimpan potensi luar biasa.',
    18: 'Lakuning Paripurna: Karakter kepemimpinan tertinggi, berjiwa pengayom semesta, berani berkorban demi kebenaran.',
  };

  const watakLahir = watakMap[neptuTotal] || 'Pribadi yang luhur budi, tekun beribadah, dan berpotensi meraih keberkahan hidup.';
  return { lambangUnsur, watakLahir };
}

export function getArahKalaDanNaga(hari: HariJawa): { nagaDina: string; kalaHari: string } {
  const arahMap: Record<HariJawa, { nagaDina: string; kalaHari: string }> = {
    'Ahad': { nagaDina: 'Barat Laut (Kulon Lor)', kalaHari: 'Timur Laut (Wetan Lor)' },
    'Senen': { nagaDina: 'Timur (Wetan)', kalaHari: 'Tenggara (Kidul Wetan)' },
    'Selasa': { nagaDina: 'Selatan (Kidul)', kalaHari: 'Barat Laut (Kulon Lor)' },
    'Rebo': { nagaDina: 'Utara (Lor)', kalaHari: 'Barat Daya (Kulon Kidul)' },
    'Kemis': { nagaDina: 'Tenggara (Kidul Wetan)', kalaHari: 'Barat (Kulon)' },
    'Jemuwah': { nagaDina: 'Timur Laut (Wetan Lor)', kalaHari: 'Utara (Lor)' },
    'Setu': { nagaDina: 'Barat Daya (Kulon Kidul)', kalaHari: 'Selatan (Kidul)' },
  };

  return arahMap[hari] || { nagaDina: 'Pusat', kalaHari: 'Pusat' };
}

export function checkLaranganAdat(
  hari: HariJawa,
  pasaran: PasaranJawa,
  wuku: string,
  monthJawa: number,
  dayJawa: number
): {
  isTaliwangke: boolean;
  isSamparwangke: boolean;
  isDinaSangar: boolean;
  isNaasTanggal: boolean;
  isDinaKoas: boolean;
  keteranganAdat: string[];
} {
  const keterangan: string[] = [];

  // 1. Taliwangke
  const tw = TALIWANGKE_MAP[wuku];
  const isTaliwangke = tw ? tw.hari === hari && tw.pasaran === pasaran : false;
  if (isTaliwangke) {
    keterangan.push(`Taliwangke wuku ${wuku} (hindari hajat ijab kabul, bepergian jauh, atau membuka usaha baru).`);
  }

  // 2. Samparwangke
  const sw = SAMPARWANGKE_MAP[wuku];
  const isSamparwangke = sw ? sw.hari === hari && sw.pasaran === pasaran : false;
  if (isSamparwangke) {
    keterangan.push(`Samparwangke wuku ${wuku} (dipantangi untuk boyongan rumah dan ikatan perjanjian besar).`);
  }

  // 3. Dina Sangar
  const sangarList = DINA_SANGAR_BULAN[monthJawa] || [11, 18];
  const isDinaSangar = sangarList.includes(dayJawa);
  if (isDinaSangar) {
    keterangan.push(`Dina Sangar wulan Jawa ke-${monthJawa} tanggal ${dayJawa} (dianjurkan sedekah doa mitigasi).`);
  }

  // 4. Naas Tanggal (Kala Daeng / Naas Bangsa: tgl 1, 4, 11, 25)
  const isNaasTanggal = [1, 4, 11, 25].includes(dayJawa);
  if (isNaasTanggal) {
    keterangan.push(`Naas Tanggal wulan ${dayJawa} (waspada dalam bepergian laut dan transaksi berisiko tinggi).`);
  }

  // 5. Dina Koas / Tumbak (hari yang berneptu 13 / 11 pada wuku tertentu)
  const isDinaKoas = false;

  return {
    isTaliwangke,
    isSamparwangke,
    isDinaSangar,
    isNaasTanggal,
    isDinaKoas,
    keteranganAdat: keterangan,
  };
}

export function hitungWetonLengkap(dateStr: string): WetonInfo {
  const { year, month, day } = parseDateComponents(dateStr);
  const hp = getHariPasaranFromDate(dateStr);
  const tahunInfo = getTahunJawa(year);
  const watakUnsur = getWatakDanUnsur(hp.neptuTotal);
  const arahInfo = getArahKalaDanNaga(hp.hari);

  // Estimasi tanggal Jawa (modulo 30 hari untuk siklus candra wulan)
  const approxMonthJawa = ((month + 1) % 12) + 1;
  const approxDayJawa = ((day + 12) % 30) + 1;

  const larangan = checkLaranganAdat(hp.hari, hp.pasaran, hp.wuku, approxMonthJawa, approxDayJawa);

  return {
    tanggalMasehi: dateStr,
    hari: hp.hari,
    hariMasehi: hp.hariMasehi,
    pasaran: hp.pasaran,
    neptuHari: hp.neptuHari,
    neptuPasaran: hp.neptuPasaran,
    neptuTotal: hp.neptuTotal,
    wuku: hp.wuku,
    wukuIndex: hp.wukuIndex,
    tahunJawa: tahunInfo.tahunJawa,
    namaTahun: tahunInfo.namaTahun,
    windu: tahunInfo.windu,
    lambangUnsur: watakUnsur.lambangUnsur,
    watakLahir: watakUnsur.watakLahir,
    nagaDina: arahInfo.nagaDina,
    kalaHari: arahInfo.kalaHari,
    isTaliwangke: larangan.isTaliwangke,
    isSamparwangke: larangan.isSamparwangke,
    isDinaSangar: larangan.isDinaSangar,
    isNaasTanggal: larangan.isNaasTanggal,
    isDinaKoas: larangan.isDinaKoas,
    keteranganAdat: larangan.keteranganAdat,
  };
}

// Menentukan Pranata Mangsa berdasar tanggal (Bulan & Hari Masehi)
export function getPranataMangsa(dateStr: string): PranataMangsaInfo {
  const { month, day } = parseDateComponents(dateStr);
  // Tanggal dalam format mmdd untuk perbandingan cepat
  const md = month * 100 + day;

  // 1. Kasa: 22 Juni (622) - 1 Agt (801)
  if (md >= 622 && md <= 801) return PRANATA_MANGSA_DATA[0];
  // 2. Karo: 2 Agt (802) - 24 Agt (824)
  if (md >= 802 && md <= 824) return PRANATA_MANGSA_DATA[1];
  // 3. Katelu: 25 Agt (825) - 17 Sept (917)
  if (md >= 825 && md <= 917) return PRANATA_MANGSA_DATA[2];
  // 4. Kapat: 18 Sept (918) - 12 Okt (1012)
  if (md >= 918 && md <= 1012) return PRANATA_MANGSA_DATA[3];
  // 5. Kalima: 13 Okt (1013) - 8 Nov (1108)
  if (md >= 1013 && md <= 1108) return PRANATA_MANGSA_DATA[4];
  // 6. Kanem: 9 Nov (1109) - 21 Des (1221)
  if (md >= 1109 && md <= 1221) return PRANATA_MANGSA_DATA[5];
  // 7. Kapitu: 22 Des (1222) - 2 Feb (202)
  if (md >= 1222 || md <= 202) return PRANATA_MANGSA_DATA[6];
  // 8. Kawolu: 3 Feb (203) - 28/29 Feb (229)
  if (md >= 203 && md <= 229) return PRANATA_MANGSA_DATA[7];
  // 9. Kasanga: 1 Mar (301) - 25 Mar (325)
  if (md >= 301 && md <= 325) return PRANATA_MANGSA_DATA[8];
  // 10. Kadasa: 26 Mar (326) - 18 Apr (418)
  if (md >= 326 && md <= 418) return PRANATA_MANGSA_DATA[9];
  // 11. Desta: 19 Apr (419) - 11 Mei (511)
  if (md >= 419 && md <= 511) return PRANATA_MANGSA_DATA[10];
  // 12. Saddha: 12 Mei (512) - 21 Juni (621)
  return PRANATA_MANGSA_DATA[11];
}

// Menghitung siklus wetonan (setiap 35 hari sekali)
export function getNextWetonanDates(birthDateStr: string, count: number = 6): string[] {
  const birthDate = new Date(birthDateStr);
  const now = new Date();
  const result: string[] = [];

  // Temukan wetonan terdekat di masa kini / masa depan
  const cycleMs = 35 * 24 * 60 * 60 * 1000;
  let currTime = birthDate.getTime();

  while (currTime < now.getTime() - (24 * 60 * 60 * 1000)) {
    currTime += cycleMs;
  }

  for (let i = 0; i < count; i++) {
    const d = new Date(currTime);
    const iso = d.toISOString().split('T')[0];
    result.push(iso);
    currTime += cycleMs;
  }

  return result;
}

// Menghitung hari Tedak Siten (Piton-piton / 7 lapan = 245 hari setelah lahir)
export function getTedakSitenDate(birthDateStr: string): { tanggal: string; weton: WetonInfo; umurHari: number } {
  const birthDate = new Date(birthDateStr);
  const tedakSitenMs = birthDate.getTime() + (245 * 24 * 60 * 60 * 1000);
  const target = new Date(tedakSitenMs);
  const targetIso = target.toISOString().split('T')[0];
  return {
    tanggal: targetIso,
    weton: hitungWetonLengkap(targetIso),
    umurHari: 245,
  };
}

// Menghitung hari Tingkepan (Mitoni / 7 bulan kehamilan = ~210 hari)
export function getTingkepanEstimate(hphtDateStr: string): { tanggal: string; weton: WetonInfo; usiaMinggu: number } {
  const hpht = new Date(hphtDateStr);
  // 7 bulan kehamilan = 28 minggu = 196 - 210 hari
  const tingkepanMs = hpht.getTime() + (210 * 24 * 60 * 60 * 1000);
  const target = new Date(tingkepanMs);
  const targetIso = target.toISOString().split('T')[0];
  return {
    tanggal: targetIso,
    weton: hitungWetonLengkap(targetIso),
    usiaMinggu: 30,
  };
}

// ----------------------------------------------------
// 1. KOMPUTASI PAL SRIGATI (Fluktuasi Rezeki 6 Tahunan)
// ----------------------------------------------------
export function hitungPalSrigati(birthDateStr: string): PalSrigatiResult {
  const weton = hitungWetonLengkap(birthDateStr);
  const neptu = Math.min(Math.max(weton.neptuTotal, 7), 18);

  const rawScores = PAL_SRIGATI_MAP[neptu] || [2, 3, 2, 4, 3, 5, 2, 4, 3, 5, 2, 4];

  const points: PalSrigatiPoint[] = rawScores.map((skor, idx) => {
    const rentang = RENTANG_USIA_PAL_SRIGATI[idx];
    const info = SKOR_PAL_SRIGATI_INFO[skor] || SKOR_PAL_SRIGATI_INFO[2];
    return {
      rentangUsia: rentang.label,
      usiaMin: rentang.min,
      usiaMax: rentang.max,
      skor,
      kategori: info.kategori,
      makna: info.makna,
      nasihatAdat: info.nasihatAdat,
    };
  });

  const totalScore = rawScores.reduce((acc, curr) => acc + curr, 0);
  const skorRataRata = Number((totalScore / rawScores.length).toFixed(1));

  // Temukan usia puncak (skor 5 atau 6)
  const puncakUsia = points
    .filter((p) => p.skor >= 5)
    .map((p) => `${p.rentangUsia} (${p.kategori})`);

  // Pancasuda Rezeki (Sisa 7 dari Neptu)
  const sisa7 = ((neptu - 1) % 7) + 1;
  const pancasudaInfo = PANCASUDA_REZEKI_MAP[sisa7] || PANCASUDA_REZEKI_MAP[1];

  // Pangarasan (Sisa 9 dari Neptu)
  const sisa9 = ((neptu - 1) % 9) + 1;
  const pangarasanInfo = PANGARASAN_MAP[sisa9] || PANGARASAN_MAP[1];

  // Bidang Usaha yang cocok berdasarkan lambang unsur & pancasuda
  const bidangUsahaCocok: string[] = [];
  if (weton.lambangUnsur.includes('Tanah')) {
    bidangUsahaCocok.push('Properti & Real Estate', 'Pertanian & Perkebunan', 'Material Bangunan', 'Investasi Logam Mulia');
  } else if (weton.lambangUnsur.includes('Air')) {
    bidangUsahaCocok.push('Kuliner & Minuman Segar', 'Budidaya Perikanan/Kelautan', 'Logistik & Distribusi', 'Jasa Konsultasi & Terapi');
  } else if (weton.lambangUnsur.includes('Api')) {
    bidangUsahaCocok.push('Kuliner Bakaran & Masakan Panas', 'Bengkel, Otomotif & Mesin', 'Kepemimpinan & Advokasi', 'Pemasaran & Humas');
  } else {
    bidangUsahaCocok.push('Teknologi & Digital Creative', 'Pariwisata & Transportasi', 'Ekspedisi & Komunikasi', 'Jasa Kreatif & Media');
  }

  return {
    weton,
    skorRataRata,
    puncakUsia: puncakUsia.length > 0 ? puncakUsia : ['Usia 30 - 36 Thn (Menanjak)', 'Usia 48 - 54 Thn (Stabil)'],
    points,
    pancasudaRezeki: {
      sisa: sisa7,
      nama: pancasudaInfo.nama,
      makna: pancasudaInfo.makna,
      anjuranPekerjaan: pancasudaInfo.anjuranPekerjaan,
    },
    pangarasan: {
      sisa: sisa9,
      nama: pangarasanInfo.nama,
      makna: pangarasanInfo.makna,
    },
    bidangUsahaCocok,
  };
}

// ----------------------------------------------------
// 2. PETUNG ARAH REZEKI & NAGA DINA HARIAN
// ----------------------------------------------------
export function getArahRezekiHarian(hari: HariJawa, pasaran: PasaranJawa): ArahRezekiHarian {
  const info = ARAH_REZEKI_HARI_MAP[hari] || ARAH_REZEKI_HARI_MAP['Ahad'];

  return {
    hari,
    pasaran,
    arahRezekiUtama: info.arahRezeki,
    arahPantanganKala: info.arahPantangan,
    posisiNagaDina: info.nagaDinaPosisi,
    jamBaikKeberuntungan: info.jamBerkah,
    unsurHari: info.elemen,
    mitigasiAdat: info.mitigasi,
  };
}

// ----------------------------------------------------
// 3. PETUNG 7 SATRIYA JAYABAYA (Kepemimpinan Nusantara)
// ----------------------------------------------------
export function hitungSatriyaJayabaya(neptuTotal: number): SatriyaJayabayaInfo {
  // Cari yang neptu cocok persis
  const match = SATRIYA_JAYABAYA_DATA.find((s) => s.neptuCocok.includes(neptuTotal));
  if (match) return match;

  // Fallback modulo 7
  const idx = ((neptuTotal - 1) % 7);
  return SATRIYA_JAYABAYA_DATA[idx];
}

// ----------------------------------------------------
// 4. DETEKSI STATUS SUKERTA (Kitab Lukmanakim & Betaljemur)
// ----------------------------------------------------
export function cekStatusSukerta(
  urutanAnak: number,
  totalSaudara: number,
  gender: 'L' | 'P',
  saudaraGenderList: ('L' | 'P')[] = []
): {
  isSukerta: boolean;
  sukertaMatch: SukertaDefinisi | null;
  analisisAdat: string;
} {
  // 1. Anak Tunggal
  if (totalSaudara === 1) {
    if (gender === 'L') {
      const match = DAFTAR_SUKERTA.find((s) => s.id === 'ontang-anting')!;
      return {
        isSukerta: true,
        sukertaMatch: match,
        analisisAdat: 'Termasuk Sukerta Ontang-Anting (anak laki-laki tunggal). Dianjurkan selamatan ruwatan untuk keselamatan batin.',
      };
    } else {
      const match = DAFTAR_SUKERTA.find((s) => s.id === 'unting-unting')!;
      return {
        isSukerta: true,
        sukertaMatch: match,
        analisisAdat: 'Termasuk Sukerta Unting-Unting (anak perempuan tunggal). Dianjurkan doa berkah dan siraman kembang sekar melati.',
      };
    }
  }

  // 2. Dua Saudara
  if (totalSaudara === 2 && saudaraGenderList.length >= 2) {
    const [g1, g2] = saudaraGenderList;
    if (g1 === 'L' && g2 === 'L') {
      const match = DAFTAR_SUKERTA.find((s) => s.id === 'uger-uger-lawang')!;
      return {
        isSukerta: true,
        sukertaMatch: match,
        analisisAdat: 'Termasuk Sukerta Uger-Uger Lawang (2 anak laki-laki). Dianjurkan tumpeng golong untuk memperkuat kerukunan.',
      };
    }
    if (g1 === 'P' && g2 === 'P') {
      const match = DAFTAR_SUKERTA.find((s) => s.id === 'kembang-sepasang')!;
      return {
        isSukerta: true,
        sukertaMatch: match,
        analisisAdat: 'Termasuk Sukerta Kembang Sepasang (2 anak perempuan). Dianjurkan sedekah tumpeng megono melati.',
      };
    }
    if (g1 === 'L' && g2 === 'P') {
      const match = DAFTAR_SUKERTA.find((s) => s.id === 'gedhana-gedhini')!;
      return {
        isSukerta: true,
        sukertaMatch: match,
        analisisAdat: 'Termasuk Sukerta Kedhana-Kedhini (sulung laki-laki & bungsu perempuan). Berkah pembuka rezeki keluarga.',
      };
    }
    if (g1 === 'P' && g2 === 'L') {
      const match = DAFTAR_SUKERTA.find((s) => s.id === 'gedhini-gedhana')!;
      return {
        isSukerta: true,
        sukertaMatch: match,
        analisisAdat: 'Termasuk Sukerta Kedhini-Kedhana (sulung perempuan & bungsu laki-laki). Dianjurkan doa persaudaraan.',
      };
    }
  }

  // 3. Tiga Saudara
  if (totalSaudara === 3 && saudaraGenderList.length >= 3) {
    const [g1, g2, g3] = saudaraGenderList;
    if (g1 === 'L' && g2 === 'P' && g3 === 'L') {
      const match = DAFTAR_SUKERTA.find((s) => s.id === 'sendang-kapit-pancuran')!;
      return {
        isSukerta: true,
        sukertaMatch: match,
        analisisAdat: 'Termasuk Sukerta Sendang Kapit Pancuran (perempuan diapit 2 laki-laki). Dianjurkan ruwatan air sendang suci.',
      };
    }
    if (g1 === 'P' && g2 === 'L' && g3 === 'P') {
      const match = DAFTAR_SUKERTA.find((s) => s.id === 'pancuran-kapit-sendang')!;
      return {
        isSukerta: true,
        sukertaMatch: match,
        analisisAdat: 'Termasuk Sukerta Pancuran Kapit Sendang (laki-laki diapit 2 perempuan). Dianjurkan tumpeng punar kuning.',
      };
    }
  }

  // 4. Lima Saudara
  if (totalSaudara === 5 && saudaraGenderList.length >= 5) {
    const allL = saudaraGenderList.every((g) => g === 'L');
    const allP = saudaraGenderList.every((g) => g === 'P');
    if (allL) {
      const match = DAFTAR_SUKERTA.find((s) => s.id === 'pandhawa')!;
      return {
        isSukerta: true,
        sukertaMatch: match,
        analisisAdat: 'Termasuk Sukerta Pandhawa (5 laki-laki semua). Dianjurkan ruwatan wayang purwa lakon Pandawa Moksa.',
      };
    }
    if (allP) {
      const match = DAFTAR_SUKERTA.find((s) => s.id === 'pandhavi')!;
      return {
        isSukerta: true,
        sukertaMatch: match,
        analisisAdat: 'Termasuk Sukerta Pandhavi (5 perempuan semua). Dianjurkan selamatan tumpeng robyong berkah agung.',
      };
    }
  }

  return {
    isSukerta: false,
    sukertaMatch: null,
    analisisAdat: 'Bukan merupakan kategori sukerta utama yang wajib diruwat besar. Cukup menjaga laku prihatin dan sedekah wetonan rutin.',
  };
}

// ----------------------------------------------------
// Modul Siklus Pawukon (30 Wuku Kitab Betaljemur Adammakna)
// ----------------------------------------------------
export function getWukuRangeForDate(dateStr: string): {
  startDate: string;
  endDate: string;
  dayIndexInWuku: number; // 0 (Ahad) s.d. 6 (Setu)
  dayName: string;
  wukuName: string;
  wukuIndex: number;
} {
  const { year, month, day } = parseDateComponents(dateStr);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = getDaysDiffFromAnchor(year, month, day);

  const hariIndex = ((diffDays % 7) + 7) % 7; // 0 = Ahad, 6 = Setu
  const daysInCycle = ((diffDays % 210) + 210) % 210;
  const wukuIndex = Math.floor(daysInCycle / 7); // 0 sampai 29
  const wukuName = DAFTAR_WUKU[wukuIndex];

  // Start date of this wuku is Ahad (subtract hariIndex days)
  const startDateObj = new Date(targetDate);
  startDateObj.setDate(targetDate.getDate() - hariIndex);

  // End date of this wuku is Setu (add 6 - hariIndex days)
  const endDateObj = new Date(targetDate);
  endDateObj.setDate(targetDate.getDate() + (6 - hariIndex));

  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatYMD = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  return {
    startDate: formatYMD(startDateObj),
    endDate: formatYMD(endDateObj),
    dayIndexInWuku: hariIndex,
    dayName: DAFTAR_HARI[hariIndex].nama,
    wukuName,
    wukuIndex: wukuIndex + 1,
  };
}

/**
 * Menghasilkan prediksi/ramalan harian berbasis Neptu dan Wuku hari ini.
 * Sifat: Murni INFORMATIF (Khazanah Etnosains Titen) - Tidak Wajib Dipercayai.
 */
export function getPrediksiHarianWeton(dateStr: string): PrediksiHarianWeton {
  const weton = hitungWetonLengkap(dateStr);
  const neptu = weton.neptuTotal;
  const pasaran = weton.pasaran;

  // Evaluasi Energi Neptu
  let kategoriNeptu = '';
  let suasana = '';
  let fokusRezeki = '';
  let aspekHubungan = '';

  if (neptu >= 7 && neptu <= 10) {
    kategoriNeptu = `Neptu Hening (${neptu})`;
    suasana = 'Suasana hari cenderung tenang dan mengundang perenungan. Waktu yang tepat untuk menyusun strategi, riset mendalam, dan mawas diri.';
    fokusRezeki = 'Cocok untuk merencanakan alokasi anggaran, menata pembukuan, dan menghemat pengeluaran yang tidak mendesak.';
    aspekHubungan = 'Jaga tutur kata dan hindari perdebatan kecil. Ketenangan hati dan kerendahan sikap menjadi kunci kedamaian.';
  } else if (neptu >= 11 && neptu <= 14) {
    kategoriNeptu = `Neptu Harmonis (${neptu})`;
    suasana = 'Energi hari bergerak seimbang dan dinamis. Terbuka banyak pintu silaturahmi, negosiasi hangat, dan kelancaran komunikasi.';
    fokusRezeki = 'Sangat potensial untuk menjalin kerjasama baru, promosi usaha, dan memperluas jaringan bisnis.';
    aspekHubungan = 'Sangat baik untuk diskusi kebersamaan keluarga, konsolidasi hajat, dan mempererat tali keakraban.';
  } else {
    kategoriNeptu = `Neptu Ekspansif (${neptu})`;
    suasana = 'Energi hari bergelora tinggi dengan daya dorong besar. Cocok untuk mengeksekusi keputusan penting dan langkah berani.';
    fokusRezeki = 'Peluang rezeki terbuka lebar dari arah tak terduga. Manfaatkan momentum keberanian berikhtiar secara jujur.';
    aspekHubungan = 'Menjadi pengayom dan pelindung bagi sesama. Pemimpin yang bijak selalu mendengarkan aspirasi rekannya.';
  }

  // Pesan Pasaran
  if (pasaran === 'Legi') {
    fokusRezeki += ' Pasaran Legi membawa energi bermanis kata dan kemudahan bertransaksi.';
  } else if (pasaran === 'Pahing') {
    suasana += ' Pasaran Pahing membakar semangat berjuang dan keberanian bertindak.';
  } else if (pasaran === 'Pon') {
    aspekHubungan += ' Pasaran Pon memperkuat wibawa pribadi dan aura kepemimpinan.';
  } else if (pasaran === 'Wage') {
    fokusRezeki += ' Pasaran Wage mengajarkan ketelitian, kehati-hatian, dan efisiensi anggaran.';
  } else if (pasaran === 'Kliwon') {
    suasana += ' Pasaran Kliwon memperkuat kepekaan intuisi batin dan kekhusyukan doa.';
  }

  // Wuku Nasihat
  const wukuNama = weton.wuku;
  const wukuIndex = weton.wukuIndex;
  const filosofiWuku = `Dinaungi Serat Pawukon Wuku ${wukuNama} (Ke-${wukuIndex} dari 30 Wuku). Membawa watak khas keselarasan alam semesta.`;
  const nasehatLuhur = `Tetap eling lan waspada, utamakan kejujuran dalam berikhtiar, serta perbanyak rasa syukur dan sedekah.`;

  // Deterministic Score
  const baseScore = ((neptu * 7 + wukuIndex * 11) % 31) + 68;
  const tingkatKeberuntungan = Math.min(98, Math.max(65, baseScore));

  const arahMap: Record<PasaranJawa, string> = {
    Legi: 'Timur (Arah Kemakmuran & Manis)',
    Pahing: 'Selatan (Arah Semangat & Rezeki)',
    Pon: 'Barat (Arah Wibawa & Keberkahan)',
    Wage: 'Utara (Arah Ketelitian & Rezeki)',
    Kliwon: 'Tengah / Segala Arah (Arah Ketenangan Doa)',
  };

  return {
    tanggalIso: dateStr,
    tanggalFormat: weton.tanggalMasehi,
    weton,
    energiNeptu: {
      kategoriNeptu,
      suasana,
      fokusRezeki,
      aspekHubungan,
    },
    pesanWuku: {
      wukuNama,
      wukuIndex,
      filosofiWuku,
      nasehatLuhur,
    },
    rekomendasiSikap: 'Gunakan prediksi harian ini sebagai wawasan kehati-hatian (eling lan waspada). Segala takdir dan keberkahan hakikatnya berada di tangan Tuhan Yang Maha Esa.',
    tingkatKeberuntungan,
    arahKeberuntungan: arahMap[pasaran] || 'Timur (Arah Berkah)',
  };
}


