import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  BookOpen,
  Calendar,
  Heart,
  CheckCircle2,
  Copy,
  Volume2,
  VolumeX,
  Share2,
  RefreshCw,
  Search,
  Filter,
  ShieldAlert,
  Moon,
  Sun,
  Flame,
  Wind,
  Compass,
  Layers,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Check
} from 'lucide-react';
import { HariJawa, PasaranJawa } from '../types/weton';
import {
  DAFTAR_WIRID_SAPTAWARA,
  DAFTAR_WIRID_PANCAWARA,
  DAFTAR_DOA_PESANTREN_PILIHAN,
  getPaketWiridWeton,
  WiridHariSaptawara,
  WiridPasaranPancawara,
  DoaPesantrenItem
} from '../data/wiridWetonData';
import { hitungWetonLengkap, getDeviceLocalDateString } from '../utils/javaneseCalendar';

const HARI_OPTIONS: HariJawa[] = ['Ahad', 'Senen', 'Selasa', 'Rebo', 'Kemis', 'Jemuwah', 'Setu'];
const PASARAN_OPTIONS: PasaranJawa[] = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

export const WiridDoaHarianView: React.FC = () => {
  // Navigation Tabs inside the module
  const [subTab, setSubTab] = useState<'personal' | 'saptawara' | 'pancawara' | 'doa-pesantren' | 'tasbih'>('personal');

  // Device Today Date & Initial Weton
  const initialTodayStr = useMemo(() => getDeviceLocalDateString(), []);
  const initialTodayWeton = useMemo(() => hitungWetonLengkap(initialTodayStr), [initialTodayStr]);

  // Selected Weton State (Defaults directly to today's device weton)
  const [selectedHari, setSelectedHari] = useState<HariJawa>(initialTodayWeton.hari);
  const [selectedPasaran, setSelectedPasaran] = useState<PasaranJawa>(initialTodayWeton.pasaran);
  const [inputDate, setInputDate] = useState<string>(initialTodayStr);

  // Search & Filter
  const [searchDoa, setSearchDoa] = useState('');
  const [selectedKategoriDoa, setSelectedKategoriDoa] = useState<string>('Semua');

  // Copy notification state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Digital Tasbih State
  const [tasbihCount, setTasbihCount] = useState<number>(0);
  const [tasbihTarget, setTasbihTarget] = useState<number>(33);
  const [tasbihTitle, setTasbihTitle] = useState<string>('Subhanallah wa Bihamdihi');

  // Auto calculate weton from date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputDate(val);
    if (val) {
      try {
        const res = hitungWetonLengkap(val);
        setSelectedHari(res.hari);
        setSelectedPasaran(res.pasaran);
      } catch (err) {
        console.error('Gagal menghitung weton:', err);
      }
    }
  };

  // Personal Weton Paket
  const personalPaket = useMemo(() => {
    return getPaketWiridWeton(selectedHari, selectedPasaran);
  }, [selectedHari, selectedPasaran]);

  const currentSapta = useMemo(() => {
    return DAFTAR_WIRID_SAPTAWARA.find((s) => s.hari === selectedHari) || DAFTAR_WIRID_SAPTAWARA[0];
  }, [selectedHari]);

  const currentPanca = useMemo(() => {
    return DAFTAR_WIRID_PANCAWARA.find((p) => p.pasaran === selectedPasaran) || DAFTAR_WIRID_PANCAWARA[0];
  }, [selectedPasaran]);

  // Copy handler
  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Digital Tasbih Increment
  const handleIncrementTasbih = () => {
    setTasbihCount((prev) => {
      const next = prev + 1;
      // Vibrate if available on mobile
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(20);
      }
      return next;
    });
  };

  const handleResetTasbih = () => {
    setTasbihCount(0);
  };

  // Filtered Doa
  const filteredDoaList = useMemo(() => {
    return DAFTAR_DOA_PESANTREN_PILIHAN.filter((item) => {
      const matchKategori = selectedKategoriDoa === 'Semua' || item.kategori === selectedKategoriDoa;
      const matchQuery =
        !searchDoa.trim() ||
        item.judul.toLowerCase().includes(searchDoa.toLowerCase()) ||
        item.arti.toLowerCase().includes(searchDoa.toLowerCase()) ||
        item.latin.toLowerCase().includes(searchDoa.toLowerCase()) ||
        item.keutamaan.toLowerCase().includes(searchDoa.toLowerCase());
      return matchKategori && matchQuery;
    });
  }, [selectedKategoriDoa, searchDoa]);

  const categories = ['Semua', 'Rezeki', 'Keselamatan', 'Tolak Bala', 'Ketenangan Hati', 'Keluarga & Anak', 'Hajat & Ujian'];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER: WIRID & DOA HARIAN WETON DALAM TRADISI PESANTREN */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white p-5 sm:p-7 border border-emerald-800/60 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-56 h-56 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-teal-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold tracking-wider uppercase">
              <span>🕌</span>
              <span>Integrasi Syariat & Tradisi Pesantren Salaf</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              Kumpulan Wirid & Doa Harian Weton
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Panduan amalan dzikir, hizib, asmaul husna, dan doa mustajab rujukan ulama pesantren nusantara (*Kitab Al-Adzkar, Khazinatul Asrar, Ihya Ulumuddin*) yang diselaraskan dengan ritme hari kelahiran Jawa (*Saptawara & Pancawara*) untuk tazkiyatun nafs (penyucian jiwa).
            </p>
          </div>

          {/* Quick Stats / Info Badge */}
          <div className="bg-emerald-900/40 backdrop-blur-md border border-emerald-700/50 rounded-2xl p-3.5 sm:p-4 text-center md:text-right shrink-0">
            <div className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider">
              Metode Penyelarasan
            </div>
            <div className="text-base font-black text-white mt-0.5">
              Tasyakkur & Dzikrullah
            </div>
            <div className="text-[11px] text-emerald-200/80 mt-1">
              Bebas Syirik & Khurafat
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="mt-6 pt-4 border-t border-emerald-800/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSubTab('personal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'personal'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/80 border border-emerald-800/60'
            }`}
          >
            <span>✨</span>
            <span>Paket Weton Anda</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('saptawara')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'saptawara'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/80 border border-emerald-800/60'
            }`}
          >
            <span>📅</span>
            <span>Wirid 7 Hari (Saptawara)</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('pancawara')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'pancawara'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/80 border border-emerald-800/60'
            }`}
          >
            <span>☸</span>
            <span>Wirid 5 Pasaran (Pancawara)</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('doa-pesantren')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'doa-pesantren'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/80 border border-emerald-800/60'
            }`}
          >
            <span>📖</span>
            <span>Kumpulan Doa Pesantren</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('tasbih')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              subTab === 'tasbih'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/80 border border-emerald-800/60'
            }`}
          >
            <span>📿</span>
            <span>Tasbih Digital</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. WETON SELECTOR CARD (INTERACTIVE KALKULATOR AMALAN) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span>🎛️</span>
              <span>Pilih atau Cari Hari Weton Kelahiran Anda</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih hari dan pasaran secara manual atau masukkan tanggal lahir masehi untuk menghitung paket wirid otomatis.
            </p>
          </div>

          {/* Tanggal Lahir Picker */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-600">Tanggal Lahir:</span>
            <input
              type="date"
              value={inputDate}
              onChange={handleDateChange}
              className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Hari & Pasaran Button Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {/* Hari Saptawara */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Pilih Hari (Saptawara)
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
              {HARI_OPTIONS.map((hari) => {
                const isSelected = selectedHari === hari;
                const meta = DAFTAR_WIRID_SAPTAWARA.find((s) => s.hari === hari);
                return (
                  <button
                    key={hari}
                    type="button"
                    onClick={() => setSelectedHari(hari)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition text-center border ${
                      isSelected
                        ? 'bg-emerald-900 text-emerald-100 border-emerald-700 shadow-sm ring-2 ring-emerald-500'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="truncate">{hari}</div>
                    <div className="text-[10px] opacity-70">N: {meta?.neptu}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pasaran Pancawara */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Pilih Pasaran (Pancawara)
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {PASARAN_OPTIONS.map((pasaran) => {
                const isSelected = selectedPasaran === pasaran;
                const meta = DAFTAR_WIRID_PANCAWARA.find((p) => p.pasaran === pasaran);
                return (
                  <button
                    key={pasaran}
                    type="button"
                    onClick={() => setSelectedPasaran(pasaran)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition text-center border ${
                      isSelected
                        ? 'bg-teal-900 text-teal-100 border-teal-700 shadow-sm ring-2 ring-teal-500'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="truncate">{pasaran}</div>
                    <div className="text-[10px] opacity-70">N: {meta?.neptu}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Weton Active Badge Bar */}
        <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 rounded-2xl border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black text-sm shadow-xs">
              {personalPaket.totalNeptu}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Weton Terpilih: <span className="text-emerald-900 font-black text-sm">{selectedHari} {selectedPasaran}</span>
              </div>
              <div className="text-[11px] text-slate-600">
                Neptu: {currentSapta.neptu} + {currentPanca.neptu} = <strong className="text-slate-900">{personalPaket.totalNeptu}</strong> • Elemen: {currentSapta.elemenJawa} & {currentPanca.elemenKosmis}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setTasbihTitle(currentSapta.wiridUtama[0].judul);
                setSubTab('tasbih');
                setTasbihCount(0);
              }}
              className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-1.5"
            >
              <span>📿</span>
              <span>Buka di Tasbih Digital</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TAB CONTENT 1: PAKET WIRID WETON PRIBADI */}
      {/* ========================================================================= */}
      {subTab === 'personal' && (
        <div className="space-y-6">
          {/* Overview Grid Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: Karakter Batiniah */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-sm">
                🧠
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Karakter Batin & Spiritual</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentSapta.karakterSpiritual}
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-blue-800 font-semibold">
                Fokus: {currentPanca.fokusPenyelarasanBatin}
              </div>
            </div>

            {/* Box 2: Kunci Dzikir Pokok */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-sm">
                📿
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Kunci Dzikir & Wirid Harian</h3>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {personalPaket.kunciDzikirHarian}
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-semibold">
                Waktu utama: Ba’da Subuh & Ba’da Maghrib/Isya
              </div>
            </div>

            {/* Box 3: Petuah Kiai Sepuh */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                📜
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Pitutur Luhur Kiai Sepuh</h3>
              <p className="text-xs text-slate-700 italic leading-relaxed bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                "{currentPanca.nasihatKiaiSepuh}"
              </p>
            </div>
          </div>

          {/* Utama: Wirid Hari Kelahiran (Saptawara) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Amalan Pokok Hari {selectedHari}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  1. Wirid Hari {selectedHari} ({currentSapta.hariMasehi})
                </h3>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Rujukan: {currentSapta.wiridUtama[0].rujukanKitab}
              </span>
            </div>

            <div className="space-y-4">
              {currentSapta.wiridUtama.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 relative hover:border-emerald-300 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{item.judul}</h4>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {item.jumlah}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyText(item.id, `${item.lafalArab}\n\n${item.transliterasi}\n\nArtinya: ${item.terjemahan}`)}
                        className="p-1.5 rounded-lg bg-white border border-slate-300 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition text-xs"
                        title="Salin Teks Wirid"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Teks Arab Berharakat */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-right">
                    <div className="font-serif text-lg sm:text-2xl text-slate-900 font-bold leading-loose tracking-wide">
                      {item.lafalArab}
                    </div>
                  </div>

                  {/* Transliterasi Latin */}
                  <div className="text-xs sm:text-sm font-semibold text-emerald-950">
                    "{item.transliterasi}"
                  </div>

                  {/* Terjemahan */}
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <strong>Artinya:</strong> {item.terjemahan}
                  </div>

                  {/* Fadhilah & Pelaksanaan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-[11px]">
                    <div className="text-slate-600">
                      <strong className="text-slate-800">Fadhilah:</strong> {item.fadhilah}
                    </div>
                    <div className="text-slate-600">
                      <strong className="text-slate-800">Waktu:</strong> {item.waktuPelaksanaan}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Asmaul Husna Pasaran (Pancawara) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  Penyelarasan Batin Pasaran {selectedPasaran}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  2. Asmaul Husna Pasaran {selectedPasaran} ({currentPanca.elemenKosmis})
                </h3>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Arah: {currentPanca.arahDuduk}
              </span>
            </div>

            <div className="bg-teal-50/50 rounded-2xl p-4 sm:p-5 border border-teal-200 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-teal-950">{currentPanca.asmaulHusnaUtama.judul}</h4>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-200 text-teal-900">
                    {currentPanca.asmaulHusnaUtama.jumlah}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyText(currentPanca.asmaulHusnaUtama.id, `${currentPanca.asmaulHusnaUtama.lafalArab}\n\n${currentPanca.asmaulHusnaUtama.transliterasi}\n\nArtinya: ${currentPanca.asmaulHusnaUtama.terjemahan}`)}
                    className="p-1.5 rounded-lg bg-white border border-teal-300 text-teal-800 hover:bg-teal-100 transition text-xs"
                    title="Salin Asmaul Husna"
                  >
                    {copiedId === currentPanca.asmaulHusnaUtama.id ? <Check className="w-3.5 h-3.5 text-teal-700" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Teks Arab */}
              <div className="bg-white p-4 rounded-xl border border-teal-200 text-right">
                <div className="font-serif text-lg sm:text-2xl text-slate-900 font-bold leading-loose tracking-wide">
                  {currentPanca.asmaulHusnaUtama.lafalArab}
                </div>
              </div>

              {/* Transliterasi Latin */}
              <div className="text-xs sm:text-sm font-semibold text-teal-950">
                "{currentPanca.asmaulHusnaUtama.transliterasi}"
              </div>

              {/* Terjemahan */}
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong>Artinya:</strong> {currentPanca.asmaulHusnaUtama.terjemahan}
              </div>

              {/* Fadhilah */}
              <div className="text-[11px] text-teal-900 pt-2 border-t border-teal-200/80">
                <strong>Fadhilah & Khasiat Batin:</strong> {currentPanca.asmaulHusnaUtama.fadhilah}
              </div>
            </div>
          </div>

          {/* Doa Harian Khusus Munajat */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                🤲
              </span>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  3. {currentSapta.doaHarianKhusus.judul}
                </h3>
                <p className="text-xs text-slate-500">
                  {currentSapta.doaHarianKhusus.penjelasanPesantren}
                </p>
              </div>
            </div>

            <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-200 space-y-3">
              <div className="bg-white p-4 rounded-xl border border-amber-200 text-right">
                <div className="font-serif text-lg sm:text-2xl text-slate-900 font-bold leading-loose tracking-wide">
                  {currentSapta.doaHarianKhusus.lafalArab}
                </div>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-amber-950">
                "{currentSapta.doaHarianKhusus.transliterasi}"
              </div>

              <div className="text-xs text-slate-600 leading-relaxed">
                <strong>Artinya:</strong> {currentSapta.doaHarianKhusus.terjemahan}
              </div>
            </div>
          </div>

          {/* Panduan Puasa Weton Menurut Syariat Islam & Pesantren */}
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-emerald-700/50 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-lg">
                🌙
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Panduan Puasa Weton (Tasyakkur bi an-Ni'mah)
                </h3>
                <p className="text-xs text-emerald-200/80">
                  Fikih Puasa Hari Lahir Sesuai Tuntunan Syariat & Pesantren Ahlussunnah wal Jama'ah
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800">
              {personalPaket.panduanPuasaWetonSyarie}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/80">
                <div className="font-bold text-emerald-300">Niat Puasa Weton Syar'i:</div>
                <div className="text-emerald-100 mt-1 italic font-serif">
                  "Nawaitu shauma yaumil miladi lillahi ta'ala"
                </div>
                <div className="text-[11px] text-emerald-200/70 mt-0.5">
                  (Aku berniat puasa hari kelahiranku karena Allah Ta'ala)
                </div>
              </div>

              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/80">
                <div className="font-bold text-emerald-300">Amalan Penyempurna:</div>
                <div className="text-emerald-100 mt-1">
                  Sedekah makanan/nasi berkah kepada fakir miskin, anak yatim, atau tetangga sekitar.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB CONTENT 2: WIRID 7 HARI (SAPTAWARA) */}
      {/* ========================================================================= */}
      {subTab === 'saptawara' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
            <h3 className="font-black text-slate-900 text-base sm:text-lg mb-1">
              Daftar Lengkap Wirid 7 Hari (Saptawara) Tradisi Pesantren
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Setiap hari memiliki keutamaan dan rahasia dzikir sebagaimana disusun oleh para auliya dan ulama dalam kitab-kitab wirid muktabar.
            </p>
          </div>

          <div className="space-y-5">
            {DAFTAR_WIRID_SAPTAWARA.map((hariData) => (
              <div
                key={hariData.hari}
                className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-700 text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {hariData.neptu}
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900">
                        Hari {hariData.hari} ({hariData.hariMasehi})
                      </h4>
                      <div className="text-xs text-slate-500">
                        Elemen: {hariData.elemenJawa} • Neptu: {hariData.neptu}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {hariData.karakterSpiritual}
                  </span>
                </div>

                {/* List Wirid */}
                <div className="space-y-3">
                  {hariData.wiridUtama.map((w) => (
                    <div key={w.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xs sm:text-sm text-slate-900">{w.judul}</div>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                          {w.jumlah}
                        </span>
                      </div>

                      <div className="text-right font-serif text-lg sm:text-xl font-bold text-slate-900 py-1">
                        {w.lafalArab}
                      </div>

                      <div className="text-xs font-semibold text-emerald-900">
                        "{w.transliterasi}"
                      </div>

                      <div className="text-xs text-slate-600">
                        <strong>Artinya:</strong> {w.terjemahan}
                      </div>

                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                        <strong>Fadhilah:</strong> {w.fadhilah} ({w.rujukanKitab})
                      </div>
                    </div>
                  ))}
                </div>

                {/* Korelasi Jawa */}
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                  <strong>Korelasi Penanggalan Jawa:</strong> {hariData.korelasiPenanggalanJawa}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB CONTENT 3: WIRID 5 PASARAN (PANCAWARA) */}
      {/* ========================================================================= */}
      {subTab === 'pancawara' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
            <h3 className="font-black text-slate-900 text-base sm:text-lg mb-1">
              Wirid & Penyelarasan Batin 5 Pasaran Jawa (Pancawara)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Konsep 5 pasaran Jawa (*Legi, Pahing, Pon, Wage, Kliwon*) memiliki korelasi dengan 4 arah mata angin plus 1 pusat (*Sedulur Papat Limo Pancer*) yang dalam tasawuf Islam diselaraskan dengan 4 nafsu manusia untuk mencapai nafsu Muthmainnah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DAFTAR_WIRID_PANCAWARA.map((pancaData) => (
              <div
                key={pancaData.pasaran}
                className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-base font-black text-slate-900">
                        Pasaran {pancaData.pasaran}
                      </h4>
                      <div className="text-xs text-slate-500">
                        Arah: {pancaData.arahDuduk} • Elemen: {pancaData.elemenKosmis}
                      </div>
                    </div>
                    <span className="w-8 h-8 rounded-xl bg-teal-800 text-white font-black text-xs flex items-center justify-center">
                      {pancaData.neptu}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700">
                    <strong className="text-slate-900">Aura & Karakter:</strong> {pancaData.warnaAura}
                  </div>

                  <div className="text-xs text-slate-700">
                    <strong className="text-slate-900">Fokus Batin:</strong> {pancaData.fokusPenyelarasanBatin}
                  </div>

                  {/* Asmaul Husna */}
                  <div className="bg-teal-50/60 p-3.5 rounded-2xl border border-teal-200 space-y-2">
                    <div className="text-xs font-bold text-teal-950">
                      {pancaData.asmaulHusnaUtama.judul} ({pancaData.asmaulHusnaUtama.jumlah})
                    </div>
                    <div className="text-right font-serif text-lg font-bold text-slate-900">
                      {pancaData.asmaulHusnaUtama.lafalArab}
                    </div>
                    <div className="text-[11px] text-teal-900 italic font-medium">
                      "{pancaData.asmaulHusnaUtama.transliterasi}"
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {pancaData.asmaulHusnaUtama.terjemahan}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs italic text-amber-950">
                  "{pancaData.nasihatKiaiSepuh}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TAB CONTENT 4: KUMPULAN DOA PESANTREN SALAF */}
      {/* ========================================================================= */}
      {subTab === 'doa-pesantren' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg mb-1">
                Ensiklopedi Doa Harian Pesantren Salaf
              </h3>
              <p className="text-xs text-slate-600">
                Doa-doa ma'tsur dari hadits shahih dan kitab rujukan pesantren untuk berbagai hajat hidup sehari-hari.
              </p>
            </div>

            {/* Filter Kategori & Search */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchDoa}
                  onChange={(e) => setSearchDoa(e.target.value)}
                  placeholder="Cari doa rezeki, perlindungan, hutang..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              {/* Kategori Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedKategoriDoa(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                      selectedKategoriDoa === cat
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Doa Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDoaList.map((doa) => (
              <div
                key={doa.id}
                className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {doa.kategori}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(doa.id, `${doa.judul}\n\n${doa.arab}\n\n${doa.latin}\n\nArtinya: ${doa.arti}`)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition"
                      title="Salin Doa"
                    >
                      {copiedId === doa.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                    {doa.judul}
                  </h4>

                  {/* Arab */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right">
                    <div className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                      {doa.arab}
                    </div>
                  </div>

                  {/* Latin */}
                  <div className="text-xs font-semibold text-emerald-950">
                    "{doa.latin}"
                  </div>

                  {/* Arti */}
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <strong>Artinya:</strong> {doa.arti}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <strong className="text-slate-700">Keutamaan:</strong> {doa.keutamaan} ({doa.sumberKitab})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. TAB CONTENT 5: DIGITAL TASBIH COUNTER */}
      {/* ========================================================================= */}
      {subTab === 'tasbih' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 max-w-lg mx-auto text-center space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
              Counter Dzikir Digital
            </span>
            <h3 className="text-xl font-black text-slate-900">
              {tasbihTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Ketuk tombol lingkaran besar untuk menambah hitungan wirid harian Anda.
            </p>
          </div>

          {/* Target Selector */}
          <div className="flex items-center justify-center gap-2">
            {[33, 100, 313, 1000].map((tgt) => (
              <button
                key={tgt}
                type="button"
                onClick={() => {
                  setTasbihTarget(tgt);
                  setTasbihCount(0);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  tasbihTarget === tgt
                    ? 'bg-emerald-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Target {tgt}x
              </button>
            ))}
          </div>

          {/* Giant Clickable Counter */}
          <div className="py-4">
            <button
              type="button"
              onClick={handleIncrementTasbih}
              className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full bg-gradient-to-tr from-emerald-800 via-teal-700 to-emerald-600 text-white shadow-2xl border-4 border-emerald-300 active:scale-95 transition-transform flex flex-col items-center justify-center cursor-pointer select-none group"
            >
              <span className="text-[11px] uppercase tracking-widest text-emerald-200 font-bold">
                Hitungan
              </span>
              <span className="text-5xl sm:text-6xl font-black tracking-tight my-1">
                {tasbihCount}
              </span>
              <span className="text-xs text-emerald-100 font-medium">
                dari {tasbihTarget} kali
              </span>

              {/* Progress bar circular ring */}
              <div className="w-24 bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-amber-300 h-full transition-all duration-200"
                  style={{ width: `${Math.min(100, (tasbihCount / tasbihTarget) * 100)}%` }}
                />
              </div>
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleResetTasbih}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Hitungan</span>
            </button>
          </div>

          {tasbihCount >= tasbihTarget && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-900 animate-bounce">
              🎉 Alhamdulillah! Anda telah menyelesaikan wirid target {tasbihTarget}x. Semoga membawa keberkahan lahir dan batin.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
