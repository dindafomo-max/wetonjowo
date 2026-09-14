import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Sparkles,
  Heart,
  LogIn,
  LogOut,
  User,
  ShieldCheck,
  Volume2,
  VolumeX,
  BookOpen,
  Users,
  Menu,
  ChevronRight,
  Home,
  LayoutGrid
} from 'lucide-react';
import { TabView } from '../types/weton';
import { useAuth } from '../context/AuthContext';

interface HeaderNavProps {
  activeTab: TabView['id'];
  setActiveTab: (tab: TabView['id']) => void;
  onSearch: (query: string) => void;
  todayWetonStr: string;
  onOpenGlosarium: () => void;
  onOpenKeluarga: () => void;
  isGamelanPlaying: boolean;
  onToggleGamelan: () => void;
  onToggleSidebarMobile: () => void;
}

const TAB_TITLES: Record<TabView['id'], { title: string; category: string }> = {
  beranda: { title: 'Prakata & Beranda Utama', category: 'Utama' },
  kalender: { title: 'Kalender Abadi Jawa Tri-Penanggalan', category: 'Penanggalan' },
  nikah: { title: 'Kalkulator Ijab Kabul & Jam Akad', category: 'Perjodohan' },
  jodoh: { title: 'Salaki-Rabi & Pancasuda', category: 'Perjodohan' },
  islam: { title: 'Hukum Islam, Hadits & Fikih Slametan', category: 'Syariat' },
  wirid: { title: 'Kumpulan Wirid & Doa Harian Weton', category: 'Syariat & Doa' },
  wuku: { title: '30 Wuku Pawukon & Watak Lahir', category: 'Astrologi' },
  nagadina: { title: 'Naga Dina & Kompas Rezeki', category: 'Astrologi' },
  rejeki: { title: 'Rezeki Pal Srigati (Siklus 6 Tahun)', category: 'Rezeki' },
  jayabaya: { title: '7 Satriya Jayabaya & Siklus Zaman', category: 'Filsafat' },
  ruwatan: { title: 'Ruwatan Sukerta & Tolak Bala', category: 'Ruwatan' },
  hajat: { title: 'Daur Hidup & Boyongan Wisma', category: 'Hajat' },
  pantangan: { title: 'Proteksi Silsilah & Weton Pantangan', category: 'Proteksi' },
  firasat: { title: 'Ensiklopedi Firasat & Kedutan', category: 'Firasat' },
  analitik: { title: 'Dashboard Analitik Tren (Admin)', category: 'Sistem' },
  gas: { title: 'Panel Admin & Database GAS', category: 'Sistem' },
};

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  onSearch,
  todayWetonStr,
  onOpenGlosarium,
  onOpenKeluarga,
  isGamelanPlaying,
  onToggleGamelan,
  onToggleSidebarMobile,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isLoggedIn, isAdmin, logout, setIsLoginModalOpen, setIsDonationModalOpen } = useAuth();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const getPlanBadge = (role: string, isAdm: boolean) => {
    if (isAdm) return { text: 'Admin Sistem', color: 'bg-amber-400 text-amber-950 font-black' };
    return { text: 'Akun Terverifikasi', color: 'bg-emerald-600 text-white font-bold' };
  };

  const planBadge = user ? getPlanBadge(user.role, isAdmin) : null;
  const currentTabMeta = TAB_TITLES[activeTab] || { title: 'Weton Jowo', category: 'Petung' };

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-blue-950 via-slate-900 to-rose-950 text-white shadow-lg border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5">
        {/* Top Actions & Search Bar */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Mobile Sidebar Trigger & Brand Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Hamburger Button for Mobile / Tablet */}
            <button
              type="button"
              onClick={onToggleSidebarMobile}
              className="lg:hidden p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700 transition flex items-center justify-center shrink-0 shadow-xs"
              aria-label="Buka Menu Modul"
            >
              <Menu className="w-5 h-5 text-rose-300" />
            </button>

            {/* Brand Logo (Visible on mobile or when breadcrumb) */}
            <div
              className="flex items-center gap-2 cursor-pointer min-w-0"
              onClick={() => setActiveTab('beranda')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-700 to-blue-600 flex items-center justify-center shadow-inner border border-rose-400/40 text-white font-serif font-black text-lg shrink-0">
                ☸
              </div>
              <div className="min-w-0 hidden xs:block">
                <div className="flex items-center gap-1.5 leading-tight">
                  <h1 className="font-black text-xs sm:text-sm tracking-wide text-white truncate">
                    WETON JOWO
                  </h1>
                  <span className="text-[8px] px-1.5 py-0.2 rounded-full bg-rose-900 text-rose-200 border border-rose-500/40 font-bold uppercase hidden sm:inline-block">
                    Primbon
                  </span>
                </div>
                {/* Active Module Indicator */}
                <div className="flex items-center gap-1 text-[10px] text-blue-200/80 truncate">
                  <span className="text-slate-400 font-semibold">{currentTabMeta.category}</span>
                  <ChevronRight className="w-2.5 h-2.5 text-slate-500" />
                  <span className="text-rose-300 font-bold truncate">{currentTabMeta.title}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center / Search Input (Adaptive Width) */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md min-w-[120px]">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  onSearch(e.target.value);
                }}
                placeholder="Cari firasat, arti wuku, atau hajat..."
                className="w-full bg-slate-800/90 text-slate-100 placeholder-slate-400 text-xs pl-8 sm:pl-9 pr-14 sm:pr-18 py-1.5 sm:py-2 rounded-full border border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />

              <button
                type="submit"
                className="absolute right-1 bg-gradient-to-r from-blue-700 to-rose-700 hover:from-blue-600 hover:to-rose-600 text-white text-[11px] font-bold px-2.5 py-0.5 sm:py-1 rounded-full transition shadow-xs"
              >
                Cari
              </button>
            </div>
          </form>

          {/* Right Action Icons: Gamelan, Glosarium, Trah, DANA, User */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Audio Gamelan Synthesizer Ambient Toggle */}
            <button
              type="button"
              onClick={onToggleGamelan}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl transition flex items-center gap-1 border text-xs font-bold ${
                isGamelanPlaying
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title={isGamelanPlaying ? 'Matikan Suara Gamelan' : 'Bunyikan Gamelan Suasana Keraton'}
            >
              {isGamelanPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-slate-950" />
                  <span className="hidden md:inline">Gamelan On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 opacity-70" />
                  <span className="hidden lg:inline">Gamelan</span>
                </>
              )}
            </button>

            {/* Glosarium Primbon Button (Tablet/Desktop) */}
            <button
              type="button"
              onClick={onOpenGlosarium}
              className="hidden sm:flex bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-bold p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl transition items-center gap-1"
              title="Kamus Istilah Primbon & Astrologi Jawa"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="hidden xl:inline">Kamus Istilah</span>
            </button>

            {/* Buku Trah Keluarga Button (Desktop) */}
            <button
              type="button"
              onClick={onOpenKeluarga}
              className="hidden md:flex bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 text-xs font-bold p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl transition items-center gap-1"
              title="Buku Catatan Trah Keluarga & Pengingat Geblak"
            >
              <Users className="w-4 h-4 text-rose-300" />
              <span className="hidden xl:inline">Trah Keluarga</span>
            </button>

            {/* Donasi DANA Button */}
            <button
              type="button"
              onClick={() => setIsDonationModalOpen(true)}
              className="bg-[#118EEA] hover:bg-[#0E71BC] active:scale-95 text-white text-xs font-bold p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl transition shadow-xs flex items-center gap-1"
              title="Kirim donasi tali asih via E-Wallet DANA"
            >
              <Heart className="w-4 h-4 text-white fill-white" />
              <span className="hidden md:inline">DANA</span>
            </button>

            {/* Gmail Account Profile / Login Button */}
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 p-1 sm:px-2 sm:py-1 rounded-xl transition"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-rose-600 to-blue-600 text-white font-black text-xs flex items-center justify-center border border-white/30 shrink-0">
                    {user.nama.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-[11px] font-bold text-white leading-tight max-w-[90px] truncate">
                      {user.nama}
                    </div>
                  </div>
                </button>

                {/* Dropdown User Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 animate-fadeIn">
                    <div className="p-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900 truncate">{user.nama}</div>
                      <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                      {planBadge && (
                        <div className={`mt-1 text-[10px] px-2 py-0.5 rounded-full inline-block ${planBadge.color}`}>
                          {planBadge.text}
                        </div>
                      )}
                    </div>

                    <div className="py-1 space-y-1 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenKeluarga();
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 font-medium flex items-center gap-2"
                      >
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        <span>Buku Trah Keluarga</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenGlosarium();
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 font-medium flex items-center gap-2"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        <span>Kamus Istilah Primbon</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setIsDonationModalOpen(true);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 font-medium flex items-center gap-2"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                        <span>Donasi Tali Asih DANA</span>
                      </button>

                      {isAdmin && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setActiveTab('analitik');
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-950 font-bold flex items-center gap-2 border border-blue-200"
                          >
                            <span>📊</span>
                            <span>Dashboard Analitik</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setActiveTab('gas');
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold flex items-center gap-2 border border-amber-200"
                          >
                            <span>⚙️</span>
                            <span>Panel Admin (GAS)</span>
                          </button>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-50 text-rose-600 font-medium flex items-center gap-2 border-t border-slate-100"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Keluar Akun</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-white hover:bg-slate-100 active:scale-95 text-slate-950 text-xs font-black px-2.5 sm:px-3 py-1.5 rounded-xl transition shadow-sm flex items-center gap-1.5 shrink-0"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.96 0 12s.46 3.84 1.26 5.42l4.02-3.15Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                  />
                </svg>
                <span className="hidden sm:inline">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
