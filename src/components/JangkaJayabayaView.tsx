import React, { useState, useMemo } from 'react';
import {
  Crown,
  Scroll,
  Shield,
  Sparkles,
  Calendar,
  Compass,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Award
} from 'lucide-react';
import { hitungWetonLengkap, hitungSatriyaJayabaya } from '../utils/javaneseCalendar';
import { SATRIYA_JAYABAYA_DATA, SIKLUS_ZAMAN_JAYABAYA } from '../data/jayabayaData';
import { InlinePantanganStep } from './InlinePantanganStep';
import { PiagamPetungModal } from './PiagamPetungModal';

interface JangkaJayabayaViewProps {
  onOpenPantanganModal: () => void;
  onOpenSatriyaModal?: () => void;
}

export const JangkaJayabayaView: React.FC<JangkaJayabayaViewProps> = ({
  onOpenPantanganModal,
  onOpenSatriyaModal,
}) => {
  const [isPiagamModalOpen, setIsPiagamModalOpen] = useState(false);
  const [tanggalLahir, setTanggalLahir] = useState<string>('1990-05-15');
  const [selectedZamanTab, setSelectedZamanTab] = useState<number>(1); // Default ke Zaman Kalatidha

  const wetonInfo = useMemo(() => {
    return hitungWetonLengkap(tanggalLahir);
  }, [tanggalLahir]);

  const satriyaInfo = useMemo(() => {
    return hitungSatriyaJayabaya(wetonInfo.neptuTotal);
  }, [wetonInfo]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Utama Modul */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              <Crown className="w-3.5 h-3.5 text-amber-700" />
              Kolaborasi Kitab Jangka Jayabaya & Betaljemur Adammakna
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Watak 7 Satriya Jayabaya & Orientasi Zaman
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Menggali potensi kepemimpinan luhur Nusantara berdasarkan Serat Jangka Jayabaya (Prabu Sri Aji Jayabaya) yang dikolaborasikan dengan neptu weton kraton dan ramalan zaman Serat Kalatidha.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:self-start">
            {onOpenSatriyaModal && (
              <button
                type="button"
                onClick={onOpenSatriyaModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-2xl shadow-xs transition active:scale-95"
              >
                <Crown className="w-4 h-4" />
                Cek Watak Satriya Cepat
              </button>
            )}
          </div>
        </div>

        {/* Input Tanggal Lahir Pengguna */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <label htmlFor="input-tgl-jayabaya" className="block text-xs font-bold text-slate-700">
              Masukkan Tanggal Lahir untuk Mengetahui Karakter Satriya Anda:
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                id="input-tgl-jayabaya"
                type="date"
                value={tanggalLahir}
                onChange={(e) => {
                  if (e.target.value) setTanggalLahir(e.target.value);
                }}
                className="w-full bg-white border border-slate-300 text-slate-900 text-sm font-semibold rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Weton: <strong className="text-slate-800">{wetonInfo.hari} {wetonInfo.pasaran}</strong> (Neptu: {wetonInfo.neptuTotal}, Wuku: {wetonInfo.wuku}).
            </p>
          </div>

          <div className="md:col-span-7 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent p-5 rounded-2xl border border-amber-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                Tipe Karakter Satriya Jayabaya Anda
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                {satriyaInfo.nama}
              </h3>
              <p className="text-xs font-bold text-amber-800 italic">
                "{satriyaInfo.gelarSanskerta}"
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-amber-200 sm:pl-4">
              <span className="text-[11px] text-slate-500 block">Kecocokan Neptu:</span>
              <span className="text-sm font-black text-slate-800">
                {satriyaInfo.neptuCocok.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HASIL ANALISIS MENDALAM SATRIYA JAYABAYA ANDA */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-xs">
              👑
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                Tafsir Kepemimpinan Nusantara
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Potensi Budi Pekerti & Jiwa Kepemimpinan: {satriyaInfo.nama}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPiagamModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 text-xs font-black rounded-xl transition shadow-xs"
            title="Cetak Piagam Watak Satriya Jayabaya"
          >
            <Award className="w-4 h-4" />
            <span>Cetak Piagam Satriya</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Karakter Utama Lahir:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {satriyaInfo.karakterUtama}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-blue-600" />
                Gaya Kepemimpinan & Pengaruh:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {satriyaInfo.gayaKepemimpinan}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-600" />
                Peran dalam Dinamika Peradaban:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {satriyaInfo.korelasiPeradaban}
              </p>
            </div>

            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-1.5">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-700" />
                Nasihat Luhur Leluhur (*Piwulang Becik*):
              </span>
              <p className="text-xs sm:text-sm text-slate-800 font-serif italic leading-relaxed">
                {satriyaInfo.nasihatLuhur}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ENSIKLOPEDIA 7 SATRIYA UTAMA JAYABAYA */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-5">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
            Doktrin 7 Watak Pemimpin Agung
          </span>
          <h2 className="text-xl font-black text-slate-900">
            Daftar Lengkap 7 Karakter Satriya dalam Serat Jangka Jayabaya
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Setiap manusia terlahir mengemban satu dari tujuh watak satriya penjaga harmoni alam nusantara.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SATRIYA_JAYABAYA_DATA.map((satriya) => {
            const isUserSatriya = satriya.nomor === satriyaInfo.nomor;

            return (
              <div
                key={satriya.nomor}
                className={`p-5 rounded-2xl border transition-all ${
                  isUserSatriya
                    ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/50 shadow-xs'
                    : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                    Satriya #{satriya.nomor}
                  </span>
                  {isUserSatriya && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500 text-slate-950">
                      Watak Anda
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-slate-900">
                  {satriya.nama}
                </h3>
                <p className="text-xs font-semibold text-amber-800 mb-2 italic">
                  {satriya.gelarSanskerta}
                </p>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                  {satriya.karakterUtama}
                </p>

                <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Neptu Weton:</span>
                  <span className="font-bold text-slate-800">
                    {satriya.neptuCocok.join(', ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SIKLUS ZAMAN JAYABAYA & SERAT KALATIDHA (RANGGAWARSITA) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
            Orientasi Zaman & Ramalan Kebudayaan
          </span>
          <h2 className="text-xl font-black text-slate-900">
            Siklus Zaman: Dari Kalatidha (Zaman Edan) Menuju Kalasuba (Zaman Keemasan)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Komparasi filosofi Serat Jangka Jayabaya dan Serat Kalatidha gubahan Pujangga Raden Ngabehi Ranggawarsita.
          </p>
        </div>

        {/* Tab Pilihan Zaman */}
        <div className="flex flex-wrap gap-2">
          {SIKLUS_ZAMAN_JAYABAYA.map((era, idx) => (
            <button
              key={era.zaman}
              type="button"
              onClick={() => setSelectedZamanTab(idx)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                selectedZamanTab === idx
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {era.zaman}
            </button>
          ))}
        </div>

        {/* Konten Era Zaman Terpilih */}
        {SIKLUS_ZAMAN_JAYABAYA[selectedZamanTab] && (
          <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {SIKLUS_ZAMAN_JAYABAYA[selectedZamanTab].zaman}
                </h3>
                <span className="text-xs font-semibold text-amber-700">
                  {SIKLUS_ZAMAN_JAYABAYA[selectedZamanTab].periode}
                </span>
              </div>
              <span className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-600 font-medium">
                Fase Peradaban
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {SIKLUS_ZAMAN_JAYABAYA[selectedZamanTab].kondisiPeradaban}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-800 block">
                Tanda-Tanda & Gejala Zaman:
              </span>
              <ul className="space-y-1.5">
                {SIKLUS_ZAMAN_JAYABAYA[selectedZamanTab].tandaTandaZaman.map((tanda, tIdx) => (
                  <li key={tIdx} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                    <span className="italic font-serif">{tanda}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 mt-3 space-y-1">
              <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Laku Batin: Eling lan Waspada:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {SIKLUS_ZAMAN_JAYABAYA[selectedZamanTab].lakuElingLanWaspada}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* MITIGASI ADAT PANTANGAN */}
      <InlinePantanganStep
        stepNumber={2}
        modulTitle="Mitigasi Hari Naas Sebelum Menjalankan Amanah / Kepemimpinan"
        onOpenFullModal={onOpenPantanganModal}
      />

      {/* Modal Piagam Satriya Jayabaya */}
      <PiagamPetungModal
        isOpen={isPiagamModalOpen}
        onClose={() => setIsPiagamModalOpen(false)}
        data={{
          judulPiagam: 'Piagam Serat Watak Satriya Jayabaya & Trah Kepemimpinan',
          nomorSurat: `WJ-JAYABAYA-${wetonInfo.neptuTotal}-${satriyaInfo.nomor}`,
          tanggalMasehi: new Date().toLocaleDateString('id-ID', { dateStyle: 'full' }),
          tanggalJawa: `${wetonInfo.tahunJawa}`,
          pihakSatu: {
            label: 'Penyandang Weton (Pribadi)',
            nama: 'Pribadi Penyandang Weton',
            weton: `${wetonInfo.hari} ${wetonInfo.pasaran}`,
            neptu: wetonInfo.neptuTotal,
            wuku: wetonInfo.wuku,
          },
          ringkasanHasil: {
            kategoriUtama: `Tipologi Satriya Ke-${satriyaInfo.nomor}: "${satriyaInfo.nama}"`,
            skorAtauSisa: `Gelar Sanskerta: "${satriyaInfo.gelarSanskerta}" • Neptu ${wetonInfo.neptuTotal}`,
            maknaAdat: satriyaInfo.karakterUtama,
            rekomendasiLuhur: `${satriyaInfo.nasihatLuhur} Gaya Kepemimpinan: ${satriyaInfo.gayaKepemimpinan}`,
          },
          catatanKhusus: [
            `Korelasi Peradaban: ${satriyaInfo.korelasiPeradaban}`,
            `Kecocokan Neptu Lahir: ${satriyaInfo.neptuCocok.join(', ')}`,
            `Laku Batin Era Kalatidha: Eling lan Waspada (R.Ng. Ranggawarsita)`,
          ],
        }}
      />
    </div>
  );
};
