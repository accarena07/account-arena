"use client";

import { useEffect, useState } from "react";
import { Inter, Poppins } from "next/font/google";
import { applyInitialTheme, toggleDarkMode } from "../components/theme";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function BuyerRegisterPage() {
  const [otpMethod, setOtpMethod] = useState<"whatsapp" | "email">("whatsapp");
  const [showToast, setShowToast] = useState(false);
  const [showTncModal, setShowTncModal] = useState(false);

  useEffect(() => {
    applyInitialTheme();
  }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 3500);
  }

  return (
    <div
      className={`${inter.className} bg-background-light flex min-h-screen items-center justify-center p-4 transition-colors duration-300 dark:bg-background-dark`}
    >
      <div className="fixed top-6 right-6 z-50">
        <button
          className="rounded-full bg-white p-3 text-gray-600 shadow-lg transition-all hover:scale-110 dark:bg-slate-800 dark:text-gray-300"
          onClick={toggleDarkMode}
          type="button"
        >
          <span className="material-symbols-outlined dark:!hidden">dark_mode</span>
          <span className="material-symbols-outlined !hidden dark:!inline-block">light_mode</span>
        </button>
      </div>

      {showTncModal ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            aria-label="Tutup modal syarat dan ketentuan"
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowTncModal(false)}
            type="button"
          />
          <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-slate-800">
              <h2 className={`${poppins.className} flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white`}>
                <span className="material-symbols-outlined text-primary dark:text-secondary">gavel</span>
                Syarat & Ketentuan
              </h2>
              <button
                className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white"
                onClick={() => setShowTncModal(false)}
                type="button"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto p-6 lg:p-8">
              <section>
                <h3 className={`${poppins.className} mb-3 text-lg font-bold text-gray-900 dark:text-white`}>Ketentuan Umum</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  Selamat datang di GameMarket. Dengan mendaftar dan menggunakan platform kami, Anda menyetujui untuk
                  terikat oleh syarat dan ketentuan berikut. Platform ini berfungsi sebagai perantara dalam transaksi
                  jual beli aset digital dalam ekosistem game.
                </p>
                <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>Pengguna wajib berusia minimal 17 tahun atau memiliki izin orang tua.</li>
                  <li>Satu pengguna hanya diperbolehkan memiliki satu akun terverifikasi.</li>
                  <li>Dilarang menggunakan platform untuk kegiatan ilegal atau pencucian uang.</li>
                </ul>
              </section>

              <section>
                <h3 className={`${poppins.className} mb-3 text-lg font-bold text-gray-900 dark:text-white`}>
                  Hak dan Kewajiban Buyer
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  Pembeli berhak menerima data akun yang sesuai dengan deskripsi yang dicantumkan oleh Seller.
                </p>
                <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>Wajib melakukan pembayaran sesuai nominal yang tertera melalui sistem pembayaran resmi.</li>
                  <li>Wajib melakukan pengecekan akun dalam kurun waktu 1x24 jam setelah data diterima.</li>
                  <li>Dilarang mengubah data akun sebelum transaksi dinyatakan selesai secara otomatis oleh sistem.</li>
                </ul>
              </section>

              <section>
                <h3 className={`${poppins.className} mb-3 text-lg font-bold text-gray-900 dark:text-white`}>
                  Hak dan Kewajiban Seller
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  Penjual bertanggung jawab penuh atas keabsahan dan keamanan data akun yang dijual.
                </p>
                <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>Wajib memberikan informasi yang jujur dan akurat mengenai kondisi akun.</li>
                  <li>Menjamin bahwa akun tidak dalam sengketa atau dalam status banned.</li>
                  <li>
                    Dilarang melakukan &quot;pullback&quot; atau mengambil kembali akun yang telah dijual secara ilegal.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className={`${poppins.className} mb-3 text-lg font-bold text-gray-900 dark:text-white`}>
                  Keamanan & Sanksi
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  Kami berhak membekukan akun atau melaporkan pengguna ke pihak berwajib jika ditemukan indikasi
                  penipuan atau pelanggaran berat terhadap syarat dan ketentuan ini.
                </p>
              </section>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
              <button
                className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 hover:bg-primary/90"
                onClick={() => setShowTncModal(false)}
                type="button"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <main className="mx-auto flex min-h-[850px] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 lg:flex-row">
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-primary p-12 text-white lg:w-5/12">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          ></div>
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-secondary opacity-20 blur-3xl"></div>
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
          <div className="relative z-10 max-w-md text-center">
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
              <span className="material-symbols-outlined text-4xl">sports_esports</span>
            </div>
            <h1 className={`${poppins.className} mb-6 text-4xl font-bold`}>Mulai Petualangan Gaming Anda</h1>
            <p className="mb-8 text-lg leading-relaxed text-blue-100">
              Satu akun untuk semua kebutuhan marketplace game Anda. Aman, terpercaya, dan instan.
            </p>
            <div className="grid grid-cols-1 gap-4 text-left">
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
                <div>
                  <p className="text-sm font-semibold text-white">Keamanan Terjamin</p>
                  <p className="text-xs text-blue-200">Verifikasi OTP untuk setiap akses akun.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="material-symbols-outlined text-secondary">payments</span>
                <div>
                  <p className="text-sm font-semibold text-white">Transaksi Instan</p>
                  <p className="text-xs text-blue-200">Proses serah terima akun otomatis & cepat.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 text-xs font-medium text-white/50">© 2024 GAMEMARKET Indonesia. All rights reserved.</div>
        </div>

        <div className="flex flex-col justify-center bg-white p-8 dark:bg-slate-900 lg:w-7/12 lg:p-16">
          <div className="mb-10 flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-primary dark:text-secondary">account_balance_wallet</span>
            <span className={`${poppins.className} text-2xl font-bold tracking-tight text-gray-900 uppercase dark:text-white`}>
              GameMarket
            </span>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex border-b border-gray-100 dark:border-slate-800">
              <a
                className="flex-1 border-b-2 border-transparent py-4 text-center font-semibold text-gray-400 transition-all duration-200 hover:text-gray-600 dark:hover:text-gray-200"
                href="/sites/buyer/login"
              >
                Masuk
              </a>
              <a
                className="flex-1 border-b-2 border-primary py-4 text-center font-semibold text-primary transition-all duration-200 dark:border-secondary dark:text-secondary"
                href="/sites/buyer/register"
              >
                Daftar
              </a>
            </div>

            <form className="space-y-5" id="register-form" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">
                    mail
                  </span>
                  <input
                    className="w-full rounded-xl border-none bg-gray-50 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white dark:focus:ring-secondary"
                    placeholder="alamat@email.com"
                    required
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nomor WhatsApp</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">
                    call
                  </span>
                  <input
                    className="w-full rounded-xl border-none bg-gray-50 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white dark:focus:ring-secondary"
                    placeholder="0812xxxxxx"
                    required
                    type="tel"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kata Sandi</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">
                    lock
                  </span>
                  <input
                    className="w-full rounded-xl border-none bg-gray-50 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white dark:focus:ring-secondary"
                    placeholder="Minimal 8 karakter"
                    required
                    type="password"
                  />
                </div>
              </div>

              <div className="pt-4">
                <h3 className="mb-4 text-sm font-bold text-gray-900 dark:text-white">Pilih Metode Verifikasi OTP</h3>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                      otpMethod === "whatsapp"
                        ? "border-primary bg-primary/5 shadow-[0_0_0_2px_#254194] dark:border-secondary dark:bg-secondary/10 dark:shadow-[0_0_0_2px_#FF761B]"
                        : "border-gray-100 hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-800"
                    }`}
                  >
                    <input
                      checked={otpMethod === "whatsapp"}
                      className="hidden"
                      name="otp_method"
                      onChange={() => setOtpMethod("whatsapp")}
                      type="radio"
                    />
                    <span className="flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined mb-2 text-3xl text-green-500">chat</span>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-200">WhatsApp</span>
                      <span className="mt-1 text-[10px] tracking-wider text-gray-400 uppercase dark:text-gray-500">Paling Cepat</span>
                    </span>
                  </label>

                  <label
                    className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                      otpMethod === "email"
                        ? "border-primary bg-primary/5 shadow-[0_0_0_2px_#254194] dark:border-secondary dark:bg-secondary/10 dark:shadow-[0_0_0_2px_#FF761B]"
                        : "border-gray-100 hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-800"
                    }`}
                  >
                    <input
                      checked={otpMethod === "email"}
                      className="hidden"
                      name="otp_method"
                      onChange={() => setOtpMethod("email")}
                      type="radio"
                    />
                    <span className="flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined mb-2 text-3xl text-primary dark:text-blue-400">
                        alternate_email
                      </span>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Email</span>
                      <span className="mt-1 text-[10px] tracking-wider text-gray-400 uppercase dark:text-gray-500">Alternatif</span>
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <input
                  className="mt-1 h-5 w-5 rounded-md border-gray-200 bg-gray-50 text-primary focus:ring-primary"
                  id="terms"
                  required
                  type="checkbox"
                />
                <label className="text-xs leading-normal text-gray-500 dark:text-gray-400" htmlFor="terms">
                  Saya menyetujui{" "}
                  <button
                    className="font-semibold text-primary hover:underline dark:text-secondary"
                    onClick={(event) => {
                      event.preventDefault();
                      setShowTncModal(true);
                    }}
                    type="button"
                  >
                    Syarat & Ketentuan
                  </button>{" "}
                  serta{" "}
                  <a className="font-semibold text-primary hover:underline dark:text-secondary" href="#">
                    Kebijakan Privasi
                  </a>{" "}
                  yang berlaku.
                </label>
              </div>

              <button
                className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 hover:opacity-90 dark:bg-secondary dark:shadow-secondary/20"
                type="submit"
              >
                Daftar Sekarang
              </button>

              <div className="pt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sudah punya akun?{" "}
                  <a className="font-bold text-primary hover:underline dark:text-secondary" href="/sites/buyer/login">
                    Masuk di sini
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <div
        className={`pointer-events-none fixed right-10 bottom-10 flex items-center gap-4 rounded-lg border-l-4 border-green-500 bg-white p-4 shadow-2xl transition-all duration-500 dark:bg-slate-800 ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
        }`}
        id="toast"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <span className="material-symbols-outlined text-green-500">check_circle</span>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">Pendaftaran Berhasil!</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Kode OTP telah dikirimkan ke pilihan Anda.</p>
        </div>
      </div>
    </div>
  );
}
