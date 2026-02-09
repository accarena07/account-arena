"use client";

import { toggleDarkMode } from "./theme";

export default function BuyerFooter() {
  return (
    <footer className="bg-slate-900 pt-12 pb-10 text-white dark:bg-black md:pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
          <div className="col-span-1">
            <div className="mb-6 flex items-center gap-2">
              <div className="rounded-lg bg-white p-2">
                <span className="material-symbols-outlined text-primary">videogame_asset</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white uppercase">GameMarket</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Marketplace terpercaya untuk jual beli item dan akun game. Keamanan transaksi adalah prioritas utama
              kami.
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-extrabold tracking-widest text-slate-500 uppercase">Marketplace</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-300">
              <li>
                <a className="transition-colors hover:text-secondary" href="#">
                  Akun Game
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-secondary" href="#">
                  Item & Skin
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-secondary" href="#">
                  Top Up Voucher
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-extrabold tracking-widest text-slate-500 uppercase">Bantuan</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-300">
              <li>
                <a className="transition-colors hover:text-secondary" href="#">
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-secondary" href="#">
                  Cara Berjualan
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-secondary" href="#">
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-extrabold tracking-widest text-slate-500 uppercase">Kontak</h4>
            <div className="flex gap-4">
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-secondary"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-secondary"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">alternate_email</span>
              </a>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-colors hover:bg-secondary"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">phone</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-center text-xs text-slate-500 md:text-left">© 2024 GAMEMARKET Indonesia. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-xs font-bold transition-colors hover:bg-slate-700"
              id="toggle-theme-footer"
              onClick={toggleDarkMode}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">brightness_4</span>
              Toggle Theme
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
