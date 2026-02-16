"use client";

import { Inter, Poppins } from "next/font/google";
import ResultModal from "@/components/common/ResultModal";
import ThemeToggleButton from "../ThemeToggleButton";
import { OTP_LENGTH } from "./handler";
import type { OtpVerificationPageProps } from "./otp-verification.type";
import { useOtpVerificationPage } from "./useOtpVerificationPage";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

const OtpVerificationPage = ({ flow }: OtpVerificationPageProps) => {
  const {
    otpDigits,
    showOtpErrorModal,
    showResendSuccessModal,
    errorTitle,
    errorMessage,
    isSubmitting,
    isResending,
    resendCooldownSec,
    backHref,
    backLabel,
    description,
    onCloseOtpErrorModal,
    onCloseResendSuccessModal,
    onChangeDigit,
    onSubmit,
    onResendOtp,
    formatCooldown,
    resendSuccessMessage,
  } = useOtpVerificationPage(flow);

  return (
    <>
      <ResultModal
        isOpen={showOtpErrorModal}
        message={errorMessage}
        onClose={onCloseOtpErrorModal}
        onPrimaryAction={onCloseOtpErrorModal}
        primaryActionLabel="Coba Lagi"
        title={errorTitle}
        variant="error"
      />
      <ResultModal
        isOpen={showResendSuccessModal}
        message={resendSuccessMessage}
        onClose={onCloseResendSuccessModal}
        onPrimaryAction={onCloseResendSuccessModal}
        primaryActionLabel="OK"
        title="OTP Terkirim"
        variant="success"
      />

      <div
        className={`${inter.className} bg-background-light flex min-h-screen items-center justify-center p-4 transition-colors duration-300 dark:bg-background-dark`}
      >
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggleButton className="bg-white p-3 text-gray-600 shadow-lg transition-all hover:scale-110 dark:bg-slate-800 dark:text-gray-300" />
      </div>

      <main className="w-full max-w-lg overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="p-8 lg:p-12">
          <div className="mb-10 flex flex-col items-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 dark:bg-white/5">
              <span className="material-symbols-outlined text-4xl text-primary dark:text-secondary">shield_person</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl font-bold text-primary dark:text-secondary">
                account_balance_wallet
              </span>
              <span className={`${poppins.className} text-xl font-bold tracking-tight text-gray-900 uppercase dark:text-white`}>
                GameMarket
              </span>
            </div>
          </div>

          <div className="mb-10 text-center">
            <h1 className={`${poppins.className} mb-2 text-2xl font-bold text-gray-900 dark:text-white`}>Verifikasi Kode OTP</h1>
            <p className="text-gray-500 dark:text-gray-400">{description}</p>
          </div>

          <form className="space-y-8" onSubmit={onSubmit}>
            <div className="flex justify-between gap-2 sm:gap-4">
              {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
                <input
                  autoFocus={idx === 0}
                  className="h-14 w-12 rounded-xl border-2 border-transparent bg-gray-50 text-center text-2xl font-bold text-gray-900 outline-none transition-all focus:border-primary dark:bg-slate-800 dark:text-white dark:focus:border-secondary sm:h-16 sm:w-14"
                  inputMode="numeric"
                  key={idx}
                  maxLength={1}
                  disabled={isSubmitting}
                  onChange={(event) => onChangeDigit(idx, event.target.value)}
                  pattern="[0-9]*"
                  placeholder="0"
                  required
                  type="text"
                  value={otpDigits[idx]}
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tidak menerima kode?
                <button
                  className="mt-1 block w-full font-semibold text-primary disabled:cursor-not-allowed disabled:text-gray-400 dark:text-blue-400 dark:disabled:text-slate-500"
                  disabled={isResending || resendCooldownSec > 0}
                  onClick={onResendOtp}
                  type="button"
                >
                  {isResending
                    ? "Mengirim..."
                    : resendCooldownSec > 0
                      ? `Kirim Ulang OTP (${formatCooldown(resendCooldownSec)})`
                      : "Kirim Ulang OTP"}
                </button>
              </p>
            </div>

            <div className="space-y-4">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-80"
                disabled={isSubmitting}
                type="submit"
              >
                <span className={`material-symbols-outlined text-xl ${isSubmitting ? "animate-spin" : ""}`}>
                  {isSubmitting ? "progress_activity" : "verified"}
                </span>
                {isSubmitting ? "Memproses..." : "Verifikasi"}
              </button>
              <a
                className="block w-full rounded-xl bg-transparent py-3 text-center font-medium text-gray-500 transition-all hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-800"
                href={backHref}
              >
                {backLabel}
              </a>
            </div>
          </form>

          <div className="mt-12 border-t border-gray-100 pt-8 text-center dark:border-slate-800">
            <div className="flex items-center justify-center gap-4 text-xs font-medium text-gray-400 dark:text-gray-500">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">lock</span>
                Secure Connection
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">encrypted</span>
                End-to-end Encrypted
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-6 text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-600">
        © 2024 GAMEMARKET Indonesia
      </footer>
      </div>
    </>
  );
};

export default OtpVerificationPage;
