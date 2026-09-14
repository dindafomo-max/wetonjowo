export type HariJawa = 'Ahad' | 'Senen' | 'Selasa' | 'Rebo' | 'Kemis' | 'Jemuwah' | 'Setu';
export type PasaranJawa = 'Legi' | 'Pahing' | 'Pon' | 'Wage' | 'Kliwon';

export interface HariDetail {
  nama: HariJawa;
  aliasMasehi: string;
  neptu: number;
}

export interface PasaranDetail {
  nama: PasaranJawa;
  neptu: number;
}

export interface WetonInfo {
  tanggalMasehi: string; // YYYY-MM-DD
  hari: HariJawa;
  hariMasehi: string;
  pasaran: PasaranJawa;
  neptuHari: number;
  neptuPasaran: number;
  neptuTotal: number;
  wuku: string;
  wukuIndex: number; // 1 - 30
  tahunJawa: string;
  namaTahun: string; // Alip, Ehe, Jimawal, Je, Dal, Be, Wawu, Jimakhir
  windu: string;
  lambangUnsur: string; // Api, Air, Angin, Tanah
  watakLahir: string;
  nagaDina: string; // Arah tempat naga hari
  kalaHari: string; // Arah larangan bepergian
  isTaliwangke: boolean;
  isSamparwangke: boolean;
  isDinaSangar: boolean;
  isNaasTanggal: boolean;
  isDinaKoas: boolean;
  keteranganAdat: string[];
}

export interface SalakiRabiResult {
  pria: {
    nama: string;
    weton: WetonInfo;
    anakKe: number;
  };
  wanita: {
    nama: string;
    weton: WetonInfo;
    anakKe: number;
  };
  totalNeptu: number;
  
  // Pembagian 8 (Kategori Utama Betaljemur Adammakna)
  kategori8: {
    sisa: number; // 1 - 8
    nama: 'Pegat' | 'Ratu' | 'Jodoh' | 'Topo' | 'Tinari' | 'Padu' | 'Sujanan' | 'Pesthi';
    makna: string;
    prediksi: string;
    rekomendasiMitigasi: string;
    tingkatKecocokan: number; // 1 - 100
    status: 'Sangat Baik' | 'Baik' | 'Cukup (Perlu Mitigasi)' | 'Perhatian Khusus';
  };

  // Pembagian 5 (Pancasuda Pernikahan)
  pancasuda5: {
    sisa: number;
    nama: 'Sri' | 'Lungguh' | 'Gedhong' | 'Lara' | 'Pati';
    makna: string;
  };

  // Pembagian 7 (Petung Sangarwaringin)
  petung7: {
    sisa: number;
    nama: string;
    makna: string;
  };

  // Analisis Urutan Kelahiran (Anak Ke-)
  analisisKelahiran: {
    isJipang: boolean; // Siji & Papat
    isLusan: boolean; // Telu & Pambarep (3 & 1)
    isBarepBarep: boolean; // 1 & 1
    isRagilRagil: boolean; // Bungsu & Bungsu
    namaPeringatan: string;
    uraian: string;
    mitigasiKultural: string;
  };

  ringkasanObjektif: string;
}

export interface RekomendasiHariNikah {
  tanggal: string; // YYYY-MM-DD
  hari: HariJawa;
  pasaran: PasaranJawa;
  neptuHariH: number;
  totalNeptuTigaan: number; // (Pria + Wanita + Hari H)
  pancasudaHari: {
    nama: string;
    makna: string;
  };
  sisaPembagian4: {
    nama: string;
    makna: string;
  };
  isAmanAdat: boolean;
  alasanLarangan: string[];
  skorBerkah: number; // 0 - 100
  saranWaktuIjab: string;
}

export interface BoyonganWismaResult {
  neptuKeluarga: number;
  tanggalPindah: string;
  wetonPindah: WetonInfo;
  totalNeptu: number;
  sisa4: number;
  kategori: 'Guru (Kerta)' | 'Ratu (Candi)' | 'Rogoh' | 'Sempoyong';
  uraian: string;
  saranMitigasi: string;
  waktuTerbaik: string;
  isPantangan?: boolean;
  pantanganDetail?: string;
}

export interface PranataMangsaInfo {
  nomor: number;
  nama: string;
  rentang: string;
  durasiHari: number;
  candra: string; // Perlambang puitis klasik
  artianCandra: string;
  keadaanAlam: string;
  pedomanAgrarisDanUsaha: string;
  penyakitMusiman: string;
}

export interface FirasatKedutan {
  id: string;
  lokasi: string;
  bagianTubuh: 'Kepala & Wajah' | 'Mata & Telinga' | 'Mulut & Leher' | 'Tubuh & Dada' | 'Tangan & Lengan' | 'Kaki & Telapak';
  firasat: string;
  maknaPositif: boolean;
  penjelasanEtnis: string;
}

export interface PertandaAlam {
  id: string;
  kategori: 'Lintang Kemukus (Komet)' | 'Grahana (Gerhana)' | 'Lindhu (Gempa Bumi)' | 'Suara Hewan & Burung';
  kondisi: string;
  waktuAtauArah: string;
  maknaKlasik: string;
  penjelasanEtnosainsModern: string;
}

export interface TabView {
  id: 'beranda' | 'kalender' | 'nikah' | 'jodoh' | 'wuku' | 'nagadina' | 'islam' | 'wirid' | 'hajat' | 'pantangan' | 'firasat' | 'rejeki' | 'jayabaya' | 'ruwatan' | 'analitik' | 'gas';
  label: string;
  iconName: string;
}

// ----------------------------------------------------
// Modul Naga Dina & Arah Rezeki (Betaljemur Adammakna)
// ----------------------------------------------------
export type ArahMataAngin =
  | 'Utara (Lor)'
  | 'Timur Laut (Wetan Lor)'
  | 'Timur (Wetan)'
  | 'Tenggara (Kidul Wetan)'
  | 'Selatan (Kidul)'
  | 'Barat Daya (Kulon Kidul)'
  | 'Barat (Kulon)'
  | 'Barat Laut (Kulon Lor)'
  | 'Pusat (Madya)';

export type StatusArah = 'rezeki-utama' | 'rezeki-pangan' | 'rezeki-gedhong' | 'netral' | 'waspada' | 'pantangan-naga';

export interface ArahKompasDetail {
  arah: ArahMataAngin;
  singkatan: 'U' | 'TL' | 'T' | 'TG' | 'S' | 'BD' | 'B' | 'BL' | 'PST';
  derajat: number; // 0, 45, 90, 135, 180, 225, 270, 315
  status: StatusArah;
  labelStatus: string;
  skorBerkah: number; // 0 - 100
  keterangan: string;
  isNagaHead: boolean;
  isNagaTail: boolean;
  isNagaBack: boolean;
}

export interface NagaDinaInfo {
  hari: HariJawa;
  kepalaNaga: ArahMataAngin;
  menghadapKe: ArahMataAngin;
  punggungNaga: ArahMataAngin;
  ekorNaga: ArahMataAngin;
  lambungNaga: ArahMataAngin;
  arahSandang: ArahMataAngin;
  arahPangan: ArahMataAngin;
  arahGedhong: ArahMataAngin;
  arahJaya: ArahMataAngin;
  pantanganUtama: string;
  kaidahLaku: string;
  filosofi: string;
}

export interface NagaPasaranInfo {
  pasaran: PasaranJawa;
  neptu: number;
  arahDuduk: ArahMataAngin;
  unsur: string;
  warnaSimbol: string;
  rasaSimbol: string;
  maknaUsaha: string;
}

export interface PetungArahLengkap {
  tanggalMasehi: string;
  weton: WetonInfo;
  nagaDina: NagaDinaInfo;
  nagaPasaran: NagaPasaranInfo;
  kompas8Arah: ArahKompasDetail[];
  arahTerbaikHajat: {
    usahaDagang: { arah: string; tips: string };
    melamarKerja: { arah: string; tips: string };
    bepergianJauh: { arah: string; tips: string };
    negosiasiPiutang: { arah: string; tips: string };
    investasiProperti: { arah: string; tips: string };
  };
  jamBerkahHariIni: {
    waktu: string;
    jam: string;
    kategori: 'Saat Berkah/Rejeki' | 'Saat Kamulyan' | 'Saat Slamet' | 'Saat Pangkalan (Waspada)';
    keterangan: string;
    rekomendasiAktivitas: string;
  }[];
  etikaBerangkat: {
    langkahKakiPertama: 'Kaki Kanan' | 'Kaki Kiri';
    alasanNeptu: string;
    doaKeselamatan: string;
    artianDoa: string;
    nasihatTawakal: string;
  };
}

// ----------------------------------------------------
// Modul Siklus Pawukon (30 Wuku Kitab Betaljemur Adammakna)
// ----------------------------------------------------
export interface WukuDetailInfo {
  nomor: number; // 1 - 30
  nama: string;
  aksaraJawa: string;
  tokohAsal: string;
  dewa: {
    nama: string;
    gelar: string;
    watakDewa: string;
    dununge: string;
  };
  pohon: {
    nama: string;
    makna: string;
  };
  burung: {
    nama: string;
    makna: string;
  };
  gedhong: {
    posisi: string;
    makna: string;
  };
  senjata: {
    nama: string;
    makna: string;
  };
  umbulUmbul: {
    posisi: string;
    makna: string;
  };
  candran: {
    teksJawa: string;
    artian: string;
    maknaFilosofis: string;
  };
  watakLahir: {
    sifatPositif: string[];
    sifatWaspada: string[];
    ringkasanWatak: string;
    batiniah: string;
  };
  potensiRezekiDanKarir: {
    bidangProfesi: string[];
    gayaKerja: string;
    nasihatRezeki: string;
    levelRezeki: 'Lancar & Berkah' | 'Melimpah & Dermawan' | 'Ulet & Mandiri' | 'Prihatin Menuju Makmur';
  };
  jodohDanAsmara: {
    karakterPasanganCocok: string;
    nasihatPernikahan: string;
    wukuSerasi: string[];
  };
  pantanganDanNaas: {
    taliwangke: { hari: string; pasaran: string; keterangan: string };
    samparwangke: { hari: string; pasaran: string; keterangan: string };
    kalaWuku: string;
    pantanganPerilaku: string;
  };
  sedekahMitigasi: {
    sesajiAdat: string[];
    doaAtauLaku: string;
    keteranganSlametan: string;
  };
}

// ----------------------------------------------------
// Modul Rezeki & Karir (Kitab Betaljemur Adammakna)
// ----------------------------------------------------
export interface PalSrigatiPoint {
  rentangUsia: string; // Misal: "0 - 6 Tahun"
  usiaMin: number;
  usiaMax: number;
  skor: number; // 1 s.d. 6
  kategori: 'Prihatin' | 'Sedang' | 'Berkembang' | 'Lancar' | 'Makmur' | 'Puncak Keemasan';
  makna: string;
  nasihatAdat: string;
}

export interface PalSrigatiResult {
  weton: WetonInfo;
  skorRataRata: number;
  puncakUsia: string[];
  points: PalSrigatiPoint[];
  pancasudaRezeki: {
    sisa: number;
    nama: string;
    makna: string;
    anjuranPekerjaan: string;
  };
  pangarasan: {
    sisa: number;
    nama: string;
    makna: string;
  };
  bidangUsahaCocok: string[];
}

export interface ArahRezekiHarian {
  hari: HariJawa;
  pasaran: PasaranJawa;
  arahRezekiUtama: string; // Misal: "Utara (Lor) & Timur (Wetan)"
  arahPantanganKala: string; // Misal: "Tenggara (Kidul Wetan)"
  posisiNagaDina: string;
  jamBaikKeberuntungan: string[]; // Misal: ["06:30 - 08:30 (Saat Berkah)", ...]
  unsurHari: string;
  mitigasiAdat: string;
}

// ----------------------------------------------------
// Modul Jangka Jayabaya & Watak Satriya
// ----------------------------------------------------
export interface SatriyaJayabayaInfo {
  nomor: number;
  nama: string;
  gelarSanskerta: string;
  neptuCocok: number[];
  karakterUtama: string;
  gayaKepemimpinan: string;
  korelasiPeradaban: string;
  nasihatLuhur: string;
}

export interface ZamanJayabayaEra {
  zaman: string;
  periode: string;
  kondisiPeradaban: string;
  tandaTandaZaman: string[];
  lakuElingLanWaspada: string;
}

// ----------------------------------------------------
// Modul Ruwatan Sukerta & Mitigasi (Kitab Lukmanakim)
// ----------------------------------------------------
export interface SukertaDefinisi {
  id: string;
  nama: string;
  sebutanJawa: string;
  deskripsiKelahiran: string;
  kategori: 'Tunggal' | 'Sepasang' | 'Tiga Saudara' | 'Empat Saudara' | 'Lima (Pandhawa)' | 'Khusus/Unik';
  ancamanSengkala: string;
  tataCaraRuwatan: string;
  ubarampeSesaji: string[];
}

export interface WetonPantanganItem {
  id: string;
  hari: HariJawa;
  pasaran: PasaranJawa;
  kategori: 'Geblak Orang Tua' | 'Hari Naas Pribadi' | 'Pantangan Keluarga' | 'Dina Sengkala' | 'Lainnya';
  keterangan: string;
  aktif: boolean;
}

export type SaasPlanId = 'gratis' | 'pro' | 'vip';

export interface UserProfile {
  email: string;
  nama: string;
  avatarUrl: string;
  plan: SaasPlanId;
  tanggalGabung: string;
  isDonatur: boolean;
  totalDonasi?: number;
  role?: 'admin' | 'user';
  isAdmin?: boolean;
}

export interface SaasPlan {
  id: SaasPlanId;
  nama: string;
  gelar: string;
  harga: string;
  periode: string;
  deskripsi: string;
  fitur: string[];
  isPopular?: boolean;
}

export interface DonationOption {
  nominal: number;
  label: string;
  deskripsi: string;
}

export interface PrediksiHarianWeton {
  tanggalIso: string;
  tanggalFormat: string;
  weton: WetonInfo;
  energiNeptu: {
    kategoriNeptu: string;
    suasana: string;
    fokusRezeki: string;
    aspekHubungan: string;
  };
  pesanWuku: {
    wukuNama: string;
    wukuIndex: number;
    filosofiWuku: string;
    nasehatLuhur: string;
  };
  rekomendasiSikap: string;
  tingkatKeberuntungan: number;
  arahKeberuntungan: string;
}
