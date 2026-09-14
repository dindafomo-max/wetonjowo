export const SPREADSHEET_SCHEMA = {
  namaDatabase: 'DATABASE_WETON_JOWO_BETALJEMUR',
  keterangan: 'Arsitektur Database Google Spreadsheet terintegrasi Google Drive untuk sistem WETON JOWO',
  tabel: [
    {
      namaSheet: 'Tabel_Weton',
      keterangan: 'Menyimpan riwayat kalkulasi dan master referensi neptu',
      kolom: [
        { header: 'A: Tanggal_Masehi', tipe: 'Date (YYYY-MM-DD)', contoh: '2026-09-12' },
        { header: 'B: Hari_Jawa', tipe: 'String', contoh: 'Setu' },
        { header: 'C: Pasaran', tipe: 'String', contoh: 'Wage' },
        { header: 'D: Neptu_Hari', tipe: 'Integer', contoh: '9' },
        { header: 'E: Neptu_Pasaran', tipe: 'Integer', contoh: '4' },
        { header: 'F: Neptu_Total', tipe: 'Integer', contoh: '13' },
        { header: 'G: Wuku', tipe: 'String', contoh: 'Julungwangi' },
        { header: 'H: Tahun_Jawa', tipe: 'String', contoh: '1959 Dal' },
        { header: 'I: Lambang_Unsur', tipe: 'String', contoh: 'Angin' },
        { header: 'J: Watak_Lahir', tipe: 'String', contoh: 'Lakuning Bintang' },
        { header: 'K: Status_Adat', tipe: 'String', contoh: 'Aman / Taliwangke' },
      ],
    },
    {
      namaSheet: 'Tabel_Wuku',
      keterangan: 'Master 30 Wuku beserta siklus larangan Taliwangke & Samparwangke',
      kolom: [
        { header: 'A: No_Wuku', tipe: 'Integer (1-30)', contoh: '1' },
        { header: 'B: Nama_Wuku', tipe: 'String', contoh: 'Sinta' },
        { header: 'C: Dewa_Pengayom', tipe: 'String', contoh: 'Batara Yamadipati' },
        { header: 'D: Taliwangke_Hari', tipe: 'String', contoh: 'Senen' },
        { header: 'E: Taliwangke_Pasaran', tipe: 'String', contoh: 'Kliwon' },
        { header: 'F: Samparwangke_Hari', tipe: 'String', contoh: 'Senen' },
        { header: 'G: Samparwangke_Pasaran', tipe: 'String', contoh: 'Pon' },
        { header: 'H: Arah_Kala_Wuku', tipe: 'String', contoh: 'Barat Laut' },
      ],
    },
    {
      namaSheet: 'Tabel_Hajat',
      keterangan: 'Konfigurasi rumus petung pernikahan, boyongan rumah, dan daur hidup',
      kolom: [
        { header: 'A: ID_Hajat', tipe: 'String', contoh: 'HJT-NIKAH-8' },
        { header: 'B: Nama_Hajat', tipe: 'String', contoh: 'Petung Salaki-Rabi' },
        { header: 'C: Pembagi_Modulo', tipe: 'Integer', contoh: '8' },
        { header: 'D: Sisa_Nilai', tipe: 'Integer', contoh: '3' },
        { header: 'E: Nama_Kategori', tipe: 'String', contoh: 'Jodoh' },
        { header: 'F: Makna_Filosofis', tipe: 'String', contoh: 'Rukun tentram saling melengkapi' },
        { header: 'G: Rekomendasi_Mitigasi', tipe: 'String', contoh: 'Menjaga komunikasi dan doa bersama' },
        { header: 'H: Rujukan_Bab', tipe: 'String', contoh: 'Betaljemur Adammakna Bab 142' },
      ],
    },
    {
      namaSheet: 'Tabel_Firasat',
      keterangan: 'Ensiklopedia kedutan tubuh dan alamat gejala alam lengkap',
      kolom: [
        { header: 'A: ID_Firasat', tipe: 'String', contoh: 'KDT-001' },
        { header: 'B: Tipe_Gejala', tipe: 'String', contoh: 'Kedutan / Alamat Alam' },
        { header: 'C: Lokasi_Tubuh_Atau_Fenomena', tipe: 'String', contoh: 'Kelopak Mata Kanan Atas' },
        { header: 'D: Arti_Firasat_Klasik', tipe: 'String', contoh: 'Akan memperoleh rezeki halal' },
        { header: 'E: Kajian_Etnosains', tipe: 'String', contoh: 'Stimulus refleks saraf mikro fasialis' },
        { header: 'F: Status_Pertanda', tipe: 'String', contoh: 'Positif / Netral / Waspada' },
      ],
    },
  ],
};

export const GAS_CODE_GS = `/**
 * =========================================================================
 * WETON JOWO - Google Apps Script (Code.gs) Backend
 * Web Eksplorasi Tradisi & Orientasi Neptu Jawa Objektif Warisan Otentik
 * Bersumber dari Kitab Primbon Betaljemur Adammakna
 * =========================================================================
 */

// ID Spreadsheet yang berfungsi sebagai Database utama di Google Drive
// Ganti dengan Spreadsheet ID Anda (bisa dilihat pada URL Google Sheets)
var SPREADSHEET_ID = "MASUKKAN_SPREADSHEET_ID_ANDA_DISINI";

/**
 * Entry point untuk melayani Web App via browser (GET Request)
 */
function doGet(e) {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('WETON JOWO - Sistem Neptu Betaljemur Adammakna')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return htmlOutput;
}

/**
 * Master Data Hari dan Pasaran bersumber dari Betaljemur Adammakna
 */
var NEPTU_HARI = {
  'Ahad': 5, 'Senen': 4, 'Selasa': 3, 'Rebo': 7, 'Kemis': 8, 'Jemuwah': 6, 'Setu': 9
};

var NEPTU_PASARAN = {
  'Legi': 5, 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8
};

var LIST_WUKU = [
  'Sinta', 'Landep', 'Wukir', 'Kurantil', 'Tolu', 'Gumbreg',
  'Warigalit', 'Warigagung', 'Julungwangi', 'Sungsang', 'Galungan', 'Kuningan',
  'Langkir', 'Mandasiya', 'Julungpujut', 'Pahang', 'Kuruwelut', 'Marakeh',
  'Tambir', 'Medangkungan', 'Maktal', 'Wuye', 'Manahil', 'Prangbakat',
  'Bala', 'Wugu', 'Wayang', 'Kulawu', 'Dukut', 'Watugunung'
];

/**
 * 1. API: Menghitung Weton dari Tanggal Masehi (YYYY-MM-DD)
 */
function hitungWeton(tanggalMasehiStr) {
  var parts = tanggalMasehiStr.split('-');
  var year = parseInt(parts[0]);
  var month = parseInt(parts[1]);
  var day = parseInt(parts[2]);

  // Patokan Anchor: 24 Maret 2024 = Ahad Legi, Wuku Sinta (Wuku 1)
  var anchor = new Date(Date.UTC(2024, 2, 24));
  var target = new Date(Date.UTC(year, month - 1, day));
  var diffDays = Math.round((target - anchor) / (24 * 60 * 60 * 1000));

  var hariList = ['Ahad', 'Senen', 'Selasa', 'Rebo', 'Kemis', 'Jemuwah', 'Setu'];
  var pasaranList = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

  var hariIdx = ((diffDays % 7) + 7) % 7;
  var pasaranIdx = ((diffDays % 5) + 5) % 5;
  var wukuIdx = Math.floor((((diffDays % 210) + 210) % 210) / 7);

  var namaHari = hariList[hariIdx];
  var namaPasaran = pasaranList[pasaranIdx];
  var neptuH = NEPTU_HARI[namaHari];
  var neptuP = NEPTU_PASARAN[namaPasaran];
  var neptuTot = neptuH + neptuP;

  return {
    tanggal: tanggalMasehiStr,
    hari: namaHari,
    pasaran: namaPasaran,
    neptuHari: neptuH,
    neptuPasaran: neptuP,
    neptuTotal: neptuTot,
    wuku: LIST_WUKU[wukuIdx],
    wukuIndex: wukuIdx + 1
  };
}

/**
 * 2. API: Perhitungan Petung Salaki-Rabi (Kecocokan Jodoh)
 * Menggunakan pembagian 8 Betaljemur Adammakna + Analisis Urutan Lahir
 */
function hitungKecocokanJodoh(tglPria, anakKePria, tglWanita, anakKeWanita) {
  var wetonPria = hitungWeton(tglPria);
  var wetonWanita = hitungWeton(tglWanita);
  var totalNeptu = wetonPria.neptuTotal + wetonWanita.neptuTotal;

  var sisa8 = totalNeptu % 8 === 0 ? 8 : (totalNeptu % 8);
  var kategori8List = {
    1: { nama: 'Pegat', ket: 'Ujian ekonomi dan komunikasi, diselesaikan dengan transparansi.' },
    2: { nama: 'Ratu', ket: 'Sangat disegani, berwibawa, rumah tangga tenteram.' },
    3: { nama: 'Jodoh', ket: 'Saling melengkapi, cocok dan langgeng sampai tua.' },
    4: { nama: 'Topo', ket: 'Prihatin di awal perkawinan, sukses mapan di hari tua.' },
    5: { nama: 'Tinari', ket: 'Murah rezeki, kemudahan sandang pangan melimpah.' },
    6: { nama: 'Padu', ket: 'Sering beda argumen ringan, rukun kembali dengan kompromi.' },
    7: { nama: 'Sujanan', ket: 'Ujian kecemburuan, butuh saling percaya dan keterbukaan.' },
    8: { nama: 'Pesthi', ket: 'Kedamaian hati tinggi, adem ayem sekeluarga.' }
  };

  var isJipang = (anakKePria == 1 && anakKeWanita == 4) || (anakKePria == 4 && anakKeWanita == 1);
  var isLusan = (anakKePria == 3 && anakKeWanita == 1) || (anakKePria == 1 && anakKeWanita == 3);

  return {
    pria: wetonPria,
    wanita: wetonWanita,
    totalNeptu: totalNeptu,
    kategori8: kategori8List[sisa8],
    peringatanUrutan: isJipang ? 'Pantangan Jipang (1 & 4)' : (isLusan ? 'Pantangan Lusan (3 & 1)' : 'Urutan Normal'),
    mitigasiAdat: 'Selamatan tumpeng pitu dan akad pada hari baik berneptu seimbang.'
  };
}

/**
 * 3. Log data ke Google Spreadsheet jika dibutuhkan integrasi rekaman
 */
function simpanKeSpreadsheet(sheetName, dataArray) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    sheet.appendRow(dataArray);
    return { success: true, message: "Data berhasil disimpan ke Spreadsheet." };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}
`;

export const GAS_INDEX_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>WETON JOWO - Web App (Google Apps Script)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brandBlue: {
              DEFAULT: '#1e3a8a',
              dark: '#0f172a',
              light: '#3b82f6',
            },
            brandMaroon: {
              DEFAULT: '#881337',
              dark: '#4c0519',
              light: '#9f1239',
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-50 text-slate-900 font-sans pb-16">
  <!-- Header Ala Gojek -->
  <header class="bg-gradient-to-r from-blue-900 via-blue-950 to-rose-950 text-white p-4 sticky top-0 z-30 shadow-md">
    <div class="max-w-md mx-auto flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span>☸</span> WETON JOWO
        </h1>
        <p class="text-xs text-blue-200">Kitab Betaljemur Adammakna • Apps Script Edition</p>
      </div>
      <span class="px-2 py-1 bg-rose-800 text-xs font-semibold rounded-full border border-rose-400">GAS v1.0</span>
    </div>
  </header>

  <main class="max-w-md mx-auto p-4 space-y-4">
    <!-- Kartu Saldo Neptu -->
    <div class="bg-gradient-to-br from-blue-900 to-blue-950 text-white p-5 rounded-2xl shadow-lg border border-blue-800">
      <div class="text-xs uppercase tracking-wider text-blue-300 font-semibold mb-1">Kalkulator Cepat Hari Ini</div>
      <div class="flex items-baseline justify-between">
        <h2 id="todayWetonDisplay" class="text-2xl font-black text-white">Menghitung Weton...</h2>
        <span id="todayNeptuBadge" class="bg-rose-900 text-rose-200 text-xs px-2.5 py-1 rounded-full font-bold">Neptu -</span>
      </div>
      <p id="todayWukuDisplay" class="text-xs text-blue-200 mt-1">Wuku: Memuat...</p>
    </div>

    <!-- Form Cek Weton & Salaki-Rabi -->
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
      <h3 class="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2 text-rose-900">
        <span>💍</span> Petung Jodoh Salaki-Rabi
      </h3>
      <div class="space-y-3">
        <div>
          <label class="text-xs font-semibold text-slate-600 block mb-1">Tanggal Lahir Calon Suami (Pria)</label>
          <input type="date" id="tglPria" class="w-full text-sm p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none">
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-600 block mb-1">Tanggal Lahir Calon Istri (Wanita)</label>
          <input type="date" id="tglWanita" class="w-full text-sm p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none">
        </div>
        <button onclick="prosesPetung()" class="w-full bg-gradient-to-r from-blue-900 to-rose-900 hover:from-blue-800 hover:to-rose-800 text-white font-bold py-2.5 rounded-xl shadow text-sm transition">
          Hitung Kecocokan Betaljemur
        </button>
      </div>
    </div>

    <!-- Hasil Komputasi -->
    <div id="hasilBox" class="hidden bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2">
      <h4 class="font-bold text-blue-900 text-sm">Hasil Petung Betaljemur Adammakna:</h4>
      <div id="hasilContent" class="text-xs text-slate-700 leading-relaxed"></div>
    </div>
  </main>

  <script>
    window.onload = function() {
      // Inisialisasi tanggal hari ini
      var today = new Date().toISOString().split('T')[0];
      document.getElementById('tglPria').value = '1995-05-12';
      document.getElementById('tglWanita').value = '1997-08-20';
      
      // Hitung weton hari ini di frontend atau via google.script.run jika di GAS
      if (typeof google !== 'undefined' && google.script) {
        google.script.run.withSuccessHandler(function(res) {
          document.getElementById('todayWetonDisplay').innerText = res.hari + ' ' + res.pasaran;
          document.getElementById('todayNeptuBadge').innerText = 'Neptu ' + res.neptuTotal;
          document.getElementById('todayWukuDisplay').innerText = 'Wuku ' + res.wuku;
        }).hitungWeton(today);
      } else {
        document.getElementById('todayWetonDisplay').innerText = "Simulasi Offline";
        document.getElementById('todayNeptuBadge').innerText = "Neptu 13";
        document.getElementById('todayWukuDisplay').innerText = "Wuku Sinta";
      }
    };

    function prosesPetung() {
      var p = document.getElementById('tglPria').value;
      var w = document.getElementById('tglWanita').value;
      if (!p || !w) return alert('Silakan pilih kedua tanggal lahir.');

      if (typeof google !== 'undefined' && google.script) {
        google.script.run.withSuccessHandler(function(res) {
          tampilkanHasil(res);
        }).hitungKecocokanJodoh(p, 1, w, 2);
      } else {
        alert('Fitur ini memanggil backend GAS (Code.gs). Saat dideploy di Google Drive, data akan diproses langsung!');
      }
    }

    function tampilkanHasil(res) {
      var box = document.getElementById('hasilBox');
      var c = document.getElementById('hasilContent');
      box.classList.remove('hidden');
      c.innerHTML = '<strong>' + res.kategori8.nama + '</strong>: ' + res.kategori8.ket + '<br><br><em>Mitigasi:</em> ' + res.mitigasiAdat;
    }
  </script>
</body>
</html>
`;
