import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Pause, Play, RotateCcw, Sparkles, BookOpen, ChevronDown, ChevronUp, X, ShieldCheck, User, Sliders } from 'lucide-react';
import { narratorEngine, VoiceOption, JavaneseVoicePreset, fontPresets } from '../utils/narratorSpeech';

export const NarratorWelcomeBanner: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [voiceOptions, setVoiceOptions] = useState<VoiceOption[]>([]);
  const [activeVoiceIdx, setActiveVoiceIdx] = useState<number>(0);
  const [currentPreset, setCurrentPreset] = useState<JavaneseVoicePreset>('pini_sepuh');

  useEffect(() => {
    // Subscribe to speech state updates
    const unsubscribe = narratorEngine.subscribe((speaking, paused, voices, activeIdx, preset) => {
      setIsSpeaking(speaking);
      setIsPaused(paused);
      setVoiceOptions(voices);
      setActiveVoiceIdx(activeIdx);
      setCurrentPreset(preset);
    });

    // Automatically start narration when the app is opened by the user
    narratorEngine.autoStartOnOpen();

    return () => {
      unsubscribe();
    };
  }, []);

  if (isDismissed) return null;

  return (
    <div className="w-full transition-all duration-300 my-3">
      <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-rose-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-blue-800/80 relative overflow-hidden">
        {/* Glowing Background Ambiance */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Banner Top Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-blue-800/60 pb-3 mb-3 gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              {isSpeaking && !isPaused && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isSpeaking && !isPaused ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Narator Otomatis Logat Jawa Indonesia</span>
              </span>
              <span className="text-[10px] text-blue-200/80 italic">
                {fontPresets[currentPreset]?.description || 'Aksen Pini Sepuh • Tenang & Berwibawa'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Voice Engine Selector */}
            {voiceOptions.length > 0 && (
              <div className="flex items-center gap-1 bg-blue-900/60 border border-blue-700/50 rounded-xl px-2 py-1 text-[11px] text-blue-100">
                <User className="w-3 h-3 text-amber-300 shrink-0" />
                <select
                  value={activeVoiceIdx}
                  onChange={(e) => narratorEngine.setSelectedVoice(Number(e.target.value))}
                  className="bg-transparent text-white font-semibold outline-none cursor-pointer max-w-[130px] sm:max-w-[170px] truncate"
                >
                  {voiceOptions.map((v, i) => (
                    <option key={i} value={i} className="bg-slate-900 text-white">
                      {v.displayName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Play/Pause Main Control Button */}
            <button
              onClick={() => narratorEngine.toggle()}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                isSpeaking && !isPaused
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isSpeaking && !isPaused ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Jeda Suara</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isPaused ? 'Lanjutkan Suara' : 'Putar Narasi'}</span>
                </>
              )}
            </button>

            {/* Replay Button */}
            <button
              onClick={() => narratorEngine.speak()}
              className="p-1.5 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white border border-blue-700/50 transition"
              title="Ulangi Narasi dari Awal"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Minimize Toggle */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white border border-blue-700/50 transition"
              title={isMinimized ? 'Perluas Teks Narasi' : 'Ciutkan Teks Narasi'}
            >
              {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>

            {/* Dismiss Button */}
            <button
              onClick={() => {
                narratorEngine.stop();
                setIsDismissed(true);
              }}
              className="p-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-800/50 transition"
              title="Tutup Narator"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Character Voice Style Preset Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3 bg-slate-900/70 p-2 rounded-2xl border border-blue-900/60 relative z-10">
          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1 mr-1">
            <Sliders className="w-3 h-3" /> Karakter Logat Suku Jawa:
          </span>
          {(Object.keys(fontPresets) as JavaneseVoicePreset[]).map((key) => {
            const preset = fontPresets[key];
            const isActive = currentPreset === key;
            return (
              <button
                key={key}
                onClick={() => narratorEngine.setPreset(key)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-xl transition ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-sm ring-1 ring-rose-400'
                    : 'bg-blue-950/80 hover:bg-blue-900 text-blue-200 border border-blue-800/60'
                }`}
              >
                {preset.name}
              </button>
            );
          })}
        </div>

        {/* Active Audio Wave Visualizer Banner */}
        {isSpeaking && !isPaused && (
          <div className="mb-4 bg-emerald-950/70 border border-emerald-500/40 p-2.5 rounded-2xl flex items-center justify-between gap-3 text-xs text-emerald-200 relative z-10 animate-pulse">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-bold">Narator Suara Suku Jawa Sedang Membaca Pesan Pembuka...</span>
            </div>
            <div className="flex items-center gap-1 h-3">
              <span className="w-1 h-full bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-full bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-full bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="w-1 h-full bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
            </div>
          </div>
        )}

        {/* Narrative Written Text Body */}
        {!isMinimized && (
          <div className="space-y-3.5 relative z-10 text-slate-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white italic tracking-tight font-serif">
                Kitab Primbon Betaljemur Adammakna Modern
              </h2>
              <h3 className="text-xs sm:text-sm font-extrabold text-rose-300 mt-0.5 tracking-wide">
                Membuka Tabir Harmoni Kosmos Jawa di Era Digital
              </h3>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-slate-200/95 font-sans">
              <p>
                <strong>Rahayu Sagung Dumadi.</strong> Tradisi perhitungan Petung Jawa bukanlah mitos atau takhayul buta (*gugon tuhon*), melainkan kristalisasi etnosains empiris warisan para leluhur berabad-abad yang dicatat secara agung dalam <em>Serat Centhini</em> dan <em>Kitab Primbon Betaljemur Adammakna</em> karya Kanjeng Pangeran Harya Tjakraningrat.
              </p>

              <p>
                <strong className="text-amber-300">WETON JOWO</strong> mentransformasikan perhitungan siklus 35 hari (dina & pasaran), 30 wuku, dan pranata mangsa menjadi algoritma komputasi modern yang objektif. Kami hadir membantu Anda menemukan hari pernikahan terbaik, mengharmoniskan perjodohan, menentukan arah boyongan rumah, serta memproteksi hajat keluarga dari benturan hari pantangan & geblak leluhur.
              </p>
            </div>

            {/* Disclaimer Box */}
            <div className="pt-2.5 border-t border-blue-800/60">
              <div className="bg-blue-950/80 border border-blue-800/80 rounded-2xl p-3 text-[11px] sm:text-xs text-blue-200/90 leading-relaxed italic flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 not-italic block font-bold mb-0.5">Penafian & Nilai Kebudayaan:</strong>
                  Segala isi dan perhitungan di dalam aplikasi ini semata-mata bersifat INFORMATIF sebagai wawasan khazanah kebudayaan Nusantara. Bukan hal yang harus atau wajib dipercayai, melainkan cukup untuk diketahui dan dipelajari sebagai bahan wawasan dan kehati-hatian (<em>eling lan waspada</em>).
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
