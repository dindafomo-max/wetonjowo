import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  CalendarHeart, 
  HeartHandshake, 
  Compass, 
  Eye, 
  ShieldCheck, 
  ShieldAlert, 
  FileCode2, 
  ArrowRight, 
  CheckCircle2, 
  Crown, 
  Heart, 
  Wallet, 
  Users, 
  BookOpen, 
  Copy, 
  Check, 
  ChevronRight,
  ChevronDown,
  LogIn,
  Share2,
  RefreshCw,
  Quote,
  HelpCircle,
  Flame,
  Award,
  BookMarked
} from 'lucide-react';
import { TabView } from '../types/weton';
import { useAuth } from '../context/AuthContext';
import { hitungWetonLengkap, getHariPasaranFromDate } from '../utils/javaneseCalendar';
import { DAFTAR_PITUTUR_LUHUR, DAFTAR_FAQ_PETUNG, PituturItem, FaqItem } from '../data/wisdomData';
import { RamalanHarianWetonCard } from './RamalanHarianWetonCard';

interface LandingPrefaceViewProps {
  onNavigateToModule: (tab: TabView['id']) => void;
}

export const LandingPrefaceView: React.FC<LandingPrefaceViewProps> = ({ onNavigateToModule }) => {
  const { user, isLoggedIn, isAdmin, setIsLoginModalOpen, setIsDonationModalOpen, requireAuth } = useAuth();

  // Interactive Quick Demo State for birthdate preview
  const [demoDate, setDemoDate] = useState('1998-05-20');
  const [copiedDana, setCopiedDana] = useState(false);
  const [copiedWeton, setCopiedWeton] = useState(false);
  const [copiedPitutur, setCopiedPitutur] = useState(false);
  const [activeFaqId, setActiveFaqId] = useState<string | null>('faq-1');
  const [currentPituturIdx, setCurrentPituturIdx] = useState(0);

  const demoWeton = useMemo(() => {
    return hitungWetonLengkap(demoDate);
  }, [demoDate]);

  const currentPitutur = DAFTAR_PITUTUR_LUHUR[currentPituturIdx % DAFTAR_PITUTUR_LUHUR.length];

  const danaNumber = '082142429266';
  const danaNumberFormatted = '0821-4242-9266';

  const handleCopyDana = () => {
    navigator.clipboard.writeText(danaNumber);
    setCopiedDana(true);
    setTimeout(() => setCopiedDana(false), 2000);
  };

  const handleCopyWetonResult = () => {
    const text = `☸ HASIL PERHITUNGAN WETON (WETON JOWO)\nTanggal: ${demoDate}\nWeton: ${demoWeton.hari} ${demoWeton.pasaran}\nNeptu: ${demoWeton.neptuTotal} (Hari ${demoWeton.neptuHari} + Pasaran ${demoWeton.neptuPasaran})\nWuku: ${demoWeton.wuku}\nWatak Kelahiran: ${demoWeton.watak}\n\nHitung weton, jodoh & hari baikmu di: https://ais-pre-iif37p72n6euueu7vjdqmb-810674584139.europe-west2.run.app`;
    navigator.clipboard.writeText(text);
    setCopiedWeton(true);
    setTimeout(() => setCopiedWeton(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `☸ *HASIL PERHITUNGAN WETON (WETON JOWO)*\n📅 Tanggal: ${demoDate}\n✨ *Weton:* ${demoWeton.hari} ${demoWeton.pasaran} (Neptu ${demoWeton.neptuTotal})\n📜 *Wuku:* ${demoWeton.wuku}\n🌟 *Watak:* ${demoWeton.watak}\n\n_Dihitung dengan Kitab Primbon Betaljemur Adammakna Modern:_\nhttps://ais-pre-iif37p72n6euueu7vjdqmb-810674584139.europe-west2.run.app`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopyPitutur = () => {
    const text = `"${currentPitutur.teksJawa}" (${currentPitutur.aksaraJawa})\nArtinya: "${currentPitutur.artiIndonesia}"\nFilosofi: ${currentPitutur.filosofi}\n— ${currentPitutur.sumber} via WETON JOWO`;
    navigator.clipboard.writeText(text);
    setCopiedPitutur(true);
    setTimeout(() => setCopiedPitutur(false), 2000);
  };

  const handleNextPitutur = () => {
    setCurrentPituturIdx((prev) => (prev + 1) % DAFTAR_PITUTUR_LUHUR.length);
  };

  const handleOpenModule = (tab: TabView['id']) => {
    requireAuth(() => {
      onNavigateToModule(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO PREFACE SECTION - Prakata Budaya & Etnosains */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-rose-950 text-white p-6 sm:p-10 shadow-xl border border-blue-800/60">
        {/* Subtle Background Graphic Rings */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/80 border border-rose-500/40 text-rose-200 text-xs font-bold tracking-wider uppercase">
            <span>☸</span>
            <span>Kitab Primbon Betaljemur Adammakna Modern</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Membuka Tabir Harmoni Kosmos Jawa di Era Digital
          </h1>

          {/* Prakata Filosofis & Etnosains */}
          <div className="text-xs sm:text-sm text-blue-100/90 leading-relaxed space-y-3 font-normal">
            <p>
              <em>Rahayu Sagung Dumadi.</em> Tradisi perhitungan <strong>Petung Jawa</strong> bukanlah mitos atau takhayul buta (<em>gugon tuhon</em>), melainkan kristalisasi <strong>etnosains empiris</strong> warisan para leluhur berabad-abad yang dicatat secara agung dalam <em>Serat Centhini</em> dan <em>Kitab Primbon Betaljemur Adammakna</em> karya Kanjeng Pangeran Harya Tjakraningrat.
            </p>
            <p>
              <strong>WETON JOWO</strong> mentransformasikan perhitungan siklus 35 hari (<em>dina & pasaran</em>), 30 wuku, dan pranata mangsa menjadi algoritma komputasi modern yang objektif. Kami hadir membantu Anda menemukan hari pernikahan terbaik, mengharmoniskan perjodohan, menentukan arah boyongan rumah, serta <strong>memproteksi hajat keluarga dari benturan hari pantangan & geblak leluhur</strong>.
            </p>
            <p className="bg-blue-900/40 border border-blue-400/30 p-3 rounded-2xl text-[11px] sm:text-xs text-blue-200 leading-relaxed">
              <strong className="text-amber-300">Maklumat Utama:</strong> Segala isi dan perhitungan di dalam aplikasi ini semata-mata bersifat <strong>INFORMATIF</strong> sebagai wawasan khazanah kebudayaan Nusantara. <strong>Bukan hal yang harus atau wajib dipercayai</strong>, melainkan cukup untuk diketahui dan dipelajari sebagai bahan wawasan dan kehati-hatian (<em>eling lan waspada</em>).
            </p>
          </div>

          {/* Status Login / Quick Action */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {isLoggedIn ? (
              <div className="flex flex-wrap items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>
                  Masuk sebagai: <strong>{user?.nama}</strong> ({user?.email})
                </span>
                <button
                  onClick={() => handleOpenModule('nikah')}
                  className="bg-rose-800 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <span>Mulai Hitung Hari</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-5 py-3 bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-600 hover:to-rose-800 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login dengan Gmail Pribadi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDonationModalOpen(true)}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-2xl border border-white/20 transition flex items-center gap-1.5"
                >
                  <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
                  <span>Dukung via DANA</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MAKLUMAT RESMI & DISCLAIMER INFORMATIF SISTEM */}
      <section className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300/80 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4 text-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full inline-block mb-0.5 border border-amber-300">
              Prakata & Maklumat Keilmuan
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Sifat Sistem: Murni Informatif & Khazanah Wawasan Budaya
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1 text-xs">
          <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 space-y-1.5 shadow-2xs">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>1. Bersifat Informatif & Edukasi</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
              Seluruh kalkulator weton, perhitungan neptu, watak wuku, salaki-rabi, naga dina, dan wirid disajikan murni sebagai media literasi kebudayaan dan dokumentasi etnosains warisan leluhur nusantara.
            </p>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 space-y-1.5 shadow-2xs">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              <span>2. Bukan Kewajiban Mempercayai</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
              Apa yang ada di dalam sistem ini <strong>bukanlah hal yang wajib/harus dipercayai</strong>. Pengguna <strong>cukup mengetahui saja</strong> sebagai khazanah pengetahuan tradisi tanpa menjadikannya doktrin mutlak.
            </p>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 space-y-1.5 shadow-2xs">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>3. Tawakkal & Ikhtiar Nyata</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
              Segala urusan rezeki, jodoh, umur, dan keselamatan hakikatnya mutlak di bawah kuasa Tuhan Yang Maha Esa (Allah SWT). Petung diposisikan sebagai ikhtiar kehati-hatian budi pekerti (<em>eling lan waspada</em>).
            </p>
          </div>
        </div>
      </section>

      {/* RAMALAN HARIAN WETON & PAWUKON CARD */}
      <RamalanHarianWetonCard onNavigateToModule={onNavigateToModule} />

      {/* 2. POJOK WEJANGAN & PITUTUR LUHUR HARIAN */}
      <section className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white rounded-3xl p-5 sm:p-7 border border-amber-500/40 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold border border-amber-400/30">
              <Quote className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                Pojok Falsafah Nusantara
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Wejangan & Pitutur Luhur Kejawen
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-300/80 bg-amber-900/40 px-3 py-1 rounded-full border border-amber-500/30 font-medium">
              Kategori: {currentPitutur.kategori}
            </span>
            <button
              onClick={handleNextPitutur}
              className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 rounded-xl text-xs font-bold border border-amber-500/40 transition flex items-center gap-1.5"
              title="Ganti wejangan berikutnya"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ganti Pitutur</span>
            </button>
          </div>
        </div>

        <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="text-amber-400 text-lg sm:text-xl font-bold font-serif italic tracking-wide">
              &ldquo;{currentPitutur.teksJawa}&rdquo;
            </div>
            <div className="text-xs text-amber-200/90 font-mono tracking-wider bg-black/30 p-2 rounded-xl border border-amber-500/20 inline-block">
              Aksara: {currentPitutur.aksaraJawa}
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              <strong>Artinya:</strong> &ldquo;{currentPitutur.artiIndonesia}&rdquo;
            </p>
            <p className="text-xs text-slate-300/90 leading-relaxed pt-1">
              <em>Makna Filosofis:</em> {currentPitutur.filosofi}
            </p>
            <div className="text-[11px] text-amber-400/80 pt-1 flex items-center gap-1 font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Rujukan: {currentPitutur.sumber}</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2 justify-center">
            <button
              onClick={handleCopyPitutur}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow transition flex items-center justify-center gap-2"
            >
              {copiedPitutur ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedPitutur ? 'Wejangan Tersalin!' : 'Salin Mutiara Kata'}</span>
            </button>
            <button
              onClick={() => handleOpenModule('wuku')}
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-2xl border border-slate-700 transition flex items-center justify-center gap-2"
            >
              <BookMarked className="w-4 h-4 text-amber-400" />
              <span>Pelajari 30 Serat Wuku</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE QUICK DEMO & SHARE: Cek Cepat Weton Pribadi */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Kalkulator Weton Instan & Akurat</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              Cek Weton, Neptu, Wuku & Karakter Kelahiran Anda
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih tanggal kelahiran Anda di bawah untuk mendapatkan komputasi matematis neptu secara instan:
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
            <label className="text-xs font-bold text-slate-700 pl-1">Tanggal Lahir:</label>
            <input
              type="date"
              value={demoDate}
              onChange={(e) => setDemoDate(e.target.value)}
              className="text-xs sm:text-sm px-3 py-1.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none font-bold text-slate-900"
            />
          </div>
        </div>

        {/* Dynamic Card Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white space-y-3 relative overflow-hidden">
            <div className="text-[11px] font-bold text-blue-300 uppercase tracking-wider flex items-center justify-between">
              <span>Weton Kelahiran</span>
              <span className="px-2 py-0.5 bg-blue-800/80 rounded-full text-[10px] text-blue-100 font-black">
                Neptu {demoWeton.neptuTotal}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {demoWeton.hari} {demoWeton.pasaran}
            </div>
            <div className="text-xs text-blue-200/90 leading-relaxed">
              Hari <strong>{demoWeton.hari}</strong> (Neptu {demoWeton.neptuHari}) + Pasaran <strong>{demoWeton.pasaran}</strong> (Neptu {demoWeton.neptuPasaran})
            </div>
            <div className="pt-1 flex flex-wrap gap-1.5 text-[10px]">
              <span className="px-2.5 py-1 bg-white/10 rounded-xl border border-white/20 font-semibold">
                Siklus 35 Dina
              </span>
              <span className="px-2.5 py-1 bg-amber-400/20 text-amber-300 rounded-xl border border-amber-400/30 font-semibold">
                Unsur Alam Otentik
              </span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Wuku & Watak Batin</span>
                <span className="text-amber-800 font-black text-[11px]">Wuku ke-{demoWeton.wukuIndex + 1}</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                Wuku {demoWeton.wuku}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Dinaungi watak lahir <em>&ldquo;{demoWeton.watak}&rdquo;</em>. Memiliki potensi kepemimpinan teduh, ketekunan bekerja, dan kepekaan sosial tinggi.
              </p>
            </div>
            
            {/* Action Share / Copy */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleCopyWetonResult}
                className="flex-1 py-2 px-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                title="Salin hasil petung ringkas"
              >
                {copiedWeton ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedWeton ? 'Tersalin!' : 'Salin Hasil'}</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                title="Bagikan ke WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-rose-50/80 border border-rose-200/90 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-[11px] font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-700" />
                <span>Proteksi Silsilah & Hari Baik</span>
              </div>
              <h3 className="text-sm font-black text-rose-950 mt-1">
                Lanjutkan ke Petung Jodoh & Nikah
              </h3>
              <p className="text-xs text-rose-900/90 mt-1 leading-relaxed">
                Ingin mencocokkan weton ini dengan pasangan, mencari tanggal ijab kabul bebas dari naas geblak orang tua, atau arah rezeki harian?
              </p>
            </div>

            <button
              onClick={() => handleOpenModule('nikah')}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-rose-900 to-rose-800 hover:from-rose-800 hover:to-rose-700 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{isLoggedIn ? 'Buka Modul Ijab Kabul' : 'Login Gmail untuk Akses Lengkap'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. PANDUAN 4 LANGKAH PRAKTIS MEMULAI (Quick Start Onboarding) */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
            Panduan Penggunaan
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            4 Langkah Mudah Menentukan Hari Berkah
          </h2>
          <p className="text-xs text-slate-400">
            Alur praktis merencanakan hajat pernikahan, perjodohan, dan boyongan rumah secara aman.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2 relative">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              01
            </div>
            <h3 className="font-bold text-sm text-white">Ketahui Weton Lahir</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cari tahu hari dan pasaran kedua calon mempelai beserta orang tua untuk menghitung nilai neptu dasar.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2 relative">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white font-black text-xs flex items-center justify-center">
              02
            </div>
            <h3 className="font-bold text-sm text-white">Cek Salaki-Rabi 8 Petung</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Analisis dimensi kecocokan karakter (Ratu, Jodoh, Tinari, Pesthi) serta solusi mitigasi bila ada pantangan.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2 relative">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black text-xs flex items-center justify-center">
              03
            </div>
            <h3 className="font-bold text-sm text-white">Daftarkan Hari Pantangan</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Masukkan tanggal geblak wafat orang tua dan kakek-nenek agar sistem memfilter hari naas secara otomatis.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2 relative">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
              04
            </div>
            <h3 className="font-bold text-sm text-white">Pilih Tanggal Akad Berkah</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pilih tanggal terbaik berstatus hijau aman, cetak Piagam Petung, atau simpan ke Catatan Keluarga.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FITUR-FITUR UNGGULAN APLIKASI (Why Use WETON JOWO SaaS) */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs uppercase font-extrabold tracking-widest text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-200">
            Sembilan Pilar Etnosains
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Fitur Lengkap Komputasi & Solusi Budaya Jawa
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Dirancang secara mendalam agar setiap keluarga Indonesia dapat melangsungkan hajat dengan tenang, aman dari benturan adat, dan berlandaskan naskah klasik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Fitur Unggulan: Kalender Abadi Jawa Tri-Sistem */}
          <div
            onClick={() => handleOpenModule('kalender')}
            className="cursor-pointer group p-5 bg-gradient-to-br from-blue-600/15 via-indigo-900/10 to-transparent hover:bg-blue-100/50 rounded-3xl border-2 border-blue-500/50 hover:border-blue-600 transition-all duration-200 shadow-sm space-y-3 relative"
          >
            <span className="absolute top-4 right-4 text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-blue-600 text-white">
              Tri-Sistem
            </span>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-800 text-white flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform shadow-xs">
              📅
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-900 transition-colors">
                Kalender Abadi Jawa
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Visualisasi interaktif satu bulan penuh memadukan 3 penanggalan: Masehi (Gregorian), Hijriah (Kamariah), dan Jawa (Sultan Agungan) lengkap dengan hari pasaran, hari libur nasional, wuku, serta fase purnama.
              </p>
            </div>
            <div className="text-xs font-bold text-blue-800 flex items-center gap-1 pt-1">
              <span>Buka Kalender Abadi</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fitur Baru: 30 Wuku Pawukon */}
          <div
            onClick={() => handleOpenModule('wuku')}
            className="cursor-pointer group p-5 bg-gradient-to-br from-amber-600/10 via-rose-600/5 to-transparent hover:bg-amber-100/50 rounded-3xl border-2 border-amber-400 hover:border-amber-600 transition-all duration-200 shadow-sm space-y-3 relative"
          >
            <span className="absolute top-4 right-4 text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
              30 Wuku
            </span>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-rose-700 text-white flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              📜
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-900 transition-colors">
                Kalkulator 30 Wuku Pawukon
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Karakteristik & watak lahir berdasarkan siklus 210 hari Pawukon menurut teks asli Betaljemur Adammakna (Bethara, Kayu, Burung, Gedhong, Senjata, Candran, & Hari Taliwangke).
              </p>
            </div>
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1 pt-1">
              <span>Buka Serat 30 Wuku</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fitur Baru: Naga Dina & Arah Rejeki */}
          <div
            onClick={() => handleOpenModule('nagadina')}
            className="cursor-pointer group p-5 bg-gradient-to-br from-amber-500/15 via-slate-900/5 to-transparent hover:bg-amber-100/50 rounded-3xl border-2 border-amber-500/50 hover:border-amber-600 transition-all duration-200 shadow-sm space-y-3 relative"
          >
            <span className="absolute top-4 right-4 text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">
              8 Arah
            </span>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform shadow-xs">
              🧭
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-900 transition-colors">
                Naga Dina & Arah Rejeki
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Komputasi posisi arah keberuntungan berdasar neptu hari berjalan, disesuaikan aturan Naga Dina (Cangkem Naga & Niti Geger), jam berkah harian, serta panduan ikhtiar perniagaan.
              </p>
            </div>
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1 pt-1">
              <span>Buka Kompas Naga Dina</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fitur Baru: Hukum Islam & Hadits Nabi */}
          <div
            onClick={() => handleOpenModule('islam')}
            className="cursor-pointer group p-5 bg-gradient-to-br from-emerald-600/10 via-teal-500/5 to-transparent hover:bg-emerald-100/50 rounded-3xl border-2 border-emerald-300 hover:border-emerald-500 transition-all duration-200 shadow-sm space-y-3 relative"
          >
            <span className="absolute top-4 right-4 text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-emerald-800 text-white">
              Hadits Nabi
            </span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              ⚖️
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-900 transition-colors">
                Hukum Islam, Hadits Nabi & Kaidah Fiqih
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Harmonisasi syariat Islam & etnosains Jawa: 5 Kaidah Fiqhiyyah Asasi, Hadits Tafa'ul vs Thiyarah, Sintesis Kalender Sultan Agung 1633 M, amalan penolak bala, & self-check akidah.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-800 flex items-center gap-1 pt-1">
              <span>Buka Modul Hukum Islam & Hadits</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fitur Baru 1: Pal Srigati */}
          <div
            onClick={() => handleOpenModule('rejeki')}
            className="cursor-pointer group p-5 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent hover:bg-amber-100/50 rounded-3xl border-2 border-amber-300 hover:border-amber-500 transition-all duration-200 shadow-sm space-y-3 relative"
          >
            <span className="absolute top-4 right-4 text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
              Betaljemur
            </span>
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              📈
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-900 transition-colors">
                Pal Srigati & Pasang Surut Rezeki
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Kalkulator siklus fluktuasi rezeki 6 tahunan (skala 0–9), Pancasuda Rezeki, Pangarasan, serta kompas penunjuk arah mata angin rezeki harian dan Naga Dina.
              </p>
            </div>
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1 pt-1">
              <span>Buka Modul Pal Srigati</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fitur Baru 2: Jayabaya */}
          <div
            onClick={() => handleOpenModule('jayabaya')}
            className="cursor-pointer group p-5 bg-gradient-to-br from-amber-600/10 via-rose-500/5 to-transparent hover:bg-rose-100/50 rounded-3xl border-2 border-amber-300 hover:border-rose-400 transition-all duration-200 shadow-sm space-y-3 relative"
          >
            <span className="absolute top-4 right-4 text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">
              Joyoboyo
            </span>
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              👑
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-900 transition-colors">
                7 Satriya Jayabaya & Siklus Zaman
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Kolaborasi Jangka Jayabaya & weton kraton untuk menyingkap watak kepemimpinan luhur Nusantara, serta orientasi zaman Kalatidha (zaman edan) menuju Kalasuba.
              </p>
            </div>
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1 pt-1">
              <span>Buka Modul Jangka Jayabaya</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fitur Baru 3: Ruwatan Sukerta */}
          <div
            onClick={() => handleOpenModule('ruwatan')}
            className="cursor-pointer group p-5 bg-gradient-to-br from-rose-500/10 via-slate-500/5 to-transparent hover:bg-rose-100/50 rounded-3xl border-2 border-rose-300 hover:border-rose-500 transition-all duration-200 shadow-sm space-y-3 relative"
          >
            <span className="absolute top-4 right-4 text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-rose-900 text-white">
              Lukmanakim
            </span>
            <div className="w-12 h-12 rounded-2xl bg-rose-800 text-white flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              🛡️
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-rose-900 transition-colors">
                Deteksi Sukerta & Tata Ruwatan
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Kalkulator silsilah saudara kandung (Ontang-anting, Uger-uger Lawang, Gedhana-Gedhini, Pandhawa), filosofi tolak bala Batara Kala, & ubarampe sesaji adat.
              </p>
            </div>
            <div className="text-xs font-bold text-rose-800 flex items-center gap-1 pt-1">
              <span>Buka Modul Ruwatan Sukerta</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fitur 1: Ijab Kabul */}
          <div
            onClick={() => handleOpenModule('nikah')}
            className="cursor-pointer group p-5 bg-white hover:bg-rose-50/40 rounded-3xl border border-slate-200 hover:border-rose-300 transition-all duration-200 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-900 flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              💍
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-rose-900 transition-colors">
                Kalkulator Ijab Kabul & Pernikahan
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Menemukan tanggal akad nikah terbaik dengan eliminasi otomatis hari naas, taliwangke, samparwangke, dan dina sangar berdasar neptu pasangan.
              </p>
            </div>
            <div className="text-xs font-bold text-rose-800 flex items-center gap-1 pt-1">
              <span>Buka Modul Nikah</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fitur 2: Salaki-Rabi */}
          <div
            onClick={() => handleOpenModule('jodoh')}
            className="cursor-pointer group p-5 bg-white hover:bg-blue-50/40 rounded-3xl border border-slate-200 hover:border-blue-300 transition-all duration-200 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              ⚖️
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-900 transition-colors">
                8 Petung Salaki-Rabi Komprehensif
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Analisis kecocokan pasangan dari 8 dimensi: Pegat, Ratu, Jodoh, Topo, Tinari, Padu, Sujanan, Pesthi lengkap dengan mitigasi adat jika ada benturan.
              </p>
            </div>
            <div className="text-xs font-bold text-blue-800 flex items-center gap-1 pt-1">
              <span>Buka Analisis Jodoh</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fitur 3: Proteksi Weton Pantangan Multi-Hari (The Core Innovation) */}
          <div
            onClick={() => handleOpenModule('pantangan')}
            className="cursor-pointer group p-5 bg-gradient-to-br from-rose-900/10 to-amber-900/5 hover:from-rose-900/20 rounded-3xl border-2 border-rose-300 hover:border-rose-500 transition-all duration-200 shadow-sm space-y-3 relative"
          >
            <span className="absolute top-4 right-4 text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-rose-900 text-white">
              Etnosains
            </span>
            <div className="w-12 h-12 rounded-2xl bg-rose-900 text-white flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              🛡️
            </div>
            <div>
              <h3 className="font-extrabold text-base text-rose-950">
                Proteksi Weton Pantangan Multi-Hari
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Daftarkan banyak hari geblak orang tua, naas leluhur, & pantangan selawe (25). Sistem otomatis menyaring seluruh tanggal hajat agar bebas dari benturan.
              </p>
            </div>
            <div className="text-xs font-bold text-rose-900 flex items-center gap-1 pt-1">
              <span>Kelola Daftar Pantangan</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fitur 4: Boyongan Wisma & Daur Hidup */}
          <div
            onClick={() => handleOpenModule('hajat')}
            className="cursor-pointer group p-5 bg-white hover:bg-slate-50 rounded-3xl border border-slate-200 hover:border-slate-400 transition-all duration-200 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              🏡
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Boyongan Wisma & Hajat Daur Hidup
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Pedoman pindah rumah (Guru, Ratu, Rogoh, Sempoyong), estimasi upacara Tingkepan 7 bulanan, Tedak Siten 7 lapan bayi, & jadwal sedekah wetonan 35 hari.
              </p>
            </div>
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1 pt-1">
              <span>Buka Modul Hajat</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fitur 5: Ensiklopedia Firasat */}
          <div
            onClick={() => handleOpenModule('firasat')}
            className="cursor-pointer group p-5 bg-white hover:bg-emerald-50/40 rounded-3xl border border-slate-200 hover:border-emerald-300 transition-all duration-200 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              👁️
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-900 transition-colors">
                Ensiklopedia Firasat & Kramadana
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Kamus lengkap firasat getaran kedutan tubuh dari kepala hingga kaki, serta tafsir ekologis fenomena alam (gerhana, lindhu, & komet) dari sudut etnosains.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-800 flex items-center gap-1 pt-1">
              <span>Eksplorasi Firasat</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fitur 6: Pranata Mangsa & Kosmologi Musim Jawa */}
          <div
            onClick={() => handleOpenModule('hajat')}
            className="cursor-pointer group p-5 bg-white hover:bg-amber-50/40 rounded-3xl border border-slate-200 hover:border-amber-300 transition-all duration-200 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              🌾
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-900 transition-colors">
                Pranata Mangsa & Kosmologi Alam
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                12 siklus musim Jawa (Kasa hingga Sadha) untuk membaca peredaran matahari, arah angin, orientasi waktu, dan kearifan agraris nenek moyang nusantara.
              </p>
            </div>
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1 pt-1">
              <span>Buka Siklus Musim</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ INTERAKTIF EDUKATIF (Pusat Pengetahuan Petung Jawa) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center font-bold">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Tanya Jawab & Penjelasan Etnosains Petung Jawa
            </h2>
            <p className="text-xs text-slate-500">
              Jawaban terperinci berlandaskan naskah klasik Kraton dan prinsip ngelmu titen.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {DAFTAR_FAQ_PETUNG.map((faq) => {
            const isOpen = activeFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 text-[10px] font-bold shrink-0">
                      {faq.kategori}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {faq.pertanyaan}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-rose-800' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-rose-200/50 space-y-2">
                    <p>{faq.jawaban}</p>
                    <div className="text-[11px] font-semibold text-rose-900 flex items-center gap-1.5 pt-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Rujukan: {faq.rujukanKitab}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. DAFTAR RUJUKAN KITAB KLASIK KRATON NUSANTARA */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-800/80 shadow-md space-y-4">
        <div className="flex items-center gap-2 border-b border-blue-800/60 pb-3">
          <Award className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Landasan Rujukan Naskah & Serat Klasik Kraton
            </h3>
            <p className="text-xs text-blue-200">
              Disusun secara saintifik dan berpegang teguh pada naskah otoritatif para pujangga Jawa.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-blue-900/30 p-3.5 rounded-2xl border border-blue-700/50 space-y-1">
            <strong className="text-amber-300 font-bold block">1. Betaljemur Adammakna</strong>
            <span className="text-[11px] text-blue-200 block">KPH Tjakraningrat (Ngayogyakarta)</span>
            <p className="text-[10px] text-slate-300 pt-1">Kanon utama sistem 30 wuku, neptu salaki-rabi, naas sangar, & kramadana.</p>
          </div>

          <div className="bg-blue-900/30 p-3.5 rounded-2xl border border-blue-700/50 space-y-1">
            <strong className="text-amber-300 font-bold block">2. Serat Centhini</strong>
            <span className="text-[11px] text-blue-200 block">Pakubuwana V & Tim Pujangga (1814)</span>
            <p className="text-[10px] text-slate-300 pt-1">Ensiklopedia kebudayaan, tata cara ruwatan, kosmologi, dan etika adat Jawa.</p>
          </div>

          <div className="bg-blue-900/30 p-3.5 rounded-2xl border border-blue-700/50 space-y-1">
            <strong className="text-amber-300 font-bold block">3. Serat Wedhatama</strong>
            <span className="text-[11px] text-blue-200 block">KGPAA Mangkunegara IV (Surakarta)</span>
            <p className="text-[10px] text-slate-300 pt-1">Ajaran budi pekerti luhur, pengendalian diri, dan harmoni jagad gedhe-cilik.</p>
          </div>

          <div className="bg-blue-900/30 p-3.5 rounded-2xl border border-blue-700/50 space-y-1">
            <strong className="text-amber-300 font-bold block">4. Serat Wulangreh</strong>
            <span className="text-[11px] text-blue-200 block">Sri Susuhunan Pakubuwana IV</span>
            <p className="text-[10px] text-slate-300 pt-1">Pedoman tata krama, etika kepemimpinan, dan kesadaran spiritual manusia.</p>
          </div>
        </div>
      </section>

      {/* KHUSUS ADMINISTRATOR: Panel Arsitektur GAS & Database (Hanya Tampil untuk Admin) */}
      {isAdmin && (
        <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-amber-500/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                  Panel Administrator
                </span>
                <span className="text-xs text-amber-300 font-medium">
                  (Khusus Akun Admin: {user?.email})
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Arsitektur Google Apps Script & Skema Database
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Akses rancangan database 4 tabel Spreadsheet, source code backend Code.gs, Index.html, dan panduan deployment mandiri.
              </p>
            </div>
            <button
              onClick={() => handleOpenModule('gas')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-2 shrink-0"
            >
              <FileCode2 className="w-4 h-4" />
              <span>Buka Panel Arsitektur GAS</span>
            </button>
          </div>
        </section>
      )}

      {/* 8. HIMBAUAN DONASI KE E-WALLET DANA (Resmi & Terintegrasi) */}
      <section className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border-2 border-blue-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#118EEA] text-white text-xs font-black">
              <Wallet className="w-3.5 h-3.5" />
              <span>Himbauan Tali Asih & Donasi E-Wallet DANA</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Dukung Pelestarian Sains & Budaya Jawa Nusantara
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Aplikasi ini dikembangkan dengan dedikasi untuk menjaga keotentikan naskah kuno nusantara. Anda dapat memberikan donasi sukarela (tali asih) guna biaya operasional server dan riset etnosains ke alamat e-wallet <strong>DANA</strong> kami:
            </p>

            {/* Nomor DANA Highlight */}
            <div className="p-3 bg-white rounded-2xl border border-blue-300 shadow-sm flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] text-slate-400 font-semibold">Nomor E-Wallet DANA Resmi:</div>
                <div className="text-base sm:text-lg font-black text-slate-900 tracking-wider">
                  {danaNumberFormatted}
                </div>
                <div className="text-xs text-blue-700 font-medium">
                  a.n. <strong>Dinda Fomo (WETON JOWO)</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyDana}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  copiedDana
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#118EEA] hover:bg-[#0E71BC] text-white'
                }`}
              >
                {copiedDana ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin No. DANA</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-blue-200 shadow-sm text-center shrink-0 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#118EEA]/10 text-[#118EEA] flex items-center justify-center font-black text-2xl">
              D
            </div>
            <div className="text-xs font-bold text-slate-800">
              Konfirmasi Tali Asih DANA
            </div>
            <p className="text-[11px] text-slate-500 max-w-[200px]">
              Kirimkan donasi sukarela mulai dari Rp 10.000 untuk keberkahan bersama.
            </p>
            <button
              onClick={() => setIsDonationModalOpen(true)}
              className="w-full py-2 px-4 bg-[#118EEA] hover:bg-[#0E71BC] text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Buka Panduan Donasi</span>
            </button>
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION BOTTOM */}
      <section className="text-center p-8 bg-gradient-to-r from-rose-950 to-blue-950 rounded-3xl text-white space-y-3 shadow-lg">
        <h3 className="text-xl sm:text-2xl font-black">
          Siap Merencanakan Hari Bahagia & Keberkahan Keluarga?
        </h3>
        <p className="text-xs sm:text-sm text-rose-100/90 max-w-lg mx-auto leading-relaxed">
          Masuk dengan akun Gmail Anda sekarang untuk langsung mengakses seluruh modul perhitungan hari baik dan sistem proteksi silsilah.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => handleOpenModule('nikah')}
            className="px-6 py-3 bg-white text-rose-950 font-black text-xs sm:text-sm rounded-2xl shadow-md hover:bg-rose-50 transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Masuk & Eksplorasi Sekarang</span>
            <ArrowRight className="w-4 h-4 text-rose-900" />
          </button>
        </div>
      </section>
    </div>
  );
};

