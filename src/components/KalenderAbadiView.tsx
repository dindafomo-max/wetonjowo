import React, { useState, useMemo, useRef } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  ShieldAlert,
  CheckCircle2,
  Compass,
  Moon,
  Sun,
  Star,
  Printer,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Filter,
  Eye,
  AlertTriangle,
  Layers,
  ArrowRight,
  Download,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import {
  BULAN_MASEHI,
  BULAN_HIJRIAH,
  BULAN_JAWA,
  SIKLUS_TAHUN_JAWA,
  SIKLUS_WINDU,
  TanggalKalenderDetail,
  generateBulanKalenderAbadi
} from '../data/kalenderAbadiData';
import { hitungWetonLengkap, getPranataMangsa } from '../utils/javaneseCalendar';
import { hitungPetungArahLengkap } from '../data/nagaDinaData';
import { PasaranJawa } from '../types/weton';
import { printElement, downloadTextFile } from '../utils/printExportUtils';

interface KalenderAbadiViewProps {
  onNavigateToModule?: (moduleId: string) => void;
  onOpenWetonDetail?: (dateStr: string) => void;
}

export const KalenderAbadiView: React.FC<KalenderAbadiViewProps> = ({
  onNavigateToModule,
  onOpenWetonDetail
}) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth() + 1); // 1 - 12
  const [selectedDay, setSelectedDay] = useState<TanggalKalenderDetail | null>(null);

  // Filter State
  const [filterPasaran, setFilterPasaran] = useState<'semua' | PasaranJawa>('semua');
  const [filterKategori, setFilterKategori] = useState<'semua' | 'libur' | 'sakral' | 'purnama' | 'pantangan'>('semua');
  const [isCopied, setIsCopied] = useState(false);
  const [showEncyclopedia, setShowEncyclopedia] = useState(false);

  // Generate Matrix Hari Bulan Ini
  const daysInMonth = useMemo(() => {
    return generateBulanKalenderAbadi(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  // Set default selected day ke hari ini atau tanggal 1 bulan terpilih
  useMemo(() => {
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const foundToday = daysInMonth.find((d) => d.isoString === todayStr && d.isCurrentMonth);
    const firstCurrent = daysInMonth.find((d) => d.isCurrentMonth) || daysInMonth[0];
    setSelectedDay(foundToday || firstCurrent);
  }, [daysInMonth]);

  // Weton dan Petung Hari Terpilih
  const selectedWeton = useMemo(() => {
    if (!selectedDay) return null;
    return hitungWetonLengkap(selectedDay.isoString);
  }, [selectedDay]);

  const selectedPranata = useMemo(() => {
    if (!selectedDay) return null;
    return getPranataMangsa(selectedDay.isoString);
  }, [selectedDay]);

  const selectedPetungArah = useMemo(() => {
    if (!selectedWeton) return null;
    return hitungPetungArahLengkap(selectedWeton);
  }, [selectedWeton]);

  // Info Bulan Jawa dan Hijriah untuk Header
  const headerInfo = useMemo(() => {
    const midDay = daysInMonth.find((d) => d.isCurrentMonth && d.tanggalMasehi === 15) || daysInMonth[15];
    if (!midDay) return null;

    return {
      masehi: `${BULAN_MASEHI[currentMonth - 1]} ${currentYear}`,
      hijriah: `${midDay.namaBulanHijriah} ${midDay.tahunHijriah} H`,
      jawa: `${midDay.namaBulanJawa} ${midDay.tahunJawa} Jawa (Tahun ${midDay.namaTahunJawa}, Windu ${midDay.namaWindu})`
    };
  }, [daysInMonth, currentMonth, currentYear]);

  // Daftar Hari Besar & Hari Pasaran Sakral Bulan Ini
  const monthlyAgenda = useMemo(() => {
    const events: { day: TanggalKalenderDetail; title: string; desc: string; type: string }[] = [];
    daysInMonth.forEach((d) => {
      if (!d.isCurrentMonth) return;

      d.hariBesar.forEach((hb) => {
        events.push({
          day: d,
          title: hb.nama,
          desc: hb.keterangan,
          type: hb.kategori
        });
      });

      if (d.isJumatKliwon && !events.some((e) => e.day.isoString === d.isoString && e.title.includes('Jumat Kliwon'))) {
        events.push({
          day: d,
          title: 'Malam / Hari Jumat Kliwon',
          desc: 'Hari sakral Jawa bertuah tirakat dan doa keselamatan leluhur.',
          type: 'adat'
        });
      }

      if (d.isSelasaKliwon && !events.some((e) => e.day.isoString === d.isoString && e.title.includes('Selasa Kliwon'))) {
        events.push({
          day: d,
          title: 'Selasa Kliwon (Anggara Kasih)',
          desc: 'Dina Anggara Kasih untuk merawat ketenangan batin dan welas asih.',
          type: 'adat'
        });
      }

      if (d.isPurnama && !events.some((e) => e.day.isoString === d.isoString && e.title.includes('Purnama'))) {
        events.push({
          day: d,
          title: `Bulan Purnama (14-15 ${d.namaBulanJawa})`,
          desc: 'Fase bulan purnama bersinar penuh (Bulan Sidi).',
          type: 'astronomi'
        });
      }
    });

    return events;
  }, [daysInMonth]);

  // Navigasi Bulan
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleSetTodayMonth = () => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth() + 1);
  };

  const calendarPrintRef = useRef<HTMLDivElement>(null);

  // Salin Rangkuman Kalender Bulan Ini
  const handleCopyMonthSummary = () => {
    if (!headerInfo) return;
    const text = `📅 KALENDER ABADI JAWA (TRI-PENANGGALAN)
📆 Masehi: ${headerInfo.masehi}
🌙 Hijriah: ${headerInfo.hijriah}
☸ Kalender Jawa: ${headerInfo.jawa}

🌟 AGENDA HARI BESAR & HARI PASARAN BULAN INI:
${monthlyAgenda.map((ev) => `• ${ev.day.hariMasehi}, ${ev.day.tanggalMasehi} ${BULAN_MASEHI[currentMonth - 1]} (${ev.day.hariJawa} ${ev.day.pasaran}): ${ev.title}`).join('\n')}

Dihitung berdasar Kalender Sultan Agungan & Kitab Primbon Betaljemur Adammakna.`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Unduh Kalender format CSV
  const handleExportCSV = () => {
    const headers = 'Tanggal Masehi,Hari Masehi,Pasaran Jawa,Neptu,Wuku,Bulan Jawa,Tahun Jawa,Tanggal Hijriah,Keterangan/Agenda,Status Adat\n';
    const rows = daysInMonth.map((d) => {
      const isPantangan = d.isTaliwangke || d.isSamparwangke || d.isDinaSangar;
      const agenda = d.hariBesar || (d.isPurnama ? 'Purnama (14/15 Kamariah)' : (d.isTilem ? 'Tilem (Mati Bulan)' : '-'));
      const statusAdat = isPantangan ? 'Hari Pantangan Adat' : 'Aman / Netral';
      return `"${d.tanggalLengkap}","${d.hariMasehi}","${d.pasaran}",${d.neptuTotal},"${d.wuku}","${d.tanggalJawa} ${d.bulanJawa}","${d.tahunJawa} (${d.namaTahunJawa})","${d.tanggalHijriah} ${d.bulanHijriah}","${agenda}","${statusAdat}"`;
    }).join('\n');

    const csvContent = headers + rows;
    downloadTextFile(csvContent, `Kalender_Jawa_${BULAN_MASEHI[currentMonth - 1]}_${currentYear}.csv`, 'text/csv;charset=utf-8');
  };

  // Unduh Kalender format Dokumen Teks (.txt)
  const handleDownloadTxt = () => {
    if (!headerInfo) return;
    let txt = `===============================================================
KALENDER ABADI JAWA (TRI-SISTEM PENANGGALAN)
${headerInfo.masehi.toUpperCase()}
===============================================================
Konversi Hijriah : ${headerInfo.hijriah}
Konversi Jawa    : ${headerInfo.jawa}
Diterbitkan oleh : WETON JOWO (Kitab Primbon Betaljemur Adammakna)
===============================================================

DAFTAR HARI, PASARAN, NEPTU & WUKU:
---------------------------------------------------------------\n`;

    daysInMonth.forEach((d) => {
      const tags = [];
      if (d.hariBesar) tags.push(`[${d.hariBesar}]`);
      if (d.isPurnama) tags.push('[Purnama]');
      if (d.isTaliwangke) tags.push('[Taliwangke]');
      if (d.isSamparwangke) tags.push('[Samparwangke]');
      if (d.isDinaSangar) tags.push('[Dina Sangar]');

      const note = tags.length > 0 ? ` => ${tags.join(' ')}` : '';
      txt += `${d.tanggalMasehi.toString().padStart(2, ' ')} ${BULAN_MASEHI[currentMonth - 1].padEnd(10, ' ')} | ${d.hariMasehi.padEnd(7, ' ')} ${d.pasaran.padEnd(8, ' ')} | Neptu ${d.neptuTotal.toString().padEnd(2, ' ')} | Wuku ${d.wuku.padEnd(12, ' ')} | ${d.tanggalJawa} ${d.bulanJawa}${note}\n`;
    });

    txt += `\n===============================================================
AGENDA PENTING BULAN INI:
${monthlyAgenda.map((ev) => `• ${ev.day.hariMasehi}, ${ev.day.tanggalMasehi} ${BULAN_MASEHI[currentMonth - 1]}: ${ev.title}`).join('\n')}
===============================================================
Sistem WETON JOWO - https://wetonjowo.web.app\n`;

    downloadTextFile(txt, `Jadwal_Kalender_${BULAN_MASEHI[currentMonth - 1]}_${currentYear}.txt`);
  };

  const handlePrint = async () => {
    if (calendarPrintRef.current) {
      await printElement(calendarPrintRef.current, `Kalender Jawa ${BULAN_MASEHI[currentMonth - 1]} ${currentYear}`);
    } else {
      window.print();
    }
  };

  return (
    <div ref={calendarPrintRef} className="space-y-6 pb-12 animate-fadeIn max-w-5xl mx-auto printable-area">
      {/* Header Banner Tri-Kalender Sultan Agungan */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-blue-500/30">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-bold uppercase tracking-wider">
              <CalendarIcon className="w-3.5 h-3.5 text-blue-300" />
              Kalender Abadi Tri-Sistem (Masehi • Hijriah • Jawa Sultan Agung)
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Kalender Abadi Jawa
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Penanggalan terpadu satu bulan penuh yang mengintegrasikan kalender <strong>Masehi</strong> (Gregorian), <strong>Hijriah</strong> (Kamariah), dan <strong>Kalender Jawa</strong> (Sultan Agungan) lengkap dengan hari pasaran, wuku, pranata mangsa, fase bulan purnama, serta peringatan hari besar keagamaan dan adat.
            </p>
          </div>

          {/* Quick Date Control & Jump */}
          <div className="w-full md:w-auto flex flex-col gap-2.5 bg-slate-900/80 p-4 rounded-2xl border border-blue-500/30 backdrop-blur-xs">
            <div className="flex items-center justify-between gap-2 text-xs text-blue-200 font-bold">
              <span>Pilih Bulan & Tahun:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(Number(e.target.value))}
                className="bg-slate-950 text-white border border-blue-500/40 text-xs font-bold rounded-xl px-2.5 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-400"
              >
                {BULAN_MASEHI.map((nama, idx) => (
                  <option key={nama} value={idx + 1}>
                    {idx + 1} - {nama}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1900"
                max="2100"
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="bg-slate-950 text-white border border-blue-500/40 text-xs font-bold rounded-xl px-2.5 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-800 text-blue-200 hover:bg-slate-700 transition flex items-center justify-center gap-1"
                title="Bulan Sebelumnya"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Lalu</span>
              </button>
              <button
                type="button"
                onClick={handleSetTodayMonth}
                className="flex-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition text-center"
              >
                Bulan Ini
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-800 text-blue-200 hover:bg-slate-700 transition flex items-center justify-center gap-1"
                title="Bulan Berikutnya"
              >
                <span>Depan</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header Info Tri-Kalender Bulan Berjalan */}
      {headerInfo && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="bg-white p-4.5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl shrink-0">
              📅
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Penanggalan Masehi
              </span>
              <div className="text-base font-black text-slate-900">{headerInfo.masehi}</div>
              <div className="text-[11px] text-slate-500">Siklus Gregorian Matahari</div>
            </div>
          </div>

          <div className="bg-emerald-50/80 p-4.5 rounded-3xl border border-emerald-200 shadow-xs flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xl shrink-0">
              🌙
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                Penanggalan Hijriah
              </span>
              <div className="text-base font-black text-emerald-950">{headerInfo.hijriah}</div>
              <div className="text-[11px] text-emerald-700">Siklus Kamariah Bulan</div>
            </div>
          </div>

          <div className="bg-amber-50/80 p-4.5 rounded-3xl border border-amber-200 shadow-xs flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xl shrink-0">
              ☸
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-amber-900 tracking-wider">
                Kalender Jawa Sultan Agung
              </span>
              <div className="text-sm sm:text-base font-black text-amber-950 leading-tight">
                {headerInfo.jawa}
              </div>
              <div className="text-[11px] text-amber-800">Kurup Asapon & Siklus 8 Windu</div>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Penanda Pasaran Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Sorot Hari Pasaran & Kategori:</span>
          </div>

          {/* Quick Filter Kategori */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'semua', label: 'Semua Hari' },
              { id: 'libur', label: '🔴 Hari Libur / Besar' },
              { id: 'sakral', label: '🟣 Jumat/Selasa Kliwon' },
              { id: 'purnama', label: '🌕 Purnama & Tilem' },
              { id: 'pantangan', label: '⚠️ Pantangan Adat' }
            ].map((kat) => (
              <button
                key={kat.id}
                type="button"
                onClick={() => setFilterKategori(kat.id as any)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                  filterKategori === kat.id
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {kat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Pasaran 5 Hari */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500">Filter Pasaran:</span>
          {(['semua', 'Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'] as const).map((pasaran) => {
            const isSelected = filterPasaran === pasaran;
            return (
              <button
                key={pasaran}
                type="button"
                onClick={() => setFilterPasaran(pasaran)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-black shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {pasaran === 'semua' ? 'Semua Pasaran' : `Pasaran ${pasaran}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Kalender Bulanan 7 Kolom (Saptawara) */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        {/* Navigasi Header Bulan */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center gap-1 text-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Bulan Lalu</span>
          </button>

          <div className="text-center">
            <h2 className="text-lg sm:text-2xl font-black text-slate-900">
              {BULAN_MASEHI[currentMonth - 1]} {currentYear}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {headerInfo?.jawa}
            </p>
          </div>

          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center gap-1 text-xs"
          >
            <span className="hidden sm:inline">Bulan Depan</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 7 Kolom Header Hari Saptawara */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-extrabold pb-1">
          {[
            { nama: 'Ahad', alias: 'Minggu', neptu: 5, color: 'text-rose-700 bg-rose-50 border-rose-200' },
            { nama: 'Senen', alias: 'Senin', neptu: 4, color: 'text-slate-800 bg-slate-50 border-slate-200' },
            { nama: 'Selasa', alias: 'Selasa', neptu: 3, color: 'text-slate-800 bg-slate-50 border-slate-200' },
            { nama: 'Rebo', alias: 'Rabu', neptu: 7, color: 'text-slate-800 bg-slate-50 border-slate-200' },
            { nama: 'Kemis', alias: 'Kamis', neptu: 8, color: 'text-slate-800 bg-slate-50 border-slate-200' },
            { nama: 'Jemuwah', alias: 'Jumat', neptu: 6, color: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
            { nama: 'Setu', alias: 'Sabtu', neptu: 9, color: 'text-slate-800 bg-slate-50 border-slate-200' }
          ].map((h) => (
            <div
              key={h.nama}
              className={`p-2 rounded-2xl border ${h.color} flex flex-col items-center justify-center`}
            >
              <span className="text-[11px] sm:text-xs font-black">{h.nama}</span>
              <span className="text-[9px] opacity-75 hidden sm:inline">{h.alias} (N{h.neptu})</span>
            </div>
          ))}
        </div>

        {/* Matrix Grid Sel Tanggal */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {daysInMonth.map((dayItem) => {
            const isSelected = selectedDay?.isoString === dayItem.isoString;
            const hasHoliday = dayItem.hariBesar.some((h) => h.isLiburNasional);
            const isSunday = dayItem.hariJawa === 'Ahad';

            // Filter Matching
            const matchPasaran = filterPasaran === 'semua' || dayItem.pasaran === filterPasaran;
            let matchKategori = true;
            if (filterKategori === 'libur') matchKategori = dayItem.hariBesar.length > 0 || isSunday;
            if (filterKategori === 'sakral') matchKategori = dayItem.isJumatKliwon || dayItem.isSelasaKliwon;
            if (filterKategori === 'purnama') matchKategori = dayItem.isPurnama || dayItem.isTilem;
            if (filterKategori === 'pantangan') matchKategori = dayItem.isTaliwangke || dayItem.isSamparwangke || dayItem.isDinaSangar;

            const isDimmed = !matchPasaran || !matchKategori;

            // Background & Border styling
            let cellBg = dayItem.isCurrentMonth ? 'bg-white' : 'bg-slate-50/50 opacity-40';
            let borderClass = 'border-slate-200';

            if (dayItem.isToday) {
              borderClass = 'border-blue-600 ring-2 ring-blue-400/50';
            }

            if (isSelected) {
              cellBg = 'bg-blue-50/90';
              borderClass = 'border-blue-600 ring-3 ring-blue-500/80 shadow-md';
            }

            return (
              <div
                key={dayItem.isoString}
                onClick={() => setSelectedDay(dayItem)}
                className={`min-h-[76px] sm:min-h-[96px] p-1.5 sm:p-2.5 rounded-2xl border ${borderClass} ${cellBg} ${
                  isDimmed ? 'opacity-25' : 'hover:border-blue-400 hover:shadow-xs'
                } cursor-pointer transition-all duration-150 flex flex-col justify-between relative group overflow-hidden`}
              >
                {/* Top Row: Tanggal Masehi & Badge Hari Ini / Event */}
                <div className="flex items-start justify-between">
                  <span
                    className={`text-sm sm:text-base font-black leading-none ${
                      hasHoliday || isSunday ? 'text-rose-600' : 'text-slate-900'
                    }`}
                  >
                    {dayItem.tanggalMasehi}
                  </span>

                  {dayItem.isToday && (
                    <span className="text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full bg-blue-600 text-white">
                      Hari Ini
                    </span>
                  )}
                </div>

                {/* Middle Row: Pasaran Jawa & Tanggal Jawa */}
                <div className="space-y-0.5 my-0.5">
                  <div
                    className={`text-[10px] sm:text-[11px] font-bold leading-tight ${
                      dayItem.pasaran === 'Kliwon'
                        ? 'text-purple-900 font-black'
                        : dayItem.pasaran === 'Legi'
                        ? 'text-amber-900'
                        : dayItem.pasaran === 'Pahing'
                        ? 'text-rose-900'
                        : dayItem.pasaran === 'Pon'
                        ? 'text-blue-900'
                        : 'text-emerald-900'
                    }`}
                  >
                    {dayItem.pasaran}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                    <span>{dayItem.tanggalJawa} {dayItem.namaBulanJawa.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Bottom Row: Tanggal Hijriah & Indikator Ikon */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[8px] sm:text-[9px] text-slate-400">
                  <span className="truncate">{dayItem.tanggalHijriah}H</span>

                  <div className="flex items-center gap-0.5">
                    {dayItem.isJumatKliwon && <span title="Jumat Kliwon">🟣</span>}
                    {dayItem.isSelasaKliwon && <span title="Selasa Kliwon">🟠</span>}
                    {dayItem.isPurnama && <span title="Purnama">🌕</span>}
                    {dayItem.isTilem && <span title="Tilem / Bulan Mati">🌑</span>}
                    {dayItem.hariBesar.length > 0 && <span title="Hari Besar">⭐</span>}
                    {(dayItem.isTaliwangke || dayItem.isSamparwangke || dayItem.isDinaSangar) && (
                      <span title="Pantangan Adat">⚠️</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legenda Indikator Warna */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
          <span className="font-bold text-slate-800">Petunjuk Simbol:</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
            <span>Hari Libur / Minggu</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🟣</span>
            <span>Jumat Kliwon</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🟠</span>
            <span>Selasa Kliwon (Anggara Kasih)</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🌕</span>
            <span>Purnama (Bulan Sidi 14-15)</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🌑</span>
            <span>Tilem (Bulan Mati 1/29/30)</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⚠️</span>
            <span>Pantangan Adat</span>
          </div>
        </div>
      </div>

      {/* Inspector Rincian Hari Terpilih */}
      {selectedDay && selectedWeton && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                Rincian Tanggal & Weton Terpilih
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {selectedDay.hariMasehi}, {selectedDay.tanggalMasehi} {BULAN_MASEHI[selectedDay.bulanMasehi - 1]} {selectedDay.tahunMasehi}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-black text-xs border border-amber-300">
                {selectedDay.hariJawa} {selectedDay.pasaran} (Neptu {selectedDay.neptuTotal})
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-xs border border-emerald-300">
                {selectedDay.tanggalHijriah} {selectedDay.namaBulanHijriah} {selectedDay.tahunHijriah} H
              </span>
            </div>
          </div>

          {/* Grid 4 Kartu Tri-Penanggalan & Wuku */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
            {/* Kartu 1: Jawa Sultan Agungan */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-1.5">
              <span className="font-bold text-amber-900 block flex items-center gap-1">
                <span>☸</span> Penanggalan Jawa:
              </span>
              <div className="text-sm font-black text-amber-950">
                {selectedDay.tanggalJawa} {selectedDay.namaBulanJawa} {selectedDay.tahunJawa}
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Tahun <strong>{selectedDay.namaTahunJawa}</strong>, Windu <strong>{selectedDay.namaWindu}</strong> ({selectedDay.lambangWindu}).
              </p>
            </div>

            {/* Kartu 2: Hijriah Kamariah */}
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-1.5">
              <span className="font-bold text-emerald-900 block flex items-center gap-1">
                <span>🌙</span> Penanggalan Hijriah:
              </span>
              <div className="text-sm font-black text-emerald-950">
                {selectedDay.tanggalHijriah} {selectedDay.namaBulanHijriah} {selectedDay.tahunHijriah} H
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Fase Bulan: {selectedDay.isPurnama ? '🌕 Purnama Penuh (Sidi)' : selectedDay.isTilem ? '🌑 Tilem (Bulan Mati)' : '🌓 Bulan Sabit / Cembung'}
              </p>
            </div>

            {/* Kartu 3: Wuku Pawukon */}
            <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 space-y-1.5">
              <span className="font-bold text-blue-900 block flex items-center gap-1">
                <span>📜</span> Wuku Pawukon:
              </span>
              <div className="text-sm font-black text-blue-950">
                Wuku {selectedDay.wuku} (Ke-{selectedDay.wukuIndex})
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Siklus 210 hari Pawukon Primbon Betaljemur Adammakna.
              </p>
            </div>

            {/* Kartu 4: Pranata Mangsa */}
            <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 space-y-1.5">
              <span className="font-bold text-purple-900 block flex items-center gap-1">
                <span>🌾</span> Pranata Mangsa:
              </span>
              <div className="text-sm font-black text-purple-950">
                Mangsa {selectedPranata?.nama}
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed italic">
                "{selectedPranata?.candra}"
              </p>
            </div>
          </div>

          {/* Hari Besar / Peristiwa Hari Terpilih */}
          {selectedDay.hariBesar.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-800 block flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500" />
                Hari Besar & Peringatan Hari Ini:
              </span>
              <div className="space-y-1.5">
                {selectedDay.hariBesar.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                  >
                    <div>
                      <strong className="text-slate-900 font-black">{ev.nama}</strong>
                      <p className="text-[11px] text-slate-600">{ev.keterangan}</p>
                    </div>
                    {ev.isLiburNasional && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-extrabold text-[10px] w-fit">
                        Libur Nasional
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analisis Adat & Arah Naga Dina Ringkas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            {/* Status Keselamatan Adat */}
            <div
              className={`p-4 rounded-2xl border space-y-1.5 ${
                selectedDay.keteranganAdat.length > 0
                  ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                  : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5">
                {selectedDay.keteranganAdat.length > 0 ? (
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
                <span>Status Keselamatan Adat (Primbon):</span>
              </div>
              {selectedDay.keteranganAdat.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-rose-900 text-[11px]">
                  {selectedDay.keteranganAdat.map((ket, idx) => (
                    <li key={idx}>{ket}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-[11px] text-emerald-800">
                  <strong>Dina Rahayu</strong>: Tidak ada pantangan Taliwangke, Samparwangke, maupun Dina Sangar pada tanggal ini.
                </p>
              )}
            </div>

            {/* Arah Rezeki & Naga Dina */}
            {selectedPetungArah && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>Petung Arah Naga Dina:</span>
                </div>
                <div className="text-[11px] space-y-1">
                  <div>
                    <span className="text-slate-600">Arah Rezeki & Sandang:</span>{' '}
                    <strong className="text-emerald-800">{selectedPetungArah.nagaDina.arahSandang}</strong>
                  </div>
                  <div>
                    <span className="text-slate-600">Cangkem Naga (Pantangan):</span>{' '}
                    <strong className="text-rose-800">{selectedPetungArah.nagaDina.pantanganUtama}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              {onOpenWetonDetail && (
                <button
                  type="button"
                  onClick={() => onOpenWetonDetail(selectedDay.isoString)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs"
                >
                  <span>Analisis Karakter Weton</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {onNavigateToModule && (
                <button
                  type="button"
                  onClick={() => onNavigateToModule('nagadina')}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Kompas Arah Naga Dina</span>
                </button>
              )}
            </div>

            <span className="text-[11px] text-slate-400">
              ISO: {selectedDay.isoString}
            </span>
          </div>
        </div>
      )}

      {/* Agenda Hari Besar & Pasaran Bulan Berjalan */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Agenda Hari Besar & Hari Pasaran ({BULAN_MASEHI[currentMonth - 1]} {currentYear})
            </h3>
            <p className="text-xs text-slate-500">
              Rangkuman momentum penting nasional, keagamaan, dan tradisi sakral Jawa sepanjang bulan:
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {monthlyAgenda.length} Peristiwa
          </span>
        </div>

        {monthlyAgenda.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {monthlyAgenda.map((ag, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedDay(ag.day)}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 cursor-pointer transition flex items-start gap-3 bg-slate-50/50"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                  <span className="text-sm font-black text-slate-900 leading-none">
                    {ag.day.tanggalMasehi}
                  </span>
                  <span className="text-[9px] text-slate-500 uppercase font-bold">
                    {ag.day.hariJawa.slice(0, 3)}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <strong className="text-slate-900 font-black">{ag.title}</strong>
                  </div>
                  <div className="text-[11px] text-amber-800 font-bold">
                    {ag.day.hariJawa} {ag.day.pasaran} ({ag.day.tanggalJawa} {ag.day.namaBulanJawa})
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{ag.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic p-4 text-center">
            Tidak ada hari libur nasional atau peringatan khusus pada bulan ini.
          </p>
        )}
      </div>

      {/* Ensiklopedia & Pedoman Kalender Sultan Agungan (Accordion) */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setShowEncyclopedia(!showEncyclopedia)}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-50 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-lg">
              <BookOpen className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Falsafah & Siklus Abadi Kalender Jawa Sultan Agung
              </h3>
              <p className="text-xs text-slate-500">
                Sejarah penyatuan sistem Saka (Matahari) dan Hijriah (Bulan) oleh Sultan Agung Hanyokrokusumo (1633 M)
              </p>
            </div>
          </div>
          <ChevronRight
            className={`w-5 h-5 text-slate-400 transition-transform ${
              showEncyclopedia ? 'rotate-90' : ''
            }`}
          />
        </button>

        {showEncyclopedia && (
          <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50 space-y-6 animate-fadeIn text-xs">
            {/* Pengantar Historis */}
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200 space-y-2 leading-relaxed text-slate-700">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <span>📜</span> 1. Sejarah Penyatuan Penanggalan Sultan Agungan (1555 AJ / 1633 M)
              </h4>
              <p>
                Pada hari Jumat Legi, 1 Sura 1555 Jawa (bertepatan dengan 1 Muharram 1043 H / 8 Juli 1633 M), <strong>Sultan Agung Hanyokrokusumo</strong> dari Kerajaan Mataram Islam meresmikan kalender Jawa baru. Kalender ini menyelaraskan angka tahun <em>Saka</em> (Hindu-Jawa) dengan peredaran bulan <em>Kamariah</em> (Hijriah Islam), sehingga perayaan grebeg adat dan hari besar keagamaan berjalan serentak tanpa mengubah kesinambungan hitungan tahun yang telah berjalan sejak 78 Masehi.
              </p>
            </div>

            {/* Tabel 8 Tahun Windu */}
            <div className="space-y-2">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <span>🌀</span> 2. Siklus 8 Tahun Windu (Daur Windu)
              </h4>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-extrabold">
                    <tr>
                      <th className="p-3">Urutan</th>
                      <th className="p-3">Nama Tahun</th>
                      <th className="p-3">Neptu</th>
                      <th className="p-3">Hari Awal (Kurup Asapon)</th>
                      <th className="p-3">Umur Hari</th>
                      <th className="p-3">Makna & Perlambang</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {SIKLUS_TAHUN_JAWA.map((th, idx) => (
                      <tr key={th.nama} className={headerInfo?.jawa.includes(th.nama) ? 'bg-amber-50 font-bold' : ''}>
                        <td className="p-3 font-black text-slate-900">{idx + 1}</td>
                        <td className="p-3 font-bold text-blue-900">{th.nama} {th.isKabisat ? '(Kabisat)' : ''}</td>
                        <td className="p-3">{th.neptu}</td>
                        <td className="p-3">{th.hariAwal}</td>
                        <td className="p-3">{th.umurHari} hari</td>
                        <td className="p-3 text-slate-600 text-[11px]">{th.makna}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabel 4 Windu */}
            <div className="space-y-2">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <span>🛡️</span> 3. Karakteristik 4 Windu (Siklus 32 Tahun)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SIKLUS_WINDU.map((w) => (
                  <div key={w.nama} className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 text-[10px] font-bold uppercase">Windu:</span>
                    <div className="font-black text-sm text-slate-900">{w.nama}</div>
                    <div className="text-[11px] text-amber-800 font-semibold">Unsur: {w.perlambang}</div>
                    <p className="text-[11px] text-slate-600 pt-1 leading-snug">{w.makna}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer Buttons (Hidden on Print) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopyMonthSummary}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-200 text-slate-800 text-xs font-bold transition shadow-xs border border-slate-300"
            title="Salin ringkasan kalender bulan ini ke clipboard"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            <span>{isCopied ? 'Tersalin!' : 'Salin Kalender'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold transition shadow-xs"
            title="Unduh data kalender satu bulan penuh dalam format spreadsheet CSV (Excel)"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>Unduh CSV (Excel)</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition shadow-xs"
            title="Unduh kalender bulan ini sebagai dokumen teks .txt"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Unduh Dokumen TXT</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition shadow-xs"
            title="Cetak lembar kalender 1 bulan penuh atau simpan ke PDF"
          >
            <Printer className="w-4 h-4 text-slate-950" />
            <span>Cetak / PDF Kalender</span>
          </button>
        </div>

        {onNavigateToModule && (
          <button
            type="button"
            onClick={() => onNavigateToModule('wuku')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition shadow-sm"
          >
            <Layers className="w-4 h-4" />
            <span>Jelajahi 30 Wuku Pawukon</span>
          </button>
        )}
      </div>
    </div>
  );
};
