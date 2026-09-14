import { FirasatKedutan, HariDetail, PasaranDetail, PertandaAlam, PranataMangsaInfo } from '../types/weton';

export const DAFTAR_HARI: HariDetail[] = [
  { nama: 'Ahad', aliasMasehi: 'Minggu', neptu: 5 },
  { nama: 'Senen', aliasMasehi: 'Senin', neptu: 4 },
  { nama: 'Selasa', aliasMasehi: 'Selasa', neptu: 3 },
  { nama: 'Rebo', aliasMasehi: 'Rabu', neptu: 7 },
  { nama: 'Kemis', aliasMasehi: 'Kamis', neptu: 8 },
  { nama: 'Jemuwah', aliasMasehi: 'Jumat', neptu: 6 },
  { nama: 'Setu', aliasMasehi: 'Sabtu', neptu: 9 },
];

export const DAFTAR_PASARAN: PasaranDetail[] = [
  { nama: 'Legi', neptu: 5 },
  { nama: 'Pahing', neptu: 9 },
  { nama: 'Pon', neptu: 7 },
  { nama: 'Wage', neptu: 4 },
  { nama: 'Kliwon', neptu: 8 },
];

export const DAFTAR_WUKU: string[] = [
  'Sinta', 'Landep', 'Wukir', 'Kurantil', 'Tolu', 'Gumbreg',
  'Warigalit', 'Warigagung', 'Julungwangi', 'Sungsang', 'Galungan', 'Kuningan',
  'Langkir', 'Mandasiya', 'Julungpujut', 'Pahang', 'Kuruwelut', 'Marakeh',
  'Tambir', 'Medangkungan', 'Maktal', 'Wuye', 'Manahil', 'Prangbakat',
  'Bala', 'Wugu', 'Wayang', 'Kulawu', 'Dukut', 'Watugunung'
];

// Pasangan Taliwangke per wuku (Betaljemur Adammakna Bab Taliwangke)
// Hari + Pasaran yang dihindari saat wuku tersebut berjalan
export const TALIWANGKE_MAP: Record<string, { hari: string; pasaran: string }> = {
  'Sinta': { hari: 'Senen', pasaran: 'Kliwon' },
  'Landep': { hari: 'Ahad', pasaran: 'Wage' },
  'Wukir': { hari: 'Rebo', pasaran: 'Pon' },
  'Kurantil': { hari: 'Kemis', pasaran: 'Pahing' },
  'Tolu': { hari: 'Jemuwah', pasaran: 'Legi' },
  'Gumbreg': { hari: 'Setu', pasaran: 'Kliwon' },
  'Warigalit': { hari: 'Senen', pasaran: 'Wage' },
  'Warigagung': { hari: 'Ahad', pasaran: 'Pon' },
  'Julungwangi': { hari: 'Rebo', pasaran: 'Pahing' },
  'Sungsang': { hari: 'Kemis', pasaran: 'Legi' },
  'Galungan': { hari: 'Jemuwah', pasaran: 'Kliwon' },
  'Kuningan': { hari: 'Setu', pasaran: 'Wage' },
  'Langkir': { hari: 'Senen', pasaran: 'Pon' },
  'Mandasiya': { hari: 'Ahad', pasaran: 'Pahing' },
  'Julungpujut': { hari: 'Rebo', pasaran: 'Legi' },
  'Pahang': { hari: 'Kemis', pasaran: 'Kliwon' },
  'Kuruwelut': { hari: 'Jemuwah', pasaran: 'Wage' },
  'Marakeh': { hari: 'Setu', pasaran: 'Pon' },
  'Tambir': { hari: 'Senen', pasaran: 'Pahing' },
  'Medangkungan': { hari: 'Ahad', pasaran: 'Legi' },
  'Maktal': { hari: 'Rebo', pasaran: 'Kliwon' },
  'Wuye': { hari: 'Kemis', pasaran: 'Wage' },
  'Manahil': { hari: 'Jemuwah', pasaran: 'Pon' },
  'Prangbakat': { hari: 'Setu', pasaran: 'Pahing' },
  'Bala': { hari: 'Senen', pasaran: 'Legi' },
  'Wugu': { hari: 'Ahad', pasaran: 'Kliwon' },
  'Wayang': { hari: 'Rebo', pasaran: 'Wage' },
  'Kulawu': { hari: 'Kemis', pasaran: 'Pon' },
  'Dukut': { hari: 'Jemuwah', pasaran: 'Pahing' },
  'Watugunung': { hari: 'Setu', pasaran: 'Legi' },
};

// Samparwangke per wuku
export const SAMPARWANGKE_MAP: Record<string, { hari: string; pasaran: string }> = {
  'Sinta': { hari: 'Senen', pasaran: 'Pon' },
  'Landep': { hari: 'Selasa', pasaran: 'Wage' },
  'Wukir': { hari: 'Rebo', pasaran: 'Kliwon' },
  'Kurantil': { hari: 'Kemis', pasaran: 'Legi' },
  'Tolu': { hari: 'Jemuwah', pasaran: 'Pahing' },
  'Gumbreg': { hari: 'Setu', pasaran: 'Pon' },
  'Warigalit': { hari: 'Ahad', pasaran: 'Wage' },
  'Warigagung': { hari: 'Senen', pasaran: 'Kliwon' },
  'Julungwangi': { hari: 'Selasa', pasaran: 'Legi' },
  'Sungsang': { hari: 'Rebo', pasaran: 'Pahing' },
  'Galungan': { hari: 'Kemis', pasaran: 'Pon' },
  'Kuningan': { hari: 'Jemuwah', pasaran: 'Wage' },
  'Langkir': { hari: 'Setu', pasaran: 'Kliwon' },
  'Mandasiya': { hari: 'Ahad', pasaran: 'Legi' },
  'Julungpujut': { hari: 'Senen', pasaran: 'Pahing' },
  'Pahang': { hari: 'Selasa', pasaran: 'Pon' },
  'Kuruwelut': { hari: 'Rebo', pasaran: 'Wage' },
  'Marakeh': { hari: 'Kemis', pasaran: 'Kliwon' },
  'Tambir': { hari: 'Jemuwah', pasaran: 'Legi' },
  'Medangkungan': { hari: 'Setu', pasaran: 'Pahing' },
  'Maktal': { hari: 'Ahad', pasaran: 'Pon' },
  'Wuye': { hari: 'Senen', pasaran: 'Wage' },
  'Manahil': { hari: 'Selasa', pasaran: 'Kliwon' },
  'Prangbakat': { hari: 'Rebo', pasaran: 'Legi' },
  'Bala': { hari: 'Kemis', pasaran: 'Pahing' },
  'Wugu': { hari: 'Jemuwah', pasaran: 'Pon' },
  'Wayang': { hari: 'Setu', pasaran: 'Wage' },
  'Kulawu': { hari: 'Ahad', pasaran: 'Kliwon' },
  'Dukut': { hari: 'Senen', pasaran: 'Legi' },
  'Watugunung': { hari: 'Selasa', pasaran: 'Pahing' },
};

// Dina Sangar (hari-hari yang dipantangi untuk hajat besar seperti mantu/nikah)
export const DINA_SANGAR_BULAN: Record<number, number[]> = {
  // Bulan Jawa 1-12 (Sura, Sapar, Mulud, Bakda Mulud, Jumadilawal, Jumadilakhir, Rejeb, Ruwah, Pasa, Sawal, Dulkangidah, Besar)
  1: [11, 18], // Sura
  2: [20, 27], // Sapar
  3: [1, 8],   // Mulud / Rabiulawal
  4: [10, 18], // Bakda Mulud
  5: [1, 11],  // Jumadilawal
  6: [10, 14], // Jumadilakhir
  7: [12, 13], // Rejeb
  8: [19, 20], // Ruwah
  9: [9, 10],  // Pasa / Ramadhan
  10: [10, 20], // Sawal
  11: [2, 3],   // Dulkangidah / Sela
  12: [6, 7],   // Besar
};

// Pranata Mangsa (12 Musim Jawa)
export const PRANATA_MANGSA_DATA: PranataMangsaInfo[] = [
  {
    nomor: 1,
    nama: 'Kasa (Kartika)',
    rentang: '22 Juni – 1 Agustus',
    durasiHari: 41,
    candra: 'Sesotya murca ing embanan',
    artianCandra: 'Permata lepas dari ikatannya (dedaunan gugur dari ranting pohon)',
    keadaanAlam: 'Udara dingin kering, daun-daun rontok, tanah mengering dan mulai merekah.',
    pedomanAgrarisDanUsaha: 'Masa membakar jerami sisa panen, membersihkan pematang sawah, menanam palawija tahan kering.',
    penyakitMusiman: 'Penyakit batuk dan pilek akibat udara kering dingin di malam hari (angin bediding).'
  },
  {
    nomor: 2,
    nama: 'Karo (Puspita)',
    rentang: '2 Agustus – 24 Agustus',
    durasiHari: 23,
    candra: 'Bantala rengka',
    artianCandra: 'Bumi merekah retak-retak',
    keadaanAlam: 'Kering kerontang, tanah tegalan pecah-pecah, pohon kapuk randu mulai berbunga.',
    pedomanAgrarisDanUsaha: 'Menanam ubi jalar, kacang hijau, wijen, dan palawija yang membutuhkan sedikit air.',
    penyakitMusiman: 'Infeksi saluran pernapasan dan kekeringan kulit.'
  },
  {
    nomor: 3,
    nama: 'Katelu (Katrima)',
    rentang: '25 Agustus – 17 September',
    durasiHari: 24,
    candra: 'Suta manut ing bapa',
    artianCandra: 'Anak menurut pada ayahnya (sulur-sulur tanaman melilit batang penyangga)',
    keadaanAlam: 'Puncak kemarau, sumber air mulai menyusut, udara panas di siang hari namun dingin menusuk di malam hari.',
    pedomanAgrarisDanUsaha: 'Panen palawija tahap awal, pengeringan umbi, persiapan perbaikan saluran irigasi.',
    penyakitMusiman: 'Diare akibat sanitasi air yang berkurang di musim kemarau.'
  },
  {
    nomor: 4,
    nama: 'Kapat (Sitoresmi)',
    rentang: '18 September – 12 Oktober',
    durasiHari: 25,
    candra: 'Waspa kumembeng jroning kalbu',
    artianCandra: 'Air mata tertahan di relung hati (mata air mulai mengalir kembali secara samar)',
    keadaanAlam: 'Angin berubah arah, cuaca mulai lembap, mendung mulai menggelayut di sore hari, burung kutilang mulai bertelur.',
    pedomanAgrarisDanUsaha: 'Masa mengolah tanah gaga/ladang, persiapan menabur bibit padi gogo, memangkas ranting pepohonan.',
    penyakitMusiman: 'Alergi debu dan perubahan suhu pancaroba awal.'
  },
  {
    nomor: 5,
    nama: 'Kalima (Raras)',
    rentang: '13 Oktober – 8 November',
    durasiHari: 27,
    candra: 'Pancuran mas sumawur ing jagat',
    artianCandra: 'Pancuran emas bertaburan di alam semesta (hujan rintik awal membasahi bumi)',
    keadaanAlam: 'Hujan labuh (hujan pertama) turun berderai, laron mulai keluar dari sarang liang tanah di senja hari.',
    pedomanAgrarisDanUsaha: 'Mulai menyemai bibit padi, memperbaiki galengan sawah, menanam kunyit, jahe, dan empon-empon.',
    penyakitMusiman: 'Demam dan gigitan serangga musiman.'
  },
  {
    nomor: 6,
    nama: 'Kanem (Rasa)',
    rentang: '9 November – 21 Desember',
    durasiHari: 43,
    candra: 'Rasa mulya kasuciyan',
    artianCandra: 'Rasa mulia dalam kesucian (buah-buahan bermekaran, buah mangga dan durian mulai masak)',
    keadaanAlam: 'Hujan semakin sering dan lebat, sungai mulai terisi air penuh, tanah menjadi sangat subur gembur.',
    pedomanAgrarisDanUsaha: 'Masa menanam padi di sawah (tandur), perawatan bibit muda, pemupukan organik pertama.',
    penyakitMusiman: 'Flu musiman, demam berdarah (nyamuk mulai berkembang biak).'
  },
  {
    nomor: 7,
    nama: 'Kapitu (Randi)',
    rentang: '22 Desember – 2 Februari',
    durasiHari: 43,
    candra: 'Wisa kentir ing maruta',
    artianCandra: 'Racun hanyut terbawa angin (angin kencang dan hujan lebat pembersih hama)',
    keadaanAlam: 'Puncak musim hujan, angin barat bertiup kencang, banjir di dataran rendah, ombak laut pasang tinggi.',
    pedomanAgrarisDanUsaha: 'Padi tumbuh subur menghijau, penyiangan rumput liar (matun), nelayan disarankan tidak melaut jauh.',
    penyakitMusiman: 'Leptospirosis, flu berat, dan penyakit kulit akibat kelembapan tinggi.'
  },
  {
    nomor: 8,
    nama: 'Kawolu (Bisma)',
    rentang: '3 Februari – 28/29 Februari',
    durasiHari: 26,
    candra: 'Anjrah jroning kayun',
    artianCandra: 'Semerbak harum menentramkan hati (serangga dan ulat mulai berbiak, kucing kawin)',
    keadaanAlam: 'Curah hujan mulai berangsur turun, terdengar suara tonggeret di pepohonan lebat.',
    pedomanAgrarisDanUsaha: 'Padi mulai bunting (meteng), waspada terhadap serangan hama burung dan tikus, pasang orang-orangan sawah.',
    penyakitMusiman: 'Penyakit lambung dan gangguan pernapasan ringan.'
  },
  {
    nomor: 9,
    nama: 'Kasanga (Jita)',
    rentang: '1 Maret – 25 Maret',
    durasiHari: 25,
    candra: 'Wedaring wacana mulya',
    artianCandra: 'Munculnya sabda mulia (padi mulai menguning, jangkrik dan cenggeret bernyanyi bersahut-sahutan)',
    keadaanAlam: 'Bulu padi merunduk sarat butir beras, angin sepoi-sepoi basah, hari mulai bertambah hangat.',
    pedomanAgrarisDanUsaha: 'Masa menjaga sawah dari hama sebelum panen, persiapan lumbung padi dan alat perontok gabah.',
    penyakitMusiman: 'Iritasi mata akibat serbuk sari dan serangga kecil.'
  },
  {
    nomor: 10,
    nama: 'Kadasa (Srawana)',
    rentang: '26 Maret – 18 April',
    durasiHari: 24,
    candra: 'Gedhong mineb jroning kalbu',
    artianCandra: 'Pintu gerbang tertutup dalam kalbu (burung-burung menyuapi anak-anaknya di sarang)',
    keadaanAlam: 'Hujan sangat jarang turun, cuaca cerah dan terang benderang, udara hangat stabil.',
    pedomanAgrarisDanUsaha: 'Panen raya padi di sawah (wiwit panen), memasukkan padi ke dalam lumbung keluarga.',
    penyakitMusiman: 'Kelelahan fisik pasca panen raya dan dehidrasi ringan.'
  },
  {
    nomor: 11,
    nama: 'Desta (Padrawana)',
    rentang: '19 April – 11 Mei',
    durasiHari: 23,
    candra: 'Sotya sinarawedi',
    artianCandra: 'Permata yang diasah indah berkilau (anak burung mulai belajar terbang bebas)',
    keadaanAlam: 'Awal musim kemarau (mareng), hawa sejuk di pagi hari dan panas kering di siang hari.',
    pedomanAgrarisDanUsaha: 'Menjemur padi hingga kering giling, menanam palawija tahap kedua (jagung, kedelai, kacang tanah).',
    penyakitMusiman: 'Bibir pecah-pecah dan tenggorokan kering.'
  },
  {
    nomor: 12,
    nama: 'Saddha (Asuji)',
    rentang: '12 Mei – 21 Juni',
    durasiHari: 41,
    candra: 'Tirta sah saking sasana',
    artianCandra: 'Air sirna dari kediamannya (air di sungai dan parit mulai mengering, dedaunan mulai luruh)',
    keadaanAlam: 'Suhu malam hari turun drastis (bediding), langit sangat biru bersih tanpa awan.',
    pedomanAgrarisDanUsaha: 'Pemeliharaan palawija, penyiapan pupuk kompos alami untuk musim tanam berikutnya.',
    penyakitMusiman: 'Rheumatik, kram otot karena dingin malam, dan flu bediding.'
  }
];

// Pantangan Arah Bepergian (Kala Dite, Naga Dina & Etnosains)
export const ARAH_PANTANGAN_DATA = [
  {
    hari: 'Ahad (Minggu)',
    arahKala: 'Timur Laut (Wetan Lor)',
    arahNagaDina: 'Barat Laut (Kulon Lor)',
    anjuranArahBaik: 'Barat Daya atau Tenggara',
    penjelasanObjektif: 'Pada hari Ahad, matahari condong melintasi busur timur-barat tropis. Nenek moyang mengamati sudut silau dan angin muson darat-laut di wilayah pesisir Jawa yang membahayakan pelayaran dan perjalanan berkuda di rute terbuka.'
  },
  {
    hari: 'Senen (Senin)',
    arahKala: 'Tenggara (Kidul Wetan)',
    arahNagaDina: 'Timur (Wetan)',
    anjuranArahBaik: 'Barat atau Barat Laut',
    penjelasanObjektif: 'Menghindari arah Tenggara berhubungan dengan jalur hembusan badai angin musim pegunungan selatan Jawa yang kerap memicu pohon tumbang dan longsor pada jalan setapak perbukitan.'
  },
  {
    hari: 'Selasa',
    arahKala: 'Barat Laut (Kulon Lor)',
    arahNagaDina: 'Selatan (Kidul)',
    anjuranArahBaik: 'Timur atau Timur Laut',
    penjelasanObjektif: 'Selatan merupakan batas laut selatan (Samudera Hindia) dengan ombak palung ekstrem; pergerakan menuju selatan tanpa persiapan navigasi ombak berisiko tinggi pada siklus pasang bulanan.'
  },
  {
    hari: 'Rebo (Rabu)',
    arahKala: 'Barat Daya (Kulon Kidul)',
    arahNagaDina: 'Utara (Lor)',
    anjuranArahBaik: 'Tenggara atau Timur Laut',
    penjelasanObjektif: 'Angin lembah barat daya sering membawa awan tebal pembawa kilat halilintar di kawasan dataran tinggi Mataram, membahayakan kafilah pejalan kaki.'
  },
  {
    hari: 'Kemis (Kamis)',
    arahKala: 'Barat (Kulon)',
    arahNagaDina: 'Tenggara (Kidul Wetan)',
    anjuranArahBaik: 'Timur atau Utara',
    penjelasanObjektif: 'Perjalanan ke barat di waktu siang-sore memaksa mata terus menantang silau terik surya yang menyilaukan pandangan kusir pedati dan membahayakan keselamatan rute.'
  },
  {
    hari: 'Jemuwah (Jumat)',
    arahKala: 'Utara (Lor)',
    arahNagaDina: 'Timur Laut (Wetan Lor)',
    anjuranArahBaik: 'Selatan atau Barat Daya',
    penjelasanObjektif: 'Arah utara berhadapan dengan angin lembah gunung berapi (Merapi/Sumbing) yang di masa lampau membawa kabut belerang dan bahaya lahar dingin.'
  },
  {
    hari: 'Setu (Sabtu)',
    arahKala: 'Selatan (Kidul)',
    arahNagaDina: 'Barat Daya (Kulon Kidul)',
    anjuranArahBaik: 'Utara atau Timur Laut',
    penjelasanObjektif: 'Kawasan selatan memiliki kepadatan hutan jati dan rimba karst berlereng terjal yang sulit ditembus di malam hari tanpa penerangan obor memadai.'
  }
];

// Pantangan Menghadap Rumah
export const PANTANGAN_RUMAH_DATA = [
  {
    judul: 'Rumah Menghadap Langsung ke Arah Barat',
    laranganTradisional: 'Dilarang bagi pemilik weton neptu lemah atau pasangan pengantin baru.',
    kajianEtnosains: 'Dinding barat menerima radiasi panas terik matahari sore (afternoon sun exposure) secara maksimal, menyebabkan suhu ruangan dalam rumah sangat gerah saat malam hari, mengganggu sirkulasi udara dan kualitas istirahat penghuninya.'
  },
  {
    judul: 'Pintu Utama Sejajar Lurus dengan Pintu Belakang (Lawang Salang)',
    laranganTradisional: 'Rezeki masuk langsung keluar tanpa berkah.',
    kajianEtnosains: 'Efek terowongan angin (wind-tunnel effect) menciptakan aliran angin kencang bertekanan tidak seimbang di dalam ruangan, menerbangkan debu dan mengganggu kenyamanan termal biologis.'
  },
  {
    judul: 'Mendirikan Rumah Tepat di Tusuk Sate (Prapatsipat)',
    laranganTradisional: 'Penghuni sering mengalami marabahaya dan perselisihan.',
    kajianEtnosains: 'Rumah berada persis pada sumbu tabrakan kendaraan jika rem blong, sorotan lampu kendaraan langsung mengenai kamar tidur di malam hari, serta polusi udara dan kebisingan terpusat tepat di fasad rumah.'
  },
  {
    judul: 'Arah Hadap Membelakangi Gunung Tertinggi',
    laranganTradisional: 'Hilangnya kewibawaan dan rasa tenteram keluarga.',
    kajianEtnosains: 'Secara tata ruang topografi Jawa, gunung adalah hulu mata air dan penyaring angin badai. Menghadap ke arah keterbukaan lembah memberi penerangan alami dan keamanan lereng.'
  }
];

// Ensiklopedia Firasat Kedutan (Kramadana Betaljemur Adammakna)
export const FIRASAT_KEDUTAN_DATA: FirasatKedutan[] = [
  {
    id: 'kdt-1',
    lokasi: 'Ubun-ubun kepala (Sirah nduwur)',
    bagianTubuh: 'Kepala & Wajah',
    firasat: 'Akan memperoleh kebahagiaan batin, kedamaian, atau dihormati oleh kerabat.',
    maknaPositif: true,
    penjelasanEtnis: 'Ubun-ubun melambangkan mahkota spiritual rasa eling (kesadaran diri tinggi).'
  },
  {
    id: 'kdt-2',
    lokasi: 'Kepala sebelah kanan',
    bagianTubuh: 'Kepala & Wajah',
    firasat: 'Akan memperoleh rezeki tak terduga berupa pangan atau hasil usaha yang berkah.',
    maknaPositif: true,
    penjelasanEtnis: 'Sisi kanan diyakini sebagai simbol berkah dan kelancaran ikhtiar lahiriah.'
  },
  {
    id: 'kdt-3',
    lokasi: 'Kepala sebelah kiri',
    bagianTubuh: 'Kepala & Wajah',
    firasat: 'Pertanda akan bepergian jauh ke tempat yang membawa ketentraman hati.',
    maknaPositif: true,
    penjelasanEtnis: 'Perjalanan rohani atau silaturahmi yang mempererat persaudaraan.'
  },
  {
    id: 'kdt-4',
    lokasi: 'Alis mata sebelah kanan',
    bagianTubuh: 'Mata & Telinga',
    firasat: 'Akan melihat hal-hal yang menyenangkan atau bertemu sahabat lama yang dirindukan.',
    maknaPositif: true,
    penjelasanEtnis: 'Mata bathin menyambut kabar gembira dari orang terkasih.'
  },
  {
    id: 'kdt-5',
    lokasi: 'Alis mata sebelah kiri',
    bagianTubuh: 'Mata & Telinga',
    firasat: 'Akan mendapat penghormatan atau sanjungan dari pembesar/pimpinan.',
    maknaPositif: true,
    penjelasanEtnis: 'Kerja keras dan kejujuran mulai dilihat dan diapresiasi lingkungan.'
  },
  {
    id: 'kdt-6',
    lokasi: 'Kelopak mata kanan atas',
    bagianTubuh: 'Mata & Telinga',
    firasat: 'Akan memperoleh keuntungan finansial atau kabar bahagia perihal rezeki halal.',
    maknaPositif: true,
    penjelasanEtnis: 'Firasat paling umum dalam Primbon Betaljemur yang menandakan tibanya hasil panen.'
  },
  {
    id: 'kdt-7',
    lokasi: 'Kelopak mata kanan bawah',
    bagianTubuh: 'Mata & Telinga',
    firasat: 'Akan menangis terharu atau menghadapi perkara sedih sesaat yang berbuah hikmah.',
    maknaPositif: false,
    penjelasanEtnis: 'Nasehat agar menjaga ketenangan hati dan tidak mudah larut dalam emosi sedih.'
  },
  {
    id: 'kdt-8',
    lokasi: 'Kelopak mata kiri atas',
    bagianTubuh: 'Mata & Telinga',
    firasat: 'Akan berjumpa dengan sanak saudara yang sudah lama merantau jauh.',
    maknaPositif: true,
    penjelasanEtnis: 'Silaturahmi keluarga yang kembali terjalin erat.'
  },
  {
    id: 'kdt-9',
    lokasi: 'Kelopak mata kiri bawah',
    bagianTubuh: 'Mata & Telinga',
    firasat: 'Akan mengeluarkan air mata karena duka cita atau kehilangan barang kecil.',
    maknaPositif: false,
    penjelasanEtnis: 'Pengingat untuk lebih waspada dan ikhlas terhadap apa yang dimiliki.'
  },
  {
    id: 'kdt-10',
    lokasi: 'Daun telinga kanan',
    bagianTubuh: 'Mata & Telinga',
    firasat: 'Akan mendengar perbincangan baik mengenai diri Anda dari orang lain.',
    maknaPositif: true,
    penjelasanEtnis: 'Nama baik dan reputasi yang dijaga dengan budi pekerti luhur.'
  },
  {
    id: 'kdt-11',
    lokasi: 'Daun telinga kiri',
    bagianTubuh: 'Mata & Telinga',
    firasat: 'Akan kedatangan tamu yang berniat baik atau membicarakan urusan kerja sama.',
    maknaPositif: true,
    penjelasanEtnis: 'Peluang kolaborasi usaha yang membawa manfaat bersama.'
  },
  {
    id: 'kdt-12',
    lokasi: 'Hidung (Pucuk irung)',
    bagianTubuh: 'Kepala & Wajah',
    firasat: 'Akan mencium aroma masakan sedap atau diundang jamuan selamatan hajatan lezat.',
    maknaPositif: true,
    penjelasanEtnis: 'Simbol kelimpahan pangan dan kemurahan rezeki tetangga.'
  },
  {
    id: 'kdt-13',
    lokasi: 'Bibir sebelah atas',
    bagianTubuh: 'Mulut & Leher',
    firasat: 'Akan mendapat makanan lezat atau menerima hadiah cendera mata istimewa.',
    maknaPositif: true,
    penjelasanEtnis: 'Pangan berkah yang dinikmati bersama keluarga tercinta.'
  },
  {
    id: 'kdt-14',
    lokasi: 'Bibir sebelah bawah',
    bagianTubuh: 'Mulut & Leher',
    firasat: 'Akan berdebat atau bertukar pikiran dalam forum penting, dianjurkan menjaga lisan.',
    maknaPositif: false,
    penjelasanEtnis: 'Ajaran ngati-ati sajroning rembugan (berhati-hati dalam bertutur kata).'
  },
  {
    id: 'kdt-15',
    lokasi: 'Dagu (Janggut)',
    bagianTubuh: 'Mulut & Leher',
    firasat: 'Akan dipercaya memegang tanggung jawab atau amanah baru dalam pekerjaan.',
    maknaPositif: true,
    penjelasanEtnis: 'Tanda kematangan pribadi yang diakui orang banyak.'
  },
  {
    id: 'kdt-16',
    lokasi: 'Pundak sebelah kanan',
    bagianTubuh: 'Tubuh & Dada',
    firasat: 'Akan memikul tanggung jawab besar yang berakhir dengan kesuksesan dan kemuliaan.',
    maknaPositif: true,
    penjelasanEtnis: 'Simbol ketabahan jiwa satria dalam menuntaskan tugas mulia.'
  },
  {
    id: 'kdt-17',
    lokasi: 'Pundak sebelah kiri',
    bagianTubuh: 'Tubuh & Dada',
    firasat: 'Akan dimintai pertolongan oleh kerabat dekat yang membutuhkan uluran tangan.',
    maknaPositif: true,
    penjelasanEtnis: 'Ladang amal kebajikan melalui welas asih pada sesama.'
  },
  {
    id: 'kdt-18',
    lokasi: 'Lengan tangan kanan',
    bagianTubuh: 'Tangan & Lengan',
    firasat: 'Akan menerima uang atau rezeki hasil jerih payah keringat sendiri.',
    maknaPositif: true,
    penjelasanEtnis: 'Bukti buah kerja keras yang halal dan membahagiakan.'
  },
  {
    id: 'kdt-19',
    lokasi: 'Lengan tangan kiri',
    bagianTubuh: 'Tangan & Lengan',
    firasat: 'Akan menolong kawan atau saudara yang sedang tertimpa kesulitan.',
    maknaPositif: true,
    penjelasanEtnis: 'Ajaran tolong-menolong sesama titah Gusti.'
  },
  {
    id: 'kdt-20',
    lokasi: 'Telapak tangan kanan',
    bagianTubuh: 'Tangan & Lengan',
    firasat: 'Akan menerima uang tunai atau rezeki kontan dalam waktu dekat.',
    maknaPositif: true,
    penjelasanEtnis: 'Kabar baik finansial yang patut disyukuri dengan bersedekah.'
  },
  {
    id: 'kdt-21',
    lokasi: 'Telapak tangan kiri',
    bagianTubuh: 'Tangan & Lengan',
    firasat: 'Akan mengeluarkan biaya untuk urusan kebaikan keluarga atau membeli barang berharga.',
    maknaPositif: true,
    penjelasanEtnis: 'Pengeluaran produktif untuk masa depan anak cucu.'
  },
  {
    id: 'kdt-22',
    lokasi: 'Dada sebelah kanan',
    bagianTubuh: 'Tubuh & Dada',
    firasat: 'Akan merasakan kelegaan hati dari kecemasan atau kesukaran yang selama ini dihadapi.',
    maknaPositif: true,
    penjelasanEtnis: 'Tanda terbukanya jalan keluar setelah melewati masa prihatin.'
  },
  {
    id: 'kdt-23',
    lokasi: 'Dada sebelah kiri',
    bagianTubuh: 'Tubuh & Dada',
    firasat: 'Akan jatuh cinta atau merasakan getaran asmara dan kehangatan rasa sayang.',
    maknaPositif: true,
    penjelasanEtnis: 'Pertanda asmaradhana dan keharmonisan batin.'
  },
  {
    id: 'kdt-24',
    lokasi: 'Perut (Waduk)',
    bagianTubuh: 'Tubuh & Dada',
    firasat: 'Akan mendapatkan rezeki berlimpah yang mencukupi seluruh kebutuhan dapur keluarga.',
    maknaPositif: true,
    penjelasanEtnis: 'Simbol kesejahteraan pangan dan kemakmuran rumah tangga.'
  },
  {
    id: 'kdt-25',
    lokasi: 'Paha sebelah kanan',
    bagianTubuh: 'Kaki & Telapak',
    firasat: 'Akan ada keinginan kuat untuk bepergian atau merantau yang membawa hasil baik.',
    maknaPositif: true,
    penjelasanEtnis: 'Langkah awal menjemput rezeki di tempat yang baru.'
  },
  {
    id: 'kdt-26',
    lokasi: 'Paha sebelah kiri',
    bagianTubuh: 'Kaki & Telapak',
    firasat: 'Akan berjalan santai atau berwisata yang menyegarkan pikiran dan jiwa.',
    maknaPositif: true,
    penjelasanEtnis: 'Kebutuhan melepas penat agar kesehatan jasmani terjaga.'
  },
  {
    id: 'kdt-27',
    lokasi: 'Lutut sebelah kanan',
    bagianTubuh: 'Kaki & Telapak',
    firasat: 'Akan dihormati dalam suatu pertemuan atau menjadi panutan bagi orang muda.',
    maknaPositif: true,
    penjelasanEtnis: 'Sikap santun yang membuahkan karisma dan wibawa.'
  },
  {
    id: 'kdt-28',
    lokasi: 'Lutut sebelah kiri',
    bagianTubuh: 'Kaki & Telapak',
    firasat: 'Akan menghadapi sedikit rintangan fisik namun dapat diatasi dengan ketabahan.',
    maknaPositif: false,
    penjelasanEtnis: 'Anjuran agar tidak tergesa-gesa saat melangkah di medan terjal.'
  },
  {
    id: 'kdt-29',
    lokasi: 'Betis sebelah kanan',
    bagianTubuh: 'Kaki & Telapak',
    firasat: 'Akan diundang menghadiri upacara pernikahan atau syukuran kerabat terpandang.',
    maknaPositif: true,
    penjelasanEtnis: 'Kebersamaan dalam merayakan kebahagiaan sanak kadang.'
  },
  {
    id: 'kdt-30',
    lokasi: 'Telapak kaki kanan',
    bagianTubuh: 'Kaki & Telapak',
    firasat: 'Akan bepergian jauh ke tempat suci atau tempat yang mendatangkan kemaslahatan hidup.',
    maknaPositif: true,
    penjelasanEtnis: 'Langkah mulia yang diridhai Sang Hyang Widhi.'
  },
  {
    id: 'kdt-31',
    lokasi: 'Telapak kaki kiri',
    bagianTubuh: 'Kaki & Telapak',
    firasat: 'Akan menempuh perjalanan mendadak, waspadalah terhadap kondisi kendaraan dan fisik.',
    maknaPositif: false,
    penjelasanEtnis: 'Pentingnya memeriksa perbekalan dan berdoa sebelum melangkahkan kaki.'
  }
];

// Ensiklopedia Alamat Gejala Alam
export const GEJALA_ALAM_DATA: PertandaAlam[] = [
  {
    id: 'alam-1',
    kategori: 'Lintang Kemukus (Komet)',
    kondisi: 'Muncul di arah Timur (Wetan)',
    waktuAtauArah: 'Menjelang Fajar / Dini Hari',
    maknaKlasik: 'Pertanda para pemimpin akan memperoleh kejayaan, panen hasil bumi berlimpah, dan rakyat hidup makmur gemah ripah loh jinawi.',
    penjelasanEtnosainsModern: 'Komet adalah benda es antariksa yang mendekati orbit matahari. Kemunculan di timur fajar adalah fenomena astronomi periodik orbit elips spektakuler yang di masa lalu menjadi tonggak catatan kalender raja-raja Jawa.'
  },
  {
    id: 'alam-2',
    kategori: 'Lintang Kemukus (Komet)',
    kondisi: 'Muncul di arah Barat (Kulon)',
    waktuAtauArah: 'Senja / Maghrib',
    maknaKlasik: 'Pertanda akan ada pergantian tampuk pimpinan atau pergeseran kebijakan ekonomi yang menuntut rakyat berhemat dan prihatin.',
    penjelasanEtnosainsModern: 'Komet senja terjadi saat komet menjauhi perihelion; tidak ada keterkaitan kausalitas gravitasi dengan perpolitikan, namun menjadi stimulus psikologis pengingat kesiapan mitigasi pangan.'
  },
  {
    id: 'alam-3',
    kategori: 'Lintang Kemukus (Komet)',
    kondisi: 'Muncul di arah Selatan (Kidul)',
    waktuAtauArah: 'Tengah Malam',
    maknaKlasik: 'Pertanda pergantian musim ekstrem, nelayan diimbau berhati-hati terhadap gelombang samudra yang membesar.',
    penjelasanEtnosainsModern: 'Mengindikasikan langit malam cerah di musim dingin (bediding) yang bertepatan dengan angin pasat kencang di Samudra Hindia bagian selatan.'
  },
  {
    id: 'alam-4',
    kategori: 'Grahana (Gerhana)',
    kondisi: 'Gerhana Bulan (Grahana Rembulan)',
    waktuAtauArah: 'Purnama Raya di Bulan Sura / Rejeb',
    maknaKlasik: 'Dianjurkan menabuh lesung, kentongan, dan memanjatkan doa keselamatan agar rembulan terlepas dari gigitan Batara Kala.',
    penjelasanEtnosainsModern: 'Secara astronomi, bayangan umbra bumi menutupi bulan. Tradisi tabuh lesung dan kentongan sejatinya adalah instrumen alarm desa untuk membangunkan seluruh warga agar berkumpul, bersyukur, dan melantunkan shalat gerhana/doa bersama.'
  },
  {
    id: 'alam-5',
    kategori: 'Grahana (Gerhana)',
    kondisi: 'Gerhana Matahari (Grahana Srengenge)',
    waktuAtauArah: 'Siang Hari saat Bulan Mati',
    maknaKlasik: 'Dianjurkan bersedekah, menghentikan pertikaian, dan membersihkan hati dari sifat angkara murka.',
    penjelasanEtnosainsModern: 'Bulan berada tepat di antara bumi dan matahari. Secara optik, mata dilarang menatap langsung tanpa filter demi mencegah kebutaan solar retinopati.'
  },
  {
    id: 'alam-6',
    kategori: 'Lindhu (Gempa Bumi)',
    kondisi: 'Gempa di Waktu Siang Hari (Bulan Sura / Sapar)',
    waktuAtauArah: 'Pagi – Siang Hari',
    maknaKlasik: 'Pertanda tanah sedang bergerak mencari keseimbangan, disarankan memperkuat pondasi tiang saka guru rumah panggung.',
    penjelasanEtnosainsModern: 'Pulau Jawa berada di cincin api tektonik (ring of fire / subduksi lempeng Indo-Australia). Kearifan lokal rumah Joglo tradisional dengan sistem tumpangsari fleksibel tanpa paku terbukti tahan terhadap guncangan gempa tektonik.'
  },
  {
    id: 'alam-7',
    kategori: 'Suara Hewan & Burung',
    kondisi: 'Burung Kedasih bersuara mendayu di malam hari',
    waktuAtauArah: 'Tengah Malam sunyi',
    maknaKlasik: 'Mitos pertanda kabar duka; hakikatnya adalah tanda burung mencari pasangan kawin atau mengamati serangga malam.',
    penjelasanEtnosainsModern: 'Burung Wiwik Uncuing (Cacomantis sepulcralis) merupakan burung teritorial nokturnal yang peka terhadap perubahan tekanan udara dan kelembapan sebelum badai hujan malam.'
  },
  {
    id: 'alam-8',
    kategori: 'Suara Hewan & Burung',
    kondisi: 'Semut hitam beriringan membawa telur ke tempat tinggi',
    waktuAtauArah: 'Menjelang Musim Labuh (Oktober)',
    maknaKlasik: 'Pertanda hujan lebat dan banjir akan segera tiba dalam waktu dekat.',
    penjelasanEtnosainsModern: 'Bio-indikator alami yang sangat akurat. Semut mendeteksi peningkatan kelembapan udara mikro dan tekanan barometer udara, lalu mengevakuasi sarang bawah tanah sebelum tergenang banjir.'
  }
];
