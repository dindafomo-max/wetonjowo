import React, { useState, useMemo } from 'react';
import { Calendar, CheckCircle2, AlertTriangle, Clock, ShieldCheck, Sparkles, Filter, ShieldAlert, Award, Printer } from 'lucide-react';
import { hitungWetonLengkap, formatDateDDMMYYYY } from '../utils/javaneseCalendar';
import { cariHariNikahTerbaik } from '../utils/petungCalculators';
import { RekomendasiHariNikah } from '../types/weton';
import { useWetonPantangan } from '../context/WetonPantanganContext';
import { InlinePantanganStep } from './InlinePantanganStep';
import { WetonPantanganModal } from './WetonPantanganModal';
import { PiagamPetungModal, PiagamData } from './PiagamPetungModal';

export const MarriageCalculatorView: React.FC = () => {
  const { activePantanganList } = useWetonPantangan();
  const [isPantanganModalOpen, setIsPantanganModalOpen] = useState(false);
  const [isPiagamModalOpen, setIsPiagamModalOpen] = useState(false);

  // Default values: sample typical birth dates
  const [tglLahirPria, setTglLahirPria] = useState('1996-06-18');
  const [namaPria, setNamaPria] = useState('Raden Bagus');
  
  const [tglLahirWanita, setTglLahirWanita] = useState('1998-09-24');
  const [namaWanita, setNamaWanita] = useState('Dewi Sekar');

  const [tglMulaiCari, setTglMulaiCari] = useState('2026-10-01');
  const [jumlahHari, setJumlahHari] = useState(45);
  const [filterHanyaAman, setFilterHanyaAman] = useState(false);
  const [selectedDay, setSelectedDay] = useState<RekomendasiHariNikah | null>(null);

  const wetonPria = useMemo(() => hitungWetonLengkap(tglLahirPria), [tglLahirPria]);
  const wetonWanita = useMemo(() => hitungWetonLengkap(tglLahirWanita), [tglLahirWanita]);
  const neptuPasangan = wetonPria.neptuTotal + wetonWanita.neptuTotal;

  const daftarRekomendasi = useMemo(() => {
    return cariHariNikahTerbaik(tglLahirPria, tglLahirWanita, tglMulaiCari, jumlahHari, activePantanganList);
  }, [tglLahirPria, tglLahirWanita, tglMulaiCari, jumlahHari, activePantanganList]);

  const daftarFiltered = useMemo(() => {
    if (filterHanyaAman) {
      return daftarRekomendasi.filter((item) => item.isAmanAdat && item.skorBerkah >= 75);
    }
    return daftarRekomendasi;
  }, [daftarRekomendasi, filterHanyaAman]);

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-blue-950 text-white rounded-3xl p-5 shadow-sm border border-rose-800/60">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-800/80 text-rose-200 text-xs font-bold mb-2">
          <span>💍</span> Modul 1 Betaljemur Adammakna
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
          Kalkulator Hari Ijab Kabul & Pernikahan Agung
        </h2>
        <p className="text-xs sm:text-sm text-rose-100/90 mt-1 max-w-2xl leading-relaxed">
          Menemukan hari pernikahan terbaik bebas dari larangan adat seperti <em>Dina Sangar</em>, <em>Taliwangke</em>, <em>Samparwangke</em>, dan <em>Naas Tanggal</em>, dengan komputasi neptu mempelai dan hari H.
        </p>
      </div>

      {/* Input Form Section */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Calon Pengantin Pria */}
        <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              <span>🤵</span> Calon Suami (Pengantin Pria)
            </span>
            <span className="text-xs font-black bg-blue-900 text-white px-2 py-0.5 rounded-full">
              Neptu {wetonPria.neptuTotal}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Nama Calon Suami</label>
            <input
              type="text"
              value={namaPria}
              onChange={(e) => setNamaPria(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 outline-none"
              placeholder="Nama calon suami"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Tanggal Lahir Masehi</label>
            <input
              type="date"
              value={tglLahirPria}
              onChange={(e) => setTglLahirPria(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 outline-none"
            />
          </div>

          <div className="text-xs text-blue-950 bg-white p-2.5 rounded-xl border border-blue-200">
            Weton: <strong>{wetonPria.hari} {wetonPria.pasaran}</strong> ({wetonPria.neptuHari} + {wetonPria.neptuPasaran}) • Wuku <strong>{wetonPria.wuku}</strong>
          </div>
        </div>

        {/* Calon Pengantin Wanita */}
        <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <span>👰</span> Calon Istri (Pengantin Wanita)
            </span>
            <span className="text-xs font-black bg-rose-900 text-white px-2 py-0.5 rounded-full">
              Neptu {wetonWanita.neptuTotal}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Nama Calon Istri</label>
            <input
              type="text"
              value={namaWanita}
              onChange={(e) => setNamaWanita(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none"
              placeholder="Nama calon istri"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Tanggal Lahir Masehi</label>
            <input
              type="date"
              value={tglLahirWanita}
              onChange={(e) => setTglLahirWanita(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none"
            />
          </div>

          <div className="text-xs text-rose-950 bg-white p-2.5 rounded-xl border border-rose-200">
            Weton: <strong>{wetonWanita.hari} {wetonWanita.pasaran}</strong> ({wetonWanita.neptuHari} + {wetonWanita.neptuPasaran}) • Wuku <strong>{wetonWanita.wuku}</strong>
          </div>
        </div>
      </div>

      {/* Target Search Range Settings */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Mulai Pencarian Tanggal:</label>
            <input
              type="date"
              value={tglMulaiCari}
              onChange={(e) => setTglMulaiCari(e.target.value)}
              className="text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Rentang Hari Dicek:</label>
            <select
              value={jumlahHari}
              onChange={(e) => setJumlahHari(Number(e.target.value))}
              className="text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-800 outline-none"
            >
              <option value={30}>30 Hari (1 Bulan)</option>
              <option value={45}>45 Hari (1.5 Bulan)</option>
              <option value={60}>60 Hari (2 Bulan)</option>
              <option value={90}>90 Hari (3 Bulan)</option>
            </select>
          </div>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setFilterHanyaAman(!filterHanyaAman)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
            filterHanyaAman
              ? 'bg-rose-900 text-white border-rose-950 shadow-sm'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>{filterHanyaAman ? 'Menampilkan Hari Terbaik Saja' : 'Tampilkan Semua Hari'}</span>
        </button>
      </div>

      {/* TAHAP 2: FITUR PROTEKSI DI DALAM MENU SEBELUM HARI BAIK DITAMPILKAN */}
      <InlinePantanganStep
        stepNumber={2}
        modulTitle="Akad Nikah & Ijab Kabul"
        onOpenFullModal={() => setIsPantanganModalOpen(true)}
        filteredCountNote={
          activePantanganList.length > 0
            ? `${daftarRekomendasi.filter(d => d.isPantangan).length} tanggal akad otomatis disingkirkan karena bertepatan dengan geblak/naas`
            : undefined
        }
      />

      {/* Summary Box */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-blue-300">Total Neptu Gabungan Kedua Calon: </span>
          <strong className="text-base text-white ml-1">{wetonPria.neptuTotal} + {wetonWanita.neptuTotal} = {neptuPasangan}</strong>
        </div>
        <div className="text-blue-200">
          Rumus: <code>(Neptu Suami + Neptu Istri + Neptu Hari H) % 5 & % 4</code>
        </div>
      </div>

      {/* Grid of Recommended Dates */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-sm sm:text-base text-slate-800 flex items-center justify-between">
          <span>Daftar Hari Pilihan ({daftarFiltered.length} Hari Tersedia)</span>
          <span className="text-xs font-normal text-slate-500">Urut berdasar skor berkah tertinggi</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {daftarFiltered.slice(0, 15).map((item, idx) => {
            const isSelected = selectedDay?.tanggal === item.tanggal;
            return (
              <div
                key={item.tanggal}
                onClick={() => setSelectedDay(item)}
                className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 border relative ${
                  isSelected
                    ? 'bg-rose-50/80 border-rose-800 shadow-md ring-2 ring-rose-700/30'
                    : item.isAmanAdat
                    ? 'bg-white border-slate-200 hover:border-blue-700 hover:shadow-sm'
                    : 'bg-slate-50 border-slate-200/80 opacity-75'
                }`}
              >
                {/* Ranking Tag */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    #{idx + 1}
                  </span>
                  <div
                    className={`text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      item.skorBerkah >= 80
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : item.skorBerkah >= 65
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Skor {item.skorBerkah}%</span>
                  </div>
                </div>

                {/* Day and Date */}
                <div className="font-black text-slate-900 text-base">
                  {item.hari} {item.pasaran}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {formatDateDDMMYYYY(item.tanggal)} • Neptu Hari H: {item.neptuHariH}
                </div>

                {/* Pancasuda & Status */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Pancasuda:</span>
                    <strong className="text-blue-900">{item.pancasudaHari.nama}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Petung Wisma:</span>
                    <strong className="text-rose-900">{item.sisaPembagian4.nama}</strong>
                  </div>

                  {item.isAmanAdat ? (
                    <div className="text-emerald-700 text-[10px] font-bold flex items-center gap-1 mt-1 pt-1">
                      <CheckCircle2 className="w-3 h-3" /> Bebas Pantangan Adat
                    </div>
                  ) : (
                    <div className={`text-[10px] font-semibold flex items-center gap-1 mt-1 pt-1 ${
                      item.alasanLarangan.some((a) => a.includes('Weton Pantangan'))
                        ? 'text-rose-700 font-bold bg-rose-50 px-1.5 py-0.5 rounded'
                        : 'text-amber-700'
                    }`}>
                      <AlertTriangle className="w-3 h-3 flex-shrink-0 text-amber-600" />
                      <span className="truncate">{item.alasanLarangan[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal / Panel if Day is Selected */}
      {selectedDay && (
        <div className="bg-gradient-to-br from-blue-950 to-slate-900 text-white rounded-3xl p-5 shadow-xl border border-blue-800 space-y-4">
          <div className="flex items-center justify-between border-b border-blue-800/80 pb-3">
            <div>
              <div className="text-xs text-rose-300 font-bold uppercase tracking-wider">
                Bedah Detail Hari Pilihan
              </div>
              <h3 className="text-xl font-black text-white">
                {selectedDay.hari} {selectedDay.pasaran}, {selectedDay.tanggal}
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPiagamModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl transition shadow-md flex items-center gap-1.5"
                title="Cetak Piagam Surat Ketetapan Hari Ijab Kabul"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Cetak Piagam Ijab</span>
              </button>

              <button
                onClick={() => setSelectedDay(null)}
                className="text-xs bg-blue-900 hover:bg-blue-800 text-blue-200 px-3 py-1.5 rounded-xl border border-blue-700 transition"
              >
                Tutup
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-blue-900/40 p-3 rounded-xl border border-blue-700/50">
              <span className="text-blue-300 block mb-1 font-semibold">Total Tigaan Neptu:</span>
              <div className="text-lg font-black text-white">
                {selectedDay.totalNeptuTigaan}
              </div>
              <p className="text-[10px] text-blue-200/80 mt-1">
                (Suami {wetonPria.neptuTotal} + Istri {wetonWanita.neptuTotal} + Hari {selectedDay.neptuHariH})
              </p>
            </div>

            <div className="bg-blue-900/40 p-3 rounded-xl border border-blue-700/50">
              <span className="text-blue-300 block mb-1 font-semibold">Kategori Pancasuda:</span>
              <div className="text-lg font-black text-rose-300">
                {selectedDay.pancasudaHari.nama}
              </div>
              <p className="text-[10px] text-blue-200/80 mt-1">
                {selectedDay.pancasudaHari.makna}
              </p>
            </div>

            <div className="bg-blue-900/40 p-3 rounded-xl border border-blue-700/50">
              <span className="text-blue-300 block mb-1 font-semibold">Saran Jam Ijab Kabul:</span>
              <div className="text-sm font-bold text-amber-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>Waktu Utama</span>
              </div>
              <p className="text-[11px] text-blue-100 mt-1">
                {selectedDay.saranWaktuIjab}
              </p>
            </div>
          </div>

          {/* Mitigasi & Rekomendasi Adat */}
          <div className="bg-blue-900/30 p-3.5 rounded-xl border border-blue-700/50 text-xs space-y-1.5">
            <div className="font-bold text-rose-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              <span>Pedoman Budaya & Mitigasi Kitab Betaljemur:</span>
            </div>
            <p className="text-blue-100 leading-relaxed text-[11px]">
              {selectedDay.isAmanAdat
                ? 'Hari ini bersih dari Taliwangke, Samparwangke, Dina Sangar, dan Naas Weton. Sangat dianjurkan untuk melangsungkan ijab kabul resmi, walimatul ursy, dan arak-arakan pengantin dengan niat memohon barokah Sang Hyang Widhi.'
                : `Terdapat catatan adat: ${selectedDay.alasanLarangan.join(', ')}. Jika keluarga bersepakat tetap memilih tanggal ini karena pertimbangan gedung/undangan, leluhur mengajarkan mitigasi kultural berupa sedekah tumpeng beras putih, doa tolak bala oleh sesepuh sebelum akad, serta memilih jam ijab pada waktu utama yang direkomendasikan.`}
            </p>
          </div>
        </div>
      )}

      {/* Modal Kelola Weton Pantangan */}
      <WetonPantanganModal
        isOpen={isPantanganModalOpen}
        onClose={() => setIsPantanganModalOpen(false)}
      />

      {/* Modal Piagam Ketetapan Hari Ijab Kabul */}
      {selectedDay && (
        <PiagamPetungModal
          isOpen={isPiagamModalOpen}
          onClose={() => setIsPiagamModalOpen(false)}
          data={{
            judulPiagam: 'Piagam Ketetapan Hari Ijab Kabul & Pernikahan Agung',
            nomorSurat: `WJ-NIKAH-${selectedDay.totalNeptuTigaan}-${selectedDay.tanggal.replace(/-/g, '')}`,
            tanggalMasehi: new Date().toLocaleDateString('id-ID', { dateStyle: 'full' }),
            tanggalJawa: `${wetonPria.tahunJawa}`,
            pihakSatu: {
              label: 'Calon Suami (Pengantin Kakung)',
              nama: namaPria || 'Calon Suami',
              weton: `${wetonPria.hari} ${wetonPria.pasaran}`,
              neptu: wetonPria.neptuTotal,
              wuku: wetonPria.wuku,
            },
            pihakDua: {
              label: 'Calon Istri (Pengantin Putri)',
              nama: namaWanita || 'Calon Istri',
              weton: `${wetonWanita.hari} ${wetonWanita.pasaran}`,
              neptu: wetonWanita.neptuTotal,
              wuku: wetonWanita.wuku,
            },
            ringkasanHasil: {
              kategoriUtama: `Hari Pilihan: ${selectedDay.hari} ${selectedDay.pasaran} (${selectedDay.tanggal})`,
              skorAtauSisa: `Skor Berkah: ${selectedDay.skorBerkah}% • Total Tigaan Neptu: ${selectedDay.totalNeptuTigaan}`,
              maknaAdat: `Pancasuda Hari: "${selectedDay.pancasudaHari.nama}" - ${selectedDay.pancasudaHari.makna}. Saran Jam Ijab Utama: ${selectedDay.saranWaktuIjab}`,
              rekomendasiLuhur: selectedDay.isAmanAdat
                ? 'Hari ini aman dan bersih dari larangan Dina Sangar, Taliwangke, Samparwangke, dan Naas Tanggal. Sah untuk akad nikah dan walimatul ursy.'
                : `Mitigasi Adat: ${selectedDay.alasanLarangan.join(', ')}. Dianjurkan menyertakan sedekah tolak bala jenang abang putih dan doa restu pinisepuh.`,
            },
            catatanKhusus: [
              `Neptu Hari H: ${selectedDay.neptuHariH}`,
              `Total Tigaan Neptu: ${selectedDay.totalNeptuTigaan} (Suami ${wetonPria.neptuTotal} + Istri ${wetonWanita.neptuTotal} + Hari ${selectedDay.neptuHariH})`,
              `Saran Jam Ijab Kabul: ${selectedDay.saranWaktuIjab}`,
            ],
          }}
        />
      )}
    </div>
  );
};
