import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import { type ReactNode } from "react";
import ThemeToggleButton from "./ThemeToggleButton";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

type FeatureItem = {
  icon: string;
  title: string;
  description?: string;
};

type AuthPageShellProps = {
  activeTab: "login" | "register";
  leftTitle: string;
  leftDescription: string;
  leftFeatures: readonly FeatureItem[];
  children: ReactNode;
};

export default function AuthPageShell({
  activeTab,
  leftTitle,
  leftDescription,
  leftFeatures,
  children,
}: AuthPageShellProps) {
  return (
    <div
      className={`${inter.className} bg-background-light flex min-h-screen items-center justify-center p-4 transition-colors duration-300 dark:bg-background-dark`}
    >
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggleButton className="bg-white p-3 text-gray-600 shadow-lg transition-all hover:scale-110 dark:bg-slate-800 dark:text-gray-300" />
      </div>

      <main className="mx-auto flex min-h-175 w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 lg:flex-row">
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-primary p-12 text-white lg:w-5/12">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-secondary opacity-20 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-blue-400 opacity-20 blur-3xl" />

          <div className="relative z-10 max-w-md text-center">
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
              <span className="material-symbols-outlined text-4xl">sports_esports</span>
            </div>
            <h1 className={`${poppins.className} mb-6 text-4xl font-bold`}>{leftTitle}</h1>
            <p className="mb-8 text-lg leading-relaxed text-blue-100">{leftDescription}</p>
            <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2 lg:grid-cols-1">
              {leftFeatures.map((feature) => (
                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4" key={feature.title}>
                  <span className="material-symbols-outlined text-secondary">{feature.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{feature.title}</p>
                    {feature.description ? <p className="text-xs text-blue-200">{feature.description}</p> : null}
                  </div>
                </div>
              ))}
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

          <div className="mx-auto w-full max-w-md animate-in fade-in duration-300">
            <div className="mb-8 flex border-b border-gray-100 dark:border-slate-800">
              <Link
                className={`flex-1 border-b-2 py-4 text-center font-semibold transition-all duration-200 ${
                  activeTab === "login"
                    ? "border-primary text-primary dark:border-white dark:text-white"
                    : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                }`}
                href="/login"
              >
                Masuk
              </Link>
              <Link
                className={`flex-1 border-b-2 py-4 text-center font-semibold transition-all duration-200 ${
                  activeTab === "register"
                    ? "border-primary text-primary dark:border-secondary dark:text-secondary"
                    : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                }`}
                href="/register"
              >
                Daftar
              </Link>
            </div>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
