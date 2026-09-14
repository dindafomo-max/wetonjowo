import { HariJawa, PasaranJawa } from '../types/weton';

export interface WiridItem {
  id: string;
  judul: string;
  lafalArab: string;
  transliterasi: string;
  terjemahan: string;
  jumlah: string;
  fadhilah: string;
  waktuPelaksanaan: string;
  rujukanKitab: string;
}

export interface WiridHariSaptawara {
  hari: HariJawa;
  hariMasehi: string;
  elemenJawa: string;
  neptu: number;
  karakterSpiritual: string;
  wiridUtama: WiridItem[];
  doaHarianKhusus: {
    judul: string;
    lafalArab: string;
    transliterasi: string;
    terjemahan: string;
    penjelasanPesantren: string;
  };
  amalanSunnahDianjurkan: string[];
  korelasiPenanggalanJawa: string;
}

export interface WiridPasaranPancawara {
  pasaran: PasaranJawa;
  neptu: number;
  arahDuduk: string;
  elemenKosmis: string;
  warnaAura: string;
  fokusPenyelarasanBatin: string;
  asmaulHusnaUtama: WiridItem;
  amalanKekuatanHati: string;
  nasihatKiaiSepuh: string;
}

export interface PaketWiridWetonKhusus {
  hari: HariJawa;
  pasaran: PasaranJawa;
  totalNeptu: number;
  kunciDzikirHarian: string;
  wiridPagiPetang: string[];
  doaMunajatKhusus: {
    nama: string;
    arab: string;
    latin: string;
    arti: string;
  };
  panduanPuasaWetonSyarie: string;
  pesanSpiritual: string;
}

// ---------------------------------------------------------------------------
// 1. DAFTAR WIRID 7 HARI (SAPTAWARA) TRADISI PESANTREN NUSANTARA
// ---------------------------------------------------------------------------
export const DAFTAR_WIRID_SAPTAWARA: WiridHariSaptawara[] = [
  {
    hari: 'Ahad',
    hariMasehi: 'Minggu',
    elemenJawa: 'Surya / Panon',
    neptu: 5,
    karakterSpiritual: 'Awal permulaan ciptaan, keteguhan azam, dan cahaya ilmu hakiki.',
    wiridUtama: [
      {
        id: 'ahad-1',
        judul: 'Wirid Asmaul Husna: Ya Hayyu Ya Qayyum',
        lafalArab: 'يَا حَيُّ يَا قَيُّومُ لَا إِلٰهَ إِلَّا أَنْتَ',
        transliterasi: "Ya Hayyu Ya Qayyum, la ilaha illa Anta",
        terjemahan: 'Wahai Yang Maha Hidup, wahai Yang Berdiri Sendiri, tiada Tuhan yang berhak disembah selain Engkau.',
        jumlah: '100x atau 313x (Ba’da Subuh / Ashar)',
        fadhilah: 'Menghidupkan hati yang redup, menganugerahi kewibawaan lahir batin, dan membukakan pintu ilham keteguhan hidup.',
        waktuPelaksanaan: 'Pagi hari saat terbit fajar hingga menjelang syuruq.',
        rujukanKitab: 'Kitab Khazinatul Asrar (Hal. 188) & Ihya Ulumuddin karya Imam Al-Ghazali.',
      },
      {
        id: 'ahad-2',
        judul: 'Tasbih Malaikat Hari Pertama',
        lafalArab: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ سُبْحَانَ اللهِ الْعَظِيمِ',
        transliterasi: "Subhanallahi wa bihamdihi, subhanallahil 'azhim",
        terjemahan: 'Maha Suci Allah dengan segala puji-Nya, Maha Suci Allah Yang Maha Agung.',
        jumlah: '100x',
        fadhilah: 'Menanam pohon kurma di surga dan melancarkan kelapangan rezeki yang halal.',
        waktuPelaksanaan: 'Sebelum shalat fajar atau ba’da Subuh.',
        rujukanKitab: 'Shahih Bukhari & Kitab Al-Adzkar An-Nawawiyyah.',
      },
    ],
    doaHarianKhusus: {
      judul: 'Doa Memohon Kekuatan Iman & Cahaya Tauhid',
      lafalArab: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي بَصَرِي نُورًا، وَفِي سَمْعِي نُورًا، وَعَنْ يَمِينِي نُورًا، وَعَنْ شِمَالِي نُورًا، وَمِنْ فَوْقِي نُورًا، وَمِنْ تَحْتِي نُورًا',
      transliterasi: "Allahummaj'al fi qalbi nura, wa fi bashari nura, wa fi sam'i nura, wa 'an yamini nura, wa 'an syimali nura, wa min fawqi nura, wa min tahti nura.",
      terjemahan: 'Ya Allah, jadikanlah di dalam hatiku cahaya, pada penglihatanku cahaya, pada pendengaranku cahaya, dari sebelah kananku cahaya, dari sebelah kiriku cahaya, dari atasku cahaya, dan dari bawahku cahaya.',
      penjelasanPesantren: 'Doa ini masyhur dibaca santri untuk mengawali pekan agar aktivitas belajar dan berniaga diliputi hidayah ilahi.',
    },
    amalanSunnahDianjurkan: [
      'Shalat Sunnah Dhuha 4 Rakaat',
      'Membaca Surah Al-Fatihah 41x untuk kelancaran cita-cita',
      'Sedekah pagi kepada orang yang membutuhkan',
    ],
    korelasiPenanggalanJawa: 'Ahad melambangkan indra pandang (netra) dan unsur surya. Wirid difokuskan untuk mencerahkan mata hati agar tidak tersesat oleh gemerlap nafsu duniawi.',
  },
  {
    hari: 'Senen',
    hariMasehi: 'Senin',
    elemenJawa: 'Rembulan / Candra',
    neptu: 4,
    karakterSpiritual: 'Hari lahir dan diutusnya Rasulullah SAW, ketenangan jiwa, dan kelembutan budi pekerti.',
    wiridUtama: [
      {
        id: 'senin-1',
        judul: 'Hauqalah (Kunci Penyerahan Diri)',
        lafalArab: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ الْعَلِيِّ الْعَظِيمِ',
        transliterasi: "La hawla wa la quwwata illa billahil 'aliyyil 'azhim",
        terjemahan: 'Tiada daya untuk menjauhi kemaksiatan dan tiada kekuatan untuk melakukan ketaatan kecuali dengan pertolongan Allah Yang Maha Tinggi lagi Maha Agung.',
        jumlah: '100x atau 300x',
        fadhilah: 'Perbendaharaan surga (Kanzul Jannah), penawar 99 macam penyakit hati, dan peredam rasa gelisah.',
        waktuPelaksanaan: 'Ba’da Maghrib atau sebelum istirahat malam.',
        rujukanKitab: 'Shahih Muslim & Kitab Abwabul Faraj (Sayyid Muhammad Al-Maliki).',
      },
      {
        id: 'senin-2',
        judul: 'Shalawat Tibbil Qulub (Obat Hati & Jasmani)',
        lafalArab: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ طِبِّ الْقُلُوبِ وَدَوَائِهَا، وَعَافِيَةِ الْأَبْدَانِ وَشِفَائِهَا، وَنُورِ الْأَبْصَارِ وَضِيَائِهَا، وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ',
        transliterasi: "Allahumma shalli 'ala sayyidina Muhammadin thibbil qulubi wa dawa'iha, wa 'afiyatil abdani wa syifa'iha, wa nuril abshari wa dhiya'iha, wa 'ala alihi wa shahbihi wa sallim.",
        terjemahan: 'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad, sang penawar hati dan obatnya, penyehat badan dan kesembuhannya, serta cahaya mata dan sinarnya, dan juga kepada keluarga dan sahabatnya.',
        jumlah: '33x atau 100x',
        fadhilah: 'Penenang rasa gundah, penyembuh penyakit medis maupun non-medis, serta penarik syafaat Rasulullah SAW.',
        waktuPelaksanaan: 'Setiap selesai shalat fardhu hari Senin.',
        rujukanKitab: 'Majmu’ah Maqruat Yaumiyyah Pesantren Salaf.',
      },
    ],
    doaHarianKhusus: {
      judul: 'Doa Meneladani Akhlak Sayyidil Mursalin',
      lafalArab: 'اللَّهُمَّ حَسِّنْ خُلُقِي كَمَا حَسَّنْتَ خَلْقِي، وَارْزُقْنِي حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ وَعَمَلًا يُقَرِّبُنِي إِلَى حُبِّكَ',
      transliterasi: "Allahumma hassin khuluqi kama hassanta khalqi, warzuqni hubbaka wa hubba man yuhibbuka wa 'amalan yuqarribuni ila hubbik.",
      terjemahan: 'Ya Allah, perbaguslah akhlak budi pekertiku sebagaimana Engkau telah memperindah rupa penciptaanku, dan anugerahilah aku rasa cinta kepada-Mu, cinta kepada orang yang mencintai-Mu, dan amal yang mendekatkanku pada cinta-Mu.',
      penjelasanPesantren: 'Dianjurkan bagi siapa saja yang ingin memiliki aura kasih sayang (mahabbah) dan keteduhan perangai.',
    },
    amalanSunnahDianjurkan: [
      'Puasa Sunnah Senin (Puasa Hari Lahir Nabi SAW)',
      'Memperbanyak membaca Shalawat Nariyah 11x',
      'Mendoakan kedua orang tua dan guru sepuh pesantren',
    ],
    korelasiPenanggalanJawa: 'Hari Senen dipengaruhi oleh sifat rembulan (luhur, sejuk, welas asih). Wirid dirancang untuk memupuk kelembutan kalbu agar tidak kaku dalam bermuamalah.',
  },
  {
    hari: 'Selasa',
    hariMasehi: 'Selasa',
    elemenJawa: 'Geni / Api',
    neptu: 3,
    karakterSpiritual: 'Semangat juang, ketajaman firasat, serta perlindungan dari godaan amarah.',
    wiridUtama: [
      {
        id: 'selasa-1',
        judul: 'Shalawat Munjiyat (Penyelamat dari Mara Bahaya)',
        lafalArab: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِينَا بِهَا مِنْ جَمِيعِ الْأَهْوَالِ وَالْآفَاتِ، وَتَقْضِي لَنَا بِهَا جَمِيعَ الْحَاجَاتِ، وَتُطَهِّرُنَا بِهَا مِنْ جَمِيعِ السَّيِّئَاتِ',
        transliterasi: "Allahumma shalli 'ala sayyidina Muhammadin shalatan tunjina biha min jami'il ahwali wal afat, wa taqdhi lana biha jami'al hajat, wa tutahhiruna biha min jami'is sayyi'at...",
        terjemahan: 'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad, rahmat yang dengannya Engkau selamatkan kami dari segala huru-hara dan bencana, Engkau penuhi segala hajat kami, dan Engkau bersihkan kami dari segala keburukan.',
        jumlah: '41x ba’da Ashar / Maghrib',
        fadhilah: 'Benteng proteksi diri dari musuh, fitnah, kecelakaan, dan sihir.',
        waktuPelaksanaan: 'Sore hari sebelum matahari terbenam.',
        rujukanKitab: 'Kitab Al-Fawaid Al-Mukhtarah & Ratib Al-Haddad.',
      },
      {
        id: 'selasa-2',
        judul: 'Istighfar Pelebur Dosa & Peredam Emosi',
        lafalArab: 'أَسْتَغْفِرُ اللهَ الْعَظِيمَ الَّذِي لَا إِلٰهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
        transliterasi: "Astaghfirullahal 'azhim alladzi la ilaha illa Huwal Hayyul Qayyum wa atubu ilaih",
        terjemahan: 'Aku memohon ampun kepada Allah Yang Maha Agung, yang tiada Tuhan selain Dia, Yang Maha Hidup lagi Maha Berdiri Sendiri, dan aku bertaubat kepada-Nya.',
        jumlah: '100x',
        fadhilah: 'Menyejukkan api amarah, melancarkan rezeki yang sempat seret karena dosa, dan melapangkan dada.',
        waktuPelaksanaan: 'Sepanjang hari atau saat timbul rasa jengkel.',
        rujukanKitab: 'Sunan Abi Dawud & Riyadhus Shalihin.',
      },
    ],
    doaHarianKhusus: {
      judul: 'Doa Perlindungan dari Godaan Syaithan & Amarah Api',
      lafalArab: 'اللَّهُمَّ رَبَّ النَّبِيِّ مُحَمَّدٍ اغْفِرْ لِي ذَنْبِي وَأَذْهِبْ غَيْظَ قَلْبِي وَأَجِرْنِي مِنْ مُضِلاَّتِ الْفِتَنِ',
      transliterasi: "Allahumma Rabba-n-Nabiyyi Muhammadin ighfir li dzanbi wa adzhib ghaizha qalbi wa ajirni min mudhillatil fitan.",
      terjemahan: 'Ya Allah, Tuhan Nabi Muhammad, ampunilah dosaku, hilangkanlah kemarahan dalam hatiku, dan lindungilah aku dari kesesatan fitnah.',
      penjelasanPesantren: 'Doa masyhur riwayat Ummu Salamah RA untuk meredam temperamen panas dan menjernihkan keputusan.',
    },
    amalanSunnahDianjurkan: [
      'Menjaga wudhu (Daimul Wudhu) agar elemen api reda',
      'Membaca Ratib Al-Haddad atau Ratib Al-Attas',
      'Memperbanyak sedekah air mineral atau makanan sejuk',
    ],
    korelasiPenanggalanJawa: 'Selasa berwatak geni (api/berani). Wirid ini berfungsi sebagai peredam (tathfiatun nar) agar keberanian berubah menjadi kepemimpinan bijak, bukan kezaliman.',
  },
  {
    hari: 'Rebo',
    hariMasehi: 'Rabu',
    elemenJawa: 'Bumi / Pertiwi',
    neptu: 7,
    karakterSpiritual: 'Cahaya ilmu hikmah, keterbukaan wawasan, dan amalan tolak bala (Arba’ Mustamir).',
    wiridUtama: [
      {
        id: 'rabu-1',
        judul: 'Ayat Kursi & Perlindungan As-Sayyid',
        lafalArab: 'اللهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...',
        transliterasi: "Allahu la ilaha illa Huwal Hayyul Qayyum, la ta'khudzuhu sinatuw wa la naum...",
        terjemahan: 'Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya)...',
        jumlah: '7x atau 17x ba’da Subuh & Maghrib',
        fadhilah: 'Menjaga rumah dan diri dari gangguan makhluk halus, pencurian, santet, dan marabahaya mendadak.',
        waktuPelaksanaan: 'Pagi dan petang.',
        rujukanKitab: 'Shahih Bukhari & Khazinatul Asrar.',
      },
      {
        id: 'rabu-2',
        judul: 'Wirid Qul Huwallahu Ahad (Tauhid Murni)',
        lafalArab: 'قُلْ هُوَ اللهُ أَحَدٌ، اللهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
        transliterasi: "Qul Huwallahu Ahad, Allahush Shamad, lam yalid wa lam yulad, wa lam yakul lahu kufuwan ahad.",
        terjemahan: 'Katakanlah: Dialah Allah, Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu...',
        jumlah: '100x',
        fadhilah: 'Mendapat pahala sepertiga Al-Qur’an dan dibangunkan istana di surga.',
        waktuPelaksanaan: 'Tengah hari atau ba’da Zhuhur.',
        rujukanKitab: 'Jami’ At-Tirmidzi & Kitab Ad-Durrul Mantsur.',
      },
    ],
    doaHarianKhusus: {
      judul: 'Doa Salamah & Tolak Bala Khusus Hari Rabu',
      lafalArab: 'اللَّهُمَّ يَا شَدِيدَ الْقُوَى وَيَا شَدِيدَ الْمِحَالِ يَا عَزِيزُ ذَلَّتْ لِعِزَّتِكَ جَمِيعُ خَلْقِكَ، اكْفِنِي مِنْ جَمِيعِ خَلْقِكَ يَا مُحْسِنُ يَا مُجْمِلُ يَا مُتَفَضِّلُ يَا مُنْعِمُ',
      transliterasi: "Allahumma ya syadidal quwa wa ya syadidal mihal, ya 'Azizu dzallat li'izzatika jami'u khalqik, ikfini min jami'i khalqika ya Muhsin ya Mujmil ya Mutafadhdhil ya Mun'im.",
      terjemahan: 'Ya Allah, wahai Yang Maha Kuat, wahai Yang Maha Perkasa, wahai Yang Maha Mulia, tunduklah kepada kemuliaan-Mu seluruh makhluk-Mu. Lindungilah aku dari kejahatan seluruh ciptaan-Mu, wahai Dzat Yang Maha Berbuat Baik, Maha Memperindah, Maha Melimpahkan Karunia, Maha Memberi Nikmat.',
      penjelasanPesantren: 'Doa tolak bala yang sering diijazahkan para Kiai sepuh pesantren pada hari Rabu untuk menangkal sengkala.',
    },
    amalanSunnahDianjurkan: [
      'Membaca Surah Yasin 1x dengan niat keselamatan keluarga',
      'Sedekah koin/uang subuh untuk menolak bala bencana',
      'Muthala’ah (belajar mendalam) kitab fikih dan tasawuf',
    ],
    korelasiPenanggalanJawa: 'Rebo merupakan hari terciptanya cahaya (nur) dalam hadits Nabi. Sangat mustajab untuk menuntut ilmu agama dan memohon keselamatan.',
  },
  {
    hari: 'Kemis',
    hariMasehi: 'Kamis',
    elemenJawa: 'Angin / Bayu',
    neptu: 8,
    karakterSpiritual: 'Diangkatnya amal ke hadirat Ilahi, kelancaran rezeki barokah, dan persiapan malam Jumat.',
    wiridUtama: [
      {
        id: 'kamis-1',
        judul: 'Wirid Sayyidul Istighfar',
        lafalArab: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
        transliterasi: "Allahumma Anta Rabbi la ilaha illa Anta khalaqtani wa ana 'abduka wa ana 'ala 'ahdika wa wa'dika mastatha'tu...",
        terjemahan: 'Ya Allah, Engkaulah Tuhanku, tiada Tuhan selain Engkau. Engkau yang menciptakan aku dan aku adalah hamba-Mu...',
        jumlah: '3x Pagi & 3x Petang',
        fadhilah: 'Barangsiapa membacanya di sore hari lalu wafat malam itu, niscaya dijamin masuk surga.',
        waktuPelaksanaan: 'Ba’da Ashar menjelang Maghrib.',
        rujukanKitab: 'Shahih Bukhari (No. 6306).',
      },
      {
        id: 'kamis-2',
        judul: 'Shalawat Nariyah (Kunci Pembuka Pintu Rezeki)',
        lafalArab: 'اللَّهُمَّ صَلِّ صَلَاةً كَامِلَةً وَسَلِّمْ سَلَامًا تَامًّا عَلَى سَيِّدِنَا مُحَمَّدٍ الَّذِي تَنْحَلُّ بِهِ الْعُقَدُ وَتَنْفَرِجُ بِهِ الْكُرَبُ وَتُقْضَى بِهِ الْحَوَائِجُ وَتُنَالُ بِهِ الرَّغَائِبُ...',
        transliterasi: "Allahumma shalli shalatan kamilatan wa sallim salaman tamman 'ala sayyidina Muhammadinilladzi tanhallu bihil 'uqadu...",
        terjemahan: 'Ya Allah, limpahkanlah shalawat yang sempurna dan keselamatan yang menyeluruh kepada junjungan kami Nabi Muhammad, yang dengan beliau terurai segala ikatan kesulitan dan terhapus segala kesedihan...',
        jumlah: '11x, 44x, atau 100x',
        fadhilah: 'Menarik kelimpahan rezeki yang tak terduga, melunasi hutang piutang, dan mengangkat derajat sosial.',
        waktuPelaksanaan: 'Malam Jumat ba’da shalat Isya.',
        rujukanKitab: 'Kitab Khazinatul Asrar karya Syaikh Muhammad Haqqi An-Nazili.',
      },
    ],
    doaHarianKhusus: {
      judul: 'Doa Kelapangan Rezeki & Kesuksesan Usaha',
      lafalArab: 'اللَّهُمَّ يَا غَنِيُّ يَا حَمِيدُ يَا مُبْدِئُ يَا مُعِيدُ يَا رَحِيمُ يَا وَدُودُ، أَغْنِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَبِطَاعَتِكَ عَنْ مَعْصِيَتِكَ وَبِفَضْلِكَ عَمَّنْ سِوَاكَ',
      transliterasi: "Allahumma ya Ghaniyyu ya Hamidu ya Mubdi'u ya Mu'idu ya Rahimu ya Wadud, aghnini bihalalika 'an haramika wa bitha'atika 'an ma'shiyatika wa bifadhlika 'amman siwak.",
      terjemahan: 'Ya Allah, wahai Dzat Yang Maha Kaya, Maha Terpuji, Maha Memulai, Maha Mengembalikan, Maha Pengasih, Maha Penyayang. Cukupkanlah aku dengan rezeki-Mu yang halal dari yang haram, dengan ketaatan kepada-Mu dari kemaksiatan, dan dengan karunia-Mu dari selain diri-Mu.',
      penjelasanPesantren: 'Doa ijazah para ulama pesantren yang sangat dianjurkan dibaca berulang kali ba’da shalat.',
    },
    amalanSunnahDianjurkan: [
      'Puasa Sunnah Kamis',
      'Membaca Surah Al-Waqi’ah pada sore hari',
      'Ziarah kubur orang tua dan mendoakan para auliya/guru',
    ],
    korelasiPenanggalanJawa: 'Kemis memiliki neptu 8 (paling besar dalam saptawara). Melambangkan angin dan kebesaran. Amalan difokuskan pada rasa syukur atas kelimpahan anugerah hidup.',
  },
  {
    hari: 'Jemuwah',
    hariMasehi: 'Jumat',
    elemenJawa: 'Samudra / Tirta',
    neptu: 6,
    karakterSpiritual: 'Sayyidul Ayyam (Penghulu Segala Hari), pembersihan diri, dan turunnya rahmat istimewa.',
    wiridUtama: [
      {
        id: 'jumat-1',
        judul: 'Shalawat Ummi (Pemberat Timbangan Pahala)',
        lafalArab: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ عَبْدِكَ وَنَبِيِّكَ وَرَسُولِكَ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ',
        transliterasi: "Allahumma shalli 'ala sayyidina Muhammadin 'abdika wa nabiyyika wa rasulikan nabiyyil ummiyyi wa 'ala alihi wa shahbihi wa sallim.",
        terjemahan: 'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad, hamba-Mu, Nabi-Mu, dan Rasul-Mu yang ummi, serta kepada keluarga dan para sahabatnya.',
        jumlah: '80x atau 1000x ba’da Ashar',
        fadhilah: 'Diampuni dosa 80 tahun dan ditulis pahala ibadah 80 tahun (HR. Ad-Daraquthni).',
        waktuPelaksanaan: 'Jumat sore antara Ashar dan Maghrib.',
        rujukanKitab: 'Kitab Al-Jami’ Ash-Shaghir & Ihya Ulumuddin.',
      },
      {
        id: 'jumat-2',
        judul: 'Membaca Surah Al-Kahfi',
        lafalArab: 'الْحَمْدُ لِلَّهِ الَّذِي أَنْزَلَ عَلَى عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَلْ لَهُ عِوَجًا...',
        transliterasi: "Alhamdulillahilladzi anzala 'ala 'abdihil kitaba wa lam yaj'al lahu 'iwaja...",
        terjemahan: 'Segala puji bagi Allah yang telah menurunkan kepada hamba-Nya Al-Kitab (Al-Qur’an) dan Dia tidak mengadakan kebengkokan di dalamnya...',
        jumlah: '1x khatam surah',
        fadhilah: 'Disinari cahaya di antara dua Jumat dan dilindungi dari fitnah Dajjal.',
        waktuPelaksanaan: 'Mulai malam Jumat hingga sebelum Maghrib hari Jumat.',
        rujukanKitab: 'Shahih Sunan An-Nasa’i & Al-Mustadrak Al-Hakim.',
      },
    ],
    doaHarianKhusus: {
      judul: 'Doa Hari Jumat Saat Sa’atul Ijabah (Waktu Mustajab)',
      lafalArab: 'اللَّهُمَّ يَا سَابِغَ النِّعَمِ، وَيَا دَافِعَ النِّقَمِ، وَيَا فَارِجَ الْغَمِّ، وَيَا كَاشِفَ الظُّلَمِ، فَرِّجْ عَنَّا مَا أَهَمَّنَا وَمَا غَمَّنَا وَاجْعَلْ لَنَا مِنْ كُلِّ ضِيقٍ مَخْرَجًا',
      transliterasi: "Allahumma ya sabighan ni'am, wa ya dafi'an niqam, wa ya farijal ghamm, wa ya kasyifazh zhulam, farrij 'anna ma ahammana wa ma ghammana waj'al lana min kulli dhiqin makhraja.",
      terjemahan: 'Ya Allah, wahai Dzat Yang Melimpahkan Nikmat, Yang Menolak Bencana, Yang Melapangkan Kedukaan, Yang Menyingkap Kegelapan, lapangkanlah dari kami segala hal yang merisaukan dan menyedihkan kami, serta jadikanlah bagi kami jalan keluar dari setiap kesempitan.',
      penjelasanPesantren: 'Dibaca santri saat duduk iktikaf menanti iqamah Shalat Jumat atau setelah shalat Ashar.',
    },
    amalanSunnahDianjurkan: [
      'Mandi Sunnah Jumat & Mengenakan Pakaian Bersih/Putih',
      'Memotong kuku, memakai wewangian (parfum non-alkohol)',
      'Sedekah Jumat Berkah berupa nasi kotak untuk dhuafa & jamaah masjid',
    ],
    korelasiPenanggalanJawa: 'Jemuwah berunsur tirta/air suci. Hari paling mulia untuk pensucian lahir dan batin, meluruskan niat, dan melebur segala kekotoran hati.',
  },
  {
    hari: 'Setu',
    hariMasehi: 'Sabtu',
    elemenJawa: 'Bumi / Watu Kenceng',
    neptu: 9,
    karakterSpiritual: 'Keteguhan pendirian, tawakkal tingkat tinggi, dan penutup siklus pekan dengan husnul khatimah.',
    wiridUtama: [
      {
        id: 'sabtu-1',
        judul: 'Tahlil & Kalimah Thayyibah',
        lafalArab: 'لَا إِلٰهَ إِلَّا اللهُ الْمَلِكُ الْحَقُّ الْمُبِينُ',
        transliterasi: "La ilaha illallahul Malikul Haqqul Mubin",
        terjemahan: 'Tiada Tuhan selain Allah, Raja Yang Maha Benar lagi Maha Nyata.',
        jumlah: '100x ba’da Subuh',
        fadhilah: 'Jaminan keamanan dari kemiskinan dan penenteram dari kegentaran alam kubur.',
        waktuPelaksanaan: 'Pagi hari setelah shalat Subuh.',
        rujukanKitab: 'Hilyatul Auliya (Abu Nu’aim) & Al-Adzkar.',
      },
      {
        id: 'sabtu-2',
        judul: 'Wirid Ya Fattaahu Ya Razzaaq',
        lafalArab: 'يَا فَتَّاحُ يَا رَزَّاقُ يَا كَافِي يَا مُغْنِي',
        transliterasi: "Ya Fattahu Ya Razzaqu Ya Kafiyu Ya Mughni",
        terjemahan: 'Wahai Dzat Yang Maha Membuka, Maha Pemberi Rezeki, Maha Mencukupi, Maha Memberi Kekayaan.',
        jumlah: '100x atau 313x',
        fadhilah: 'Membuka simpul-simpul kebuntuan niaga dan mempercepat datangnya kabar gembira.',
        waktuPelaksanaan: 'Tengah malam saat shalat Tahajjud.',
        rujukanKitab: 'Kitab Mujarabat Ad-Dairabi Al-Kabir.',
      },
    ],
    doaHarianKhusus: {
      judul: 'Doa Keteguhan Iman & Akhir Hidup Husnul Khatimah',
      lafalArab: 'اللَّهُمَّ يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ وَعَلَى طَاعَتِكَ، وَتَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ',
      transliterasi: "Allahumma ya Muqallibal qulub, tsabbit qalbi 'ala dinika wa 'ala tha'atika, wa tawaffani musliman wa alhiqni bish-shalihin.",
      terjemahan: 'Ya Allah, wahai Dzat Yang Membolak-balikkan Hati, teguhkanlah hatiku di atas agama-Mu dan ketaatan kepada-Mu, dan wafatkanlah aku dalam keadaan Islam serta kumpulkanlah aku bersama orang-orang shalih.',
      penjelasanPesantren: 'Doa penutup pekan agar sepekan yang telah dilalui menjadi saksi amal shaleh di akhirat.',
    },
    amalanSunnahDianjurkan: [
      'Shalat Tahajjud & Witir minimal 3 rakaat',
      'Muhasabah / Evaluasi perbuatan sepekan terakhir',
      'Silaturahmi ke sanak saudara dan tetangga',
    ],
    korelasiPenanggalanJawa: 'Setu berneptu 9 (tertinggi dalam saptawara). Melambangkan batu karang/bumi kokoh. Wirid ditujukan untuk memantapkan istiqamah dalam ketaatan.',
  },
];

// ---------------------------------------------------------------------------
// 2. DAFTAR WIRID 5 PASARAN JAWA (PANCAWARA) & PENYELARASAN BATIN
// ---------------------------------------------------------------------------
export const DAFTAR_WIRID_PANCAWARA: WiridPasaranPancawara[] = [
  {
    pasaran: 'Legi',
    neptu: 5,
    arahDuduk: 'Timur (Wetan)',
    elemenKosmis: 'Udara / Angin (Putih)',
    warnaAura: 'Putih Kemilau (Sifat Sukma Manis)',
    fokusPenyelarasanBatin: 'Memancarkan aura kasih sayang (mahabbah), keramahan, serta memurnikan niat dari sifat munafik dan riya.',
    asmaulHusnaUtama: {
      id: 'legi-asma',
      judul: 'Asmaul Husna: Ya Rahman Ya Rahim',
      lafalArab: 'يَا رَحْمٰنُ يَا رَحِيمُ يَا وَدُودُ',
      transliterasi: "Ya Rahmanu Ya Rahimu Ya Wadud",
      terjemahan: 'Wahai Dzat Yang Maha Pengasih, Maha Penyayang, Maha Penuh Cinta.',
      jumlah: '100x setiap selesai shalat fardhu',
      fadhilah: 'Menumbuhkan simpati dan rasa hormat dari orang lain, mendamaikan rumah tangga yang berselisih.',
      waktuPelaksanaan: 'Ba’da Subuh dan Ba’da Maghrib.',
      rujukanKitab: 'Kitab Sirrul Asrar karya Syaikh Abdul Qadir Al-Jailani.',
    },
    amalanKekuatanHati: 'Membaca Surat Ar-Rahman 1x setiap malam untuk mengasah kepekaan rasa syukur atas kenikmatan hidup.',
    nasihatKiaiSepuh: 'Wong weton Legi kudu pinter njaga lathi (lisan). Ucapane kudu legi koyo jenenge, nanging atine kudu tetep jujur marang Gusti Allah.',
  },
  {
    pasaran: 'Pahing',
    neptu: 9,
    arahDuduk: 'Selatan (Kidul)',
    elemenKosmis: 'Api / Geni (Merah)',
    warnaAura: 'Merah Menyala (Sifat Semangat & Wibawa)',
    fokusPenyelarasanBatin: 'Meredam egoisme dan emosi yang meletup-letup, mengubah amarah menjadi ketegasan yang adil dan berani dalam kebenaran.',
    asmaulHusnaUtama: {
      id: 'pahing-asma',
      judul: 'Asmaul Husna: Ya ' + 'Aziz Ya Jabbar Ya Mutakabbir',
      lafalArab: 'يَا عَزِيزُ يَا جَبَّارُ يَا مُتَكَبِّرُ يَا قَوِيُّ يَا مَتِينُ',
      transliterasi: "Ya 'Azizu Ya Jabbaru Ya Mutakabbiru Ya Qawiyyu Ya Matin",
      terjemahan: 'Wahai Dzat Yang Maha Perkasa, Maha Kuasa, Maha Memiliki Kebesaran, Maha Kuat, Maha Kokoh.',
      jumlah: '100x ba’da Ashar',
      fadhilah: 'Menancapkan kharisma wibawa, tidak mudah direndahkan lawan, dan diberi ketahanan fisik serta mental.',
      waktuPelaksanaan: 'Saat sore hari setelah Ashar.',
      rujukanKitab: 'Kitab Khazinatul Asrar (Hal. 142).',
    },
    amalanKekuatanHati: 'Memperbanyak Istighfar 100x dan minum air putih yang telah dibacakan Surah Al-Fatihah saat amarah mulai memuncak.',
    nasihatKiaiSepuh: 'Wong weton Pahing geni nafsu kudu disirami banyu wudhu lan dzikir, supaya dadi obor pepadhang dudu geni sing ngobong omah.',
  },
  {
    pasaran: 'Pon',
    neptu: 7,
    arahDuduk: 'Barat (Kulon)',
    elemenKosmis: 'Air / Banyu (Kuning)',
    warnaAura: 'Kuning Keemasan (Sifat Cerdas & Arif)',
    fokusPenyelarasanBatin: 'Mempertajam intuisi fikir, kecerdasan logika, serta menjaga rezeki agar tidak tercampur barang syubhat.',
    asmaulHusnaUtama: {
      id: 'pon-asma',
      judul: 'Asmaul Husna: Ya ' + 'Alim Ya Hakim Ya Lathif',
      lafalArab: 'يَا عَلِيمُ يَا حَكِيمُ يَا لَطِيفُ يَا خَبِيرُ',
      transliterasi: "Ya 'Alimu Ya Hakimu Ya Lathifu Ya Khabir",
      terjemahan: 'Wahai Dzat Yang Maha Mengetahui, Maha Bijaksana, Maha Lembut, Maha Teliti.',
      jumlah: '129x atau 100x ba’da Maghrib/Isya',
      fadhilah: 'Membukakan rahasia keilmuan, mempermudah hafalan dan belajar, serta diberi kelembutan solusi atas perkara pelik.',
      waktuPelaksanaan: 'Malam hari sebelum istirahat.',
      rujukanKitab: 'Kitab Al-Adzkar & Syamsul Ma’arif Al-Kubra.',
    },
    amalanKekuatanHati: 'Membaca Ayat Kursi 3x sebelum memulai perundingan atau ujian penting.',
    nasihatKiaiSepuh: 'Wong weton Pon kudu eling marang sedulur papat lima pancer, ngresiki akal pikiran saka was-was lan su’udzan marang takdir.',
  },
  {
    pasaran: 'Wage',
    neptu: 4,
    arahDuduk: 'Utara (Lor)',
    elemenKosmis: 'Tanah / Bumi (Hitam)',
    warnaAura: 'Hitam / Gelap Teguh (Sifat Ulet & Tekun)',
    fokusPenyelarasanBatin: 'Melatih kesabaran dalam menghadapi ujian kemiskinan/kesulitan, menolak sifat putus asa, dan memperkuat benteng batin.',
    asmaulHusnaUtama: {
      id: 'wage-asma',
      judul: 'Asmaul Husna: Ya Sabur Ya Hafizh Ya Salam',
      lafalArab: 'يَا صَبُورُ يَا حَفِيظُ يَا سَلَامُ يَا مُؤْمِنُ',
      transliterasi: "Ya Shaburu Ya Hafizhu Ya Salamu Ya Mu'min",
      terjemahan: 'Wahai Dzat Yang Maha Penyabar, Maha Menjaga, Maha Memberi Keselamatan, Maha Memberi Keamanan.',
      jumlah: '100x ba’da Subuh',
      fadhilah: 'Dianugerahi kesabaran baja, dilindungi dari tipu daya orang munafik, dan dipermudah menabung rezeki.',
      waktuPelaksanaan: 'Pagi hari sebelum memulai kerja keras.',
      rujukanKitab: 'Kitab Misykatul Anwar karya Imam Al-Ghazali.',
    },
    amalanKekuatanHati: 'Membaca Surah Al-Insyirah (Alam Nasyrah) 7x setiap selesai shalat fardhu untuk membuka jalan kemudahan.',
    nasihatKiaiSepuh: 'Wong weton Wage kudu ulet kaya lemah pategalan, sanajan diinjak-injak tetep ngasilake tetanduran sing subur lan migunani.',
  },
  {
    pasaran: 'Kliwon',
    neptu: 8,
    arahDuduk: 'Pusat / Tengah (Madya)',
    elemenKosmis: 'Eter / Akasa (Panca Warna / Pelangi)',
    warnaAura: 'Kombinasi 4 Unsur (Sifat Pemimpin & Spiritual)',
    fokusPenyelarasanBatin: 'Puncak ketauhidan, penyatuan 4 elemen nafsu (Amarah, Lawwamah, Sufiah, Muthmainnah) menuju keridhaan Allah semata.',
    asmaulHusnaUtama: {
      id: 'kliwon-asma',
      judul: 'Kunci Asma Agung: Ismul A’zham & Tahlil Murni',
      lafalArab: 'لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      transliterasi: "La ilaha illallahu wahdahu la syarika lah, lahul mulku wa lahul hamdu yuhyi wa yumitu wa Huwa 'ala kulli syai'in qadir.",
      terjemahan: 'Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya. Bagi-Nya segala kerajaan dan bagi-Nya segala pujian. Dia yang menghidupkan dan mematikan, dan Dia Maha Kuasa atas segala sesuatu.',
      jumlah: '100x pagi dan 100x petang',
      fadhilah: 'Penghapus 100 dosa, benteng dari setan sepanjang hari, dan setara memerdekakan 10 budak.',
      waktuPelaksanaan: 'Ba’da Subuh dan Ba’da Ashar/Maghrib.',
      rujukanKitab: 'Shahih Bukhari & Muslim (Hadits Muttafaq ‘Alaih).',
    },
    amalanKekuatanHati: 'Membaca Ratib Al-Haddad dan Shalawat Fatih 11x pada malam hari.',
    nasihatKiaiSepuh: 'Wong weton Kliwon manggon ing tengah-tengah minangka pancer. Aja gumede, tansah andhap asor lan madhep mantep mung marang Gusti Kang Maha Kuwasa.',
  },
];

// ---------------------------------------------------------------------------
// 3. GENERATOR AMALAN SPESIFIK BERDASARKAN HARI & PASARAN PENGGUNA
// ---------------------------------------------------------------------------
export function getPaketWiridWeton(hari: HariJawa, pasaran: PasaranJawa): PaketWiridWetonKhusus {
  const sapta = DAFTAR_WIRID_SAPTAWARA.find((s) => s.hari === hari) || DAFTAR_WIRID_SAPTAWARA[0];
  const panca = DAFTAR_WIRID_PANCAWARA.find((p) => p.pasaran === pasaran) || DAFTAR_WIRID_PANCAWARA[0];
  const totalNeptu = sapta.neptu + panca.neptu;

  const kunciDzikirHarian = `${sapta.wiridUtama[0].judul} (${sapta.wiridUtama[0].jumlah}) & ${panca.asmaulHusnaUtama.judul} (${panca.asmaulHusnaUtama.jumlah})`;

  const wiridPagiPetang = [
    `Pagi: ${sapta.wiridUtama[0].lafalArab} (${sapta.wiridUtama[0].transliterasi}) - ${sapta.wiridUtama[0].jumlah}`,
    `Petang: ${panca.asmaulHusnaUtama.lafalArab} (${panca.asmaulHusnaUtama.transliterasi}) - ${panca.asmaulHusnaUtama.jumlah}`,
    `Sayyidul Istighfar 3x saat fajar dan petang`,
    `Shalawat Nabi minimal 100x setiap hari`,
  ];

  const doaMunajatKhusus = {
    nama: `Doa Keselamatan & Kelapangan Rizki Weton ${hari} ${pasaran}`,
    arab: sapta.doaHarianKhusus.lafalArab,
    latin: sapta.doaHarianKhusus.transliterasi,
    arti: sapta.doaHarianKhusus.terjemahan,
  };

  const panduanPuasaWetonSyarie = `Puasa sunnah pada hari weton kelahiran (${hari} ${pasaran}) sangat dianjurkan dalam tradisi pesantren Jawa sebagai wujud 'Tasyakkur bi an-Ni'mah' (bersyukur atas nikmat umur dan raga). Niatkan puasa sunnah mutlak atau puasa sunnah hari lahir lillahi ta'ala. Hindari puasa dengan niat meminta kesaktian kepada jin atau khodam. Isi hari puasa dengan sedekah makanan dan khatam membaca Surah Yasin atau Al-Waqi'ah.`;

  const pesanSpiritual = `Weton ${hari} ${pasaran} memiliki total neptu ${totalNeptu} (${sapta.elemenJawa} + ${panca.elemenKosmis}). Penyelarasan batin Anda tercapai saat Anda mengimbangi karakter bawaan lahir dengan istiqamah membaca wirid ${sapta.wiridUtama[0].judul} dan ${panca.asmaulHusnaUtama.judul}.`;

  return {
    hari,
    pasaran,
    totalNeptu,
    kunciDzikirHarian,
    wiridPagiPetang,
    doaMunajatKhusus,
    panduanPuasaWetonSyarie,
    pesanSpiritual,
  };
}

// ---------------------------------------------------------------------------
// 4. KUMPULAN DOA-DOA HARIAN POPULER PESANTREN SALAF
// ---------------------------------------------------------------------------
export interface DoaPesantrenItem {
  id: string;
  kategori: 'Rezeki' | 'Keselamatan' | 'Keluarga & Anak' | 'Hajat & Ujian' | 'Tolak Bala' | 'Ketenangan Hati';
  judul: string;
  arab: string;
  latin: string;
  arti: string;
  keutamaan: string;
  sumberKitab: string;
}

export const DAFTAR_DOA_PESANTREN_PILIHAN: DoaPesantrenItem[] = [
  {
    id: 'doa-1',
    kategori: 'Rezeki',
    judul: 'Doa Membuka Pintu Rezeki Halal Tanpa Hisab',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    latin: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan thayyiban, wa 'amalan mutaqabbalan.",
    arti: 'Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang halal lagi baik, dan amal perbuatan yang diterima.',
    keutamaan: 'Dibaca Rasulullah SAW setiap selesai shalat Subuh setelah salam.',
    sumberKitab: 'Sunan Ibnu Majah (No. 925) & Kitab Al-Adzkar Imam Nawawi.',
  },
  {
    id: 'doa-2',
    kategori: 'Tolak Bala',
    judul: 'Doa Perlindungan Bismillahilladzi (Benteng Segala Racun & Bahaya)',
    arab: 'بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    latin: "Bismillahilladzi la yadhurru ma'asmihi syai'un fil ardhi wa la fis sama'i wa Huwas Sami'ul 'Alim.",
    arti: 'Dengan nama Allah yang bersama nama-Nya tidak ada sesuatu pun di bumi maupun di langit yang dapat membahayakan, dan Dia Maha Mendengar lagi Maha Mengetahui.',
    keutamaan: 'Dibaca 3x pada pagi dan petang, tidak ada bahaya mendadak atau racun yang dapat mencelakai.',
    sumberKitab: 'Sunan Abi Dawud & Jami’ At-Tirmidzi (Hadits Hasan Shahih).',
  },
  {
    id: 'doa-3',
    kategori: 'Ketenangan Hati',
    judul: 'Doa Menghilangkan Kegalauan & Beban Hutang',
    arab: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
    latin: "Allahumma inni a'udzu bika minal hammi wal hazan, wa a'udzu bika minal 'ajzi wal kasal, wa a'udzu bika minal jubni wal bukhl, wa a'udzu bika min ghalabatid dayni wa qahrir rijal.",
    arti: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari rasa gelisah dan duka, dari kelemahan dan kemalasan, dari sifat pengecut dan kikir, serta dari lilitan hutang dan penindasan orang lain.',
    keutamaan: 'Doa yang diajarkan Rasulullah SAW kepada sahabat Abu Umamah RA di masjid saat terlilit kesulitan hidup.',
    sumberKitab: 'Shahih Bukhari & Abu Dawud.',
  },
  {
    id: 'doa-4',
    kategori: 'Keluarga & Anak',
    judul: 'Doa Melahirkan Keturunan Qurrata A’yun (Penyejuk Hati)',
    arab: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    latin: "Rabbana hab lana min azwajina wa dzurriyyatina qurrata a'yuniw waj'alna lil muttaqina imama.",
    arti: 'Ya Tuhan kami, anugerahkanlah kepada kami pasangan kami dan keturunan kami sebagai penyejuk hati (kami), dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa.',
    keutamaan: 'Membangun keharmonisan keluarga, anak yang berbakti dan taat beribadah.',
    sumberKitab: 'QS. Al-Furqan: 74.',
  },
  {
    id: 'doa-5',
    kategori: 'Hajat & Ujian',
    judul: 'Doa Nabi Yunus (Doa Dzun Nun di Dalam Perut Ikan Paus)',
    arab: 'لَا إِلٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    latin: "La ilaha illa Anta subhanaka inni kuntu minazh zhalimin.",
    arti: 'Tidak ada Tuhan selain Engkau. Maha Suci Engkau, sesungguhnya aku adalah termasuk orang-orang yang zhalim.',
    keutamaan: 'Tidak ada seorang muslim yang berdoa dengan kalimat ini dalam kesulitan apapun kecuali Allah kabulkan.',
    sumberKitab: 'Jami’ At-Tirmidzi (No. 3505) & Al-Mustadrak Al-Hakim.',
  },
  {
    id: 'doa-6',
    kategori: 'Keselamatan',
    judul: 'Doa Bepergian / Safar & Perlindungan Perjalanan',
    arab: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ',
    latin: "Allahumma inna nas'aluka fi safarina hadzal birra wat taqwa, wa minal 'amali ma tardha. Allahumma hawwin 'alaina safarana hadza watwi 'anna bu'dah.",
    arti: 'Ya Allah, sesungguhnya kami memohon kepada-Mu dalam perjalanan kami ini kebaikan dan ketakwaan, serta amal yang Engkau ridhai. Ya Allah, mudahkanlah perjalanan kami ini dan dekatkanlah jaraknya yang jauh.',
    keutamaan: 'Mendapat perlindungan para malaikat selama dalam perjalanan dagang maupun silaturahmi.',
    sumberKitab: 'Shahih Muslim (No. 1342).',
  },
];
