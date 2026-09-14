import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Calendar,
  Search,
  BookOpen,
  Compass,
  ShieldAlert,
  Printer,
  Share2,
  CheckCircle2,
  TreePine,
  Feather,
  Home,
  Sword,
  Flag,
  Heart,
  Briefcase,
  AlertTriangle,
  RotateCcw,
  Info,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { DAFTAR_30_WUKU, getWukuByName, getWukuByNomor } from '../data/wukuData';
import { WukuDetailInfo } from '../types/weton';
import { hitungWetonLengkap, getWukuRangeForDate } from '../utils/javaneseCalendar';
import { useAuth } from '../context/AuthContext';
import { PiagamPetungModal } from './PiagamPetungModal';

interface WukuPawukonViewProps {
  onOpenPantanganModal?: () => void;
}

export const WukuPawukonView: React.FC<WukuPawukonViewProps> = ({ onOpenPantanganModal }) => {
  const { user } = useAuth();

  // Active Sub-Tab
  const [activeSubTab, setActiveSubTab] = useState<'kalkulator' | 'ensiklopedia' | 'siklus' | 'pantangan'>('kalkulator');

  // Calculator State
  const [userName, setUserName] = useState(user?.nama || '');
  const [birthDate, setBirthDate] = useState('1998-05-20');
  const [isCopied, setIsCopied] = useState(false);
  const [showPrintCertificate, setShowPrintCertificate] = useState(false);

  // Encyclopedia State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWukuDetail, setSelectedWukuDetail] = useState<WukuDetailInfo | null>(null);

  // Current Date Pawukon Calculation
  const todayStr = useMemo(() => {
    const d = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, []);

  const todayWeton = useMemo(() => hitungWetonLengkap(todayStr), [todayStr]);
  const todayWukuRange = useMemo(() => getWukuRangeForDate(todayStr), [todayStr]);
  const todayWukuDetail = useMemo(() => getWukuByName(todayWeton.wuku), [todayWeton.wuku]);

  // Birthdate Pawukon Calculation
  const birthWeton = useMemo(() => {
    if (!birthDate) return null;
    try {
      return hitungWetonLengkap(birthDate);
    } catch {
      return null;
    }
  }, [birthDate]);

  const birthWukuRange = useMemo(() => {
    if (!birthDate) return null;
    try {
      return getWukuRangeForDate(birthDate);
    } catch {
      return null;
    }
  }, [birthDate]);

  const birthWukuDetail = useMemo(() => {
    if (!birthWeton) return DAFTAR_30_WUKU[0];
    return getWukuByName(birthWeton.wuku);
  }, [birthWeton]);

  // Filtered 30 Wukus for Encyclopedia
  const filteredWukus = useMemo(() => {
    if (!searchQuery.trim()) return DAFTAR_30_WUKU;
    const q = searchQuery.toLowerCase();
    return DAFTAR_30_WUKU.filter(
      (w) =>
        w.nama.toLowerCase().includes(q) ||
        w.dewa.nama.toLowerCase().includes(q) ||
        w.pohon.nama.toLowerCase().includes(q) ||
        w.candran.teksJawa.toLowerCase().includes(q) ||
        w.nomor.toString() === q
    );
  }, [searchQuery]);

  const handleCopySummary = () => {
    if (!birthWeton || !birthWukuDetail) return;
    const text = `📜 SERAT PETUNG WUKU (KITAB BETALJEMUR ADAMMAKNA)
Nama: ${userName || 'Ksatria/Pribadi'}
Tanggal Lahir: ${birthDate} (${birthWeton.hari} ${birthWeton.pasaran}, Neptu ${birthWeton.neptuTotal})
Wuku Lahir: Wuku Ke-${birthWukuDetail.nomor} ${birthWukuDetail.nama} (${birthWukuDetail.aksaraJawa})

👑 Bethara Pangreksa: ${birthWukuDetail.dewa.nama} (${birthWukuDetail.dewa.gelar})
🌳 Kayu Perlambang: ${birthWukuDetail.pohon.nama}
🦅 Burung Perlambang: ${birthWukuDetail.burung.nama}
🏛️ Gedhong: ${birthWukuDetail.gedhong.posisi}
⚔️ Senjata: ${birthWukuDetail.senjata.nama}
✨ Candran: "${birthWukuDetail.candran.teksJawa}" (${birthWukuDetail.candran.artian})

Karakter Utama: ${birthWukuDetail.watakLahir.ringkasanWatak}
Level Rezeki: ${birthWukuDetail.potensiRezekiDanKarir.levelRezeki}
Hari Taliwangke: ${birthWukuDetail.pantanganDanNaas.taliwangke.hari} ${birthWukuDetail.pantanganDanNaas.taliwangke.pasaran}

Dihitung via WETON JOWO - Etnosains Komputasi Betaljemur Adammakna`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Kitab Primbon Betaljemur Adammakna</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex flex-wrap items-center gap-3">
            <span>Kalkulator & Serat 30 Wuku Pawukon</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
            Siklus 210 hari Pawukon membagi takdir dan perwatakan manusia ke dalam <strong>30 Wuku</strong>. Temukan rahasia dewa pelindung, kayu, burung, candran metaforis, serta peta pantangan naas Taliwangke & Samparwangke kelahiran Anda.
          </p>

          {/* Quick Sub-Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3">
            <button
              type="button"
              onClick={() => setActiveSubTab('kalkulator')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'kalkulator'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold scale-102'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Hitung Wuku Lahir</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('ensiklopedia')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'ensiklopedia'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold scale-102'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Ensiklopedia 30 Wuku</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('siklus')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'siklus'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold scale-102'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Wuku Hari Ini & Siklus 210 Hari</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('pantangan')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'pantangan'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold scale-102'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Tabel Taliwangke & Naas</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: KALKULATOR WUKU KELAHIRAN */}
      {/* ========================================================================= */}
      {activeSubTab === 'kalkulator' && (
        <div className="space-y-6">
          {/* Input Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black">
                  🎯
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Perhitungan Wuku Berdasarkan Tanggal Lahir
                  </h3>
                  <p className="text-xs text-slate-500">
                    Masukkan tanggal lahir Masehi untuk membuka serat watak wuku Anda
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBirthDate(todayStr)}
                className="text-xs font-bold text-rose-800 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition"
              >
                Gunakan Hari Ini
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Nama Anda / Pribadi (Opsional)
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Contoh: Raden Bagus / Ayu"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Tanggal Lahir Masehi <span className="text-rose-600">*</span>
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Quick Preset Birthdates */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
              <span className="font-semibold">Contoh Tanggal:</span>
              <button
                type="button"
                onClick={() => setBirthDate('1945-08-17')}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition"
              >
                17 Agustus 1945 (Proklamasi RI)
              </button>
              <button
                type="button"
                onClick={() => setBirthDate('1998-05-20')}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition"
              >
                20 Mei 1998 (Kebangkitan)
              </button>
              <button
                type="button"
                onClick={() => setBirthDate('2000-01-01')}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition"
              >
                1 Januari 2000 (Milenium)
              </button>
            </div>
          </div>

          {/* Results Area */}
          {birthWeton && birthWukuDetail && birthWukuRange && (
            <div className="space-y-6">
              {/* Grand Wuku Hero Card */}
              <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-rose-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-amber-400/40 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 text-9xl font-black text-amber-500/5 select-none pointer-events-none">
                  {birthWukuDetail.aksaraJawa}
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase rounded-full shadow-xs">
                        Wuku Ke-{birthWukuDetail.nomor} dari 30
                      </span>
                      <span className="px-3 py-1 bg-white/10 text-amber-200 font-bold text-xs rounded-full border border-white/20">
                        {birthWeton.hari} {birthWeton.pasaran} (Neptu {birthWeton.neptuTotal})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition flex items-center gap-1.5"
                      >
                        {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Tersalin!' : 'Salin Serat'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowPrintCertificate(true)}
                        className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-md"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Cetak Piagam Wuku</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Title Banner */}
                  <div className="space-y-2">
                    <div className="text-amber-400 text-2xl font-serif">
                      {birthWukuDetail.aksaraJawa}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                      WUKU {birthWukuDetail.nama.toUpperCase()}
                    </h2>
                    <p className="text-sm text-amber-200 font-medium">
                      {birthWukuDetail.tokohAsal}
                    </p>
                    <p className="text-xs text-slate-300">
                      Rentang siklus wuku kelahiran ini berjalan mulai <strong>Ahad ({birthWukuRange.startDate})</strong> hingga <strong>Setu ({birthWukuRange.endDate})</strong>.
                    </p>
                  </div>

                  {/* Candran Classic Quote Banner */}
                  <div className="p-4 bg-amber-500/10 border-l-4 border-amber-400 rounded-r-2xl space-y-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                      Candrane Wuku (Perlambang Klasik Betaljemur):
                    </span>
                    <p className="text-sm sm:text-base font-serif italic text-amber-100 font-semibold">
                      "{birthWukuDetail.candran.teksJawa}"
                    </p>
                    <p className="text-xs text-slate-200 pt-0.5">
                      <strong>Makna:</strong> {birthWukuDetail.candran.artian} &mdash; <em>{birthWukuDetail.candran.maknaFilosofis}</em>
                    </p>
                  </div>
                </div>
              </div>

              {/* 7 Perlambang Utama Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-4 bg-gradient-to-b from-amber-600 to-rose-700 rounded-full" />
                    <span>7 Perlambang Etnosains Wuku {birthWukuDetail.nama}</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Kitab Betaljemur Adammakna</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {/* 1. Dewa / Bethara */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-amber-400 transition">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg">
                        👑
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-amber-800">Bethara Pangreksa</span>
                        <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{birthWukuDetail.dewa.nama}</h4>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-xl">
                      <p><strong>Gelar:</strong> {birthWukuDetail.dewa.gelar}</p>
                      <p><strong>Watak:</strong> {birthWukuDetail.dewa.watakDewa}</p>
                      <p className="text-[11px] text-slate-500"><strong>Dununge:</strong> {birthWukuDetail.dewa.dununge}</p>
                    </div>
                  </div>

                  {/* 2. Pohon / Kayu */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-amber-400 transition">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-lg">
                        🌳
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-emerald-800">Kayunira (Pohon)</span>
                        <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{birthWukuDetail.pohon.nama}</h4>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl leading-relaxed">
                      <strong>Filosofi:</strong> {birthWukuDetail.pohon.makna}
                    </p>
                  </div>

                  {/* 3. Burung / Peksi */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-amber-400 transition">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center font-bold text-lg">
                        🦅
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-sky-800">Manuknira (Burung)</span>
                        <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{birthWukuDetail.burung.nama}</h4>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl leading-relaxed">
                      <strong>Tutur Kata & Intuisi:</strong> {birthWukuDetail.burung.makna}
                    </p>
                  </div>

                  {/* 4. Gedhong / Lumbung */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-amber-400 transition">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold text-lg">
                        🏛️
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-indigo-800">Gedhong (Harta)</span>
                        <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{birthWukuDetail.gedhong.posisi}</h4>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl leading-relaxed">
                      <strong>Pengelolaan Rezeki:</strong> {birthWukuDetail.gedhong.makna}
                    </p>
                  </div>

                  {/* 5. Senjata */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-amber-400 transition">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center font-bold text-lg">
                        ⚔️
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-rose-800">Senjata Bawaan</span>
                        <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{birthWukuDetail.senjata.nama}</h4>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl leading-relaxed">
                      <strong>Ketegasan & Keberanian:</strong> {birthWukuDetail.senjata.makna}
                    </p>
                  </div>

                  {/* 6. Umbul-umbul */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-amber-400 transition">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg">
                        🚩
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-amber-800">Umbul-Umbul</span>
                        <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{birthWukuDetail.umbulUmbul.posisi}</h4>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl leading-relaxed">
                      <strong>Kehormatan Sosial:</strong> {birthWukuDetail.umbulUmbul.makna}
                    </p>
                  </div>
                </div>
              </div>

              {/* Watak & Karakter Batiniah */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center font-bold text-lg">
                    ✨
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Watak, Kepribadian & Kedalaman Batin Lahir
                    </h3>
                    <p className="text-xs text-slate-500">
                      Analisis karakter orisinal Serat Primbon Betaljemur Adammakna
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-slate-800 text-sm leading-relaxed">
                  <strong>Ringkasan Perwatakan:</strong> {birthWukuDetail.watakLahir.ringkasanWatak}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-2 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/80">
                    <h4 className="text-xs font-black uppercase text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Sifat Luhur & Kelebihan Positif</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                      {birthWukuDetail.watakLahir.sifatPositif.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 bg-rose-50/50 p-4 rounded-2xl border border-rose-200/80">
                    <h4 className="text-xs font-black uppercase text-rose-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Sifat yang Perlu Diwaspadai / Diredam</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-rose-950 font-medium">
                      {birthWukuDetail.watakLahir.sifatWaspada.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl text-xs text-slate-700 leading-relaxed border border-slate-200">
                  <strong>Kehidupan Batiniah & Spiritual:</strong> {birthWukuDetail.watakLahir.batiniah}
                </div>
              </div>

              {/* Potensi Rezeki, Karier, dan Asmara Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Rezeki & Karier */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-amber-600" />
                      <h3 className="font-extrabold text-base text-slate-900">Rezeki & Potensi Karier</h3>
                    </div>
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      {birthWukuDetail.potensiRezekiDanKarir.levelRezeki}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700">Bidang Usaha & Profesi Selaras:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {birthWukuDetail.potensiRezekiDanKarir.bidangProfesi.map((p, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-3.5 rounded-2xl">
                    <p><strong>Gaya Kerja Terbaik:</strong> {birthWukuDetail.potensiRezekiDanKarir.gayaKerja}</p>
                    <p className="text-amber-900 font-medium"><strong>Nasihat Rezeki:</strong> {birthWukuDetail.potensiRezekiDanKarir.nasihatRezeki}</p>
                  </div>
                </div>

                {/* Asmara & Jodoh */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-rose-600" />
                      <h3 className="font-extrabold text-base text-slate-900">Jodoh & Keselarasan Rumah Tangga</h3>
                    </div>
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                      Serasi Adat
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 space-y-1.5 bg-rose-50/50 p-3.5 rounded-2xl border border-rose-100">
                    <p><strong>Pasangan Cocok:</strong> {birthWukuDetail.jodohDanAsmara.karakterPasanganCocok}</p>
                    <p><strong>Nasihat Keharmonisan:</strong> {birthWukuDetail.jodohDanAsmara.nasihatPernikahan}</p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-700">Wuku Pasangan Paling Serasi:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {birthWukuDetail.jodohDanAsmara.wukuSerasi.map((w, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            const match = getWukuByName(w);
                            setSelectedWukuDetail(match);
                          }}
                          className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-lg text-xs font-bold transition flex items-center gap-1"
                        >
                          <span>Wuku {w}</span>
                          <ChevronRight className="w-3 h-3 text-rose-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pantangan Naas & Sedekah Mitigasi */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center font-bold text-lg">
                      🛡️
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">
                        Pantangan Hari Naas (Taliwangke & Samparwangke) & Sedekah Adat
                      </h3>
                      <p className="text-xs text-slate-500">
                        Panduan mitigasi kultural tolak bala menurut Betaljemur Adammakna
                      </p>
                    </div>
                  </div>

                  {onOpenPantanganModal && (
                    <button
                      type="button"
                      onClick={onOpenPantanganModal}
                      className="text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition"
                    >
                      Buka Form Proteksi
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-4 bg-rose-50/80 rounded-2xl border border-rose-200 space-y-1">
                    <span className="text-[10px] font-black uppercase text-rose-800">Hari Taliwangke Wuku Ini</span>
                    <div className="text-sm font-black text-rose-950">
                      {birthWukuDetail.pantanganDanNaas.taliwangke.hari} {birthWukuDetail.pantanganDanNaas.taliwangke.pasaran}
                    </div>
                    <p className="text-[11px] text-rose-800 leading-tight">
                      {birthWukuDetail.pantanganDanNaas.taliwangke.keterangan}
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-800">Hari Samparwangke</span>
                    <div className="text-sm font-black text-amber-950">
                      {birthWukuDetail.pantanganDanNaas.samparwangke.hari} {birthWukuDetail.pantanganDanNaas.samparwangke.pasaran}
                    </div>
                    <p className="text-[11px] text-amber-800 leading-tight">
                      {birthWukuDetail.pantanganDanNaas.samparwangke.keterangan}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-600">Arah Larangan (Kala Wuku)</span>
                    <div className="text-sm font-black text-slate-900">
                      {birthWukuDetail.pantanganDanNaas.kalaWuku}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-tight">
                      Hindari bepergian jauh ke arah ini saat memulai hajat besar.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                  <h4 className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Ubarampe Slametan & Sedekah Tolak Sengkala (Mitigasi Wuku {birthWukuDetail.nama})</span>
                  </h4>
                  <p className="text-xs text-slate-300">
                    <strong>Sesaji Adat:</strong> {birthWukuDetail.sedekahMitigasi.sesajiAdat.join(', ')}
                  </p>
                  <p className="text-xs text-slate-300">
                    <strong>Doa & Laku Prihatin:</strong> {birthWukuDetail.sedekahMitigasi.doaAtauLaku}
                  </p>
                  <p className="text-[11px] text-amber-200/90 italic">
                    * {birthWukuDetail.sedekahMitigasi.keteranganSlametan}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: ENSIKLOPEDIA 30 WUKU PAWUKON */}
      {/* ========================================================================= */}
      {activeSubTab === 'ensiklopedia' && (
        <div className="space-y-6">
          {/* Search Bar & Filter Header */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <span>Ensiklopedia Lengkap 30 Wuku Pawukon</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Telusuri kitab 30 Wuku dari Sinta (Ke-1) hingga Watugunung (Ke-30)
                </p>
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama wuku, dewa, pohon..."
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* 30 Wukus Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWukus.map((wuku) => (
              <div
                key={wuku.nomor}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-amber-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                      Wuku Ke-{wuku.nomor}
                    </span>
                    <span className="text-amber-700 font-serif font-bold text-sm">
                      {wuku.aksaraJawa}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-slate-900 group-hover:text-amber-800 transition-colors">
                      {wuku.nama}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{wuku.tokohAsal}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl">
                    <p className="line-clamp-1"><strong>Dewa:</strong> {wuku.dewa.nama}</p>
                    <p className="line-clamp-1"><strong>Kayu:</strong> {wuku.pohon.nama}</p>
                    <p className="line-clamp-1"><strong>Burung:</strong> {wuku.burung.nama}</p>
                    <p className="text-[11px] font-serif italic text-amber-900 line-clamp-1">
                      "{wuku.candran.teksJawa}"
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-rose-800 font-semibold">
                    Taliwangke: {wuku.pantanganDanNaas.taliwangke.hari} {wuku.pantanganDanNaas.taliwangke.pasaran}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedWukuDetail(wuku)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1 shadow-xs"
                  >
                    <span>Buka Serat</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: SIKLUS PAWUKON 210 HARI & WUKU HARI INI */}
      {/* ========================================================================= */}
      {activeSubTab === 'siklus' && (
        <div className="space-y-6">
          {/* Today's Active Wuku Card */}
          <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-400/40 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase">
                Wuku yang Sedang Berjalan Hari Ini
              </span>
              <span className="text-xs text-amber-200 font-bold">
                {todayWeton.hari} {todayWeton.pasaran} ({todayStr})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <span className="text-amber-400 font-serif text-2xl">{todayWukuDetail.aksaraJawa}</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  WUKU {todayWukuDetail.nama.toUpperCase()}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Wuku ke-{todayWukuDetail.nomor} dari 30. Siklus minggu ini aktif sejak <strong>Ahad ({todayWukuRange.startDate})</strong> hingga <strong>Setu ({todayWukuRange.endDate})</strong>.
                </p>
                <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs text-amber-100">
                  <strong>Peringatan Minggu Ini:</strong> Hindari memulai hajat besar pada hari Taliwangke wuku ini, yaitu <strong>{todayWukuDetail.pantanganDanNaas.taliwangke.hari} {todayWukuDetail.pantanganDanNaas.taliwangke.pasaran}</strong>.
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/15 space-y-2 text-xs text-slate-200">
                <h4 className="font-extrabold text-amber-300 uppercase text-[11px]">Ciri Wuku Minggu Ini</h4>
                <p><strong>Bethara:</strong> {todayWukuDetail.dewa.nama}</p>
                <p><strong>Pohon:</strong> {todayWukuDetail.pohon.nama}</p>
                <p><strong>Burung:</strong> {todayWukuDetail.burung.nama}</p>
                <p><strong>Candran:</strong> "{todayWukuDetail.candran.teksJawa}"</p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedWukuDetail(todayWukuDetail)}
                    className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl transition text-center"
                  >
                    Baca Lengkap Serat Wuku Ini
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 30 Wukus Ordered Sequence Timeline */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-600" />
              <span>Urutan 30 Wuku dalam Satu Siklus 210 Hari</span>
            </h3>
            <p className="text-xs text-slate-600">
              Satu siklus Pawukon terdiri dari 30 Wuku @ 7 hari = 210 hari. Setelah Wuku ke-30 (Watugunung) berakhir, siklus akan kembali bergulir ke Wuku ke-1 (Sinta).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2.5 pt-2">
              {DAFTAR_30_WUKU.map((w) => {
                const isCurrent = w.nomor === todayWukuDetail.nomor;
                return (
                  <button
                    key={w.nomor}
                    type="button"
                    onClick={() => setSelectedWukuDetail(w)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 border-amber-600 font-extrabold shadow-md scale-102 ring-2 ring-amber-300'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span>#{w.nomor}</span>
                      {isCurrent && <span className="bg-slate-950 text-amber-300 px-1.5 py-0.2 rounded-full font-black">Aktif</span>}
                    </div>
                    <div className="font-extrabold text-xs sm:text-sm mt-1">{w.nama}</div>
                    <div className="text-[10px] opacity-80 font-serif">{w.aksaraJawa}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: TABEL TALIWANGKE & HARI NAAS */}
      {/* ========================================================================= */}
      {activeSubTab === 'pantangan' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Tabel 30 Hari Pantangan Taliwangke & Samparwangke
                </h3>
                <p className="text-xs text-slate-500">
                  Pedoman resmi Kitab Betaljemur Adammakna untuk memproteksi hajatan keluarga
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-bold">
                    <th className="p-3 rounded-tl-xl">No</th>
                    <th className="p-3">Nama Wuku</th>
                    <th className="p-3">Bethara Pelindung</th>
                    <th className="p-3 text-rose-300">Taliwangke (Dina & Pasaran)</th>
                    <th className="p-3 text-amber-300">Samparwangke</th>
                    <th className="p-3 rounded-tr-xl">Arah Kala</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {DAFTAR_30_WUKU.map((w, idx) => (
                    <tr
                      key={w.nomor}
                      className={idx % 2 === 0 ? 'bg-white hover:bg-amber-50/50' : 'bg-slate-50 hover:bg-amber-50/50'}
                    >
                      <td className="p-3 font-bold text-slate-500">{w.nomor}</td>
                      <td className="p-3 font-extrabold text-slate-900">
                        {w.nama} <span className="text-slate-400 font-serif font-normal">({w.aksaraJawa})</span>
                      </td>
                      <td className="p-3 text-slate-700">{w.dewa.nama}</td>
                      <td className="p-3 font-bold text-rose-900 bg-rose-50/50">
                        {w.pantanganDanNaas.taliwangke.hari} {w.pantanganDanNaas.taliwangke.pasaran}
                      </td>
                      <td className="p-3 font-bold text-amber-900 bg-amber-50/50">
                        {w.pantanganDanNaas.samparwangke.hari} {w.pantanganDanNaas.samparwangke.pasaran}
                      </td>
                      <td className="p-3 text-slate-600">{w.pantanganDanNaas.kalaWuku}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL SERAT LENGKAP DETAIL WUKU */}
      {/* ========================================================================= */}
      {selectedWukuDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5 my-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-sm">
                  {selectedWukuDetail.nomor}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <span>WUKU {selectedWukuDetail.nama.toUpperCase()}</span>
                    <span className="text-amber-800 font-serif text-base font-normal">({selectedWukuDetail.aksaraJawa})</span>
                  </h3>
                  <p className="text-xs text-slate-500">{selectedWukuDetail.tokohAsal}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedWukuDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <span className="text-[10px] font-black uppercase text-amber-900">Candran Wuku:</span>
              <p className="text-sm font-serif italic text-amber-950 font-bold">"{selectedWukuDetail.candran.teksJawa}"</p>
              <p className="text-xs text-slate-700">{selectedWukuDetail.candran.artian}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>Bethara:</strong> {selectedWukuDetail.dewa.nama} ({selectedWukuDetail.dewa.gelar})
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>Pohon:</strong> {selectedWukuDetail.pohon.nama} &mdash; {selectedWukuDetail.pohon.makna}
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>Burung:</strong> {selectedWukuDetail.burung.nama} &mdash; {selectedWukuDetail.burung.makna}
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>Gedhong:</strong> {selectedWukuDetail.gedhong.posisi}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-slate-900">Watak & Sifat Lahir</h4>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                {selectedWukuDetail.watakLahir.ringkasanWatak}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-rose-900">Hari Naas Wuku</h4>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 bg-rose-100 text-rose-900 rounded-xl text-xs font-bold">
                  Taliwangke: {selectedWukuDetail.pantanganDanNaas.taliwangke.hari} {selectedWukuDetail.pantanganDanNaas.taliwangke.pasaran}
                </span>
                <span className="px-3 py-1.5 bg-amber-100 text-amber-900 rounded-xl text-xs font-bold">
                  Samparwangke: {selectedWukuDetail.pantanganDanNaas.samparwangke.hari} {selectedWukuDetail.pantanganDanNaas.samparwangke.pasaran}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedWukuDetail(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL PRINT PIAGAM WATAK WUKU */}
      {/* ========================================================================= */}
      {showPrintCertificate && birthWeton && birthWukuDetail && (
        <PiagamPetungModal
          isOpen={showPrintCertificate}
          onClose={() => setShowPrintCertificate(false)}
          data={{
            judulPiagam: `Serat Piagam Watak Wuku ${birthWukuDetail.nama.toUpperCase()}`,
            nomorSurat: `WJ-WUKU-${birthWukuDetail.nomor.toString().padStart(2, '0')}-${birthWeton.neptuTotal}`,
            tanggalMasehi: birthDate,
            tanggalJawa: `${birthWeton.tahunJawa}`,
            pihakSatu: {
              label: 'Penyandang Wuku',
              nama: userName || 'Pribadi Penyandang Wuku',
              weton: `${birthWeton.hari} ${birthWeton.pasaran}`,
              neptu: birthWeton.neptuTotal,
              wuku: `${birthWukuDetail.nama} (Ke-${birthWukuDetail.nomor})`,
            },
            ringkasanHasil: {
              kategoriUtama: `Dewa: ${birthWukuDetail.dewa.nama} • Pohon: ${birthWukuDetail.pohon.nama}`,
              skorAtauSisa: `Candran: "${birthWukuDetail.candran.teksJawa}"`,
              maknaAdat: birthWukuDetail.watakLahir.ringkasanWatak,
              rekomendasiLuhur: `Burung ${birthWukuDetail.burung.nama}. ${birthWukuDetail.potensiRezekiDanKarir.bidangKarirSesuai.join(', ')}. Disarankan waspada pada hari Taliwangke (${birthWukuDetail.pantanganDanNaas.taliwangke.hari} ${birthWukuDetail.pantanganDanNaas.taliwangke.pasaran}).`,
            },
            catatanKhusus: [
              `Aksara Jawa: ${birthWukuDetail.aksaraJawa}`,
              `Hari Taliwangke: ${birthWukuDetail.pantanganDanNaas.taliwangke.hari} ${birthWukuDetail.pantanganDanNaas.taliwangke.pasaran} (${birthWukuDetail.pantanganDanNaas.taliwangke.keterangan})`,
              `Hari Samparwangke: ${birthWukuDetail.pantanganDanNaas.samparwangke.hari} ${birthWukuDetail.pantanganDanNaas.samparwangke.pasaran}`,
              `Arah Larangan Kala: ${birthWukuDetail.pantanganDanNaas.kalaWuku}`,
            ],
          }}
        />
      )}
    </div>
  );
};
