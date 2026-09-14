import React, { useState } from 'react';
import { Compass, Sparkles, HeartHandshake, ShieldAlert, ChevronRight, CalendarDays, RefreshCw } from 'lucide-react';
import { PranataMangsaInfo, WetonInfo } from '../types/weton';

interface WetonBalanceCardProps {
  todayWeton: WetonInfo;
  todayPranata: PranataMangsaInfo;
  onOpenQuickWeton: () => void;
  onNavigate: (tab: 'nikah' | 'jodoh' | 'hajat' | 'pantangan' | 'firasat' | 'gas') => void;
}

export const WetonBalanceCard: React.FC<WetonBalanceCardProps> = ({
  todayWeton,
  todayPranata,
  onOpenQuickWeton,
  onNavigate,
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-rose-950 text-white rounded-3xl p-4 sm:p-5 shadow-xl border border-blue-800/80 relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-rose-600/10 blur-2xl pointer-events-none" />
      <div className="absolute -left-8 -bottom-8 w-44 h-44 rounded-full bg-blue-600/15 blur-2xl pointer-events-none" />

      {/* Top Bar inside Card */}
      <div className="flex items-center justify-between border-b border-blue-800/60 pb-3 mb-3.5">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="text-[11px] font-bold tracking-wider text-rose-300 uppercase">
            Saldo Neptu & Weton Dina Iki
          </span>
        </div>
        <div className="flex items-center space-x-1.5 bg-blue-900/60 border border-blue-700/50 px-2.5 py-0.5 rounded-full text-[11px] text-blue-200">
          <span>Tahun Jawa:</span>
          <span className="font-bold text-white">{todayWeton.tahunJawa}</span>
        </div>
      </div>

      {/* Main Info Display */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center mb-4">
        <div className="sm:col-span-7">
          <div className="text-xs text-blue-300 font-medium">Hari & Pasaran:</div>
          <div className="flex items-baseline space-x-2.5 mt-0.5">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {todayWeton.hari} {todayWeton.pasaran}
            </h2>
            <div className="bg-gradient-to-r from-rose-800 to-rose-900 text-rose-100 text-xs px-2.5 py-1 rounded-full font-bold border border-rose-500/40 shadow-sm">
              Neptu {todayWeton.neptuTotal}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mt-2 text-xs text-blue-200">
            <span className="bg-blue-900/80 px-2 py-0.5 rounded-md border border-blue-700/40">
              Wuku: <strong>{todayWeton.wuku}</strong> ({todayWeton.wukuIndex}/30)
            </span>
            <span className="bg-blue-900/80 px-2 py-0.5 rounded-md border border-blue-700/40">
              Unsur: <strong>{todayWeton.lambangUnsur.split(' ')[0]}</strong>
            </span>
            {todayWeton.isTaliwangke && (
              <span className="bg-rose-950 text-rose-300 px-2 py-0.5 rounded-md border border-rose-700 font-semibold">
                ⚠️ Taliwangke
              </span>
            )}
            {todayWeton.isSamparwangke && (
              <span className="bg-rose-950 text-rose-300 px-2 py-0.5 rounded-md border border-rose-700 font-semibold">
                ⚠️ Samparwangke
              </span>
            )}
          </div>
        </div>

        {/* Pranata Mangsa Side Banner */}
        <div className="sm:col-span-5 bg-blue-950/60 border border-blue-800/80 rounded-2xl p-3 text-xs">
          <div className="flex items-center justify-between text-rose-300 text-[10px] font-bold uppercase tracking-wider mb-1">
            <span>Pranata Mangsa</span>
            <span>Ke-{todayPranata.nomor}</span>
          </div>
          <div className="font-bold text-white text-sm">{todayPranata.nama}</div>
          <div className="text-[11px] text-blue-200 italic line-clamp-1 mt-0.5">
            "{todayPranata.candra}"
          </div>
          <div className="text-[10px] text-blue-300/80 mt-1 line-clamp-1">
            {todayPranata.artianCandra}
          </div>
        </div>
      </div>

      {/* 4 Gojek-Style Quick Action Tiles */}
      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-blue-800/60">
        <button
          onClick={onOpenQuickWeton}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-blue-900/40 hover:bg-blue-800/60 border border-blue-700/40 transition group"
        >
          <div className="w-9 h-9 rounded-full bg-blue-600/40 text-blue-200 flex items-center justify-center mb-1 group-hover:scale-110 transition border border-blue-400/30">
            <RefreshCw className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-medium text-blue-100 text-center leading-tight">
            Cek Weton
          </span>
        </button>

        <button
          onClick={() => onNavigate('nikah')}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-rose-900/30 hover:bg-rose-900/50 border border-rose-700/40 transition group"
        >
          <div className="w-9 h-9 rounded-full bg-rose-700/40 text-rose-200 flex items-center justify-center mb-1 group-hover:scale-110 transition border border-rose-400/30">
            <CalendarDays className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-medium text-rose-100 text-center leading-tight">
            Hari Nikah
          </span>
        </button>

        <button
          onClick={() => onNavigate('jodoh')}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-rose-900/30 hover:bg-rose-900/50 border border-rose-700/40 transition group"
        >
          <div className="w-9 h-9 rounded-full bg-rose-700/40 text-rose-200 flex items-center justify-center mb-1 group-hover:scale-110 transition border border-rose-400/30">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-medium text-rose-100 text-center leading-tight">
            Salaki-Rabi
          </span>
        </button>

        <button
          onClick={() => onNavigate('pantangan')}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-blue-900/40 hover:bg-blue-800/60 border border-blue-700/40 transition group"
        >
          <div className="w-9 h-9 rounded-full bg-blue-600/40 text-blue-200 flex items-center justify-center mb-1 group-hover:scale-110 transition border border-blue-400/30">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-medium text-blue-100 text-center leading-tight">
            Arah Pantangan
          </span>
        </button>
      </div>
    </div>
  );
};
