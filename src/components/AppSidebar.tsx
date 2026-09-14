import React, { useState, useMemo } from 'react';
import {
  Home,
  Calendar,
  CalendarHeart,
  HeartHandshake,
  Scale,
  Compass,
  TrendingUp,
  Crown,
  ShieldAlert,
  Home as HomeIcon,
  ShieldCheck,
  Eye,
  BarChart3,
  Database,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Search,
  BookOpen,
  Users,
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  Lock,
  ChevronDown
} from 'lucide-react';
import { TabView } from '../types/weton';
import { useAuth } from '../context/AuthContext';

export interface AppSidebarProps {
  activeTab: TabView['id'];
  setActiveTab: (tab: TabView['id']) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  isCollapsedDesktop: boolean;
  setIsCollapsedDesktop: (collapsed: boolean) => void;
  todayWetonStr: string;
  onOpenQuickWeton: () => void;
  onOpenGlosarium: () => void;
  onOpenKeluarga: () => void;
  isGamelanPlaying: boolean;
  onToggleGamelan: () => void;
}

interface NavCategory {
  title: string;
  items: {
    id: TabView['id'];
    title: string;
    subtitle?: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
    adminOnly?: boolean;
    isPublic?: boolean;
  }[];
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
  isCollapsedDesktop,
  setIsCollapsedDesktop,
  todayWetonStr,
  onOpenQuickWeton,
  onOpenGlosarium,
  onOpenKeluarga,
  isGamelanPlaying,
  onToggleGamelan,
}) => {
  const { user, isLoggedIn, isAdmin, requireAuth, setIsLoginModalOpen, setIsDonationModalOpen } = useAuth();
  const [filterQuery, setFilterQuery] = useState('');

  const navCategories: NavCategory[] = useMemo(
    () => [
      {
        title: 'Utama & Penanggalan',
        items: [
          {
            id: 'beranda',
            title: 'Prakata & Beranda',
            subtitle: 'Ringkasan & Panduan',
            icon: Home,
            isPublic: true,
          },
          {
            id: 'kalender',
            title: 'Kalender Abadi Jawa',
            subtitle: 'Tri-Penanggalan (Masehi/Hijriyah/Jawa)',
            icon: Calendar,
            badge: 'Lengkap',
            badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
            isPublic: true,
          },
        ],
      },
      {
        title: 'Perjodohan & Asmaragama',
        items: [
          {
            id: 'nikah',
            title: 'Kalkulator Ijab Kabul',
            subtitle: 'Petung Hari Baik & Jam Akad',
            icon: CalendarHeart,
            badge: 'Populer',
            badgeColor: 'bg-pink-100 text-pink-800 border-pink-300',
          },
          {
            id: 'jodoh',
            title: 'Salaki-Rabi & Pancasuda',
            subtitle: 'Kompabilitas Pasangan & Sanggar Waringin',
            icon: HeartHandshake,
          },
        ],
      },
      {
        title: 'Syariat & Amalan Pesantren',
        items: [
          {
            id: 'islam',
            title: 'Hukum Islam & Hadits',
            subtitle: 'Fikih Slametan, Fiqh Sosial & Kaidah 5',
            icon: Scale,
            badge: 'Wasathiyah',
            badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          },
          {
            id: 'wirid',
            title: 'Wirid & Doa Harian Weton',
            subtitle: 'Dzikir Saptawara, Pancawara & Tasbih',
            icon: Sparkles,
            badge: 'Amalan Santri',
            badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
          },
        ],
      },
      {
        title: 'Astrologi & Navigasi Rezeki',
        items: [
          {
            id: 'wuku',
            title: '30 Wuku Pawukon',
            subtitle: 'Watak Lahir & Dewa Pelindung',
            icon: BookOpen,
          },
          {
            id: 'nagadina',
            title: 'Naga Dina & Kompas Arah',
            subtitle: 'Arah Rezeki & Larangan Bepergian',
            icon: Compass,
          },
          {
            id: 'rejeki',
            title: 'Rezeki Pal Srigati',
            subtitle: 'Fluktuasi Rezeki Siklus 6 Tahunan',
            icon: TrendingUp,
          },
        ],
      },
      {
        title: 'Filsafat, Zaman & Ruwatan',
        items: [
          {
            id: 'jayabaya',
            title: '7 Satriya Jayabaya',
            subtitle: 'Ramalan Siklus Zaman Kalabendu',
            icon: Crown,
          },
          {
            id: 'ruwatan',
            title: 'Ruwatan Sukerta',
            subtitle: 'Tolak Bala 60 Golongan Sukerto',
            icon: ShieldAlert,
          },
          {
            id: 'hajat',
            title: 'Daur Hidup & Boyongan',
            subtitle: 'Pindah Rumah & Usaha Baru',
            icon: HomeIcon,
          },
        ],
      },
      {
        title: 'Proteksi & Firasat',
        items: [
          {
            id: 'pantangan',
            title: 'Proteksi Silsilah & Adat',
            subtitle: 'Pantangan Weton & Etnosains',
            icon: ShieldCheck,
          },
          {
            id: 'firasat',
            title: 'Ensiklopedi Firasat',
            subtitle: 'Kedutan Tubuh & Isyarat Alam',
            icon: Eye,
          },
        ],
      },
      {
        title: 'Sistem & Administrasi',
        items: [
          {
            id: 'analitik',
            title: 'Dashboard Analitik',
            subtitle: 'Tren Pencarian & Weton Terpopuler',
            icon: BarChart3,
            badge: 'Admin',
            badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
            adminOnly: true,
          },
          {
            id: 'gas',
            title: 'Arsitektur Database & GAS',
            subtitle: 'Google Apps Script & Spreadsheet',
            icon: Database,
            badge: 'Admin',
            badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
            adminOnly: true,
          },
        ],
      },
    ],
    []
  );

  const handleSelectTab = (tabId: TabView['id'], isPublic?: boolean) => {
    setIsOpenMobile(false);
    if (isPublic || tabId === 'beranda') {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    requireAuth(() => {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  // Filter Categories & Items based on search
  const filteredCategories = useMemo(() => {
    if (!filterQuery.trim()) {
      return navCategories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) => !item.adminOnly || isAdmin),
        }))
        .filter((cat) => cat.items.length > 0);
    }

    const query = filterQuery.toLowerCase();
    return navCategories
      .map((cat) => ({
        ...cat,
        items: cat.items
          .filter((item) => !item.adminOnly || isAdmin)
          .filter(
            (item) =>
              item.title.toLowerCase().includes(query) ||
              (item.subtitle && item.subtitle.toLowerCase().includes(query)) ||
              (item.badge && item.badge.toLowerCase().includes(query))
          ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [navCategories, filterQuery, isAdmin]);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. MOBILE BACKDROP OVERLAY */}
      {/* ========================================================================= */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm lg:hidden transition-opacity duration-300 animate-fadeIn"
          aria-hidden="true"
        />
      )}

      {/* ========================================================================= */}
      {/* 2. SIDEBAR CONTAINER (DESKTOP & MOBILE DRAWER) */}
      {/* ========================================================================= */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-900 text-slate-100 border-r border-slate-800 shadow-2xl transition-all duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0 w-72 sm:w-80' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsedDesktop ? 'lg:w-20' : 'lg:w-72'}`}
      >
        {/* SIDEBAR HEADER / BRANDING */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800/90 flex items-center justify-between bg-gradient-to-r from-blue-950/90 via-slate-900 to-rose-950/80">
          <div
            className="flex items-center gap-2.5 cursor-pointer overflow-hidden"
            onClick={() => handleSelectTab('beranda', true)}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-700 to-blue-600 flex items-center justify-center shadow-md border border-rose-400/40 text-white font-serif font-black text-xl shrink-0">
              ☸
            </div>
            {(!isCollapsedDesktop || isOpenMobile) && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-black text-sm sm:text-base tracking-wider text-white">
                    WETON JOWO
                  </h2>
                  <span className="text-[8px] px-1.5 py-0.2 rounded-full bg-rose-900 text-rose-200 border border-rose-500/40 font-bold uppercase">
                    Primbon
                  </span>
                </div>
                <p className="text-[10px] text-blue-200/80 truncate">
                  Etnosains & Petung Lengkap
                </p>
              </div>
            )}
          </div>

          {/* Controls: Close (Mobile) or Collapse (Desktop) */}
          <div className="flex items-center">
            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setIsOpenMobile(false)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Tutup Sidebar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Desktop Collapse Toggle Button */}
            <button
              type="button"
              onClick={() => setIsCollapsedDesktop(!isCollapsedDesktop)}
              className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
              title={isCollapsedDesktop ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
            >
              {isCollapsedDesktop ? (
                <ChevronRight className="w-4 h-4 text-rose-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* SIDEBAR QUICK SEARCH / FILTER (Only when expanded) */}
        {(!isCollapsedDesktop || isOpenMobile) && (
          <div className="p-3 border-b border-slate-800/80 bg-slate-950/40">
            <div className="relative flex items-center">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Cari modul / petung..."
                className="w-full bg-slate-800/90 text-slate-100 placeholder-slate-400 text-xs pl-8 pr-7 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              {filterQuery && (
                <button
                  type="button"
                  onClick={() => setFilterQuery('')}
                  className="absolute right-2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* SIDEBAR NAVIGATION LIST */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4 no-scrollbar">
          {filteredCategories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-1">
              {/* Category Header (Only when expanded) */}
              {(!isCollapsedDesktop || isOpenMobile) && (
                <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>{cat.title}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                    {cat.items.length}
                  </span>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-0.5">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectTab(item.id, item.isPublic)}
                      title={isCollapsedDesktop && !isOpenMobile ? `${item.title}: ${item.subtitle || ''}` : undefined}
                      className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition-all relative group ${
                        isActive
                          ? 'bg-gradient-to-r from-rose-900/90 to-rose-950/80 text-white font-bold shadow-md border border-rose-600/50'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
                      }`}
                    >
                      {/* Active Left Indicator Bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-rose-400 rounded-r-full shadow-sm" />
                      )}

                      {/* Icon */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                          isActive
                            ? 'bg-rose-700 text-white shadow-xs scale-105'
                            : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700 group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Title, Subtitle, and Badge (Visible when expanded) */}
                      {(!isCollapsedDesktop || isOpenMobile) && (
                        <div className="flex-1 min-w-0 pr-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold truncate leading-tight">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span
                                className={`text-[8px] font-black px-1.5 py-0.2 rounded-full border shrink-0 ${
                                  item.badgeColor || 'bg-slate-700 text-slate-200 border-slate-600'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <p className="text-[10px] text-slate-400 truncate mt-0.5 leading-tight group-hover:text-slate-300">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* If No search result */}
          {filteredCategories.length === 0 && (
            <div className="p-4 text-center text-slate-400 text-xs space-y-2">
              <p>Tidak ada modul yang cocok dengan kata kunci "{filterQuery}".</p>
              <button
                type="button"
                onClick={() => setFilterQuery('')}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] rounded-lg font-medium"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </nav>

        {/* SIDEBAR FOOTER & STATUS WIDGET */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/70 space-y-2">
          {/* Dina Iki Quick Widget (Expanded mode) */}
          {(!isCollapsedDesktop || isOpenMobile) ? (
            <div className="bg-slate-900/90 rounded-2xl p-2.5 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-bold text-rose-300 uppercase tracking-wider">
                  <Calendar className="w-3 h-3 text-rose-400" />
                  <span>Dina Iki</span>
                </span>
                <button
                  type="button"
                  onClick={onOpenQuickWeton}
                  className="text-blue-300 hover:text-blue-100 underline text-[10px] font-semibold"
                >
                  Cek Tanggal
                </button>
              </div>
              <div className="text-xs font-black text-white flex items-center justify-between">
                <span>{todayWetonStr}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-200 border border-rose-800/80 font-mono">
                  Sultan Agung
                </span>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenQuickWeton}
              title={`Hari ini: ${todayWetonStr} (Klik untuk cek tanggal)`}
              className="w-full flex items-center justify-center p-2 rounded-xl bg-slate-800 text-rose-300 hover:bg-slate-700 hover:text-white transition"
            >
              <Calendar className="w-4 h-4" />
            </button>
          )}

          {/* Quick Tools Row (Gamelan, Kamus, Trah, DANA) */}
          <div className={`grid ${(!isCollapsedDesktop || isOpenMobile) ? 'grid-cols-4' : 'grid-cols-1'} gap-1 text-center`}>
            {/* Gamelan audio */}
            <button
              type="button"
              onClick={onToggleGamelan}
              className={`p-2 rounded-xl border flex items-center justify-center text-xs transition ${
                isGamelanPlaying
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-xs'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
              title={isGamelanPlaying ? 'Matikan Suara Gamelan' : 'Bunyikan Gamelan Ambient'}
            >
              {isGamelanPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-70" />}
            </button>

            {/* Kamus Glosarium */}
            <button
              type="button"
              onClick={onOpenGlosarium}
              className="p-2 rounded-xl bg-slate-800 text-amber-300 border border-slate-700 hover:bg-slate-700 hover:text-white flex items-center justify-center text-xs transition"
              title="Kamus Istilah Primbon & Etnosains"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>

            {/* Trah Keluarga */}
            <button
              type="button"
              onClick={onOpenKeluarga}
              className="p-2 rounded-xl bg-slate-800 text-rose-300 border border-slate-700 hover:bg-slate-700 hover:text-white flex items-center justify-center text-xs transition"
              title="Buku Catatan Trah Keluarga & Geblak"
            >
              <Users className="w-3.5 h-3.5" />
            </button>

            {/* Dukung DANA */}
            <button
              type="button"
              onClick={() => setIsDonationModalOpen(true)}
              className="p-2 rounded-xl bg-[#118EEA] hover:bg-[#0E71BC] text-white border border-[#118EEA] flex items-center justify-center text-xs transition shadow-xs"
              title="Donasi Tali Asih via DANA"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
            </button>
          </div>

          {/* User Account / Login Button */}
          {(!isCollapsedDesktop || isOpenMobile) && (
            <div className="pt-1">
              {isLoggedIn && user ? (
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-600 to-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                      {user.nama.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="truncate text-left">
                      <div className="text-[11px] font-bold text-white truncate">{user.nama}</div>
                      <div className="text-[9px] text-slate-400 truncate">{user.email}</div>
                    </div>
                  </div>
                  {isAdmin && (
                    <span className="text-[8px] font-black px-1.5 py-0.5 bg-amber-400 text-amber-950 rounded uppercase">
                      Admin
                    </span>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition shadow-sm"
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
                  <span>Masuk Akun Gmail</span>
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
