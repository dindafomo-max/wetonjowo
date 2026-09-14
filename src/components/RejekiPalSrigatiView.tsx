import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Compass,
  Briefcase,
  Sparkles,
  Calendar,
  Clock,
  ArrowUpRight,
  HelpCircle,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';
import { hitungPalSrigati, getArahRezekiHarian, hitungWetonLengkap, getDeviceLocalDateString } from '../utils/javaneseCalendar';
import { SKOR_PAL_SRIGATI_INFO } from '../data/palSrigatiData';
import { InlinePantanganStep } from './InlinePantanganStep';
import { PiagamPetungModal } from './PiagamPetungModal';

interface RejekiPalSrigatiViewProps {
  onOpenPantanganModal: () => void;
  onOpenKompasModal?: () => void;
}

export const RejekiPalSrigatiView: React.FC<RejekiPalSrigatiViewProps> = ({
  onOpenPantanganModal,
  onOpenKompasModal,
}) => {
  const [isPiagamModalOpen, setIsPiagamModalOpen] = useState(false);
  // Tanggal lahir pengguna (default ke 17 Agustus 1995 sebagai contoh estetik, atau dapat diubah bebas)
  const [tanggalLahir, setTanggalLahir] = useState<string>('1995-08-17');
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(4); // default ke usia 24-30
  const [tanggalArah, setTanggalArah] = useState<string>(() => getDeviceLocalDateString());

  // Hasil perhitungan Pal Srigati
  const palSrigatiResult = useMemo(() => {
    return hitungPalSrigati(tanggalLahir);
  }, [tanggalLahir]);

  // Hasil arah rezeki harian berdasarkan tanggal acuan hari ini
  const wetonHariIni = useMemo(() => {
    return hitungWetonLengkap(tanggalArah);
  }, [tanggalArah]);

  const arahRezekiHariIni = useMemo(() => {
    return getArahRezekiHarian(wetonHariIni.hari, wetonHariIni.pasaran);
  }, [wetonHariIni]);

  // Hitung perkiraan umur pengguna sekarang
  const umurSekarang = useMemo(() => {
    const lahir = new Date(tanggalLahir);
    const now = new Date();
    let age = now.getFullYear() - lahir.getFullYear();
    const m = now.getMonth() - lahir.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < lahir.getDate())) {
      age--;
    }
    return Math.max(0, age);
  }, [tanggalLahir]);

  // Tentukan indeks bracket umur saat ini
  const activeAgeBracketIdx = useMemo(() => {
    const idx = Math.floor(umurSekarang / 6);
    return Math.min(Math.max(idx, 0), 11);
  }, [umurSekarang]);

  const activePoint = palSrigatiResult.points[selectedPointIndex] || palSrigatiResult.points[activeAgeBracketIdx];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Utama Modul */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              Kitab Betaljemur Adammakna Bab Pal Srigati
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Petung Rezeki & Fluktuasi Pal Srigati
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Petung siklus 6 tahunan perjalanan rezeki manusia dari usia 0 hingga 72 tahun, dikolaborasikan dengan watak Pancasuda rezeki, Pangarasan, dan kompas harian Naga Dina penjemput rezeki.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:self-start">
            {onOpenKompasModal && (
              <button
                type="button"
                onClick={onOpenKompasModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-2xl shadow-xs transition active:scale-95"
              >
                <Compass className="w-4 h-4" />
                Kompas Arah Hari Ini
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsPiagamModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-2xl shadow-xs transition active:scale-95"
              title="Cetak Piagam Fluktuasi Rezeki Pal Srigati"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Cetak Piagam Rezeki</span>
            </button>
          </div>
        </div>

        {/* Input Tanggal Lahir & Weton Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <label htmlFor="input-tgl-lahir" className="block text-xs font-bold text-slate-700">
              Pilih / Ubah Tanggal Lahir Anda:
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                id="input-tgl-lahir"
                type="date"
                value={tanggalLahir}
                onChange={(e) => {
                  if (e.target.value) {
                    setTanggalLahir(e.target.value);
                  }
                }}
                className="w-full bg-white border border-slate-300 text-slate-900 text-sm font-semibold rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Usia saat ini: <span className="font-bold text-slate-800">{umurSekarang} Tahun</span> (Masuk siklus rentang ke-{activeAgeBracketIdx + 1}).
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-2xl text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Weton Lahir</span>
              <p className="text-sm sm:text-base font-black text-amber-950 mt-0.5">
                {palSrigatiResult.weton.hari} {palSrigatiResult.weton.pasaran}
              </p>
            </div>
            <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-2xl text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Neptu Total</span>
              <p className="text-sm sm:text-base font-black text-amber-950 mt-0.5">
                {palSrigatiResult.weton.neptuTotal} ({palSrigatiResult.weton.neptuHari}+{palSrigatiResult.weton.neptuPasaran})
              </p>
            </div>
            <div className="bg-blue-50/70 border border-blue-200 p-3 rounded-2xl text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">Pancasuda Rejeki</span>
              <p className="text-sm sm:text-base font-black text-blue-950 mt-0.5 truncate" title={palSrigatiResult.pancasudaRezeki.nama}>
                {palSrigatiResult.pancasudaRezeki.nama}
              </p>
            </div>
            <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-2xl text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Rata-Rata Skor</span>
              <p className="text-sm sm:text-base font-black text-emerald-950 mt-0.5">
                {palSrigatiResult.skorRataRata} / 6.0
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GRAFIK VISUAL PAL SRIGATI (6 TAHUNAN) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Grafik Fluktuasi Pal Srigati Sepanjang Hayat
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik pada batang usia untuk melihat tafsir detail siklus rezeki & amalan adat yang dianjurkan.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
              Puncak Rezeki
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block"></span>
              Usia Anda Sekarang
            </span>
          </div>
        </div>

        {/* Diagram Batang Interaktif */}
        <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
          <div className="grid grid-cols-12 gap-1.5 sm:gap-3 items-end h-64 sm:h-72 pt-8 pb-2 px-1">
            {palSrigatiResult.points.map((pt, idx) => {
              const isCurrentAge = idx === activeAgeBracketIdx;
              const isSelected = idx === selectedPointIndex;
              const heightPercent = (pt.skor / 6) * 100;
              const isPeak = pt.skor >= 5;

              return (
                <div
                  key={pt.rentangUsia}
                  onClick={() => setSelectedPointIndex(idx)}
                  className="flex flex-col items-center h-full justify-end group cursor-pointer"
                >
                  {/* Skor Float di atas batang */}
                  <div className={`text-[10px] sm:text-xs font-black mb-1 transition ${
                    isSelected ? 'text-amber-700 scale-110' : isPeak ? 'text-amber-600 font-bold' : 'text-slate-400'
                  }`}>
                    {pt.skor}
                  </div>

                  {/* Batang Kolom */}
                  <div className="w-full max-w-[28px] sm:max-w-[40px] bg-slate-200 rounded-t-xl overflow-hidden relative flex flex-col justify-end">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-xl transition-all duration-300 relative ${
                        isCurrentAge
                          ? 'bg-gradient-to-t from-indigo-700 to-indigo-500 ring-2 ring-indigo-400'
                          : isPeak
                          ? 'bg-gradient-to-t from-amber-600 to-amber-400 group-hover:from-amber-500 group-hover:to-amber-300'
                          : pt.skor >= 3
                          ? 'bg-gradient-to-t from-blue-600 to-blue-400 group-hover:from-blue-500 group-hover:to-blue-300'
                          : 'bg-gradient-to-t from-slate-400 to-slate-300 group-hover:from-slate-400 group-hover:to-slate-300'
                      } ${isSelected ? 'ring-2 ring-offset-1 ring-slate-900 shadow-md' : ''}`}
                    >
                      {isPeak && (
                        <div className="absolute top-1 left-1/2 -translate-x-1/2">
                          <Sparkles className="w-2.5 h-2.5 text-white/90" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Label Rentang Usia Bawah */}
                  <div className={`mt-2 text-center transition ${
                    isSelected
                      ? 'text-slate-950 font-black'
                      : isCurrentAge
                      ? 'text-indigo-900 font-bold'
                      : 'text-slate-500'
                  }`}>
                    <span className="text-[9px] sm:text-[11px] block leading-tight font-semibold">
                      {pt.usiaMin}-{pt.usiaMax}
                    </span>
                    <span className="text-[8px] text-slate-400 hidden sm:block">Thn</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500">
            <span>Skala Rezeki: 1 (Prihatin/Rendah) s.d. 6 (Puncak Keemasan)</span>
            <span>Neptu: {palSrigatiResult.weton.neptuTotal} | Weton: {palSrigatiResult.weton.hari} {palSrigatiResult.weton.pasaran}</span>
          </div>
        </div>

        {/* Panel Detail Batang Terpilih */}
        {activePoint && (
          <div className="bg-amber-50/50 border-2 border-amber-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-lg">
                  Rentang Usia: {activePoint.rentangUsia}
                </span>
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-lg border ${
                  SKOR_PAL_SRIGATI_INFO[activePoint.skor]?.warna || 'bg-slate-100 text-slate-700'
                }`}>
                  Tingkat: {activePoint.kategori} (Nilai {activePoint.skor} / 6)
                </span>
                {selectedPointIndex === activeAgeBracketIdx && (
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-900 border border-indigo-300 text-[11px] font-bold rounded-md">
                    Fase Hidup Anda Saat Ini
                  </span>
                )}
              </div>

              <span className="text-xs font-medium text-slate-600">
                Poin ke-{selectedPointIndex + 1} dari 12 Fase Kehidupan
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">Tafsir Perjalanan Rezeki:</span>
                <p className="text-slate-700 leading-relaxed">
                  {activePoint.makna}
                </p>
              </div>
              <div className="space-y-1 bg-white/70 p-3 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  Nasihat & Amalan Adat:
                </span>
                <p className="text-slate-700 leading-relaxed text-xs">
                  {activePoint.nasihatAdat}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Highlight Puncak Keemasan */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-amber-500/10 border border-amber-300/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
              ⭐
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Fase Puncak Keemasan (*Puncaking Kamulyan*):
              </h3>
              <p className="text-xs text-slate-600">
                Menurut petung Betaljemur, fase rezeki tertinggi Anda berada pada:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {palSrigatiResult.puncakUsia.map((usia) => (
              <span
                key={usia}
                className="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black rounded-xl"
              >
                {usia}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PANCASUDA REZEKI & PANGARASAN & BIDANG USAHA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pancasuda Rezeki (Sisa 7) */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-lg">
            💎
          </div>
          <div>
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
              Pancasuda Rezeki (Sisa 7)
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              {palSrigatiResult.pancasudaRezeki.nama}
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {palSrigatiResult.pancasudaRezeki.makna}
          </p>
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 block mb-1">
              Rekomendasi Profesi / Usaha:
            </span>
            <p className="text-xs font-semibold text-slate-800">
              {palSrigatiResult.pancasudaRezeki.anjuranPekerjaan}
            </p>
          </div>
        </div>

        {/* Pangarasan Watak (Sisa 9) */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg">
            👑
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              Pangarasan Bawaan Lahir (Sisa 9)
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              {palSrigatiResult.pangarasan.nama}
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {palSrigatiResult.pangarasan.makna}
          </p>
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 block mb-1">
              Lambang Unsur Weton:
            </span>
            <p className="text-xs font-semibold text-slate-800">
              {palSrigatiResult.weton.lambangUnsur}
            </p>
          </div>
        </div>

        {/* Bidang Usaha yang Cocok */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-lg">
            💼
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              Kecocokan Usaha & Bisnis
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              Harmonisasi Elemen Weton
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Bidang usaha yang paling sesuai dengan getaran neptu dan unsur alami kelahiran Anda:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {palSrigatiResult.bidangUsahaCocok.map((bidang) => (
              <span
                key={bidang}
                className="px-2.5 py-1 bg-slate-100 text-slate-800 text-[11px] font-bold rounded-lg border border-slate-200"
              >
                {bidang}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* MODUL KOMPAS HARIAN: ARAH REZEKI & NAGA DINA HARI INI */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl shadow-xs">
              🧭
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                Petung Sandang Pangan Harian
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Arah Rezeki & Naga Dina Hari Ini
              </h2>
            </div>
          </div>

          {/* Pemilih Tanggal Hajat Ikhtiar & Buka Modul */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenKompasModal && (
              <button
                type="button"
                onClick={onOpenKompasModal}
                className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs rounded-xl transition flex items-center gap-1 border border-amber-300 shadow-2xs"
              >
                <span>Kompas 8 Arah Lengkap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <label htmlFor="input-tgl-arah" className="text-xs font-bold text-slate-600">
                Hari:
              </label>
              <input
                id="input-tgl-arah"
                type="date"
                value={tanggalArah}
                onChange={(e) => setTanggalArah(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Arah Rezeki Utama
            </span>
            <p className="text-base font-black text-emerald-950">
              {arahRezekiHariIni.arahRezekiUtama}
            </p>
            <p className="text-[11px] text-emerald-700 leading-tight">
              Arah terbaik memulai perjalanan dagang, melamar kerja, atau membuka toko.
            </p>
          </div>

          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">
              Arah Pantangan / Kala
            </span>
            <p className="text-base font-black text-rose-950">
              {arahRezekiHariIni.arahPantanganKala}
            </p>
            <p className="text-[11px] text-rose-700 leading-tight">
              Hindari bepergian menghadap langsung posisi ini demi keselamatan.
            </p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Posisi Naga Dina
            </span>
            <p className="text-base font-black text-amber-950">
              {arahRezekiHariIni.posisiNagaDina}
            </p>
            <p className="text-[11px] text-amber-700 leading-tight">
              Jangan beradu muka dengan kepala naga hari saat transaksi besar.
            </p>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
              Unsur Semesta Hari
            </span>
            <p className="text-base font-black text-blue-950">
              {arahRezekiHariIni.unsurHari}
            </p>
            <p className="text-[11px] text-blue-700 leading-tight">
              {wetonHariIni.hari} {wetonHariIni.pasaran} ({wetonHariIni.wuku})
            </p>
          </div>
        </div>

        {/* Jam-Jam Keberuntungan & Mitigasi */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Jam-Jam Keberuntungan (*Saat Berkah*) pada {wetonHariIni.hari} {wetonHariIni.pasaran}:
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {arahRezekiHariIni.jamBaikKeberuntungan.map((jam) => (
              <div
                key={jam}
                className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {jam}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-600 italic bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
            💡 <strong>Panduan Adat:</strong> {arahRezekiHariIni.mitigasiAdat}
          </p>
        </div>
      </div>

      {/* STEP MITIGASI PANTANGAN SEBELUM MEMULAI USAHA */}
      <InlinePantanganStep
        stepNumber={2}
        modulTitle="Mitigasi Hari Naas Sebelum Membuka Usaha / Ekspansi Bisnis"
        onOpenFullModal={onOpenPantanganModal}
      />

      {/* Modal Piagam Petung Pal Srigati */}
      <PiagamPetungModal
        isOpen={isPiagamModalOpen}
        onClose={() => setIsPiagamModalOpen(false)}
        data={{
          judulPiagam: 'Piagam Serat Pal Srigati & Garis Rezeki Seumur Hidup',
          nomorSurat: `WJ-SRIGATI-${palSrigatiResult.weton.neptuTotal}-${Date.now().toString().slice(-4)}`,
          tanggalMasehi: new Date().toLocaleDateString('id-ID', { dateStyle: 'full' }),
          tanggalJawa: `${palSrigatiResult.weton.tahunJawa}`,
          pihakSatu: {
            label: 'Penyandang Weton (Pribadi)',
            nama: 'Pribadi Penyandang Weton',
            weton: `${palSrigatiResult.weton.hari} ${palSrigatiResult.weton.pasaran}`,
            neptu: palSrigatiResult.weton.neptuTotal,
            wuku: palSrigatiResult.weton.wuku,
          },
          ringkasanHasil: {
            kategoriUtama: `Pancasuda Rezeki: "${palSrigatiResult.pancasudaRezeki.nama}" (${palSrigatiResult.pancasudaRezeki.makna})`,
            skorAtauSisa: `Skor Rata-Rata Pal Srigati: ${palSrigatiResult.skorRataRata}/9 (Puncak: ${palSrigatiResult.puncakUsia.join(', ')})`,
            maknaAdat: `Pangarasan: ${palSrigatiResult.pangarasan.nama} (${palSrigatiResult.pangarasan.makna}). Anjuran profesi: ${palSrigatiResult.pancasudaRezeki.anjuranPekerjaan}.`,
            rekomendasiLuhur: `Bidang usaha paling berkah: ${palSrigatiResult.bidangUsahaCocok.join(', ')}. Disarankan menjemput rezeki ke arah keberuntungan harian dan senantiasa bersedekah saat siklus berada pada puncak.`,
          },
          catatanKhusus: [
            `Siklus Usia Emas Tertinggi: ${palSrigatiResult.puncakUsia.join(' & ')}`,
            `Arah Rezeki Hari Ini (${wetonHariIni.hari} ${wetonHariIni.pasaran}): ${arahRezekiHariIni.arahRezekiUtama}`,
            `Arah Pantangan (Kala): ${arahRezekiHariIni.arahPantanganKala}`,
            `Naga Dina: ${arahRezekiHariIni.posisiNagaDina}`,
          ],
        }}
      />
    </div>
  );
};
