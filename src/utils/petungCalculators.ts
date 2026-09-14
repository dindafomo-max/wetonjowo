import { BoyonganWismaResult, RekomendasiHariNikah, SalakiRabiResult, WetonInfo, WetonPantanganItem } from '../types/weton';
import { hitungWetonLengkap } from './javaneseCalendar';

// 1. MODUL KECOCOKAN PASANGAN HIDUP (PETUNG SALAKI-RABI)
export function hitungSalakiRabi(
  pria: { nama: string; tglLahir: string; anakKe: number },
  wanita: { nama: string; tglLahir: string; anakKe: number }
): SalakiRabiResult {
  const wetonPria = hitungWetonLengkap(pria.tglLahir);
  const wetonWanita = hitungWetonLengkap(wanita.tglLahir);
  const totalNeptu = wetonPria.neptuTotal + wetonWanita.neptuTotal;

  // Pembagian 8 (Metode Utama Kitab Betaljemur Adammakna Bab Salaki-Rabi)
  const sisa8Raw = totalNeptu % 8;
  const sisa8 = sisa8Raw === 0 ? 8 : sisa8Raw;

  type Kategori8Data = {
    nama: 'Pegat' | 'Ratu' | 'Jodoh' | 'Topo' | 'Tinari' | 'Padu' | 'Sujanan' | 'Pesthi';
    makna: string;
    prediksi: string;
    rekomendasiMitigasi: string;
    tingkatKecocokan: number;
    status: 'Sangat Baik' | 'Baik' | 'Cukup (Perlu Mitigasi)' | 'Perhatian Khusus';
  };

  const kategori8Map: Record<number, Kategori8Data> = {
    1: {
      nama: 'Pegat',
      makna: 'Tantangan dalam komunikasi dan manajemen keuangan rumah tangga.',
      prediksi: 'Berpotensi menghadapi ujian ekonomi di awal perkawinan atau perbedaan pendapat yang meruncing jika tidak dikomunikasikan secara transparan.',
      rekomendasiMitigasi: 'Disarankan menyelaraskan perencanaan keuangan secara tertulis, mengedepankan musyawarah mufakat, serta memilih hari pernikahan berneptu pelindung (neptu 13 atau 14).',
      tingkatKecocokan: 65,
      status: 'Cukup (Perlu Mitigasi)',
    },
    2: {
      nama: 'Ratu',
      makna: 'Keharmonisan tinggi, berwibawa, dan disegani lingkungan.',
      prediksi: 'Pasangan ini dipandang serasi oleh keluarga dan masyarakat. Membawa keteduhan, dihormati oleh tetangga, serta rezeki mengalir cukup dan berkah.',
      rekomendasiMitigasi: 'Tetap rendah hati, memperbanyak sedekah kepada tetangga, dan aktif membina kegiatan sosial kemasyarakatan.',
      tingkatKecocokan: 95,
      status: 'Sangat Baik',
    },
    3: {
      nama: 'Jodoh',
      makna: 'Kecocokan jiwa yang saling melengkapi (Garwa - Sigaraning Nyawa).',
      prediksi: 'Sifat kedua pasangan saling menutup kekurangan. Rumah tangga cenderung rukun, tentram, dan awet hingga usia senja.',
      rekomendasiMitigasi: 'Menjaga kebiasaan quality time bersama dan merawat komunikasi penuh kasih sayang.',
      tingkatKecocokan: 92,
      status: 'Sangat Baik',
    },
    4: {
      nama: 'Topo',
      makna: 'Menempuh masa prihatin di awal, memetik kemuliaan di hari tua.',
      prediksi: 'Awal pernikahan membutuhkan kerja keras ekstra dan kesabaran meniti karier. Namun ketabahan bersama akan membuahkan kesuksesan finansial yang stabil di kemudian hari.',
      rekomendasiMitigasi: 'Membangun mentalitas hemat dan saling menguatkan saat proses berjuang, tidak membandingkan diri dengan pencapaian instan orang lain.',
      tingkatKecocokan: 78,
      status: 'Baik',
    },
    5: {
      nama: 'Tinari',
      makna: 'Keluasan rezeki, kemudahan sandang pangan, dan kebahagiaan.',
      prediksi: 'Mudah menemukan peluang usaha, hubungan relasi bisnis lancar, dan jarang mengalami kesulitan finansial yang berkepanjangan.',
      rekomendasiMitigasi: 'Mengalokasikan dana darurat dan sedekah rutin hari weton agar rezeki senantiasa barokah dan tidak memicu gaya hidup konsumtif.',
      tingkatKecocokan: 90,
      status: 'Sangat Baik',
    },
    6: {
      nama: 'Padu',
      makna: 'Kecenderungan sering berselisih paham ringan namun tidak sampai berpisah.',
      prediksi: 'Kedua pasangan memiliki argumen yang sama-sama kuat. Kerap terjadi silang pendapat tentang hal-hal sepele keseharian, namun rasa sayang tetap mengikat.',
      rekomendasiMitigasi: 'Belajar manajemen jeda (take a break) saat emosi naik, tidak memperdebatkan masalah di hadapan anak, dan menetapkan aturan kompromi bersama.',
      tingkatKecocokan: 70,
      status: 'Cukup (Perlu Mitigasi)',
    },
    7: {
      nama: 'Sujanan',
      makna: 'Ujian rasa percaya, godaan kecemburuan, atau perselisihan karena pihak luar.',
      prediksi: 'Rentang waktu tertentu kerap diuji kecurigaan atau campur tangan pihak ketiga/keluarga besar yang memicu prasangka.',
      rekomendasiMitigasi: 'Menerapkan keterbukaan total gawai/jadwal, menetapkan batas interaksi privasi dengan keluarga besar/teman, serta berdoa bersama tiap malam.',
      tingkatKecocokan: 62,
      status: 'Perhatian Khusus',
    },
    8: {
      nama: 'Pesthi',
      makna: 'Ketentraman lahir batin, damai, dan langgeng tanpa gejolak besar.',
      prediksi: 'Keluarga adem ayem, saling mendukung cita-cita, mampu melewati berbagai cobaan hidup dengan kepala dingin.',
      rekomendasiMitigasi: 'Syukuri keharmonisan ini dengan terus berbuat kebajikan dan mendidik anak dengan keteladanan budi luhur.',
      tingkatKecocokan: 96,
      status: 'Sangat Baik',
    },
  };

  const kategori8 = { sisa: sisa8, ...kategori8Map[sisa8] };

  // Pembagian 5 (Pancasuda Pernikahan)
  const sisa5Raw = totalNeptu % 5;
  const sisa5 = sisa5Raw === 0 ? 5 : sisa5Raw;
  const pancasudaMap: Record<number, { nama: 'Sri' | 'Lungguh' | 'Gedhong' | 'Lara' | 'Pati'; makna: string }> = {
    1: { nama: 'Sri', makna: 'Kelimpahan sandang, pangan, dan rezeki melimpah ruah.' },
    2: { nama: 'Lungguh', makna: 'Mendapat kedudukan terhormat, pangkat, dan disegani kerabat.' },
    3: { nama: 'Gedhong', makna: 'Kaya harta benda, kepemilikan aset/properti yang aman.' },
    4: { nama: 'Lara', makna: 'Rentan menghadapi sakit fisik atau kelelahan pikiran, jaga pola hidup sehat.' },
    5: { nama: 'Pati', makna: 'Tantangan perpisahan rezeki atau pekerjaan; dinetralisir dengan sedekah mitigasi dan doa tolak bala.' },
  };
  const pancasuda5 = { sisa: sisa5, ...pancasudaMap[sisa5] };

  // Pembagian 7 (Petung Sangarwaringin)
  const sisa7Raw = totalNeptu % 7;
  const sisa7 = sisa7Raw === 0 ? 7 : sisa7Raw;
  const petung7Map: Record<number, { nama: string; makna: string }> = {
    1: { nama: 'Wasesa Segara', makna: 'Berhati luas laksana samudra, murah ampun, pemaaf, dan berwibawa.' },
    2: { nama: 'Tunggak Semi', makna: 'Rezeki selalu bersemi kembali layaknya tunggul kayu yang bertunas.' },
    3: { nama: 'Satriya Wibawa', makna: 'Memperoleh kemuliaan, dihormati orang besar, dan berwibawa.' },
    4: { nama: 'Sumur Sinaba', makna: 'Menjadi tempat bertanya dan menimba ilmu bagi banyak orang.' },
    5: { nama: 'Satria Wirang', makna: 'Kerap menanggung malu atau fitnah; mitigasi dengan kejujuran dan sabar.' },
    6: { nama: 'Bumi Kapetak', makna: 'Rajin bekerja, tabah menahan lapar, tahan banting dalam kesulitan.' },
    7: { nama: 'Lebu Katiup Angin', makna: 'Sering berpindah-pindah atau cita-cita lambat terwujud; mitigasi dengan fokus dan hemat.' },
  };
  const petung7 = { sisa: sisa7, ...petung7Map[sisa7] };

  // Analisis Urutan Kelahiran (Anak Ke-)
  const isJipang = (pria.anakKe === 1 && wanita.anakKe === 4) || (pria.anakKe === 4 && wanita.anakKe === 1);
  const isLusan = (pria.anakKe === 3 && wanita.anakKe === 1) || (pria.anakKe === 1 && wanita.anakKe === 3);
  const isBarepBarep = pria.anakKe === 1 && wanita.anakKe === 1;
  const isRagilRagil = pria.anakKe > 4 && wanita.anakKe > 4;

  let namaPeringatan = 'Kombinasi Urutan Biasa / Netral';
  let uraianKelahiran = 'Tidak ditemukan larangan urutan lahir yang kaku. Pasangan dapat melangkah mantap.';
  let mitigasiKultural = 'Melangsungkan ijab kabul pada hari baik yang disepakati kedua keluarga besar.';

  if (isJipang) {
    namaPeringatan = 'Pantangan JIPANG (Siji karo Papat)';
    uraianKelahiran = 'Dalam falsafah Jawa, anak pertama memiliki sifat pemimpin dominan dan anak keempat terbiasa santai dinamis. Jika tidak ada yang mau mengalah, rawan terjadi dominasi sepihak.';
    mitigasiKultural = 'Mitigasi Adat Betaljemur: Kedua mempelai menggelar syukuran selamatan tumpeng pitu (tujuh jenis sayuran) dan akad nikah diselenggarakan dengan mahar yang membawa filosofi penyejuk jiwa.';
  } else if (isLusan) {
    namaPeringatan = 'Pantangan LUSAN (Telu karo Pambarep)';
    uraianKelahiran = 'Anak nomor 3 dan anak nomor 1 diyakini memiliki beban tanggung jawab keluarga yang berbeda ritme, sehingga membutuhkan penyesuaian ekspektasi.';
    mitigasiKultural = 'Mitigasi Adat Betaljemur: Akad nikah dilakukan dengan melepas sepasang burung merpati atau sedekah tumpeng beras kuning sebagai lambang pelepas aral dan penyatuan cinta.';
  } else if (isBarepBarep) {
    namaPeringatan = 'Kombinasi Pambarep karo Pambarep (Sulung & Sulung)';
    uraianKelahiran = 'Keduanya sama-sama mandiri dan terbiasa menjadi penopang keluarga adik-adiknya. Perlu pembagian peran yang jelas agar tidak berebut kemudi rumah tangga.';
    mitigasiKultural = 'Saling menyepakati batas privasi rumah tangga baru dan tidak memaksakan standar masing-masing keluarga asal.';
  }

  return {
    pria: { nama: pria.nama, weton: wetonPria, anakKe: pria.anakKe },
    wanita: { nama: wanita.nama, weton: wetonWanita, anakKe: wanita.anakKe },
    totalNeptu,
    kategori8,
    pancasuda5,
    petung7,
    analisisKelahiran: {
      isJipang,
      isLusan,
      isBarepBarep,
      isRagilRagil,
      namaPeringatan,
      uraian: uraianKelahiran,
      mitigasiKultural,
    },
    ringkasanObjektif: `Hasil petung neptu ${wetonPria.neptuTotal} + ${wetonWanita.neptuTotal} = ${totalNeptu} jatuh pada kategori "${kategori8.nama}" dan Pancasuda "${pancasuda5.nama}". Dalam kearifan Jawa, petung ini adalah pedoman antisipasi (waspada eling), bukan vonis takdir mutlak. Segala kekurangan dapat diimbangi dengan komunikasi sehat dan sedekah doa.`,
  };
}

// 2. MODUL PEMILIHAN HARI PERNIKAHAN (IJAB KABUL TERBAIK)
export function cariHariNikahTerbaik(
  priaBirthDate: string,
  wanitaBirthDate: string,
  startDateStr: string,
  daysToCheck: number = 45,
  customPantanganList: WetonPantanganItem[] = []
): RekomendasiHariNikah[] {
  const wetonPria = hitungWetonLengkap(priaBirthDate);
  const wetonWanita = hitungWetonLengkap(wanitaBirthDate);
  const neptuPasangan = wetonPria.neptuTotal + wetonWanita.neptuTotal;

  const results: RekomendasiHariNikah[] = [];
  const start = new Date(startDateStr);

  for (let i = 0; i < daysToCheck; i++) {
    const current = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    const dateIso = current.toISOString().split('T')[0];
    const wetonH = hitungWetonLengkap(dateIso);

    const totalTigaan = neptuPasangan + wetonH.neptuTotal;
    const alasanLarangan: string[] = [];

    // Cek Larangan Adat
    if (wetonH.isTaliwangke) {
      alasanLarangan.push(`Taliwangke wuku ${wetonH.wuku}`);
    }
    if (wetonH.isSamparwangke) {
      alasanLarangan.push(`Samparwangke wuku ${wetonH.wuku}`);
    }
    if (wetonH.isDinaSangar) {
      alasanLarangan.push(`Dina Sangar wulan`);
    }
    if (wetonH.isNaasTanggal) {
      alasanLarangan.push(`Naas Tanggal wulan`);
    }

    // Hindari hari naas lahir calon pengantin (Dina Koas / Geblak Weton)
    if (wetonH.hari === wetonPria.hari && wetonH.pasaran === wetonPria.pasaran) {
      alasanLarangan.push(`Weton sama persis dengan pengantin pria (${wetonPria.hari} ${wetonPria.pasaran})`);
    }
    if (wetonH.hari === wetonWanita.hari && wetonH.pasaran === wetonWanita.pasaran) {
      alasanLarangan.push(`Weton sama persis dengan pengantin wanita (${wetonWanita.hari} ${wetonWanita.pasaran})`);
    }

    // Cek Weton Pantangan Multi-Hari (Geblak Orang Tua, Naas Pribadi, dll)
    if (customPantanganList && customPantanganList.length > 0) {
      for (const pantangan of customPantanganList) {
        if (pantangan.aktif && wetonH.hari === pantangan.hari && wetonH.pasaran === pantangan.pasaran) {
          alasanLarangan.push(`Weton Pantangan [${pantangan.kategori}]: ${pantangan.keterangan} (${pantangan.hari} ${pantangan.pasaran})`);
        }
      }
    }

    // Pancasuda Hari H: (Total Tigaan) % 5
    const sisa5 = totalTigaan % 5 === 0 ? 5 : totalTigaan % 5;
    const pancasudaMap: Record<number, { nama: string; makna: string }> = {
      1: { nama: 'Sandang (Sri)', makna: 'Murah sandang rezeki berlimpah, hari sangat utama untuk ijab.' },
      2: { nama: 'Pangan (Lungguh)', makna: 'Kecukupan pangan, rezeki berkah, kedudukan baik.' },
      3: { nama: 'Gedhong (Kaya)', makna: 'Membangun kemakmuran harta benda yang kokoh.' },
      4: { nama: 'Lara (Sakit)', makna: 'Kurang dianjurkan karena energi penat/lemah.' },
      5: { nama: 'Pati (Tantangan)', makna: 'Dipantangi untuk akad nikah agung.' },
    };

    // Sisa Pembagian 4 (Kerta, Candi, Rogoh, Sempoyong)
    const sisa4 = totalTigaan % 4 === 0 ? 4 : totalTigaan % 4;
    const sisa4Map: Record<number, { nama: string; makna: string }> = {
      1: { nama: 'Guru / Kerta', makna: 'Kukuh sentosa, disegani banyak orang.' },
      2: { nama: 'Ratu / Candi', makna: 'Mulia dan penuh rahmat keberkahan.' },
      3: { nama: 'Rogoh', makna: 'Rentan godaan pemborosan.' },
      4: { nama: 'Sempoyong', makna: 'Goyah stabilitasnya, perlu mitigasi.' },
    };

    const isAmanAdat = alasanLarangan.length === 0;

    // Hitung Skor Berkah (0 - 100)
    let skor = 50;
    if (isAmanAdat) skor += 25;
    else skor -= 20 * alasanLarangan.length;

    if (sisa5 === 1 || sisa5 === 2 || sisa5 === 3) skor += 15;
    if (sisa4 === 1 || sisa4 === 2) skor += 10;

    skor = Math.max(10, Math.min(99, skor));

    // Saran jam ijab kabul berdasar pasaran
    const saranWaktuMap: Record<string, string> = {
      'Legi': 'Pagi hari pukul 07.30 - 09.30 (Saat Surya Kencana menyinari bumi)',
      'Pahing': 'Pagi menjelang siang pukul 09.00 - 11.00 (Saat energi wibawa optimal)',
      'Pon': 'Pagi pukul 08.00 - 10.00 atau Ba’da Ashar pukul 15.30 - 16.45',
      'Wage': 'Siang menjelang dzuhur pukul 10.00 - 11.30 (Saat teduh barokah)',
      'Kliwon': 'Pagi hari pukul 06.30 - 08.30 (Menyambut fajar ketenangan suci)',
    };

    results.push({
      tanggal: dateIso,
      hari: wetonH.hari,
      pasaran: wetonH.pasaran,
      neptuHariH: wetonH.neptuTotal,
      totalNeptuTigaan: totalTigaan,
      pancasudaHari: pancasudaMap[sisa5],
      sisaPembagian4: sisa4Map[sisa4],
      isAmanAdat,
      alasanLarangan,
      skorBerkah: skor,
      saranWaktuIjab: saranWaktuMap[wetonH.pasaran] || 'Pagi hari pukul 08.00 - 10.30 WIB',
    });
  }

  // Urutkan berdasarkan skor tertinggi & tanggal
  return results.sort((a, b) => b.skorBerkah - a.skorBerkah);
}

// 3. MODUL BOYONGAN WISMA (PINDAH RUMAH)
export function hitungBoyonganWisma(
  neptuKepalaKeluarga: number,
  tanggalPindah: string,
  customPantanganList: WetonPantanganItem[] = []
): BoyonganWismaResult {
  const wetonPindah = hitungWetonLengkap(tanggalPindah);
  const totalNeptu = neptuKepalaKeluarga + wetonPindah.neptuTotal;

  // Cek Pantangan Custom Multi-Hari
  let isPantangan = false;
  let pantanganDetail = '';

  if (customPantanganList && customPantanganList.length > 0) {
    const match = customPantanganList.find(
      (p) => p.aktif && p.hari === wetonPindah.hari && p.pasaran === wetonPindah.pasaran
    );
    if (match) {
      isPantangan = true;
      pantanganDetail = `Weton Pantangan [${match.kategori}]: ${match.keterangan} (${match.hari} ${match.pasaran})`;
    }
  }

  const sisaRaw = totalNeptu % 4;
  const sisa4 = sisaRaw === 0 ? 4 : sisaRaw;

  type KategoriWisma = 'Guru (Kerta)' | 'Ratu (Candi)' | 'Rogoh' | 'Sempoyong';

  const kategoriMap: Record<number, { kategori: KategoriWisma; uraian: string; saranMitigasi: string; waktuTerbaik: string }> = {
    1: {
      kategori: 'Guru (Kerta)',
      uraian: 'Sangat baik dan dihormati tetangga. Rumah tangga akan tenteram, anak-anak penurut, dan pemilik rumah dipercaya masyarakat.',
      saranMitigasi: 'Mengadakan doa syukuran selamatan jenang abang putih bersama tetangga terdekat saat pertama kali menginap.',
      waktuTerbaik: 'Pagi hari pukul 06.30 - 08.00 WIB (membawa beras, air kendi, dan lampu minyak menyala terlebih dahulu).',
    },
    2: {
      kategori: 'Ratu (Candi)',
      uraian: 'Rezeki melimpah ruah dan selamat dari marabahaya. Rumah terasa sejuk, aman, dan mendatangkan kedamaian bagi seisi keluarga.',
      saranMitigasi: 'Memperbanyak sedekah dan menanam tanaman hijau yang menyejukkan di halaman pekarangan.',
      waktuTerbaik: 'Pagi pukul 08.00 - 09.30 WIB dengan melangkahkan kaki kanan pertama kali melewati pintu utama.',
    },
    3: {
      kategori: 'Rogoh',
      uraian: 'Rentan terjadi kehilangan barang atau pemborosan tak terduga. Penghuni diuji untuk lebih disiplin dalam menjaga pintu dan kunci.',
      saranMitigasi: 'Pastikan instalasi kunci pintu rumah ganda, pasang penerangan luar yang memadai, dan lakukan sedekah tolak bala.',
      waktuTerbaik: 'Pukul 10.00 - 11.00 WIB, hindari boyongan setelah matahari terbenam.',
    },
    4: {
      kategori: 'Sempoyong',
      uraian: 'Kondisi kesehatan penghuni rentan mengalami kelelahan atau dinamika rumah tangga sedikit goyah di masa adaptasi.',
      saranMitigasi: 'Bersihkan sirkulasi udara dan sanitasi rumah dengan cermat sebelum ditempati, siram air doa di empat sudut pekarangan.',
      waktuTerbaik: 'Sebaiknya ditunda atau digeser ke hari lain yang berneptu Guru/Ratu.',
    },
  };

  const selected = kategoriMap[sisa4];

  return {
    neptuKeluarga: neptuKepalaKeluarga,
    tanggalPindah,
    wetonPindah,
    totalNeptu,
    sisa4,
    kategori: selected.kategori,
    uraian: selected.uraian,
    saranMitigasi: selected.saranMitigasi,
    waktuTerbaik: selected.waktuTerbaik,
    isPantangan,
    pantanganDetail,
  };
}
