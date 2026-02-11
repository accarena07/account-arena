"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLoginResponseSchema } from "@acme/shared";
import ResultModal from "@/components/common/ResultModal";
import AuthPageShell from "../components/AuthPageShell";
import { apiFetch, ApiClientError } from "@/lib/apiClient";
import { setAuthSession } from "@/lib/auth-session";

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
  const router = useRouter();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Kata sandi yang Anda masukkan salah. Silakan coba lagi.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    if (!email.trim() || !password) {
      setErrorMessage("Email dan kata sandi wajib diisi.");
      setShowErrorModal(true);
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await apiFetch(
        "/api/v1/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        },
        AuthLoginResponseSchema,
      );

      setAuthSession(result.session, result.user, result.roles);
      router.push("/");
    } catch (error) {
      const message =
        error instanceof ApiClientError ? error.message : "Terjadi kendala saat login. Silakan coba lagi.";
      setErrorMessage(message);
      setIsSubmitting(false);
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
        <form aria-busy={isSubmitting} className="space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email atau Username</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">
              alternate_email
            </span>
            <input
              className="w-full rounded-xl border-none bg-gray-50 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white"
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
              disabled={isSubmitting}
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
            >
              <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
            </button>
          </div>
        </div>

        <button
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-80"
          disabled={isSubmitting}
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
}
