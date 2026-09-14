import React from 'react';
import { useWetonPantangan } from '../context/WetonPantanganContext';
import { ShieldAlert, Plus, ShieldCheck } from 'lucide-react';

interface WetonPantanganBannerProps {
  onOpenModal: () => void;
  modulName?: string;
  matchedPantangan?: string | null;
}

export const WetonPantanganBanner: React.FC<WetonPantanganBannerProps> = ({
  onOpenModal,
  modulName = 'modul ini',
  matchedPantangan,
}) => {
  const { activePantanganList } = useWetonPantangan();

  return (
    <div className="space-y-2">
      {/* Alert Bahaya jika tanggal yang dipilih menabrak Weton Pantangan */}
      {matchedPantangan && (
        <div className="bg-rose-600 text-white p-3 rounded-xl shadow-md border border-rose-700 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-200" />
          <div className="text-xs sm:text-sm flex-1">
            <span className="font-bold block uppercase tracking-wide">
              Peringatan Keras Pantangan Adat!
            </span>
            <p className="mt-0.5 text-rose-100 leading-relaxed">
              Tanggal yang Anda pilih atau evaluasi menabrak <strong>{matchedPantangan}</strong>. Menurut Kitab Betaljemur Adammakna, hari ini dipantangi untuk hajat besar keluarga. Sangat dianjurkan menggeser ke hari aman lainnya.
            </p>
          </div>
        </div>
      )}

      {/* Bar Status Weton Pantangan Aktif */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-maroon-950 text-white rounded-xl p-3 sm:p-3.5 shadow-sm border border-amber-900/30 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0">
            {activePantanganList.length > 0 ? (
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Proteksi Weton Pantangan
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
                {activePantanganList.length} Hari Dihindari
              </span>
            </div>
            <p className="text-[11px] text-slate-300 truncate">
              {activePantanganList.length > 0
                ? activePantanganList.map((p) => `${p.hari} ${p.pasaran}`).join(', ')
                : 'Belum ada weton pantangan yang diset. Seluruh hari dihitung standar.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Kelola Pantangan ({activePantanganList.length})
          </button>
        </div>
      </div>
    </div>
  );
};
