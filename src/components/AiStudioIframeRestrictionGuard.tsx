import React from 'react';
import { ShieldAlert, ExternalLink, LogOut, Lock, UserCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AiStudioIframeRestrictionGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoggedIn, logout } = useAuth();

  // Detect if app is currently executing inside an iframe (such as Google AI Studio preview window)
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  // If user is logged in with Gmail AND inside AI Studio iframe, block access to main app inside iframe
  if (isLoggedIn && user && isInIframe) {
    const handleOpenInNewTab = () => {
      window.open(window.location.href, '_blank', 'noopener,noreferrer');
    };

    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 font-sans antialiased relative overflow-hidden">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-center space-y-6 backdrop-blur-md">
          {/* Top Shield Badge */}
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5 shadow-lg shadow-rose-900/40">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <Lock className="w-8 h-8 text-rose-400" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[11px] font-extrabold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Akses Dibatasi di Google AI Studio</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Aplikasi Utama Terkunci
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Demi keamanan akun Gmail Anda dan menjaga kerahasiaan data silsilah keluarga, aplikasi utama yang berstatus <strong>Terhubung (Login)</strong> tidak diizinkan berjalan di dalam bingkai (*iframe*) Google AI Studio.
            </p>
          </div>

          {/* User Profile Card */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left flex items-center gap-3">
            <img
              src={user.avatarUrl}
              alt={user.nama}
              className="w-11 h-11 rounded-full bg-indigo-900/80 border border-indigo-500/40 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                <span>{user.nama}</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded font-bold">
                  Terverifikasi
                </span>
              </div>
              <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleOpenInNewTab}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 hover:from-blue-500 hover:to-rose-500 text-white text-xs sm:text-sm font-extrabold rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Buka Aplikasi Utama di Tab Baru</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={logout}
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-2xl transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Akun (Logout) untuk Mode Preview</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Fitur Keamanan Otomatis WETON JOWO SAAS</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
