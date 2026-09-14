import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Sparkles,
  HelpCircle,
  Flower2,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Info
} from 'lucide-react';
import { DAFTAR_SUKERTA } from '../data/ruwatanData';
import { cekStatusSukerta } from '../utils/javaneseCalendar';
import { SukertaDefinisi } from '../types/weton';
import { InlinePantanganStep } from './InlinePantanganStep';

interface RuwatanSukertaViewProps {
  onOpenPantanganModal: () => void;
}

export const RuwatanSukertaView: React.FC<RuwatanSukertaViewProps> = ({
  onOpenPantanganModal,
}) => {
  // State Form Deteksi Silsilah Saudara
  const [totalSaudara, setTotalSaudara] = useState<number>(2);
  const [urutanAnak, setUrutanAnak] = useState<number>(1);
  const [genderAnda, setGenderAnda] = useState<'L' | 'P'>('L');
  const [genderSaudaraList, setGenderSaudaraList] = useState<('L' | 'P')[]>(['L', 'P']);

  // Filter Kategori Katalog Sukerta
  const [filterKategori, setFilterKategori] = useState<string>('Semua');

  // Update daftar gender saudara saat total saudara berubah
  const handleTotalSaudaraChange = (newTotal: number) => {
    setTotalSaudara(newTotal);
    if (urutanAnak > newTotal) setUrutanAnak(newTotal);

    const newList: ('L' | 'P')[] = [];
    for (let i = 0; i < newTotal; i++) {
      if (i === urutanAnak - 1) {
        newList.push(genderAnda);
      } else {
        newList.push(genderSaudaraList[i] || (i % 2 === 0 ? 'L' : 'P'));
      }
    }
    setGenderSaudaraList(newList);
  };

  const handleGenderSaudaraChange = (index: number, val: 'L' | 'P') => {
    const updated = [...genderSaudaraList];
    updated[index] = val;
    setGenderSaudaraList(updated);
    if (index === urutanAnak - 1) {
      setGenderAnda(val);
    }
  };

  // Hasil Cek Sukerta
  const hasilSukerta = useMemo(() => {
    return cekStatusSukerta(urutanAnak, totalSaudara, genderAnda, genderSaudaraList);
  }, [urutanAnak, totalSaudara, genderAnda, genderSaudaraList]);

  // Katalog terfilter
  const filteredKatalog = useMemo(() => {
    if (filterKategori === 'Semua') return DAFTAR_SUKERTA;
    return DAFTAR_SUKERTA.filter((s) => s.kategori === filterKategori);
  }, [filterKategori]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Utama Modul */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
              Kitab Primbon Lukmanakim & Betaljemur Adammakna
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Deteksi Sukerta & Tata Laku Ruwatan
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Panduan mendalam mengenali status kelahiran Sukerta dalam silsilah keluarga, filosofi tolak bala sengkala Batara Kala, serta tata cara upacara ruwatan murwakala dan ubarampe sesaji adat.
            </p>
          </div>
        </div>

        {/* FORM DETEKSI SILSILAH KELAHIRAN */}
        <div className="mt-6 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-5">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-600" />
            Kalkulator Deteksi Sukerta Silsilah Saudara Kandung
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="select-total-saudara" className="block text-xs font-bold text-slate-700 mb-1">
                Jumlah Saudara Kandung:
              </label>
              <select
                id="select-total-saudara"
                value={totalSaudara}
                onChange={(e) => handleTotalSaudaraChange(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value={1}>1 Anak (Anak Tunggal)</option>
                <option value={2}>2 Bersaudara</option>
                <option value={3}>3 Bersaudara</option>
                <option value={4}>4 Bersaudara</option>
                <option value={5}>5 Bersaudara (Pandhawa/Pandhavi)</option>
              </select>
            </div>

            <div>
              <label htmlFor="select-urutan-anak" className="block text-xs font-bold text-slate-700 mb-1">
                Urutan Kelahiran Anda:
              </label>
              <select
                id="select-urutan-anak"
                value={urutanAnak}
                onChange={(e) => setUrutanAnak(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {Array.from({ length: totalSaudara }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Anak ke-{i + 1} {i === 0 ? '(Sulung/Barep)' : i === totalSaudara - 1 ? '(Bungsu/Ragil)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="select-gender-anda" className="block text-xs font-bold text-slate-700 mb-1">
                Jenis Kelamin Anda:
              </label>
              <select
                id="select-gender-anda"
                value={genderAnda}
                onChange={(e) => {
                  const val = e.target.value as 'L' | 'P';
                  setGenderAnda(val);
                  handleGenderSaudaraChange(urutanAnak - 1, val);
                }}
                className="w-full bg-white border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="L">Laki-Laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
          </div>

          {/* Konfigurasi Gender Tiap Saudara (jika lebih dari 1 anak) */}
          {totalSaudara > 1 && (
            <div className="pt-3 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Atur Urutan Gender Seluruh Saudara Kandung (Sulung ke Bungsu):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {Array.from({ length: totalSaudara }).map((_, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      i === urutanAnak - 1
                        ? 'bg-amber-100/70 border-amber-300 ring-2 ring-amber-400/40'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">
                      Anak ke-{i + 1} {i === urutanAnak - 1 ? '(Anda)' : ''}
                    </span>
                    <select
                      value={genderSaudaraList[i] || 'L'}
                      onChange={(e) => handleGenderSaudaraChange(i, e.target.value as 'L' | 'P')}
                      className="bg-slate-50 border border-slate-300 text-xs font-bold rounded-lg px-2 py-1 w-full focus:outline-none"
                    >
                      <option value="L">👦 Laki-laki</option>
                      <option value="P">👧 Perempuan</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* HASIL DETEKSI STATUS SUKERTA */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-5">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-xs ${
              hasilSukerta.isSukerta
                ? 'bg-rose-100 text-rose-900 border border-rose-300'
                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}>
              {hasilSukerta.isSukerta ? '🛡️' : '✨'}
            </div>
            <div>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                hasilSukerta.isSukerta
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                {hasilSukerta.isSukerta ? 'Kategori Sukerta Terdeteksi' : 'Bebas Sukerta Utama'}
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                {hasilSukerta.isSukerta && hasilSukerta.sukertaMatch
                  ? hasilSukerta.sukertaMatch.sebutanJawa
                  : 'Bukan Termasuk Sukerta Utama'}
              </h2>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {hasilSukerta.analisisAdat}
        </p>

        {hasilSukerta.isSukerta && hasilSukerta.sukertaMatch && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-4">
              <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200 space-y-1.5">
                <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Potensi Ancaman Sengkala (Kosmologi Batara Kala):
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {hasilSukerta.sukertaMatch.ancamanSengkala}
                </p>
              </div>

              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200 space-y-1.5">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Tata Cara Ruwatan Murwakala yang Dianjurkan:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {hasilSukerta.sukertaMatch.tataCaraRuwatan}
                </p>
              </div>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-2">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                Ubarampe & Sesaji Ruwatan Adat:
              </span>
              <ul className="space-y-1.5 pt-1">
                {hasilSukerta.sukertaMatch.ubarampeSesaji.map((sesaji, sIdx) => (
                  <li key={sIdx} className="text-xs text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                    <span className="font-semibold">{sesaji}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-slate-500 italic pt-2 border-t border-amber-200">
                Ubarampe di atas disajikan bersama doa keselamatan tulus kepada Tuhan Yang Maha Esa dan sedekah kepada kaum dhuafa.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* KATALOG LENGKAP KELAHIRAN SUKERTA */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
              Khazanah Kitab Lukmanakim
            </span>
            <h2 className="text-xl font-black text-slate-900">
              Katalog Lengkap 12 Kelahiran Sukerta Tradisi Jawa
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['Semua', 'Tunggal', 'Sepasang', 'Tiga Saudara', 'Lima (Pandhawa)', 'Khusus/Unik'].map((kat) => (
              <button
                key={kat}
                type="button"
                onClick={() => setFilterKategori(kat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                  filterKategori === kat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredKatalog.map((sukerta) => (
            <div
              key={sukerta.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                  {sukerta.kategori}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">
                {sukerta.sebutanJawa}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {sukerta.deskripsiKelahiran}
              </p>

              <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                <div>
                  <strong className="text-slate-700">Mitigasi:</strong> {sukerta.tataCaraRuwatan}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MITIGASI ADAT PANTANGAN */}
      <InlinePantanganStep
        stepNumber={2}
        modulTitle="Mitigasi Hari Naas Sebelum Menyelenggarakan Upacara Ruwatan"
        onOpenFullModal={onOpenPantanganModal}
      />
    </div>
  );
};
