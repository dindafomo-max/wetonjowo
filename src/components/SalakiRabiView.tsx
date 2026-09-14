import React, { useState, useMemo } from 'react';
import { Heart, Scale, Users, ShieldAlert, Sparkles, CheckCircle, Info, ShieldCheck, Printer, Award, BookOpen, Moon } from 'lucide-react';
import { hitungSalakiRabi } from '../utils/petungCalculators';
import { useWetonPantangan } from '../context/WetonPantanganContext';
import { InlinePantanganStep } from './InlinePantanganStep';
import { WetonPantanganModal } from './WetonPantanganModal';
import { PiagamPetungModal, PiagamData } from './PiagamPetungModal';

export const SalakiRabiView: React.FC = () => {
  const { activePantanganList, checkIsPantangan } = useWetonPantangan();
  const [isPantanganModalOpen, setIsPantanganModalOpen] = useState(false);
  const [isPiagamModalOpen, setIsPiagamModalOpen] = useState(false);

  const [namaPria, setNamaPria] = useState('Danang Sutawijaya');
  const [tglLahirPria, setTglLahirPria] = useState('1995-03-15');
  const [anakKePria, setAnakKePria] = useState<number>(1);

  const [namaWanita, setNamaWanita] = useState('Retno Dumilah');
  const [tglLahirWanita, setTglLahirWanita] = useState('1997-11-20');
  const [anakKeWanita, setAnakKeWanita] = useState<number>(4);

  const hasilPetung = useMemo(() => {
    return hitungSalakiRabi(
      { nama: namaPria, tglLahir: tglLahirPria, anakKe: anakKePria },
      { nama: namaWanita, tglLahir: tglLahirWanita, anakKe: anakKeWanita }
    );
  }, [namaPria, tglLahirPria, anakKePria, namaWanita, tglLahirWanita, anakKeWanita]);

  // Cek benturan weton calon dengan weton pantangan keluarga
  const pantanganPria = useMemo(() => {
    return checkIsPantangan(hasilPetung.pria.weton.hari, hasilPetung.pria.weton.pasaran);
  }, [checkIsPantangan, hasilPetung.pria.weton]);

  const pantanganWanita = useMemo(() => {
    return checkIsPantangan(hasilPetung.wanita.weton.hari, hasilPetung.wanita.weton.pasaran);
  }, [checkIsPantangan, hasilPetung.wanita.weton]);

  // Cek Pantangan Adat Selawe (Neptu 25)
  const isNeptu25 = hasilPetung.totalNeptu === 25;

  const matchedPantanganText = useMemo(() => {
    const alerts: string[] = [];
    if (pantanganPria.isPantangan) {
      alerts.push(`Calon Pria bertepatan dengan ${pantanganPria.alasan}`);
    }
    if (pantanganWanita.isPantangan) {
      alerts.push(`Calon Wanita bertepatan dengan ${pantanganWanita.alasan}`);
    }
    if (isNeptu25) {
      alerts.push('Neptu Berjumlah 25 (Pantangan Selawe / Wage-Pahing)');
    }
    return alerts.length > 0 ? alerts.join(' & ') : null;
  }, [pantanganPria, pantanganWanita, isNeptu25]);

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-rose-950 text-white rounded-3xl p-5 shadow-sm border border-blue-800/80">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold mb-2">
          <span>⚖️</span> Modul 2 Betaljemur Adammakna
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
          Petung Salaki-Rabi & Kecocokan Pasangan Hidup
        </h2>
        <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
          Kalkulasi komprehensif neptu pria dan wanita dengan metode pembagian sisa 8 (Pegat, Ratu, Jodoh, Topo, Tinari, Padu, Sujanan, Pesthi) serta aturan urutan kelahiran adat (Jipang, Lusan) dengan mitigasi arif.
        </p>
      </div>

      {/* Input Form Box */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pria */}
        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/90 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              <span>👨</span> Calon Suami (Pria)
            </span>
            <span className="text-xs font-black bg-blue-900 text-white px-2.5 py-0.5 rounded-full">
              Neptu {hasilPetung.pria.weton.neptuTotal}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Nama Pria</label>
            <input
              type="text"
              value={namaPria}
              onChange={(e) => setNamaPria(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Tanggal Lahir</label>
              <input
                type="date"
                value={tglLahirPria}
                onChange={(e) => setTglLahirPria(e.target.value)}
                className="w-full text-xs px-2.5 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Urutan Kelahiran</label>
              <select
                value={anakKePria}
                onChange={(e) => setAnakKePria(Number(e.target.value))}
                className="w-full text-xs px-2.5 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 outline-none"
              >
                <option value={1}>Anak ke-1 (Pambarep)</option>
                <option value={2}>Anak ke-2 (Panengah)</option>
                <option value={3}>Anak ke-3 (Pandhadha)</option>
                <option value={4}>Anak ke-4 (Sumendi)</option>
                <option value={5}>Anak ke-5 atau Lebih</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-blue-950 bg-white p-2.5 rounded-xl border border-blue-200">
            Weton: <strong>{hasilPetung.pria.weton.hari} {hasilPetung.pria.weton.pasaran}</strong> ({hasilPetung.pria.weton.neptuHari} + {hasilPetung.pria.weton.neptuPasaran}) • Wuku <strong>{hasilPetung.pria.weton.wuku}</strong>
          </div>
        </div>

        {/* Wanita */}
        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/90 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <span>👩</span> Calon Istri (Wanita)
            </span>
            <span className="text-xs font-black bg-rose-900 text-white px-2.5 py-0.5 rounded-full">
              Neptu {hasilPetung.wanita.weton.neptuTotal}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Nama Wanita</label>
            <input
              type="text"
              value={namaWanita}
              onChange={(e) => setNamaWanita(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Tanggal Lahir</label>
              <input
                type="date"
                value={tglLahirWanita}
                onChange={(e) => setTglLahirWanita(e.target.value)}
                className="w-full text-xs px-2.5 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Urutan Kelahiran</label>
              <select
                value={anakKeWanita}
                onChange={(e) => setAnakKeWanita(Number(e.target.value))}
                className="w-full text-xs px-2.5 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-800 outline-none"
              >
                <option value={1}>Anak ke-1 (Pambarep)</option>
                <option value={2}>Anak ke-2 (Panengah)</option>
                <option value={3}>Anak ke-3 (Pandhadha)</option>
                <option value={4}>Anak ke-4 (Sumendi)</option>
                <option value={5}>Anak ke-5 atau Lebih</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-rose-950 bg-white p-2.5 rounded-xl border border-rose-200">
            Weton: <strong>{hasilPetung.wanita.weton.hari} {hasilPetung.wanita.weton.pasaran}</strong> ({hasilPetung.wanita.weton.neptuHari} + {hasilPetung.wanita.weton.neptuPasaran}) • Wuku <strong>{hasilPetung.wanita.weton.wuku}</strong>
          </div>
        </div>
      </div>

      {/* TAHAP 2: FITUR PROTEKSI DI DALAM MENU SEBELUM HASIL KECOCOKAN DITAMPILKAN */}
      <InlinePantanganStep
        stepNumber={2}
        modulTitle="Kecocokan Jodoh & Pantangan Keluarga"
        matchedAlert={matchedPantanganText}
        onOpenFullModal={() => setIsPantanganModalOpen(true)}
      />

      {/* Main Result Showcase Card */}
      <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-rose-950 text-white rounded-3xl p-5 shadow-xl border border-blue-800/80 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-800/80 pb-3">
          <div>
            <div className="text-xs text-rose-300 font-bold uppercase tracking-wider">
              Hasil Petung Utama Pembagian Sisa 8
            </div>
            <div className="flex items-baseline space-x-3 mt-1">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Kategori: "{hasilPetung.kategori8.nama}"
              </h3>
              <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-rose-800 border border-rose-400 text-rose-100">
                Sisa {hasilPetung.kategori8.sisa}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-blue-300 font-semibold">Tingkat Kecocokan</div>
              <div className="text-2xl font-black text-emerald-400">
                {hasilPetung.kategori8.tingkatKecocokan}%
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPiagamModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl transition shadow-md flex items-center gap-1.5 shrink-0"
              title="Cetak Piagam Surat Petung Adat Keraton"
            >
              <Award className="w-4 h-4 text-amber-950" />
              <span>Cetak Piagam Adat</span>
            </button>
          </div>
        </div>

        {/* Makna & Prediksi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-blue-900/40 p-4 rounded-2xl border border-blue-700/50 space-y-2">
            <div className="font-bold text-blue-200 text-sm flex items-center gap-1.5">
              <span>📖</span> Makna & Tafsir Kitab Betaljemur:
            </div>
            <p className="text-white font-medium text-xs leading-relaxed">
              {hasilPetung.kategori8.makna}
            </p>
            <p className="text-blue-100/80 leading-relaxed text-[11px]">
              {hasilPetung.kategori8.prediksi}
            </p>
          </div>

          <div className="bg-rose-900/30 p-4 rounded-2xl border border-rose-700/50 space-y-2">
            <div className="font-bold text-rose-200 text-sm flex items-center gap-1.5">
              <span>🛡️</span> Nasehat Mitigasi Budaya & Kehidupan:
            </div>
            <p className="text-rose-100 leading-relaxed text-xs">
              {hasilPetung.kategori8.rekomendasiMitigasi}
            </p>
          </div>
        </div>

        {/* 3 Sistem Perhitungan Komparasi (Sisa 8, Pancasuda 5, Petung 7) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-xs">
            <span className="text-blue-300 font-medium block">Pembagian 8:</span>
            <div className="font-bold text-white text-sm">{hasilPetung.kategori8.nama}</div>
            <p className="text-[10px] text-blue-200 mt-0.5">{hasilPetung.kategori8.status}</p>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-xs">
            <span className="text-rose-300 font-medium block">Pancasuda (Sisa 5):</span>
            <div className="font-bold text-white text-sm">{hasilPetung.pancasuda5.nama}</div>
            <p className="text-[10px] text-rose-200 mt-0.5">{hasilPetung.pancasuda5.makna}</p>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-xs">
            <span className="text-amber-300 font-medium block">Petung 7 (Sangarwaringin):</span>
            <div className="font-bold text-white text-sm">{hasilPetung.petung7.nama}</div>
            <p className="text-[10px] text-amber-200 mt-0.5">{hasilPetung.petung7.makna}</p>
          </div>
        </div>

        {/* Peringatan Urutan Kelahiran (Jipang / Lusan / Sulung-Sulung) */}
        <div className="bg-blue-950/90 border border-blue-700/80 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="font-bold text-rose-300 text-xs sm:text-sm flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Analisis Urutan Kelahiran: {hasilPetung.analisisKelahiran.namaPeringatan}</span>
            </div>
            {(hasilPetung.analisisKelahiran.isJipang || hasilPetung.analisisKelahiran.isLusan) && (
              <span className="text-[10px] bg-rose-950 border border-rose-600 text-rose-300 px-2 py-0.5 rounded-full font-bold">
                Perlu Mitigasi Adat
              </span>
            )}
          </div>

          <p className="text-xs text-blue-100 leading-relaxed">
            {hasilPetung.analisisKelahiran.uraian}
          </p>

          <div className="bg-rose-900/30 p-2.5 rounded-xl border border-rose-800/40 text-[11px] text-rose-200">
            <strong>Penangkal & Solusi Budaya:</strong> {hasilPetung.analisisKelahiran.mitigasiKultural}
          </div>
        </div>

        {/* Analisis Khusus Weton Pantangan Multi-Hari Keluarga */}
        <div className="bg-slate-900/90 border border-amber-500/40 p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-bold text-amber-300 text-xs sm:text-sm flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Analisis Weton Pantangan Silsilah ({activePantanganList.length} Hari Dipantangi)</span>
            </div>
            {matchedPantanganText ? (
              <span className="text-[10px] bg-rose-950 border border-rose-600 text-rose-300 px-2.5 py-0.5 rounded-full font-bold">
                ⚠️ Ada Benturan Pantangan
              </span>
            ) : (
              <span className="text-[10px] bg-emerald-950 border border-emerald-600 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Bersih dari Pantangan
              </span>
            )}
          </div>

          <div className="text-xs text-slate-300 leading-relaxed space-y-2">
            {matchedPantanganText ? (
              <div className="bg-rose-950/60 border border-rose-700/60 p-3 rounded-xl text-rose-200 text-xs space-y-1">
                <strong>Catatan Larangan Adat:</strong>
                <p>{matchedPantanganText}</p>
                <p className="text-[11px] text-rose-300/90 pt-1">
                  <em>Mitigasi Betaljemur:</em> Jika weton pengantin bertepatan dengan geblak orang tua/leluhur, keluarga dianjurkan mengadakan ziarah kubur mendoakan arwah leluhur, memohon restu pinisepuh, serta mengadakan sedekah jenang suran sebelum melangsungkan rangkaian hajat perkawinan.
                </p>
              </div>
            ) : (
              <p className="text-slate-300 text-xs">
                Weton kedua calon ({hasilPetung.pria.weton.hari} {hasilPetung.pria.weton.pasaran} & {hasilPetung.wanita.weton.hari} {hasilPetung.wanita.weton.pasaran}) tidak berbenturan dengan weton pantangan keluarga tersimpan. Hubungan ini tidak menabrak hari naas maupun hari wafat (geblak) leluhur yang didaftarkan.
              </p>
            )}

            {isNeptu25 && (
              <div className="bg-amber-950/60 border border-amber-700/60 p-2.5 rounded-xl text-amber-200 text-[11px]">
                <strong>Perhatian Adat Selawe (25):</strong> Pasangan neptu 25 (Wage + Pahing) menurut kepercayaan sebagian daerah sering diuji kestabilan ekonomi awal. Solusi adat: akad nikah dilangsungkan pada hari berneptu Sandang/Sri dan mengadakan doa selamatan tumpeng robyong.
              </div>
            )}
          </div>
        </div>

        {/* Integrasi Hadits Nabi & Kaidah Fiqih Pernikahan */}
        <div className="bg-emerald-950/90 border border-emerald-600/70 p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-bold text-emerald-300 text-xs sm:text-sm flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Tinjauan Syariat: Hadits Kafa'ah & Kaidah Niat Pernikahan</span>
            </div>
            <span className="text-[10px] bg-emerald-900 border border-emerald-500 text-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
              Sunnah Rasulullah ﷺ
            </span>
          </div>

          <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-700/60 text-xs space-y-1.5">
            <p className="font-serif text-emerald-100 text-right text-sm">
              «فَاظْفَرْ بِذَاتِ الدِّينِ تَرِبَتْ يَدَاكَ»
            </p>
            <p className="text-emerald-200 text-[11px] leading-relaxed">
              <em>"Maka pilihlah pasangan yang memiliki komitmen agama, niscaya engkau akan beruntung."</em> (HR. Bukhari & Muslim)
            </p>
            <p className="text-emerald-300/90 text-[11px] pt-1">
              <strong>Kaidah Fiqhiyyah (الأمور بمقاصدها):</strong> Petung watak weton diposisikan sebagai ikhtiar awal memahami karakter psikologis pasangan. Dalam Islam, kesalehan agama, akhlak karimah, dan kesiapan komunikasi adalah kunci utama yang melengkapi dan memitigasi segala kekurangan watak bawaan.
            </p>
          </div>
        </div>

        {/* Ringkasan Objektif & Edukasi Non-Takhayul */}
        <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700 text-slate-300 text-xs leading-relaxed flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p>
            {hasilPetung.ringkasanObjektif}
          </p>
        </div>
      </div>

      {/* Modal Kelola Weton Pantangan */}
      <WetonPantanganModal
        isOpen={isPantanganModalOpen}
        onClose={() => setIsPantanganModalOpen(false)}
      />

      {/* Modal Piagam Petung Adat Keraton */}
      <PiagamPetungModal
        isOpen={isPiagamModalOpen}
        onClose={() => setIsPiagamModalOpen(false)}
        data={{
          judulPiagam: 'Piagam Serat Petung Salaki-Rabi',
          nomorSurat: `WJ-SR-${hasilPetung.totalNeptu}-${hasilPetung.pria.weton.neptuTotal}${hasilPetung.wanita.weton.neptuTotal}`,
          tanggalMasehi: new Date().toLocaleDateString('id-ID', { dateStyle: 'full' }),
          tanggalJawa: `${hasilPetung.pria.weton.tahunJawa}`,
          pihakSatu: {
            label: 'Calon Pengantin Kakung (Pria)',
            nama: namaPria || 'Calon Suami',
            weton: `${hasilPetung.pria.weton.hari} ${hasilPetung.pria.weton.pasaran}`,
            neptu: hasilPetung.pria.weton.neptuTotal,
            wuku: hasilPetung.pria.weton.wuku,
          },
          pihakDua: {
            label: 'Calon Pengantin Putri (Wanita)',
            nama: namaWanita || 'Calon Istri',
            weton: `${hasilPetung.wanita.weton.hari} ${hasilPetung.wanita.weton.pasaran}`,
            neptu: hasilPetung.wanita.weton.neptuTotal,
            wuku: hasilPetung.wanita.weton.wuku,
          },
          ringkasanHasil: {
            kategoriUtama: `Kategori: "${hasilPetung.kategori8.nama}" (Tingkat Kecocokan ${hasilPetung.kategori8.tingkatKecocokan}%)`,
            skorAtauSisa: `Neptu Total ${hasilPetung.totalNeptu} (Sisa 8: ${hasilPetung.kategori8.sisa})`,
            maknaAdat: hasilPetung.kategori8.makna,
            rekomendasiLuhur: hasilPetung.kategori8.rekomendasiMitigasi,
          },
          catatanKhusus: [
            `Pancasuda Perkawinan: ${hasilPetung.pancasuda5.nama} (${hasilPetung.pancasuda5.makna})`,
            `Petung Sangarwaringin (Sisa 7): ${hasilPetung.petung7.nama} (${hasilPetung.petung7.makna})`,
            `Urutan Kelahiran: ${hasilPetung.analisisKelahiran.namaPeringatan} - ${hasilPetung.analisisKelahiran.uraian}`,
            matchedPantanganText ? `Catatan Pantangan Adat: ${matchedPantanganText}` : 'Bersih dari benturan hari naas/geblak keluarga.',
          ],
        }}
      />
    </div>
  );
};
