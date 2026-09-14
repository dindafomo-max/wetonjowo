import React, { useState, useMemo } from 'react';
import { Crown, X, Calendar, Shield, Sparkles, Award } from 'lucide-react';
import { hitungWetonLengkap, hitungSatriyaJayabaya, getDeviceLocalDateString } from '../utils/javaneseCalendar';

interface SatriyaJayabayaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreFullModule?: () => void;
}

export const SatriyaJayabayaModal: React.FC<SatriyaJayabayaModalProps> = ({
  isOpen,
  onClose,
  onExploreFullModule,
}) => {
  const [tanggal, setTanggal] = useState<string>(() => getDeviceLocalDateString());

  const weton = useMemo(() => {
    return hitungWetonLengkap(tanggal);
  }, [tanggal]);

  const satriya = useMemo(() => {
    return hitungSatriyaJayabaya(weton.neptuTotal);
  }, [weton]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-2xs">
              👑
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Karakter 7 Satriya Jayabaya
              </h2>
              <p className="text-xs text-slate-600">
                Kolaborasi Jangka Jayabaya & Weton Kraton
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
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Pilih Tanggal Lahir */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
            <label htmlFor="modal-tgl-jayabaya" className="block text-xs font-bold text-slate-700">
              Pilih Tanggal Lahir Anda / Kerabat:
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                id="modal-tgl-jayabaya"
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Weton: <strong className="text-slate-800">{weton.hari} {weton.pasaran}</strong> (Neptu: {weton.neptuTotal}, Wuku: {weton.wuku}).
            </p>
          </div>

          {/* Kartu Satriya Jayabaya */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent p-5 rounded-2xl border border-amber-300/80 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 rounded-full">
                Satriya #{satriya.nomor}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Neptu Cocok: {satriya.neptuCocok.join(', ')}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">
                {satriya.nama}
              </h3>
              <p className="text-xs font-bold text-amber-800 italic">
                "{satriya.gelarSanskerta}"
              </p>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {satriya.karakterUtama}
            </p>

            <div className="pt-2 border-t border-amber-200/60 space-y-1">
              <span className="text-[11px] font-bold text-slate-600 block">
                Gaya Kepemimpinan:
              </span>
              <p className="text-xs text-slate-800 font-medium">
                {satriya.gayaKepemimpinan}
              </p>
            </div>

            <div className="bg-white/80 p-3 rounded-xl border border-amber-200 space-y-1">
              <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-600" />
                Piwulang Luhur:
              </span>
              <p className="text-xs text-slate-700 font-serif italic">
                {satriya.nasihatLuhur}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {onExploreFullModule && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onExploreFullModule();
              }}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 underline"
            >
              Buka Modul Jayabaya Lengkap →
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition ml-auto"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
