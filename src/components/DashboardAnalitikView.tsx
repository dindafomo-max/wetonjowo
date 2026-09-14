import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  Search,
  Users,
  ShieldCheck,
  Sparkles,
  Calendar,
  Lock,
  Download,
  Printer,
  RefreshCw,
  Eye,
  HeartHandshake,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Clock,
  Filter,
  CheckCircle,
  FileSpreadsheet,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  TOP_WETON_ANALYTICS,
  TOP_FIRASAT_ANALYTICS,
  MODULE_USAGE_ANALYTICS,
  NEPTU_DISTRIBUTION_ANALYTICS,
  HOURLY_HEATMAP_ANALYTICS,
  generateTimeSeriesData,
  WetonStatItem,
  FirasatStatItem,
} from '../data/analyticsData';

interface DashboardAnalitikViewProps {
  onNavigateToModule?: (tab: string) => void;
}

const PIE_COLORS = ['#be123c', '#e11d48', '#4338ca', '#2563eb', '#d97706', '#b45309', '#059669'];

export const DashboardAnalitikView: React.FC<DashboardAnalitikViewProps> = ({
  onNavigateToModule,
}) => {
  const { user, isAdmin, setIsLoginModalOpen } = useAuth();
  const [timeRange, setTimeRange] = useState<7 | 30 | 90 | 365>(30);
  const [activeChartTab, setActiveChartTab] = useState<'tren' | 'weton' | 'firasat' | 'modul' | 'waktu'>('tren');
  const [wetonSearchQuery, setWetonSearchQuery] = useState('');
  const [firasatSearchQuery, setFirasatSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isLiveSync, setIsLiveSync] = useState(true);

  // Time series dynamic dataset based on selected period
  const timeSeriesData = useMemo(() => {
    return generateTimeSeriesData(timeRange);
  }, [timeRange]);

  // Aggregate Metrics
  const totalQueries = useMemo(() => {
    return timeSeriesData.reduce((acc, curr) => acc + curr.totalAkses, 0);
  }, [timeSeriesData]);

  const totalFirasatQueries = useMemo(() => {
    return timeSeriesData.reduce((acc, curr) => acc + curr.pencarianFirasat, 0);
  }, [timeSeriesData]);

  const totalWetonCalculations = useMemo(() => {
    return timeSeriesData.reduce((acc, curr) => acc + curr.hitungWeton, 0);
  }, [timeSeriesData]);

  const totalNikahJodoh = useMemo(() => {
    return timeSeriesData.reduce((acc, curr) => acc + curr.hitungNikahJodoh, 0);
  }, [timeSeriesData]);

  // Filtered Weton Table
  const filteredWetonList = useMemo(() => {
    if (!wetonSearchQuery) return TOP_WETON_ANALYTICS;
    return TOP_WETON_ANALYTICS.filter(
      (item) =>
        item.wetonName.toLowerCase().includes(wetonSearchQuery.toLowerCase()) ||
        item.tujuanTerbanyak.toLowerCase().includes(wetonSearchQuery.toLowerCase()) ||
        item.neptu.toString().includes(wetonSearchQuery)
    );
  }, [wetonSearchQuery]);

  // Filtered Firasat Table
  const filteredFirasatList = useMemo(() => {
    if (!firasatSearchQuery) return TOP_FIRASAT_ANALYTICS;
    return TOP_FIRASAT_ANALYTICS.filter(
      (item) =>
        item.kataKunci.toLowerCase().includes(firasatSearchQuery.toLowerCase()) ||
        item.kategori.toLowerCase().includes(firasatSearchQuery.toLowerCase()) ||
        item.ringkasanMakna.toLowerCase().includes(firasatSearchQuery.toLowerCase())
    );
  }, [firasatSearchQuery]);

  // Handle Export CSV
  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = ['Peringkat', 'Tipe', 'Nama / Kata Kunci', 'Total Akses', 'Persentase'];
      const rows = [
        ...TOP_WETON_ANALYTICS.map((w) => [w.rank, 'Weton Populer', `"${w.wetonName}"`, w.totalHits, `${w.persentase}%`]),
        ...TOP_FIRASAT_ANALYTICS.map((f) => [f.rank, 'Pencarian Firasat', `"${f.kataKunci}"`, f.totalPencarian, `${f.persentase}%`]),
      ];
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `laporan_analitik_weton_jowo_${timeRange}hari.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 400);
  };

  // Handle Print Report
  const handlePrint = () => {
    window.print();
  };

  // --------------------------------------------------------------------------
  // PAYWALL / ACCESS GUARD JIKA BUKAN ADMIN
  // --------------------------------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-rose-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl relative overflow-hidden text-center space-y-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-16 h-16 bg-amber-500/20 border-2 border-amber-400 rounded-3xl flex items-center justify-center mx-auto text-amber-300 text-2xl shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Fitur Premium Khusus Administrator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Dashboard Analitik & Intelijen Tren Budaya
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Modul ini menyajikan agregasi statistik pencarian firasat terbanyak, distribusi weton paling sering dihitung, serta pola hajat pernikahan masyarakat secara 100% anonim.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left pt-2">
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/80">
              <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                <Search className="w-4 h-4" />
                <span>Tren Firasat</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Pantau kedutan mata, telinga berdenging, dan gejala alam yang paling dicari secara real-time.
              </p>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/80">
              <div className="text-rose-400 font-bold text-xs flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4" />
                <span>Top Weton & Neptu</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Ketahui weton dan neptu yang paling sering dihitung untuk perjodohan Salaki-Rabi & Ijab Kabul.
              </p>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/80">
              <div className="text-blue-400 font-bold text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Zero-PII</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Privasi mutlak. Data telemetri dikumpulkan murni secara agregat tanpa menyimpan identitas pengguna.
              </p>
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl text-xs sm:text-sm shadow-xl transition active:scale-95 flex items-center gap-2 mx-auto"
            >
              <Lock className="w-4 h-4" />
              <span>Masuk Sebagai Administrator</span>
            </button>
            <p className="text-[11px] text-slate-400 mt-2">
              Gunakan akun Gmail admin yang telah didaftarkan untuk membuka akses penuh.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // DASHBOARD ANALITIK UTAMA UNTUK ADMIN
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* 1. Header Banner & Kontrol Periode */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-blue-800/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Admin Premium Panel</span>
              </span>
              <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Anonimitas 100% Zero-PII</span>
              </span>
              {isLiveSync && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Live Telemetry Active</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span>📊 Dashboard Analitik & Tren Pencarian</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Eksplorasi wawasan agregat mengenai minat masyarakat terhadap firasat kedutan, perhitungan weton kelahiran terpopuler, serta dinamika penentuan hari baik pernikahan secara objektif.
            </p>
          </div>

          {/* Action Toolbar: Periode & Ekspor */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Range Selector */}
            <div className="bg-slate-900/90 border border-blue-700/60 rounded-2xl p-1 flex items-center text-xs">
              <button
                onClick={() => setTimeRange(7)}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  timeRange === 7 ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                7 Hari
              </button>
              <button
                onClick={() => setTimeRange(30)}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  timeRange === 30 ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                30 Hari
              </button>
              <button
                onClick={() => setTimeRange(90)}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  timeRange === 90 ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                90 Hari
              </button>
              <button
                onClick={() => setTimeRange(365)}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  timeRange === 365 ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                1 Tahun
              </button>
            </div>

            {/* Tombol Ekspor CSV */}
            <button
              onClick={handleExportCSV}
              disabled={isExporting}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 shadow-sm"
              title="Unduh data dalam format CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>{isExporting ? 'Mengekspor...' : 'Ekspor CSV'}</span>
            </button>

            {/* Tombol Cetak / PDF */}
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 shadow-sm"
              title="Cetak Laporan Analisis"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Cetak</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Empat Kartu Metrik Kunci (KPI Summary Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Total Komputasi */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Sesi Akses</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {totalQueries.toLocaleString('id-ID')}
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+14.8%</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Total komputasi & penelusuran anonim selama {timeRange} hari terakhir.
          </p>
        </div>

        {/* Card 2: Weton Paling Banyak Dihitung */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Weton Terpopuler (#1)</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-black text-rose-950 tracking-tight truncate">
              Jumat Kliwon
            </div>
            <div className="text-xs font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full shrink-0">
              Neptu 14
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            <strong>48.920 kali</strong> dihitung (16.8% dari seluruh kalkulasi weton).
          </p>
        </div>

        {/* Card 3: Top Firasat Dicari */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Firasat Paling Dicari (#1)</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-sm sm:text-base font-black text-indigo-950 tracking-tight truncate" title="Kedutan Kelopak Mata Kanan Atas">
              Kedutan Mata Kanan
            </div>
            <div className="text-xs font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-full shrink-0">
              64.2k hits
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Puncak pencarian pukul <strong>07:00 - 09:00 WIB</strong> (Pagi).
          </p>
        </div>

        {/* Card 4: Dominasi Modul */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Kategori Hajat Utama</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight">
              Pernikahan
            </div>
            <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full shrink-0">
              52.3% Porsi
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Kombinasi modul <em>Ijab Kabul</em> & <em>Salaki-Rabi 8 Petung</em>.
          </p>
        </div>
      </div>

      {/* 3. Panel Grafik Visual Interaktif (Recharts) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-5">
        {/* Navigation Tabs untuk Charts */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-5 bg-gradient-to-b from-blue-900 to-rose-800 rounded-full" />
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Visualisasi Pola Komputasi & Penelusuran
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs">
            <button
              onClick={() => setActiveChartTab('tren')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                activeChartTab === 'tren' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📈 Tren Harian
            </button>
            <button
              onClick={() => setActiveChartTab('weton')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                activeChartTab === 'weton' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              👑 Top 10 Weton
            </button>
            <button
              onClick={() => setActiveChartTab('firasat')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                activeChartTab === 'firasat' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              👁️ Top Firasat
            </button>
            <button
              onClick={() => setActiveChartTab('modul')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                activeChartTab === 'modul' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🧭 Porsi Modul
            </button>
            <button
              onClick={() => setActiveChartTab('waktu')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                activeChartTab === 'waktu' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🕒 Jam Akses
            </button>
          </div>
        </div>

        {/* Tab 1: Tren Akses Harian (AreaChart) */}
        {activeChartTab === 'tren' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Menampilkan volume harian: <strong>Perhitungan Weton</strong>, <strong>Pencarian Firasat</strong>, dan <strong>Perjodohan Nikah</strong>.</span>
              <span className="font-semibold text-slate-700">Satuan: Sesi / Hari</span>
            </div>
            <div className="w-full h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorNikah" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#be123c" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#be123c" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorWeton" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorFirasat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4338ca" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4338ca" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="labelHari" tick={{ fontSize: 11 }} stroke="#64748b" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="hitungNikahJodoh" name="Hajat Nikah & Jodoh" stroke="#be123c" fillOpacity={1} fill="url(#colorNikah)" strokeWidth={2} />
                  <Area type="monotone" dataKey="hitungWeton" name="Hitung Weton Lahir" stroke="#2563eb" fillOpacity={1} fill="url(#colorWeton)" strokeWidth={2} />
                  <Area type="monotone" dataKey="pencarianFirasat" name="Pencarian Firasat & Kramadana" stroke="#4338ca" fillOpacity={1} fill="url(#colorFirasat)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 2: Top 10 Weton Terbanyak (BarChart) */}
        {activeChartTab === 'weton' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Perbandingan 10 Weton yang paling sering dikonsultasikan pengguna.</span>
              <span className="font-semibold text-slate-700">Satuan: Total Hits Kumulatif</span>
            </div>
            <div className="w-full h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TOP_WETON_ANALYTICS} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="wetonName" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 10 }} stroke="#64748b" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: any) => [`${Number(value).toLocaleString('id-ID')} Hits`, 'Total Akses']}
                  />
                  <Bar dataKey="totalHits" name="Total Hits Weton" fill="#be123c" radius={[8, 8, 0, 0]}>
                    {TOP_WETON_ANALYTICS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#991b1b' : index < 3 ? '#be123c' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 3: Top Firasat Dicari (BarChart Horizontal / Vertical) */}
        {activeChartTab === 'firasat' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Peringkat kata kunci firasat tubuh & pertanda alam paling sering dicari di modul Kramadana.</span>
              <span className="font-semibold text-slate-700">Satuan: Query Count</span>
            </div>
            <div className="w-full h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TOP_FIRASAT_ANALYTICS} layout="vertical" margin={{ top: 10, right: 20, left: 60, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b" />
                  <YAxis dataKey="kataKunci" type="category" tick={{ fontSize: 10 }} stroke="#64748b" width={140} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: any) => [`${Number(value).toLocaleString('id-ID')} Pencarian`, 'Total Query']}
                  />
                  <Bar dataKey="totalPencarian" name="Total Pencarian" fill="#4338ca" radius={[0, 8, 8, 0]}>
                    {TOP_FIRASAT_ANALYTICS.map((entry, index) => (
                      <Cell key={`cell-firasat-${index}`} fill={index < 2 ? '#4338ca' : index < 5 ? '#6366f1' : '#0284c7'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 4: Proporsi Penggunaan Modul Adat (PieChart & Breakdown) */}
        {activeChartTab === 'modul' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 w-full h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MODULE_USAGE_ANALYTICS}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="totalPenggunaan"
                    nameKey="namaModul"
                  >
                    {MODULE_USAGE_ANALYTICS.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: any) => [`${Number(value).toLocaleString('id-ID')} Penggunaan`, 'Volume']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="md:col-span-6 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 mb-2">Peringkat Popularitas Modul SaaS:</h4>
              {MODULE_USAGE_ANALYTICS.map((item, idx) => (
                <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                    <span className="font-semibold text-slate-800">{item.namaModul}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-black text-slate-900">{item.persentase}%</span>
                    <span className="text-[10px] text-slate-500 block">({(item.totalPenggunaan / 1000).toFixed(1)}k)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Pola Jam Sibuk Akses (BarChart) */}
        {activeChartTab === 'waktu' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Distribusi volume akses pengguna berdasarkan waktu (WIB) dalam siklus 24 jam.</span>
              <span className="font-semibold text-slate-700">Waktu Puncak: 19:00 - 21:00 WIB</span>
            </div>
            <div className="w-full h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={HOURLY_HEATMAP_ANALYTICS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="jam" tick={{ fontSize: 11 }} stroke="#64748b" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: any) => [`${Number(value).toLocaleString('id-ID')} Pengguna`, 'Aktivitas']}
                  />
                  <Bar dataKey="akses" name="Aktivitas Pengguna" fill="#0d9488" radius={[8, 8, 0, 0]}>
                    {HOURLY_HEATMAP_ANALYTICS.map((entry, index) => (
                      <Cell key={`hour-cell-${index}`} fill={entry.jam === '20:00' ? '#be123c' : '#0d9488'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* 4. Tabel Rinci: Top 10 Weton Terpopuler & Top Firasat Dicari */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom Kiri: Tabel Weton Populer */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                <span>👑 Weton Paling Banyak Dihitung</span>
              </h3>
              <p className="text-xs text-slate-500">Peringkat 10 weton kelahiran dengan interaksi tertinggi.</p>
            </div>

            {/* Search Input Weton */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={wetonSearchQuery}
                onChange={(e) => setWetonSearchQuery(e.target.value)}
                placeholder="Cari weton/neptu..."
                className="pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-800"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2 px-2">#</th>
                  <th className="py-2 px-2">Weton</th>
                  <th className="py-2 px-2">Neptu</th>
                  <th className="py-2 px-2">Total Hits</th>
                  <th className="py-2 px-2">Tren</th>
                  <th className="py-2 px-2">Hajat Dominan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredWetonList.map((item) => (
                  <tr key={item.wetonName} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-2 font-black text-slate-400">{item.rank}</td>
                    <td className="py-2.5 px-2">
                      <strong className="text-slate-900 block font-bold">{item.wetonName}</strong>
                      <span className="text-[10px] text-slate-500">{item.lambangUnsur}</span>
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-bold border border-blue-200">
                        {item.neptu}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 font-bold text-slate-900">
                      {item.totalHits.toLocaleString('id-ID')}
                      <span className="text-[10px] text-slate-400 font-normal block">({item.persentase}%)</span>
                    </td>
                    <td className="py-2.5 px-2">
                      <span className={`text-[11px] font-bold flex items-center gap-0.5 ${
                        item.trenMingguan >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {item.trenMingguan >= 0 ? '+' : ''}{item.trenMingguan}%
                      </span>
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[10px]">
                        {item.tujuanTerbanyak}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kolom Kanan: Tabel Firasat Dicari */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                <span>👁️ Tren Pencarian Firasat & Kedutan</span>
              </h3>
              <p className="text-xs text-slate-500">Kueri ensiklopedia Kramadana yang paling diminati.</p>
            </div>

            {/* Search Input Firasat */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={firasatSearchQuery}
                onChange={(e) => setFirasatSearchQuery(e.target.value)}
                placeholder="Cari firasat/gejala..."
                className="pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-800"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2 px-2">#</th>
                  <th className="py-2 px-2">Kata Kunci Firasat</th>
                  <th className="py-2 px-2">Kategori</th>
                  <th className="py-2 px-2">Pencarian</th>
                  <th className="py-2 px-2">Karakter Pertanda</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredFirasatList.map((item) => (
                  <tr key={item.kataKunci} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-2 font-black text-slate-400">{item.rank}</td>
                    <td className="py-2.5 px-2 max-w-[200px]">
                      <strong className="text-slate-900 block font-bold truncate" title={item.kataKunci}>
                        {item.kataKunci}
                      </strong>
                      <span className="text-[10px] text-slate-500 line-clamp-1 italic">{item.ringkasanMakna}</span>
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 font-medium text-[10px] border border-indigo-200/60">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 font-bold text-slate-900">
                      {item.totalPencarian.toLocaleString('id-ID')}
                      <span className="text-[10px] text-slate-400 font-normal block">{item.waktuPuncak}</span>
                    </td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.kategoriPertanda.includes('Rezeki')
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : item.kategoriPertanda.includes('Peringatan')
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {item.kategoriPertanda}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Distribusi Neptu Kelahiran & Falsafah Agregat */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white rounded-3xl p-5 sm:p-6 border border-blue-800/80 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-800/60 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Distribusi Statistik Neptu Jawa (Skala 7 s.d. 18)</span>
            </h3>
            <p className="text-xs text-blue-200">
              Analisis sebaran neptu yang dihitung oleh pengguna, merefleksikan frekuensi kombinasi dina & pasaran di Nusantara.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
            Puncak: Neptu 14 (16.8%) & Neptu 13 (13.5%)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-1">
          {NEPTU_DISTRIBUTION_ANALYTICS.map((item) => (
            <div key={item.neptu} className="bg-blue-900/40 border border-blue-700/50 p-3 rounded-2xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">Neptu {item.neptu}</span>
                <span className="text-[10px] font-black text-white bg-blue-800 px-1.5 py-0.2 rounded">
                  {item.persentase}%
                </span>
              </div>
              <div className="text-lg font-black text-white">{item.jumlah.toLocaleString('id-ID')}</div>
              <p className="text-[10px] text-blue-200/80 line-clamp-1 italic" title={item.wetonContoh}>
                {item.wetonContoh}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 text-xs text-blue-200/90 leading-relaxed border-t border-blue-800/60 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Jaminan Kedaulatan & Anonimitas Data:</strong> Seluruh angka di atas dikumpulkan menggunakan protokol <em>Differential Privacy</em> & <em>K-Anonymity</em>. Sistem WETON JOWO tidak pernah merekam alamat IP, nama lengkap individu, ataupun data geolokasi presisi.
          </span>
        </div>
      </div>
    </div>
  );
};
