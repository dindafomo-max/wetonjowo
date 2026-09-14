import React, { useState } from 'react';
import { useWetonPantangan } from '../context/WetonPantanganContext';
import { DAFTAR_HARI, DAFTAR_PASARAN } from '../data/primbonData';
import { HariJawa, PasaranJawa, WetonPantanganItem } from '../types/weton';
import { 
  ShieldAlert, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  X, 
  Info, 
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface WetonPantanganModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WetonPantanganModal: React.FC<WetonPantanganModalProps> = ({ isOpen, onClose }) => {
  const { 
    pantanganList, 
    activePantanganList, 
    addPantangan, 
    removePantangan, 
    togglePantangan, 
    resetToDefault 
  } = useWetonPantangan();

  const [selectedHari, setSelectedHari] = useState<HariJawa>('Setu');
  const [selectedPasaran, setSelectedPasaran] = useState<PasaranJawa>('Pon');
  const [selectedKategori, setSelectedKategori] = useState<WetonPantanganItem['kategori']>('Geblak Orang Tua');
  const [keterangan, setKeterangan] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const labelKet = keterangan.trim() || `${selectedKategori}: ${selectedHari} ${selectedPasaran}`;
    addPantangan({
      hari: selectedHari,
      pasaran: selectedPasaran,
      kategori: selectedKategori,
      keterangan: labelKet,
      aktif: true,
    });
    setKeterangan('');
    setShowAddForm(false);
  };

  const presetTemplates: Array<{
    hari: HariJawa;
    pasaran: PasaranJawa;
    kategori: WetonPantanganItem['kategori'];
    label: string;
  }> = [
    { hari: 'Setu', pasaran: 'Pon', kategori: 'Geblak Orang Tua', label: 'Geblak Ayah (Setu Pon)' },
    { hari: 'Rebo', pasaran: 'Wage', kategori: 'Geblak Orang Tua', label: 'Geblak Ibu (Rebo Wage)' },
    { hari: 'Senen', pasaran: 'Kliwon', kategori: 'Geblak Orang Tua', label: 'Geblak Eyang (Senen Kliwon)' },
    { hari: 'Kemis', pasaran: 'Wage', kategori: 'Hari Naas Pribadi', label: 'Hari Naas Diri (Kemis Wage)' },
    { hari: 'Jemuwah', pasaran: 'Pahing', kategori: 'Pantangan Keluarga', label: 'Pantangan Trah (Jemuwah Pahing)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-amber-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header (Navy Blue & Maroon Accent) */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-maroon-900 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight flex items-center gap-2">
                Kelola Weton Pantangan Multi-Hari
                <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                  {activePantanganList.length} Aktif
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Fitur proteksi adat Betaljemur Adammakna untuk semua modul
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Petunjuk Betaljemur Adammakna */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-amber-900 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-amber-950">
              <Info className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>Petunjuk Primbon Betaljemur Adammakna Bab Larangan Hajat:</span>
            </div>
            <p className="text-amber-800 leading-relaxed pl-6">
              Dalam adat Jawa, hajat agung (seperti Ijab Kabul, Boyongan Wisma, Tingkepan, dan Usaha) <strong>pantang keras</strong> dilaksanakan bertepatan dengan <em>Dina Geblak</em> (hari wafat ayah/ibu/kakek/nenek) dan <em>Dina Naas</em> keluarga. Anda dapat menambahkan <strong>lebih dari satu weton pantangan</strong> di bawah ini agar otomatis dihindari di seluruh modul.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Daftar Weton Pantangan Tersimpan ({pantanganList.length})
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetToDefault}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-navy-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
                title="Kembalikan ke pantangan bawaan (Geblak Ayah & Ibu)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Standar
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-navy-900 hover:bg-navy-800 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Tambah Hari Pantangan
              </button>
            </div>
          </div>

          {/* Form Tambah Weton Pantangan Baru */}
          {showAddForm && (
            <form onSubmit={handleAdd} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Tambah Weton Pantangan Baru
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  Batal
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Pilih Hari</label>
                  <select
                    value={selectedHari}
                    onChange={(e) => setSelectedHari(e.target.value as HariJawa)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  >
                    {DAFTAR_HARI.map((h) => (
                      <option key={h.nama} value={h.nama}>
                        {h.nama} ({h.aliasMasehi}) - Neptu {h.neptu}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Pilih Pasaran</label>
                  <select
                    value={selectedPasaran}
                    onChange={(e) => setSelectedPasaran(e.target.value as PasaranJawa)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  >
                    {DAFTAR_PASARAN.map((p) => (
                      <option key={p.nama} value={p.nama}>
                        {p.nama} - Neptu {p.neptu}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Kategori Pantangan</label>
                  <select
                    value={selectedKategori}
                    onChange={(e) => setSelectedKategori(e.target.value as WetonPantanganItem['kategori'])}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  >
                    <option value="Geblak Orang Tua">Geblak Orang Tua (Ayah/Ibu)</option>
                    <option value="Hari Naas Pribadi">Hari Naas Kelahiran Pribadi</option>
                    <option value="Pantangan Keluarga">Pantangan Keluarga / Trah</option>
                    <option value="Dina Sengkala">Dina Sengkala / Bahaya</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Catatan / Keterangan (Contoh: "Hari Wafat Ayah", "Geblak Ibu Mertua")
                </label>
                <input
                  type="text"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  placeholder={`Contoh: ${selectedKategori} (${selectedHari} ${selectedPasaran})`}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                {/* Preset Cepat */}
                <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500">
                  <span className="font-semibold">Preset cepat:</span>
                  {presetTemplates.slice(0, 3).map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedHari(tpl.hari);
                        setSelectedPasaran(tpl.pasaran);
                        setSelectedKategori(tpl.kategori);
                        setKeterangan(tpl.label);
                      }}
                      className="bg-slate-200 hover:bg-slate-300 px-1.5 py-0.5 rounded text-slate-700 transition-colors"
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-maroon-900 hover:bg-maroon-800 px-4 py-2 rounded-lg transition-colors ml-auto shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Simpan ke Daftar Pantangan
                </button>
              </div>
            </form>
          )}

          {/* List Kartu Weton Pantangan */}
          <div className="space-y-2">
            {pantanganList.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500 space-y-2">
                <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
                <p className="text-xs font-medium">Belum ada weton pantangan yang didaftarkan.</p>
                <p className="text-[11px] text-slate-400">
                  Tambahkan hari wafat orang tua (geblak) atau hari naas agar dihindari dalam perhitungan hajat.
                </p>
                <button
                  onClick={resetToDefault}
                  className="text-xs text-navy-900 font-semibold underline hover:text-navy-700"
                >
                  Muat Contoh Standar (Setu Pon & Rebo Wage)
                </button>
              </div>
            ) : (
              pantanganList.map((item) => {
                const isAktif = item.aktif;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      isAktif
                        ? 'bg-rose-50/70 border-rose-200 text-rose-950 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={() => togglePantangan(item.id)}
                        className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-colors flex-shrink-0 ${
                          isAktif
                            ? 'bg-rose-600 text-white hover:bg-rose-700'
                            : 'bg-slate-300 text-white hover:bg-slate-400'
                        }`}
                        title={isAktif ? 'Klik untuk nonaktifkan proteksi' : 'Klik untuk aktifkan proteksi'}
                      >
                        {isAktif ? <CheckCircle2 className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </button>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-bold text-sm tracking-wide text-navy-950">
                            {item.hari} {item.pasaran}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              item.kategori === 'Geblak Orang Tua'
                                ? 'bg-maroon-100 text-maroon-900 border border-maroon-200'
                                : item.kategori === 'Hari Naas Pribadi'
                                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                : 'bg-slate-200 text-slate-800'
                            }`}
                          >
                            {item.kategori}
                          </span>
                          {!isAktif && (
                            <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded">
                              Nonaktif
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 truncate mt-0.5">
                          {item.keterangan}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => removePantangan(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                        title="Hapus weton pantangan ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 sm:p-4 flex items-center justify-between text-xs">
          <div className="text-slate-600">
            <span className="font-semibold text-navy-950">{activePantanganList.length}</span> weton pantangan aktif memproteksi modul.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="bg-navy-900 hover:bg-navy-800 text-white font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            Selesai & Terapkan
          </button>
        </div>
      </div>
    </div>
  );
};
