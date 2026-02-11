"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthPageShell from "../components/AuthPageShell";
import {
  clearRegisterFieldError,
  shouldProceedToOtp,
  validateRegisterForm,
  type RegisterFormErrors,
} from "./handler";
import { buyerRegisterTermsDocs } from "./terms";

const registerFeatures = [
  {
    icon: "verified_user",
    title: "Keamanan Terjamin",
    description: "Verifikasi OTP untuk setiap akses akun.",
  },
  {
    icon: "payments",
    title: "Transaksi Instan",
    description: "Proses serah terima akun otomatis & cepat.",
  },
] as const;

export default function BuyerRegisterPage() {
  const router = useRouter();
  const [otpMethod, setOtpMethod] = useState<"whatsapp" | "email">("whatsapp");
  const [showTncModal, setShowTncModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRegisterForm({ email, whatsApp, password });
    setErrors(nextErrors);
    if (!shouldProceedToOtp(nextErrors)) {
      return;
    }

    router.push("/register/otp");
  }

  return (
    <>
      {showTncModal ? (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <button
            aria-label="Tutup modal syarat dan ketentuan"
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowTncModal(false)}
            type="button"
          />
          <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-slate-800">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
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

            <div className="space-y-8 overflow-y-auto p-6 lg:p-8">
              {buyerRegisterTermsDocs.map((document) => (
                <section className="space-y-6" key={document.id}>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{document.title}</h3>
                    {document.subtitle ? (
                      <p className="mt-1 text-sm font-semibold text-gray-600 dark:text-gray-300">{document.subtitle}</p>
                    ) : null}
                    <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Tanggal Efektif: {document.effectiveDate}
                    </p>
                  </div>

                  <div className="space-y-5">
                    {document.sections.map((section) => (
                      <div key={section.title}>
                        <h4 className="mb-2 text-sm font-bold text-gray-900 dark:text-white">{section.title}</h4>
                        {section.paragraphs?.map((paragraph) => (
                          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400" key={paragraph}>
                            {paragraph}
                          </p>
                        ))}
                        {section.bullets?.length ? (
                          <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {section.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
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

      <AuthPageShell
        activeTab="register"
        leftDescription="Satu akun untuk semua kebutuhan marketplace game Anda. Aman, terpercaya, dan instan."
        leftFeatures={registerFeatures}
        leftTitle="Mulai Petualangan Gaming Anda"
      >
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
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrors((prev) => clearRegisterFieldError(prev, "email"));
                }}
              />
            </div>
            {errors.email ? <p className="text-xs font-medium text-red-500">{errors.email}</p> : null}
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
                value={whatsApp}
                onChange={(event) => {
                  setWhatsApp(event.target.value);
                  setErrors((prev) => clearRegisterFieldError(prev, "whatsapp"));
                }}
              />
            </div>
            {errors.whatsapp ? <p className="text-xs font-medium text-red-500">{errors.whatsapp}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kata Sandi</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">
                lock
              </span>
              <input
                className="w-full rounded-xl border-none bg-gray-50 py-3 pr-12 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white dark:focus:ring-secondary"
                placeholder="Minimal 8 karakter"
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrors((prev) => clearRegisterFieldError(prev, "password"));
                }}
              />
              <button
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
              >
                <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
            {errors.password ? <p className="text-xs font-medium text-red-500">{errors.password}</p> : null}
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
              <a className="font-bold text-primary hover:underline dark:text-secondary" href="/login">
                Masuk di sini
              </a>
            </p>
          </div>
        </form>
      </AuthPageShell>

    </>
  );
}
