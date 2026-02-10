"use client";

import React from "react";
import Image from "next/image";
import SellerGlobalFooter from "../components/SellerGlobalFooter";
import SellerPageHeader from "../components/SellerPageHeader";
import SellerProfileInfo from "../components/SellerProfileInfo";
import SellerUtilityButtons from "../components/SellerUtilityButtons";

export default function StoreSettingsPage() {
  return (
    <div className="flex-1 max-w-6xl mx-auto w-full">
      <SellerPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Store Settings" },
        ]}
        title="Store Settings"
        subtitle={
          <>
            Manage your{" "}
            <span className="text-[#254294] dark:text-blue-400">
              brand identity
            </span>{" "}
            & payout accounts
          </>
        }
        rightContent={
          <div className="flex w-full items-center justify-between gap-6 border-t border-slate-100 pt-6 md:w-auto md:justify-end md:border-t-0 md:pt-0 dark:border-slate-800">
          <SellerUtilityButtons />
          <div className="hidden sm:flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-800">
            <SellerProfileInfo />
          </div>
        </div>
        }
      />

      <div className="space-y-8 pb-32">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-[#254294]/5 transition-colors duration-700"></div>

          <div className="flex items-center gap-5 mb-12 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-50/50 dark:bg-blue-900/20 flex items-center justify-center text-[#254294] dark:text-blue-400 border border-blue-100 dark:border-blue-900/10">
              <span className="material-symbols-outlined text-2xl font-black italic">
                storefront
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
              Visual Identity
            </h3>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 relative z-10">
            <div className="flex flex-col items-center lg:items-start space-y-6">
              <div className="relative group/avatar">
                <div className="w-32 h-32 md:w-44 md:h-44 bg-slate-50 dark:bg-slate-800 rounded-3xl md:rounded-4xl flex items-center justify-center border-4 border-dashed border-slate-200 dark:border-slate-700 transition-all hover:border-[#254294] shadow-inner overflow-hidden cursor-pointer">
                  <Image
                    alt="placeholder"
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    className="w-20 md:w-24 opacity-10 grayscale group-hover/avatar:scale-110 transition-transform"
                    height={96}
                    width={96}
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center backdrop-blur-sm transition-all">
                    <span className="material-symbols-outlined text-white text-3xl font-black italic">
                      photo_camera
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-left space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  Recommended size
                </p>
                <p className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest italic">
                  512x512 PNG/JPG
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-10">
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
                  Store Display Name
                </label>
                <input
                  type="text"
                  defaultValue="Admin Store"
                  className="w-full px-6 py-4.5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white text-sm font-black italic transition-all shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
                  Store Biography
                </label>
                <textarea
                  rows={4}
                  defaultValue="Trusted seller akun game terpercaya sejak 2020. Transaksi cepat, aman, dan bergaransi."
                  className="w-full px-6 py-4.5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white text-sm font-black italic resize-none transition-all shadow-sm leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Banking Info */}
        <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm relative group overflow-hidden">
          <div className="flex items-center gap-5 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-orange-50/50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 border border-orange-100 dark:border-orange-900/10">
              <span className="material-symbols-outlined text-2xl font-black italic">
                account_balance
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
              Payout Channels
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
                Primary Bank
              </label>
              <div className="relative group/select">
                <select className="appearance-none w-full px-6 py-4.5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-orange-500/5 focus:border-[#FF7D1F] outline-none dark:text-white text-sm font-black italic cursor-pointer transition-all shadow-sm uppercase">
                  <option>Bank Central Asia (BCA)</option>
                  <option>Bank Mandiri</option>
                  <option>E-Wallet (OVO/DANA)</option>
                </select>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover/select:text-[#FF7D1F] pointer-events-none transition-colors">
                  unfold_more
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
                Account Number
              </label>
              <input
                type="text"
                defaultValue="8421092837"
                className="w-full px-6 py-4.5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-orange-500/5 focus:border-[#FF7D1F] outline-none dark:text-white text-sm font-black italic transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-3 mb-10">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
              Legal Beneficiary Name
            </label>
            <input
              type="text"
              defaultValue="ADMIN STORE OFFICIAL"
              className="w-full px-6 py-4.5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-orange-500/5 focus:border-[#FF7D1F] outline-none dark:text-white text-sm font-black italic transition-all shadow-sm uppercase tracking-tight"
            />
          </div>

          <div className="bg-blue-500/5 dark:bg-blue-400/5 border border-blue-100 dark:border-blue-900/30 rounded-3xl p-6 flex items-start gap-5">
            <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 italic font-black text-2xl">
              security_update_good
            </span>
            <p className="text-[10px] font-black text-[#254294]/70 dark:text-blue-400/70 uppercase tracking-widest italic leading-relaxed">
              Verify your bank details twice. Incorrect information will lead to{" "}
              <span className="text-white bg-[#254294] px-1 rounded">
                payout delays
              </span>{" "}
              and potential escrow helds.
            </p>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm relative group overflow-hidden">
          <div className="flex items-center gap-5 mb-10 text-slate-400">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-100 dark:border-slate-800">
              <span className="material-symbols-outlined text-2xl font-black italic">
                lock_person
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
              Emergency Contact
            </h3>
          </div>

          <div className="max-w-2xl space-y-4">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
              Registered WhatsApp Number
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black italic">
                +62
              </span>
              <input
                type="text"
                defaultValue="81234567890"
                className="w-full pl-16 pr-6 py-4.5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white text-sm font-black italic transition-all shadow-sm"
              />
            </div>
            <p className="px-2 text-[10px] text-slate-400 font-bold uppercase italic tracking-widest">
              Critical for dispute resolution &{" "}
              <span className="text-[#254294] dark:text-blue-400">
                order verification
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Save Actions */}
      <div className="fixed bottom-10 inset-x-0 flex justify-center z-50 px-6">
        <div className="max-w-6xl w-full flex justify-end">
          <div className="flex flex-col items-end gap-4">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-6 duration-700">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest italic text-slate-500">
                  Unsaved configuration
                </span>
              </div>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
              <button className="bg-[#254294] hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest italic text-[10px] shadow-xl shadow-blue-900/10 transition-all hover:scale-105 active:scale-95">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <SellerGlobalFooter
        className="mb-32"
        copyright="© 2024 AccountArena • Trust Infrasctructure • All Rights Reserved"
        links={[
          { label: "Privacy Module" },
          { label: "Encryption standards" },
          { label: "GDPR Compliance" },
        ]}
        statusText="End-to-end encrypted"
      />
    </div>
  );
}
