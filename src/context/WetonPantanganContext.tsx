import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { HariJawa, PasaranJawa, WetonPantanganItem } from '../types/weton';
import { hitungWetonLengkap } from '../utils/javaneseCalendar';

interface WetonPantanganContextType {
  pantanganList: WetonPantanganItem[];
  activePantanganList: WetonPantanganItem[];
  addPantangan: (item: Omit<WetonPantanganItem, 'id'>) => void;
  removePantangan: (id: string) => void;
  togglePantangan: (id: string) => void;
  resetToDefault: () => void;
  checkIsPantangan: (hari: HariJawa, pasaran: PasaranJawa) => {
    isPantangan: boolean;
    item?: WetonPantanganItem;
    alasan: string;
  };
  checkTanggalPantangan: (tanggalIso: string) => {
    isPantangan: boolean;
    item?: WetonPantanganItem;
    alasan: string;
    hari: HariJawa;
    pasaran: PasaranJawa;
  };
}

const DEFAULT_PANTANGAN: WetonPantanganItem[] = [
  {
    id: 'p-1',
    hari: 'Setu',
    pasaran: 'Pon',
    kategori: 'Geblak Orang Tua',
    keterangan: 'Hari Wafat (Geblak) Ayah - Pantangan Hajat Agung',
    aktif: true,
  },
  {
    id: 'p-2',
    hari: 'Rebo',
    pasaran: 'Wage',
    kategori: 'Geblak Orang Tua',
    keterangan: 'Hari Wafat (Geblak) Ibu - Pantangan Akad & Pindah Rumah',
    aktif: true,
  },
  {
    id: 'p-3',
    hari: 'Jemuwah',
    pasaran: 'Kliwon',
    kategori: 'Hari Naas Pribadi',
    keterangan: 'Hari Naas Kelahiran Pribadi / Pasangan',
    aktif: false,
  }
];

const LOCAL_STORAGE_KEY = 'weton_jowo_pantangan_v1';

const WetonPantanganContext = createContext<WetonPantanganContextType | undefined>(undefined);

export const WetonPantanganProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pantanganList, setPantanganList] = useState<WetonPantanganItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore JSON parse error
    }
    return DEFAULT_PANTANGAN;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pantanganList));
    } catch {
      // storage unavailable
    }
  }, [pantanganList]);

  const activePantanganList = useMemo(() => {
    return pantanganList.filter((item) => item.aktif);
  }, [pantanganList]);

  const addPantangan = (item: Omit<WetonPantanganItem, 'id'>) => {
    const newItem: WetonPantanganItem = {
      ...item,
      id: `p-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setPantanganList((prev) => [newItem, ...prev]);
  };

  const removePantangan = (id: string) => {
    setPantanganList((prev) => prev.filter((item) => item.id !== id));
  };

  const togglePantangan = (id: string) => {
    setPantanganList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, aktif: !item.aktif } : item))
    );
  };

  const resetToDefault = () => {
    setPantanganList(DEFAULT_PANTANGAN);
  };

  const checkIsPantangan = (hari: HariJawa, pasaran: PasaranJawa) => {
    const match = activePantanganList.find(
      (p) => p.hari === hari && p.pasaran === pasaran
    );
    if (match) {
      return {
        isPantangan: true,
        item: match,
        alasan: `Weton Pantangan [${match.kategori}]: ${match.keterangan} (${match.hari} ${match.pasaran})`,
      };
    }
    return {
      isPantangan: false,
      alasan: '',
    };
  };

  const checkTanggalPantangan = (tanggalIso: string) => {
    const weton = hitungWetonLengkap(tanggalIso);
    const result = checkIsPantangan(weton.hari, weton.pasaran);
    return {
      ...result,
      hari: weton.hari,
      pasaran: weton.pasaran,
    };
  };

  return (
    <WetonPantanganContext.Provider
      value={{
        pantanganList,
        activePantanganList,
        addPantangan,
        removePantangan,
        togglePantangan,
        resetToDefault,
        checkIsPantangan,
        checkTanggalPantangan,
      }}
    >
      {children}
    </WetonPantanganContext.Provider>
  );
};

export function useWetonPantangan(): WetonPantanganContextType {
  const context = useContext(WetonPantanganContext);
  if (!context) {
    throw new Error('useWetonPantangan must be used within a WetonPantanganProvider');
  }
  return context;
}
