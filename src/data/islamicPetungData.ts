// ============================================================================
// DATA INTEGRASI HADITS NABI, HUKUM ISLAM & KAIDAH FIQHIYYAH DALAM BUDAYA PETUNG
// WETON JOWO - Harmonisasi Etnosains Jawa & Syariat Islam Nusantara
// ============================================================================

export interface HaditsNabiItem {
  id: string;
  judul: string;
  tema: 'Tafaul vs Thiyarah' | 'Ikhtiar & Takdir' | 'Pernikahan & Kafaah' | 'Rezeki & Waktu Berkah' | 'Sedekah Tolak Bala' | 'Hari Mulia & Waktu Ibadah' | 'Istikharah & Doa';
  teksArab: string;
  transliterasi: string;
  terjemahan: string;
  perawi: string;
  derajatHadits: 'Shahih Bukhari & Muslim' | 'Shahih Bukhari' | 'Shahih Muslim' | 'Shahih Tirmidzi' | 'Shahih Abu Dawud' | 'Hasan Shahih';
  kontekstualisasiPetung: string;
  kaidahTerkait: string;
}

export interface KaidahFiqihItem {
  id: string;
  namaKaidahArab: string;
  transliterasi: string;
  terjemahan: string;
  maknaDasar: string;
  penerapanDalamPetung: string;
  contohKonkret: string;
}

export interface FatwaPandanganUlama {
  id: string;
  tokohAtauLembaga: string;
  eraAtauKitab: string;
  judulPandangan: string;
  ringkasanFatwa: string;
  kutipanHikmah: string;
}

export interface AmalanIslamiMitigasi {
  id: string;
  namaAmalan: string;
  tujuan: string;
  dalilDasar: string;
  bacaanDoaArab: string;
  artiDoa: string;
  tataCara: string;
  waktuPelaksanaan: string;
}

// ----------------------------------------------------------------------------
// 5. DATA PERBANDINGAN SLAMETAN / TASYAKURAN DALAM KACAMATA FIKIH MODERAT
// ----------------------------------------------------------------------------
export interface PerbandinganSlametanItem {
  id: string;
  aspek: string;
  simbolTradisi: string;
  pandanganPraIslam: string;
  kacamataFikihModerat: string;
  dalilHadits: {
    teksArab: string;
    terjemahan: string;
    sumber: string;
  };
  kaidahFiqih: string;
  statusHukum: 'Sunnah Muakkadah' | 'Sunnah / Mubah Bernilai Pahala' | 'Mubah (Urf Shahih)' | 'Kearifan yang Diakomodasi';
  rekomendasiPurifikasi: string;
}

export interface JenisSlametanModeratItem {
  id: string;
  namaTradisi: string;
  istilahIslami: string;
  tujuanUtama: string;
  waktuPelaksanaan: string;
  ubarampeSimbolik: {
    nama: string;
    maknaBudaya: string;
    reinterpretasiSyarie: string;
  }[];
  susunanDoaDanAmalan: string[];
  pandanganFikihWasathiyah: string;
  haditsRujukan: string;
}

export const DAFTAR_PERBANDINGAN_SLAMETAN: PerbandinganSlametanItem[] = [
  {
    id: 'slametan-aspek-1',
    aspek: 'Niat & Hakikat Acara',
    simbolTradisi: 'Kenduri / Kenduren Slametan',
    pandanganPraIslam: 'Menolak kutukan roh leluhur atau menenangkan penunggu gaib (dhanyang) agar tidak mengganggu ketenteraman warga.',
    kacamataFikihModerat: 'Wujud syukur (tasyakkur) atas nikmat Allah SWT, ikhtiar sedekah makanan (ith\'amuth tha\'am), dan doa bersama memohon keselamatan (salamah) dunia-akhirat hanya kepada Allah.',
    dalilHadits: {
      teksArab: 'أَفْشُوا السَّلَامَ، وَأَطْعِمُوا الطَّعَامَ، وَصِلُوا الْأَرْحَامَ، وَصَلُّوا بِاللَّيْلِ وَالنَّاسُ نِيَامٌ، تَدْخُلُوا الْجَنَّةَ بِسَلَامٍ',
      terjemahan: 'Sebarkanlah salam, berikanlah makanan (kepada sesama), sambunglah silaturahmi, dan shalatlah di waktu malam ketika manusia tertidur, niscaya kalian masuk surga dengan selamat sejahtera.',
      sumber: 'HR. Tirmidzi no. 2485 & Ibnu Majah no. 3251 (Shahih)'
    },
    kaidahFiqih: 'الأُمُورُ بِمَقَاصِدِهَا (Al-Umuru bi Maqashidiha - Segala perkara tergantung pada niatnya). Niat tasyakkur dan sedekah mengubah tradisi menjadi ibadah bernilai pahala.',
    statusHukum: 'Sunnah / Mubah Bernilai Pahala',
    rekomendasiPurifikasi: 'Tegaskan niat semata lillahi Ta\'ala, bukan untuk persembahan makhluk halus.'
  },
  {
    id: 'slametan-aspek-2',
    aspek: 'Hidangan Ubarampe (Tumpeng & Jenang)',
    simbolTradisi: 'Tumpeng Megana, Jenang Sengkolo, Ingkung Ayam',
    pandanganPraIslam: 'Bahan sesaji pemujaan alam semesta dan persembahan korban untuk entitas gaib.',
    kacamataFikihModerat: 'Sarana sedekah pangan lezat dan bergizi bagi sesama manusia. Tumpeng dimaknai sebagai metafora "tumuju marang Hyang Widhi" (berorientasi kepada Allah Yang Maha Tinggi), dan jenang merah-putih sebagai syukur atas asal penciptaan insan dari kedua orang tua. Makanan dimakan bersama, tidak dilarung atau dibuang sia-sia.',
    dalilHadits: {
      teksArab: 'خِيَارُكُمْ مَنْ أَطْعَمَ الطَّعَامَ وَرَدَّ السَّلَامَ',
      terjemahan: 'Sebaik-baik kalian adalah orang yang memberi makan dan menjawab salam.',
      sumber: 'HR. Ahmad no. 23408 (Hasan Shahih)'
    },
    kaidahFiqih: 'العَادَةُ مُحَكَّمَةٌ (Al-\'Adatu Muhakkamah - Adat istiadat yang baik dan tidak bertentangan dengan tauhid dapat dijadikan pijakan sosial).',
    statusHukum: 'Kearifan yang Diakomodasi',
    rekomendasiPurifikasi: 'Pastikan makanan 100% halal dan thayyib, serta hindari pemborosan berlebihan (tabdzir).'
  },
  {
    id: 'slametan-aspek-3',
    aspek: 'Doa, Mantra, dan Bacaan',
    simbolTradisi: 'Ujuba / Donga Pangestu Kejawen',
    pandanganPraIslam: 'Membaca mantra-mantra kuno pemanggil energi kosmik gaib.',
    kacamataFikihModerat: 'Digubah secara arif oleh para Wali Songo menjadi majelis dzikir, pembacaan Surah Yasin, Tahlil, Tahmid, Istighfar, Shalawat Nabi, serta Doa Selamat berbahasa Arab dan Jawa yang seluruhnya ditujukan kepada Allah SWT.',
    dalilHadits: {
      teksArab: 'لَا يَقْعُدُ قَوْمٌ يَذْكُرُونَ اللَّهَ عَزَّ وَجَلَّ إِلَّا حَفَّتْهُمُ الْمَلَائِكَةُ، وَغَشِيَتْهُمُ الرَّحْمَةُ',
      terjemahan: 'Tidaklah suatu kaum duduk berkumpul seraya berdzikir mengingat Allah \'Azza wa Jalla, melainkan malaikat akan menaungi mereka dan rahmat akan melimpahi mereka.',
      sumber: 'HR. Muslim no. 2700'
    },
    kaidahFiqih: 'تَصَرُّفُ الإِمَامِ عَلَى الرَّعِيَّةِ مَنُوطٌ بِالمَصْلَحَةِ & Kaidah Dakwah Bil-Hikmah (Mengisi wadah budaya dengan substansi wahyu syariat).',
    statusHukum: 'Sunnah Muakkadah',
    rekomendasiPurifikasi: 'Menghindari lafal-lafal yang mengandung permohonan syafaat kepada selain Allah dan Rasul-Nya.'
  },
  {
    id: 'slametan-aspek-4',
    aspek: 'Fungsi Sosial & Kerukunan Warga',
    simbolTradisi: 'Berbagi Berkat / Besek & Gotong Royong',
    pandanganPraIslam: 'Ikatan komunal desa berbasis solidaritas agraris lokal.',
    kacamataFikihModerat: 'Manifestasi nyata dari prinsip ukhuwah Islamiyah, silaturahmi antar-tetangga (haqqul jiwar), pemerataan makanan bagi kaum dhuafa, serta semangat ta\'awun (tolong-menolong dalam kebaikan).',
    dalilHadits: {
      teksArab: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ جَارَهُ',
      terjemahan: 'Barangsiapa beriman kepada Allah dan Hari Akhir, maka hendaklah ia memuliakan tetangganya.',
      sumber: 'HR. Bukhari no. 6018 & Muslim no. 47'
    },
    kaidahFiqih: 'دَرْءُ المَفَاسِدِ مُقَدَّمٌ عَلَى جَلْبِ المَصَالِحِ (Menolak perpecahan warga dan mempererat persaudaraan sosial adalah mashlahat mu\'tabarah).',
    statusHukum: 'Sunnah / Mubah Bernilai Pahala',
    rekomendasiPurifikasi: 'Jangan ada diskriminasi dalam membagikan berkat kepada yang membutuhkan.'
  },
  {
    id: 'slametan-aspek-5',
    aspek: 'Waktu Penyelenggaraan Acara',
    simbolTradisi: 'Slametan Weton, 7 Bulanan, Geblak Leluhur',
    pandanganPraIslam: 'Menghindari siklus hari naas dan tanggal keramat kutukan.',
    kacamataFikihModerat: 'Sebagai sarana momentum muhasabah usia (weton kelahiran), doa keselamatan bagi ibu & calon bayi (tingkeban/mitoni), serta bakti anak mendoakan orang tua yang telah wafat (birrul walidain). Waktu bersifat mubah dan fleksibel.',
    dalilHadits: {
      teksArab: 'إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ',
      terjemahan: 'Jika manusia meninggal dunia, terputuslah seluruh amalnya kecuali tiga perkara: sedekah jariyah, ilmu yang bermanfaat, atau anak saleh yang mendoakannya.',
      sumber: 'HR. Muslim no. 1631'
    },
    kaidahFiqih: 'الأَصْلُ فِي الأَشْيَاءِ الإِبَاحَةُ حَتَّى يَدُلَّ الدَّلِيلُ عَلَى التَّحْرِيمِ (Hukum asal segala tradisi duniawi adalah mubah sampai ada dalil tegas yang mengharamkannya).',
    statusHukum: 'Mubah (Urf Shahih)',
    rekomendasiPurifikasi: 'Tidak meyakini bahwa keterlambatan atau ketiadaan slametan akan otomatis menimbulkan musibah azab.'
  }
];

export const DAFTAR_JENIS_SLAMETAN_MODERAT: JenisSlametanModeratItem[] = [
  {
    id: 'jenis-1',
    namaTradisi: 'Slametan Weton / Wiyosan (Ulang Tahun Jawa)',
    istilahIslami: 'Tasyakkur Milad & Muhasabah Umur',
    tujuanUtama: 'Mensyukuri karunia nafas kehidupan, memohon perlindungan dari watak buruk, serta introspeksi amal kebajikan.',
    waktuPelaksanaan: 'Setiap siklus 35 hari sekali bertepatan dengan dina dan pasaran kelahiran.',
    ubarampeSimbolik: [
      {
        nama: 'Jenang Sengkolo (Merah & Putih)',
        maknaBudaya: 'Penolak sengkala naas kelahiran.',
        reinterpretasiSyarie: 'Simbol rasa syukur atas berkah jasmani dan rohani serta doa restu orang tua (darah merah ibu & benih putih ayah).'
      },
      {
        nama: 'Tumpeng Gudhangan / Urap',
        maknaBudaya: 'Kelimpahan hasil bumi.',
        reinterpretasiSyarie: 'Sedekah sayur-mayur segar yang menyehatkan bagi para tetangga sebagai bentuk shadaqah ath\'imah.'
      }
    ],
    susunanDoaDanAmalan: [
      'Puasa sunnah pada hari weton kelahiran (mengikuti sunnah Rasulullah SAW berpuasa Senin)',
      'Membaca Surah Al-Fatihah, Al-Ikhlas, Al-Falaq, An-Nas, dan Ayat Kursi',
      'Membaca Dzikir Istighfar 100x dan Shalawat Nabi',
      'Berbagi sedekah makanan kepada anak yatim atau tetangga terdekat'
    ],
    pandanganFikihWasathiyah: 'Ulama memperbolehkan tasyakuran weton jika diisi dengan amalan syar\'i seperti puasa sunnah, sedekah makanan, dan istighfar memohon panjang umur dalam ketaatan.',
    haditsRujukan: 'HR. Muslim no. 1162: Rasulullah SAW ditanya tentang puasa hari Senin, beliau bersabda: "Itu adalah hari aku dilahirkan dan hari aku diutus atau diturunkan wahyu kepadaku."'
  },
  {
    id: 'jenis-2',
    namaTradisi: 'Tingkeban / Mitoni (7 Bulanan Kehamilan)',
    istilahIslami: 'Tasyakuran Walimatul Hamli',
    tujuanUtama: 'Memohon kelancaran persalinan, keselamatan ibu dan janin, serta dikaruniai keturunan yang saleh-salehah.',
    waktuPelaksanaan: 'Saat usia kehamilan genap memasuki bulan ke-7.',
    ubarampeSimbolik: [
      {
        nama: 'Rujak 7 Rupa',
        maknaBudaya: 'Harapan rasa manis kehidupan bayi.',
        reinterpretasiSyarie: 'Sedekah buah-buahan segar bervitamin tinggi kepada ibu hamil dan para tetangga.'
      },
      {
        nama: 'Cengkir Gading Bergambar Tokoh Wayang Baik (Kamajaya & Ratih)',
        maknaBudaya: 'Harapan anak berwajah rupawan.',
        reinterpretasiSyarie: 'Simbol doa tafa\'ul agar anak kelak berakhlak mulia, tampan budi pekertinya seperti Nabi Yusuf AS atau salihah seperti Sayyidah Maryam.'
      }
    ],
    susunanDoaDanAmalan: [
      'Pembacaan Surah Yusuf (doa ketampanan akhlak) dan Surah Maryam (doa kemudahan persalinan)',
      'Pembacaan Surah Luqman (doa keteguhan akidah dan bakti orang tua)',
      'Doa Walimatul Hamli memohon anak yang shalih dan sehat wal afiat',
      'Sedekah jamuan makanan kepada kaum dhuafa dan kerabat'
    ],
    pandanganFikihWasathiyah: 'Tradisi ini dikategorikan sebagai Urf Shahih (tradisi baik) yang selaras dengan anjuran syariat untuk mendoakan kebaikan janin saat peniupan ruh dan penyempurnaan rupa di dalam rahim.',
    haditsRujukan: 'HR. Bukhari no. 3208 & Muslim no. 2643 mengenai tahapan penciptaan janin dan peniupan ruh oleh malaikat.'
  },
  {
    id: 'jenis-3',
    namaTradisi: 'Tedhak Siten (Turun Tanah Bayi)',
    istilahIslami: 'Tasyakkur Langkah Awal Anak',
    tujuanUtama: 'Syukur saat balita mulai belajar menapakkan kaki di bumi dan doa agar mandiri mengarungi kehidupan.',
    waktuPelaksanaan: 'Saat anak berusia 7 lapan (sekitar 245 hari atau 8 bulan).',
    ubarampeSimbolik: [
      {
        nama: 'Jadah 7 Warna',
        maknaBudaya: 'Melewati 7 rintangan kehidupan.',
        reinterpretasiSyarie: 'Pelajaran tafa\'ul dan doa agar anak diberi ketabahan, tawakkal, dan istiqamah dalam menghadapi lika-liku ujian dunia.'
      },
      {
        nama: 'Kurungan Ayam Berisi Buku, Al-Qur\'an, Alat Tulis',
        maknaBudaya: 'Memilih bakat masa depan anak.',
        reinterpretasiSyarie: 'Stimulasi motorik positif dan doa agar anak mencintai ilmu agama, Al-Qur\'an, dan kecakapan berikhtiar halal.'
      }
    ],
    susunanDoaDanAmalan: [
      'Pembacaan Shalawat Thibbil Qulub dan Shalawat Nariyah',
      'Doa perlindungan anak (U\'idzukuma bikalimatillahit tammah)',
      'Sedekah uang receh dan beras kuning (udik-udik) kepada anak-anak kecil sebagai sarana sedekah gembira'
    ],
    pandanganFikihWasathiyah: 'Merupakan ekspresi kegembiraan mendidik anak (tarbiyatul aulad) yang diisi dengan doa dan sedekah, diakomodasi sebagai budaya mendidik anak yang penuh kehangatan keluarga.',
    haditsRujukan: 'HR. Tirmidzi no. 2060: Rasulullah SAW mendoakan perlindungan bagi Hasan dan Husain saat masih kecil.'
  },
  {
    id: 'jenis-4',
    namaTradisi: 'Slametan Boyongan (Pindah Rumah Baru)',
    istilahIslami: 'Tasyakkur Walimatul Wakirah',
    tujuanUtama: 'Mensyukuri tempat tinggal baru, membersihkan hunian dari energi negatif, dan memohon keberkahan tetangga.',
    waktuPelaksanaan: 'Sebelum atau saat menempati rumah baru.',
    ubarampeSimbolik: [
      {
        nama: 'Lampu Ublik / Lentera Menyala',
        maknaBudaya: 'Penerang rumah baru.',
        reinterpretasiSyarie: 'Simbol niat agar rumah senantiasa disinari cahaya iman, shalat berjamaah, dan tilawah Al-Qur\'an.'
      },
      {
        nama: 'Kendi Berisi Air Bersih',
        maknaBudaya: 'Kesejukan penghuni rumah.',
        reinterpretasiSyarie: 'Simbol keberkahan rezeki halal yang mengalir dan menyejukkan hati seluruh anggota keluarga.'
      }
    ],
    susunanDoaDanAmalan: [
      'Membaca Surah Al-Baqarah secara utuh di dalam rumah baru untuk membentengi dari gangguan setan',
      'Mengumandangkan Adzan dan Iqamah di sudut-sudut ruangan',
      'Shalat sunnah 2 rakaat di dalam rumah baru',
      'Mengundang tetangga sekitar untuk makan bersama (Walimatul Wakirah)'
    ],
    pandanganFikihWasathiyah: 'Dalam Fiqh Islam, jamuan menempati rumah baru memiliki nama khusus yakni "Walimah Al-Wakirah" yang hukumnya sunnah/mustahab menurut kesepakatan empat mazhab.',
    haditsRujukan: 'HR. Muslim no. 780: "Jangan jadikan rumah-rumah kalian seperti kuburan, sesungguhnya setan lari dari rumah yang di dalamnya dibacakan Surah Al-Baqarah."'
  },
  {
    id: 'jenis-5',
    namaTradisi: 'Slametan Haul / Geblak / Kirim Doa Leluhur',
    istilahIslami: 'Dzikrul Maut & Birrul Walidain Lil-Amwat',
    tujuanUtama: 'Mendoakan ampunan arwah orang tua/leluhur serta pengingat diri akan kepastian hari akhirat.',
    waktuPelaksanaan: 'Pada hari peringatan wafat (1 tahun, 2 tahun, 1000 hari) atau bulan Ruwah/Sya\'ban.',
    ubarampeSimbolik: [
      {
        nama: 'Apem, Pasung, Kolak, Ketan',
        maknaBudaya: 'Sesaji bulan ruwah.',
        reinterpretasiSyarie: 'Apem berasal dari kata \'Afwun (mohon ampunan Allah), Ketan dari kata Khatha\'an (pengakuan atas khilaf/dosa), dan Kolak dari kata Khalaqa (mengingat Sang Pencipta).'
      }
    ],
    susunanDoaDanAmalan: [
      'Pembacaan Tahlil, Tahmid, Tasbih, dan Kalimah Thayyibah',
      'Khataman Al-Qur\'an atau membaca Surah Yasin',
      'Doa khusus ampunan arwah (Allahummaghfir lahum warhamhum)',
      'Sedekah jariyah atas nama almarhum/almarhumah'
    ],
    pandanganFikihWasathiyah: 'Mayoritas ulama Ahlussunnah wal Jama\'ah memfatwakan bahwa pahala sedekah makanan dan doa istighfar yang diniatkan untuk orang tua yang telah meninggal dunia sampai dan bermanfaat bagi almarhum.',
    haditsRujukan: 'HR. Abu Dawud no. 2875: Seorang sahabat bertanya: "Wahai Rasulullah, sesungguhnya ibuku telah meninggal dunia, apakah bermanfaat jika aku bersedekah atas namanya?" Beliau menjawab: "Ya."'
  }
];

// ----------------------------------------------------------------------------
// 1. DAFTAR 5 KAIDAH FIQHIYYAH UTAMA (AL-QAWA'ID AL-FIQHIYYAH AL-KHAMS)
// ----------------------------------------------------------------------------
export const DAFTAR_KAIDAH_FIQHIYYAH: KaidahFiqihItem[] = [
  {
    id: 'kaidah-1',
    namaKaidahArab: 'الأُمُورُ بِمَقَاصِدِهَا',
    transliterasi: "Al-Umuru bi Maqashidiha",
    terjemahan: "Segala urusan bergantung pada niat dan tujuannya.",
    maknaDasar: "Hukum suatu perbuatan dalam Islam sangat ditentukan oleh motivasi, keyakinan batin, dan tujuan pelakunya di hadapan Allah SWT.",
    penerapanDalamPetung: "Jika membuka primbon/weton diniatkan sebagai ikhtiar ilmiah, kehati-hatian (ihtiyath), dan sarana muhasabah, hukumnya mubah. Namun jika diyakini memiliki kekuatan otonom yang mendahului takdir Allah, hal itu jatuh pada syirik. Niatkan selalu sebagai ikhtiar lahiriah semata.",
    contohKonkret: "Melihat hari baik untuk menikah dengan niat mencari kesiapan mental, keluarga, dan waktu luang tamu undangan, seraya memohon keberkahan hanya kepada Allah SWT."
  },
  {
    id: 'kaidah-2',
    namaKaidahArab: 'العَادَةُ مُحَكَّمَةٌ',
    transliterasi: "Al-'Adatu Muhakkamah",
    terjemahan: "Adat kebiasaan ('Urf) dapat dijadikan sebagai pertimbangan hukum.",
    maknaDasar: "Tradisi masyarakat yang telah mengakar, membawa kemaslahatan, dan tidak bertentangan dengan nash Al-Qur'an dan As-Sunnah diakui sebagai 'urf shahih.",
    penerapanDalamPetung: "Penghitungan weton, penanggalan Sultan Agung 1633 M, dan pranata mangsa merupakan akumulasi kearifan lokal ('urf shahih) dalam mengorganisasi kehidupan sosial, pertanian, dan kekerabatan masyarakat Nusantara.",
    contohKonkret: "Tradisi musyawarah keluarga menentukan hari pernikahan dengan mempertimbangkan neptu sebagai penghormatan kepada sesepuh tanpa merusak aqidah."
  },
  {
    id: 'kaidah-3',
    namaKaidahArab: 'دَرْءُ المَفَاسِدِ مُقَدَّمٌ عَلَى جَلْبِ المَصَالِحِ',
    transliterasi: "Dar'ul Mafasid Muqaddamun 'Ala Jalbil Mashalih",
    terjemahan: "Menolak mafsadat (kerusakan/bahaya) lebih didahulukan daripada meraih maslahat.",
    maknaDasar: "Prioritas utama syariat adalah menjaga keselamatan jiwa, agama, akal, keturunan, dan harta dari potensi bahaya sebelum mengejar keuntungan.",
    penerapanDalamPetung: "Konsep hari naas atau pantangan naga dina dalam falsafah Jawa selaras dengan prinsip manajemen risiko (mitigasi). Seseorang dianjurkan lebih berhati-hati, menunda keputusan gegabah, dan memperbanyak doa perlindungan.",
    contohKonkret: "Menunda perjalanan jauh pada hari yang diprediksi berisiko cuaca buruk atau kondisi fisik kurang prima, lalu memperbanyak istighfar dan sedekah."
  },
  {
    id: 'kaidah-4',
    namaKaidahArab: 'اليَقِينُ لَا يُزَالُ بِالشَّكِّ',
    transliterasi: "Al-Yaqinu La Yuzalu bi Asy-Syakk",
    terjemahan: "Keyakinan tidak dapat dihilangkan oleh keraguan.",
    maknaDasar: "Prinsip kepastian tauhid bahwa segala manfaat dan mudharat berada mutlak di tangan Allah SWT tidak boleh goyah oleh dugaan ramalan.",
    penerapanDalamPetung: "Hasil hitungan weton yang menunjukkan angka kurang harmonis (misal sisa Padu atau Sujanan) berstatus dugaan/indikator (zhann). Keyakinan bahwa Allah Maha Pengasih dan Pengabul Doa harus tetap menjadi pegangan utama melalui doa dan ikhtiar.",
    contohKonkret: "Meskipun hasil petung jodoh menuntut kehati-hatian, pasangan tetap melanjutkan niat suci ibadah nikah dengan bekal istikharah dan komitmen takwa."
  },
  {
    id: 'kaidah-5',
    namaKaidahArab: 'لَا ضَرَرَ وَلَا ضِرَارَ',
    transliterasi: "La Dharara wa La Dhirar",
    terjemahan: "Tidak boleh berbuat bahaya dan tidak boleh saling membahayakan.",
    maknaDasar: "Syariat melarang segala tindakan yang merugikan diri sendiri maupun merugikan pihak lain baik fisik, mental, maupun finansial.",
    penerapanDalamPetung: "Menolak pembatalan sepihak pernikahan yang sah hanya karena dogma petung yang kaku jika hal tersebut mendatangkan aib, fitnah, dan permusuhan antar keluarga muslim.",
    contohKonkret: "Mencari solusi win-win melalui ruwatan sedekah adat yang islami (santunan anak yatim & doa bersama) demi menjaga silaturahmi kedua belah pihak keluarga."
  }
];

// ----------------------------------------------------------------------------
// 2. DAFTAR HADITS SHAHIH & KONTEKSTUALISASI PETUNG
// ----------------------------------------------------------------------------
export const DAFTAR_HADITS_PETUNG: HaditsNabiItem[] = [
  {
    id: 'hadits-1',
    judul: 'Larangan Tathayyur (Sial Buta) & Anjuran Tafa\'ul (Optimisme)',
    tema: 'Tafaul vs Thiyarah',
    teksArab: 'لَا عَدْوَى وَلَا طِيَرَةَ، وَيُعْجِبُنِي الْفَأْلُ الصَّالِحُ: الْكَلِمَةُ الْحَسَنَةُ',
    transliterasi: "La 'adwa wa la thiyarah, wa yu'jibuni al-fa'lu ash-shalih: al-kalimatu al-hasanah.",
    terjemahan: "Tidak ada penularan penyakit (tanpa kehendak Allah) dan tidak ada thiyarah (anggapan sial karena pertanda alam/hari), dan aku mengagumi al-fa'l yang baik, yaitu kalimat yang baik dan penuh harapan.",
    perawi: 'HR. Bukhari no. 5776 & Muslim no. 2224 (dari Sahabat Anas bin Malik RA)',
    derajatHadits: 'Shahih Bukhari & Muslim',
    kontekstualisasiPetung: "Umat Islam dilarang meyakini bahwa hari atau angka tertentu memiliki daya mencelakakan secara mandiri (thiyarah). Primbon hendaknya diposisikan sebagai 'Tafa'ul' (optimisme mencari kebaikan, menyusun strategi, dan merapalkan doa-doa terbaik).",
    kaidahTerkait: "Al-Umuru bi Maqashidiha & Al-Yaqinu La Yuzalu bi Asy-Syakk"
  },
  {
    id: 'hadits-2',
    judul: 'Kewajiban Mengikat Unta (Ikhtiar Nyata) Sebelum Bertawakkal',
    tema: 'Ikhtiar & Takdir',
    teksArab: 'قَالَ رَجُلٌ: يَا رَسُولَ اللَّهِ أَعْقِلُهَا وَأَتَوَكَّلُ، أَوْ أُطْلِقُهَا وَأَتَوَكَّلُ؟ قَالَ: «اعْقِلْهَا وَتَوَكَّلْ»',
    transliterasi: "Qala rajulun: Ya Rasulallah, a'qiluha wa atawakkalu, aw utliquha wa atawakkalu? Qala: 'I'qilha wa tawakkal.'",
    terjemahan: "Seorang sahabat bertanya: 'Wahai Rasulullah, apakah aku ikat untaku lalu bertawakkal, atau aku lepaskan saja lalu bertawakkal?' Rasulullah SAW bersabda: 'Ikatlah untamu terlebih dahulu, kemudian bertawakkallah!'",
    perawi: 'HR. At-Tirmidzi no. 2517 (dari Anas bin Malik RA)',
    derajatHadits: 'Hasan Shahih',
    kontekstualisasiPetung: "Perhitungan weton, pembacaan watak kepribadian, dan analisis kecocokan waktu adalah representasi 'mengikat unta'—ikhtiar kognitif manusia mengenali potensi risiko dan karakter sebelum memasrahkan hasil akhir (tawakkal) kepada Allah SWT.",
    kaidahTerkait: "Dar'ul Mafasid Muqaddamun 'Ala Jalbil Mashalih"
  },
  {
    id: 'hadits-3',
    judul: 'Kriteria Memilih Pasangan Hidup (Kafa\'ah & Kesalehan Agama)',
    tema: 'Pernikahan & Kafaah',
    teksArab: 'تُنْكَحُ الْمَرْأَةُ لِأَرْبَعٍ: لِمَالِهَا، وَلِحَسَبِهَا، وَلِجَمَالِهَا، وَلِدِينِهَا، فَاظْفَرْ بِذَاتِ الدِّينِ تَرِبَتْ يَدَاكَ',
    transliterasi: "Tunkahu al-mar'atu li arba'in: li maliha, wa li hasabiha, wa li jamaliha, wa li diniha, fazhfar bi dzati ad-dini taribat yadak.",
    terjemahan: "Wanita dinikahi karena empat perkara: karena hartanya, keturunannya, kecantikannya, dan agamanya. Maka pilihlah wanita yang memiliki komitmen agama, niscaya engkau akan beruntung.",
    perawi: 'HR. Bukhari no. 5090 & Muslim no. 1466 (dari Abu Hurairah RA)',
    derajatHadits: 'Shahih Bukhari & Muslim',
    kontekstualisasiPetung: "Petung jodoh Salaki-Rabi memberikan gambaran psikologis dan latar belakang watak dasar pasangan. Dalam syariat, variabel agama dan akhlak adalah penentu mutlak yang dapat melengkapi dan menyempurnakan kelemahan watak hasil petung.",
    kaidahTerkait: "Al-Umuru bi Maqashidiha"
  },
  {
    id: 'hadits-4',
    judul: 'Sedekah Sebagai Perisai Tolak Bala & Pemadam Murka',
    tema: 'Sedekah Tolak Bala',
    teksArab: 'الصَّدَقَةُ تَسُدُّ سَبْعِينَ بَابًا مِنَ السُّوءِ، وَإِنَّ الصَّدَقَةَ لَتُطْفِئُ غَضَبَ الرَّبِّ وَتَدْفَعُ مِيتَةَ السُّوءِ',
    transliterasi: "Ash-shadaqatu tasuddu sab'ina baban minas-su'i, wa innash-shadaqata latuthfi'u ghadhabar-Rabbi wa tadfa'u mitatas-su'.",
    terjemahan: "Sedekah menutup tujuh puluh pintu keburukan, memadamkan kemurkaan Tuhan, dan menolak kematian yang buruk (su'ul khatimah).",
    perawi: 'HR. At-Tirmidzi no. 664 & Al-Baihaqi no. 7340',
    derajatHadits: 'Hasan Shahih',
    kontekstualisasiPetung: "Tradisi selamatan, bancakan weton, dan ubarampe ruwatan dalam budaya Jawa bermutasi secara substansial dalam Islam menjadi ibadah sedekah makanan dan santunan fakir miskin yang bernilai pahala dan menolak bala bencana.",
    kaidahTerkait: "Dar'ul Mafasid Muqaddamun 'Ala Jalbil Mashalih"
  },
  {
    id: 'hadits-5',
    judul: 'Keberkahan Waktu Pagi Hari dalam Menjemput Rezeki',
    tema: 'Rezeki & Waktu Berkah',
    teksArab: 'اللَّهُمَّ بَارِكْ لِأُمَّتِي فِي بُكُورِهَا',
    transliterasi: "Allahumma barik li-ummati fi bukuriha.",
    terjemahan: "Ya Allah, limpahkanlah keberkahan bagi umatku pada waktu pagi hari mereka.",
    perawi: 'HR. Abu Dawud no. 2606, At-Tirmidzi no. 1212, & Ibnu Majah no. 2236 (dari Shakhr Al-Ghamidi RA)',
    derajatHadits: 'Shahih Abu Dawud',
    kontekstualisasiPetung: "Petung jam berkah pagi hari (Naga Dina & Pal Srigati) selaras penuh dengan sunnah Nabi SAW yang mendoakan keberkahan khusus bagi siapa saja yang memulai ikhtiar perniagaan dan pencarian nafkah sejak fajar merekah.",
    kaidahTerkait: "Al-'Adatu Muhakkamah"
  },
  {
    id: 'hadits-6',
    judul: 'Doa Keluar Rumah Menyerahkan Perlindungan Mutlak',
    tema: 'Rezeki & Waktu Berkah',
    teksArab: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliterasi: "Bismillahi tawakkaltu 'alallah, la hawla wa la quwwata illa billah.",
    terjemahan: "Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah semata.",
    perawi: 'HR. Abu Dawud no. 5095 & At-Tirmidzi no. 3426 (dari Anas bin Malik RA)',
    derajatHadits: 'Shahih Tirmidzi',
    kontekstualisasiPetung: "Ketika seseorang melangkahkan kaki keluar rumah menuju arah rezeki (arah sandang pangan), ucapan doa tawakal ini menjadi perisai utama yang mengalahkan segala mitos ketakutan arah naga dina.",
    kaidahTerkait: "Al-Umuru bi Maqashidiha"
  },
  {
    id: 'hadits-7',
    judul: 'Shalat Istikharah Memohon Pilihan Terbaik dari Sang Maha Tahu',
    tema: 'Istikharah & Doa',
    teksArab: 'كَانَ رَسُولُ اللَّهِ ﷺ يُعَلِّمُنَا الِاسْتِخَارَةَ فِي الْأُمُورِ كُلِّهَا كَمَا يُعَلِّمُنَا السُّورَةَ مِنَ الْقُرْآنِ',
    transliterasi: "Kana Rasulullahi shallallahu 'alaihi wa sallama yu'allimuna al-istikharata fil umuri kulliha kama yu'allimuna as-surata minal Qur'an.",
    terjemahan: "Rasulullah SAW senantiasa mengajarkan kami shalat istikharah dalam segala urusan sebagaimana beliau mengajarkan surah dari Al-Qur'an.",
    perawi: 'HR. Bukhari no. 1162 (dari Jabir bin Abdullah RA)',
    derajatHadits: 'Shahih Bukhari',
    kontekstualisasiPetung: "Istikharah adalah mahkota penentu bagi seorang muslim setelah mempelajari data petung weton dan bermusyawarah, menyerahkan keputusan final kepada bimbingan wahyu ilahi.",
    kaidahTerkait: "Al-Yaqinu La Yuzalu bi Asy-Syakk"
  }
];

// ----------------------------------------------------------------------------
// 3. FATWA & PANDANGAN ULAMA NUSANTARA TERHADAP ILMU PETUNG
// ----------------------------------------------------------------------------
export const DAFTAR_FATWA_ULAMA: FatwaPandanganUlama[] = [
  {
    id: 'fatwa-1',
    tokohAtauLembaga: 'Sultan Agung Hanyakrakusuma (1613-1645 M)',
    eraAtauKitab: 'Kraton Mataram Islam (1633 M / 1043 H / 1555 Jawa)',
    judulPandangan: 'Sintesis Kalender Jawa-Hijriah: Harmonisasi Adat dan Syariat',
    ringkasanFatwa: 'Menyatukan sistem penanggalan Saka Jawa yang berpusat pada Matahari dengan penanggalan Hijriah yang berpusat pada Bulan (Qamariyah). Hal ini membuktikan bahwa peradaban Islam di Jawa tidak menghapus kearifan lokal, melainkan mengislamkannya agar ibadah seperti Puasa, Maulid (Sekaten), dan 1 Sura (Muharram) berjalan serentak dalam satu kesatuan tauhid.',
    kutipanHikmah: '"Agama ageming aji, laku jujur dadi pandoming gesang."'
  },
  {
    id: 'fatwa-2',
    tokohAtauLembaga: 'Muktamar Nahdlatul Ulama (NU)',
    eraAtauKitab: 'Keputusan Muktamar NU Ke-1 di Surabaya (1926) & Bahtsul Masail',
    judulPandangan: 'Status Hukum Memilih Hari Baik Menurut Falak dan Etnosains',
    ringkasanFatwa: 'Memilih hari baik untuk bepergian, berdagang, atau menikah diperbolehkan (mubah/jawaz) apabila didasarkan pada ilmu hisab, pengalaman statistik (tajribah), atau tradisi kebaikan (tafa\'ul), dengan syarat tidak meyakini bahwa hari tersebut secara hakiki menciptakan kebaikan atau keburukan tanpa izin Allah SWT.',
    kutipanHikmah: '"Segala hari diciptakan Allah adalah baik. Memilih waktu terbaik adalah bagian dari ketertiban ikhtiar insaniyah."'
  },
  {
    id: 'fatwa-3',
    tokohAtauLembaga: 'K.H. Ahmad Dahlan (Pendiri Muhammadiyah)',
    eraAtauKitab: 'Majelis Tarjih Muhammadiyah',
    judulPandangan: 'Purifikasi Aqidah dan Rasionalitas Ikhtiar Waktu',
    ringkasanFatwa: 'Menekankan pentingnya membebaskan akidah umat dari takhayul dan khurafat (tathayyur). Perhitungan hari tidak boleh dijadikan doktrin yang membatalkan syariat sahnya pernikahan atau menimbulkan ketakutan gaib yang melumpuhkan produktivitas.',
    kutipanHikmah: '"Jadikan Al-Qur\'an dan Sunnah sebagai suluh utama dalam melangkah, gunakan ilmu pengetahuan untuk kemajuan peradaban."'
  },
  {
    id: 'fatwa-4',
    tokohAtauLembaga: 'Syaikh Nawawi Al-Bantani',
    eraAtauKitab: 'Kitab Nihayatuz Zain fi Irsyadil Mubtadi-in',
    judulPandangan: 'Hukum Menghitung Waktu Berdasar Tajribah (Eksperiensial)',
    ringkasanFatwa: 'Menjelaskan bahwa penggunaan hitungan hari yang bersumber dari catatan empiris para ulama dan ahli falak masa lalu diperbolehkan sebagai sarana mengambil kehati-hatian, selama hati tetap bersandar teguh pada Rububiyyah dan Takdir Allah SWT.',
    kutipanHikmah: '"Yang tercela adalah keyakinan bahwa hari itu berkuasa mandiri, bukan ikhtiar meneliti perputaran zaman."'
  }
];

// ----------------------------------------------------------------------------
// 4. DAFTAR AMALAN ISLAMI PENYEIMBANG & PENOLAK BALA (MITIGASI SYAR'I)
// ----------------------------------------------------------------------------
export const DAFTAR_AMALAN_ISLAMI: AmalanIslamiMitigasi[] = [
  {
    id: 'amalan-1',
    namaAmalan: 'Sedekah Subuh & Makanan (Pengganti Bancakan Sengkala)',
    tujuan: 'Menolak bala, membuka pintu rezeki berkah, dan menyucikan harta.',
    dalilDasar: 'HR. Bukhari no. 1442 (Dua Malaikat mendoakan orang yang bersedekah di waktu subuh).',
    bacaanDoaArab: 'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    artiDoa: 'Ya Tuhan kami, terimalah amal dari kami. Sungguh Engkaulah Yang Maha Mendengar lagi Maha Mengetahui.',
    tataCara: 'Memberikan makanan atau sedekah uang tunai kepada dhuafa/anak yatim pada hari kelahiran (weton) atau sebelum hajatan besar.',
    waktuPelaksanaan: 'Setiap pagi subuh atau pada hari pasaran weton kelahiran.'
  },
  {
    id: 'amalan-2',
    namaAmalan: 'Shalat Sunnah Istikharah & Hajat',
    tujuan: 'Memohon petunjuk kepastian ilahi dan kelancaran hajat pernikahan atau usaha.',
    dalilDasar: 'HR. Bukhari no. 1162 & HR. Tirmidzi no. 479.',
    bacaanDoaArab: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
    artiDoa: 'Ya Allah, sesungguhnya aku memohon petunjuk kebaikan dengan ilmu-Mu, dan memohon kemampuan dengan kodrat-Mu, serta memohon karunia-Mu yang agung.',
    tataCara: 'Shalat sunnah 2 rakaat di sepertiga malam terakhir, dilanjutkan membaca doa istikharah lengkap.',
    waktuPelaksanaan: 'Saat merencanakan keputusan besar (khitbah, akad, pindah rumah, buka usaha).'
  },
  {
    id: 'amalan-3',
    namaAmalan: 'Membaca Dzikir Perlindungan Pagi & Petang (Al-Ma\'tsurat)',
    tujuan: 'Membentengi diri dari marabahaya, sihir, hasad, dan keraguan nasib.',
    dalilDasar: 'HR. Abu Dawud no. 5088 & At-Tirmidzi no. 3604.',
    bacaanDoaArab: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ (٣×)',
    artiDoa: 'Dengan nama Allah yang bersama nama-Nya tidak ada sesuatu pun di bumi maupun di langit yang dapat mendatangkan bahaya. Dan Dia Maha Mendengar lagi Maha Mengetahui (dibaca 3 kali).',
    tataCara: 'Dibaca rutin 3 kali setelah shalat Subuh dan setelah shalat Ashar/Maghrib.',
    waktuPelaksanaan: 'Pagi dan petang setiap hari.'
  },
  {
    id: 'amalan-4',
    namaAmalan: 'Puasa Sunnah Weton / Puasa Daud / Senin-Kamis',
    tujuan: 'Tazkiyatun nafs (penyucian jiwa), melatih sabar, dan meredam hawa nafsu watak buruk.',
    dalilDasar: 'HR. Muslim no. 1162 (Rasulullah SAW berpuasa pada hari Senin karena itu hari kelahirannya).',
    bacaanDoaArab: 'نَوَيْتُ صَوْمَ يَوْمِ الإِثْنَيْنِ / الْخَمِيسِ سُنَّةً لِلَّهِ تَعَالَى',
    artiDoa: 'Aku berniat puasa sunnah hari Senin/Kamis karena Allah Ta\'ala.',
    tataCara: 'Berpuasa sunnah dengan niat ibadah taqarrub kepada Allah SWT pada hari weton kelahiran atau Senin-Kamis.',
    waktuPelaksanaan: 'Pada hari weton kelahiran pribadi atau puasa sunnah reguler.'
  }
];
