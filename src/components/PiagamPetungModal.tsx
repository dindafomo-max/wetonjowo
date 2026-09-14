import React, { useRef, useState } from 'react';
import {
  Printer,
  Download,
  Copy,
  Check,
  X,
  Share2,
  FileText,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import {
  printElement,
  downloadElementAsPng,
  downloadTextFile,
  generatePiagamCanvasDirect,
} from '../utils/printExportUtils';

export interface PiagamData {
  judulPiagam: string;
  nomorSurat: string;
  tanggalMasehi: string;
  tanggalJawa: string;
  pihakSatu?: {
    label: string;
    nama: string;
    weton: string;
    neptu: number;
    wuku?: string;
  };
  pihakDua?: {
    label: string;
    nama: string;
    weton: string;
    neptu: number;
    wuku?: string;
  };
  ringkasanHasil: {
    kategoriUtama: string;
    skorAtauSisa: string;
    maknaAdat: string;
    rekomendasiLuhur: string;
  };
  catatanKhusus?: string[];
}

interface PiagamPetungModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PiagamData | null;
}

export const PiagamPetungModal: React.FC<PiagamPetungModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [isDownloadingTxt, setIsDownloadingTxt] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !data) return null;

  const getPiagamPlainText = () => {
    return `📜 ${data.judulPiagam.toUpperCase()}
No. Registrasi: ${data.nomorSurat}
Wanci Penerbitan: ${data.tanggalMasehi} (${data.tanggalJawa})
Landasan: Kitab Primbon Betaljemur Adammakna & Jangka Jayabaya

${data.pihakSatu ? `[ ${data.pihakSatu.label} ]\nNama: ${data.pihakSatu.nama}\nWeton: ${data.pihakSatu.weton} (Neptu ${data.pihakSatu.neptu})\n${data.pihakSatu.wuku ? `Wuku: ${data.pihakSatu.wuku}\n` : ''}\n` : ''}${data.pihakDua ? `[ ${data.pihakDua.label} ]\nNama: ${data.pihakDua.nama}\nWeton: ${data.pihakDua.weton} (Neptu ${data.pihakDua.neptu})\n${data.pihakDua.wuku ? `Wuku: ${data.pihakDua.wuku}\n` : ''}\n` : ''}
==================================================
STATUS ASIL PETUNG ADAT:
Kategori: ${data.ringkasanHasil.kategoriUtama}
Ketetapan: ${data.ringkasanHasil.skorAtauSisa}

MAKNA FALSAFAH:
"${data.ringkasanHasil.maknaAdat}"

PIWULANG & MITIGASI LUHUR:
${data.ringkasanHasil.rekomendasiLuhur}
==================================================
${data.catatanKhusus && data.catatanKhusus.length > 0 ? `\nCATATAN ADAT:\n${data.catatanKhusus.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n` : ''}
Surya Sengkala: Rahayu Ing Budi
Diterbitkan Resmi Melalui Sistem WETON JOWO SaaS
Digital Verification: https://wetonjowo.web.app`;
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      if (printRef.current) {
        await printElement(printRef.current, `${data.judulPiagam} - ${data.nomorSurat}`);
      } else {
        window.print();
      }
    } catch (err) {
      console.error('Gagal mencetak:', err);
      window.print();
    } finally {
      setTimeout(() => setIsPrinting(false), 500);
    }
  };

  const handleDownloadImage = async () => {
    setIsDownloadingImage(true);
    const cleanFileName = `Piagam_${data.nomorSurat.replace(/[^a-zA-Z0-9_-]/g, '_')}`;

    try {
      let success = false;
      if (printRef.current) {
        success = await downloadElementAsPng(printRef.current, `${cleanFileName}.png`, {
          scale: 2.5,
          backgroundColor: '#FFFDF9',
        });
      }

      // Jika html2canvas DOM gagal, gunakan direct high-resolution 2D Canvas renderer
      if (!success) {
        const directDataUrl = generatePiagamCanvasDirect(data);
        if (directDataUrl) {
          const link = document.createElement('a');
          link.href = directDataUrl;
          link.download = `${cleanFileName}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (error) {
      console.error('Error saat unduh gambar:', error);
      // Fallback direct canvas
      const directDataUrl = generatePiagamCanvasDirect(data);
      if (directDataUrl) {
        const link = document.createElement('a');
        link.href = directDataUrl;
        link.download = `${cleanFileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } finally {
      setIsDownloadingImage(false);
    }
  };

  const handleDownloadTxt = () => {
    setIsDownloadingTxt(true);
    const text = getPiagamPlainText();
    const cleanFileName = `Piagam_${data.nomorSurat.replace(/[^a-zA-Z0-9_-]/g, '_')}.txt`;
    downloadTextFile(text, cleanFileName);
    setTimeout(() => setIsDownloadingTxt(false), 800);
  };

  const handleCopyText = () => {
    const text = getPiagamPlainText();
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = `☸ *${data.judulPiagam.toUpperCase()}*\n📜 *No:* ${data.nomorSurat}\n📅 *Wanci:* ${data.tanggalMasehi} (${data.tanggalJawa})\n\n${data.pihakSatu ? `👤 *${data.pihakSatu.label}:* ${data.pihakSatu.nama} (${data.pihakSatu.weton}, Neptu ${data.pihakSatu.neptu})\n` : ''}${data.pihakDua ? `👤 *${data.pihakDua.label}:* ${data.pihakDua.nama} (${data.pihakDua.weton}, Neptu ${data.pihakDua.neptu})\n` : ''}\n✨ *Hasil:* ${data.ringkasanHasil.kategoriUtama}\n📊 *Ketetapan:* ${data.ringkasanHasil.skorAtauSisa}\n\n📖 *Makna:* "${data.ringkasanHasil.maknaAdat}"\n🕊️ *Piwulang/Mitigasi:* ${data.ringkasanHasil.rekomendasiLuhur}\n\n_Dihitung dengan Kitab Betaljemur Adammakna melalui WETON JOWO_`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn overflow-y-auto modal-backdrop-blur">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] my-auto">
        {/* Header Modal Bar (Hidden on Print) */}
        <div className="print:hidden p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white flex flex-wrap items-center justify-between gap-3 border-b border-blue-900/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-sm">
              📜
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1.5">
                <span>Piagam Serat Petung Adat Kraton</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold">
                  Resmi
                </span>
              </h2>
              <p className="text-[11px] text-blue-200">
                Format Standar Cetak & Unduh Berdasarkan Kitab Betaljemur Adammakna
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handlePrint}
              disabled={isPrinting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 text-xs font-black rounded-xl transition shadow-xs disabled:opacity-50"
              title="Cetak Piagam atau Simpan PDF"
            >
              {isPrinting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Printer className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Cetak / PDF</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={isDownloadingImage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-black rounded-xl transition shadow-xs disabled:opacity-50"
              title="Unduh Gambar Piagam (PNG High-Res)"
            >
              {isDownloadingImage ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Unduh PNG</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition ml-1"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AREA PIAGAM UTAMA (PRINTABLE & DOWNLOADABLE AREA) */}
        <div
          id="piagam-printable-canvas"
          className="p-4 sm:p-7 overflow-y-auto bg-stone-100 print:bg-white print:p-0 print:m-0 printable-area"
          ref={printRef}
        >
          {/* Bingkai Ganda Keraton Klasik */}
          <div className="bg-[#FFFDF9] border-4 border-amber-900/50 p-5 sm:p-8 rounded-2xl shadow-inner relative overflow-hidden print:border-amber-900 print:shadow-none printable-card">
            {/* Ornamen Sudut Keraton */}
            <div className="absolute top-2 left-2 text-amber-800 text-sm opacity-50 font-serif select-none">
              ❖
            </div>
            <div className="absolute top-2 right-2 text-amber-800 text-sm opacity-50 font-serif select-none">
              ❖
            </div>
            <div className="absolute bottom-2 left-2 text-amber-800 text-sm opacity-50 font-serif select-none">
              ❖
            </div>
            <div className="absolute bottom-2 right-2 text-amber-800 text-sm opacity-50 font-serif select-none">
              ❖
            </div>

            {/* Kop Surat Adat Keraton */}
            <div className="text-center border-b-2 border-amber-900/60 pb-4 mb-5 space-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-900 border-2 border-amber-500/80 mb-1 font-serif text-xl font-bold shadow-xs">
                ☸
              </div>
              <h1 className="text-base sm:text-xl font-black text-amber-950 font-serif tracking-wide uppercase">
                {data.judulPiagam}
              </h1>
              <p className="text-xs font-semibold text-amber-900/80 tracking-widest uppercase">
                KHASANAH PETUNG BETALJEMUR ADAMMAKNA & JANGKA JAYABAYA
              </p>
              <p className="text-[10px] text-stone-500 font-mono">
                No. Registrasi: {data.nomorSurat} • Wanci: {data.tanggalMasehi} ({data.tanggalJawa})
              </p>
            </div>

            {/* Pernyataan Pembuka */}
            <div className="text-xs sm:text-sm text-stone-800 leading-relaxed font-serif text-center italic mb-5 space-y-1">
              <div className="font-serif text-sm sm:text-base text-amber-950 font-bold not-italic">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <p>
                &ldquo;Miwiti kanthi nyebut Asmaning Gusti Allah Ingkang Maha Welas lan Asih. Awit saking pitedah para sesepuh dalah piwulang luhur ingkang sinerat ing Kitab Primbon Betaljemur Adammakna, kapratelakaken asiling petung punika minangka sarana ikhtiar (Al-Umuru bi Maqashidiha) dalah tafa'ul kabecikan kanthi nyenyuwun berkah dhumateng Gusti Allah SWT.&rdquo;
              </p>
            </div>

            {/* Pihak Terlibat / Subjek */}
            {(data.pihakSatu || data.pihakDua) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {data.pihakSatu && (
                  <div className="bg-amber-50/70 border border-amber-300/80 p-3.5 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                      {data.pihakSatu.label}
                    </span>
                    <h3 className="text-sm font-black text-stone-900">
                      {data.pihakSatu.nama}
                    </h3>
                    <div className="text-xs text-stone-700">
                      Weton: <strong>{data.pihakSatu.weton}</strong> (Neptu: {data.pihakSatu.neptu})
                    </div>
                    {data.pihakSatu.wuku && (
                      <div className="text-[11px] text-stone-500">
                        Wuku: {data.pihakSatu.wuku}
                      </div>
                    )}
                  </div>
                )}

                {data.pihakDua && (
                  <div className="bg-rose-50/70 border border-rose-300/80 p-3.5 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-900">
                      {data.pihakDua.label}
                    </span>
                    <h3 className="text-sm font-black text-stone-900">
                      {data.pihakDua.nama}
                    </h3>
                    <div className="text-xs text-stone-700">
                      Weton: <strong>{data.pihakDua.weton}</strong> (Neptu: {data.pihakDua.neptu})
                    </div>
                    {data.pihakDua.wuku && (
                      <div className="text-[11px] text-stone-500">
                        Wuku: {data.pihakDua.wuku}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Hasil Analisis & Tafsir Adat */}
            <div className="border border-amber-900/30 bg-amber-50/50 rounded-xl p-4 sm:p-5 space-y-3 mb-5">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                  Status Asil Petung Adat:
                </span>
                <span className="text-xs font-black px-3 py-0.5 rounded-full bg-amber-900 text-amber-100">
                  {data.ringkasanHasil.skorAtauSisa}
                </span>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-black text-stone-900">
                  {data.ringkasanHasil.kategoriUtama}
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mt-1 font-serif">
                  {data.ringkasanHasil.maknaAdat}
                </p>
              </div>

              <div className="pt-2 border-t border-amber-200/80 text-xs text-amber-950 font-serif">
                <strong>Piwulang & Mitigasi Luhur:</strong> {data.ringkasanHasil.rekomendasiLuhur}
              </div>
            </div>

            {/* Catatan Tambahan (jika ada) */}
            {data.catatanKhusus && data.catatanKhusus.length > 0 && (
              <div className="mb-5 bg-stone-100/70 p-3 rounded-xl border border-stone-300/70 text-[11px] text-stone-700 space-y-1">
                <strong className="block text-stone-900">Catatan Adat Tambahan:</strong>
                <ul className="list-disc pl-4 space-y-0.5">
                  {data.catatanKhusus.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tanda Tangan & Cap Segel Digital Adat */}
            <div className="pt-4 border-t-2 border-amber-900/40 flex flex-row items-end justify-between text-xs text-stone-800">
              <div className="space-y-1">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-700/60 flex items-center justify-center text-center p-1 text-[9px] font-serif uppercase text-amber-900">
                  Cap Segel Weton Jowo
                </div>
                <div className="text-[10px] text-stone-500 font-mono">
                  Surya Sengkala: Rahayu Ing Budi
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-[11px] text-stone-600">
                  Kraton Kasunanan & Kasultanan
                </div>
                <div className="font-serif italic font-bold text-stone-900 pt-3 text-xs">
                  Sesepuh Adat Primbon Nusantara
                </div>
                <div className="text-[10px] text-stone-500 font-mono">
                  Digital Verification WETON JOWO SaaS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Modal Actions (Hidden on Print) */}
        <div className="print:hidden p-3.5 sm:p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition shadow-xs"
              title="Salin isi piagam ke papan klip"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>Salin Teks</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
              title="Bagikan ke WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadTxt}
              disabled={isDownloadingTxt}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition shadow-xs disabled:opacity-50"
              title="Unduh file dokumen teks .txt"
            >
              {isDownloadingTxt ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5 text-amber-400" />}
              <span className="hidden sm:inline">Unduh TXT</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={isDownloadingImage}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-black rounded-xl transition shadow-xs disabled:opacity-50"
              title="Unduh piagam sebagai gambar PNG"
            >
              {isDownloadingImage ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>Unduh Gambar</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              disabled={isPrinting}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 text-xs font-black rounded-xl transition shadow-xs disabled:opacity-50"
              title="Cetak atau simpan sebagai dokumen PDF"
            >
              {isPrinting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
