"use client";

import Image from "next/image";
import { useState } from "react";
import ResultModal from "@/components/common/ResultModal";
import AuthPageShell from "../components/AuthPageShell";

const loginFeatures = [
  {
    icon: "verified_user",
    title: "100% Terverifikasi",
  },
  {
    icon: "support_agent",
    title: "Dukungan 24/7",
  },
] as const;

export default function BuyerLoginPage() {
  const [showErrorModal, setShowErrorModal] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowErrorModal(true);
  }

  return (
    <>
      <ResultModal
        isOpen={showErrorModal}
        message="Kata sandi yang Anda masukkan salah. Silakan coba lagi."
        onClose={() => setShowErrorModal(false)}
        onPrimaryAction={() => setShowErrorModal(false)}
        primaryActionLabel="Coba Lagi"
        secondaryActionHref="/login/otp"
        secondaryActionLabel="Lupa Kata Sandi?"
        title="Login Gagal"
        variant="error"
      />

      <AuthPageShell
        activeTab="login"
        leftDescription="Bergabunglah dengan ribuan gamer lainnya. Dapatkan akun premium game favoritmu dengan harga terbaik dan proses transaksi secepat kilat."
        leftFeatures={loginFeatures}
        leftTitle="Nikmati Transaksi Aman & Instan"
      >
        <form className="space-y-5" onSubmit={onSubmit}>
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
            <div className="w-full border-t border-gray-100 dark:border-slate-800" />
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
      </AuthPageShell>
    </>
  );
}
