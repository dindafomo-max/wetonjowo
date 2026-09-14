import React from 'react';
import { Home, Calendar, CalendarHeart, HeartHandshake, TrendingUp, Crown, Scale, LayoutGrid } from 'lucide-react';
import { TabView } from '../types/weton';
import { useAuth } from '../context/AuthContext';

interface BottomNavBarProps {
  activeTab: TabView['id'];
  setActiveTab: (tab: TabView['id']) => void;
  onOpenSidebarMobile: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSidebarMobile,
}) => {
  const { requireAuth } = useAuth();

  const tabs = [
    { id: 'beranda' as TabView['id'], label: 'Beranda', icon: Home, isPublic: true },
    { id: 'kalender' as TabView['id'], label: 'Kalender', icon: Calendar, isPublic: true },
    { id: 'nikah' as TabView['id'], label: 'Nikah', icon: CalendarHeart, isPublic: false },
    { id: 'islam' as TabView['id'], label: 'Hukum Islam', icon: Scale, isPublic: false },
  ];

  const handleTabClick = (tabId: TabView['id'], isPublic: boolean) => {
    if (isPublic) {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    requireAuth(() => {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 shadow-2xl py-1 px-2 lg:hidden">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id, tab.isPublic)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all duration-200 relative min-w-[56px] min-h-[44px] ${
                isActive ? 'text-rose-300' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`w-9 h-7 flex items-center justify-center rounded-xl transition-all ${
                  isActive
                    ? 'bg-rose-900/80 text-rose-200 font-bold scale-105 border border-rose-500/50'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-[10px] mt-0.5 leading-none transition-all ${
                  isActive ? 'font-black text-rose-200' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 bg-rose-400 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}

        {/* 5th Button: Buka Drawer Semua Modul (SideBar) */}
        <button
          type="button"
          onClick={onOpenSidebarMobile}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-2xl text-slate-300 hover:text-white transition-all min-w-[56px] min-h-[44px]"
        >
          <div className="w-9 h-7 flex items-center justify-center rounded-xl bg-slate-800 text-rose-400 border border-slate-700 hover:bg-slate-700 transition">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 leading-none font-bold text-slate-300">
            Modul
          </span>
        </button>
      </div>
    </nav>
  );
};
