import React, { useState } from 'react';
import { X, Copy, Check, Heart, Sparkles, ShieldCheck, Wallet, QrCode } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DanaDonationModal: React.FC = () => {
  const { isDonationModalOpen, setIsDonationModalOpen, recordDonation, user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [selectedNominal, setSelectedNominal] = useState<number>(25000);
  const [customNominal, setCustomNominal] = useState<string>('');
  const [isSuccessDonated, setIsSuccessDonated] = useState(false);

  const danaNumber = '082142429266';
  const danaNumberFormatted = '0821-4242-9266';
  const danaAccountName = 'Dinda Fomo (WETON JOWO SaaS)';

  if (!isDonationModalOpen) return null;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(danaNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmDonation = () => {
    const amount = customNominal ? parseInt(customNominal, 10) || selectedNominal : selectedNominal;
    recordDonation(amount);
    setIsSuccessDonated(true);
    setTimeout(() => {
      setIsSuccessDonated(false);
      setIsDonationModalOpen(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* Header E-Wallet DANA */}
        <div className="bg-gradient-to-r from-[#118EEA] via-[#0E71BC] to-[#0A4D80] text-white p-6 relative">
          <button
            onClick={() => setIsDonationModalOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#118EEA] font-black text-xs shadow-sm">
              D
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/30">
              E-Wallet DANA Resmi
            </span>
          </div>

          <h3 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Tali Asih & Donasi Pelestarian</span>
            <Heart className="w-5 h-5 text-rose-300 fill-rose-300" />
          </h3>
          <p className="text-xs text-blue-50/90 mt-1 leading-relaxed">
            Dukung pemeliharaan server komputasi neptu, digitalisasi naskah kuno Betaljemur Adammakna, serta pelestarian sains kosmologi Jawa melalui donasi sukarela via DANA.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Card Nomor DANA */}
          <div className="bg-slate-50 border-2 border-blue-200/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5 text-blue-900 font-bold">
                <Wallet className="w-4 h-4 text-[#118EEA]" />
                Tujuan Transfer / Donasi E-Wallet:
              </span>
              <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                Aplikasi DANA
              </span>
            </div>

            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-blue-300 shadow-sm">
              <div>
                <div className="text-xs text-slate-400 font-medium">Nomor Akun DANA:</div>
                <div className="text-lg sm:text-xl font-black text-slate-900 tracking-wider">
                  {danaNumberFormatted}
                </div>
                <div className="text-xs font-semibold text-blue-800 mt-0.5">
                  a.n. <strong className="text-slate-900">{danaAccountName}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyNumber}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#118EEA] hover:bg-[#0E71BC] text-white active:scale-95'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Nomor</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Nominal Donasi Cepat */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Pilihan Nominal Tali Asih (Sukarela):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { amount: 10000, label: 'Rp 10.000', title: 'Kopi Pengrawit' },
                { amount: 25000, label: 'Rp 25.000', title: 'Kembul Bujana' },
                { amount: 50000, label: 'Rp 50.000', title: 'Pecinta Budaya' },
                { amount: 100000, label: 'Rp 100.000', title: 'Sponsor Pusaka' },
              ].map((item) => (
                <button
                  key={item.amount}
                  type="button"
                  onClick={() => {
                    setSelectedNominal(item.amount);
                    setCustomNominal('');
                  }}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    selectedNominal === item.amount && !customNominal
                      ? 'bg-blue-50 border-[#118EEA] text-[#118EEA] font-black ring-2 ring-[#118EEA]/20'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold'
                  }`}
                >
                  <div className="text-xs">{item.label}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{item.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* QRIS & Petunjuk Transfer */}
          <div className="bg-blue-50/50 p-3.5 rounded-2xl border border-blue-200/80 text-xs text-slate-600 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-[#118EEA]" />
              <span>Cara Melakukan Donasi via DANA:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600 leading-relaxed">
              <li>Buka aplikasi <strong>DANA</strong> di ponsel pintar Anda.</li>
              <li>Pilih menu <strong>Kirim (Send)</strong> ke <strong>Nomor Telepon</strong>.</li>
              <li>Masukkan nomor <strong>{danaNumberFormatted}</strong>.</li>
              <li>Tuliskan nominal donasi sukarela Anda & konfirmasi transfer.</li>
            </ol>
          </div>

          {/* Sukses Notif */}
          {isSuccessDonated && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Matur Nuwun Sanget!</strong> Konfirmasi tali asih Anda telah tercatat. Berkah rezeki dan keselamatan menyertai keluarga Anda.
              </span>
            </div>
          )}

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsDonationModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleConfirmDonation}
              className="flex-1 px-4 py-2.5 bg-[#118EEA] hover:bg-[#0E71BC] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Sudah Transfer / Konfirmasi Donasi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
