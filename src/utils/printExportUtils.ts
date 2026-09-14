import html2canvas from 'html2canvas';
import { PiagamData } from '../components/PiagamPetungModal';

/**
 * Utilitas Ekspor & Cetak Terpadu (Print, PDF, PNG, CSV, TXT)
 * WETON JOWO SaaS - Mendukung pencetakan dan pengunduhan beresolusi tinggi
 */

/**
 * Mencetak elemen tertentu secara bersih (Clean Print) tanpa terganggu oleh
 * layout aplikasi, modal backdrop, scrollbar, ataupun batasan iframe.
 */
export async function printElement(
  target: HTMLElement | string,
  docTitle = 'Piagam Petung Adat - WETON JOWO'
): Promise<void> {
  const element = typeof target === 'string' ? document.getElementById(target) : target;
  if (!element) {
    window.print();
    return;
  }

  // Coba metode print via hidden iframe khusus agar styling 100% terisolasi dan sempurna
  try {
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    printFrame.setAttribute('aria-hidden', 'true');
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentWindow?.document;
    if (!frameDoc) {
      throw new Error('Frame doc not accessible');
    }

    // Ambil semua stylesheet aktif dari parent document
    const styleSheets = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map((node) => node.outerHTML)
      .join('\n');

    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="utf-8" />
          <title>${docTitle}</title>
          ${styleSheets}
          <style>
            @page {
              size: A4 portrait;
              margin: 10mm;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
              box-sizing: border-box;
            }
            body {
              background: #ffffff !important;
              color: #0f172a !important;
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            }
            .print-container {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              padding: 10px;
            }
            @media print {
              .no-print, button, nav, header {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${element.outerHTML}
          </div>
        </body>
      </html>
    `);
    frameDoc.close();

    // Tunggu font dan image termuat di frame
    setTimeout(() => {
      try {
        printFrame.contentWindow?.focus();
        printFrame.contentWindow?.print();
      } catch {
        window.print();
      } finally {
        setTimeout(() => {
          if (document.body.contains(printFrame)) {
            document.body.removeChild(printFrame);
          }
        }, 1000);
      }
    }, 450);
  } catch {
    // Fallback standard window print
    window.print();
  }
}

/**
 * Mengunduh elemen DOM sebagai gambar PNG kualitas tinggi (High DPI)
 */
export async function downloadElementAsPng(
  element: HTMLElement,
  filename = 'piagam-petung-weton.png',
  options: { scale?: number; backgroundColor?: string } = {}
): Promise<boolean> {
  try {
    const scale = options.scale || 2.5; // High resolution retina rendering
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: options.backgroundColor || '#FFFDF9',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error('Gagal mengunduh gambar:', error);
    return false;
  }
}

/**
 * Mengunduh file teks (TXT, CSV, MD, JSON)
 */
export function downloadTextFile(
  content: string,
  filename: string,
  mimeType = 'text/plain;charset=utf-8'
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generator Gambar Piagam berbasis Pure Canvas 2D
 * Memberikan jaminan 100% hasil gambar tanpa bug CSS atau external font
 */
export function generatePiagamCanvasDirect(data: PiagamData): string {
  const width = 1200;
  const height = 1680;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return '';

  // 1. Background Kertas Kuno Mewah (Parchment Cream)
  ctx.fillStyle = '#FFFDF7';
  ctx.fillRect(0, 0, width, height);

  // 2. Bingkai Ganda Keraton
  ctx.strokeStyle = '#78350F'; // Amber 900
  ctx.lineWidth = 14;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  ctx.strokeStyle = '#D97706'; // Amber 600
  ctx.lineWidth = 4;
  ctx.strokeRect(60, 60, width - 120, height - 120);

  ctx.strokeStyle = '#B45309';
  ctx.lineWidth = 2;
  ctx.strokeRect(70, 70, width - 140, height - 140);

  // 3. Ornamen Sudut (Four Corners)
  ctx.fillStyle = '#78350F';
  ctx.font = '32px serif';
  ctx.fillText('❖', 85, 110);
  ctx.fillText('❖', width - 125, 110);
  ctx.fillText('❖', 85, height - 90);
  ctx.fillText('❖', width - 125, height - 90);

  // 4. Logo Surya Cakra Adat
  ctx.beginPath();
  ctx.arc(width / 2, 160, 45, 0, Math.PI * 2);
  ctx.fillStyle = '#FEF3C7';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#B45309';
  ctx.stroke();

  ctx.fillStyle = '#78350F';
  ctx.font = 'bold 44px serif';
  ctx.textAlign = 'center';
  ctx.fillText('☸', width / 2, 175);

  // 5. Header / Judul Piagam
  ctx.fillStyle = '#451A03';
  ctx.font = '900 36px "Times New Roman", Georgia, serif';
  ctx.fillText(data.judulPiagam.toUpperCase(), width / 2, 245);

  ctx.fillStyle = '#92400E';
  ctx.font = 'bold 18px "Times New Roman", Georgia, serif';
  ctx.fillText('KHASANAH PETUNG BETALJEMUR ADAMMAKNA & JANGKA JAYABAYA', width / 2, 280);

  ctx.fillStyle = '#64748B';
  ctx.font = '16px monospace';
  ctx.fillText(`No. Registrasi: ${data.nomorSurat}  •  Wanci: ${data.tanggalMasehi} (${data.tanggalJawa})`, width / 2, 310);

  // Garis Pembatas Header
  ctx.beginPath();
  ctx.moveTo(120, 335);
  ctx.lineTo(width - 120, 335);
  ctx.strokeStyle = '#78350F';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 6. Pernyataan Pembuka
  ctx.fillStyle = '#1E293B';
  ctx.font = 'italic 18px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'center';
  const intro = '"Miwiti kanthi nyebut Asmaning Gusti Ingkang Maha Welas lan Asih. Awit saking pitedah para sesepuh dalah piwulang luhur ingkang sinerat ing Kitab Primbon Betaljemur Adammakna, kapratelakaken asiling petung punika minangka pandoming laku kautaman."';
  wrapText(ctx, intro, width / 2, 375, width - 260, 26);

  // 7. Data Subjek / Pihak Pria & Wanita
  let currentY = 460;
  if (data.pihakSatu || data.pihakDua) {
    const cardWidth = (width - 280) / 2;

    if (data.pihakSatu) {
      drawSubjekCard(
        ctx,
        120,
        currentY,
        cardWidth,
        140,
        data.pihakSatu.label,
        data.pihakSatu.nama,
        data.pihakSatu.weton,
        data.pihakSatu.neptu,
        data.pihakSatu.wuku,
        '#FEF3C7',
        '#D97706'
      );
    }

    if (data.pihakDua) {
      drawSubjekCard(
        ctx,
        120 + cardWidth + 40,
        currentY,
        cardWidth,
        140,
        data.pihakDua.label,
        data.pihakDua.nama,
        data.pihakDua.weton,
        data.pihakDua.neptu,
        data.pihakDua.wuku,
        '#FFE4E6',
        '#E11D48'
      );
    }
    currentY += 170;
  }

  // 8. Box Hasil Analisis & Tafsir Adat
  ctx.fillStyle = '#FEF2F2';
  ctx.strokeStyle = '#991B1B';
  ctx.lineWidth = 2;
  roundRect(ctx, 120, currentY, width - 240, 270, 16, true, true);

  // Status Badge
  ctx.fillStyle = '#7F1D1D';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('STATUS ASIL PETUNG ADAT:', 145, currentY + 35);

  ctx.fillStyle = '#450A0A';
  ctx.font = '900 24px "Times New Roman", Georgia, serif';
  ctx.fillText(data.ringkasanHasil.kategoriUtama, 145, currentY + 75);

  ctx.fillStyle = '#991B1B';
  ctx.font = 'bold 18px monospace';
  ctx.fillText(`[ ${data.ringkasanHasil.skorAtauSisa} ]`, 145, currentY + 105);

  ctx.fillStyle = '#334155';
  ctx.font = '16px "Times New Roman", Georgia, serif';
  wrapText(ctx, `Makna Falsafah: "${data.ringkasanHasil.maknaAdat}"`, 145, currentY + 140, width - 290, 24);

  ctx.fillStyle = '#78350F';
  ctx.font = 'bold 16px "Times New Roman", Georgia, serif';
  wrapText(ctx, `Piwulang & Mitigasi: ${data.ringkasanHasil.rekomendasiLuhur}`, 145, currentY + 215, width - 290, 24);

  currentY += 300;

  // 9. Catatan Adat Tambahan
  if (data.catatanKhusus && data.catatanKhusus.length > 0) {
    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1;
    roundRect(ctx, 120, currentY, width - 240, 100, 12, true, true);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('Catatan Adat Tambahan:', 145, currentY + 28);

    ctx.fillStyle = '#475569';
    ctx.font = '14px sans-serif';
    data.catatanKhusus.slice(0, 3).forEach((catatan, i) => {
      ctx.fillText(`• ${catatan}`, 145, currentY + 54 + (i * 22));
    });

    currentY += 125;
  }

  // 10. Tanda Tangan & Cap Segel Kraton
  const signY = height - 240;

  // Garis batas cap
  ctx.beginPath();
  ctx.moveTo(120, signY);
  ctx.lineTo(width - 120, signY);
  ctx.strokeStyle = '#78350F';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Cap Segel Kiri
  ctx.beginPath();
  ctx.arc(220, signY + 90, 50, 0, Math.PI * 2);
  ctx.strokeStyle = '#B45309';
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#92400E';
  ctx.font = 'bold 12px serif';
  ctx.textAlign = 'center';
  ctx.fillText('CAP SEGEL ADAT', 220, signY + 80);
  ctx.fillText('WETON JOWO', 220, signY + 98);
  ctx.fillText('★ ★ ★', 220, signY + 115);

  ctx.fillStyle = '#64748B';
  ctx.font = '13px monospace';
  ctx.fillText('Surya Sengkala: Rahayu Ing Budi', 220, signY + 165);

  // Tanda Tangan Kanan
  ctx.textAlign = 'right';
  ctx.fillStyle = '#475569';
  ctx.font = '14px serif';
  ctx.fillText('Kraton Kasunanan & Kasultanan', width - 140, signY + 35);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold italic 18px "Times New Roman", serif';
  ctx.fillText('Sesepuh Adat Primbon Nusantara', width - 140, signY + 100);

  ctx.fillStyle = '#64748B';
  ctx.font = '12px monospace';
  ctx.fillText('Digital Verification WETON JOWO SaaS', width - 140, signY + 130);
  ctx.fillText('https://wetonjowo.web.app', width - 140, signY + 150);

  return canvas.toDataURL('image/png', 1.0);
}

// Helper canvas text wrapping
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}

// Helper card subjek
function drawSubjekCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  nama: string,
  weton: string,
  neptu: number,
  wuku: string | undefined,
  bgColor: string,
  borderColor: string
) {
  ctx.fillStyle = bgColor;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1.5;
  roundRect(ctx, x, y, w, h, 12, true, true);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#78350F';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText(label.toUpperCase(), x + 16, y + 26);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 18px "Times New Roman", Georgia, serif';
  ctx.fillText(nama, x + 16, y + 54);

  ctx.fillStyle = '#334155';
  ctx.font = '15px sans-serif';
  ctx.fillText(`Weton: ${weton} (Neptu ${neptu})`, x + 16, y + 82);

  if (wuku) {
    ctx.fillStyle = '#64748B';
    ctx.font = '13px sans-serif';
    ctx.fillText(`Wuku: ${wuku}`, x + 16, y + 108);
  }
}

// Helper rounded rectangle
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill = true,
  stroke = true
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}
