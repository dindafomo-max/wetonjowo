import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  X,
  Sparkles,
  Bookmark,
  Check,
  Copy,
  Layers,
  HelpCircle
} from 'lucide-react';
import { DAFTAR_GLOSARIUM, IstilahPrimbon } from '../data/glosariumData';

interface GlosariumPrimbonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearch?: string;
}

export const GlosariumPrimbonModal: React.FC<GlosariumPrimbonModalProps> = ({
  isOpen,
  onClose,
  initialSearch = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const kategoriList = [
    'Semua',
    'Hari & Pasaran',
    'Jodoh & Nikah',
    'Rezeki & Karir',
    'Pantangan & Naas',
    'Kosmologi & Waktu',
    'Ruwatan & Sukerta'
  ];

  const filteredIstilah = useMemo(() => {
    return DAFTAR_GLOSARIUM.filter((item) => {
      const matchKategori = selectedKategori === 'Semua' || item.kategori === selectedKategori;
      const matchQuery =
        item.istilah.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artiSingkat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.maknaMendalam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.pedomanPraktis.toLowerCase().includes(searchQuery.toLowerCase());
      return matchKategori && matchQuery;
    });
  }, [searchQuery, selectedKategori]);

  const handleCopy = (item: IstilahPrimbon) => {
    const text = `📖 ${item.istilah} ${item.aksaraJawa ? `(${item.aksaraJawa})` : ''}
Kategori: ${item.kategori}
Arti: ${item.artiSingkat}
Makna Filosofis: ${item.maknaMendalam}
Pedoman Praktis: ${item.pedomanPraktis}
(Rujukan: ${item.rujukanKitab})`;

    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950 text-white flex items-center justify-between border-b border-blue-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-sm">
              📖
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>Glosarium Istilah Primbon & Kosmologi Jawa</span>
                <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                  Ensiklopedia
                </span>
              </h2>
              <p className="text-xs text-blue-200">
                Khazanah Makna Filosofis dari Kitab Betaljemur Adammakna & Pawukon
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari istilah: Neptu, Taliwangke, Pal Srigati, Kalatidha, Pancasuda..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                Reset
              </button>
            )}
          </div>

          {/* Kategori Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
            {kategoriList.map((kat) => (
              <button
                key={kat}
                type="button"
                onClick={() => setSelectedKategori(kat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap font-semibold transition text-xs ${
                  selectedKategori === kat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
        </div>

        {/* Content List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {filteredIstilah.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <div className="text-3xl">🔍</div>
              <h4 className="text-sm font-bold text-slate-800">Istilah tidak ditemukan</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Tidak ada entri glosarium yang cocok dengan pencarian "{searchQuery}". Silakan coba kata kunci lain.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredIstilah.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-amber-300 transition space-y-2.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">
                          {item.istilah}
                        </span>
                        {item.aksaraJawa && (
                          <span className="text-xs text-amber-800 font-serif opacity-80">
                            {item.aksaraJawa}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold shrink-0">
                        {item.kategori}
                      </span>
                    </div>

                    <p className="text-xs text-slate-800 font-medium leading-snug">
                      {item.artiSingkat}
                    </p>

                    <p className="text-[11px] text-slate-600 leading-relaxed mt-2 line-clamp-3">
                      {item.maknaMendalam}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
                      <div className="text-[11px] text-slate-700">
                        <strong className="text-amber-900 font-semibold">Pedoman:</strong> {item.pedomanPraktis}
                      </div>
                      <div className="text-[10px] text-slate-400 italic">
                        {item.rujukanKitab}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleCopy(item)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 transition"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Makna</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Menampilkan {filteredIstilah.length} istilah terverifikasi</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
