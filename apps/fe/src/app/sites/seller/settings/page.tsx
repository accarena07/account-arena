/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

export default function StoreSettingsPage() {
  return (
    <div className="flex-1 max-w-[1200px] mx-auto w-full py-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search settings..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#254294] transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
            <span className="material-symbols-outlined text-xl font-bold">
              notifications
            </span>
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">
                Admin Store
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Premium Seller
              </p>
            </div>
            <img
              alt="Profile"
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuALL4MNDR1C_NUyFVHybHloH6M8YfbkdIvKzI7T_k4HpLXMXCc8NM-4QBx0R3I9m_02Tz8RipzypJzBzPTLLZIDpfWIRqiFiekk4-Qrlim-jRmaF9YTlmkqDMvomJT6GyT0Pf3FpD50gUGghwfff6ZLVBR8ZEErIcD86V80P5vX_eFSepUp76QmZA7wy-aCof8wlJfY78J731Ztmd2SqzeCunW0UjITbg1LQPat79T21M94UJu5Pl98o01eoWNjUdNbUxKretMb-g"
            />
          </div>
        </div>
      </header>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Store Settings
        </h1>
        <p className="text-slate-500 text-sm">
          Manage your shop profile, payment information, and security settings.
        </p>
      </div>

      <div className="space-y-6 pb-24">
        {/* Section 1: Profil Toko */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-[#254294] dark:text-blue-400">
              storefront
            </span>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Profil Toko
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Photo Upload */}
            <div className="w-full md:w-auto flex flex-col gap-3">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Foto Profil Toko
              </p>
              <div className="w-32 h-32 bg-[#FDEAD7] rounded-xl flex items-center justify-center border-2 border-dashed border-orange-200 cursor-pointer overflow-hidden relative group">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  className="w-16 h-16 opacity-50"
                  alt="placeholder"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white">
                    edit
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 max-w-[140px] leading-relaxed">
                Rekomendasi ukuran: 512x512px (PNG, JPG)
              </p>
            </div>

            {/* Right: Form */}
            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Nama Toko
                </label>
                <input
                  type="text"
                  defaultValue="Admin Store"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white text-sm placeholder:text-slate-400 font-medium transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Bio Toko
                </label>
                <textarea
                  rows={4}
                  defaultValue="Trusted seller akun game terpercaya sejak 2020. Transaksi cepat, aman, dan bergaransi."
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white text-sm placeholder:text-slate-400 font-medium resize-none transition-all"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Informasi Rekening */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-[#254294] dark:text-blue-400">
              account_balance
            </span>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Informasi Rekening
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Nama Bank
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white text-sm font-medium appearance-none transition-all">
                  <option>Bank Central Asia (BCA)</option>
                  <option>Bank Mandiri</option>
                  <option>Bank Negara Indonesia (BNI)</option>
                  <option>Bank Rakyat Indonesia (BRI)</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Nomor Rekening
              </label>
              <input
                type="text"
                defaultValue="8421092837"
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white text-sm placeholder:text-slate-400 font-medium transition-all"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Nama Pemilik Rekening
            </label>
            <input
              type="text"
              defaultValue="ADMIN STORE OFFICIAL"
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white text-sm placeholder:text-slate-400 font-medium transition-all"
            />
          </div>

          {/* Blue Info Alert */}
          <div className="bg-[#EFF6FF] dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 flex gap-3 items-center">
            <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 text-xl">
              info
            </span>
            <p className="text-[11px] font-bold text-[#254294] dark:text-blue-400">
              Pastikan informasi rekening benar untuk kelancaran proses
              penarikan saldo (payout).
            </p>
          </div>
        </div>

        {/* Section 3: Keamanan */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-[#254294] dark:text-blue-400">
              security
            </span>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Keamanan
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Nomor WhatsApp Admin
            </label>
            <input
              type="text"
              defaultValue="81234567890"
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white text-sm placeholder:text-slate-400 font-medium transition-all"
            />
            <p className="mt-2 text-[10px] text-slate-400 leading-relaxed max-w-lg">
              Nomor ini digunakan tim admin untuk menghubungi Anda jika terjadi
              masalah pada transaksi.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-6 right-6 md:right-12 z-10">
        <button className="bg-[#FF7D1F] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all">
          <span className="material-symbols-outlined">save</span>
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
