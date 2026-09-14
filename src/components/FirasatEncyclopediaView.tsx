import React, { useState, useMemo, useEffect } from 'react';
import { Search, Eye, Sparkles, Filter, CheckCircle2, AlertCircle, Compass, Flame, ShieldAlert } from 'lucide-react';
import { FIRASAT_KEDUTAN_DATA, GEJALA_ALAM_DATA } from '../data/primbonData';
import { FirasatKedutan, PertandaAlam } from '../types/weton';
import { useWetonPantangan } from '../context/WetonPantanganContext';
import { logAnonymousSearch } from '../data/analyticsData';
import { WetonPantanganBanner } from './WetonPantanganBanner';
import { WetonPantanganModal } from './WetonPantanganModal';

interface FirasatEncyclopediaViewProps {
  initialSearchQuery?: string;
}

export const FirasatEncyclopediaView: React.FC<FirasatEncyclopediaViewProps> = ({
  initialSearchQuery = '',
}) => {
  const { checkTanggalPantangan } = useWetonPantangan();
  const [isPantanganModalOpen, setIsPantanganModalOpen] = useState(false);

  // Cek apakah hari ini bertepatan dengan weton pantangan keluarga
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const todayPantangan = useMemo(() => checkTanggalPantangan(todayStr), [checkTanggalPantangan, todayStr]);

  const [activeSubTab, setActiveSubTab] = useState<'kedutan' | 'gejala_alam'>('kedutan');
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [kategoriKedutan, setKategoriKedutan] = useState<string>('Semua');
  const [kategoriAlam, setKategoriAlam] = useState<string>('Semua');

  // Log kueri pencarian firasat secara anonim untuk statistik telemetri admin
  useEffect(() => {
    if (searchTerm && searchTerm.trim().length >= 3) {
      const timer = setTimeout(() => {
        logAnonymousSearch(searchTerm.trim(), activeSubTab === 'kedutan' ? 'Firasat Kedutan' : 'Gejala Alam');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, activeSubTab]);

  // Filtered Kedutan
  const filteredKedutan = useMemo(() => {
    return FIRASAT_KEDUTAN_DATA.filter((item) => {
      const matchKategori = kategoriKedutan === 'Semua' || item.bagianTubuh === kategoriKedutan;
      const matchSearch =
        item.lokasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.firasat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.penjelasanEtnis.toLowerCase().includes(searchTerm.toLowerCase());
      return matchKategori && matchSearch;
    });
  }, [searchTerm, kategoriKedutan]);

  // Filtered Gejala Alam
  const filteredAlam = useMemo(() => {
    return GEJALA_ALAM_DATA.filter((item) => {
      const matchKategori = kategoriAlam === 'Semua' || item.kategori === kategoriAlam;
      const matchSearch =
        item.kondisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.maknaKlasik.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.penjelasanEtnosainsModern.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.waktuAtauArah.toLowerCase().includes(searchTerm.toLowerCase());
      return matchKategori && matchSearch;
    });
  }, [searchTerm, kategoriAlam]);

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-blue-950 text-white rounded-3xl p-5 shadow-sm border border-rose-800/80">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-800/80 text-rose-200 text-xs font-bold mb-2">
          <span>👁️</span> Modul 5 Betaljemur Adammakna
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
          Ensiklopedia Kramadana & Alamat Gejala Alam
        </h2>
        <p className="text-xs sm:text-sm text-rose-100/90 mt-1 max-w-2xl leading-relaxed">
          Kamus pencarian cepat arti getaran syaraf kedutan tubuh dari ujung rambut hingga telapak kaki, serta pertanda kosmologis alam (lintang kemukus, grahana, lindhu, dan suara satwa).
        </p>
      </div>

      {/* Proteksi Weton Pantangan Multi-Hari Banner */}
      <WetonPantanganBanner
        onOpenModal={() => setIsPantanganModalOpen(true)}
        modulName="Firasat & Alamat Kosmologis"
        matchedPantangan={todayPantangan.isPantangan ? `Hari ini bertepatan dengan ${todayPantangan.alasan}` : null}
      />

      {/* Switcher & Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveSubTab('kedutan')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'kedutan'
                ? 'bg-rose-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Kramadana Kedutan Tubuh ({FIRASAT_KEDUTAN_DATA.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('gejala_alam')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'gejala_alam'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Alamat Gejala Alam ({GEJALA_ALAM_DATA.length})</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              activeSubTab === 'kedutan'
                ? 'Ketik lokasi tubuh: mata kanan, bibir, alis, telapak tangan, lutut...'
                : 'Ketik gejala alam: komet, gerhana, lindhu, burung kedasih...'
            }
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Category Filter Chips for Kedutan */}
        {activeSubTab === 'kedutan' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase shrink-0">Bagian:</span>
            {['Semua', 'Kepala & Wajah', 'Mata & Telinga', 'Mulut & Leher', 'Tubuh & Dada', 'Tangan & Lengan', 'Kaki & Telapak'].map((kat) => (
              <button
                key={kat}
                onClick={() => setKategoriKedutan(kat)}
                className={`shrink-0 px-3 py-1 rounded-full border transition text-[11px] font-semibold ${
                  kategoriKedutan === kat
                    ? 'bg-rose-900 text-white border-rose-950'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
        )}

        {/* Category Filter Chips for Gejala Alam */}
        {activeSubTab === 'gejala_alam' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase shrink-0">Kategori:</span>
            {['Semua', 'Lintang Kemukus (Komet)', 'Grahana (Gerhana)', 'Lindhu (Gempa Bumi)', 'Suara Hewan & Burung'].map((kat) => (
              <button
                key={kat}
                onClick={() => setKategoriAlam(kat)}
                className={`shrink-0 px-3 py-1 rounded-full border transition text-[11px] font-semibold ${
                  kategoriAlam === kat
                    ? 'bg-blue-900 text-white border-blue-950'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CONTENT: KEDUTAN */}
      {activeSubTab === 'kedutan' && (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-500">
            Ditemukan {filteredKedutan.length} titik firasat kedutan tubuh
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredKedutan.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-rose-400 transition space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {item.bagianTubuh}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.maknaPositif
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.maknaPositif ? 'Pertanda Baik' : 'Nasihat Waspada'}
                  </span>
                </div>

                <div className="font-black text-slate-900 text-sm">
                  {item.lokasi}
                </div>

                <p className="text-slate-800 font-medium leading-relaxed">
                  "{item.firasat}"
                </p>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
                  <strong>Catatan Budaya:</strong> {item.penjelasanEtnis}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT: GEJALA ALAM */}
      {activeSubTab === 'gejala_alam' && (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-500">
            Ditemukan {filteredAlam.length} pertanda gejala alam
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredAlam.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:border-blue-400 transition space-y-2.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900">
                    {item.kategori}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {item.waktuAtauArah}
                  </span>
                </div>

                <div className="font-black text-slate-900 text-sm">
                  {item.kondisi}
                </div>

                <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-rose-950 text-[11px]">
                  <strong>Teks Asli Betaljemur:</strong> {item.maknaKlasik}
                </div>

                <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-xl text-blue-950 text-[11px]">
                  <strong>Tinjauan Etnosains Modern:</strong> {item.penjelasanEtnosainsModern}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Kelola Weton Pantangan */}
      <WetonPantanganModal
        isOpen={isPantanganModalOpen}
        onClose={() => setIsPantanganModalOpen(false)}
      />
    </div>
  );
};
