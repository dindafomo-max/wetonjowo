import React, { useState } from 'react';
import { FileCode2, Copy, Check, Table2, Layers, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { GAS_CODE_GS, GAS_INDEX_HTML, SPREADSHEET_SCHEMA } from '../data/gasTemplates';

export const GasArchitectureView: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'sheets' | 'codegs' | 'indexhtml' | 'panduan'>('sheets');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-rose-950 text-white rounded-3xl p-5 shadow-sm border border-blue-800/80">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold mb-2">
          <span>⚙️</span> Arsitektur Google Apps Script & Spreadsheet
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
          Rancangan Database Google Drive & Source Code Web App
        </h2>
        <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
          Spesifikasi struktur database Google Spreadsheet (4 tabel inti) beserta kode lengkap <code>Code.gs</code> backend dan <code>Index.html</code> frontend untuk deployment mandiri di Google Apps Script (GAS).
        </p>
      </div>

      {/* Code / Architecture Subtabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          onClick={() => setActiveCodeTab('sheets')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 ${
            activeCodeTab === 'sheets'
              ? 'bg-blue-900 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Table2 className="w-3.5 h-3.5" />
          <span>1. Struktur Database Spreadsheet (4 Tabel)</span>
        </button>

        <button
          onClick={() => setActiveCodeTab('codegs')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 ${
            activeCodeTab === 'codegs'
              ? 'bg-rose-900 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>2. Kode Backend (Code.gs)</span>
        </button>

        <button
          onClick={() => setActiveCodeTab('indexhtml')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 ${
            activeCodeTab === 'indexhtml'
              ? 'bg-rose-900 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>3. Kode Frontend (Index.html)</span>
        </button>

        <button
          onClick={() => setActiveCodeTab('panduan')}
          className={`shrink-0 px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 ${
            activeCodeTab === 'panduan'
              ? 'bg-blue-900 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>4. Panduan Deploy di Google Drive</span>
        </button>
      </div>

      {/* 1. STRUKTUR DATABASE SPREADSHEET */}
      {activeCodeTab === 'sheets' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                  <span>📊</span> Skema Kolom Database Google Spreadsheet
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  File Spreadsheet di Google Drive diatur dengan 4 Sheet terpisah untuk sistem informasi yang rapi.
                </p>
              </div>

              <button
                onClick={() => handleCopy(JSON.stringify(SPREADSHEET_SCHEMA, null, 2), 'schema-json')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold hover:bg-blue-100 transition"
              >
                {copiedKey === 'schema-json' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'schema-json' ? 'Tersalin!' : 'Salin JSON Skema'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {SPREADSHEET_SCHEMA.tabel.map((tab) => (
                <div key={tab.namaSheet} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-blue-950 flex items-center gap-2">
                      <span className="w-2 h-3.5 bg-rose-800 rounded-full" />
                      Sheet: <code className="text-rose-900 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">{tab.namaSheet}</code>
                    </span>
                    <span className="text-[11px] text-slate-500">{tab.keterangan}</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs bg-white rounded-xl border border-slate-200 shadow-xs">
                      <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px] uppercase">
                        <tr>
                          <th className="px-3 py-2">Nama Kolom (Header)</th>
                          <th className="px-3 py-2">Tipe Data</th>
                          <th className="px-3 py-2">Contoh Isi Data</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {tab.kolom.map((col, idx) => (
                          <tr key={idx} className="hover:bg-blue-50/40">
                            <td className="px-3 py-2 font-mono font-semibold text-slate-900">{col.header}</td>
                            <td className="px-3 py-2 text-blue-900">{col.tipe}</td>
                            <td className="px-3 py-2 text-slate-600 font-sans italic">{col.contoh}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. KODE BACKEND (Code.gs) */}
      {activeCodeTab === 'codegs' && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <span className="w-2 h-4 bg-rose-900 rounded-full" />
                Backend Google Apps Script (Code.gs)
              </h3>
              <p className="text-xs text-slate-500">
                Menangani kalkulasi matematis Betaljemur, API endpoint, dan rekaman ke Google Spreadsheet.
              </p>
            </div>

            <button
              onClick={() => handleCopy(GAS_CODE_GS, 'code-gs')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-900 to-blue-900 text-white text-xs font-bold shadow hover:opacity-90 transition"
            >
              {copiedKey === 'code-gs' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'code-gs' ? 'Kode Disalin!' : 'Salin Code.gs'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 text-slate-100 p-4 rounded-2xl text-xs font-mono overflow-x-auto max-h-[500px] border border-slate-800 leading-relaxed">
            {GAS_CODE_GS}
          </pre>
        </div>
      )}

      {/* 3. KODE FRONTEND (Index.html) */}
      {activeCodeTab === 'indexhtml' && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <span className="w-2 h-4 bg-blue-900 rounded-full" />
                Frontend Web App (Index.html)
              </h3>
              <p className="text-xs text-slate-500">
                Antarmuka HTML5 + Tailwind CSS dengan skema warna Biru Navy & Maroon untuk GAS HtmlService.
              </p>
            </div>

            <button
              onClick={() => handleCopy(GAS_INDEX_HTML, 'index-html')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-900 to-rose-900 text-white text-xs font-bold shadow hover:opacity-90 transition"
            >
              {copiedKey === 'index-html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'index-html' ? 'HTML Disalin!' : 'Salin Index.html'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 text-slate-100 p-4 rounded-2xl text-xs font-mono overflow-x-auto max-h-[500px] border border-slate-800 leading-relaxed">
            {GAS_INDEX_HTML}
          </pre>
        </div>
      )}

      {/* 4. PANDUAN DEPLOYMENT */}
      {activeCodeTab === 'panduan' && (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4 text-xs">
          <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
            <span>🚀</span> Langkah Deploy Aplikasi di Google Drive & Spreadsheet
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
              <span className="text-xs font-bold bg-blue-900 text-white px-2 py-0.5 rounded-md">Langkah 1</span>
              <h4 className="font-bold text-slate-900 text-sm">Buat Google Spreadsheet di Drive</h4>
              <p className="text-slate-600 leading-relaxed">
                Buka <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-blue-700 underline font-semibold">sheets.new</a>. Beri nama file <code>DATABASE_WETON_JOWO</code>. Buat 4 sheet: <code>Tabel_Weton</code>, <code>Tabel_Wuku</code>, <code>Tabel_Hajat</code>, dan <code>Tabel_Firasat</code> sesuai struktur kolom di Tab 1.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <span className="text-xs font-bold bg-rose-900 text-white px-2 py-0.5 rounded-md">Langkah 2</span>
              <h4 className="font-bold text-slate-900 text-sm">Buka Apps Script Editor</h4>
              <p className="text-slate-600 leading-relaxed">
                Pada menu Google Spreadsheet Anda, klik <strong>Extensions (Ekstensi)</strong> &gt; <strong>Apps Script</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
              <span className="text-xs font-bold bg-blue-900 text-white px-2 py-0.5 rounded-md">Langkah 3</span>
              <h4 className="font-bold text-slate-900 text-sm">Salin Kode Code.gs & Index.html</h4>
              <p className="text-slate-600 leading-relaxed">
                Ganti isi file <code>Code.gs</code> dengan kode di Tab 2. Masukkan ID Spreadsheet Anda pada variabel <code>SPREADSHEET_ID</code>. Tambahkan file HTML baru bernama <code>Index.html</code> lalu tempelkan kode di Tab 3.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <span className="text-xs font-bold bg-rose-900 text-white px-2 py-0.5 rounded-md">Langkah 4</span>
              <h4 className="font-bold text-slate-900 text-sm">Deploy sebagai Web App</h4>
              <p className="text-slate-600 leading-relaxed">
                Klik tombol <strong>Deploy</strong> &gt; <strong>New Deployment</strong>. Pilih tipe <strong>Web App</strong>. Set "Execute as: Me" dan "Who has access: Anyone". Klik Deploy dan Anda mendapatkan URL publik aplikasi!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
