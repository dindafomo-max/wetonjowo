import React, { useState } from 'react';
import { X, Calendar, Sparkles, Compass, ShieldAlert, Award } from 'lucide-react';
import { hitungWetonLengkap, getDeviceLocalDateString } from '../utils/javaneseCalendar';
import { WetonInfo } from '../types/weton';

interface WetonDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDateStr?: string;
}

export const WetonDetailModal: React.FC<WetonDetailModalProps> = ({
  isOpen,
  onClose,
  defaultDateStr,
}) => {
  const [selectedDate, setSelectedDate] = useState(() => defaultDateStr || getDeviceLocalDateString());
  const weton = hitungWetonLengkap(selectedDate);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-rose-950 text-white p-4 sm:p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
              Analisis Primbon Otentik
            </span>
            <h3 className="text-lg font-black text-white">Bedah Weton & Karakter Neptu</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Date Selector */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Pilih Tanggal Lahir / Tanggal Hajat:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 outline-none font-semibold"
            />
          </div>

          {/* Primary Weton Banner */}
          <div className="bg-gradient-to-br from-blue-950 to-slate-900 text-white rounded-2xl p-4 space-y-2 border border-blue-800">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-blue-300 font-bold uppercase">Weton Lahir:</span>
                <h4 className="text-2xl font-black text-white">
                  {weton.hari} {weton.pasaran}
                </h4>
              </div>
              <div className="bg-rose-800 border border-rose-400 text-rose-100 px-3 py-1 rounded-full text-xs font-black">
                Neptu {weton.neptuTotal}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-blue-200">
              <span className="bg-blue-900/60 px-2 py-0.5 rounded-md border border-blue-700/40">
                Wuku <strong>{weton.wuku}</strong> ({weton.wukuIndex}/30)
              </span>
              <span className="bg-blue-900/60 px-2 py-0.5 rounded-md border border-blue-700/40">
                Tahun Jawa: <strong>{weton.tahunJawa}</strong> ({weton.namaTahun})
              </span>
              <span className="bg-blue-900/60 px-2 py-0.5 rounded-md border border-blue-700/40">
                Windu: <strong>{weton.windu}</strong>
              </span>
            </div>
          </div>

          {/* Karakter & Unsur */}
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-rose-900">
                <Sparkles className="w-3.5 h-3.5 text-rose-700" />
                <span>Simbol Watak Lahir (Berdasarkan Neptu {weton.neptuTotal}):</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {weton.watakLahir}
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-blue-900">
                <Compass className="w-3.5 h-3.5 text-blue-700" />
                <span>Orientasi Ruang & Arah Naga Dina:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Arah Kepala Naga Dina:</span>
                  <strong className="text-slate-900">{weton.nagaDina}</strong>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Arah Kala Hari:</span>
                  <strong className="text-rose-900">{weton.kalaHari}</strong>
                </div>
              </div>
            </div>

            {/* Status Larangan Hari */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-[11px]">
              <div className="font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider text-amber-900">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>Status Adat Hari Ini:</span>
              </div>
              {weton.keteranganAdat.length > 0 ? (
                <ul className="list-disc list-inside text-rose-900 font-semibold space-y-0.5">
                  {weton.keteranganAdat.map((k, idx) => (
                    <li key={idx}>{k}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-emerald-700 font-semibold">
                  Hari ini netral dan bebas dari pantangan Taliwangke, Samparwangke, maupun Dina Sangar.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-3 text-center border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 rounded-xl text-xs transition"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};
