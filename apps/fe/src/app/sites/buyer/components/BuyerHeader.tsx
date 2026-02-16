"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/apiClient";
import { clearAuthSession, getStoredAuth } from "@/lib/auth-session";
import ThemeToggleButton from "./ThemeToggleButton";

type BuyerHeaderProps = {
  isLoggedIn?: boolean;
  searchPlaceholder?: string;
};

export default function BuyerHeader({
  isLoggedIn,
  searchPlaceholder = "Cari game, item, atau akun...",
}: BuyerHeaderProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [storedAuthEmail, setStoredAuthEmail] = useState<string | null>(null);

  useEffect(() => {
    const syncAuthState = () => {
      const stored = getStoredAuth();
      setStoredAuthEmail(stored?.user?.email ?? null);
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    return () => {
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  const effectiveIsLoggedIn = isLoggedIn ?? Boolean(storedAuthEmail);
  const displayName = useMemo(() => {
    if (!storedAuthEmail) return "Buyer";
    return storedAuthEmail.split("@")[0] || "Buyer";
  }, [storedAuthEmail]);
  const displayInitials = useMemo(() => {
    const parts = displayName
      .split(/[.\s_-]+/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (parts.length === 0) return "BY";
    const first = parts[0]?.[0] ?? "";
    const second = parts[1]?.[0] ?? "";
    return `${first}${second || (parts[0]?.[1] ?? "")}`.toUpperCase() || "BY";
  }, [displayName]);

  const onLogout = async () => {
    try {
      await apiFetch("/api/v1/auth/logout", { method: "POST" });
    } catch {
      // Continue local cleanup even if server logout fails.
    } finally {
      clearAuthSession();
      setProfileMenuOpen(false);
      setStoredAuthEmail(null);
      router.push("/login");
    }
  };

  return (
    <>
      {profileMenuOpen ? (
        <button
          aria-label="Close profile menu overlay"
          className="fixed inset-0 z-55 bg-slate-900/40 backdrop-blur-[2px]"
          onClick={() => setProfileMenuOpen(false)}
          type="button"
        />
      ) : null}

      <header className="sticky top-0 z-60 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20 md:px-6">
          {!effectiveIsLoggedIn ? (
            <button
              className="-ml-2 cursor-pointer p-2 text-slate-600 dark:text-slate-400 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              type="button"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          ) : null}

          <div className="flex items-center gap-6 md:gap-8">
            <Link className="flex items-center gap-2" href="/">
              <div className="rounded-lg bg-primary p-1.5 md:p-2">
                <span className="material-symbols-outlined text-xl text-white md:text-2xl">videogame_asset</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-primary uppercase dark:text-white md:text-xl">
                GameMarket
              </span>
            </Link>

            {!effectiveIsLoggedIn ? (
              <nav className="hidden items-center gap-6 md:flex">
                <Link className="text-sm font-semibold text-primary dark:text-white" href="/">
                  Home
                </Link>
                <Link
                  className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-white"
                  href="/browse"
                >
                  Games
                </Link>
              </nav>
            ) : null}
          </div>

          <div className="mx-4 hidden max-w-2xl flex-1 md:block lg:mx-8">
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-xl text-slate-400">search</span>
              <input
                className="w-full rounded-full border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                placeholder={searchPlaceholder}
                type="text"
              />
            </div>
          </div>

          <div className="relative flex items-center gap-2 md:gap-4">
            <ThemeToggleButton className="text-slate-500 dark:text-slate-400" />

            {!effectiveIsLoggedIn ? (
              <>
                <div className="hidden items-center gap-4 md:flex">
                  <Link className="text-sm font-semibold text-slate-600 dark:text-slate-400" href="/login">
                    Login
                  </Link>
                  <Link
                    className="rounded-xl bg-secondary px-6 py-2.5 font-bold text-white transition-colors hover:bg-orange-600"
                    href="/register"
                  >
                    Register
                  </Link>
                  <div className="mx-2 h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                  <button
                    className="hidden items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-bold text-white transition-opacity hover:opacity-90 lg:flex"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">storefront</span>
                    <span className="text-sm">Sell Account</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mx-2 hidden h-8 w-px bg-slate-200 md:block dark:bg-slate-700"></div>
                <button
                  className="group flex items-center gap-3"
                  onClick={() => setProfileMenuOpen((prev) => !prev)}
                  type="button"
                >
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-transparent transition-all group-hover:border-primary">
                    <Image
                      alt="User Avatar"
                      className="h-full w-full object-cover"
                      height={40}
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                      width={40}
                    />
                  </div>
                  <div className="hidden text-left lg:block">
                    <p className="mb-1 text-sm leading-none font-bold capitalize">{displayName}</p>
                    <div className="flex items-center gap-1">
                      <p className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">Buyer Premium</p>
                      <span className="material-symbols-outlined text-[14px] text-slate-400 transition-colors group-hover:text-primary">
                        expand_more
                      </span>
                    </div>
                  </div>
                </button>

                {profileMenuOpen ? (
                  <div className="absolute top-14 right-0 z-70 w-72 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-800 md:top-16">
                    <div className="border-b border-slate-50 p-5 dark:border-slate-700">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">{displayInitials}</div>
                        <div>
                          <h4 className="font-bold text-slate-900 capitalize dark:text-white">{displayName}</h4>
                          <p className="max-w-40 truncate text-xs text-slate-500">{storedAuthEmail ?? "-"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        href="#"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">person</span>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Profil Saya</span>
                      </Link>
                      <Link
                        className="group flex items-center justify-between rounded-xl px-4 py-3 transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        href="/transactions"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">receipt_long</span>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Riwayat Transaksi</span>
                        </div>
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-white">3</span>
                      </Link>
                      <Link
                        className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        href="#"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">settings</span>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Pengaturan Akun</span>
                      </Link>
                    </div>
                    <div className="border-t border-slate-50 p-2 dark:border-slate-700">
                      <button
                        className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-red-50 dark:hover:bg-red-900/10"
                        onClick={onLogout}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-red-500">logout</span>
                        <span className="text-sm font-semibold text-red-500">Keluar</span>
                      </button>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </header>

      {!effectiveIsLoggedIn && mobileMenuOpen ? (
        <button
          aria-label="Close menu overlay"
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          type="button"
        />
      ) : null}

      {!effectiveIsLoggedIn ? (
        <div
          className={`fixed top-0 left-0 bottom-0 z-60 w-70 overflow-y-auto bg-white shadow-2xl transition-transform duration-300 dark:bg-background-dark md:hidden ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary p-2">
                  <span className="material-symbols-outlined text-white">videogame_asset</span>
                </div>
                <span className="text-lg font-extrabold tracking-tight text-primary uppercase dark:text-white">GameMarket</span>
              </div>
              <button className="p-2 text-slate-500" onClick={() => setMobileMenuOpen(false)} type="button">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="mb-8">
              <div className="relative">
                <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-xl text-slate-400">search</span>
                <input
                  className="w-full rounded-xl border-none bg-slate-100 py-3 pr-4 pl-10 text-sm focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  placeholder="Cari akun game..."
                  type="text"
                />
              </div>
            </div>
            <nav className="mb-8 flex flex-col gap-4">
              <Link className="flex items-center gap-3 text-base font-bold text-primary dark:text-white" href="/">
                <span className="material-symbols-outlined text-xl">home</span> Home
              </Link>
              <Link
                className="flex items-center gap-3 text-base font-semibold text-slate-600 hover:text-primary dark:text-slate-400"
                href="/browse"
              >
                <span className="material-symbols-outlined text-xl">sports_esports</span> Games
              </Link>
              <Link
                className="flex items-center gap-3 text-base font-semibold text-slate-600 hover:text-primary dark:text-slate-400"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">local_offer</span> Promo
              </Link>
            </nav>
            <div className="flex flex-col gap-4 border-t border-slate-100 pt-8 dark:border-slate-800">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white" type="button">
                <span className="material-symbols-outlined text-lg">storefront</span>
                <span>Sell Account</span>
              </button>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  className="flex items-center justify-center rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 dark:border-slate-800 dark:text-slate-400"
                  href="/login"
                >
                  Login
                </Link>
                <Link className="flex items-center justify-center rounded-xl bg-secondary py-3 text-sm font-bold text-white" href="/register">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
