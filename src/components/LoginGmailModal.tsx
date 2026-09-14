import React, { useState } from 'react';
import { X, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginGmailModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginWithGmail } = useAuth();
  
  const [emailInput, setEmailInput] = useState('');
  const [namaInput, setNamaInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmed = emailInput.trim();
    if (!trimmed) {
      setErrorMsg('Harap masukkan alamat email Gmail Anda.');
      return;
    }

    if (!trimmed.toLowerCase().includes('@')) {
      setErrorMsg('Format email tidak valid.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      loginWithGmail(trimmed, namaInput);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* Header Visual */}
        <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-rose-950 text-white p-6 relative">
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">☸</span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-rose-300 bg-rose-950/70 px-2.5 py-0.5 rounded-full border border-rose-500/40">
              WETON JOWO SAAS
            </span>
          </div>

          <h3 className="text-xl font-black tracking-tight text-white">
            Masuk dengan Akun Gmail
          </h3>
          <p className="text-xs text-blue-100/85 mt-1 leading-relaxed">
            Untuk mengakses modul petung eksklusif, proteksi pantangan silsilah, dan kalkulator hari baik, silakan masuk dengan akun Gmail pribadi Anda.
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {/* Form Login Gmail Manual */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Alamat Email Gmail Anda
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="contoh: nama.anda@gmail.com"
                  required
                  className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 focus:bg-white outline-none"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nama Lengkap / Panggilan
              </label>
              <input
                type="text"
                value={namaInput}
                onChange={(e) => setNamaInput(e.target.value)}
                placeholder="Contoh: Danang Sutawijaya"
                className="w-full text-xs sm:text-sm px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 focus:bg-white outline-none"
              />
            </div>

            {errorMsg && (
              <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2 rounded-xl font-medium">
                {errorMsg}
              </div>
            )}

            {/* Official Style Google Sign-In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2.5"
            >
              {/* Google G Logo SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.96 0 12s.46 3.84 1.26 5.42l4.02-3.15Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                />
              </svg>
              <span>{isLoading ? 'Menghubungkan Akun...' : 'Lanjutkan dengan Akun Gmail'}</span>
            </button>
          </form>

          {/* Security & Heritage Privacy Note */}
          <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500 leading-tight">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Data weton silsilah dan catatan geblak keluarga Anda dienkripsi aman pada browser Anda. Kami berkomitmen menjaga marwah privasi leluhur Anda.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
