import React from 'react';
import {
  Heart,
  CalendarCheck,
  Home,
  Baby,
  SunMedium,
  Compass,
  Eye,
  ShieldCheck,
  FileCode2,
  TrendingUp,
  Crown,
  ShieldAlert,
  BarChart3,
  Scale,
  Sparkles,
} from 'lucide-react';
import { TabView } from '../types/weton';
import { useAuth } from '../context/AuthContext';

interface GojekGridMenuProps {
  onSelectService: (tab: TabView['id']) => void;
}

export const GojekGridMenu: React.FC<GojekGridMenuProps> = ({ onSelectService }) => {
  const { isAdmin } = useAuth();

  const services = [
    {
      id: 'kalender' as TabView['id'],
      label: 'Kalender Abadi',
      sublabel: 'Masehi • Hijriah • Jawa',
      icon: CalendarCheck,
      color: 'from-blue-600 to-indigo-900',
      badge: 'Tri-Sistem',
    },
    {
      id: 'nikah' as TabView['id'],
      label: 'Ijab Kabul',
      sublabel: 'Hari Baik Nikah',
      icon: CalendarCheck,
      color: 'from-rose-700 to-rose-900',
      badge: 'Utama',
    },
    {
      id: 'jodoh' as TabView['id'],
      label: 'Salaki-Rabi',
      sublabel: 'Hitung Jodoh',
      icon: Heart,
      color: 'from-rose-800 to-pink-900',
      badge: '8 Petung',
    },
    {
      id: 'islam' as TabView['id'],
      label: 'Hukum Islam',
      sublabel: 'Hadits & Kaidah',
      icon: Scale,
      color: 'from-emerald-700 to-teal-950',
      badge: 'Hadits Nabi',
    },
    {
      id: 'wirid' as TabView['id'],
      label: 'Wirid & Doa',
      sublabel: 'Amalan Harian Weton',
      icon: Sparkles,
      color: 'from-teal-700 to-emerald-900',
      badge: 'Santri & Dzikir',
    },
    {
      id: 'wuku' as TabView['id'],
      label: '30 Wuku',
      sublabel: 'Pawukon & Karakter',
      icon: Compass,
      color: 'from-amber-600 to-rose-900',
      badge: 'Pawukon',
    },
    {
      id: 'nagadina' as TabView['id'],
      label: 'Naga Dina',
      sublabel: 'Arah Rejeki & Hajat',
      icon: Compass,
      color: 'from-amber-500 to-amber-700',
      badge: '8 Arah',
    },
    {
      id: 'rejeki' as TabView['id'],
      label: 'Pal Srigati',
      sublabel: 'Rezeki 6 Tahunan',
      icon: TrendingUp,
      color: 'from-amber-600 to-amber-800',
      badge: 'Betaljemur',
    },
    {
      id: 'jayabaya' as TabView['id'],
      label: 'Jayabaya',
      sublabel: '7 Satriya & Zaman',
      icon: Crown,
      color: 'from-amber-700 to-rose-900',
      badge: 'Joyoboyo',
    },
    {
      id: 'ruwatan' as TabView['id'],
      label: 'Ruwatan',
      sublabel: 'Sukerta & Sengkala',
      icon: ShieldAlert,
      color: 'from-rose-800 to-slate-900',
      badge: 'Lukmanakim',
    },
    {
      id: 'hajat' as TabView['id'],
      label: 'Boyongan',
      sublabel: 'Pindah Rumah',
      icon: Home,
      color: 'from-blue-800 to-blue-950',
      badge: 'Sisa 4',
    },
    {
      id: 'pantangan' as TabView['id'],
      label: 'Proteksi Adat',
      sublabel: 'Silsilah Naas',
      icon: ShieldCheck,
      color: 'from-blue-900 to-slate-900',
      badge: 'Multi-Hari',
    },
    // Khusus ADMIN: Tambahkan Analitik & Panel Admin
    ...(isAdmin
      ? [
          {
            id: 'analitik' as TabView['id'],
            label: 'Analitik Tren',
            sublabel: 'Firasat & Weton',
            icon: BarChart3,
            color: 'from-blue-700 to-indigo-950',
            badge: 'Admin VIP',
          },
          {
            id: 'gas' as TabView['id'],
            label: 'Panel Admin',
            sublabel: 'Database & GAS',
            icon: FileCode2,
            color: 'from-amber-800 to-slate-950',
            badge: 'Khusus Admin',
          },
        ]
      : [
          {
            id: 'firasat' as TabView['id'],
            label: 'Kramadana',
            sublabel: 'Kedutan & Firasat',
            icon: Eye,
            color: 'from-blue-900 to-indigo-950',
            badge: 'Ensiklopedia',
          },
        ]),
  ];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200/80">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="font-extrabold text-sm sm:text-base text-slate-800 flex items-center gap-2">
          <span className="w-2 h-4 bg-gradient-to-b from-blue-900 to-rose-800 rounded-full" />
          <span>Khazanah Utama Betaljemur & Jangka Jayabaya</span>
        </h3>
        <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
          8 Layanan Inti
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
        {services.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => onSelectService(item.id)}
              className="flex flex-col items-center text-center p-2 sm:p-2.5 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all duration-150 group relative"
            >
              {/* Badge Tag */}
              {item.badge && (
                <span className="absolute -top-1.5 right-1 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-rose-900 text-white shadow-xs z-10 scale-90 sm:scale-100">
                  {item.badge}
                </span>
              )}

              {/* Icon Circle */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all duration-200 mb-1.5`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Main Label */}
              <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-rose-900 transition-colors leading-tight line-clamp-1">
                {item.label}
              </span>

              {/* Sublabel / Keterangan Singkat */}
              <span className="text-[10px] text-slate-600 hidden sm:block mt-0.5 leading-tight line-clamp-1">
                {item.sublabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
