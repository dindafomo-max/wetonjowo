import React, { useState, useMemo } from 'react';
import {
  Compass,
  Calendar,
  Clock,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Info,
  Navigation,
  ShieldAlert,
  Briefcase,
  Store,
  Plane,
  Coins,
  Building,
  Printer,
  Copy,
  Check,
  RotateCcw,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
  Download,
  FileText
} from 'lucide-react';
import { hitungWetonLengkap, getDeviceLocalDateString } from '../utils/javaneseCalendar';
import {
  DAFTAR_7_NAGA_DINA,
  DAFTAR_5_NAGA_PASARAN,
  hitungPetungArahLengkap
} from '../data/nagaDinaData';
import { ArahKompasDetail, HariJawa, PasaranJawa } from '../types/weton';
import { PiagamPetungModal, PiagamData } from './PiagamPetungModal';
import { downloadTextFile } from '../utils/printExportUtils';

interface NagaDinaViewProps {
  onOpenPantanganModal?: () => void;
}

export const NagaDinaView: React.FC<NagaDinaViewProps> = ({ onOpenPantanganModal }) => {
  const [selectedDate, setSelectedDate] = useState<string>(() => getDeviceLocalDateString());
  const [selectedDirection, setSelectedDirection] = useState<ArahKompasDetail | null>(null);
  const [activeHajatTab, setActiveHajatTab] = useState<'usaha' | 'karir' | 'bepergian' | 'negosiasi' | 'investasi'>('usaha');
  const [isCopied, setIsCopied] = useState(false);
  const [showEncyclopedia, setShowEncyclopedia] = useState(false);
  const [isPiagamModalOpen, setIsPiagamModalOpen] = useState(false);

  // Weton dan Petung Lengkap Hari Berjalan
  const weton = useMemo(() => {
    return hitungWetonLengkap(selectedDate);
  }, [selectedDate]);

  const petungArah = useMemo(() => {
    return hitungPetungArahLengkap(weton);
  }, [weton]);

  // Set default arah terpilih ke arah rezeki utama
  useMemo(() => {
    const defaultDir = petungArah.kompas8Arah.find((a) => a.status === 'rezeki-utama') || petungArah.kompas8Arah[0];
    setSelectedDirection(defaultDir);
  }, [petungArah]);

  // 7 Hari ke Depan untuk Radar Mingguan
  const pekanDepan = useMemo(() => {
    const list = [];
    const base = new Date(selectedDate);
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const w = hitungWetonLengkap(iso);
      const p = hitungPetungArahLengkap(w);
      list.push({
        tanggalIso: iso,
        dateObj: d,
        weton: w,
        petung: p,
      });
    }
    return list;
  }, [selectedDate]);

  // Handle Quick Date
  const handleSetToday = () => {
    setSelectedDate(getDeviceLocalDateString());
  };

  const handleSetTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setSelectedDate(getDeviceLocalDateString(d));
  };

  // Salin Rangkuman Petung
  const handleCopySummary = () => {
    const text = `🧭 PETUNG NAGA DINA & ARAH REZEKI (WETON JOWO)
📅 Tanggal: ${weton.tanggalMasehi}
✨ Weton: ${weton.hari} ${weton.pasaran} (Neptu ${weton.neptuTotal}) | Wuku ${weton.wuku}

🌟 ARAH REZEKI UTAMA:
• Sandang & Kemakmuran: ${petungArah.nagaDina.arahSandang}
• Pangan & Nafkah: ${petungArah.nagaDina.arahPangan}
• Gedhong & Kasugihan: ${petungArah.nagaDina.arahGedhong}

🚫 PANTANGAN NAGA DINA:
• Kepala Naga (Cangkem Naga): ${petungArah.nagaDina.pantanganUtama}
• Kaidah: ${petungArah.nagaDina.kaidahLaku}

⏰ JAM BERKAH HARI INI:
${petungArah.jamBerkahHariIni.map((j) => `• ${j.jam} (${j.kategori}): ${j.rekomendasiAktivitas}`).join('\n')}

🤲 DOA KESELAMATAN:
"${petungArah.etikaBerangkat.doaKeselamatan}"

Dihitung berdasar Kitab Primbon Betaljemur Adammakna.`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-5xl mx-auto">
      {/* Header Banner Klasik */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-slate-900 to-amber-900 text-white p-6 sm:p-8 shadow-xl border border-amber-500/30">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Kitab Betaljemur Adammakna Bab Sandang Pangan
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-100 tracking-tight">
              Naga Dina & Arah Rejeki
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Komputasi arah keberuntungan harian berdasarkan neptu hari berjalan, dipadukan dengan aturan <strong>Naga Dina</strong> (orientasi geografis aman dari cangkem naga) untuk bepergian, berniaga, dan memulai hajat.
            </p>
          </div>

          {/* Quick Date Control */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2 bg-slate-950/60 p-3.5 rounded-2xl border border-amber-500/20 backdrop-blur-xs">
            <div className="flex items-center justify-between gap-2 text-xs text-amber-200 font-bold">
              <span>Pilih Tanggal Hari Berjalan:</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-slate-900 text-amber-100 border border-amber-500/40 text-xs font-bold rounded-xl px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={handleSetToday}
                className="flex-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
              >
                Hari Ini
              </button>
              <button
                type="button"
                onClick={handleSetTomorrow}
                className="flex-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-800 text-amber-200 hover:bg-slate-700 transition"
              >
                Besok
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ringkasan Weton & Status Naga Hari Ini */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Hari & Pasaran:</span>
          <div className="text-xl font-black text-slate-900">
            {weton.hari} {weton.pasaran}
          </div>
          <div className="text-xs text-slate-600 font-semibold">
            Neptu Total: <strong className="text-amber-700">{weton.neptuTotal}</strong> ({weton.neptuHari} + {weton.neptuPasaran})
          </div>
        </div>

        <div className="bg-emerald-50 p-4 sm:p-5 rounded-3xl border border-emerald-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Arah Sandang & Rezeki:
          </span>
          <div className="text-base sm:text-lg font-black text-emerald-950">
            {petungArah.nagaDina.arahSandang}
          </div>
          <div className="text-[11px] text-emerald-800">
            Pangan di {petungArah.nagaDina.arahPangan}
          </div>
        </div>

        <div className="bg-rose-50 p-4 sm:p-5 rounded-3xl border border-rose-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-rose-800 uppercase flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            Cangkem Naga (Pantangan):
          </span>
          <div className="text-base sm:text-lg font-black text-rose-950">
            {petungArah.nagaDina.pantanganUtama}
          </div>
          <div className="text-[11px] text-rose-800">
            Hindari beradu muka langsung
          </div>
        </div>

        <div className="bg-blue-50 p-4 sm:p-5 rounded-3xl border border-blue-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-blue-800 uppercase flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            Niti Geger Naga (Aman):
          </span>
          <div className="text-base sm:text-lg font-black text-blue-950">
            {petungArah.nagaDina.punggungNaga}
          </div>
          <div className="text-[11px] text-blue-800">
            Searah punggung naga penyelamat
          </div>
        </div>
      </div>

      {/* Main Section: Kompas Visual Interaktif 8 Arah Mata Angin */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Radar Kompas SVG (7 Kolom) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-600" />
                Cakra Kompas 8 Arah Mata Angin
              </h2>
              <p className="text-xs text-slate-500">
                Klik salah satu arah untuk melihat petunjuk dan skor keberuntungan
              </p>
            </div>
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              {weton.hari} {weton.pasaran}
            </span>
          </div>

          {/* Visual Kompas Box */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto rounded-full bg-gradient-to-b from-slate-900 to-slate-950 border-8 border-amber-600/30 p-4 flex items-center justify-center shadow-2xl overflow-hidden">
            {/* Background Grid & Compass Circles */}
            <div className="absolute inset-0 rounded-full border border-amber-500/20" />
            <div className="absolute inset-6 rounded-full border border-dashed border-amber-500/20" />
            <div className="absolute inset-14 rounded-full border border-amber-500/10" />
            
            {/* Cross Lines */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-amber-500/20" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-amber-500/20" />
            <div className="absolute inset-0 rotate-45 flex items-center justify-center">
              <div className="w-full h-px bg-amber-500/15" />
            </div>
            <div className="absolute inset-0 -rotate-45 flex items-center justify-center">
              <div className="w-full h-px bg-amber-500/15" />
            </div>

            {/* Pusat Kompas (Naga Center) */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-black flex flex-col items-center justify-center shadow-lg border-2 border-white/80 text-center">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-900">
                Neptu {weton.neptuTotal}
              </span>
              <span className="text-xs font-black">NAGA</span>
              <span className="text-[9px] font-bold text-amber-950">{weton.hari}</span>
            </div>

            {/* 8 Mata Angin Buttons */}
            {petungArah.kompas8Arah.map((item) => {
              const isSelected = selectedDirection?.arah === item.arah;
              let posClass = '';
              let badgeBg = '';

              switch (item.singkatan) {
                case 'U':
                  posClass = 'top-2 left-1/2 -translate-x-1/2';
                  break;
                case 'TL':
                  posClass = 'top-6 right-6';
                  break;
                case 'T':
                  posClass = 'right-2 top-1/2 -translate-y-1/2';
                  break;
                case 'TG':
                  posClass = 'bottom-6 right-6';
                  break;
                case 'S':
                  posClass = 'bottom-2 left-1/2 -translate-x-1/2';
                  break;
                case 'BD':
                  posClass = 'bottom-6 left-6';
                  break;
                case 'B':
                  posClass = 'left-2 top-1/2 -translate-y-1/2';
                  break;
                case 'BL':
                  posClass = 'top-6 left-6';
                  break;
                default:
                  posClass = '';
              }

              if (item.status === 'pantangan-naga') {
                badgeBg = 'bg-rose-600 text-white border-rose-400 ring-2 ring-rose-500/50';
              } else if (item.status === 'rezeki-utama') {
                badgeBg = 'bg-amber-400 text-slate-950 border-white ring-2 ring-amber-300 font-black shadow-md';
              } else if (item.status === 'rezeki-pangan') {
                badgeBg = 'bg-emerald-500 text-white border-emerald-300';
              } else if (item.status === 'rezeki-gedhong') {
                badgeBg = 'bg-indigo-600 text-white border-indigo-300';
              } else {
                badgeBg = 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700';
              }

              return (
                <button
                  key={item.arah}
                  type="button"
                  onClick={() => setSelectedDirection(item)}
                  className={`absolute z-20 ${posClass} transition-all duration-200 transform hover:scale-110 flex flex-col items-center ${
                    isSelected ? 'scale-115 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]' : ''
                  }`}
                >
                  <div
                    className={`px-2 py-1 rounded-xl text-[11px] font-black border shadow-md flex items-center gap-1 ${badgeBg}`}
                  >
                    <span>{item.singkatan}</span>
                    {item.isNagaHead && <span>🐉</span>}
                    {item.status === 'rezeki-utama' && <span>✨</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legenda Kompas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-bold">
              <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
              <span>Rezeki Utama</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              <span>Arah Pangan</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold">
              <span className="w-3 h-3 rounded-full bg-indigo-600 shrink-0" />
              <span>Gedhong/Harta</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 font-bold">
              <span className="w-3 h-3 rounded-full bg-rose-600 shrink-0" />
              <span>Cangkem Naga</span>
            </div>
          </div>
        </div>

        {/* Panel Detail Arah Terpilih (5 Kolom) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">
              Rincian Arah Terpilih:
            </span>
            {selectedDirection && (
              <span
                className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                  selectedDirection.status === 'pantangan-naga'
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : selectedDirection.status === 'rezeki-utama'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                Skor: {selectedDirection.skorBerkah}/100
              </span>
            )}
          </div>

          {selectedDirection ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-amber-600" />
                  {selectedDirection.arah}
                </h3>
                <p className="text-xs font-bold text-amber-800">
                  {selectedDirection.labelStatus}
                </p>
              </div>

              {/* Status Alert */}
              <div
                className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                  selectedDirection.status === 'pantangan-naga'
                    ? 'bg-rose-50 border-rose-200 text-rose-950'
                    : selectedDirection.status === 'rezeki-utama'
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  {selectedDirection.status === 'pantangan-naga' ? (
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  )}
                  <span>Makna Filosofis Adat:</span>
                </div>
                <p>{selectedDirection.keterangan}</p>
              </div>

              {/* Panduan Aksi */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">Rekomendasi Tindakan:</span>
                {selectedDirection.status === 'pantangan-naga' ? (
                  <ul className="list-disc list-inside space-y-1 text-rose-800 bg-rose-50/50 p-3 rounded-xl border border-rose-200">
                    <li>Hindari membuka toko yang menghadap persis ke arah ini hari ini.</li>
                    <li>Hindari memulai perjalanan darat/laut jarak jauh menuju arah ini.</li>
                    <li>Jika terpaksa harus ke arah ini, lakukan rekayasa rute melingkar (*muter arah*) terlebih dahulu.</li>
                  </ul>
                ) : selectedDirection.status === 'rezeki-utama' ? (
                  <ul className="list-disc list-inside space-y-1 text-emerald-800 bg-emerald-50/50 p-3 rounded-xl border border-emerald-200">
                    <li>Sangat baik untuk memulai promosi produk dan negosiasi kontrak.</li>
                    <li>Awali langkah kaki pertama menghadap ke arah ini sambil berdoa.</li>
                    <li>Membuka pintu toko atau etalase ke arah ini mendatangkan pembeli barokah.</li>
                  </ul>
                ) : (
                  <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    Arah ini aman untuk kegiatan rutin, belanja harian, maupun silaturahmi biasa tanpa pantangan khusus.
                  </p>
                )}
              </div>

              {/* Kaidah Laku Naga Dina Hari Ini */}
              <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-900 block flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-amber-700" />
                  Kaidah Petung {weton.hari}:
                </span>
                <p className="text-amber-950 leading-relaxed italic">
                  "{petungArah.nagaDina.kaidahLaku}"
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Tab 5 Kategori Hajat & Ikhtiar Nyata */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-600" />
            Panduan Arah Menurut Kategori Ikhtiar
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Pilih jenis kegiatan yang hendak Anda laksanakan hari ini untuk mendapatkan arah orientasi terbaik:
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'usaha', label: 'Buka Usaha / Dagang', icon: Store },
            { id: 'karir', label: 'Melamar Kerja / Wawancara', icon: Briefcase },
            { id: 'bepergian', label: 'Bepergian / Mudik / Merantau', icon: Plane },
            { id: 'negosiasi', label: 'Negosiasi / Tagih Hutang', icon: Coins },
            { id: 'investasi', label: 'Investasi / Beli Properti', icon: Building },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeHajatTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveHajatTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Isi Tab Terpilih */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
          {activeHajatTab === 'usaha' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Store className="w-5 h-5 text-amber-600" />
                  Perniagaan & Membuka Usaha Baru
                </h3>
                <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300 w-fit">
                  Arah Utama: {petungArah.arahTerbaikHajat.usahaDagang.arah}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {petungArah.arahTerbaikHajat.usahaDagang.tips}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">Bidang Usaha Pasaran {weton.pasaran}:</strong>
                  <p className="text-slate-600">{petungArah.nagaPasaran.maknaUsaha}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">Unsur Elemen Pasaran:</strong>
                  <p className="text-slate-600">{petungArah.nagaPasaran.unsur} ({petungArah.nagaPasaran.warnaSimbol})</p>
                </div>
              </div>
            </div>
          )}

          {activeHajatTab === 'karir' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Melamar Pekerjaan, Seleksi & Wawancara Karir
                </h3>
                <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-900 rounded-full border border-blue-300 w-fit">
                  Arah Jaya: {petungArah.arahTerbaikHajat.melamarKerja.arah}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {petungArah.arahTerbaikHajat.melamarKerja.tips}
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                <strong>Tips Wawancara:</strong> Menghadap ke arah Jaya ({petungArah.nagaDina.arahJaya}) membantu memancarkan aura ketenangan wibawa dan menjernihkan tutur kata saat menjawab pertanyaan penguji.
              </div>
            </div>
          )}

          {activeHajatTab === 'bepergian' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-emerald-600" />
                  Bepergian Jauh, Merantau, Mudik & Ekspedisi
                </h3>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full border border-emerald-300 w-fit">
                  Arah Aman (Geger): {petungArah.arahTerbaikHajat.bepergianJauh.arah}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {petungArah.arahTerbaikHajat.bepergianJauh.tips}
              </p>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900">
                <strong>Pantangan Penting:</strong> Hindari memulai rute keberangkatan persis ke arah <strong>{petungArah.nagaDina.pantanganUtama}</strong>.
              </div>
            </div>
          )}

          {activeHajatTab === 'negosiasi' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-600" />
                  Negosiasi Bisnis, Mediasi & Menagih Piutang
                </h3>
                <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300 w-fit">
                  Arah Duduk: {petungArah.arahTerbaikHajat.negosiasiPiutang.arah}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {petungArah.arahTerbaikHajat.negosiasiPiutang.tips}
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                <strong>Sikap Batin:</strong> Mengedepankan prinsip <em>menang tanpa ngasorake</em> (meraih kesepakatan tanpa mempermalukan pihak lain) agar hubungan kemitraan tetap langgeng.
              </div>
            </div>
          )}

          {activeHajatTab === 'investasi' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Building className="w-5 h-5 text-indigo-600" />
                  Pembelian Properti, Tanah & Investasi Emas
                </h3>
                <span className="text-xs font-bold px-3 py-1 bg-indigo-100 text-indigo-900 rounded-full border border-indigo-300 w-fit">
                  Arah Gedhong: {petungArah.arahTerbaikHajat.investasiProperti.arah}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {petungArah.arahTerbaikHajat.investasiProperti.tips}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Jadwal Jam Berkah Harian (Saat 5 Betaljemur) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              Jadwal Jam Berkah Harian (*Saat 5*)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Siklus waktu keberuntungan hari {weton.hari} menurut jam matahari klasik:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {petungArah.jamBerkahHariIni.map((jamItem, idx) => {
            const isBerkah = jamItem.kategori.includes('Berkah') || jamItem.kategori.includes('Kamulyan');
            const isWaspada = jamItem.kategori.includes('Waspada');

            return (
              <div
                key={jamItem.waktu}
                className={`p-4 rounded-2xl border transition-all space-y-2 ${
                  isWaspada
                    ? 'bg-rose-50/70 border-rose-200'
                    : isBerkah
                    ? 'bg-amber-50/80 border-amber-300 shadow-2xs'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    Waktu {idx + 1}
                  </span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isWaspada
                        ? 'bg-rose-200 text-rose-900'
                        : isBerkah
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {jamItem.kategori.split(' ')[1] || jamItem.kategori}
                  </span>
                </div>

                <div>
                  <div className="text-sm font-black text-slate-900">{jamItem.jam}</div>
                  <div className="text-[11px] font-bold text-amber-900">{jamItem.waktu}</div>
                </div>

                <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200/60 leading-snug">
                  <strong>Aktivitas:</strong> {jamItem.rekomendasiAktivitas}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Etika Melangkah & Doa Keselamatan (Tawakal) */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100/50 rounded-3xl p-6 sm:p-7 border border-amber-300 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span>Etika Melangkah & Doa Memohon Kelapangan Rezeki</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-2">
            <span className="font-bold text-slate-800 block">
              1. Tata Cara Melangkah Keluar Rumah:
            </span>
            <p className="text-slate-700 leading-relaxed">
              <strong>{petungArah.etikaBerangkat.langkahKakiPertama}</strong>: {petungArah.etikaBerangkat.alasanNeptu}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-2">
            <span className="font-bold text-slate-800 block">
              2. Doa Keselamatan & Tawakal:
            </span>
            <p className="font-serif italic text-amber-950 text-xs leading-relaxed bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              "{petungArah.etikaBerangkat.doaKeselamatan}"
            </p>
            <p className="text-[11px] text-slate-600">
              <strong>Artinya:</strong> {petungArah.etikaBerangkat.artianDoa}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 italic bg-white/80 p-3 rounded-xl border border-amber-200/60 leading-relaxed">
          <strong>Nasihat Luhur:</strong> {petungArah.etikaBerangkat.nasihatTawakal}
        </p>

        {/* Landasan Hadits Nabi Mengenai Waktu Pagi & Tawakkal Rezeki */}
        <div className="bg-emerald-950/90 border border-emerald-600/70 p-4 rounded-2xl space-y-2 text-emerald-100">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
            <span className="flex items-center gap-1.5">
              <span>⚖️</span> Tuntunan Hadits: Keberkahan Pagi & Doa Tawakal
            </span>
            <span className="text-[10px] bg-emerald-900 border border-emerald-500 px-2 py-0.5 rounded-full">
              HR. Abu Dawud & Tirmidzi
            </span>
          </div>
          <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-700/60 space-y-1 text-xs">
            <p className="font-serif text-right text-emerald-100 text-sm">
              «اللَّهُمَّ بَارِكْ لِأُمَّتِي فِي بُكُورِهَا»
            </p>
            <p className="text-emerald-200 text-[11px] leading-relaxed">
              <em>"Ya Allah, berkahilah umatku pada waktu pagi hari mereka."</em> (HR. Abu Dawud no. 2606)
            </p>
            <p className="text-emerald-300/90 text-[11px] pt-1">
              <strong>Kaidah Ikhtiar:</strong> Mengawali ikhtiar di waktu pagi serta melafalkan <em>"Bismillahi tawakkaltu 'alallah, la hawla wa la quwwata illa billah"</em> saat keluar pintu adalah perisai tauhid tertinggi yang menyempurnakan keselamatan dan kelancaran rezeki.
            </p>
          </div>
        </div>
      </div>

      {/* Radar Mingguan (7 Hari ke Depan) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              Radar Arah Rezeki 7 Hari ke Depan
            </h2>
            <p className="text-xs text-slate-500">
              Rencanakan hari dan arah terbaik untuk kegiatan penting Anda sepekan ini:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {pekanDepan.map((dayItem, idx) => {
            const isToday = dayItem.tanggalIso === selectedDate;

            return (
              <div
                key={dayItem.tanggalIso}
                onClick={() => setSelectedDate(dayItem.tanggalIso)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 space-y-2 ${
                  isToday
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-bold scale-102'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span>{idx === 0 ? 'Hari Ini' : `${dayItem.dateObj.getDate()}/${dayItem.dateObj.getMonth() + 1}`}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${isToday ? 'bg-slate-950 text-white' : 'bg-slate-200 text-slate-800'}`}>
                    N{dayItem.weton.neptuTotal}
                  </span>
                </div>

                <div>
                  <div className="font-extrabold text-sm leading-tight">
                    {dayItem.weton.hari}
                  </div>
                  <div className={`text-xs ${isToday ? 'text-slate-900 font-bold' : 'text-amber-800 font-semibold'}`}>
                    {dayItem.weton.pasaran}
                  </div>
                </div>

                <div className="pt-2 border-t border-black/10 text-[10px] space-y-1 leading-snug">
                  <div>
                    <span className="block opacity-75">Rezeki:</span>
                    <strong>{dayItem.petung.nagaDina.arahSandang.split(' ')[0]}</strong>
                  </div>
                  <div>
                    <span className="block opacity-75">Pantangan:</span>
                    <strong className={isToday ? 'text-slate-950' : 'text-rose-700'}>
                      {dayItem.petung.nagaDina.pantanganUtama.split(' ')[0]}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ensiklopedia Naga Dina & Pasaran (Accordion) */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setShowEncyclopedia(!showEncyclopedia)}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-50 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg">
              <BookOpen className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Tabel Lengkap 7 Naga Dina & 5 Naga Pasaran
              </h3>
              <p className="text-xs text-slate-500">
                Pedoman naskah asli Kitab Primbon Betaljemur Adammakna Bab Sandang Pangan
              </p>
            </div>
          </div>
          <ChevronRight
            className={`w-5 h-5 text-slate-400 transition-transform ${
              showEncyclopedia ? 'rotate-90' : ''
            }`}
          />
        </button>

        {showEncyclopedia && (
          <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50 space-y-6 animate-fadeIn">
            {/* Tabel 7 Naga Dina */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span>🐉</span> 1. Pedoman 7 Naga Dina (Hari Saptawara)
              </h4>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-extrabold">
                    <tr>
                      <th className="p-3">Hari</th>
                      <th className="p-3">Cangkem Naga (Pantangan)</th>
                      <th className="p-3">Geger Naga (Aman)</th>
                      <th className="p-3">Arah Sandang</th>
                      <th className="p-3">Arah Pangan</th>
                      <th className="p-3">Kaidah Laku</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Object.values(DAFTAR_7_NAGA_DINA).map((n) => (
                      <tr key={n.hari} className={n.hari === weton.hari ? 'bg-amber-50 font-bold' : ''}>
                        <td className="p-3 font-bold text-slate-900">{n.hari}</td>
                        <td className="p-3 text-rose-700 font-bold">{n.pantanganUtama}</td>
                        <td className="p-3 text-blue-700">{n.punggungNaga}</td>
                        <td className="p-3 text-emerald-700">{n.arahSandang}</td>
                        <td className="p-3 text-emerald-700">{n.arahPangan}</td>
                        <td className="p-3 text-slate-600 text-[11px] max-w-xs">{n.kaidahLaku}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabel 5 Naga Pasaran */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span>🌾</span> 2. Pedoman 5 Naga Pasaran (Pancawarna)
              </h4>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-extrabold">
                    <tr>
                      <th className="p-3">Pasaran</th>
                      <th className="p-3">Neptu</th>
                      <th className="p-3">Arah Duduk</th>
                      <th className="p-3">Warna / Simbol</th>
                      <th className="p-3">Unsur</th>
                      <th className="p-3">Bidang Usaha Unggulan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Object.values(DAFTAR_5_NAGA_PASARAN).map((p) => (
                      <tr key={p.pasaran} className={p.pasaran === weton.pasaran ? 'bg-amber-50 font-bold' : ''}>
                        <td className="p-3 font-bold text-slate-900">{p.pasaran}</td>
                        <td className="p-3">{p.neptu}</td>
                        <td className="p-3 font-bold text-amber-900">{p.arahDuduk}</td>
                        <td className="p-3">{p.warnaSimbol}</td>
                        <td className="p-3">{p.unsur}</td>
                        <td className="p-3 text-slate-600 text-[11px] max-w-xs">{p.maknaUsaha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer Buttons (Hidden on Print) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-200 text-slate-800 text-xs font-bold transition shadow-xs border border-slate-300"
            title="Salin ringkasan arah rezeki ke clipboard"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            <span>{isCopied ? 'Tersalin!' : 'Salin Ringkasan'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              downloadTextFile(
                `🧭 PETUNG NAGA DINA & ARAH REZEKI (WETON JOWO)\nTanggal: ${weton.tanggalMasehi}\nWeton: ${weton.hari} ${weton.pasaran} (Neptu ${weton.neptuTotal})\n\nARAH UTAMA:\n• Sandang: ${petungArah.nagaDina.arahSandang}\n• Pangan: ${petungArah.nagaDina.arahPangan}\n• Gedhong: ${petungArah.nagaDina.arahGedhong}\n• Pantangan Cangkem Naga: ${petungArah.nagaDina.pantanganUtama}\n\nJAM BERKAH:\n${petungArah.jamBerkahHariIni.map((j) => `• ${j.jam} (${j.kategori}): ${j.rekomendasiAktivitas}`).join('\n')}\n\nDOA: "${petungArah.etikaBerangkat.doaKeselamatan}"`,
                `Arah_Rejeki_${weton.hari}_${weton.pasaran}_${weton.tanggalMasehi.replace(/\s+/g, '_')}.txt`
              );
            }}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition shadow-xs"
            title="Unduh ringkasan arah rezeki sebagai dokumen teks .txt"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Unduh TXT</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPiagamModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition shadow-xs"
            title="Buka Piagam Resmi Arah Rezeki & Naga Dina untuk Dicetak atau Diunduh (PNG/PDF)"
          >
            <Printer className="w-4 h-4 text-slate-950" />
            <span>Piagam Resmi & Cetak</span>
          </button>
        </div>

        {onOpenPantanganModal && (
          <button
            type="button"
            onClick={onOpenPantanganModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-900 hover:bg-rose-800 text-white text-xs font-bold transition shadow-sm"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Kelola Pantangan Hari Naas</span>
          </button>
        )}
      </div>

      {/* Modal Piagam Serat Arah Rejeki & Naga Dina */}
      <PiagamPetungModal
        isOpen={isPiagamModalOpen}
        onClose={() => setIsPiagamModalOpen(false)}
        data={{
          judulPiagam: 'Piagam Serat Pandom Arah Rejeki & Naga Dina',
          nomorSurat: `WJ-ND-${weton.neptuTotal}-${weton.hari.substring(0, 3)}-${weton.pasaran.substring(0, 3)}`,
          tanggalMasehi: weton.tanggalMasehi,
          tanggalJawa: `${weton.tahunJawa}`,
          pihakSatu: {
            label: 'Hari Petung Berjalan',
            nama: `${weton.hari} ${weton.pasaran}`,
            weton: `${weton.hari} ${weton.pasaran}`,
            neptu: weton.neptuTotal,
            wuku: weton.wuku,
          },
          ringkasanHasil: {
            kategoriUtama: `Arah Kemakmuran: ${petungArah.nagaDina.arahSandang} (Sandang) & ${petungArah.nagaDina.arahPangan} (Pangan)`,
            skorAtauSisa: `Neptu ${weton.neptuTotal} • Naga Dina: ${petungArah.nagaDina.posisiNaga}`,
            maknaAdat: `Arah rezeki utama bertempat di ${petungArah.nagaDina.arahGedhong}. Hindari menghadap kepala naga (${petungArah.nagaDina.pantanganUtama}) saat memulai perjalanan dan transaksi besar.`,
            rekomendasiLuhur: `${petungArah.nagaDina.kaidahLaku}. Berangkatlah dengan melangkahkan kaki kanan dan membaca doa keselamatan.`,
          },
          catatanKhusus: [
            `Sandang & Pangan: Menghadap ke arah ${petungArah.nagaDina.arahSandang} atau ${petungArah.nagaDina.arahPangan}.`,
            `Pantangan Utama: ${petungArah.nagaDina.pantanganUtama} (Cangkem Naga).`,
            `Jam Berkah Utama: ${petungArah.jamBerkahHariIni[0]?.jam || '06:00 - 08:30'} (${petungArah.jamBerkahHariIni[0]?.kategori || 'Sangat Baik'}).`,
          ],
        }}
      />
    </div>
  );
};
