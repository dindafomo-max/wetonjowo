import React, { useState } from 'react';
import { Compass, ShieldAlert, BookOpen, Lightbulb, AlertTriangle, CheckCircle2, Plus, Trash2, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
import { ARAH_PANTANGAN_DATA, PANTANGAN_RUMAH_DATA, DAFTAR_HARI, DAFTAR_PASARAN } from '../data/primbonData';
import { HariJawa, PasaranJawa, WetonPantanganItem } from '../types/weton';
import { useWetonPantangan } from '../context/WetonPantanganContext';
import { WetonPantanganBanner } from './WetonPantanganBanner';
import { WetonPantanganModal } from './WetonPantanganModal';

export const PantanganAdatView: React.FC = () => {
  const { pantanganList, addPantangan, removePantangan, togglePantangan, activePantanganList } = useWetonPantangan();
  const [isPantanganModalOpen, setIsPantanganModalOpen] = useState(false);

  const [selectedHariIdx, setSelectedHariIdx] = useState<number>(0);
  const dataHari = ARAH_PANTANGAN_DATA[selectedHariIdx];

  // Form quick add pantangan
  const [newHari, setNewHari] = useState<HariJawa>('Setu');
  const [newPasaran, setNewPasaran] = useState<PasaranJawa>('Pon');
  const [newKategori, setNewKategori] = useState<WetonPantanganItem['kategori']>('Geblak Orang Tua');
  const [newKeterangan, setNewKeterangan] = useState('');

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeterangan.trim()) return;

    addPantangan({
      hari: newHari,
      pasaran: newPasaran,
      kategori: newKategori,
      keterangan: newKeterangan.trim(),
      aktif: true,
    });

    setNewKeterangan('');
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-rose-950 text-white rounded-3xl p-5 shadow-sm border border-blue-800/80">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold mb-2">
          <span>🧭</span> Modul 4 Betaljemur Adammakna
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
          Pantangan Arah, Weton Pantangan & Larangan Adat
        </h2>
        <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
          Mengupas rasionalitas ilmiah di balik arah larangan (<em>Kala Dite, Kala Daeng, Naga Dina</em>), arsitektur rumah, serta sistem proteksi <strong>Weton Pantangan Multi-Hari</strong> (Geblak, Naas, & Taboo) yang otomatis terhubung ke seluruh modul aplikasi.
        </p>
      </div>

      {/* Banner Weton Pantangan */}
      <WetonPantanganBanner
        onOpenModal={() => setIsPantanganModalOpen(true)}
        modulName="Pantangan Adat & Silsilah"
      />

      {/* Pusat Kendali Weton Pantangan Multi-Hari Terintegrasi */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
              <span className="w-2 h-4 bg-rose-900 rounded-full" />
              Kelola Daftar Weton Pantangan Multi-Hari (Leluhur & Silsilah)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftarkan hari wafat (geblak), hari naas, atau weton pantangan adat keluarga. Otomatis disaring di modul Nikah, Jodoh, Boyongan Wisma, & Hajat!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-200">
              {activePantanganList.length} Hari Aktif Dipantangi
            </span>
            <button
              onClick={() => setIsPantanganModalOpen(true)}
              className="text-xs font-bold px-3 py-1 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
            >
              Buka Popup Lengkap
            </button>
          </div>
        </div>

        {/* Quick Add Form Inline */}
        <form onSubmit={handleQuickAdd} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3 text-xs">
          <div className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
            <Plus className="w-4 h-4 text-rose-800" />
            <span>Tambah Weton Pantangan Baru (Bisa Lebih dari 1 Hari):</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Hari</label>
              <select
                value={newHari}
                onChange={(e) => setNewHari(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none"
              >
                {DAFTAR_HARI.map((h) => (
                  <option key={h.nama} value={h.nama}>{h.nama} ({h.neptu})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Pasaran</label>
              <select
                value={newPasaran}
                onChange={(e) => setNewPasaran(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none"
              >
                {DAFTAR_PASARAN.map((p) => (
                  <option key={p.nama} value={p.nama}>{p.nama} ({p.neptu})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Kategori Pantangan</label>
              <select
                value={newKategori}
                onChange={(e) => setNewKategori(e.target.value as WetonPantanganItem['kategori'])}
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none"
              >
                <option value="Geblak Orang Tua">Geblak Orang Tua / Leluhur</option>
                <option value="Hari Naas Pribadi">Hari Naas Pribadi / Pasangan</option>
                <option value="Pantangan Keluarga">Pantangan Keluarga Besar</option>
                <option value="Dina Sengkala">Dina Sengkala / Bahaya</option>
                <option value="Lainnya">Pantangan Adat Lainnya</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Nama / Keterangan</label>
              <input
                type="text"
                placeholder="Misal: Geblak Simbah Kakung (Pantangan Nikah & Boyongan)"
                value={newKeterangan}
                onChange={(e) => setNewKeterangan(e.target.value)}
                required
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-rose-900 text-white rounded-xl font-bold hover:bg-rose-800 transition flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simpan Pantangan</span>
            </button>
          </div>
        </form>

        {/* List of active pantangans in this module */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {pantanganList.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                item.aktif
                  ? 'bg-rose-50/70 border-rose-200'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-xs">
                    {item.hari} {item.pasaran}
                  </span>
                  <span className="text-[9px] uppercase font-black px-1.5 py-0.2 rounded bg-rose-900 text-white">
                    {item.kategori}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-rose-950">{item.keterangan}</div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={() => togglePantangan(item.id)}
                  title={item.aktif ? 'Nonaktifkan' : 'Aktifkan'}
                  className="text-slate-600 hover:text-slate-900"
                >
                  {item.aktif ? (
                    <ToggleRight className="w-6 h-6 text-rose-800" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-slate-400" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => removePantangan(item.id)}
                  title="Hapus Pantangan"
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian 1: Arah Larangan Bepergian Sepekan */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
              <span className="w-2 h-4 bg-rose-900 rounded-full" />
              Arah Pantangan Bepergian Harian (Kala Dina & Naga Dina)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih hari untuk mengamati posisi Kala dan arah yang disarankan
            </p>
          </div>
        </div>

        {/* Day Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {ARAH_PANTANGAN_DATA.map((item, idx) => (
            <button
              key={item.hari}
              onClick={() => setSelectedHariIdx(idx)}
              className={`shrink-0 px-3.5 py-2 rounded-2xl font-bold transition ${
                selectedHariIdx === idx
                  ? 'bg-gradient-to-r from-blue-900 to-rose-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.hari.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Selected Day Display */}
        <div className="bg-gradient-to-br from-blue-950 to-slate-900 text-white rounded-2xl p-5 border border-blue-800 space-y-4">
          <div className="flex items-center justify-between border-b border-blue-800/80 pb-3">
            <div>
              <div className="text-xs text-rose-300 font-bold uppercase">Panduan Perjalanan Hari:</div>
              <div className="text-xl font-black text-white">{dataHari.hari}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-800/60 flex items-center justify-center border border-blue-600/40">
              <Compass className="w-5 h-5 text-blue-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-rose-950/70 border border-rose-800/80 p-3.5 rounded-xl space-y-1">
              <span className="text-rose-300 font-bold block text-[11px] uppercase">
                ⚠️ Arah Larangan Kala:
              </span>
              <div className="text-sm font-black text-white">{dataHari.arahKala}</div>
              <p className="text-[10px] text-rose-200/90">Dipantangi untuk memulai perjalanan jauh pertama kali.</p>
            </div>

            <div className="bg-rose-950/70 border border-rose-800/80 p-3.5 rounded-xl space-y-1">
              <span className="text-rose-300 font-bold block text-[11px] uppercase">
                🐉 Arah Kepala Naga Dina:
              </span>
              <div className="text-sm font-black text-white">{dataHari.arahNagaDina}</div>
              <p className="text-[10px] text-rose-200/90">Hindari berhadapan langsung dengan mulut naga.</p>
            </div>

            <div className="bg-emerald-950/70 border border-emerald-800/80 p-3.5 rounded-xl space-y-1">
              <span className="text-emerald-300 font-bold block text-[11px] uppercase">
                ✨ Arah Baik & Selamat:
              </span>
              <div className="text-sm font-black text-white">{dataHari.anjuranArahBaik}</div>
              <p className="text-[10px] text-emerald-200/90">Arah lapang pembawa ketentraman dan kelancaran.</p>
            </div>
          </div>

          {/* Etnosains Callout */}
          <div className="bg-blue-900/40 border border-blue-700/60 p-4 rounded-xl text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Kajian Etnosains & Rasionalitas Ilmiah Leluhur:</span>
            </div>
            <p className="text-blue-100 leading-relaxed text-xs">
              {dataHari.penjelasanObjektif}
            </p>
          </div>
        </div>
      </div>

      {/* Bagian 2: Pantangan Tata Ruang & Menghadap Rumah */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
        <div>
          <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
            <span className="w-2 h-4 bg-blue-900 rounded-full" />
            Pantangan Mendirikan Rumah & Arsitektur Tradisional
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Mengapa Primbon melarang bentuk lahan atau arah hadap tertentu? Berikut tinjauan sains lingkungan dan keselamatannya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PANTANGAN_RUMAH_DATA.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
            >
              <div className="font-bold text-slate-900 text-sm flex items-start gap-2">
                <span className="text-rose-700 font-black">#{idx + 1}</span>
                <span>{item.judul}</span>
              </div>

              <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-rose-900 text-[11px]">
                <strong>Peringatan Tradisional:</strong> {item.laranganTradisional}
              </div>

              <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-xl text-blue-950 text-[11px] space-y-1">
                <strong className="text-blue-900 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  Kajian Etnosains & Arsitektur Tropis:
                </strong>
                <p className="text-slate-700 leading-relaxed">
                  {item.kajianEtnosains}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Kelola Weton Pantangan */}
      <WetonPantanganModal
        isOpen={isPantanganModalOpen}
        onClose={() => setIsPantanganModalOpen(false)}
      />
    </div>
  );
};
