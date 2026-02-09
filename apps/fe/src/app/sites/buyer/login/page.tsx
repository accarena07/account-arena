"use client";

import { useState } from "react";
import { Inter, Poppins } from "next/font/google";
import Image from "next/image";
import ThemeToggleButton from "../components/ThemeToggleButton";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function BuyerLoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showToast, setShowToast] = useState(false);

  function onRegisterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 3500);
  }

  return (
    <div
      className={`${inter.className} bg-background-light flex min-h-screen items-center justify-center transition-colors duration-300 dark:bg-background-dark`}
    >
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggleButton className="bg-white p-3 text-gray-600 shadow-lg transition-all hover:scale-110 dark:bg-slate-800 dark:text-gray-300" />
      </div>

      <main className="mx-auto flex min-h-175 w-full max-w-6xl flex-col overflow-hidden bg-white shadow-2xl dark:bg-slate-900 lg:flex-row lg:rounded-3xl">
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-primary p-12 text-white lg:w-1/2">
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
            <h1 className={`${poppins.className} mb-6 text-4xl font-bold`}>Nikmati Transaksi Aman & Instan</h1>
            <p className="mb-8 text-lg leading-relaxed text-blue-100">
              Bergabunglah dengan ribuan gamer lainnya. Dapatkan akun premium game favoritmu dengan harga terbaik dan
              proses transaksi secepat kilat.
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="material-symbols-outlined mb-2 text-secondary">verified_user</span>
                <p className="text-sm font-semibold">100% Terverifikasi</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="material-symbols-outlined mb-2 text-secondary">support_agent</span>
                <p className="text-sm font-semibold">Dukungan 24/7</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 text-xs font-medium text-white/50">© 2024 GAMEMARKET Indonesia. All rights reserved.</div>
        </div>

        <div className="flex flex-col justify-center bg-white p-8 dark:bg-slate-900 lg:w-1/2 lg:p-16">
          <div className="mb-10 flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-primary dark:text-secondary">account_balance_wallet</span>
            <span className={`${poppins.className} text-2xl font-bold tracking-tight text-gray-900 uppercase dark:text-white`}>
              GameMarket
            </span>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex border-b border-gray-100 dark:border-slate-800">
              <button
                className={`flex-1 border-b-2 py-4 text-center font-semibold transition-all duration-200 ${
                  activeTab === "login"
                    ? "border-primary text-primary dark:border-white dark:text-white"
                    : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                }`}
                onClick={() => setActiveTab("login")}
                type="button"
              >
                Masuk
              </button>
              <a
                className="flex-1 border-b-2 border-transparent py-4 text-center font-semibold text-gray-400 transition-all duration-200 hover:text-gray-600 dark:hover:text-gray-200"
                href="/register"
              >
                Daftar
              </a>
            </div>

            {activeTab === "login" ? (
              <form className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email atau Username</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">
                      alternate_email
                    </span>
                    <input
                      className="w-full rounded-xl border-none bg-gray-50 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white"
                      placeholder="contoh@email.com"
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kata Sandi</label>
                    <a className="text-sm text-primary hover:underline dark:text-blue-400" href="/login/otp">
                      Lupa kata sandi?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">
                      lock_outline
                    </span>
                    <input
                      className="w-full rounded-xl border-none bg-gray-50 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                </div>

                <button
                  className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 hover:bg-blue-800"
                  type="submit"
                >
                  Masuk ke Akun
                </button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100 dark:border-slate-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-400 dark:bg-slate-900">Atau masuk dengan</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 transition-all hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
                    type="button"
                  >
                    <Image
                      alt="Google Logo"
                      className="h-5 w-5"
                      height={20}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj5GOb9iaommhZx2_9E2OXmPJu9EnMQPBvjrIStT-VhO7laB1hqd6RgSlbMSVhMYw2gyfrz0uIvfV4MCwVhuFvxzSEBNKeaUjphE3bJ6aKoFpjlbJ1QSU1p7YqFpLdKsXPmwzVNb6HJEDydx7oUFEQ73c3vyJ3jqLUg8dHs5G-J826yMgmV7vSICS2a5Auev6Z6E4nc1bx0XZkqt8jBsGXmd012xBRydbdfX_KmL0HaXQgoRmVtHfgfbOaPQOzln_rVV_ZxwmiWg"
                      width={20}
                    />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Google</span>
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 transition-all hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
                    type="button"
                  >
                    <Image
                      alt="Facebook Logo"
                      className="h-5 w-5"
                      height={20}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuABztumVWKCs8EBgfO8BtMFmjKAxmOiTqOV-vXa65c9l9nsf0aY-2FdKBMQ2Fd9lp8qBj-x9pbKVmEVqRjnFDFn-MwPm5mZ_M6k99LhMhudhnxkDnQNGdaohfMJ3innALLbw8cAZWwkET3WNdtVbQQ4fuPtOloqPayAihiMkG81HZzpzbCktmiay5KWUZcgrmldPJu_pdV0rnJEgL2QSI5BzoUuxPk3T2_VbA1lM2WOoqIVZrqYkbsMq7xVL-SRTmRg7g7L08K-rw"
                      width={20}
                    />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Facebook</span>
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-5" onSubmit={onRegisterSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">
                      mail
                    </span>
                    <input
                      className="w-full rounded-xl border-none bg-gray-50 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white"
                      placeholder="alamat@email.com"
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
                      className="w-full rounded-xl border-none bg-gray-50 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white"
                      placeholder="0812xxxxxx"
                      type="tel"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kata Sandi</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">
                      lock_outline
                    </span>
                    <input
                      className="w-full rounded-xl border-none bg-gray-50 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white"
                      placeholder="Minimal 8 karakter"
                      type="password"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <input
                    className="mt-1 h-5 w-5 rounded-md border-gray-200 bg-gray-50 text-primary focus:ring-primary"
                    id="terms"
                    type="checkbox"
                  />
                  <label className="text-sm leading-tight text-gray-500 dark:text-gray-400" htmlFor="terms">
                    Saya setuju dengan{" "}
                    <a className="text-primary hover:underline dark:text-blue-400" href="#">
                      Syarat & Ketentuan
                    </a>{" "}
                    serta{" "}
                    <a className="text-primary hover:underline dark:text-blue-400" href="#">
                      Kebijakan Privasi
                    </a>
                    .
                  </label>
                </div>
                <button
                  className="w-full rounded-xl bg-secondary py-4 font-bold text-white shadow-lg shadow-secondary/20 transition-all active:scale-95 hover:bg-orange-600"
                  type="submit"
                >
                  Daftar Sekarang
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <div
        className={`fixed right-10 bottom-10 flex items-center gap-4 rounded-lg border-l-4 border-green-500 bg-white p-4 shadow-2xl transition-all duration-500 dark:bg-slate-800 ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
        }`}
        id="toast"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <span className="material-symbols-outlined text-green-500">check_circle</span>
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-white">Pendaftaran Berhasil!</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Silahkan periksa email untuk verifikasi.</p>
        </div>
      </div>
    </div>
  );
}
