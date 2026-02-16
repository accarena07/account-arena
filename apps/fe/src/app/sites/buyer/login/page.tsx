"use client";

import ResultModal from "@/components/common/ResultModal";
import AuthPageShell from "../components/AuthPageShell";
import { useBuyerLoginPage } from "./useBuyerLoginPage";

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

const BuyerLoginPage = () => {
  const {
    showErrorModal,
    errorMessage,
    isSubmitting,
    isCheckingAuth,
    showPassword,
    email,
    password,
    setEmail,
    setPassword,
    onCloseErrorModal,
    onTogglePasswordVisibility,
    onSubmit,
  } = useBuyerLoginPage();

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        Memeriksa sesi login...
      </div>
    );
  }

  return (
    <>
      <ResultModal
        isOpen={showErrorModal}
        message={errorMessage}
        onClose={onCloseErrorModal}
        onPrimaryAction={onCloseErrorModal}
        primaryActionLabel="Coba Lagi"
        secondaryActionHref="/login/forgot-password"
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
        <form aria-busy={isSubmitting || isCheckingAuth} className="space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email atau Username</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">
              alternate_email
            </span>
            <input
              className="w-full rounded-xl border-none bg-gray-50 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white"
              disabled={isSubmitting || isCheckingAuth}
              placeholder="contoh@email.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kata Sandi</label>
            <a className="text-sm text-primary hover:underline dark:text-blue-400" href="/login/forgot-password">
              Lupa kata sandi?
            </a>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">
              lock_outline
            </span>
            <input
              className="w-full rounded-xl border-none bg-gray-50 py-3 pr-12 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white"
              disabled={isSubmitting || isCheckingAuth}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
              disabled={isSubmitting || isCheckingAuth}
              onClick={onTogglePasswordVisibility}
              type="button"
            >
              <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
            </button>
          </div>
        </div>

        <button
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-80"
          disabled={isSubmitting || isCheckingAuth}
          type="submit"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
              Memproses...
            </>
          ) : (
            "Masuk ke Akun"
          )}
        </button>

        </form>
      </AuthPageShell>
    </>
  );
};

export default BuyerLoginPage;
