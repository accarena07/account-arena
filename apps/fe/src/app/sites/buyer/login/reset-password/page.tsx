"use client";

import { useEffect, useState } from "react";
import { Inter, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import {
  PasswordResetErrorCode,
  PasswordResetSubmitResponseSchema,
  isPasswordResetSystemErrorCode,
} from "@acme/shared";
import ResultModal from "@/components/common/ResultModal";
import { apiFetch, ApiClientError } from "@/lib/apiClient";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import {
  clearPasswordResetContext,
  getPasswordResetContext,
} from "../password-reset-context";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });
const hasLowercaseRegex = /[a-z]/;
const hasUppercaseRegex = /[A-Z]/;
const hasNumberRegex = /\d/;
const hasSpecialCharRegex = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
const RESET_PASSWORD_SYSTEM_ERROR_MESSAGE = "Sistem sedang mengalami gangguan. Silakan coba beberapa saat lagi.";

const BuyerResetPasswordPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Gagal menyimpan kata sandi.");
  const [hasValidResetContext, setHasValidResetContext] = useState<boolean | null>(null);
  const meetsMinLength = password.length >= 8;
  const hasLowercase = hasLowercaseRegex.test(password);
  const hasUppercase = hasUppercaseRegex.test(password);
  const hasNumber = hasNumberRegex.test(password);
  const hasSpecialChar = hasSpecialCharRegex.test(password);

  useEffect(() => {
    const context = getPasswordResetContext();
    if (!context?.resetToken) {
      setHasValidResetContext(false);
      router.replace("/login/forgot-password");
      return;
    }
    setHasValidResetContext(true);
  }, [router]);

  if (hasValidResetContext !== true) {
    return null;
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const context = getPasswordResetContext();
    if (!context?.resetToken) {
      setErrorMessage("Sesi reset tidak ditemukan. Silakan ulangi dari lupa kata sandi.");
      setShowErrorModal(true);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Konfirmasi kata sandi tidak sama.");
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setPasswordError(
        "Kata sandi minimal 8 karakter dan wajib ada huruf besar, huruf kecil, angka, serta karakter spesial.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setPasswordError("");
      await apiFetch(
        "/api/v1/auth/password/reset",
        {
          method: "POST",
          body: JSON.stringify({
            identifier: context.identifier,
            resetToken: context.resetToken,
            newPassword: password,
          }),
        },
        PasswordResetSubmitResponseSchema,
      );

      clearPasswordResetContext();
      setShowSuccessModal(true);
    } catch (error) {
      let message = "Gagal menyimpan kata sandi.";
      if (error instanceof ApiClientError) {
        const errorCode = (error.details as { code?: string } | undefined)?.code;
        if (
          (typeof error.status === "number" && error.status >= 500) ||
          isPasswordResetSystemErrorCode(errorCode)
        ) {
          message = RESET_PASSWORD_SYSTEM_ERROR_MESSAGE;
        } else if (errorCode === PasswordResetErrorCode.INVALID_RESET_TOKEN) {
          message = "Sesi reset tidak valid atau sudah kedaluwarsa. Silakan ulangi dari lupa kata sandi.";
        } else {
          message = error.message || "Gagal menyimpan kata sandi.";
        }
      }
      setErrorMessage(message);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ResultModal
        isOpen={showSuccessModal}
        variant="success"
        title="Kata Sandi Berhasil Diubah"
        message="Silakan login menggunakan kata sandi baru Anda."
        primaryActionLabel="Ke Halaman Login"
        onPrimaryAction={() => router.push("/login")}
        onClose={() => setShowSuccessModal(false)}
      />

      <ResultModal
        isOpen={showErrorModal}
        variant="error"
        title="Gagal Reset Kata Sandi"
        message={errorMessage}
        primaryActionLabel="Coba Lagi"
        onPrimaryAction={() => setShowErrorModal(false)}
        onClose={() => setShowErrorModal(false)}
      />

      <div
        className={`${inter.className} bg-background-light relative flex min-h-screen items-center justify-center p-4 transition-colors duration-300 dark:bg-background-dark`}
      >
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggleButton className="border border-gray-100 bg-white p-3 text-gray-600 shadow-lg transition-all hover:scale-110 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300" />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(37, 65, 148, 0.05) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      <main className="relative z-10 w-full max-w-125">
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div className="p-8 lg:p-12">
            <div className="mb-10 text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20">
                <span className="material-symbols-outlined text-4xl text-primary">lock_reset</span>
              </div>
              <h1 className={`${poppins.className} mb-2 text-2xl font-bold text-gray-900 dark:text-white`}>
                Buat Kata Sandi Baru
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Silakan masukkan kata sandi baru yang kuat untuk melindungi akun Anda.
              </p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="password">
                  Kata Sandi Baru
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">lock</span>
                  <input
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-12 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    id="password"
                    placeholder="Masukkan kata sandi baru"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    disabled={isSubmitting}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none dark:hover:text-gray-200"
                    onClick={() => setShowPassword((prev) => !prev)}
                    type="button"
                  >
                    <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="confirm-password">
                  Konfirmasi Kata Sandi Baru
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
                    check_circle
                  </span>
                  <input
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-12 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    id="confirm-password"
                    placeholder="Ulangi kata sandi baru"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    disabled={isSubmitting}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                  <button
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none dark:hover:text-gray-200"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      {showConfirmPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
                <h3 className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Syarat Kata Sandi:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span
                      className={`material-symbols-outlined text-lg ${
                        meetsMinLength ? "text-green-500" : "text-gray-300 dark:text-gray-600"
                      }`}
                    >
                      {meetsMinLength ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    Minimal 8 karakter
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span
                      className={`material-symbols-outlined text-lg ${
                        hasLowercase ? "text-green-500" : "text-gray-300 dark:text-gray-600"
                      }`}
                    >
                      {hasLowercase ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    Mengandung huruf kecil
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span
                      className={`material-symbols-outlined text-lg ${
                        hasUppercase ? "text-green-500" : "text-gray-300 dark:text-gray-600"
                      }`}
                    >
                      {hasUppercase ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    Mengandung huruf besar
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span
                      className={`material-symbols-outlined text-lg ${
                        hasNumber ? "text-green-500" : "text-gray-300 dark:text-gray-600"
                      }`}
                    >
                      {hasNumber ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    Mengandung setidaknya satu angka
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span
                      className={`material-symbols-outlined text-lg ${
                        hasSpecialChar ? "text-green-500" : "text-gray-300 dark:text-gray-600"
                      }`}
                    >
                      {hasSpecialChar ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    Mengandung karakter spesial (!@#$%^&*)
                  </li>
                </ul>
              </div>
              {passwordError ? <p className="text-xs font-medium text-red-500">{passwordError}</p> : null}

              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/25 transition-all active:scale-[0.98] hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-80"
                disabled={isSubmitting}
                type="submit"
              >
                <span className="material-symbols-outlined">save</span>
                {isSubmitting ? "Menyimpan..." : "Simpan Kata Sandi"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <a
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-white"
                href="/login"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Kembali ke Halaman Login
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 border-t border-gray-100 bg-gray-50 px-8 py-4 dark:border-slate-800 dark:bg-slate-800/30">
            <span className="material-symbols-outlined text-secondary">verified_user</span>
            <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
              Aman & Terenkripsi
            </span>
          </div>
        </div>

        <div className="mt-8 text-center text-xs font-medium text-gray-400 dark:text-gray-600">
          © 2024 GAMEMARKET Indonesia. Keamanan Anda prioritas kami.
        </div>
      </main>
      </div>
    </>
  );
};

export default BuyerResetPasswordPage;
