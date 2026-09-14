import {
  HariJawa,
  PasaranJawa,
  NagaDinaInfo,
  NagaPasaranInfo,
  ArahKompasDetail,
  PetungArahLengkap,
  WetonInfo,
  ArahMataAngin
} from '../types/weton';

// ----------------------------------------------------------------------
// DATA 7 NAGA DINA (Kitab Betaljemur Adammakna Bab Naga Dina)
// ----------------------------------------------------------------------
export const DAFTAR_7_NAGA_DINA: Record<HariJawa, NagaDinaInfo> = {
  Ahad: {
    hari: 'Ahad',
    kepalaNaga: 'Barat Laut (Kulon Lor)',
    menghadapKe: 'Tenggara (Kidul Wetan)',
    punggungNaga: 'Timur Laut (Wetan Lor)',
    ekorNaga: 'Tenggara (Kidul Wetan)',
    lambungNaga: 'Barat Daya (Kulon Kidul)',
    arahSandang: 'Timur (Wetan)',
    arahPangan: 'Utara (Lor)',
    arahGedhong: 'Barat (Kulon)',
    arahJaya: 'Timur Laut (Wetan Lor)',
    pantanganUtama: 'Barat Laut (Kulon Lor) & Tenggara (Kidul Wetan)',
    kaidahLaku: 'Niti geger naga (berangkat mengarah ke Timur atau Utara). Jangan menantang arah Barat Laut tempat kepala naga bersarang.',
    filosofi: 'Dina Ahad dina Surya/Matahari. Rezeki memancar dari timur fajar menyinari utara kemakmuran.'
  },
  Senen: {
    hari: 'Senen',
    kepalaNaga: 'Timur (Wetan)',
    menghadapKe: 'Barat (Kulon)',
    punggungNaga: 'Selatan (Kidul)',
    ekorNaga: 'Barat (Kulon)',
    lambungNaga: 'Utara (Lor)',
    arahSandang: 'Selatan (Kidul)',
    arahPangan: 'Barat (Kulon)',
    arahGedhong: 'Utara (Lor)',
    arahJaya: 'Barat Daya (Kulon Kidul)',
    pantanganUtama: 'Timur (Wetan)',
    kaidahLaku: 'Hindari membuka lapak berhadapan persis ke Timur atau melangkah pertama ke Timur. Arahkan haluan ke Selatan atau Barat.',
    filosofi: 'Dina Senen dina Candra/Rembulan. Menyejukkan rezeki di selatan dan barat ketenangan batin.'
  },
  Selasa: {
    hari: 'Selasa',
    kepalaNaga: 'Selatan (Kidul)',
    menghadapKe: 'Utara (Lor)',
    punggungNaga: 'Barat (Kulon)',
    ekorNaga: 'Utara (Lor)',
    lambungNaga: 'Timur (Wetan)',
    arahSandang: 'Utara (Lor)',
    arahPangan: 'Timur (Wetan)',
    arahGedhong: 'Selatan (Kidul)',
    arahJaya: 'Barat Laut (Kulon Lor)',
    pantanganUtama: 'Selatan (Kidul)',
    kaidahLaku: 'Pantang bepergian atau memulai akad niaga besar ke arah Selatan. Berangkatlah menuju Utara atau Timur.',
    filosofi: 'Dina Selasa dina Anggara/Api. Semangat membara menjemput rezeki sandang di utara dan pangan di timur.'
  },
  Rebo: {
    hari: 'Rebo',
    kepalaNaga: 'Utara (Lor)',
    menghadapKe: 'Selatan (Kidul)',
    punggungNaga: 'Timur (Wetan)',
    ekorNaga: 'Selatan (Kidul)',
    lambungNaga: 'Barat (Kulon)',
    arahSandang: 'Timur (Wetan)',
    arahPangan: 'Selatan (Kidul)',
    arahGedhong: 'Barat (Kulon)',
    arahJaya: 'Tenggara (Kidul Wetan)',
    pantanganUtama: 'Utara (Lor)',
    kaidahLaku: 'Jangan menentang arah Utara. Niti geger naga dengan mengarahkan ikhtiar dagang ke Timur atau Selatan.',
    filosofi: 'Dina Rebo dina Budha/Bumi. Tanah subur menumbuhkan pangan di selatan dan kemuliaan sandang di timur.'
  },
  Kemis: {
    hari: 'Kemis',
    kepalaNaga: 'Tenggara (Kidul Wetan)',
    menghadapKe: 'Barat Laut (Kulon Lor)',
    punggungNaga: 'Barat Daya (Kulon Kidul)',
    ekorNaga: 'Barat Laut (Kulon Lor)',
    lambungNaga: 'Timur Laut (Wetan Lor)',
    arahSandang: 'Barat (Kulon)',
    arahPangan: 'Utara (Lor)',
    arahGedhong: 'Timur (Wetan)',
    arahJaya: 'Barat (Kulon)',
    pantanganUtama: 'Tenggara (Kidul Wetan)',
    kaidahLaku: 'Pantang melamar pekerjaan atau menagih piutang ke Tenggara. Arahkan ikhtiar ke Barat atau Utara.',
    filosofi: 'Dina Kemis dina Resi/Guru Kebijaksanaan. Membawa berkah intelektual dan kelancaran niaga di barat dan utara.'
  },
  Jemuwah: {
    hari: 'Jemuwah',
    kepalaNaga: 'Timur Laut (Wetan Lor)',
    menghadapKe: 'Barat Daya (Kulon Kidul)',
    punggungNaga: 'Barat Laut (Kulon Lor)',
    ekorNaga: 'Barat Daya (Kulon Kidul)',
    lambungNaga: 'Tenggara (Kidul Wetan)',
    arahSandang: 'Barat (Kulon)',
    arahPangan: 'Selatan (Kidul)',
    arahGedhong: 'Utara (Lor)',
    arahJaya: 'Selatan (Kidul)',
    pantanganUtama: 'Timur Laut (Wetan Lor)',
    kaidahLaku: 'Hindari mengangkut barang pindahan atau memulai perjalanan ke Timur Laut. Sangat berkah melangkah ke Barat atau Selatan.',
    filosofi: 'Dina Jemuwah dina Sukra/Air Suci. Mengalirkan rezeki berkah barokah melimpah ruah di barat dan selatan.'
  },
  Setu: {
    hari: 'Setu',
    kepalaNaga: 'Barat Daya (Kulon Kidul)',
    menghadapKe: 'Timur Laut (Wetan Lor)',
    punggungNaga: 'Tenggara (Kidul Wetan)',
    ekorNaga: 'Timur Laut (Wetan Lor)',
    lambungNaga: 'Barat Laut (Kulon Lor)',
    arahSandang: 'Utara (Lor)',
    arahPangan: 'Selatan (Kidul)',
    arahGedhong: 'Timur (Wetan)',
    arahJaya: 'Utara (Lor)',
    pantanganUtama: 'Barat Daya (Kulon Kidul)',
    kaidahLaku: 'Hindari ekspedisi atau transaksi berisiko ke Barat Daya. Sandang di Utara dan pangan di Selatan menjadi lumbung kemakmuran.',
    filosofi: 'Dina Setu dina Tumpak/Batu Karang. Keteguhan dan kestabilan pondasi rezeki jangka panjang.'
  }
};

// ----------------------------------------------------------------------
// DATA 5 NAGA PASARAN (Pancawarna Pasaran Jawa)
// ----------------------------------------------------------------------
export const DAFTAR_5_NAGA_PASARAN: Record<PasaranJawa, NagaPasaranInfo> = {
  Legi: {
    pasaran: 'Legi',
    neptu: 5,
    arahDuduk: 'Timur (Wetan)',
    unsur: 'Kayu / Hawa Murni',
    warnaSimbol: 'Putih (Pethak)',
    rasaSimbol: 'Manis (Legi)',
    maknaUsaha: 'Sangat baik untuk perniagaan sandang, kain, jasa komunikasi, pendidikan, dan karya seni.'
  },
  Pahing: {
    pasaran: 'Pahing',
    neptu: 9,
    arahDuduk: 'Selatan (Kidul)',
    unsur: 'Geni / Api Semangat',
    warnaSimbol: 'Merah (Abrit)',
    rasaSimbol: 'Pahit (Pait)',
    maknaUsaha: 'Sangat cocok untuk usaha kuliner panas, logam/mesin, kepemimpinan, hukum, dan perdagangan komoditas bernilai tinggi.'
  },
  Pon: {
    pasaran: 'Pon',
    neptu: 7,
    arahDuduk: 'Barat (Kulon)',
    unsur: 'Kuningan / Logam Mulia',
    warnaSimbol: 'Kuning (Jene)',
    rasaSimbol: 'Gurih (Gurih)',
    maknaUsaha: 'Mendatangkan kemakmuran dalam bidang properti, simpan pinjam emas/keuangan, agribisnis, dan kerajinan perhiasan.'
  },
  Wage: {
    pasaran: 'Wage',
    neptu: 4,
    arahDuduk: 'Utara (Lor)',
    unsur: 'Banyu / Air Kehidupan',
    warnaSimbol: 'Hitam (Cemeng)',
    rasaSimbol: 'Asin (Asin)',
    maknaUsaha: 'Membuka kelancaran usaha perikanan, minuman, transportasi/logistik, sewa gudang, dan hasil bumi basah.'
  },
  Kliwon: {
    pasaran: 'Kliwon',
    neptu: 8,
    arahDuduk: 'Pusat (Madya)',
    unsur: 'Bumi / Pancer Jagat',
    warnaSimbol: 'Panca Warna (Warna-warni Harmoni)',
    rasaSimbol: 'Tawar (Anyep Tenteram)',
    maknaUsaha: 'Pusat kestabilan segala bidang usaha, pembukaan cabang baru, kemitraan strategis, dan investasi jangka panjang.'
  }
};

// ----------------------------------------------------------------------
// DATA 8 ARAH MATA ANGIN DASAR
// ----------------------------------------------------------------------
export const ARAH_MATA_ANGIN_LIST: {
  arah: ArahMataAngin;
  singkatan: 'U' | 'TL' | 'T' | 'TG' | 'S' | 'BD' | 'B' | 'BL';
  derajat: number;
}[] = [
  { arah: 'Utara (Lor)', singkatan: 'U', derajat: 0 },
  { arah: 'Timur Laut (Wetan Lor)', singkatan: 'TL', derajat: 45 },
  { arah: 'Timur (Wetan)', singkatan: 'T', derajat: 90 },
  { arah: 'Tenggara (Kidul Wetan)', singkatan: 'TG', derajat: 135 },
  { arah: 'Selatan (Kidul)', singkatan: 'S', derajat: 180 },
  { arah: 'Barat Daya (Kulon Kidul)', singkatan: 'BD', derajat: 225 },
  { arah: 'Barat (Kulon)', singkatan: 'B', derajat: 270 },
  { arah: 'Barat Laut (Kulon Lor)', singkatan: 'BL', derajat: 315 },
];

// ----------------------------------------------------------------------
// TABEL JAM BERKAH / SAAT 5 HARIAN (Betaljemur Adammakna)
// ----------------------------------------------------------------------
export const SAAT_BERKAH_HARIAN: Record<
  HariJawa,
  {
    waktu: string;
    jam: string;
    kategori: 'Saat Berkah/Rejeki' | 'Saat Kamulyan' | 'Saat Slamet' | 'Saat Pangkalan (Waspada)';
    keterangan: string;
    rekomendasiAktivitas: string;
  }[]
> = {
  Ahad: [
    { waktu: 'Pagi Awal (Esuk)', jam: '06:00 - 08:30', kategori: 'Saat Berkah/Rejeki', keterangan: 'Saat pembuka gerbang rezeki fajar', rekomendasiAktivitas: 'Membuka toko, transfer modal, sowan silaturahmi' },
    { waktu: 'Pagi Menjelang Siang', jam: '08:30 - 11:00', kategori: 'Saat Slamet', keterangan: 'Waktu keselamatan dan kelancaran', rekomendasiAktivitas: 'Memulai perjalanan jauh, kirim paket niaga' },
    { waktu: 'Siang (Tengange)', jam: '11:00 - 13:30', kategori: 'Saat Kamulyan', keterangan: 'Masa puncak wibawa dan karisma', rekomendasiAktivitas: 'Wawancara kerja, presentasi bisnis, tanda tangan kontrak' },
    { waktu: 'Sore (Lingsir Kulon)', jam: '13:30 - 16:00', kategori: 'Saat Pangkalan (Waspada)', keterangan: 'Awas terjadi selisih paham', rekomendasiAktivitas: 'Fokus administrasi internal, hindari transaksi spekulatif' },
    { waktu: 'Petang (Surup)', jam: '16:00 - 18:00', kategori: 'Saat Berkah/Rejeki', keterangan: 'Penutupan hari dengan laba berkah', rekomendasiAktivitas: 'Tutup buku kas harian, sedekah syukur' }
  ],
  Senen: [
    { waktu: 'Pagi Awal (Esuk)', jam: '06:00 - 08:30', kategori: 'Saat Slamet', keterangan: 'Keselamatan jiwa dan raga', rekomendasiAktivitas: 'Berangkat kerja, doa awal pekan' },
    { waktu: 'Pagi Menjelang Siang', jam: '08:30 - 11:00', kategori: 'Saat Berkah/Rejeki', keterangan: 'Aliran rezeki deras masuk', rekomendasiAktivitas: 'Melayani pembeli pertama, follow-up prospek klien' },
    { waktu: 'Siang (Tengange)', jam: '11:00 - 13:30', kategori: 'Saat Pangkalan (Waspada)', keterangan: 'Hawanya panas memicu emosi', rekomendasiAktivitas: 'Istirahat siang, tenangkan pikiran' },
    { waktu: 'Sore (Lingsir Kulon)', jam: '13:30 - 16:00', kategori: 'Saat Kamulyan', keterangan: 'Kejayaan dan reputasi unggul', rekomendasiAktivitas: 'Rapat koordinasi, promosi produk baru' },
    { waktu: 'Petang (Surup)', jam: '16:00 - 18:00', kategori: 'Saat Slamet', keterangan: 'Pulang membawa ketenteraman', rekomendasiAktivitas: 'Menikmati waktu bersama keluarga' }
  ],
  Selasa: [
    { waktu: 'Pagi Awal (Esuk)', jam: '06:00 - 08:30', kategori: 'Saat Kamulyan', keterangan: 'Karisma pemimpin memancar kuat', rekomendasiAktivitas: 'Negosiasi proyek besar, ujian seleksi' },
    { waktu: 'Pagi Menjelang Siang', jam: '08:30 - 11:00', kategori: 'Saat Pangkalan (Waspada)', keterangan: 'Waspada penipuan atau kekeliruan hitung', rekomendasiAktivitas: 'Cek ulang faktur dan bukti transfer' },
    { waktu: 'Siang (Tengange)', jam: '11:00 - 13:30', kategori: 'Saat Berkah/Rejeki', keterangan: 'Keberuntungan rezeki tak terduga', rekomendasiAktivitas: 'Menerima pesanan, akad jual beli' },
    { waktu: 'Sore (Lingsir Kulon)', jam: '13:30 - 16:00', kategori: 'Saat Slamet', keterangan: 'Keselamatan perjalanan pulang', rekomendasiAktivitas: 'Pengiriman barang, perjalanan darat' },
    { waktu: 'Petang (Surup)', jam: '16:00 - 18:00', kategori: 'Saat Berkah/Rejeki', keterangan: 'Ketenangan batin dan keluarga', rekomendasiAktivitas: 'Doa penutup hari' }
  ],
  Rebo: [
    { waktu: 'Pagi Awal (Esuk)', jam: '06:00 - 08:30', kategori: 'Saat Pangkalan (Waspada)', keterangan: 'Hindari terburu-buru', rekomendasiAktivitas: 'Persiapan matang, sarapan berkah' },
    { waktu: 'Pagi Menjelang Siang', jam: '08:30 - 11:00', kategori: 'Saat Kamulyan', keterangan: 'Pintu kehormatan terbuka lebar', rekomendasiAktivitas: 'Menemui tokoh penting / atasan' },
    { waktu: 'Siang (Tengange)', jam: '11:00 - 13:30', kategori: 'Saat Slamet', keterangan: 'Kelancaran segala urusan', rekomendasiAktivitas: 'Makan siang bisnis, belanja bahan baku' },
    { waktu: 'Sore (Lingsir Kulon)', jam: '13:30 - 16:00', kategori: 'Saat Berkah/Rejeki', keterangan: 'Laba berlipat dari perniagaan', rekomendasiAktivitas: 'Closing penjualan, eksekusi investasi' },
    { waktu: 'Petang (Surup)', jam: '16:00 - 18:00', kategori: 'Saat Slamet', keterangan: 'Kesejukan hati dan keluarga', rekomendasiAktivitas: 'Istirahat sore, ibadah' }
  ],
  Kemis: [
    { waktu: 'Pagi Awal (Esuk)', jam: '06:00 - 08:30', kategori: 'Saat Berkah/Rejeki', keterangan: 'Rezeki ilmu dan nafkah berlimpah', rekomendasiAktivitas: 'Mulai belajar hal baru, buka usaha' },
    { waktu: 'Pagi Menjelang Siang', jam: '08:30 - 11:00', kategori: 'Saat Slamet', keterangan: 'Terhindar dari marabahaya', rekomendasiAktivitas: 'Perjalanan dinas, survei lokasi usaha' },
    { waktu: 'Siang (Tengange)', jam: '11:00 - 13:30', kategori: 'Saat Kamulyan', keterangan: 'Pengakuan atas jasa dan karya', rekomendasiAktivitas: 'Pengajuan proposal, lobi kerjasama' },
    { waktu: 'Sore (Lingsir Kulon)', jam: '13:30 - 16:00', kategori: 'Saat Berkah/Rejeki', keterangan: 'Rezeki petang berlimpah ruah', rekomendasiAktivitas: 'Penerimaan dana, penagihan piutang' },
    { waktu: 'Petang (Surup)', jam: '16:00 - 18:00', kategori: 'Saat Pangkalan (Waspada)', keterangan: 'Awas lelah fisik mengaburkan fokus', rekomendasiAktivitas: 'Hindari mengemudi saat mengantuk' }
  ],
  Jemuwah: [
    { waktu: 'Pagi Awal (Esuk)', jam: '06:00 - 08:30', kategori: 'Saat Kamulyan', keterangan: 'Berkah agung hari penghulu hari', rekomendasiAktivitas: 'Sedekah subuh, doa hajat besar' },
    { waktu: 'Pagi Menjelang Siang', jam: '08:30 - 11:00', kategori: 'Saat Berkah/Rejeki', keterangan: 'Rezeki berkah berlipat ganda', rekomendasiAktivitas: 'Jual beli komoditas, bagi hasil usaha' },
    { waktu: 'Siang (Tengange)', jam: '11:00 - 13:30', kategori: 'Saat Slamet', keterangan: 'Puncak ketenteraman batiniah', rekomendasiAktivitas: 'Ibadah Jumat, silaturahmi keluarga' },
    { waktu: 'Sore (Lingsir Kulon)', jam: '13:30 - 16:00', kategori: 'Saat Berkah/Rejeki', keterangan: 'Panen hasil kerja keras sepekan', rekomendasiAktivitas: 'Evaluasi mingguan, transaksi aman' },
    { waktu: 'Petang (Surup)', jam: '16:00 - 18:00', kategori: 'Saat Slamet', keterangan: 'Ketenangan malam yang teduh', rekomendasiAktivitas: 'Malam berkumpul dengan keluarga' }
  ],
  Setu: [
    { waktu: 'Pagi Awal (Esuk)', jam: '06:00 - 08:30', kategori: 'Saat Slamet', keterangan: 'Kekuatan pondasi yang kokoh', rekomendasiAktivitas: 'Merawat aset rumah/toko, olahraga' },
    { waktu: 'Pagi Menjelang Siang', jam: '08:30 - 11:00', kategori: 'Saat Kamulyan', keterangan: 'Wibawa dan keteguhan prinsip', rekomendasiAktivitas: 'Pernikahan, lamaran, syukuran keluarga' },
    { waktu: 'Siang (Tengange)', jam: '11:00 - 13:30', kategori: 'Saat Berkah/Rejeki', keterangan: 'Laba perniagaan akhir pekan', rekomendasiAktivitas: 'Perniagaan ritel, pariwisata, kuliner' },
    { waktu: 'Sore (Lingsir Kulon)', jam: '13:30 - 16:00', kategori: 'Saat Pangkalan (Waspada)', keterangan: 'Awas pemborosan tanpa rencana', rekomendasiAktivitas: 'Kendalikan pengeluaran konsumtif' },
    { waktu: 'Petang (Surup)', jam: '16:00 - 18:00', kategori: 'Saat Berkah/Rejeki', keterangan: 'Kegembiraan bersama handai tolan', rekomendasiAktivitas: 'Silaturahmi santai di akhir pekan' }
  ]
};

// ----------------------------------------------------------------------
// FUNGSI KOMPUTASI UTAMA NAGA DINA & ARAH REJEKI LENGKAP
// ----------------------------------------------------------------------
export function hitungPetungArahLengkap(weton: WetonInfo): PetungArahLengkap {
  const nagaDina = DAFTAR_7_NAGA_DINA[weton.hari] || DAFTAR_7_NAGA_DINA['Ahad'];
  const nagaPasaran = DAFTAR_5_NAGA_PASARAN[weton.pasaran] || DAFTAR_5_NAGA_PASARAN['Legi'];

  // Hitung status untuk ke-8 arah mata angin
  const kompas8Arah: ArahKompasDetail[] = ARAH_MATA_ANGIN_LIST.map((item) => {
    const isHead = nagaDina.kepalaNaga.includes(item.singkatan === 'U' ? 'Utara' : item.singkatan === 'S' ? 'Selatan' : item.singkatan === 'T' ? 'Timur' : item.singkatan === 'B' ? 'Barat' : item.arah.split(' ')[0]);
    const isNagaHeadExact = nagaDina.pantanganUtama.includes(item.arah.split(' ')[0]);
    const isTail = nagaDina.ekorNaga.includes(item.arah.split(' ')[0]);
    const isBack = nagaDina.punggungNaga.includes(item.arah.split(' ')[0]);

    const isSandang = nagaDina.arahSandang.includes(item.arah.split(' ')[0]);
    const isPangan = nagaDina.arahPangan.includes(item.arah.split(' ')[0]);
    const isGedhong = nagaDina.arahGedhong.includes(item.arah.split(' ')[0]);
    const isPasaranDominan = nagaPasaran.arahDuduk.includes(item.arah.split(' ')[0]);

    let status: ArahKompasDetail['status'] = 'netral';
    let labelStatus = 'Arah Netral (Cukup Baik)';
    let skorBerkah = 65;
    let keterangan = 'Arah yang stabil untuk aktivitas harian umum.';

    if (isNagaHeadExact) {
      status = 'pantangan-naga';
      labelStatus = 'Cangkem Naga (Pantangan Mutlak)';
      skorBerkah = 15;
      keterangan = 'Posisi kepala naga hari. Hindari beradu muka langsung saat berangkat ikhtiar besar.';
    } else if (isSandang && isPasaranDominan) {
      status = 'rezeki-utama';
      labelStatus = 'Arah Rezeki Utama & Sandang';
      skorBerkah = 98;
      keterangan = 'Puncak pertemuan neptu hari & pasaran. Sangat berkah untuk laba dagang dan kemuliaan.';
    } else if (isPangan) {
      status = 'rezeki-pangan';
      labelStatus = 'Arah Pangan & Nafkah Berkah';
      skorBerkah = 90;
      keterangan = 'Mendatangkan kelancaran pangan pokok, hasil bumi, dan pemenuhan kebutuhan keluarga.';
    } else if (isGedhong || isBack) {
      status = 'rezeki-gedhong';
      labelStatus = 'Arah Gedhong (Kasugihan/Harta)';
      skorBerkah = 85;
      keterangan = 'Niti geger naga; memberikan perlindungan wibawa dan kestabilan simpanan aset.';
    } else if (isTail) {
      status = 'netral';
      labelStatus = 'Arah Ekor Naga';
      skorBerkah = 60;
      keterangan = 'Cukup aman jika melangkah searah menjauhi kepala naga.';
    } else {
      status = 'netral';
      labelStatus = 'Arah Netral';
      skorBerkah = 70;
      keterangan = 'Aman untuk perjalanan ringan dan urusan rutin.';
    }

    return {
      arah: item.arah,
      singkatan: item.singkatan,
      derajat: item.derajat,
      status,
      labelStatus,
      skorBerkah,
      keterangan,
      isNagaHead: isNagaHeadExact,
      isNagaTail: isTail,
      isNagaBack: isBack
    };
  });

  // Arah terbaik berdasarkan 5 kategori hajat
  const arahTerbaikHajat = {
    usahaDagang: {
      arah: `${nagaDina.arahSandang} & ${nagaPasaran.arahDuduk !== 'Pusat (Madya)' ? nagaPasaran.arahDuduk : nagaDina.arahPangan}`,
      tips: `Buka lapak atau jalankan promosi mengarah ke ${nagaDina.arahSandang}. Hindari menghadap langsung ke ${nagaDina.pantanganUtama}.`
    },
    melamarKerja: {
      arah: nagaDina.arahJaya,
      tips: `Saat menuju lokasi wawancara, pilihlah rute masuk dari arah ${nagaDina.arahJaya} untuk memancarkan aura karisma kepemimpinan.`
    },
    bepergianJauh: {
      arah: nagaDina.punggungNaga,
      tips: `Berjalan 'niti geger naga' ke arah ${nagaDina.punggungNaga} membawa keselamatan perjalanan dan menghindarkan dari aral rintangan.`
    },
    negosiasiPiutang: {
      arah: nagaDina.arahPangan,
      tips: `Duduklah menghadap ke arah ${nagaDina.arahPangan} saat bernegosiasi untuk melunakkan hati lawan bicara.`
    },
    investasiProperti: {
      arah: nagaDina.arahGedhong,
      tips: `Pilihlah aset tanah atau properti yang terletak di sisi ${nagaDina.arahGedhong} dari pusat kediaman Anda.`
    }
  };

  // Jam berkah hari ini
  const jamBerkahHariIni = SAAT_BERKAH_HARIAN[weton.hari] || SAAT_BERKAH_HARIAN['Ahad'];

  // Etika berangkat ikhtiar (Langkah pertama & doa)
  const isGanjil = weton.neptuTotal % 2 !== 0;
  const langkahKakiPertama: 'Kaki Kanan' | 'Kaki Kiri' = 'Kaki Kanan'; // Dalam tradisi Islam-Jawa selalu mengutamakan kaki kanan
  const alasanNeptu = isGanjil
    ? `Neptu ${weton.neptuTotal} (Ganjil/Surya): Awali dengan kaki kanan sambil menarik nafas dalam dari rongga dada kanan, melangkah penuh keyakinan.`
    : `Neptu ${weton.neptuTotal} (Genap/Candra): Awali dengan kaki kanan dengan niat tenang, sejuk, dan memohon ketentraman langkah.`;

  const doaKeselamatan = 'Bismillahi tawakkaltu \'alallah, la haula wala quwwata illa billahil \'aliyyil \'azhim. Hyang Maha Suci paringa slamet rahayu sagung dumadi.';
  const artianDoa = 'Dengan nama Allah aku berserah diri kepada Allah; tiada daya dan kekuatan melainkan dengan pertolongan Allah Yang Maha Tinggi lagi Maha Agung. Semoga Gusti Maha Suci melimpahkan keselamatan bagi seluruh semesta.';
  const nasihatTawakal = 'Petung naga dina dan arah rezeki adalah ikhtiar tata ruang dan waktu tradisional (etnosains orientasi geografis) agar kita senantiasa eling, waspada, dan bersemangat. Sandarkan keyakinan mutlak hanya kepada Allah SWT / Gusti Kang Murbeng Dumadi.';

  return {
    tanggalMasehi: weton.tanggalMasehi,
    weton,
    nagaDina,
    nagaPasaran,
    kompas8Arah,
    arahTerbaikHajat,
    jamBerkahHariIni,
    etikaBerangkat: {
      langkahKakiPertama,
      alasanNeptu,
      doaKeselamatan,
      artianDoa,
      nasihatTawakal
    }
  };
}
