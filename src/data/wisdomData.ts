// ============================================================================
// DATA WEJANGAN LUHUR, PARIBASAN JAWA, & FAQ EDUKATIF ETNOSAINS
// WETON JOWO SaaS - Berdasar Serat Wulangreh, Wedhatama, & Betaljemur Adammakna
// ============================================================================

export interface PituturItem {
  id: string;
  aksaraJawa: string;
  teksJawa: string;
  artiIndonesia: string;
  filosofi: string;
  sumber: string;
  kategori: 'Kepemimpinan' | 'Ketenangan Jiwa' | 'Etika Sosial' | 'Rezeki & Syukur' | 'Keberanian';
}

export interface FaqItem {
  id: string;
  pertanyaan: string;
  kategori: 'Dasar Weton' | 'Pernikahan & Jodoh' | 'Rezeki & Arah' | 'Pantangan & Mitigasi';
  jawaban: string;
  rujukanKitab: string;
}

export const DAFTAR_PITUTUR_LUHUR: PituturItem[] = [
  {
    id: 'pitutur-1',
    aksaraJawa: 'ꦈꦫꦶꦥ꧀ꦲꦶꦏꦸꦲꦸꦫꦸꦥ꧀',
    teksJawa: 'Urip Iku Urup',
    artiIndonesia: 'Hidup itu menyala dan memberikan penerangan bagi sesama.',
    filosofi: 'Hakikat sejati keberadaan manusia di dunia adalah memberi manfaat, menebarkan welas asih, serta menjadi suluh kebaikan bagi lingkungan sekitarnya tanpa pamrih.',
    sumber: 'Falsafah Luhur Kejawen',
    kategori: 'Ketenangan Jiwa',
  },
  {
    id: 'pitutur-2',
    aksaraJawa: 'ꦩꦼꦩꦪꦸꦲꦪꦸꦤꦶꦁꦧꦮꦤ',
    teksJawa: 'Memayu Hayuning Bawana',
    artiIndonesia: 'Memperindah dan menjaga keselarasan alam semesta beserta isinya.',
    filosofi: 'Menjaga harmoni makrokosmos (Jagad Gedhe) dan mikrokosmos (Jagad Cilik), menahan diri dari kerakusan yang merusak tatanan ekologi dan sosial.',
    sumber: 'Serat Centhini & Ajaran Kraton',
    kategori: 'Etika Sosial',
  },
  {
    id: 'pitutur-3',
    aksaraJawa: 'ꦱꦸꦫꦢꦶꦫꦗꦪꦤꦶꦁꦫꦠ꧀ꦭꦼꦧꦸꦂꦢꦺꦤꦶꦁꦥꦔꦱ꧀ꦠꦸꦠꦶ',
    teksJawa: 'Sura Dira Jayaningrat Lebur Dening Pangastuti',
    artiIndonesia: 'Segala bentuk angkara murka, kesombongan, dan kekerasan akan luluh oleh kelembutan hati dan budi pekerti luhur.',
    filosofi: 'Kekuatan terbesar bukanlah senjata atau kepongahan fisik, melainkan kesabaran, kerendahan hati, dan doa yang tulus.',
    sumber: 'Serat Wedhatama (KGPAA Mangkunegara IV)',
    kategori: 'Keberanian',
  },
  {
    id: 'pitutur-4',
    aksaraJawa: 'ꦤꦫꦶꦩꦲꦶꦁꦥꦤ꧀ꦢꦸꦩ꧀',
    teksJawa: 'Narima Ing Pandum',
    artiIndonesia: 'Menerima dengan ikhlas dan penuh syukur atas segala takdir dan bagian rezeki dari Yang Maha Kuasa.',
    filosofi: 'Bukan sikap pasif atau menyerah, melainkan ketenangan batin tertinggi setelah mengerahkan seluruh ikhtiar maksimal.',
    sumber: 'Serat Wulangreh (Sri Susuhunan Pakubuwana IV)',
    kategori: 'Rezeki & Syukur',
  },
  {
    id: 'pitutur-5',
    aksaraJawa: 'ꦄꦗꦢꦸꦩꦺꦃꦄꦗꦒꦸꦩꦼꦝꦺ',
    teksJawa: 'Aja Dumeh, Aja Gumede',
    artiIndonesia: 'Jangan mentang-mentang berkuasa/kaya, dan jangan bersikap congkak.',
    filosofi: 'Roda kehidupan senantiasa berputar. Ketinggian derajat menuntut tanggung jawab moral yang lebih besar untuk melindungi kaum yang lemah.',
    sumber: 'Wejangan Sesepuh Tanah Jawa',
    kategori: 'Kepemimpinan',
  },
  {
    id: 'pitutur-6',
    aksaraJawa: 'ꦱꦧꦂꦱꦫꦺꦃꦱꦸꦩꦼꦭꦺꦃ',
    teksJawa: 'Sabar, Sareh, Sumeleh',
    artiIndonesia: 'Sabar dalam ujian, tenang dalam berpikir, berserah diri kepada Sang Pencipta.',
    filosofi: 'Tiga pilar ketangguhan mental menghadapi badai kehidupan agar jiwa tetap teduh dan tidak terombang-ambing oleh kecemasan duniawi.',
    sumber: 'Naskah Kuno Betaljemur',
    kategori: 'Ketenangan Jiwa',
  },
];

export const DAFTAR_FAQ_PETUNG: FaqItem[] = [
  {
    id: 'faq-0',
    kategori: 'Dasar Weton',
    pertanyaan: 'Apakah isi dan hasil perhitungan di sistem WETON JOWO wajib/harus dipercayai?',
    jawaban: 'Sama sekali TIDAK WAJIB. Apa yang ada di dalam sistem ini semata-mata bersifat INFORMATIF sebagai khazanah literasi budaya Nusantara dan wawasan etnosains para leluhur. Pengguna cukup MENGETAHUI dan mempelajari kekayaan budayanya saja tanpa harus mempercayainya sebagai kebenaran mutlak penentu nasib. Segala urusan takdir, jodoh, rezeki, umur, dan keselamatan sepenuhnya berada di tangan kekuasaan Tuhan Yang Maha Esa (Allah SWT).',
    rujukanKitab: 'Prakata & Maklumat Keilmuan WETON JOWO',
  },
  {
    id: 'faq-1',
    kategori: 'Dasar Weton',
    pertanyaan: 'Apa itu Kitab Primbon Betaljemur Adammakna dan bagaimana hubungannya dengan Weton?',
    jawaban: 'Kitab Primbon Betaljemur Adammakna adalah naskah kanonik yang dihimpun oleh KPH Tjakraningrat dari Kraton Ngayogyakarta Hadiningrat. Kitab ini merupakan ensiklopedia etnosains terlengkap yang mencakup ilmu astronomi tradisional (Pranata Mangsa), matematika siklus 210 hari (Pawukon), sistem neptu hari dan pasaran, hingga panduan daur hidup manusia.',
    rujukanKitab: 'Kitab Primbon Betaljemur Adammakna Bab I & II',
  },
  {
    id: 'faq-2',
    kategori: 'Dasar Weton',
    pertanyaan: 'Bagaimana cara menghitung nilai Neptu Weton kelahiran seseorang?',
    jawaban: 'Neptu dihitung dengan menjumlahkan nilai angka Hari Masehi/Jawa (Ahad=5, Senen=4, Selasa=3, Rebo=7, Kemis=8, Jemuwah=6, Setu=9) dengan nilai Pasaran (Legi=5, Pahing=9, Pon=7, Wage=4, Kliwon=8). Contoh: Jumat Kliwon memiliki neptu 6 + 8 = 14.',
    rujukanKitab: 'Petung Neptu Dina & Pasaran Betaljemur',
  },
  {
    id: 'faq-3',
    kategori: 'Pernikahan & Jodoh',
    pertanyaan: 'Bagaimana petung jodoh Salaki-Rabi 8 Kategori bekerja?',
    jawaban: 'Total neptu kedua calon mempelai dijumlahkan lalu dibagi 8 (atau dimodulo 8). Sisa angka menghasilkan kategori: 1 (Pegat), 2 (Ratu), 3 (Jodoh), 4 (Topo), 5 (Tinari), 6 (Padu), 7 (Sujanan), dan 8 (Pesthi). Masing-masing memiliki karakteristik dinamika rumah tangga serta mitigasi ikhtiar yang dianjurkan.',
    rujukanKitab: 'Serat Salaki-Rabi & Betaljemur Bab Pawiwahan',
  },
  {
    id: 'faq-4',
    kategori: 'Pantangan & Mitigasi',
    pertanyaan: 'Apa yang dimaksud dengan Pantangan Selawe (Neptu 25) dan bagaimana solusinya?',
    jawaban: 'Neptu 25 (Selawe) adalah jumlah neptu pasangan yang dipercaya memiliki energi benturan kuat pada tahun-tahun awal pernikahan. Primbon tidak melarang pernikahan ini, melainkan memberikan solusi mitigasi adat (syarat ikhtiar) seperti: memilih tanggal ijab pada hari berneptu dingin (Satria Wibawa), melangsungkan ijab setelah melewati hari geblak, serta memperbanyak sedekah tumpeng robyong.',
    rujukanKitab: 'Betaljemur Adammakna Bab Selawe & Tolak Bala',
  },
  {
    id: 'faq-5',
    kategori: 'Rezeki & Arah',
    pertanyaan: 'Apa fungsi kompas Naga Dina dan Pal Srigati dalam mencari nafkah?',
    jawaban: 'Naga Dina memetakan arah orientasi kepala dan ekor naga harian berdasarkan neptu hari berjalan agar pedagang atau perantau dapat menghindari arah hadapan naga (Cangkem Naga) dan memanfaatkan arah berkah (Geger Naga). Sedangkan Pal Srigati menghitung siklus naik-turun rezeki setiap 6 tahun sekali berdasarkan jumlah neptu kelahiran.',
    rujukanKitab: 'Pal Srigati & Petung Arah Rezeki Betaljemur',
  },
  {
    id: 'faq-6',
    kategori: 'Dasar Weton',
    pertanyaan: 'Apakah hasil petung weton bersifat takdir mutlak (fatalistis)?',
    jawaban: 'Sama sekali tidak. Para pujangga dan sesepuh Jawa menegaskan bahwa Petung Jawa adalah "Ngelmu Titen" (sains empiris probabilitas) dan sarana "Waspada Purbawasesa" (ikhtiar kehati-hatian). Hasil perhitungan dimaksudkan sebagai peta peringatan dini agar manusia senantiasa mendekatkan diri kepada Tuhan Yang Maha Esa melalui doa, sedekah, dan mawas diri.',
    rujukanKitab: 'Serat Centhini & Falsafah Luhur Jawa',
  },
];
