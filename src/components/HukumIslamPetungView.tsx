import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  Heart,
  Scale,
  Compass,
  CheckCircle2,
  Copy,
  Check,
  Printer,
  FileText,
  HelpCircle,
  AlertCircle,
  Share2,
  ChevronRight,
  Sun,
  Moon,
  Calendar,
  Layers,
  ArrowRight,
  Bookmark,
  Utensils,
  ShieldAlert,
  Users,
  Coffee,
  ListChecks,
  Info
} from 'lucide-react';
import {
  DAFTAR_KAIDAH_FIQHIYYAH,
  DAFTAR_HADITS_PETUNG,
  DAFTAR_FATWA_ULAMA,
  DAFTAR_AMALAN_ISLAMI,
  DAFTAR_PERBANDINGAN_SLAMETAN,
  DAFTAR_JENIS_SLAMETAN_MODERAT,
  HaditsNabiItem,
  KaidahFiqihItem,
  PerbandinganSlametanItem,
  JenisSlametanModeratItem
} from '../data/islamicPetungData';
import { downloadTextFile } from '../utils/printExportUtils';

interface HukumIslamPetungViewProps {
  onNavigateToJodoh?: () => void;
  onNavigateToNagaDina?: () => void;
}

export const HukumIslamPetungView: React.FC<HukumIslamPetungViewProps> = ({
  onNavigateToJodoh,
  onNavigateToNagaDina,
}) => {
  const [activeTab, setActiveTab] = useState<'kaidah' | 'hadits' | 'slametan' | 'fatwa' | 'amalan' | 'self-check'>('slametan');
  const [selectedTema, setSelectedTema] = useState<string>('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sub-tabs inside Slametan Fikih View
  const [slametanSubTab, setSlametanSubTab] = useState<'matriks' | 'jenis' | 'rambu' | 'panduan'>('matriks');
  const [selectedJenisId, setSelectedJenisId] = useState<string>('jenis-1');

  // Self-Check Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const temaList = ['Semua', 'Tafaul vs Thiyarah', 'Ikhtiar & Takdir', 'Pernikahan & Kafaah', 'Rezeki & Waktu Berkah', 'Sedekah Tolak Bala', 'Istikharah & Doa'];

  const filteredHadits = selectedTema === 'Semua'
    ? DAFTAR_HADITS_PETUNG
    : DAFTAR_HADITS_PETUNG.filter((h) => h.tema === selectedTema);

  // Self-Check questions
  const quizQuestions = [
    {
      id: 1,
      pertanyaan: "Bagaimanakah Anda memandang hasil perhitungan weton atau hari naas?",
      options: [
        { text: "Sebagai penentu takdir mutlak yang pasti terjadi tanpa bisa diubah.", value: "danger", score: 0 },
        { text: "Sebagai bahan ikhtiar rasional, pemetaan watak, dan mitigasi kehati-hatian sementara hasil akhir mutlak milik Allah SWT.", value: "correct", score: 100 },
        { text: "Hanya sekadar angka mistik yang membuat saya cemas dan takut melangkah.", value: "warning", score: 30 }
      ]
    },
    {
      id: 2,
      pertanyaan: "Bila hasil petung jodoh menunjukkan dinamika watak yang menantang (misal: Padu atau Sujanan), apa tindakan Anda?",
      options: [
        { text: "Langsung membatalkan pernikahan secara sepihak walau pasangan saleh/salehah.", value: "danger", score: 0 },
        { text: "Menjadikannya peringatan untuk lebih saling memahami, memperbanyak istikharah, sedekah, dan memperkuat komitmen agama.", value: "correct", score: 100 },
        { text: "Menyerah pada nasib dan pasrah tanpa ikhtiar perbaikan komunikasi.", value: "warning", score: 40 }
      ]
    },
    {
      id: 3,
      pertanyaan: "Apa niat utama Anda saat menyelenggarakan selamatan (kenduri / bancakan) weton?",
      options: [
        { text: "Mengharap perlindungan kepada roh leluhur atau kekuatan selain Allah SWT.", value: "danger", score: 0 },
        { text: "Bersedekah makanan kepada sesama, bersyukur atas nikmat umur, dan mendoakan keselamatan kepada Allah SWT.", value: "correct", score: 100 },
        { text: "Hanya menggugurkan kewajiban adat tanpa memahami esensi ibadahnya.", value: "warning", score: 50 }
      ]
    }
  ];

  const handleSelectQuiz = (qId: number, val: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const getQuizResult = () => {
    const totalSelected = Object.keys(quizAnswers).length;
    if (totalSelected < 3) return null;
    const hasDanger = Object.values(quizAnswers).includes('danger');
    const allCorrect = Object.values(quizAnswers).every(v => v === 'correct');

    if (allCorrect) {
      return {
        status: 'selaras',
        title: 'Akidah Lurus & Berwawasan Hikmah (Tafa\'ul Shahih)',
        desc: 'Pemahaman Anda selaras dengan kaidah ulama Nusantara dan hadits Nabi SAW. Anda memposisikan petung sebagai ikhtiar lahiriah dan etnosains sosial, dengan tauhid yang kokoh kepada Allah SWT.',
        color: 'emerald'
      };
    } else if (hasDanger) {
      return {
        status: 'koreksi',
        title: 'Perlu Pelurusan Niat & Pemurnian Tauhid (Ihtiyath Aqidah)',
        desc: 'Hindari meyakini bahwa hari atau angka memiliki kekuatan mandiri (tathayyur). Jadikan keimanan kepada takdir Allah sebagai pondasi utama, dan gunakan petung hanya sebatas pertimbangan manajerial.',
        color: 'rose'
      };
    } else {
      return {
        status: 'waspada',
        title: 'Cukup Baik, Perkuat Sandaran Tawakkal',
        desc: 'Niat Anda telah mengarah pada kebaikan. Perbanyak amalan istikharah dan sedekah subuh agar hati senantiasa tenang dan tidak terbebani rasa was-was.',
        color: 'amber'
      };
    }
  };

  const quizResult = getQuizResult();

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-5xl mx-auto printable-area">
      {/* Hero Banner Islami */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-500/30">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            <span>Harmonisasi Syariat Islam & Etnosains Budaya Jawa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-100 tracking-tight">
            Kaidah Hukum Islam, Hadits Nabi, & Falsafah Petung
          </h1>
          <p className="text-sm sm:text-base text-emerald-200/90 max-w-3xl leading-relaxed">
            Menelusuri sintesis kalender Sultan Agung (1633 M), 5 Kaidah Asasi Fiqhiyyah, serta sabda-sabda Rasulullah ﷺ yang menempatkan tradisi perhitungan waktu sebagai ikhtiar ilmiah (Tafa'ul) dan bukan prasangka sial (Thiyarah).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-emerald-300">
            <span className="flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1.5 rounded-xl border border-emerald-700/50">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Berdasar Hadits Shahih Bukhari, Muslim & Tirmidzi
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1.5 rounded-xl border border-emerald-700/50">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              Al-Qawa'id Al-Fiqhiyyah Al-Khams
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1.5 rounded-xl border border-emerald-700/50">
              <Moon className="w-3.5 h-3.5 text-emerald-400" />
              Fatwa Ulama Nusantara & Sintesis Mataram Islam
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('slametan')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'slametan'
              ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Utensils className="w-4 h-4 text-emerald-400" />
          <span>Fikih Slametan & Tasyakuran (Wasathiyah)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('kaidah')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'kaidah'
              ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>5 Kaidah Fiqhiyyah Asasi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hadits')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'hadits'
              ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Hadits Nabi & Kontekstualisasi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('fatwa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'fatwa'
              ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Moon className="w-4 h-4" />
          <span>Fatwa Ulama & Sejarah Kalender</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('amalan')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'amalan'
              ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Doa & Amalan Penolak Bala</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('self-check')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'self-check'
              ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Uji Keselarasan Niat (Self-Check)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB UTAMA: PERBANDINGAN FIKIH SLAMETAN / TASYAKURAN (WASATHIYAH) */}
      {/* ========================================================================= */}
      {activeTab === 'slametan' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Konsep Wasathiyah & Akomodasi Budaya */}
          <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white p-6 rounded-3xl border border-emerald-500/40 shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold border border-emerald-400/30">
                  <Utensils className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    Kajian Fikih Wasathiyah & Etnosains Nusantara
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-emerald-100">
                    Dialektika Slametan: Tradisi Budaya yang Diakomodasi Syariat
                  </h3>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-400/40 w-fit">
                Kaidah: Al-'Adatu Muhakkamah
              </span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-serif">
              Dalam kacamata <strong>Fiqih Moderat (Wasathiyah)</strong> dan metode dakwah Walisongo, tradisi <em>Slametan / Kenduri</em> dipandang bukan sebagai musuh akidah, melainkan wadah sosiokultural yang <strong>dipurifikasi substansinya</strong>: dari pemujaan entitas gaib menjadi majelis dzikir, sedekah makanan (<em>ith'amuth tha'am</em>), silaturahmi warga, dan doa tasyakkur kepada Allah SWT semata.
            </p>

            <div className="p-3 bg-emerald-950/80 rounded-2xl border border-emerald-700/60 text-xs text-emerald-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                <strong>Kaidah Ulama Nusantara:</strong> <em>"Al-Muhafazhatu 'alal qadimis shalih wal akhdzu bil jadidil ashlah"</em> (Memelihara tradisi lama yang baik dan mengadopsi tradisi baru yang lebih maslahat).
              </p>
            </div>
          </div>

          {/* Sub-Navigasi Fitur Slametan */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
            <button
              type="button"
              onClick={() => setSlametanSubTab('matriks')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                slametanSubTab === 'matriks'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>1. Matriks Komparasi Fikih (5 Aspek)</span>
            </button>

            <button
              type="button"
              onClick={() => setSlametanSubTab('jenis')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                slametanSubTab === 'jenis'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. Bedah 5 Hajat Slametan & Ubarampe</span>
            </button>

            <button
              type="button"
              onClick={() => setSlametanSubTab('rambu')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                slametanSubTab === 'rambu'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>3. Rambu Syariat (Do & Don't)</span>
            </button>

            <button
              type="button"
              onClick={() => setSlametanSubTab('panduan')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                slametanSubTab === 'panduan'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ListChecks className="w-3.5 h-3.5" />
              <span>4. Tata Cara Slametan Syar'i</span>
            </button>
          </div>

          {/* SUBTAB 1: MATRIKS KOMPARASI FIKIH 5 ASPEK */}
          {slametanSubTab === 'matriks' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 leading-relaxed">
                Tabel perbandingan mendalam antara <strong>konsepsi animisme/mistik pra-Islam</strong> dengan <strong>metamorfosis Fikih Islam Moderat</strong> atas elemen-elemen tradisi kenduri dan slametan:
              </div>

              <div className="grid grid-cols-1 gap-4">
                {DAFTAR_PERBANDINGAN_SLAMETAN.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 hover:border-emerald-300 transition space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-xs">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-base font-black text-slate-900">{item.aspek}</h4>
                          <span className="text-xs text-emerald-800 font-semibold">Simbol: {item.simbolTradisi}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full border border-emerald-300 w-fit">
                        Status: {item.statusHukum}
                      </span>
                    </div>

                    {/* Side by side comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                      <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5">
                        <span className="font-bold text-rose-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                          <span>Pra-Islam & Mistik Kuno (Dipurifikasi)</span>
                        </span>
                        <p className="text-rose-950 leading-relaxed">{item.pandanganPraIslam}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-1.5">
                        <span className="font-bold text-emerald-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Kacamata Fikih Moderat (Diakomodasi)</span>
                        </span>
                        <p className="text-emerald-950 leading-relaxed">{item.kacamataFikihModerat}</p>
                      </div>
                    </div>

                    {/* Hadits & Dalil Rujukan */}
                    <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 border border-slate-700">
                      <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Dalil Shahih: {item.dalilHadits.sumber}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(`"${item.dalilHadits.terjemahan}" (${item.dalilHadits.sumber})`, item.id)}
                          className="hover:text-white transition flex items-center gap-1 text-[11px] text-emerald-400"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Salin Dalil</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="font-serif text-right text-emerald-100 text-sm sm:text-base leading-relaxed">
                        {item.dalilHadits.teksArab}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{item.dalilHadits.terjemahan}"
                      </p>
                    </div>

                    {/* Kaidah & Rekomendasi Purifikasi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                        <strong>Kaidah Fiqhiyyah:</strong> {item.kaidahFiqih}
                      </div>
                      <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-950">
                        <strong>Kunci Purifikasi:</strong> {item.rekomendasiPurifikasi}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB 2: BEDAH 5 HAJAT SLAMETAN & SIMBOLISME UBARAMPE */}
          {slametanSubTab === 'jenis' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Type Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {DAFTAR_JENIS_SLAMETAN_MODERAT.map((jenis) => {
                  const isSelected = selectedJenisId === jenis.id;
                  return (
                    <button
                      key={jenis.id}
                      type="button"
                      onClick={() => setSelectedJenisId(jenis.id)}
                      className={`p-3 rounded-2xl border text-left transition-all space-y-1 ${
                        isSelected
                          ? 'bg-emerald-900 text-white border-emerald-950 shadow-md font-bold'
                          : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wider opacity-80">
                        {jenis.istilahIslami.split(' ')[0]}
                      </div>
                      <div className="text-xs font-extrabold leading-tight">
                        {jenis.namaTradisi.split('(')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Jenis Detail */}
              {(() => {
                const currentJenis = DAFTAR_JENIS_SLAMETAN_MODERAT.find((j) => j.id === selectedJenisId) || DAFTAR_JENIS_SLAMETAN_MODERAT[0];
                return (
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px] uppercase">
                          {currentJenis.istilahIslami}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                          {currentJenis.namaTradisi}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Waktu Pelaksanaan: <strong>{currentJenis.waktuPelaksanaan}</strong>
                        </p>
                      </div>
                      <div className="text-xs bg-emerald-50 text-emerald-950 p-2.5 rounded-xl border border-emerald-200 max-w-sm">
                        <strong>Tujuan Utama:</strong> {currentJenis.tujuanUtama}
                      </div>
                    </div>

                    {/* Reinterpretasi Ubarampe Simbolik */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-emerald-700" />
                        <span>Re-interpretasi Syar'i atas Ubarampe & Hidangan</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {currentJenis.ubarampeSimbolik.map((u, i) => (
                          <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                            <strong className="text-emerald-900 text-xs block">{u.nama}</strong>
                            <p className="text-[11px] text-slate-500">
                              <em>Makna Asal:</em> {u.maknaBudaya}
                            </p>
                            <p className="text-emerald-950 font-medium pt-1 border-t border-slate-200/60">
                              <em>Tinjauan Fikih:</em> {u.reinterpretasiSyarie}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Susunan Doa & Amalan Syar'i */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-700" />
                        <span>Susunan Doa & Amalan Syar'i yang Dianjurkan</span>
                      </h4>

                      <div className="bg-emerald-950 text-emerald-100 p-4 rounded-2xl space-y-2 text-xs border border-emerald-800">
                        {currentJenis.susunanDoaDanAmalan.map((doa, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{doa}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pandangan Fikih & Hadits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                        <strong className="text-emerald-900 block">Pandangan Fikih Wasathiyah:</strong>
                        <p className="text-emerald-950 leading-relaxed">{currentJenis.pandanganFikihWasathiyah}</p>
                      </div>

                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                        <strong className="text-amber-900 block">Hadits Rujukan:</strong>
                        <p className="text-amber-950 italic leading-relaxed">{currentJenis.haditsRujukan}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* SUBTAB 3: RAMBU SYARIAT (DO & DON'T) */}
          {slametanSubTab === 'rambu' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 bg-slate-900 text-white rounded-3xl border border-slate-700 space-y-2">
                <h4 className="font-black text-sm text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Kaidah Tashfiyah & I'tidal: Membedakan Adat yang Boleh vs yang Terlarang</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dalam Fikih Dakwah Islam Nusantara, prinsip yang dipakai adalah <strong>mempertahankan kearifan lokal selama bersih dari kemusyrikan (Tashfiyatul 'Aqidah)</strong> dan menghindarkan diri dari sikap ekstrem (baik ekstrem mengkafirkan tradisi maupun ekstrem membenarkan klenik).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Kolom Hijau: Yang Diakomodasi */}
                <div className="bg-emerald-50/90 rounded-3xl p-5 border-2 border-emerald-400 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm border-b border-emerald-200 pb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Amalan Budaya yang Diakomodasi & Bernilai Pahala</span>
                  </div>

                  <ul className="space-y-2 text-emerald-950">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span><strong>Niat Bersedekah:</strong> Memberi makan tetangga dan fakir miskin (Ith'amuth Tha'am) untuk mencari ridha Allah SWT.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span><strong>Majelis Doa & Tahlil:</strong> Membaca Kalimah Thayyibah, Surah Yasin, dan shalawat Nabi secara berjamaah.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span><strong>Silaturahmi & Gotong Royong:</strong> Mempererat kerukunan tetangga dan persaudaraan sesama warga (Haqqul Jiwar).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span><strong>Simbolisme Luhur (Tafa'ul):</strong> Menjadikan tumpeng atau jenang sebagai metafora doa kebaikan dan pengingat asal usul penciptaan insan.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span><strong>Birrul Walidain:</strong> Mendoakan ampunan dan keselamatan bagi orang tua yang masih hidup maupun yang telah wafat.</span>
                    </li>
                  </ul>
                </div>

                {/* Kolom Merah: Yang Wajib Ditinggalkan */}
                <div className="bg-rose-50/90 rounded-3xl p-5 border-2 border-rose-400 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm border-b border-rose-200 pb-2">
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    <span>Praktik Kritis yang Wajib Ditinggalkan / Dipurifikasi</span>
                  </div>

                  <ul className="space-y-2 text-rose-950">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✖</span>
                      <span><strong>Sesaji untuk Jin / Dhanyang:</strong> Mempersembahkan makanan ke pohon/sungai/laut dengan keyakinan roh dapat memberi madharat (Syirik).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✖</span>
                      <span><strong>Tathayyur / Prasangka Sial:</strong> Meyakini jika tidak slametan pada hari tertentu pasti akan tertimpa bencana terkutuk.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✖</span>
                      <span><strong>Tabdzir / Pemborosan:</strong> Menghamburkan makanan atau memaksakan berhutang di luar kemampuan finansial demi gengsi adat.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✖</span>
                      <span><strong>Kemungkaran Saat Acara:</strong> Menggabungkan acara slametan dengan perjudian, minuman keras, atau kemaksiatan lainnya.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✖</span>
                      <span><strong>Mantra Permohonan Selain Allah:</strong> Membaca lafal yang memohon pertolongan kepada entitas selain Allah SWT.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 4: PANDUAN PRAKTIS TATA CARA SLAMETAN SYAR'I */}
          {slametanSubTab === 'panduan' && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-emerald-700" />
                  <span>Panduan 4 Langkah Menyelenggarakan Slametan / Kenduri Syar'i</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Prosedur praktis agar tradisi slametan keluarga bernilai pahala sedekah dan terhindar dari syubhat.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">1</span>
                    <span>Luruskan Niat (Lillahi Ta'ala)</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Niatkan acara semata-mata untuk bersyukur (tasyakkur) atas nikmat Allah, bersedekah makanan, dan mendoakan keselamatan keluarga. Jauhkan niat dari rasa takut pada takhayul hari sial.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">2</span>
                    <span>Sajikan Makanan Halal & Thayyib</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Pastikan seluruh bahan makanan diperoleh secara halal, higienis, dan lezat. Bagikan berkat/besek secara merata, terutama kepada anak yatim dan tetangga yang kurang mampu.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">3</span>
                    <span>Isi dengan Dzikir & Shalawat</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Awali acara dengan pembacaan Surah Al-Fatihah, Tahlil, Surah Yasin, Shalawat Nabi Muhammad ﷺ, dan doa selamat yang ditujukan kepada Allah SWT.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">4</span>
                    <span>Rajut Silaturahmi Tanpa Riba/Utang</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Jadikan momentum berkumpul untuk mempererat persaudaraan antarwarga. Laksanakan acara secara sederhana sesuai kemampuan finansial tanpa memaksakan diri berutang.
                  </p>
                </div>
              </div>

              {/* Doa Slametan Arab & Terjemah */}
              <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-700 space-y-2">
                <span className="text-xs font-bold text-emerald-300 block uppercase tracking-wider">
                  Doa Selamat yang Dibaca pada Acara Kenduri / Slametan:
                </span>
                <p className="font-serif text-right text-emerald-100 text-sm sm:text-base leading-relaxed">
                  اللَّهُمَّ إِنَّا نَسْأَلُكَ سَلَامَةً فِي الدِّينِ، وَعَافِيَةً فِي الْجَسَدِ، وَزِيَادَةً فِي الْعِلْمِ، وَبَرَكَةً فِي الرِّزْقِ، وَتَوْبَةً قَبْلَ الْمَوْتِ، وَرَحْمَةً عِنْدَ الْمَوْتِ، وَمَغْفِرَةً بَعْدَ الْمَوْتِ
                </p>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Ya Allah, kami memohon kepada-Mu keselamatan dalam agama, kesehatan pada raga, bertambahnya ilmu, keberkahan rezeki, taubat sebelum mati, rahmat saat mati, dan ampunan setelah kematian."
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: 5 KAIDAH FIQHIYYAH ASASI */}
      {/* ========================================================================= */}
      {activeTab === 'kaidah' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-3xl space-y-2">
            <h3 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-800" />
              <span>Al-Qawa'id Al-Fiqhiyyah Al-Khams (5 Kaidah Pokok Hukum Islam)</span>
            </h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Kaidah fiqhiyyah merupakan rumusan universal para fuqaha yang menjadi tolok ukur penentuan hukum atas tradisi masyarakat ('Urf). Berikut adalah penerapan kelima kaidah pokok dalam menyikapi budaya petung weton di Nusantara:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {DAFTAR_KAIDAH_FIQHIYYAH.map((kaidah, idx) => (
              <div
                key={kaidah.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:border-emerald-300 transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-base font-black text-slate-900">{kaidah.transliterasi}</h4>
                      <p className="text-xs text-slate-500 italic font-medium">"{kaidah.terjemahan}"</p>
                    </div>
                  </div>
                  <div className="text-right font-serif text-xl text-emerald-900 font-bold">
                    {kaidah.namaKaidahArab}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                      Makna Dasar Syariat
                    </span>
                    <p className="text-slate-600 leading-relaxed">{kaidah.maknaDasar}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                    <span className="font-bold text-emerald-900 uppercase tracking-wider text-[10px]">
                      Penerapan Dalam Petung & Weton
                    </span>
                    <p className="text-emerald-950 leading-relaxed">{kaidah.penerapanDalamPetung}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p className="text-amber-950">
                    <strong>Contoh Konkret:</strong> {kaidah.contohKonkret}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: HADITS NABI & KONTEKSTUALISASI */}
      {/* ========================================================================= */}
      {activeTab === 'hadits' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filter Bar Tema */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-800" />
                <span>Pilih Tema Hadits Nabawi</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {filteredHadits.length} Riwayat Hadits Tersedia
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {temaList.map((tema) => (
                <button
                  key={tema}
                  type="button"
                  onClick={() => setSelectedTema(tema)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedTema === tema
                      ? 'bg-emerald-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tema}
                </button>
              ))}
            </div>
          </div>

          {/* List of Hadiths */}
          <div className="space-y-5">
            {filteredHadits.map((hadits) => (
              <div
                key={hadits.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 hover:border-emerald-300 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase">
                      {hadits.tema}
                    </span>
                    <h4 className="text-base font-black text-slate-900">{hadits.judul}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {hadits.derajatHadits}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(`${hadits.teksArab}\n\n"${hadits.terjemahan}"\n(${hadits.perawi})`, hadits.id)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                      title="Salin Teks Hadits"
                    >
                      {copiedId === hadits.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Arabic Text Card */}
                <div className="p-5 rounded-2xl bg-emerald-950 text-white text-right space-y-2 border border-emerald-800">
                  <p className="font-serif text-lg sm:text-xl leading-loose tracking-wide text-emerald-100">
                    {hadits.teksArab}
                  </p>
                  <p className="text-[11px] text-emerald-300/80 italic font-mono text-left pt-2 border-t border-emerald-800/60">
                    {hadits.transliterasi}
                  </p>
                </div>

                {/* Translation & Source */}
                <div className="space-y-2 text-xs">
                  <p className="text-slate-800 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <strong>Artinya:</strong> "{hadits.terjemahan}"
                  </p>
                  <p className="text-slate-500 font-bold italic">
                    Sumber: {hadits.perawi}
                  </p>
                </div>

                {/* Contextualization & Islamic Rule */}
                <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-emerald-900 font-extrabold uppercase text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Kontekstualisasi Terhadap Praktik Petung</span>
                  </div>
                  <p className="text-emerald-950 leading-relaxed">
                    {hadits.kontekstualisasiPetung}
                  </p>
                  <div className="pt-2 text-[11px] text-emerald-800 font-semibold">
                    <strong>Kaidah Relevan:</strong> {hadits.kaidahTerkait}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: FATWA ULAMA & SEJARAH SINTESIS KALENDER */}
      {/* ========================================================================= */}
      {activeTab === 'fatwa' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sultan Agung Highlight */}
          <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white p-6 sm:p-7 rounded-3xl shadow-lg border border-amber-500/30 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Tahun Bersejarah 1633 M / 1043 H / 1555 Jawa
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-amber-100">
              Sintesis Kalender Sultan Agung: Jembatan Tauhid & Tradisi
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              Raja Mataram Islam, <strong>Sultan Agung Hanyakrakusuma</strong>, secara brilian menyatukan penanggalan Saka (berbasis Matahari) dengan penanggalan Hijriah (berbasis Bulan/Qamariyah) pada hari Jumat Legi, 1 Sura 1555 Jawa (bertepatan dengan 1 Muharram 1043 Hijriah). Sintesis ini memungkinkan seluruh umat Islam di Tanah Jawa merayakan hari besar Islam secara serentak tanpa mencabut akar budaya penanggalan Pasaran dan Pawukon warisan leluhur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DAFTAR_FATWA_ULAMA.map((fatwa) => (
              <div
                key={fatwa.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 hover:border-emerald-300 transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="space-y-1 border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
                      {fatwa.eraAtauKitab}
                    </span>
                    <h4 className="text-base font-black text-slate-900">{fatwa.tokohAtauLembaga}</h4>
                    <p className="text-xs font-bold text-emerald-900">{fatwa.judulPandangan}</p>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {fatwa.ringkasanFatwa}
                  </p>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs italic text-emerald-950">
                  {fatwa.kutipanHikmah}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: DOA & AMALAN PENOLAK BALA */}
      {/* ========================================================================= */}
      {activeTab === 'amalan' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600" />
              <span>Amalan Syar'i Penyeimbang & Mitigasi Spiritualitas</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jika dalam tradisi klasik dikenal ritual ubarampe dan sesaji, Islam mentransformasikannya menjadi amal ibadah yang berpahala di sisi Allah SWT melalui sedekah, puasa sunnah, shalat istikharah, dan dzikir perlindungan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DAFTAR_AMALAN_ISLAMI.map((amalan) => (
              <div
                key={amalan.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 hover:border-emerald-300 transition"
              >
                <div className="border-b border-slate-100 pb-3 space-y-1">
                  <span className="text-[10px] font-black uppercase text-emerald-800">
                    Waktu: {amalan.waktuPelaksanaan}
                  </span>
                  <h4 className="text-base font-black text-slate-900">{amalan.namaAmalan}</h4>
                  <p className="text-xs text-slate-500 font-medium">Tujuan: {amalan.tujuan}</p>
                </div>

                {/* Arabic Prayer Box */}
                <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-2 text-right">
                  <p className="font-serif text-base sm:text-lg text-emerald-100 leading-relaxed">
                    {amalan.bacaanDoaArab}
                  </p>
                  <p className="text-[11px] text-emerald-300 italic text-left pt-2 border-t border-emerald-800">
                    "{amalan.artiDoa}"
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong>Tata Cara:</strong> {amalan.tataCara}
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    <strong>Dalil:</strong> {amalan.dalilDasar}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: SELF-CHECK UJI KESELARASAN NIAT */}
      {/* ========================================================================= */}
      {activeTab === 'self-check' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-800" />
              <span>Uji Keselarasan Niat & Aqidah Pengguna (Self-Assessment)</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jawablah 3 pertanyaan berikut dengan jujur untuk memastikan niat dan cara pandang Anda dalam menggunakan aplikasi Weton Jowo tetap berada dalam koridor tauhid dan syariat Islam yang lurus.
            </p>
          </div>

          <div className="space-y-5">
            {quizQuestions.map((q) => (
              <div key={q.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-sm font-black text-slate-900 flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {q.id}
                  </span>
                  <span>{q.pertanyaan}</span>
                </h4>

                <div className="space-y-2 pl-8">
                  {q.options.map((opt, i) => (
                    <label
                      key={i}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition text-xs leading-relaxed ${
                        quizAnswers[q.id] === opt.value
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={quizAnswers[q.id] === opt.value}
                        onChange={() => handleSelectQuiz(q.id, opt.value)}
                        className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{opt.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Assessment Result */}
          {quizResult && (
            <div className={`p-6 rounded-3xl border-2 shadow-lg space-y-3 animate-fadeIn ${
              quizResult.status === 'selaras'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                : quizResult.status === 'koreksi'
                ? 'bg-rose-50 border-rose-500 text-rose-950'
                : 'bg-amber-50 border-amber-500 text-amber-950'
            }`}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" />
                <h4 className="text-base font-black">{quizResult.title}</h4>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                {quizResult.desc}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Action Footer & Export Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const text = `⚖️ PANDUAN HUKUM ISLAM & PETUNG JAWA (WETON JOWO)
DIALEKTIKA WASATHIYAH: PETUNG & TRADISI SLAMETAN DALAM KACAMATA FIKIH

5 KAIDAH FIQHIYYAH ASASI:
1. Al-Umuru bi Maqashidiha (Segala perkara bergantung pada niatnya)
2. Al-'Adatu Muhakkamah (Adat kebiasaan yang baik dapat diakomodasi sebagai hukum)
3. Dar'ul Mafasid Muqaddamun 'Ala Jalbil Mashalih (Menolak kerusakan didahulukan daripada mengambil kemaslahatan)
4. Al-Yaqinu La Yuzalu bi Asy-Syakk (Keyakinan tak tergoyahkan oleh keraguan/tathayyur)
5. La Dharara wa La Dhirar (Tidak boleh menimbulkan bahaya atau membalas dengan bahaya)

KACAMATA FIKIH MODERAT ATAS SLAMETAN / KENDURI:
• Niat: Dipurifikasi dari sesaji jin menjadi tasyakkur bin ni'mah dan sedekah makanan (Ith'amuth Tha'am - HR. Bukhari).
• Ubarampe (Tumpeng/Jenang): Sebagai wasilah sedekah thayyib dan simbolisme doa (Tafa'ul), bukan sesaji yang memiliki kesaktian.
• Majelis: Diisi dengan bacaan Al-Qur'an, Tahlil, Shalawat Nabi, dan doa keselamatan kepada Allah SWT semata.
• Haul/Geblak: Wujud Birrul Walidain dan sedekah jariyah atas nama almarhum/almarhumah (HR. Muslim).

HADITS SHAHIH RUJUKAN:
• "La 'adwa wa la thiyarah, wa yu'jibuni al-fa'lu ash-shalih" (HR. Bukhari & Muslim)
• "I'qilha wa tawakkal - Ikatlah untamu lalu bertawakkallah" (HR. Tirmidzi)
• "Ayyul Islami khair? Qala: Tuth'imut tha'am wa taqra'us salam..." (HR. Bukhari)

AMALAN MITIGASI SYAR'I:
• Sedekah Subuh & Santunan Dhuafa
• Shalat Sunnah Istikharah & Hajat
• Dzikir Pagi-Petang & Shalawat
• Puasa Sunnah Weton / Senin-Kamis`;
              downloadTextFile(text, 'Panduan_Hukum_Islam_dan_Petung_Jawa.txt');
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition shadow-xs"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Unduh Ringkasan Panduan Syariat (.txt)</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition shadow-xs border border-slate-300"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Cetak Panduan</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateToJodoh && (
            <button
              type="button"
              onClick={onNavigateToJodoh}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-xs font-bold transition"
            >
              <span>Petung Jodoh Salaki-Rabi</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {onNavigateToNagaDina && (
            <button
              type="button"
              onClick={onNavigateToNagaDina}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-xs font-bold transition"
            >
              <span>Arah Rezeki & Jam Berkah</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
