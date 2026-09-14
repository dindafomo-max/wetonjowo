export interface IstilahPrimbon {
  id: string;
  istilah: string;
  aksaraJawa?: string;
  kategori: 'Hari & Pasaran' | 'Jodoh & Nikah' | 'Rezeki & Karir' | 'Pantangan & Naas' | 'Kosmologi & Waktu' | 'Ruwatan & Sukerta';
  artiSingkat: string;
  maknaMendalam: string;
  rujukanKitab: string;
  pedomanPraktis: string;
}

export const DAFTAR_GLOSARIUM: IstilahPrimbon[] = [
  {
    id: 'neptu',
    istilah: 'Neptu',
    aksaraJawa: 'ꦤꦺꦥ꧀ꦠꦸ',
    kategori: 'Hari & Pasaran',
    artiSingkat: 'Nilai numerik mistis dan matematis dari gabungan hari dan pasaran kelahiran.',
    maknaMendalam: 'Neptu adalah bobot energi kosmik yang dibawa seseorang sejak tarikan napas pertamanya di bumi. Dalam Kitab Betaljemur Adammakna, neptu menjadi fondasi utama seluruh perhitungan (petung), mulai dari jodoh, arah rezeki, hingga keselamatan hajat.',
    rujukanKitab: 'Kitab Betaljemur Adammakna Bab Pandoming Pasaran',
    pedomanPraktis: 'Dihitung dengan menjumlahkan neptu hari (Ahad=5 s.d. Setu=9) dan pasaran (Legi=5, Pahing=9, Pon=7, Wage=4, Kliwon=8). Rentang neptu berkisar antara 7 (Selasa Wage) hingga 18 (Setu Pahing).'
  },
  {
    id: 'saptawara',
    istilah: 'Saptawara',
    aksaraJawa: 'ꦱꦥ꧀ꦠꦮꦫ',
    kategori: 'Hari & Pasaran',
    artiSingkat: 'Siklus 7 hari dalam sepekan (Ahad hingga Setu).',
    maknaMendalam: 'Saptawara merefleksikan perputaran benda langit purba (Matahari, Bulan, Mars, Merkurius, Yupiter, Venus, Saturnus) yang memengaruhi watak, temperamen, dan peredaran nafsu manusia di muka bumi.',
    rujukanKitab: 'Serat Centhini & Primbon Betaljemur Adammakna',
    pedomanPraktis: 'Tiap hari memiliki watak khas: Ahad (Lakuning Srengenge), Senen (Lakuning Rembulan), Selasa (Lakuning Geni), Rebo (Lakuning Banyu), Kemis (Lakuning Angin), Jemuwah (Lakuning Lintang), Setu (Lakuning Bumi).'
  },
  {
    id: 'pancawara',
    istilah: 'Pancawara (Pasaran)',
    aksaraJawa: 'ꦥꦚ꧀ꦕꦮꦫ',
    kategori: 'Hari & Pasaran',
    artiSingkat: 'Siklus 5 hari pasaran Jawa (Legi, Pahing, Pon, Wage, Kliwon).',
    maknaMendalam: 'Pancawara bersumber dari kiblat papat kalima pancer yang melambangkan 4 elemen alam dan 4 arah mata angin mengelilingi satu titik poros keilahian di tengah-tengah.',
    rujukanKitab: 'Kitab Betaljemur Adammakna Bab Kiblat Papat',
    pedomanPraktis: 'Legi (Timur/Udara), Pahing (Selatan/Api), Pon (Barat/Air), Wage (Utara/Tanah), Kliwon (Tengah/Ruang Rohani Pancer).'
  },
  {
    id: 'wuku',
    istilah: 'Wuku (30 Siklus Pawukon)',
    aksaraJawa: 'ꦮꦸꦏꦸ',
    kategori: 'Kosmologi & Waktu',
    artiSingkat: 'Siklus kalender tradisi Jawa yang terdiri dari 30 pekan (setiap wuku berusia 7 hari, total 210 hari).',
    maknaMendalam: 'Berasal dari legenda Prabu Watugunung beserta 2 permaisuri dan 27 putranya. Setiap wuku berada di bawah pengawasan dewa pelindung (Batara) yang mencerminkan takdir, potensi bencana, dan keberuntungan sepekan.',
    rujukanKitab: 'Kitab Primbon Pawukon & Betaljemur Adammakna',
    pedomanPraktis: 'Digunakan untuk menentukan pantangan Taliwangke, Samparwangke, serta watak pembawaan pribadi.'
  },
  {
    id: 'taliwangke',
    istilah: 'Taliwangke',
    aksaraJawa: 'ꦠꦭꦶꦮꦁꦏꦺ',
    kategori: 'Pantangan & Naas',
    artiSingkat: 'Hari terlarang khusus pada tiap wuku yang pantang dipakai untuk akad nikah, buka usaha, atau boyongan.',
    maknaMendalam: 'Secara etimologi berarti "tali pengikat bangkai/kematian". Merupakan titik simpul di mana energi medan magnetik kosmis bumi sedang tidak harmonis dengan siklus wuku yang berjalan.',
    rujukanKitab: 'Kitab Betaljemur Adammakna Bab Taliwangke',
    pedomanPraktis: 'Sangat dianjurkan untuk tidak melangsungkan hajat besar pada hari Taliwangke wuku kelahiran maupun wuku yang sedang berlangsung.'
  },
  {
    id: 'samparwangke',
    istilah: 'Samparwangke',
    aksaraJawa: 'ꦱꦩ꧀ꦥꦂꦮꦁꦏꦺ',
    kategori: 'Pantangan & Naas',
    artiSingkat: 'Hari nahas wuku yang berarti "tersandung rintangan".',
    maknaMendalam: 'Jika Taliwangke adalah hari yang terikat, maka Samparwangke adalah hari tersandung. Segala usaha spekulatif, bepergian jauh, atau akad perkawinan dikhawatirkan menjumpai perselisihan atau kerugian.',
    rujukanKitab: 'Kitab Primbon Lukmanakim & Betaljemur Adammakna',
    pedomanPraktis: 'Hindari memulai perjalanan jarak jauh atau menandatangani kontrak krusial pada hari Samparwangke.'
  },
  {
    id: 'dina-sangar',
    istilah: 'Dina Sangar',
    aksaraJawa: 'ꦢꦶꦤꦱꦔꦂ',
    kategori: 'Pantangan & Naas',
    artiSingkat: 'Hari naas bulanan yang pantang digunakan untuk pernikahan agung.',
    maknaMendalam: 'Hari-hari tertentu pada tiap bulan penanggalan Jawa (Sura s.d. Besar) yang dipercaya sarat gejolak hawa panas dan rentan menimbulkan gesekan rumah tangga.',
    rujukanKitab: 'Kitab Betaljemur Adammakna Bab Dina Sangar',
    pedomanPraktis: 'Daftar tanggal Dina Sangar berbeda setiap bulannya, misalnya Sura tanggal 11, Sapar tanggal 20, Mulud tanggal 1, dll.'
  },
  {
    id: 'geblak',
    istilah: 'Dina Geblak (Hari Wafat Leluhur)',
    aksaraJawa: 'ꦒꦼꦧ꧀ꦭꦏ꧀',
    kategori: 'Pantangan & Naas',
    artiSingkat: 'Hari dan pasaran wafatnya orang tua atau kakek-nenek kandung.',
    maknaMendalam: 'Tradisi luhur Jawa mewajibkan penghormatan batin (*birrul walidain*) kepada leluhur. Pada hari geblak, anak keturunan diharapkan fokus mendoakan keselamatan arwah leluhur, bukan mengadakan pesta hura-hura.',
    rujukanKitab: 'Serat Pepali Ki Ageng Selo & Betaljemur Adammakna',
    pedomanPraktis: 'Pantang menggelar resepsi pernikahan atau hajat gembira bertepatan dengan weton geblak orang tua, kecuali diadakan selamatan doa ziarah terlebih dahulu.'
  },
  {
    id: 'salaki-rabi',
    istilah: 'Salaki-Rabi',
    aksaraJawa: 'ꦱꦭꦏꦶꦫꦧꦶ',
    kategori: 'Jodoh & Nikah',
    artiSingkat: 'Ilmu petung pernikahan adat Jawa untuk mengukur kecocokan batin dan lahiriah sepasang calon pengantin.',
    maknaMendalam: 'Dari kata "Salaki" (perilaku suami) dan "Rabi" (istri). Memadukan neptu kedua insan untuk mengantisipasi dinamika bahtera rumah tangga, rezeki, serta keturunan.',
    rujukanKitab: 'Kitab Betaljemur Adammakna Bab Salaki Rabi',
    pedomanPraktis: 'Dianalisis menggunakan sistem pembagian 8 (Pegat, Ratu, Jodoh, Topo, Tinari, Padu, Sujanan, Pesthi) serta pembagian 5 Pancasuda.'
  },
  {
    id: 'pancasuda',
    istilah: 'Pancasuda',
    aksaraJawa: 'ꦥꦚ꧀ꦕꦱꦸꦢ',
    kategori: 'Jodoh & Nikah',
    artiSingkat: 'Sistem pembagian kelipatan lima (Sri, Lungguh, Gedhong, Lara, Pati).',
    maknaMendalam: 'Menggambarkan lima fase hukum alam: Sri (kemakmuran pangan), Lungguh (kedudukan/kehormatan), Gedhong (harta kekayaan), Lara (ujian sakit/prihatin), Pati (akhir siklus/kematian).',
    rujukanKitab: 'Kitab Betaljemur Adammakna Bab Pancasuda',
    pedomanPraktis: 'Sisa 1 (Sri), sisa 2 (Lungguh), dan sisa 3 (Gedhong) merupakan hasil terbaik yang paling dicari untuk hajat mantu atau boyongan rumah.'
  },
  {
    id: 'pal-srigati',
    istilah: 'Pal Srigati',
    aksaraJawa: 'ꦥꦭ꧀ꦱꦿꦶꦒꦠꦶ',
    kategori: 'Rezeki & Karir',
    artiSingkat: 'Tabel fluktuasi pasang surut rezeki manusia setiap siklus 6 tahun sekali seumur hidup.',
    maknaMendalam: 'Rezeki manusia ibarat roda cakra manggilingan: ada masa di bawah (prihatin) dan masa di atas (keemasan). Petung ini mengajarkan agar manusia tidak takabur saat jaya dan tidak putus asa saat surut.',
    rujukanKitab: 'Kitab Betaljemur Adammakna Bab Pal Srigati',
    pedomanPraktis: 'Skala nilai berkisar 0 s.d. 9. Nilai 4–9 menunjukkan masa panen rezeki, sedangkan nilai 1–2 menuntut laku prihatin dan efisiensi modal.'
  },
  {
    id: 'naga-dina',
    istilah: 'Naga Dina',
    aksaraJawa: 'ꦤꦒꦢꦶꦤ',
    kategori: 'Rezeki & Karir',
    artiSingkat: 'Arah posisi kepala naga gaib penguasa hari yang pantang dihadapi secara beradu muka.',
    maknaMendalam: 'Naga Dina adalah metafora arah konsentrasi medan magnetik dan angin atmosfer pada hari tertentu. Berjalan menantang kepala naga dipercaya memperberat usaha penjemputan rezeki.',
    rujukanKitab: 'Kitab Betaljemur Adammakna Bab Sandang Pangan',
    pedomanPraktis: 'Jemputlah rezeki ke arah ekor naga atau punggungnya, dan hindari bepergian lurus menghadap moncong naga hari tersebut.'
  },
  {
    id: 'satriya-jayabaya',
    istilah: '7 Satriya Jayabaya',
    aksaraJawa: 'ꦱꦠꦿꦶꦪꦗꦪꦧꦪ',
    kategori: 'Kosmologi & Waktu',
    artiSingkat: 'Tujuh tipologi karakter kepemimpinan agung Nusantara dalam Serat Jangka Jayabaya.',
    maknaMendalam: 'Doktrin kepemimpinan Prabu Jayabaya yang memadukan kebijaksanaan batin, ketabahan, keberanian, dan sifat kenegarawanan tanpa pamrih harta (*sugih tanpa bandha*).',
    rujukanKitab: 'Serat Jangka Jayabaya & Kraton Kediri',
    pedomanPraktis: 'Tiap orang membawa benih salah satu dari 7 Satriya (Jinurung Sari, Lelana Tapa Angin, Pambukaning Gapura, Pinandhita Sinungan Kadar, Boyong Pambukaning Praja, Mukti Wibawa Kesdu Prawira, Hamong Praja).'
  },
  {
    id: 'kalatidha',
    istilah: 'Kalatidha (Zaman Edan)',
    aksaraJawa: 'ꦏꦭꦠꦶꦝ',
    kategori: 'Kosmologi & Waktu',
    artiSingkat: 'Zaman kekacauan nilai moral, keraguan, dan terbolak-baliknya kebenaran.',
    maknaMendalam: 'Karya mahakarya R.Ng. Ranggawarsita: *"Amenangi zaman edan, ewuh aya ing pambudi..."*. Menegaskan bahwa betapa pun beruntungnya orang yang lupa atau ikut gila, masih jauh lebih utama orang yang *eling lan waspada*.',
    rujukanKitab: 'Serat Kalatidha Kasunanan Surakarta Hadiningrat',
    pedomanPraktis: 'Pegang teguh integritas moral batiniah, jangan tergiur jalan pintas kejahatan di tengah zaman yang serba pragmatis.'
  },
  {
    id: 'sukerta',
    istilah: 'Anak Sukerta',
    aksaraJawa: 'ꦱꦸꦏꦼꦂꦠ',
    kategori: 'Ruwatan & Sukerta',
    artiSingkat: 'Status kelahiran tertentu dalam silsilah keluarga yang rentan terhadap sengkala Batara Kala.',
    maknaMendalam: 'Secara etimologi berarti "kotoran" atau "beban karmis". Anak yang lahir dalam konfigurasi rentan (anak tunggal, kembar silang, lima bersaudara, dll.) dipandang memerlukan perlindungan batin kolektif dari keluarga.',
    rujukanKitab: 'Kitab Primbon Lukmanakim & Serat Centhini',
    pedomanPraktis: 'Dianjurkan mengadakan upacara Ruwatan Murwakala atau memanjatkan doa selamatan sedekah dhuafa untuk menyucikan energi sengkala.'
  },
  {
    id: 'murwakala',
    istilah: 'Ruwatan Murwakala',
    aksaraJawa: 'ꦩꦸꦂꦮꦏꦭ',
    kategori: 'Ruwatan & Sukerta',
    artiSingkat: 'Upacara adat Jawa dengan pagelaran wayang kulit lakon Murwakala oleh Dalang Ruwat bersuci.',
    maknaMendalam: 'Upacara agung untuk membebaskan manusia dari mangsa hawa nafsu Batara Kala. Menyadarkan manusia bahwa waktu (*Kala*) akan menelan siapa saja yang lalai dari jalan kebaikan.',
    rujukanKitab: 'Kitab Murwakala Kraton Surakarta & Yogyakarta',
    pedomanPraktis: 'Dilaksanakan dengan sarana ubarampe sesaji adat lengkap, siraman air kembang setaman 7 rupa, dan pemotongan rambut simbolik.'
  },
  {
    id: 'pranata-mangsa',
    istilah: 'Pranata Mangsa',
    aksaraJawa: 'ꦥꦿꦤꦠꦩꦁꦱ',
    kategori: 'Kosmologi & Waktu',
    artiSingkat: 'Sistem penanggalan 12 musim Jawa berbasis peredaran semu matahari dan gejala bio-ekologis alam.',
    maknaMendalam: 'Dibakukan secara resmi oleh Sri Susuhunan Pakubuwana VII pada tahun 1855. Menjadi panduan agraris, maritim, dan manajemen kesehatan lingkungan masyarakat Jawa kuno.',
    rujukanKitab: 'Pranata Mangsa Kasunanan Surakarta 1855',
    pedomanPraktis: 'Memprediksi musim tanam, masa angin laut, kerentanan wabah penyakit musiman, dan tingkah laku satwa.'
  },
  {
    id: 'windu',
    istilah: 'Windu',
    aksaraJawa: 'ꦮꦶꦤ꧀ꦢꦸ',
    kategori: 'Kosmologi & Waktu',
    artiSingkat: 'Siklus waktu delapan tahun Jawa (Adi, Kuntara, Sengara, Sancaya).',
    maknaMendalam: 'Setiap windu memiliki karakter kosmik sendiri yang berulang dalam rentang 8 tahun (Alip, Ehe, Jimawal, Je, Dal, Be, Wawu, Jimakhir), menciptakan resonansi energi alam dan peradaban.',
    rujukanKitab: 'Kitab Primbon Betaljemur Adammakna Bab Windu',
    pedomanPraktis: 'Digunakan untuk menyelaraskan kalender Sultan Agungan dengan daur pasaran Kurup Asapon.'
  }
];
