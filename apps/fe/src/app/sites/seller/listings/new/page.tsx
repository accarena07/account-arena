/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CreateListingPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="flex-1 max-w-6xl mx-auto">
      {/* Breadcrumb - Only show if not on step 1 to save space or always show? Design shows it. */}
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
        <span>Dashboard</span>
        <span className="material-symbols-outlined text-xs font-bold">
          chevron_right
        </span>
        <span>My Listings</span>
        <span className="material-symbols-outlined text-xs font-bold">
          chevron_right
        </span>
        <span className="text-[#254294] dark:text-blue-400">
          Create New Listing
        </span>
      </div>

      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/listings"
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-[#254294] transition-colors"
          >
            <span className="material-symbols-outlined font-bold">
              arrow_back
            </span>
          </Link>
          <div>
            <h2 className="text-2xl font-bold dark:text-white leading-tight">
              Create New Listing
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Step {step}: {step === 1 && "Provide basic account information"}
              {step === 2 && "Upload media and screenshots"}
              {step === 3 && "Set pricing and delivery options"}
              {step === 4 && "Review and publish your listing"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold dark:text-white leading-none">
              Admin Store
            </p>
            <p className="text-[10px] text-slate-400 font-black uppercase italic mt-1">
              Premium Seller
            </p>
          </div>
          <img
            alt="Profile"
            className="w-11 h-11 rounded-full border-2 border-[#254294]/20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALL4MNDR1C_NUyFVHybHloH6M8YfbkdIvKzI7T_k4HpLXMXCc8NM-4QBx0R3I9m_02Tz8RipzypJzBzPTLLZIDpfWIRqiFiekk4-Qrlim-jRmaF9YTlmkqDMvomJT6GyT0Pf3FpD50gUGghwfff6ZLVBR8ZEErIcD86V80P5vX_eFSepUp76QmZA7wy-aCof8wlJfY78J731Ztmd2SqzeCunW0UjITbg1LQPat79T21M94UJu5Pl98o01eoWNjUdNbUxKretMb-g"
          />
        </div>
      </header>

      {/* Progress Bar */}
      <div className="flex items-center border-b border-slate-200 dark:border-slate-800 mb-8 pb-4">
        <div className="flex gap-8 w-full">
          {[
            { id: 1, label: "Account Info" },
            { id: 2, label: "Media & Screenshots" },
            { id: 3, label: "Pricing & Delivery" },
            { id: 4, label: "Review & Publish" },
          ].map((s) => (
            <div
              key={s.id}
              className={`flex items-center gap-3 ${
                step >= s.id
                  ? "text-[#254294] dark:text-blue-400"
                  : "text-slate-300 dark:text-slate-600"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step === s.id
                    ? "bg-[#254294] text-white shadow-lg shadow-blue-900/20"
                    : step > s.id
                      ? "bg-[#254294] text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                {step > s.id ? (
                  <span className="material-symbols-outlined text-base font-bold">
                    check
                  </span>
                ) : (
                  s.id
                )}
              </div>
              <span className="font-bold text-sm tracking-tight">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Area */}
      {step === 3 ? (
        // Step 3 Specific Layout (Full Width Card containing 2 cols)
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Form */}
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Selling Price (IDR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                    Rp
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#254294] outline-none dark:text-white font-bold text-lg placeholder:text-slate-300"
                    placeholder="0"
                    type="number"
                    defaultValue="1500000"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-xl">
                    handshake
                  </span>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    Allow Price Negotiation
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF7D1F]"></div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Delivery Method
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#254294] outline-none dark:text-white font-medium text-sm appearance-none cursor-pointer hover:border-slate-300">
                    <option value="instant">
                      Instant Delivery (Automated)
                    </option>
                    <option value="manual">Manual Delivery (Chat-based)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    expand_more
                  </span>
                </div>
                <p className="mt-2 text-[10px] text-slate-400">
                  Instant delivery increases conversion by up to 40%.
                </p>
              </div>
            </div>

            {/* Right Column: Breakdown & Info */}
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-800 dark:text-white mb-6">
                  Earnings Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span>Selling Price</span>
                    <span className="text-slate-800 dark:text-white font-bold">
                      Rp 1.500.000
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span>Platform Fee (5%)</span>
                    <span className="text-red-500 font-bold">- Rp 75.000</span>
                  </div>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-800 dark:text-white">
                      Total Received
                    </span>
                    <span className="text-xl font-bold text-[#FF7D1F]">
                      Rp 1.425.000
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-4 flex gap-3 items-start">
                <span className="material-symbols-outlined text-[#FF7D1F] mt-0.5">
                  verified
                </span>
                <div>
                  <h4 className="text-xs font-bold text-[#b34900] dark:text-orange-400 mb-1">
                    Seller Protection Active
                  </h4>
                  <p className="text-[10px] text-[#b34900]/80 dark:text-orange-400/80 leading-relaxed font-medium">
                    Your payment is held securely in escrow until the buyer
                    confirms the delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box Bottom */}
          <div className="mt-8 bg-[#EFF6FF] dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-4 items-start">
            <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 mt-0.5">
              info
            </span>
            <p className="text-sm text-[#254294] dark:text-blue-300 leading-relaxed font-medium">
              By proceeding, you agree to our pricing policy and platform
              service terms. Payouts are typically processed within 24 hours
              after completion.
            </p>
          </div>

          {/* New Footer Navigation for Step 3 */}
          <div className="mt-8 flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={prevStep}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-bold px-4 py-2"
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
              Previous
            </button>
            <button
              onClick={nextStep}
              className="bg-[#254294] hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all"
            >
              Next Step
              <span className="material-symbols-outlined text-[20px] font-bold">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      ) : step === 4 ? (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Account Details Review */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
              <h3 className="font-bold text-sm flex items-center gap-3 text-slate-800 dark:text-white">
                <span className="material-symbols-outlined text-[#254294] text-xl">
                  person
                </span>
                Account Details
              </h3>
              <button
                onClick={() => setStep(1)}
                className="text-[10px] font-bold text-[#254294] hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider transition-colors"
              >
                <span className="material-symbols-outlined text-sm font-bold">
                  edit
                </span>{" "}
                EDIT
              </button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                    Game Title
                  </p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    Mobile Legends: Bang Bang
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                    Rank / Level
                  </p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    Mythic Glory (75 Stars)
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                    Listing Title
                  </p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    Legend Skins Account | Full Emblem Max | Rare Limited Skins
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                    Description
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
              <h3 className="font-bold text-sm flex items-center gap-3 text-slate-800 dark:text-white">
                <span className="material-symbols-outlined text-[#254294] text-xl">
                  image
                </span>
                Media & Screenshots
              </h3>
              <button
                onClick={() => setStep(2)}
                className="text-[10px] font-bold text-[#254294] hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider transition-colors"
              >
                <span className="material-symbols-outlined text-sm font-bold">
                  edit
                </span>{" "}
                EDIT
              </button>
            </div>
            <div className="p-8">
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-32 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0"
                  >
                    <img
                      alt={`Screenshot ${i}`}
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIBC51fxhgrgBkcfYA03Jp4q19UBjRHkniaexxKWE_Dv0ZUSWM8vSacnWMi_7fe22gKWNItAM7TqQ_HNNKXCmNgN9u4YHs883-IGCvxomuiCMYPEWKhRwVYkS2pKairrbxbIkKivGAvqOcz94f-RLdQPSCGxlAcBdzkfKHvH8CXJzUD8qD9WGM09oVrNkOEwXpRNAa3Bt1pt4PzJPsmd97pG0UqlK4RKGzTtLhtJHablzDILDfV4RZrr2CWTtJwXUuoOJp7XLhQg"
                    />
                  </div>
                ))}
                <div className="w-32 h-20 rounded-xl bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-[10px] text-slate-400 uppercase tracking-wide shrink-0">
                  +2 more
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Review */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
              <h3 className="font-bold text-sm flex items-center gap-3 text-slate-800 dark:text-white">
                <span className="material-symbols-outlined text-[#254294] text-xl">
                  sell
                </span>
                Pricing & Fees
              </h3>
              <button
                onClick={() => setStep(3)}
                className="text-[10px] font-bold text-[#254294] hover:text-blue-700 flex items-center gap-1 uppercase tracking-wider transition-colors"
              >
                <span className="material-symbols-outlined text-sm font-bold">
                  edit
                </span>{" "}
                EDIT
              </button>
            </div>
            <div className="p-8">
              <div className="w-full">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-3">
                  <span>Listing Price</span>
                  <span className="text-slate-800 dark:text-white text-sm">
                    $450.00
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <span>Platform Fee (5%)</span>
                  <span className="text-red-500 text-sm">-$22.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-800 dark:text-white">
                    Total Payout
                  </span>
                  <span className="text-2xl font-bold text-[#FF7D1F]">
                    $427.50
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Action */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-8">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  className="w-5 h-5 rounded-md border-slate-300 dark:border-slate-700 text-[#254294] focus:ring-[#254294] cursor-pointer"
                  id="terms"
                  type="checkbox"
                />
              </div>
              <div className="text-sm">
                <label
                  className="font-bold text-slate-800 dark:text-slate-200 block mb-1 cursor-pointer"
                  htmlFor="terms"
                >
                  I agree to the Terms and Conditions
                </label>
                <p className="text-slate-400 font-medium text-xs leading-relaxed">
                  I confirm that I am the rightful owner of this account and all
                  information provided is accurate. I understand that fraudulent
                  listings will result in permanent account suspension.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <button className="w-full md:w-3/4 bg-[#254294] hover:bg-[#1a3170] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3 transition-opacity text-base">
                <span className="material-symbols-outlined font-bold text-xl">
                  rocket_launch
                </span>
                Publish Listing
              </button>
              <button className="w-full md:w-1/4 py-4 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-bold text-sm transition-colors">
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
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Left Column Fields */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Game Title
                      </label>
                      <div className="relative">
                        <select className="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white appearance-none cursor-pointer hover:border-slate-300 transition-colors">
                          <option>Select a game</option>
                          <option>Mobile Legends: Bang Bang</option>
                          <option>Genshin Impact</option>
                          <option>VALORANT</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Listing Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mythic Glory | 200+ Skins | Full Emblem"
                        className="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white placeholder:text-slate-400"
                      />
                      <p className="mt-2 text-[10px] text-slate-400">
                        Attract buyers with a clear, descriptive title.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Account Level / Rank
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. AR 60 / Immortal 3"
                        className="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Right Column Fields */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Account Description
                    </label>
                    <textarea
                      placeholder="Describe the details of your account, special items, rare skins, and login methods..."
                      className="w-full h-[320px] px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white placeholder:text-slate-400 resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Info Box */}
                <div className="mt-8 bg-[#EFF6FF] dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-4 items-start">
                  <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 mt-0.5">
                    info
                  </span>
                  <p className="text-sm text-[#254294] dark:text-blue-300 leading-relaxed font-medium">
                    Make sure your account details are accurate. Misleading
                    information may result in listing suspension or payout
                    delays.
                  </p>
                </div>

                {/* Actions Step 1 */}
                <div className="mt-8 flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
                  <button className="text-slate-500 hover:text-slate-800 text-sm font-bold px-4 py-2">
                    Cancel
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-[#254294] hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all"
                  >
                    Next Step
                    <span className="material-symbols-outlined text-[20px] font-bold">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Media & Screenshots */}
            {step === 2 && (
              <>
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                      Account Screenshots
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Upload high-quality images of your account rank,
                      inventory, and skins.
                    </p>
                  </div>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-[#254294] dark:hover:border-blue-500 transition-colors cursor-pointer group bg-slate-50/50 dark:bg-slate-800/20 mb-10">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 text-3xl">
                        cloud_upload
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-1.5 text-base">
                      Drag & drop images here
                    </h4>
                    <p className="text-xs text-slate-400 mb-6 font-medium">
                      Support PNG, JPG, or WEBP (Max 5MB each)
                    </p>
                    <button className="px-8 py-2.5 bg-[#254294] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#254294]/20 hover:bg-blue-900 transition-all">
                      Choose Files
                    </button>
                  </div>

                  {/* Thumbnails */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                      Uploaded Images
                      <span className="text-slate-400 font-normal">(4/10)</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`relative group aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                            i === 1
                              ? "border-[#254294] shadow-md"
                              : "border-slate-100 dark:border-slate-800 hover:border-[#254294]"
                          }`}
                        >
                          <img
                            alt={`Screenshot ${i}`}
                            className="w-full h-full object-cover"
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
                            <div className="absolute top-2 left-2 px-2 py-1 bg-[#254294] text-white text-[9px] font-bold rounded-md shadow-sm uppercase tracking-wide">
                              Main Thumbnail
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button className="w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors">
                              <span className="material-symbols-outlined text-base">
                                visibility
                              </span>
                            </button>
                            <button className="w-8 h-8 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors">
                              <span className="material-symbols-outlined text-base">
                                delete
                              </span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Navigation Bar Step 2 */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex justify-between items-center shadow-sm">
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      arrow_back
                    </span>
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-[#254294] hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all text-sm"
                  >
                    Continue to Pricing
                    <span className="material-symbols-outlined text-xl">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </>
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
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-50 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 text-xl">
              security
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
              Secure Transaction
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our escrow system ensures you get paid safely.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-50 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 text-xl">
              bolt
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
              Quick Delivery
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Use &apos;Instant Delivery&apos; to sell your accounts faster.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-50 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 text-xl">
              support_agent
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
              24/7 Support
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Need help? Our team is here to assist your sales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
