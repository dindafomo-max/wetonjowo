import React, { useState, useMemo } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { AppSidebar } from './components/AppSidebar';
import { WetonBalanceCard } from './components/WetonBalanceCard';
import { GojekGridMenu } from './components/GojekGridMenu';
import { LandingPrefaceView } from './components/LandingPrefaceView';
import { MarriageCalculatorView } from './components/MarriageCalculatorView';
import { SalakiRabiView } from './components/SalakiRabiView';
import { LifecycleHajatView } from './components/LifecycleHajatView';
import { PantanganAdatView } from './components/PantanganAdatView';
import { FirasatEncyclopediaView } from './components/FirasatEncyclopediaView';
import { RejekiPalSrigatiView } from './components/RejekiPalSrigatiView';
import { JangkaJayabayaView } from './components/JangkaJayabayaView';
import { RuwatanSukertaView } from './components/RuwatanSukertaView';
import { WukuPawukonView } from './components/WukuPawukonView';
import { NagaDinaView } from './components/NagaDinaView';
import { KalenderAbadiView } from './components/KalenderAbadiView';
import { HukumIslamPetungView } from './components/HukumIslamPetungView';
import { WiridDoaHarianView } from './components/WiridDoaHarianView';
import { DashboardAnalitikView } from './components/DashboardAnalitikView';
import { GasArchitectureView } from './components/GasArchitectureView';
import { BottomNavBar } from './components/BottomNavBar';
import { WetonDetailModal } from './components/WetonDetailModal';
import { WetonPantanganModal } from './components/WetonPantanganModal';
import { ArahRejekiModal } from './components/ArahRejekiModal';
import { SatriyaJayabayaModal } from './components/SatriyaJayabayaModal';
import { GlosariumPrimbonModal } from './components/GlosariumPrimbonModal';
import { CatatanKeluargaModal } from './components/CatatanKeluargaModal';
import { LoginGmailModal } from './components/LoginGmailModal';
import { DanaDonationModal } from './components/DanaDonationModal';
import { AiStudioIframeRestrictionGuard } from './components/AiStudioIframeRestrictionGuard';
import { useWetonPantangan } from './context/WetonPantanganContext';
import { useAuth } from './context/AuthContext';
import { hitungWetonLengkap, getPranataMangsa, getDeviceLocalDateString } from './utils/javaneseCalendar';
import { gamelanEngine } from './utils/gamelanAudio';
import { TabView } from './types/weton';

export default function App() {
  const { checkTanggalPantangan } = useWetonPantangan();
  const { requireAuth, isAdmin, user, setIsLoginModalOpen } = useAuth();
  const [activeTab, setActiveTab] = useState<TabView['id']>('beranda');
  const [isWetonModalOpen, setIsWetonModalOpen] = useState(false);
  const [isPantanganModalOpen, setIsPantanganModalOpen] = useState(false);
  const [isArahRejekiModalOpen, setIsArahRejekiModalOpen] = useState(false);
  const [isSatriyaModalOpen, setIsSatriyaModalOpen] = useState(false);
  const [isGlosariumOpen, setIsGlosariumOpen] = useState(false);
  const [isKeluargaOpen, setIsKeluargaOpen] = useState(false);
  const [isGamelanPlaying, setIsGamelanPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sidebar Multi-Device State
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isCollapsedDesktop, setIsCollapsedDesktop] = useState(false);

  // Sinkronisasi status gamelan audio
  const handleToggleGamelan = () => {
    const newState = gamelanEngine.toggle();
    setIsGamelanPlaying(newState);
  };

  // Tanggal & Hari Ini - Disinkronkan langsung dari Jam/Tanggal Perangkat / Komputer Pengguna
  const [todayIso, setTodayIso] = useState<string>(() => getDeviceLocalDateString());

  // Sinkronisasi otomatis jam perangkat setiap 60 detik jika melewati tengah malam
  React.useEffect(() => {
    const timer = setInterval(() => {
      const currentDeviceDate = getDeviceLocalDateString();
      if (currentDeviceDate !== todayIso) {
        setTodayIso(currentDeviceDate);
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [todayIso]);

  const todayWeton = useMemo(() => hitungWetonLengkap(todayIso), [todayIso]);
  const todayPranata = useMemo(() => getPranataMangsa(todayIso), [todayIso]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    requireAuth(() => {
      setActiveTab('firasat');
    });
  };

  const handleNavigateWithAuth = (tab: TabView['id']) => {
    if (tab === 'beranda') {
      setActiveTab('beranda');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    requireAuth(() => {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <AiStudioIframeRestrictionGuard>
      <div className="min-h-screen bg-slate-100 text-slate-900 flex font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. DYNAMIC RESPONSIVE SIDEBAR (DESKTOP FIXED/COLLAPSIBLE & MOBILE DRAWER) */}
      {/* ========================================================================= */}
      <AppSidebar
        activeTab={activeTab}
        setActiveTab={handleNavigateWithAuth}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
        isCollapsedDesktop={isCollapsedDesktop}
        setIsCollapsedDesktop={setIsCollapsedDesktop}
        todayWetonStr={`${todayWeton.hari} ${todayWeton.pasaran} (${todayWeton.neptuTotal})`}
        onOpenQuickWeton={() => setIsWetonModalOpen(true)}
        onOpenGlosarium={() => setIsGlosariumOpen(true)}
        onOpenKeluarga={() => setIsKeluargaOpen(true)}
        isGamelanPlaying={isGamelanPlaying}
        onToggleGamelan={handleToggleGamelan}
      />

      {/* ========================================================================= */}
      {/* 2. MAIN APP CONTENT CONTAINER (ADAPTIVE MARGIN FOR DESKTOP SIDEBAR) */}
      {/* ========================================================================= */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsedDesktop ? 'lg:ml-20' : 'lg:ml-72'
        } pb-20 lg:pb-10`}
      >
        {/* Sticky Header Ala Gojek / Modern App (Biru Navy & Maroon) */}
        <HeaderNav
          activeTab={activeTab}
          setActiveTab={handleNavigateWithAuth}
          onSearch={handleSearch}
          todayWetonStr={`${todayWeton.hari} ${todayWeton.pasaran} (${todayWeton.neptuTotal})`}
          onOpenGlosarium={() => setIsGlosariumOpen(true)}
          onOpenKeluarga={() => setIsKeluargaOpen(true)}
          isGamelanPlaying={isGamelanPlaying}
          onToggleGamelan={handleToggleGamelan}
          onToggleSidebarMobile={() => setIsOpenMobile(true)}
        />

        {/* Dynamic Responsive Main Content Canvas */}
        <main className="max-w-5xl w-full mx-auto px-3 sm:px-5 lg:px-6 pt-4 pb-8 space-y-5">
          {/* BERANDA TAB: Landing Page Dinamis dengan Prakata, Penjelasan Fitur, & Akses Menu */}
          {activeTab === 'beranda' && (
            <div className="space-y-6">
              {/* Quick Balance / Saldo Neptu Bar */}
              <WetonBalanceCard
                todayWeton={todayWeton}
                todayPranata={todayPranata}
                onOpenQuickWeton={() => setIsWetonModalOpen(true)}
                onNavigate={handleNavigateWithAuth}
              />

              {/* Gojek Style 8-Icon Grid Menu with Auth Protection */}
              <GojekGridMenu onSelectService={handleNavigateWithAuth} />

              {/* Dynamic Landing Page & Preface Component */}
              <LandingPrefaceView onNavigateToModule={handleNavigateWithAuth} />
            </div>
          )}

          {/* MODUL KALENDER ABADI JAWA (TRI-PENANGGALAN) */}
          {activeTab === 'kalender' && (
            <KalenderAbadiView
              onNavigateToModule={handleNavigateWithAuth}
              onOpenWetonDetail={() => {
                setIsWetonModalOpen(true);
              }}
            />
          )}

          {/* MODUL 1: NIKAH / IJAB KABUL */}
          {activeTab === 'nikah' && <MarriageCalculatorView />}

          {/* MODUL 2: SALAKI-RABI */}
          {activeTab === 'jodoh' && <SalakiRabiView />}

          {/* MODUL 3: REZEKI & PAL SRIGATI (KITAB BETALJEMUR ADAMMAKNA) */}
          {activeTab === 'rejeki' && (
            <RejekiPalSrigatiView
              onOpenPantanganModal={() => setIsPantanganModalOpen(true)}
              onOpenArahModal={() => setIsArahRejekiModalOpen(true)}
            />
          )}

          {/* MODUL 4: 30 WUKU PAWUKON & KARAKTER LAHIR (BETALJEMUR ADAMMAKNA) */}
          {activeTab === 'wuku' && (
            <WukuPawukonView
              onOpenPantanganModal={() => setIsPantanganModalOpen(true)}
            />
          )}

          {/* MODUL: NAGA DINA & ARAH REJEKI (KITAB BETALJEMUR ADAMMAKNA) */}
          {activeTab === 'nagadina' && (
            <NagaDinaView
              onOpenPantanganModal={() => setIsPantanganModalOpen(true)}
            />
          )}

          {/* MODUL: HUKUM ISLAM, HADITS NABI, & KAIDAH FIQHIYYAH */}
          {activeTab === 'islam' && (
            <HukumIslamPetungView
              onNavigateToJodoh={() => handleNavigateWithAuth('jodoh')}
              onNavigateToNagaDina={() => handleNavigateWithAuth('nagadina')}
            />
          )}

          {/* MODUL: KUMPULAN WIRID & DOA HARIAN WETON (TRADISI PESANTREN) */}
          {activeTab === 'wirid' && <WiridDoaHarianView />}

          {/* MODUL 5: 7 SATRIYA JAYABAYA & SIKLUS ZAMAN (SERAT JANGKA JAYABAYA) */}
          {activeTab === 'jayabaya' && (
            <JangkaJayabayaView
              onOpenPantanganModal={() => setIsPantanganModalOpen(true)}
              onOpenSatriyaModal={() => setIsSatriyaModalOpen(true)}
            />
          )}

          {/* MODUL 5: RUWATAN SUKERTA & TOLAK BALA SENGKALA (KITAB LUKMANAKIM) */}
          {activeTab === 'ruwatan' && (
            <RuwatanSukertaView
              onOpenPantanganModal={() => setIsPantanganModalOpen(true)}
            />
          )}

          {/* MODUL 6: HAJAT & DAUR HIDUP */}
          {activeTab === 'hajat' && <LifecycleHajatView />}

          {/* MODUL 7: PANTANGAN & ETNOSAINS */}
          {activeTab === 'pantangan' && <PantanganAdatView />}

          {/* MODUL 8: FIRASAT & GEJALA ALAM */}
          {activeTab === 'firasat' && (
            <FirasatEncyclopediaView initialSearchQuery={searchQuery} />
          )}

          {/* MODUL 9: DASHBOARD ANALITIK TREN PENCARIAN & WETON POPULER (PREMIUM ADMIN) */}
          {activeTab === 'analitik' && (
            <DashboardAnalitikView onNavigateToModule={(tab) => setActiveTab(tab as TabView['id'])} />
          )}

          {/* ARSITEKTUR GAS & DATABASE (KHUSUS ADMINISTRATOR SISTEM) */}
          {activeTab === 'gas' && (
            isAdmin ? (
              <GasArchitectureView />
            ) : (
              <div className="bg-white rounded-3xl p-6 sm:p-8 text-center shadow-sm border border-slate-200 space-y-4 my-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-2xl shadow-xs">
                  🔒
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300">
                    Akses Dibatasi
                  </span>
                  <h2 className="text-xl font-black text-slate-900">
                    Modul Khusus Administrator Sistem
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Modul Arsitektur Database & Source Code Google Apps Script ini adalah halaman khusus administrator sistem. Pengguna Gmail terdaftar diizinkan melihat dan menggunakan seluruh fitur layanan WETON JOWO, tetapi tidak diizinkan melihat atau mengedit struktur utama aplikasi ini.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('beranda');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition"
                  >
                    Kembali ke Beranda
                  </button>
                  {!user ? (
                    <button
                      type="button"
                      onClick={() => setIsLoginModalOpen(true)}
                      className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition shadow-sm"
                    >
                      Login Akun Admin Gmail
                    </button>
                  ) : null}
                </div>
              </div>
            )
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. MODAL POPUPS & DIALOGS */}
      {/* ========================================================================= */}
      <WetonDetailModal
        isOpen={isWetonModalOpen}
        onClose={() => setIsWetonModalOpen(false)}
      />

      <WetonPantanganModal
        isOpen={isPantanganModalOpen}
        onClose={() => setIsPantanganModalOpen(false)}
      />

      <ArahRejekiModal
        isOpen={isArahRejekiModalOpen}
        onClose={() => setIsArahRejekiModalOpen(false)}
        onExploreFullModule={() => {
          setIsArahRejekiModalOpen(false);
          handleNavigateWithAuth('nagadina');
        }}
      />

      <SatriyaJayabayaModal
        isOpen={isSatriyaModalOpen}
        onClose={() => setIsSatriyaModalOpen(false)}
        onExploreFullModule={() => {
          setIsSatriyaModalOpen(false);
          handleNavigateWithAuth('jayabaya');
        }}
      />

      <GlosariumPrimbonModal
        isOpen={isGlosariumOpen}
        onClose={() => setIsGlosariumOpen(false)}
      />

      <CatatanKeluargaModal
        isOpen={isKeluargaOpen}
        onClose={() => setIsKeluargaOpen(false)}
      />

      <LoginGmailModal />

      <DanaDonationModal />

      {/* ========================================================================= */}
      {/* 4. STICKY MOBILE BOTTOM BAR (HIDDEN ON DESKTOP LG+) */}
      {/* ========================================================================= */}
      <BottomNavBar
        activeTab={activeTab}
        setActiveTab={handleNavigateWithAuth}
        onOpenSidebarMobile={() => setIsOpenMobile(true)}
      />
    </div>
    </AiStudioIframeRestrictionGuard>
  );
}
