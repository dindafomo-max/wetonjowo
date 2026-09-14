import React, { useState, useMemo } from 'react';
import { Compass, X, Calendar, Clock, AlertTriangle, Sparkles, CheckCircle2, ChevronRight, Navigation } from 'lucide-react';
import { hitungWetonLengkap, getDeviceLocalDateString } from '../utils/javaneseCalendar';
import { hitungPetungArahLengkap } from '../data/nagaDinaData';

interface ArahRejekiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreFullModule?: () => void;
}

export const ArahRejekiModal: React.FC<ArahRejekiModalProps> = ({ isOpen, onClose, onExploreFullModule }) => {
  const [tanggal, setTanggal] = useState<string>(() => getDeviceLocalDateString());

  const weton = useMemo(() => {
    return hitungWetonLengkap(tanggal);
  }, [tanggal]);

  const petung = useMemo(() => {
    return hitungPetungArahLengkap(weton);
  }, [weton]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-2xs">
              🧭
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Kompas Arah Rezeki & Naga Dina
              </h2>
              <p className="text-xs text-slate-600">
                Kitab Betaljemur Adammakna Bab Sandang Pangan
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Pilih Tanggal */}
          <div className="flex items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="text-xs">
              <span className="text-slate-500 block text-[11px]">Hari & Weton Acuan:</span>
              <strong className="text-slate-900 text-sm">
                {weton.hari} {weton.pasaran} (Neptu {weton.neptuTotal})
              </strong>
            </div>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="bg-white border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Radar Kompas Visual 8 Arah */}
          <div className="relative w-52 h-52 mx-auto rounded-full bg-slate-950 border-4 border-amber-600/40 p-2 flex items-center justify-center shadow-inner">
            {/* Sumbu Silang Kompas */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-amber-500/20"></div>
            <div className="absolute inset-y-0 left-1/2 w-px bg-amber-500/20"></div>

            {/* Label 8 Mata Angin */}
            <div className={`absolute top-2 text-[10px] font-black px-2 py-0.5 rounded-md ${
              petung.nagaDina.arahSandang.includes('Utara')
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : petung.nagaDina.pantanganUtama.includes('Utara')
                ? 'bg-rose-600 text-white'
                : 'text-slate-400'
            }`}>
              U (Lor)
            </div>
            <div className={`absolute bottom-2 text-[10px] font-black px-2 py-0.5 rounded-md ${
              petung.nagaDina.arahSandang.includes('Selatan')
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : petung.nagaDina.pantanganUtama.includes('Selatan')
                ? 'bg-rose-600 text-white'
                : 'text-slate-400'
            }`}>
              S (Kidul)
            </div>
            <div className={`absolute right-2 text-[10px] font-black px-2 py-0.5 rounded-md ${
              petung.nagaDina.arahSandang.includes('Timur')
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : petung.nagaDina.pantanganUtama.includes('Timur')
                ? 'bg-rose-600 text-white'
                : 'text-slate-400'
            }`}>
              T (Wetan)
            </div>
            <div className={`absolute left-2 text-[10px] font-black px-2 py-0.5 rounded-md ${
              petung.nagaDina.arahSandang.includes('Barat')
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : petung.nagaDina.pantanganUtama.includes('Barat')
                ? 'bg-rose-600 text-white'
                : 'text-slate-400'
            }`}>
              B (Kulon)
            </div>

            {/* Pusat Kompas */}
            <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex flex-col items-center justify-center shadow-xs border-2 border-white z-10 text-center">
              <span className="text-[9px] uppercase leading-none">Naga</span>
              <span className="text-[10px] leading-tight font-black">{weton.hari}</span>
            </div>
          </div>

          {/* Rincian Petunjuk Arah */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Arah Rezeki & Sandang:
              </span>
              <p className="text-sm font-black text-emerald-950">
                {petung.nagaDina.arahSandang}
              </p>
              <p className="text-[11px] text-emerald-700">
                Pangan di {petung.nagaDina.arahPangan}
              </p>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 space-y-1">
              <span className="text-[10px] font-bold text-rose-800 uppercase flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-600" />
                Cangkem Naga (Pantangan):
              </span>
              <p className="text-sm font-black text-rose-950">
                {petung.nagaDina.pantanganUtama}
              </p>
              <p className="text-[11px] text-rose-700">
                Posisi kepala naga hari, hindari beradu muka.
              </p>
            </div>
          </div>

          {/* Jam-Jam Keberuntungan */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Waktu Keberuntungan (*Saat Berkah*):
            </span>
            <div className="flex flex-wrap gap-2">
              {petung.jamBerkahHariIni.map((jam) => (
                <span
                  key={jam.waktu}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${
                    jam.kategori.includes('Berkah') || jam.kategori.includes('Kamulyan')
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  {jam.jam} ({jam.waktu})
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-600 italic bg-amber-50/70 p-3 rounded-xl border border-amber-200">
            <strong>Kaidah Laku:</strong> {petung.nagaDina.kaidahLaku}
          </p>
        </div>

        {/* Footer Modal */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
          {onExploreFullModule ? (
            <button
              type="button"
              onClick={onExploreFullModule}
              className="flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 transition"
            >
              <span>Buka Modul Penuh 8 Arah</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : <div />}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

