"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CreateListingPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="flex-1 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 italic">
        <span className="hover:text-slate-600 transition-colors cursor-pointer">
          Dashboard
        </span>
        <span className="material-symbols-outlined text-xs font-black">
          chevron_right
        </span>
        <span className="hover:text-slate-600 transition-colors cursor-pointer">
          My Listings
        </span>
        <span className="material-symbols-outlined text-xs font-black">
          chevron_right
        </span>
        <span className="text-[#254294] dark:text-blue-400">
          Create New Listing
        </span>
      </div>

      <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-5 w-full md:w-auto">
          <Link
            href="/listings"
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-[#254294] transition-all hover:scale-105 shadow-sm group"
          >
            <span className="material-symbols-outlined font-black group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
          </Link>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight uppercase italic tracking-tight">
              Create Listing
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-[11px] font-bold uppercase tracking-widest italic">
              Step {step} •{" "}
              <span className="text-[#254294] dark:text-blue-400">
                {step === 1
                  ? "Basic Info"
                  : step === 2
                    ? "Media"
                    : step === 3
                      ? "Pricing"
                      : "Review"}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="text-right">
            <p className="text-sm font-black text-slate-800 dark:text-white leading-none italic">
              Admin Store
            </p>
            <p className="text-[10px] text-slate-400 font-black uppercase italic mt-1.5 tracking-widest">
              Premium Seller
            </p>
          </div>
          <Image
            alt="Profile"
            className="w-11 h-11 rounded-full border-2 border-[#254294]/20 shadow-sm object-cover"
            height={44}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALL4MNDR1C_NUyFVHybHloH6M8YfbkdIvKzI7T_k4HpLXMXCc8NM-4QBx0R3I9m_02Tz8RipzypJzBzPTLLZIDpfWIRqiFiekk4-Qrlim-jRmaF9YTlmkqDMvomJT6GyT0Pf3FpD50gUGghwfff6ZLVBR8ZEErIcD86V80P5vX_eFSepUp76QmZA7wy-aCof8wlJfY78J731Ztmd2SqzeCunW0UjITbg1LQPat79T21M94UJu5Pl98o01eoWNjUdNbUxKretMb-g"
            width={44}
          />
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 mb-10">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide pb-0.5">
          {[
            { id: 1, label: "Account Info" },
            { id: 2, label: "Media & Media" },
            { id: 3, label: "Pricing & Delivery" },
            { id: 4, label: "Review & Publish" },
          ].map((s) => {
            const isCompleted = step > s.id;
            const isActive = step === s.id;

            return (
              <div
                key={s.id}
                className={`flex items-center gap-3 pb-4 border-b-2 transition-all whitespace-nowrap min-w-fit ${
                  isActive
                    ? "border-[#254294] text-[#254294] dark:border-blue-400 dark:text-blue-400"
                    : "border-transparent text-slate-400 dark:text-slate-500"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-[10px] transition-all ${
                    isCompleted
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                      : isActive
                        ? "bg-[#254294] text-white dark:bg-blue-600 shadow-lg shadow-blue-500/20"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-sm font-black">
                      check
                    </span>
                  ) : (
                    s.id
                  )}
                </div>
                <span
                  className={`font-black text-[11px] uppercase tracking-widest italic ${isCompleted ? "text-green-600 dark:text-green-400" : ""}`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Form Area */}
      {step === 3 ? (
        // Step 3 Specific Layout (Full Width Card containing 2 cols)
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left Column: Form */}
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
                  Selling Price (IDR)
                </label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400 group-focus-within:text-[#254294] transition-colors italic">
                    Rp
                  </span>
                  <input
                    className="w-full pl-16 pr-6 py-5 rounded-3xl bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-[#254294]/5 focus:border-[#254294] outline-none dark:text-white font-black text-2xl placeholder:text-slate-200 transition-all shadow-inner italic"
                    placeholder="0"
                    type="number"
                    defaultValue="1500000"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-orange-50/30 dark:bg-orange-900/10 rounded-3xl border border-dashed border-orange-200 dark:border-orange-900/30 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-orange-900/20 flex items-center justify-center text-orange-500 shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl font-black italic">
                      handshake
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm font-black text-slate-900 dark:text-white italic tracking-tight">
                      Price Negotiation
                    </span>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-tighter italic">
                      Allow buyers to offer
                    </span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-12 h-6.5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF7D1F]"></div>
                </label>
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
                  Delivery Method
                </label>
                <div className="relative group">
                  <select className="w-full px-6 py-5 rounded-3xl bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white font-black text-sm appearance-none cursor-pointer hover:border-[#254294] transition-all shadow-inner italic">
                    <option value="instant">
                      Instant Delivery (Automated)
                    </option>
                    <option value="manual">Manual Delivery (Chat-based)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#254294] pointer-events-none transition-colors">
                    expand_more
                  </span>
                </div>
                <div className="flex items-center gap-2 px-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                    Recommended: Instant increases sales by 40%
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Breakdown & Info */}
            <div className="space-y-8">
              <div className="bg-slate-50/50 dark:bg-black/20 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-inner relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8 italic flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-slate-200 dark:bg-slate-800"></span>
                  Earnings Breakdown
                </h3>
                <div className="space-y-5">
                  <div className="flex justify-between items-center group/item">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                      Price
                    </span>
                    <span className="text-base font-black text-slate-900 dark:text-white italic">
                      Rp 1.500.000
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-6 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                      Platform Fee (5%)
                    </span>
                    <span className="text-sm font-black text-red-500 italic">
                      - Rp 75.000
                    </span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">
                        You Receive
                      </span>
                      <span className="text-3xl font-black text-[#FF7D1F] italic tracking-tight">
                        Rp 1.425.000
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-[#FF7D1F]/10 rounded-2xl flex items-center justify-center text-[#FF7D1F]">
                      <span className="material-symbols-outlined text-2xl font-black italic">
                        payments
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-3xl p-6 flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20 border-2 border-blue-50">
                  <span className="material-symbols-outlined text-xl font-black italic">
                    verified_user
                  </span>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-blue-900 dark:text-blue-400 mb-1 uppercase tracking-widest italic">
                    Seller Protection
                  </h4>
                  <p className="text-[10px] text-blue-800/70 dark:text-blue-400/70 leading-relaxed font-bold italic tracking-tight">
                    Funds stay in escrow until delivery is confirmed. You are
                    protected against unauthorized chargebacks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* New Footer Navigation for Step 3 */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-50 dark:border-slate-800/50">
            <button
              onClick={prevStep}
              className="w-full sm:w-auto px-8 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white text-[10px] font-black uppercase tracking-widest italic transition-colors flex items-center justify-center gap-2 order-2 sm:order-1"
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
              Previous
            </button>
            <button
              onClick={nextStep}
              className="w-full sm:w-auto bg-[#254294] hover:bg-blue-900 text-white px-10 py-4 rounded-[1.25rem] font-black uppercase tracking-widest italic shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 transition-all order-1 sm:order-2"
            >
              Next Step
              <span className="material-symbols-outlined text-[20px] font-black">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      ) : step === 4 ? (
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Account Details Review */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group">
            <div className="px-8 md:px-12 py-8 md:py-10 border-b border-slate-100 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-[#254294] shadow-sm">
                  <span className="material-symbols-outlined text-xl font-black italic">
                    person
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                  Account Details
                </h3>
              </div>
              <button
                onClick={() => setStep(1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-[#254294] transition-all"
              >
                <span className="material-symbols-outlined text-lg font-black italic">
                  edit
                </span>
              </button>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-16">
                <div className="space-y-1.5">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic leading-none">
                    Game Category
                  </p>
                  <p className="font-black text-slate-900 dark:text-white text-lg italic tracking-tight">
                    Mobile Legends: Bang Bang
                  </p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic leading-none">
                    Rank / Progress
                  </p>
                  <p className="font-black text-slate-900 dark:text-white text-lg italic tracking-tight">
                    Mythic Glory (75 Stars)
                  </p>
                </div>
                <div className="md:col-span-2 space-y-1.5 pt-4 md:pt-0">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic leading-none">
                    Listing Headline
                  </p>
                  <p className="font-black text-slate-900 dark:text-white text-xl italic tracking-tight p-5 bg-slate-50/50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
                    Legend Skins Account | Full Emblem Max | Rare Limited Skins
                  </p>
                </div>
                <div className="md:col-span-2 space-y-3 pt-4 md:pt-0">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic leading-none">
                    Full Description
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed italic border-l-4 border-[#254294] pl-6 py-2">
                    Selling my main account since day 1. 250+ skins including
                    Legend Gusion, Collector Granger, and 12 KOF skins. All
                    emblems maxed. Winrate 68% classic/rank. 100% safe,
                    first-hand account.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Media Review */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group">
            <div className="px-8 md:px-12 py-8 md:py-10 border-b border-slate-100 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-[#254294] shadow-sm">
                  <span className="material-symbols-outlined text-xl font-black italic">
                    image
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                  Media Gallery
                </h3>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-[#254294] transition-all"
              >
                <span className="material-symbols-outlined text-lg font-black italic">
                  edit
                </span>
              </button>
            </div>
            <div className="p-8 md:p-12">
              <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-48 h-32 rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shrink-0 transform hover:scale-105 transition-transform cursor-pointer shadow-md"
                  >
                    <Image
                      alt={`Screenshot ${i}`}
                      className="object-cover"
                      fill
                      sizes="192px"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIBC51fxhgrgBkcfYA03Jp4q19UBjRHkniaexxKWE_Dv0ZUSWM8vSacnWMi_7fe22gKWNItAM7TqQ_HNNKXCmNgN9u4YHs883-IGCvxomuiCMYPEWKhRwVYkS2pKairrbxbIkKivGAvqOcz94f-RLdQPSCGxlAcBdzkfKHvH8CXJzUD8qD9WGM09oVrNkOEwXpRNAa3Bt1pt4PzJPsmd97pG0UqlK4RKGzTtLhtJHablzDILDfV4RZrr2CWTtJwXUuoOJp7XLhQg"
                    />
                  </div>
                ))}
                <div className="w-48 h-32 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 shrink-0 group/more cursor-pointer">
                  <span className="text-2xl font-black text-slate-300 group-hover/more:text-[#254294] transition-colors italic">
                    +2
                  </span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                    More Media
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Review */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group">
            <div className="px-8 md:px-12 py-8 md:py-10 border-b border-slate-100 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-[#254294] shadow-sm">
                  <span className="material-symbols-outlined text-xl font-black italic">
                    sell
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                  Pricing & Payout
                </h3>
              </div>
              <button
                onClick={() => setStep(3)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-[#254294] transition-all"
              >
                <span className="material-symbols-outlined text-lg font-black italic">
                  edit
                </span>
              </button>
            </div>
            <div className="p-8 md:p-12">
              <div className="w-full space-y-6">
                <div className="flex justify-between items-center group/p">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                    Listing Price
                  </span>
                  <span className="text-xl font-black text-slate-900 dark:text-white italic tracking-tight">
                    $450.00
                  </span>
                </div>
                <div className="flex justify-between items-center pb-8 border-b border-slate-100 dark:border-slate-800/50">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                    Platform Fee (5%)
                  </span>
                  <span className="text-sm font-bold text-red-500 italic">
                    -$22.50
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-2">
                      Total Net Payout
                    </span>
                    <span className="text-4xl font-black text-[#FF7D1F] italic tracking-tighter">
                      $427.50
                    </span>
                  </div>
                  <div className="w-16 h-16 bg-[#FF7D1F]/10 rounded-3xl flex items-center justify-center text-[#FF7D1F]">
                    <span className="material-symbols-outlined text-3xl font-black italic">
                      savings
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Action */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-xl shadow-blue-900/5">
            <div
              className="flex items-start gap-6 mb-10 group cursor-pointer"
              onClick={() => {
                const el = document.getElementById("terms") as HTMLInputElement;
                if (el) el.checked = !el.checked;
              }}
            >
              <div className="flex items-center h-6 mt-1">
                <input
                  className="w-6 h-6 rounded-lg border-slate-300 dark:border-slate-700 text-[#254294] focus:ring-[#254294] transition-all cursor-pointer"
                  id="terms"
                  type="checkbox"
                />
              </div>
              <div className="flex-1">
                <label
                  className="font-black text-slate-900 dark:text-white block mb-2 cursor-pointer text-base uppercase italic tracking-tight"
                  htmlFor="terms"
                >
                  Confirm Ownership
                </label>
                <p className="text-slate-400 font-bold text-xs leading-relaxed italic pr-4">
                  I confirm that I am the rightful owner of this account. I
                  understand that fraudulent listings will result in permanent
                  account suspension and legal action.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <button className="w-full md:w-3/4 bg-[#254294] hover:bg-blue-900 text-white py-5 rounded-3xl font-black uppercase tracking-widest italic shadow-2xl shadow-blue-900/30 flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 text-lg">
                <span className="material-symbols-outlined font-black text-2xl italic">
                  rocket_launch
                </span>
                Publish Listing
              </button>
              <button className="w-full md:w-1/4 py-5 text-slate-400 hover:text-slate-900 dark:hover:text-white font-black uppercase tracking-widest italic text-[11px] transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-xl">
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Wrapper for other steps to keep page structure consistent
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Main Form) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Account Info */}
            {step === 1 && (
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-10 transition-all hover:shadow-xl hover:shadow-blue-900/5 group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Left Column Fields */}
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
                        Game Category
                      </label>
                      <div className="relative group/sel">
                        <select className="w-full px-5 py-4 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-[1.25rem] focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white appearance-none cursor-pointer hover:border-[#254294] transition-all font-bold text-sm italic shadow-inner">
                          <option>Select a game</option>
                          <option>Mobile Legends: Bang Bang</option>
                          <option>Genshin Impact</option>
                          <option>VALORANT</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover/sel:text-[#254294] pointer-events-none transition-colors">
                          expand_more
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
                        Listing Headline
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mythic Glory | 200+ Skins | Full Emblem"
                        className="w-full px-5 py-4 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-[1.25rem] focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white placeholder:text-slate-300 font-bold text-sm transition-all shadow-inner italic"
                      />
                      <p className="px-1 text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">
                        * Use catchy words to attract buyers
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
                        Rank / Level / Progress
                      </label>
                      <div className="relative group/inp">
                        <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/inp:text-[#254294] transition-colors text-xl">
                          military_tech
                        </span>
                        <input
                          type="text"
                          placeholder="e.g. AR 60 / Immortal 3"
                          className="w-full pl-14 pr-5 py-4 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-[1.25rem] focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white placeholder:text-slate-300 font-bold text-sm transition-all shadow-inner italic"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column Fields */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
                      Detailed Description
                    </label>
                    <textarea
                      placeholder="Describe everything: inventory, rare skins, login method, winrate, etc..."
                      className="w-full h-full min-h-75 px-6 py-5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-4xl focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white placeholder:text-slate-300 font-bold text-sm resize-none transition-all shadow-inner italic leading-relaxed"
                    ></textarea>
                  </div>
                </div>

                {/* Info Box */}
                <div className="mt-12 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-[1.25rem] p-5 flex gap-5 items-center">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-blue-900/30 shadow-sm border border-blue-100 dark:border-blue-800 flex items-center justify-center text-[#254294]">
                    <span className="material-symbols-outlined text-lg font-black italic">
                      info
                    </span>
                  </div>
                  <p className="text-[10px] text-[#254294] dark:text-blue-400 font-bold uppercase tracking-widest italic leading-relaxed">
                    Account details must be accurate. False info leads to bans.
                  </p>
                </div>

                {/* Actions Step 1 */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-50 dark:border-slate-800/50">
                  <button className="w-full sm:w-auto px-8 py-3.5 text-slate-400 hover:text-slate-900 dark:hover:text-white text-[10px] font-black uppercase tracking-widest italic transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={nextStep}
                    className="w-full sm:w-auto bg-[#254294] hover:bg-blue-900 text-white px-10 py-4 rounded-[1.25rem] font-black uppercase tracking-widest italic shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 transition-all"
                  >
                    Next Step
                    <span className="material-symbols-outlined text-[20px] font-black">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Media & Screenshots */}
            {step === 2 && (
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-10 transition-all hover:shadow-xl hover:shadow-blue-900/5 group/card">
                <div className="mb-10">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                    Account Screenshots
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic mt-1">
                    Upload high-quality images of your inventory & rank
                  </p>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-4xl p-10 md:p-16 flex flex-col items-center justify-center text-center hover:border-[#254294] dark:hover:border-blue-500 transition-all cursor-pointer group/upload bg-slate-50/30 dark:bg-slate-800/20 mb-10 shadow-inner">
                  <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-lg flex items-center justify-center mb-6 group-hover/upload:scale-110 group-hover/upload:rotate-3 transition-transform">
                    <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 text-4xl font-black italic">
                      cloud_upload
                    </span>
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white mb-2 text-lg uppercase italic tracking-tight">
                    Drag & Drop Media
                  </h4>
                  <p className="text-[10px] text-slate-400 mb-8 font-black uppercase tracking-widest italic">
                    Support PNG, JPG, or WEBP (Max 5MB)
                  </p>
                  <button className="px-10 py-3.5 bg-[#254294] text-white rounded-2xl font-black text-xs uppercase tracking-widest italic shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all">
                    Choose Files
                  </button>
                </div>

                {/* Thumbnails */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-widest italic flex items-center gap-3">
                    Uploaded Media
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[9px] text-[#254294]">
                      (4/10)
                    </span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`relative group aspect-square rounded-3xl overflow-hidden border-2 transition-all ${
                          i === 1
                            ? "border-[#254294] shadow-xl shadow-blue-900/5 ring-4 ring-blue-500/5"
                            : "border-slate-50 dark:border-slate-800 hover:border-[#254294]"
                        }`}
                      >
                        <Image
                          alt={`Screenshot ${i}`}
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          fill
                          sizes="(min-width:640px) 25vw, 50vw"
                          src={
                            [
                              "https://lh3.googleusercontent.com/aida-public/AB6AXuCSKN6AnBDVSzXUv5vvqy6LSXS-N5XaGixz98-jUzdNY74jHtS3Vh-rp3P6PPn-3wbCIHZahHijrZpZ6IB4FBxH5ipl--aR8l8XdZTPUJy1f6FO-mcuB29RqTxVzb7KRtGtdgGxmL3WWeuqeEcP9Pnzx35KzL__dibhGo7wBTKLHYTaPCKsmcRk9Oy27UjxVkvAgaRzxrC0oA7E20QUCcwTJJUGbYXG-ULnmieRRJbPdSbWd101Oyld2GGb-krVVx-y0shl1DVIrA",
                              "https://lh3.googleusercontent.com/aida-public/AB6AXuCVq_P2g-yVovrLp05tFfqT65g8G67lMmyE4vIqGzHw45OaQvX22O_rK-42n6lT3p8-v-_v55j8v-x4v-l5r-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1",
                              "https://lh3.googleusercontent.com/aida-public/AB6AXuB3Z9K5y_X3_w8y9-z-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1",
                              "https://lh3.googleusercontent.com/aida-public/AB6AXuC-_y-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1",
                            ][i - 1]
                          }
                        />
                        {i === 1 && (
                          <div className="absolute top-3 left-3 px-2 py-1 bg-[#254294] text-white text-[8px] font-black rounded-lg shadow-lg uppercase tracking-widest italic text-center">
                            Thumbnail
                          </div>
                        )}
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[1px]">
                          <button className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/40 text-white transition-colors backdrop-blur-md flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">
                              visibility
                            </span>
                          </button>
                          <button className="w-8 h-8 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors backdrop-blur-md flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">
                              delete
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions Step 2 */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-50 dark:border-slate-800/50">
                  <button
                    onClick={prevStep}
                    className="w-full sm:w-auto px-8 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white text-[10px] font-black uppercase tracking-widest italic transition-colors flex items-center justify-center gap-2 order-2 sm:order-1"
                  >
                    <span className="material-symbols-outlined text-lg">
                      arrow_back
                    </span>
                    Previous
                  </button>
                  <button
                    onClick={nextStep}
                    className="w-full sm:w-auto bg-[#254294] hover:bg-blue-900 text-white px-10 py-4 rounded-[1.25rem] font-black uppercase tracking-widest italic shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 transition-all order-1 sm:order-2"
                  >
                    Next Step
                    <span className="material-symbols-outlined text-[20px] font-black">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {step === 2 && (
              <>
                {/* Screenshot Requirements */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-[#FF7D1F] font-bold text-2xl">
                      verified_user
                    </span>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                      Screenshot Requirements
                    </h3>
                  </div>
                  <ul className="space-y-6">
                    {[
                      {
                        title: "Proof of Rank",
                        desc: "Show the current season rank page and win rates.",
                      },
                      {
                        title: "Inventory & Skins",
                        desc: "Highlight rare items, premium skins, and currency amounts.",
                      },
                      {
                        title: "Privacy First",
                        desc: "Hide your account ID or username to prevent ban risks.",
                      },
                      {
                        title: "No Watermarks",
                        desc: "Use clean screenshots without external logos.",
                      },
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <div className="w-5 h-5 bg-[#254294] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-white text-xs font-bold">
                            check
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-white mb-0.5">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Seller Tip */}
                <div className="bg-[#EFF6FF] dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 font-bold">
                      lightbulb
                    </span>
                    <p className="font-bold text-sm text-[#254294] dark:text-blue-300">
                      Seller Tip
                    </p>
                  </div>
                  <p className="text-xs font-medium text-blue-800 dark:text-blue-300 leading-relaxed">
                    High-quality, clear screenshots can increase your chances of
                    a quick sale by up to 60%. Buyers prefer seeing exactly what
                    they are paying for.
                  </p>
                </div>
              </>
            )}
            {/* Fallback space filler if sidebar is empty on future steps? Or maybe just hide it */}
            {/* For step 1 we had no sidebar content in new layout, so fine. */}
          </div>
        </div>
      )}

      {/* Footer Features (Visible on all steps) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
        {[
          {
            icon: "security",
            title: "Secure Transaction",
            desc: "Our escrow system ensures you get paid safely. Funds are held until the buyer confirms the delivery.",
          },
          {
            icon: "bolt",
            title: "Quick Delivery",
            desc: "Use 'Instant Delivery' to sell your accounts faster and get your funds processed within 24 hours.",
          },
          {
            icon: "support_agent",
            title: "24/7 Support",
            desc: "Our dedicated support team is here to assist with any disputes or questions you may have.",
          },
        ].map((feat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-200 dark:border-slate-800 flex items-start gap-6 group hover:shadow-xl hover:shadow-[#254294]/5 transition-all"
          >
            <div className="w-12 h-12 bg-blue-50/50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 dark:border-slate-800 text-[#254294] dark:text-blue-400 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl font-black italic">
                {feat.icon}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white mb-2 uppercase italic tracking-tight">
                {feat.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-bold italic">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
