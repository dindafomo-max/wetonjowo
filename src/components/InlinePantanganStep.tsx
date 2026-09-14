import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Plus, ToggleLeft, ToggleRight, Settings2, Check, AlertTriangle } from 'lucide-react';
import { useWetonPantangan } from '../context/WetonPantanganContext';
import { DAFTAR_HARI, DAFTAR_PASARAN } from '../data/primbonData';
import { HariJawa, PasaranJawa, WetonPantanganItem } from '../types/weton';

interface InlinePantanganStepProps {
  stepNumber?: number;
  modulTitle: string;
  matchedAlert?: string | null;
  onOpenFullModal: () => void;
  filteredCountNote?: string;
}

export const InlinePantanganStep: React.FC<InlinePantanganStepProps> = ({
  stepNumber = 2,
  modulTitle,
  matchedAlert,
  onOpenFullModal,
  filteredCountNote,
}) => {
  const { pantanganList, activePantanganList, addPantangan, togglePantangan, removePantangan } = useWetonPantangan();
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const [hari, setHari] = useState<HariJawa>('Setu');
  const [pasaran, setPasaran] = useState<PasaranJawa>('Pon');
  const [kategori, setKategori] = useState<WetonPantanganItem['kategori']>('Geblak Orang Tua');
  const [keterangan, setKeterangan] = useState('');

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keterangan.trim()) return;

    addPantangan({
      hari,
      pasaran,
      kategori,
      keterangan: keterangan.trim(),
      aktif: true,
    });

    setKeterangan('');
    setIsQuickAddOpen(false);
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border-2 border-rose-200/90 space-y-4 relative overflow-hidden">
      {/* Decorative side accent */}
      <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-rose-900 to-rose-700" />

      {/* Header of the Step */}
      <div className="flex flex-wrap items-start justify-between gap-3 pl-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-rose-900 text-white font-black text-xs flex items-center justify-center shrink-0">
              {stepNumber}
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-rose-950">
              Tahap Proteksi Weton Pantangan (Wajib Silsilah)
            </span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900 mt-1 pl-8">
            Verifikasi Pantangan Adat & Geblak Leluhur Sebelum Memilih Hari Baik
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 pl-8 max-w-2xl leading-relaxed">
            Sesuai kaidah Kitab Betaljemur Adammakna, hari baik untuk <strong>{modulTitle}</strong> wajib disterilkan dari hari wafat (geblak) orang tua, sengkala pribadi, atau pantangan adat silsilah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenFullModal}
            className="text-xs font-bold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition flex items-center gap-1.5"
          >
            <Settings2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Kelola Lengkap</span>
          </button>
        </div>
      </div>

      {/* Matched Danger Alert if Any Clash */}
      {matchedAlert && (
        <div className="ml-2 bg-rose-50 border border-rose-300 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-rose-950">
          <ShieldAlert className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-rose-900">
              Terdeteksi Benturan Pantangan Pada Rencana Anda:
            </span>
            <p className="mt-0.5">{matchedAlert}</p>
          </div>
        </div>
      )}

      {/* Active Protections Summary */}
      <div className="ml-2 bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {activePantanganList.length > 0 ? (
              <span className="flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>{activePantanganList.length} Hari Pantangan Aktif Melindungi</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>Belum Ada Pantangan Terdaftar</span>
              </span>
            )}
            {filteredCountNote && (
              <span className="text-xs text-slate-500 font-medium">
                • {filteredCountNote}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
            className="text-xs font-bold text-rose-900 hover:text-rose-800 flex items-center gap-1 bg-white border border-rose-200 px-2.5 py-1 rounded-xl shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isQuickAddOpen ? 'Tutup Form' : '+ Tambah Geblak / Naas'}</span>
          </button>
        </div>

        {/* Quick Add Inline Form */}
        {isQuickAddOpen && (
          <form onSubmit={handleQuickAdd} className="bg-white p-3.5 rounded-xl border border-rose-300 space-y-2.5 text-xs mt-2">
            <div className="font-bold text-rose-950 flex items-center gap-1.5">
              <span>Tambah Pantangan Silsilah Baru:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="text-[11px] text-slate-600 block mb-0.5">Hari & Pasaran</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <select
                    value={hari}
                    onChange={(e) => setHari(e.target.value as HariJawa)}
                    className="p-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none"
                  >
                    {DAFTAR_HARI.map(h => (
                      <option key={h.nama} value={h.nama}>{h.nama}</option>
                    ))}
                  </select>
                  <select
                    value={pasaran}
                    onChange={(e) => setPasaran(e.target.value as PasaranJawa)}
                    className="p-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none"
                  >
                    {DAFTAR_PASARAN.map(p => (
                      <option key={p.nama} value={p.nama}>{p.nama}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-600 block mb-0.5">Kategori</label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value as WetonPantanganItem['kategori'])}
                  className="w-full p-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none"
                >
                  <option value="Geblak Orang Tua">Geblak Orang Tua / Leluhur</option>
                  <option value="Hari Naas Pribadi">Hari Naas Pribadi</option>
                  <option value="Pantangan Keluarga">Pantangan Keluarga</option>
                  <option value="Dina Sengkala">Dina Sengkala</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-600 block mb-0.5">Nama / Hubungan</label>
                <input
                  type="text"
                  placeholder="Misal: Geblak Simbah Kakung"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  required
                  className="w-full p-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsQuickAddOpen(false)}
                className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-3.5 py-1 bg-rose-900 text-white rounded-lg font-bold hover:bg-rose-800"
              >
                Simpan Pantangan
              </button>
            </div>
          </form>
        )}

        {/* Badges of Registered Taboos */}
        {pantanganList.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {pantanganList.map((item) => (
              <div
                key={item.id}
                className={`text-xs px-2.5 py-1 rounded-xl border flex items-center gap-2 transition ${
                  item.aktif
                    ? 'bg-white border-rose-300 text-slate-900 shadow-xs'
                    : 'bg-slate-100 border-slate-200 text-slate-400 line-through'
                }`}
              >
                <div className="font-extrabold text-rose-950">
                  {item.hari} {item.pasaran}
                </div>
                <div className="text-[11px] text-slate-600 font-medium">
                  ({item.keterangan})
                </div>
                <button
                  type="button"
                  onClick={() => togglePantangan(item.id)}
                  title={item.aktif ? 'Nonaktifkan Filter' : 'Aktifkan Filter'}
                  className="ml-1 text-slate-500 hover:text-slate-900"
                >
                  {item.aktif ? (
                    <ToggleRight className="w-4 h-4 text-rose-800" />
                  ) : (
                    <ToggleLeft className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-slate-500 italic">
            Belum ada pantangan keluarga yang ditambahkan. Tekan tombol <strong>+ Tambah Geblak / Naas</strong> untuk memproteksi perhitungan hari baik Anda.
          </div>
        )}
      </div>

      {/* Confirmation indicator */}
      <div className="pl-2 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          Semua rekomendasi hari baik di bawah ini telah disinkronkan & dieliminasi dari benturan pantangan silsilah yang aktif di atas.
        </span>
      </div>
    </div>
  );
};
