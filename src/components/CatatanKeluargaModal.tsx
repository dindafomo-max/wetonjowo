import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Plus,
  Trash2,
  Calendar,
  X,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Crown,
  HeartHandshake,
  Check
} from 'lucide-react';
import { hitungWetonLengkap, hitungSatriyaJayabaya, formatDateDDMMYYYY } from '../utils/javaneseCalendar';
import { TabView } from '../types/weton';

export interface AnggotaKeluarga {
  id: string;
  nama: string;
  hubungan: 'Diri Sendiri' | 'Pasangan' | 'Ayah' | 'Ibu' | 'Anak' | 'Saudara Kandung' | 'Rekan Bisnis';
  tanggalLahir: string;
  wetonStr: string;
  neptu: number;
  wuku: string;
  satriyaNama: string;
}

const STORAGE_KEY = 'weton_jowo_family_notebook';

const DEFAULT_KELUARGA: AnggotaKeluarga[] = [
  {
    id: '1',
    nama: 'Raden Mas Bagus',
    hubungan: 'Diri Sendiri',
    tanggalLahir: '1992-08-14',
    wetonStr: 'Jemuwah Wage',
    neptu: 10,
    wuku: 'Langkir',
    satriyaNama: 'Satriya Pinandhita Sinungan Kadar'
  },
  {
    id: '2',
    nama: 'Dewi Sekar Kedhaton',
    hubungan: 'Pasangan',
    tanggalLahir: '1995-11-20',
    wetonStr: 'Senen Pon',
    neptu: 11,
    wuku: 'Manahil',
    satriyaNama: 'Satriya Boyong Pambukaning Praja'
  }
];

interface CatatanKeluargaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMemberForModule?: (member: AnggotaKeluarga, targetModule: TabView['id']) => void;
}

export const CatatanKeluargaModal: React.FC<CatatanKeluargaModalProps> = ({
  isOpen,
  onClose,
  onSelectMemberForModule,
}) => {
  const [daftarKeluarga, setDaftarKeluarga] = useState<AnggotaKeluarga[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_KELUARGA;
  });

  // Form State Tambah Anggota Baru
  const [isAdding, setIsAdding] = useState(false);
  const [inputNama, setInputNama] = useState('');
  const [inputHubungan, setInputHubungan] = useState<AnggotaKeluarga['hubungan']>('Anak');
  const [inputTgl, setInputTgl] = useState('2000-01-01');

  // Preview Weton saat mengetik tanggal
  const previewWeton = useMemo(() => {
    return hitungWetonLengkap(inputTgl);
  }, [inputTgl]);

  const previewSatriya = useMemo(() => {
    return hitungSatriyaJayabaya(previewWeton.neptuTotal);
  }, [previewWeton]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(daftarKeluarga));
    } catch {
      // ignore
    }
  }, [daftarKeluarga]);

  const handleSimpanAnggota = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputNama.trim()) return;

    const baru: AnggotaKeluarga = {
      id: Date.now().toString(),
      nama: inputNama.trim(),
      hubungan: inputHubungan,
      tanggalLahir: inputTgl,
      wetonStr: `${previewWeton.hari} ${previewWeton.pasaran}`,
      neptu: previewWeton.neptuTotal,
      wuku: previewWeton.wuku,
      satriyaNama: previewSatriya.nama,
    };

    setDaftarKeluarga((prev) => [baru, ...prev]);
    setInputNama('');
    setIsAdding(false);
  };

  const handleHapus = (id: string) => {
    setDaftarKeluarga((prev) => prev.filter((item) => item.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-rose-950 text-white flex items-center justify-between border-b border-blue-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              👨‍👩‍👧‍👦
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>Buku Catatan Silsilah Weton Keluarga</span>
                <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
                  {daftarKeluarga.length} Profil
                </span>
              </h2>
              <p className="text-xs text-blue-200">
                Penyimpan Riwayat Weton, Neptu & Watak Satriya untuk Keluarga Besar
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

        {/* Action Button & Form Section */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          {!isAdding ? (
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                Daftar Profil Weton Tersimpan:
              </span>
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Anggota Keluarga</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSimpanAnggota} className="bg-white p-4 rounded-2xl border border-slate-300 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900">
                  Tambah Profil Anggota Baru:
                </span>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-xs text-slate-400 hover:text-slate-700"
                >
                  Batal
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Nama Lengkap:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ananda Arya"
                    value={inputNama}
                    onChange={(e) => setInputNama(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Hubungan Keluarga:
                  </label>
                  <select
                    value={inputHubungan}
                    onChange={(e) => setInputHubungan(e.target.value as AnggotaKeluarga['hubungan'])}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="Diri Sendiri">Diri Sendiri</option>
                    <option value="Pasangan">Pasangan (Suami/Istri)</option>
                    <option value="Ayah">Ayah</option>
                    <option value="Ibu">Ibu</option>
                    <option value="Anak">Anak</option>
                    <option value="Saudara Kandung">Saudara Kandung</option>
                    <option value="Rekan Bisnis">Rekan Bisnis / Sahabat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Tanggal Lahir Masehi:
                  </label>
                  <input
                    type="date"
                    required
                    value={inputTgl}
                    onChange={(e) => setInputTgl(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              {/* Preview Hasil Petung */}
              <div className="bg-amber-50/70 border border-amber-200 p-2.5 rounded-xl text-xs text-amber-950 flex flex-wrap items-center justify-between gap-2">
                <span>
                  Weton: <strong>{previewWeton.hari} {previewWeton.pasaran}</strong> (Neptu: {previewWeton.neptuTotal}, Wuku: {previewWeton.wuku})
                </span>
                <span className="text-[11px] font-semibold text-amber-800">
                  Watak: {previewSatriya.nama}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
                >
                  Simpan Profil
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Daftar Kartu Profil Keluarga */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {daftarKeluarga.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <div className="text-3xl">👨‍👩‍👦</div>
              <h4 className="text-sm font-bold text-slate-800">Belum ada anggota keluarga</h4>
              <p className="text-xs text-slate-500">
                Klik tombol "Tambah Anggota Keluarga" untuk menyimpan weton orang tua, pasangan, atau anak-anak tercinta.
              </p>
            </div>
          ) : (
            daftarKeluarga.map((member) => (
              <div
                key={member.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold">
                      {member.hubungan}
                    </span>
                    <h3 className="text-sm font-black text-slate-900">
                      {member.nama}
                    </h3>
                  </div>

                  <div className="text-xs text-slate-600 flex flex-wrap items-center gap-2">
                    <span>Lahir: <strong>{formatDateDDMMYYYY(member.tanggalLahir)}</strong></span>
                    <span>•</span>
                    <span className="text-slate-900 font-bold">
                      {member.wetonStr}
                    </span>
                    <span className="px-2 py-0.2 bg-amber-100 text-amber-900 rounded-full font-bold text-[10px] border border-amber-300">
                      Neptu {member.neptu}
                    </span>
                    <span>•</span>
                    <span className="text-slate-500 text-[11px]">
                      Wuku {member.wuku}
                    </span>
                  </div>

                  <div className="text-[11px] text-amber-800 font-medium">
                    👑 {member.satriyaNama}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  {onSelectMemberForModule && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectMemberForModule(member, 'rejeki');
                        }}
                        className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-bold transition flex items-center gap-1"
                        title="Lihat Pal Srigati Rezeki"
                      >
                        <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                        <span className="hidden sm:inline text-[11px]">Rezeki</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectMemberForModule(member, 'jayabaya');
                        }}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition flex items-center gap-1"
                        title="Lihat Karakter Satriya Jayabaya"
                      >
                        <Crown className="w-3.5 h-3.5 text-slate-700" />
                        <span className="hidden sm:inline text-[11px]">Satriya</span>
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => handleHapus(member.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Hapus Profil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Modal */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Tersimpan otomatis di penyimpanan lokal perangkat</span>
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
