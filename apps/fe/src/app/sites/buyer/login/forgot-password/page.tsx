"use client";

import { Inter, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordResetOtpRequestResponseSchema } from "@acme/shared";
import ResultModal from "@/components/common/ResultModal";
import { apiFetch, ApiClientError } from "@/lib/apiClient";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import { setPasswordResetContext, type PasswordResetMethod } from "../password-reset-context";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function BuyerForgotPasswordPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [method, setMethod] = useState<PasswordResetMethod>("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const result = await apiFetch(
        "/api/v1/auth/password/otp/request",
        {
          method: "POST",
          body: JSON.stringify({
            identifier: identifier.trim(),
            method,
          }),
        },
        PasswordResetOtpRequestResponseSchema,
      );

      setPasswordResetContext({
        identifier: identifier.trim(),
        method: result.method,
        debugOtp: result.debugOtp,
        resendCooldownSec: result.resendCooldownSec,
      });

      router.push("/login/otp");
    } catch (error) {
      const message =
        error instanceof ApiClientError ? error.message : "Gagal mengirim OTP. Silakan coba lagi.";
      setErrorMessage(message);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <ResultModal
        isOpen={showErrorModal}
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
        onPrimaryAction={() => setShowErrorModal(false)}
        primaryActionLabel="Coba Lagi"
        title="Gagal Mengirim OTP"
        variant="error"
      />

      <div
        className={`${inter.className} bg-background-light flex min-h-screen items-center justify-center p-4 transition-colors duration-300 dark:bg-background-dark`}
      >
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggleButton className="bg-white p-3 text-gray-600 shadow-lg transition-all hover:scale-110 dark:bg-slate-800 dark:text-gray-300" />
      </div>

      <main className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(37, 65, 148, 0.05) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 p-8 lg:p-12">
          <div className="mb-10 flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-4xl text-primary dark:text-secondary">
              account_balance_wallet
            </span>
            <span className={`${poppins.className} text-2xl font-bold tracking-tight text-gray-900 uppercase dark:text-white`}>
              GameMarket
            </span>
          </div>

          <div className="mb-8 text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-primary/10">
              <span className="material-symbols-outlined text-3xl text-primary dark:text-blue-400">lock_reset</span>
            </div>
            <h1 className={`${poppins.className} mb-3 text-2xl font-bold text-gray-900 dark:text-white`}>Lupa Kata Sandi?</h1>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Masukkan Email atau Nomor WhatsApp yang terdaftar untuk menerima kode verifikasi OTP.
            </p>
          </div>

          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Identifikasi Akun</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">
                  contact_mail
                </span>
                <input
                  className="w-full rounded-xl border-none bg-gray-50 py-4 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white"
                  disabled={isSubmitting}
                  placeholder="Email atau No. WhatsApp"
                  required
                  type="text"
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kirim OTP ke</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                    method === "email"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                  }`}
                  disabled={isSubmitting}
                  onClick={() => setMethod("email")}
                  type="button"
                >
                  Email
                </button>
                <button
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                    method === "whatsapp"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                  }`}
                  disabled={isSubmitting}
                  onClick={() => setMethod("whatsapp")}
                  type="button"
                >
                  WhatsApp
                </button>
              </div>
            </div>

            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-80"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Memproses..." : "Kirim Kode OTP"}
              <span className="material-symbols-outlined text-xl">{isSubmitting ? "progress_activity" : "send"}</span>
            </button>

            <div className="pt-4 text-center">
              <a
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-blue-400"
                href="/login"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Kembali ke Login
              </a>
            </div>
          </form>
        </div>

        <div className="h-2 w-full bg-gradient-to-r from-primary via-blue-500 to-secondary opacity-80"></div>
      </main>

      <div className="fixed bottom-8 text-xs font-medium text-gray-400">© 2024 GAMEMARKET Indonesia. All rights reserved.</div>
      </div>
    </>
  );
}
