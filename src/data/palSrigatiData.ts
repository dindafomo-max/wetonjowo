import { PalSrigatiPoint, HariJawa, PasaranJawa } from '../types/weton';

// Tabel Siklus Pal Srigati (Kitab Betaljemur Adammakna Bab Pal Srigati)
// Setiap neptu 7 s.d. 18 memiliki 12 titik usia 6 tahunan (Usia 0 s.d. 72 tahun)
export const PAL_SRIGATI_MAP: Record<number, number[]> = {
  7: [1, 2, 1, 3, 2, 4, 1, 5, 2, 3, 1, 2],
  8: [2, 1, 3, 2, 5, 1, 4, 2, 3, 1, 5, 2],
  9: [1, 3, 2, 4, 1, 5, 2, 6, 1, 4, 2, 3],
  10: [3, 2, 4, 1, 5, 2, 3, 1, 6, 2, 4, 1],
  11: [2, 4, 1, 5, 2, 6, 1, 3, 2, 5, 1, 4],
  12: [4, 1, 5, 2, 6, 1, 4, 2, 5, 1, 3, 2],
  13: [1, 5, 2, 6, 1, 4, 2, 5, 1, 6, 2, 4],
  14: [5, 2, 6, 1, 4, 2, 6, 1, 4, 2, 5, 1],
  15: [2, 6, 1, 4, 2, 5, 1, 6, 2, 4, 1, 5],
  16: [6, 1, 4, 2, 5, 1, 3, 2, 6, 1, 4, 2],
  17: [1, 4, 2, 5, 1, 6, 2, 4, 1, 5, 2, 6],
  18: [4, 2, 5, 1, 6, 2, 5, 1, 4, 2, 6, 1],
};

export const RENTANG_USIA_PAL_SRIGATI = [
  { min: 0, max: 6, label: '0 - 6 Thn' },
  { min: 6, max: 12, label: '6 - 12 Thn' },
  { min: 12, max: 18, label: '12 - 18 Thn' },
  { min: 18, max: 24, label: '18 - 24 Thn' },
  { min: 24, max: 30, label: '24 - 30 Thn' },
  { min: 30, max: 36, label: '30 - 36 Thn' },
  { min: 36, max: 42, label: '36 - 42 Thn' },
  { min: 42, max: 48, label: '42 - 48 Thn' },
  { min: 48, max: 54, label: '48 - 54 Thn' },
  { min: 54, max: 60, label: '54 - 60 Thn' },
  { min: 60, max: 66, label: '60 - 66 Thn' },
  { min: 66, max: 72, label: '66 - 72 Thn' },
];

export const SKOR_PAL_SRIGATI_INFO: Record<
  number,
  {
    kategori: PalSrigatiPoint['kategori'];
    makna: string;
    nasihatAdat: string;
    warna: string;
  }
> = {
  1: {
    kategori: 'Prihatin',
    makna: 'Masa ujian ekonomi atau fase prihatin. Arus rezeki cenderung menuntut kehati-hatian luar biasa.',
    nasihatAdat: 'Hindari spekulasi berisiko atau mengambil hutang konsumtif. Perbanyak tirakat, puasa weton, dan laku hemat.',
    warna: 'text-rose-700 bg-rose-50 border-rose-200',
  },
  2: {
    kategori: 'Sedang',
    makna: 'Rezeki taraf bersahaja/sedang. Kebutuhan pangan dan sandang pokok tercukupi dengan tenteram.',
    nasihatAdat: 'Kuatkan disiplin menabung, pelihara modal kerja yang ada, dan hindari gaya hidup berlebih-lebihan.',
    warna: 'text-amber-700 bg-amber-50 border-amber-200',
  },
  3: {
    kategori: 'Berkembang',
    makna: 'Tanda-tanda kemajuan mulai bersemi. Usaha mulai stabil dan peluang baru mulai berdatangan.',
    nasihatAdat: 'Saat tepat memperluas jaringan relasi, meningkatkan keahlian diri, dan berani mengambil langkah ekspansi terukur.',
    warna: 'text-blue-700 bg-blue-50 border-blue-200',
  },
  4: {
    kategori: 'Lancar',
    makna: 'Aliran rezeki deras, laba berlipat, dan usaha berjalan mulus tanpa hambatan berarti.',
    nasihatAdat: 'Sisihkan sebagian keuntungan untuk aset produktif (tanah, properti, atau emas batangan). Tetap rendah hati.',
    warna: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  5: {
    kategori: 'Makmur',
    makna: 'Masa kelimpahan rezeki, pengaruh wibawa meluas, dan kemakmuran keluarga terjamin tenteram.',
    nasihatAdat: 'Perbanyak sedekah tali asih kepada dhuafa dan kerabat agar rezeki senantiasa terjaga dari sengkala dengki.',
    warna: 'text-indigo-700 bg-indigo-50 border-indigo-200',
  },
  6: {
    kategori: 'Puncak Keemasan',
    makna: 'Puncaking Kamulyan (Puncak Keemasan Tertinggi). Kemasyhuran, rezeki agung, dan kemuliaan hidup.',
    nasihatAdat: 'Gunakan kemuliaan ini untuk mendirikan amal jariyah, mengayomi masyarakat luas, dan menjaga amanah leluhur.',
    warna: 'text-amber-900 bg-amber-100 border-amber-300 font-black',
  },
};

// Pancasuda Karakter Rezeki (Pembagian 7 dari Neptu Weton)
export const PANCASUDA_REZEKI_MAP: Record<
  number,
  {
    nama: string;
    makna: string;
    anjuranPekerjaan: string;
  }
> = {
  1: {
    nama: 'Wasesa Segara',
    makna: 'Berhati lapang seluas samudra, pemaaf, berwibawa tinggi, dan rezekinya senantiasa melimpah ruah.',
    anjuranPekerjaan: 'Bidang diplomasi, maritim, kepemimpinan publik, hukum, dan perdagangan skala besar.',
  },
  2: {
    nama: 'Tunggak Semi',
    makna: 'Bagaikan tunggul pohon yang selalu bersemi kembali. Jika jatuh segera bangkit, selalu mendapat jalan rezeki baru.',
    anjuranPekerjaan: 'Wirausaha mandiri, agribisnis, properti, investasi, dan perniagaan komoditas.',
  },
  3: {
    nama: 'Satria Wibawa',
    makna: 'Berjiwa ksatria, berwibawa agung, disenangi atasan dan rekan, serta selalu mendapat kemudahan hidup.',
    anjuranPekerjaan: 'Aparatur negara, perwira militer/polisi, manajer eksekutif, dan konsultan profesional.',
  },
  4: {
    nama: 'Sumur Sinaba',
    makna: 'Bagaikan sumur air jernih yang senantiasa didatangi orang. Menjadi rujukan ilmu dan sumber nasihat bijak.',
    anjuranPekerjaan: 'Guru, akademisi, rohaniwan, dokter, konsultan psikologi, peneliti, dan budayawan.',
  },
  5: {
    nama: 'Bumi Kapetak',
    makna: 'Pekerja keras tahan banting, ulet dalam keprihatinan, dan sukses berkat cucuran keringat kejujuran sendiri.',
    anjuranPekerjaan: 'Konstruksi, teknik sipil, pertanian, pertambangan, dan pengrajin karya tangan.',
  },
  6: {
    nama: 'Satria Wirang',
    makna: 'Kerap diuji dengan fitnah atau rasa malu di masa muda, namun jika bersabar teguh akan menuai kehormatan besar.',
    anjuranPekerjaan: 'Jurnalisme, advokasi kemanusiaan, seni sastra/kreatif, dan penggiat sosial.',
  },
  7: {
    nama: 'Lebu Katiup Angin',
    makna: 'Rezeki mudah didapat namun cepat berhamburan laksana debu ditiup angin jika tidak dikelola dengan ketat.',
    anjuranPekerjaan: 'Sektor perbankan, akuntansi, atau usaha kemitraan dengan sistem pengawasan ketat, wajib investasi tanah/emas.',
  },
};

// Pangarasan Watak (Pembagian 9 dari Neptu Weton)
export const PANGARASAN_MAP: Record<
  number,
  {
    nama: string;
    makna: string;
  }
> = {
  1: {
    nama: 'Dhandhang Kele',
    makna: 'Pendiam, ulet bekerja di balik layar, tahan menghadapi cercaan, dan tekun menyelesaikan amanah.',
  },
  2: {
    nama: 'Aras Tuding',
    makna: 'Sering ditunjuk memegang tanggung jawab, firasatnya tajam, berani berbicara lugas membela kebenaran.',
  },
  3: {
    nama: 'Aras Kembang',
    makna: 'Memiliki daya pikat alami yang mempesona (pesona asihan), disukai banyak kawan, dan mencintai keindahan.',
  },
  4: {
    nama: 'Lakuning Bintang',
    makna: 'Bagaikan lentera di malam sunyi. Menjadi penunjuk arah bagi orang yang bimbang, mandiri, dan suka merenung.',
  },
  5: {
    nama: 'Lakuning Rembulan',
    makna: 'Menyejukkan suasana gundah, perkataannya menentramkan hati, pandai mendamaikan pihak yang berselisih.',
  },
  6: {
    nama: 'Lakuning Srengenge',
    makna: 'Terang benderang benderang laksana surya, berwibawa, tegas, dan memberi energi semangat bagi sekitarnya.',
  },
  7: {
    nama: 'Lakuning Api',
    makna: 'Pemberani, cepat tanggap, pantang mundur jika merasa benar, pelindung tangguh bagi keluarganya.',
  },
  8: {
    nama: 'Lakuning Angin',
    makna: 'Luwes bergaul dengan siapapun tanpa membeda-bedakan, pandai menghibur, dan tangkas bernegosiasi.',
  },
  9: {
    nama: 'Lakuning Banyu',
    makna: 'Luwes mengalir mencari celah kebaikan, tenang namun menyimpan kekuatan besar, dan menyejukkan hati.',
  },
};

// Arah Rezeki Harian & Naga Dina (Sandang Pangan Papan)
export const ARAH_REZEKI_HARI_MAP: Record<
  HariJawa,
  {
    arahRezeki: string;
    nagaDinaPosisi: string;
    arahPantangan: string;
    jamBerkah: string[];
    elemen: string;
    mitigasi: string;
  }
> = {
  Ahad: {
    arahRezeki: 'Timur (Wetan) & Utara (Lor)',
    nagaDinaPosisi: 'Barat Laut (Kulon Lor)',
    arahPantangan: 'Barat Laut (Jangan memulai perjalanan ke arah ini)',
    jamBerkah: ['06:30 - 08:30 (Saat Berkah)', '11:00 - 13:00 (Saat Kamulyan)', '15:30 - 17:00 (Saat Slamet)'],
    elemen: 'Agni (Semangat Surya)',
    mitigasi: 'Awali ikhtiar pagi dengan menghadap ke Timur sambil beroda dan memohon kelapangan rezeki.',
  },
  Senen: {
    arahRezeki: 'Selatan (Kidul) & Barat (Kulon)',
    nagaDinaPosisi: 'Timur (Wetan)',
    arahPantangan: 'Timur (Hindari membuka lapak berhadapan persis ke Timur)',
    jamBerkah: ['07:00 - 09:00 (Saat Slamet)', '10:30 - 12:30 (Saat Rejeki)', '16:00 - 17:30 (Saat Rahayu)'],
    elemen: 'Tirta (Air Menyejukkan)',
    mitigasi: 'Pilihlah rute perniagaan menuju arah Selatan atau Barat untuk memetik berkah optimal.',
  },
  Selasa: {
    arahRezeki: 'Utara (Lor) & Timur (Wetan)',
    nagaDinaPosisi: 'Selatan (Kidul)',
    arahPantangan: 'Selatan (Hindari bepergian jauh ke arah Selatan)',
    jamBerkah: ['06:00 - 08:00 (Saat Kejayaan)', '13:00 - 15:00 (Saat Berkah)', '18:30 - 20:00 (Saat Ayem)'],
    elemen: 'Agni Dahana (Api Perjuangan)',
    mitigasi: 'Kuatkan tekad saat bernegosiasi ke arah Utara atau Timur, jaga emosi agar tidak cepat menyala.',
  },
  Rebo: {
    arahRezeki: 'Timur (Wetan) & Selatan (Kidul)',
    nagaDinaPosisi: 'Utara (Lor)',
    arahPantangan: 'Utara (Hindari transaksi spekulasi ke arah Utara)',
    jamBerkah: ['08:00 - 10:00 (Saat Rejeki Melimpah)', '11:30 - 13:30 (Saat Slamet)', '15:00 - 16:30 (Saat Berkah)'],
    elemen: 'Bantala (Bumi Subur)',
    mitigasi: 'Sangat baik untuk penandatanganan akad jual beli barang komoditas dengan menghadap Selatan.',
  },
  Kemis: {
    arahRezeki: 'Barat (Kulon) & Utara (Lor)',
    nagaDinaPosisi: 'Tenggara (Kidul Wetan)',
    arahPantangan: 'Tenggara (Pantang melamar pekerjaan ke arah Tenggara hari ini)',
    jamBerkah: ['06:30 - 08:30 (Saat Kamulyan)', '09:30 - 11:30 (Saat Berkah)', '14:00 - 16:00 (Saat Laba)'],
    elemen: 'Maruta (Angin Pembawa Kabar)',
    mitigasi: 'Perjalanan niaga ke arah Barat membawa kabar suka cita dan peluang keuntungan baru.',
  },
  Jemuwah: {
    arahRezeki: 'Barat (Kulon) & Selatan (Kidul)',
    nagaDinaPosisi: 'Timur Laut (Wetan Lor)',
    arahPantangan: 'Timur Laut (Hindari mengangkut barang pindahan ke Timur Laut)',
    jamBerkah: ['07:00 - 09:30 (Saat Berkah Agung)', '13:30 - 15:30 (Saat Rejeki Barokah)', '19:00 - 21:00 (Saat Slamet)'],
    elemen: 'Tirta Murni (Air Suci Berkah)',
    mitigasi: 'Dianjurkan bersedekah pagi hari sebelum memulai perniagaan ke arah Barat atau Selatan.',
  },
  Setu: {
    arahRezeki: 'Utara (Lor) & Selatan (Kidul)',
    nagaDinaPosisi: 'Barat Daya (Kulon Kidul)',
    arahPantangan: 'Barat Daya (Hindari memulai ekspedisi baru ke arah Barat Daya)',
    jamBerkah: ['08:30 - 10:30 (Saat Rahayu)', '11:00 - 13:00 (Saat Kemakmuran)', '16:00 - 17:30 (Saat Berkah)'],
    elemen: 'Bantala Watu (Keteguhan Batu Karang)',
    mitigasi: 'Fokuskan penagihan piutang dan evaluasi keuangan dengan orientasi arah Utara.',
  },
};
