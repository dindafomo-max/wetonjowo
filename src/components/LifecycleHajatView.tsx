import React, { useState, useMemo } from 'react';
import { Home, Baby, CalendarClock, Sun, Sparkles, CheckCircle2, AlertCircle, ArrowRight, ShieldAlert, ShieldCheck } from 'lucide-react';
import { PRANATA_MANGSA_DATA } from '../data/primbonData';
import { hitungWetonLengkap, getNextWetonanDates, getTedakSitenDate, getTingkepanEstimate } from '../utils/javaneseCalendar';
import { hitungBoyonganWisma } from '../utils/petungCalculators';
import { useWetonPantangan } from '../context/WetonPantanganContext';
import { InlinePantanganStep } from './InlinePantanganStep';
import { WetonPantanganModal } from './WetonPantanganModal';

export const LifecycleHajatView: React.FC = () => {
  const { activePantanganList, checkTanggalPantangan } = useWetonPantangan();
  const [isPantanganModalOpen, setIsPantanganModalOpen] = useState(false);
  const [subTab, setSubTab] = useState<'boyongan' | 'tingkepan' | 'tedaksiten' | 'wetonan' | 'pranata'>('boyongan');

  // 1. Boyongan Wisma state
  const [neptuKepala, setNeptuKepala] = useState<number>(14);
  const [tglPindah, setTglPindah] = useState('2026-10-15');
  const hasilBoyongan = useMemo(() => {
    return hitungBoyonganWisma(neptuKepala, tglPindah, activePantanganList);
  }, [neptuKepala, tglPindah, activePantanganList]);

  // 2. Tingkepan state (HPHT)
  const [tglHpht, setTglHpht] = useState('2026-03-10');
  const hasilTingkepan = useMemo(() => {
    return getTingkepanEstimate(tglHpht);
  }, [tglHpht]);
  const tingkepanPantangan = useMemo(() => {
    return checkTanggalPantangan(hasilTingkepan.tanggal);
  }, [checkTanggalPantangan, hasilTingkepan.tanggal]);

  // 3. Tedak Siten state (Birth date of baby)
  const [tglLahirBayi, setTglLahirBayi] = useState('2026-01-20');
  const hasilTedakSiten = useMemo(() => {
    return getTedakSitenDate(tglLahirBayi);
  }, [tglLahirBayi]);
  const tedakSitenPantangan = useMemo(() => {
    return checkTanggalPantangan(hasilTedakSiten.tanggal);
  }, [checkTanggalPantangan, hasilTedakSiten.tanggal]);

  // 4. Sedekah Wetonan 35 hari
  const [tglLahirSendiri, setTglLahirSendiri] = useState('1992-07-08');
  const wetonSendiri = useMemo(() => hitungWetonLengkap(tglLahirSendiri), [tglLahirSendiri]);
  const jadwalWetonan = useMemo(() => getNextWetonanDates(tglLahirSendiri, 8), [tglLahirSendiri]);

  const currentMatchedPantangan = useMemo(() => {
    if (subTab === 'boyongan' && hasilBoyongan.isPantangan) {
      return hasilBoyongan.pantanganDetail;
    }
    if (subTab === 'tingkepan' && tingkepanPantangan.isPantangan) {
      return tingkepanPantangan.alasan;
    }
    if (subTab === 'tedaksiten' && tedakSitenPantangan.isPantangan) {
      return tedakSitenPantangan.alasan;
    }
    return null;
  }, [subTab, hasilBoyongan, tingkepanPantangan, tedakSitenPantangan]);

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-rose-950 text-white rounded-3xl p-5 shadow-sm border border-blue-800/80">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold mb-2">
          <span>🏡</span> Modul 3 Betaljemur Adammakna
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
          Hari Baik Hajat & Daur Hidup Tradisi Jawa
        </h2>
        <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
          Petung boyongan wisma (sisa 4), upacara daur hidup kehamilan (tingkepan), tedak siten 7 lapan (245 hari), sedekah wetonan 35 hari, dan kalender agraris Pranata Mangsa.
        </p>
      </div>

      {/* Subtabs Pill Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          onClick={() => setSubTab('boyongan')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 ${
            subTab === 'boyongan'
              ? 'bg-blue-900 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Boyongan Wisma (Pindah Rumah)</span>
        </button>

        <button
          onClick={() => setSubTab('tingkepan')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 ${
            subTab === 'tingkepan'
              ? 'bg-rose-900 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Baby className="w-3.5 h-3.5" />
          <span>Tingkepan (7 Bulan)</span>
        </button>

        <button
          onClick={() => setSubTab('tedaksiten')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 ${
            subTab === 'tedaksiten'
              ? 'bg-rose-900 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tedak Siten (245 Hari)</span>
        </button>

        <button
          onClick={() => setSubTab('wetonan')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 ${
            subTab === 'wetonan'
              ? 'bg-blue-900 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <CalendarClock className="w-3.5 h-3.5" />
          <span>Sedekah Wetonan (35 Hari)</span>
        </button>

        <button
          onClick={() => setSubTab('pranata')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 ${
            subTab === 'pranata'
              ? 'bg-amber-900 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Pranata Mangsa (12 Musim)</span>
        </button>
      </div>

      {/* 1. SUBTAB: BOYONGAN WISMA */}
      {subTab === 'boyongan' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
              <span className="w-2 h-4 bg-blue-900 rounded-full" />
              Petung Pindah Rumah (Rumus Sisa Pembagian 4)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dihitung dari <code>(Neptu Kepala Keluarga + Neptu Hari Pindah) % 4</code> menghasilkan kategori:
              <strong> 1: Guru (Kerta)</strong>, <strong>2: Ratu (Candi)</strong>, <strong>3: Rogoh</strong>, <strong>4: Sempoyong</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Neptu Kepala Keluarga (atau Suami + Istri):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={7}
                    max={36}
                    value={neptuKepala}
                    onChange={(e) => setNeptuKepala(Number(e.target.value))}
                    className="w-28 text-sm p-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 outline-none font-bold"
                  />
                  <span className="text-xs text-slate-500">Contoh: Neptu 14 (Jumat Kliwon)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Rencana Tanggal Pindah Rumah:
                </label>
                <input
                  type="date"
                  value={tglPindah}
                  onChange={(e) => setTglPindah(e.target.value)}
                  className="w-full text-sm p-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 outline-none"
                />
              </div>
            </div>

            {/* TAHAP 2: FITUR PROTEKSI DI DALAM MENU SEBELUM HASIL BOYONGAN DITAMPILKAN */}
            <InlinePantanganStep
              stepNumber={2}
              modulTitle="Boyongan Wisma (Pindah Rumah)"
              matchedAlert={hasilBoyongan.isPantangan ? hasilBoyongan.pantanganDetail : null}
              onOpenFullModal={() => setIsPantanganModalOpen(true)}
            />

            {/* Hasil Boyongan Card */}
            <div className="bg-gradient-to-br from-blue-950 to-slate-900 text-white rounded-2xl p-5 border border-blue-800 space-y-3">
              {hasilBoyongan.isPantangan && (
                <div className="bg-rose-900/90 border border-rose-500 p-3 rounded-xl flex items-start gap-2.5 text-xs text-rose-100 shadow-md">
                  <ShieldAlert className="w-5 h-5 text-rose-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Peringatan Pantangan Pindah Rumah:</strong>
                    <p className="mt-0.5">{hasilBoyongan.pantanganDetail}</p>
                    <p className="text-[11px] text-rose-200 mt-1">
                      <em>Saran Adat:</em> Boyongan wisma pada hari geblak/naas leluhur rentan membawa kegelisahan batin. Sangat dianjurkan menggeser hari pindah 1-3 hari ke depan mencari hari berneptu Guru (Kerta) atau Ratu (Candi) yang netral.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between border-b border-blue-800/80 pb-3">
                <div>
                  <div className="text-xs text-blue-300 font-bold uppercase">Hasil Kategori Wisma</div>
                  <div className="text-2xl font-black text-rose-300 mt-0.5">
                    {hasilBoyongan.kategori} (Sisa {hasilBoyongan.sisa4})
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-300">Weton Hari Pindah:</div>
                  <div className="text-base font-bold text-white">
                    {hasilBoyongan.wetonPindah.hari} {hasilBoyongan.wetonPindah.pasaran} (Neptu {hasilBoyongan.wetonPindah.neptuTotal})
                  </div>
                </div>
              </div>

              <p className="text-xs text-blue-100 leading-relaxed">
                {hasilBoyongan.uraian}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-blue-900/40 p-3 rounded-xl border border-blue-700/50">
                  <strong className="text-rose-300 block mb-1">Tata Cara & Mitigasi:</strong>
                  <span className="text-blue-100 text-[11px]">{hasilBoyongan.saranMitigasi}</span>
                </div>
                <div className="bg-blue-900/40 p-3 rounded-xl border border-blue-700/50">
                  <strong className="text-rose-300 block mb-1">Waktu & Jam Utama:</strong>
                  <span className="text-blue-100 text-[11px]">{hasilBoyongan.waktuTerbaik}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SUBTAB: TINGKEPAN (MITONI) */}
      {subTab === 'tingkepan' && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
            <span className="w-2 h-4 bg-rose-900 rounded-full" />
            Upacara Tingkepan (Mitoni / 7 Bulan Kehamilan)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dilaksanakan saat usia kehamilan genap 7 bulan (sekitar 28-30 minggu atau 210 hari sejak Hari Pertama Haid Terakhir/HPHT) pada hari yang berneptu teduh seperti Selasa Pon, Rabu Pon, atau Kamis Pon.
          </p>

          <div className="max-w-xs">
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Hari Pertama Haid Terakhir (HPHT):
            </label>
            <input
              type="date"
              value={tglHpht}
              onChange={(e) => setTglHpht(e.target.value)}
              className="w-full text-sm p-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none"
            />
          </div>

          {/* TAHAP 2: FITUR PROTEKSI SEBELUM TANGGAL TINGKEPAN DITAMPILKAN */}
          <InlinePantanganStep
            stepNumber={2}
            modulTitle="Upacara Adat Tingkepan (Mitoni)"
            matchedAlert={tingkepanPantangan.isPantangan ? `Hari estimasi 7 bulan berbenturan dengan ${tingkepanPantangan.alasan}` : null}
            onOpenFullModal={() => setIsPantanganModalOpen(true)}
          />

          <div className="bg-gradient-to-br from-rose-950 to-slate-900 text-white rounded-2xl p-5 border border-rose-800 space-y-3">
            {tingkepanPantangan.isPantangan && (
              <div className="bg-rose-900/90 border border-rose-500 p-3 rounded-xl flex items-start gap-2 text-xs text-rose-100">
                <ShieldAlert className="w-4 h-4 text-rose-300 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Peringatan Pantangan Tingkepan:</strong>
                  <p>Tanggal persis 7 bulan bertepatan dengan {tingkepanPantangan.alasan}.</p>
                  <p className="text-[11px] text-rose-200 mt-0.5">
                    <em>Solusi Adat:</em> Geser pelaksanaan 2-3 hari lebih awal atau sesudahnya pada hari berpasaran Pon atau Kliwon yang bersih dari pantangan keluarga.
                  </p>
                </div>
              </div>
            )}

            <div className="text-xs text-rose-300 font-bold uppercase">Estimasi Waktu Tingkepan Tepat:</div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {hasilTingkepan.weton.hari} {hasilTingkepan.weton.pasaran}, {hasilTingkepan.tanggal}
            </div>
            <div className="text-xs text-rose-200">
              Wuku <strong>{hasilTingkepan.weton.wuku}</strong> • Usia Kandungan ~{hasilTingkepan.usiaMinggu} Minggu (210 Hari)
            </div>

            <div className="bg-rose-900/40 p-3.5 rounded-xl border border-rose-700/50 text-xs text-rose-100 space-y-1.5 mt-2">
              <strong className="text-white block">Perlengkapan Budaya Tingkepan Betaljemur:</strong>
              <ul className="list-disc list-inside text-[11px] space-y-1 text-rose-100">
                <li>Siraman air 7 sumber dengan kembang setaman di waktu pagi (pukul 09.00 - 11.00).</li>
                <li>Upacara ganti busana 7 motif jarik (sidomukti, truntum, dll.) hingga para tamu mengucap "Pantes!".</li>
                <li>Membelah kelapa gading bergambar Kamajaya dan Kamaratih untuk doa rupa dan budi pekerti anak.</li>
                <li>Rujak seruput manis yang dibeli dengan kreweng (genteng) lambang sedekah rezeki.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUBTAB: TEDAK SITEN */}
      {subTab === 'tedaksiten' && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
            <span className="w-2 h-4 bg-rose-900 rounded-full" />
            Upacara Tedak Siten (Piton-piton / 7 Lapan = 245 Hari)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tedak Siten (turun tanah) dilaksanakan ketika anak berusia tepat 7 lapan (7 × 35 hari = 245 hari), saat anak mulai belajar menapakkan kaki di atas bumi pertiwi.
          </p>

          <div className="max-w-xs">
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Tanggal Kelahiran Bayi:
            </label>
            <input
              type="date"
              value={tglLahirBayi}
              onChange={(e) => setTglLahirBayi(e.target.value)}
              className="w-full text-sm p-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none"
            />
          </div>

          {/* TAHAP 2: FITUR PROTEKSI SEBELUM TANGGAL TEDAK SITEN DITAMPILKAN */}
          <InlinePantanganStep
            stepNumber={2}
            modulTitle="Upacara Tedak Siten (Turun Tanah)"
            matchedAlert={tedakSitenPantangan.isPantangan ? `Hari 7 lapan anak berbenturan dengan ${tedakSitenPantangan.alasan}` : null}
            onOpenFullModal={() => setIsPantanganModalOpen(true)}
          />

          <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-blue-950 text-white rounded-2xl p-5 border border-rose-800 space-y-3">
            {tedakSitenPantangan.isPantangan && (
              <div className="bg-rose-900/90 border border-rose-500 p-3 rounded-xl flex items-start gap-2 text-xs text-rose-100">
                <ShieldAlert className="w-4 h-4 text-rose-300 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Peringatan Pantangan Tedak Siten:</strong>
                  <p>Tanggal 7 lapan bertepatan dengan {tedakSitenPantangan.alasan}.</p>
                  <p className="text-[11px] text-rose-200 mt-0.5">
                    <em>Solusi Adat:</em> Upacara turun tanah dapat digeser sehari setelahnya pada jam pagi (pukul 07.00 - 09.00) agar terhindar dari benturan geblak leluhur.
                  </p>
                </div>
              </div>
            )}

            <div className="text-xs text-rose-300 font-bold uppercase">Tanggal Persis Usia 7 Lapan:</div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {hasilTedakSiten.weton.hari} {hasilTedakSiten.weton.pasaran}, {hasilTedakSiten.tanggal}
            </div>
            <div className="text-xs text-rose-200">
              Wuku <strong>{hasilTedakSiten.weton.wuku}</strong> • Genap 245 Hari Kalender Pawukon
            </div>

            <div className="bg-rose-900/40 p-3.5 rounded-xl border border-rose-700/50 text-xs text-rose-100 space-y-1.5 mt-2">
              <strong className="text-white block">Tahapan Simbolik Tedak Siten:</strong>
              <ul className="list-disc list-inside text-[11px] space-y-1 text-rose-100">
                <li>Menapakkan kaki di atas 7 jadah aneka warna (melambangkan rintangan hidup yang dilalui bertahap).</li>
                <li>Menaiki tangga tebu arjuna (melambangkan keteguhan kalbu 'antebe kalbu' dalam menuntut cita-cita).</li>
                <li>Masuk ke dalam kurungan ayam hias dan memilih benda profesi (buku, alat tulis, perhiasan, dll.).</li>
                <li>Memandikan anak dengan air bunga setaman dan menebar udik-udik uang koin beras kuning bagi anak-anak.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUBTAB: WETONAN 35 HARI */}
      {subTab === 'wetonan' && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
            <span className="w-2 h-4 bg-blue-900 rounded-full" />
            Sedekah Hari Lahir / Wetonan Rutin (Siklus 35 Hari)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Masyarakat Jawa memperingati hari lahir setiap 35 hari sekali (pertemuan hari 7 dan pasaran 5) sebagai wahana introspeksi diri (muhasabah), memohon keselamatan jiwa raga, dan berbagi berkah pangan jenang sengkolo kepada sesama.
          </p>

          <div className="max-w-xs">
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Tanggal Lahir Anda:
            </label>
            <input
              type="date"
              value={tglLahirSendiri}
              onChange={(e) => setTglLahirSendiri(e.target.value)}
              className="w-full text-sm p-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 outline-none"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-950 flex items-center justify-between">
            <div>
              Weton Kelahiran: <strong className="text-sm">{wetonSendiri.hari} {wetonSendiri.pasaran}</strong> (Neptu {wetonSendiri.neptuTotal})
            </div>
            <span className="text-[11px] font-semibold bg-blue-900 text-white px-3 py-1 rounded-full">
              Siklus 35 Hari Sekali
            </span>
          </div>

          {/* TAHAP 2: FITUR PROTEKSI SEBELUM JADWAL WETONAN DITAMPILKAN */}
          <InlinePantanganStep
            stepNumber={2}
            modulTitle="Sedekah Wetonan Siklus 35 Hari"
            onOpenFullModal={() => setIsPantanganModalOpen(true)}
          />

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Jadwal 8 Wetonan Mendatang untuk Bersedekah:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {jadwalWetonan.map((tgl, idx) => {
                const pCheck = checkTanggalPantangan(tgl);
                return (
                  <div
                    key={tgl}
                    className={`p-3 rounded-xl text-xs transition border ${
                      pCheck.isPantangan
                        ? 'bg-rose-50/80 border-rose-300 hover:border-rose-400'
                        : 'bg-slate-50 hover:bg-rose-50 border-slate-200 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold text-rose-800">Wetonan Ke-{idx + 1}</div>
                      {pCheck.isPantangan ? (
                        <span className="text-[9px] font-black bg-rose-900 text-white px-1.5 py-0.2 rounded">
                          Pantangan
                        </span>
                      ) : (
                        <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          Aman
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-slate-900 text-sm mt-0.5">{wetonSendiri.hari} {wetonSendiri.pasaran}</div>
                    <div className="text-[11px] text-slate-500">{tgl}</div>
                    {pCheck.isPantangan && (
                      <div className="text-[10px] text-rose-700 font-medium mt-1">
                        ⚠️ {pCheck.alasan}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 5. SUBTAB: PRANATA MANGSA */}
      {subTab === 'pranata' && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                <span className="w-2 h-4 bg-amber-800 rounded-full" />
                Siklus 12 Pranata Mangsa (Sistem Kalender Musim Jawa)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Kearifan agrometeorologi astronomis Jawa yang telah digunakan berabad-abad oleh para petani dan nelayan Nusantara.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {PRANATA_MANGSA_DATA.map((item) => (
              <div
                key={item.nomor}
                className="bg-slate-50 hover:bg-amber-50/40 border border-slate-200 hover:border-amber-300 rounded-2xl p-4 text-xs space-y-2 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black bg-amber-900 text-amber-100 px-2 py-0.5 rounded-full">
                    Mangsa #{item.nomor}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">{item.durasiHari} Hari</span>
                </div>

                <div className="font-bold text-slate-900 text-sm">{item.nama}</div>
                <div className="text-[11px] text-rose-900 font-semibold">{item.rentang}</div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 italic text-[11px] text-slate-700">
                  "{item.candra}"
                  <span className="block not-italic text-[10px] text-slate-500 mt-0.5">
                    ({item.artianCandra})
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong>Kondisi Alam:</strong> {item.keadaanAlam}
                </p>

                <p className="text-[11px] text-blue-900 leading-relaxed">
                  <strong>Pedoman Kerja:</strong> {item.pedomanAgrarisDanUsaha}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Kelola Weton Pantangan */}
      <WetonPantanganModal
        isOpen={isPantanganModalOpen}
        onClose={() => setIsPantanganModalOpen(false)}
      />
    </div>
  );
};
