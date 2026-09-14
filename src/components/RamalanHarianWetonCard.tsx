import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Compass, 
  TrendingUp, 
  HeartHandshake, 
  ShieldCheck, 
  Copy, 
  Check, 
  BookMarked,
  RefreshCw,
  Sun,
  Flame,
  ArrowRight
} from 'lucide-react';
import { getDeviceLocalDateString, getPrediksiHarianWeton } from '../utils/javaneseCalendar';
import { TabView } from '../types/weton';

interface RamalanHarianWetonCardProps {
  onNavigateToModule?: (tabId: TabView['id']) => void;
}

export const RamalanHarianWetonCard: React.FC<RamalanHarianWetonCardProps> = ({
  onNavigateToModule
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(() => getDeviceLocalDateString());
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'energi' | 'rezeki' | 'wuku'>('energi');

  const prediksi = useMemo(() => {
    return getPrediksiHarianWeton(selectedDate);
  }, [selectedDate]);

  const handleCopyPrediksi = () => {
    const text = `🔮 RAMALAN & PREDIKSI HARIAN WETON (WETON JOWO)
📅 Tanggal: ${prediksi.tanggalFormat}
✨ Weton: ${prediksi.weton.hari} ${prediksi.weton.pasaran} (Neptu ${prediksi.weton.neptuTotal})
📜 Wuku: Wuku ${prediksi.pesanWuku.wukuNama} (Ke-${prediksi.pesanWuku.wukuIndex})
📊 Tingkat Potensi Energi: ${prediksi.tingkatKeberuntungan}%

🌟 Kategori: ${prediksi.energiNeptu.kategoriNeptu}
💡 Suasana Hari Ini: ${prediksi.energiNeptu.suasana}
💰 Peluang Rezeki: ${prediksi.energiNeptu.fokusRezeki}
🧭 Arah Berkah: ${prediksi.arahKeberuntungan}

📜 Wejangan Wuku: ${prediksi.pesanWuku.nasehatLuhur}

(Sifat: Murni Informatif & Wawasan Kebudayaan Jawa via https://ais-pre-iif37p72n6euueu7vjdqmb-810674584139.europe-west2.run.app)`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetToday = () => {
    setSelectedDate(getDeviceLocalDateString());
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-indigo-800/60 relative overflow-hidden space-y-6">
      {/* Background Graphic Effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Title & Date Selector */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/60 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/80 border border-indigo-500/40 text-indigo-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Prediksi Etnosains Titen Hari Ini</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Ramalan Harian Weton & Pawukon
          </h2>
          <p className="text-xs text-indigo-200/80">
            Prediksi energi neptu, potensi rezeki, dan wejangan wuku harian dari jam perangkat Anda.
          </p>
        </div>

        {/* Date Input Controller */}
        <div className="flex items-center gap-2 bg-slate-800/90 p-2 rounded-2xl border border-indigo-700/60 shrink-0">
          <Calendar className="w-4 h-4 text-amber-400 ml-1" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-xs sm:text-sm font-bold text-white outline-none cursor-pointer"
          />
          <button
            onClick={handleResetToday}
            className="p-1.5 bg-indigo-800/80 hover:bg-indigo-700 text-indigo-200 rounded-xl transition text-[11px] font-bold flex items-center gap-1"
            title="Kembali ke Hari Ini (Jam HP/Komputer)"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Hari Ini</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Info Banner & Scores */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Card: Summary Weton Today */}
        <div className="md:col-span-5 bg-gradient-to-br from-indigo-900/50 to-slate-900/90 p-5 rounded-2xl border border-indigo-700/50 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold">
              <span>{prediksi.tanggalFormat}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                Neptu {prediksi.weton.neptuTotal}
              </span>
            </div>

            <div className="mt-2">
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                {prediksi.weton.hari} {prediksi.weton.pasaran}
              </div>
              <div className="text-xs text-indigo-200 mt-1 font-medium">
                Wuku <strong>{prediksi.pesanWuku.wukuNama}</strong> (Siklus Pawukon ke-{prediksi.pesanWuku.wukuIndex})
              </div>
            </div>

            <div className="pt-3 border-t border-indigo-800/60 mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Kategori Energi:</span>
                <span className="font-bold text-amber-400">{prediksi.energiNeptu.kategoriNeptu}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Arah Berkah Utama:</span>
                <span className="font-bold text-emerald-400">{prediksi.arahKeberuntungan}</span>
              </div>
            </div>
          </div>

          {/* Potensi Keberuntungan Indicator Bar */}
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-indigo-800/40 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-200 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Indeks Harmoni Energi:</span>
              </span>
              <span className="font-black text-amber-400 text-sm">{prediksi.tingkatKeberuntungan}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${prediksi.tingkatKeberuntungan}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Card: Interactive Tabs & Details */}
        <div className="md:col-span-7 space-y-3">
          {/* Sub Navigation */}
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-2xl border border-indigo-800/50 text-xs">
            <button
              onClick={() => setActiveTab('energi')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'energi'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-indigo-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span>Energi & Suasana</span>
            </button>
            <button
              onClick={() => setActiveTab('rezeki')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'rezeki'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-indigo-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
              <span>Rezeki & Arah</span>
            </button>
            <button
              onClick={() => setActiveTab('wuku')}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'wuku'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-indigo-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5 text-rose-300" />
              <span>Wejangan Wuku</span>
            </button>
          </div>

          {/* Tab 1: Energi & Suasana */}
          {activeTab === 'energi' && (
            <div className="bg-slate-950/40 p-4 rounded-2xl border border-indigo-800/50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span>✨ Dynamika Energi Hari Ini</span>
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                {prediksi.energiNeptu.suasana}
              </p>
              <div className="p-3 rounded-xl bg-indigo-900/30 border border-indigo-700/40 text-xs text-indigo-100">
                <strong>Aspek Hubungan Sosial:</strong> {prediksi.energiNeptu.aspekHubungan}
              </div>
            </div>
          )}

          {/* Tab 2: Rezeki & Arah */}
          {activeTab === 'rezeki' && (
            <div className="bg-slate-950/40 p-4 rounded-2xl border border-indigo-800/50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span>💰 Orientasi Rezeki & Usaha</span>
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                {prediksi.energiNeptu.fokusRezeki}
              </p>
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-700/40 text-xs text-emerald-200">
                <strong>Arah Berkah Utama:</strong> {prediksi.arahKeberuntungan}. Cocok dijadikan rujukan arah orientasi berangkat kerja, perniagaan, atau perjalanan hajat.
              </div>
            </div>
          )}

          {/* Tab 3: Wejangan Wuku */}
          {activeTab === 'wuku' && (
            <div className="bg-slate-950/40 p-4 rounded-2xl border border-indigo-800/50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                <span>📜 Wejangan Pawukon {prediksi.pesanWuku.wukuNama}</span>
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                {prediksi.pesanWuku.filosofiWuku}
              </p>
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-700/40 text-xs text-rose-200">
                <strong>Nasihat Luhur:</strong> {prediksi.pesanWuku.nasehatLuhur}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyPrediksi}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Prediksi'}</span>
            </button>

            {onNavigateToModule && (
              <>
                <button
                  onClick={() => onNavigateToModule('wuku')}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-200 rounded-xl text-xs font-semibold transition border border-indigo-700/50 flex items-center gap-1"
                >
                  <BookMarked className="w-3.5 h-3.5 text-amber-400" />
                  <span>Serat Wuku</span>
                </button>
                <button
                  onClick={() => onNavigateToModule('nagadina')}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-200 rounded-xl text-xs font-semibold transition border border-indigo-700/50 flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Naga Dina</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer Footer */}
      <div className="relative z-10 pt-2 border-t border-indigo-800/60 flex items-center gap-2 text-[11px] text-indigo-300/80">
        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong>Sifat Prediksi:</strong> Murni bersifat <strong>INFORMATIF</strong> (Khazanah Etnosains Titen Jawa). Tidak wajib/harus dipercayai, cukup dijadikan wawasan pengetahuan & kehati-hatian (<em>eling lan waspada</em>).
        </span>
      </div>
    </section>
  );
};
