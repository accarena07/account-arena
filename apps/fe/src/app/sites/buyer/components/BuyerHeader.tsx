"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { applyInitialTheme, toggleDarkMode } from "./theme";

type BuyerHeaderProps = {
  isLoggedIn?: boolean;
  searchPlaceholder?: string;
};

export default function BuyerHeader({
  isLoggedIn = false,
  searchPlaceholder = "Cari game, item, atau akun...",
}: BuyerHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    applyInitialTheme();
  }, []);

  return (
    <>
      {profileMenuOpen ? (
        <button
          aria-label="Close profile menu overlay"
          className="fixed inset-0 z-[55] bg-slate-900/40 backdrop-blur-[2px]"
          onClick={() => setProfileMenuOpen(false)}
          type="button"
        />
      ) : null}

      <header className="sticky top-0 z-[60] border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20 md:px-6">
          {!isLoggedIn ? (
            <button
              className="-ml-2 cursor-pointer p-2 text-slate-600 dark:text-slate-400 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              type="button"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          ) : null}

          <div className="flex items-center gap-6 md:gap-8">
            <Link className="flex items-center gap-2" href="/sites/buyer">
              <div className="rounded-lg bg-primary p-1.5 md:p-2">
                <span className="material-symbols-outlined text-xl text-white md:text-2xl">videogame_asset</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-primary uppercase dark:text-white md:text-xl">
                GameMarket
              </span>
            </Link>

            {!isLoggedIn ? (
              <nav className="hidden items-center gap-6 md:flex">
                <Link className="text-sm font-semibold text-primary dark:text-white" href="/sites/buyer">
                  Home
                </Link>
                <Link
                  className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-white"
                  href="/sites/buyer/browse"
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
            <button
              className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              onClick={toggleDarkMode}
              type="button"
            >
              <span className="material-symbols-outlined dark:!hidden">dark_mode</span>
              <span className="material-symbols-outlined !hidden dark:!inline-block">light_mode</span>
            </button>

            {!isLoggedIn ? (
              <>
                <span className="material-symbols-outlined text-slate-500 md:hidden">search</span>
                <div className="hidden items-center gap-4 md:flex">
                  <Link className="text-sm font-semibold text-slate-600 dark:text-slate-400" href="/sites/buyer/login">
                    Login
                  </Link>
                  <Link
                    className="rounded-xl bg-secondary px-6 py-2.5 font-bold text-white transition-colors hover:bg-orange-600"
                    href="/sites/buyer/register"
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
                    <p className="mb-1 text-sm leading-none font-bold">Felix Wijaya</p>
                    <div className="flex items-center gap-1">
                      <p className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">Buyer Premium</p>
                      <span className="material-symbols-outlined text-[14px] text-slate-400 transition-colors group-hover:text-primary">
                        expand_more
                      </span>
                    </div>
                  </div>
                </button>

                {profileMenuOpen ? (
                  <div className="absolute top-14 right-0 z-[70] w-72 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-800 md:top-16">
                    <div className="border-b border-slate-50 p-5 dark:border-slate-700">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">FW</div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">Felix Wijaya</h4>
                          <p className="max-w-[160px] truncate text-xs text-slate-500">felix.wijaya@example.com</p>
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
                        href="/sites/buyer/transactions"
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
                      <Link
                        className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-red-50 dark:hover:bg-red-900/10"
                        href="/sites/buyer"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-red-500">logout</span>
                        <span className="text-sm font-semibold text-red-500">Keluar</span>
                      </Link>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </header>

      {!isLoggedIn && mobileMenuOpen ? (
        <button
          aria-label="Close menu overlay"
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          type="button"
        />
      ) : null}

      {!isLoggedIn ? (
        <div
          className={`fixed top-0 left-0 bottom-0 z-[60] w-[280px] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 dark:bg-background-dark md:hidden ${
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
              <Link className="flex items-center gap-3 text-base font-bold text-primary dark:text-white" href="/sites/buyer">
                <span className="material-symbols-outlined text-xl">home</span> Home
              </Link>
              <Link
                className="flex items-center gap-3 text-base font-semibold text-slate-600 hover:text-primary dark:text-slate-400"
                href="/sites/buyer/browse"
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
                  href="/sites/buyer/login"
                >
                  Login
                </Link>
                <Link className="flex items-center justify-center rounded-xl bg-secondary py-3 text-sm font-bold text-white" href="/sites/buyer/register">
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
