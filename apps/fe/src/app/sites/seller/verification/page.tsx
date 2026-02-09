"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function KYCVerificationPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => Math.min(4, s + 1));

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 italic">
        <Link
          href="/sites/seller"
          className="hover:text-slate-600 transition-colors"
        >
          Dashboard
        </Link>
        <span className="material-symbols-outlined text-xs font-black">
          chevron_right
        </span>
        <span className="text-[#254294] dark:text-blue-400">
          Global KYC Verification
        </span>
      </div>

      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div className="w-full md:w-auto">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight uppercase italic tracking-tight">
            Seller Verification
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-[11px] font-bold uppercase tracking-widest italic">
            Protecting the{" "}
            <span className="text-[#254294] dark:text-blue-400">
              market integrity
            </span>{" "}
            via identity proof
          </p>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <button className="w-11 h-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 relative hover:bg-slate-50 transition-all shadow-sm group">
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform font-black italic">
                notifications
              </span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <button className="w-11 h-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all shadow-sm group">
              <span className="material-symbols-outlined text-[20px] font-black italic group-hover:rotate-12 transition-transform">
                help
              </span>
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-800">
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
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="max-w-4xl mx-auto mb-16 px-4">
        <div className="relative flex justify-between items-start text-center">
          {/* Background Line */}
          <div className="absolute top-7 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 -z-10 rounded-full"></div>

          {/* Active Progress Line */}
          <div
            className="absolute top-7 left-0 h-1 bg-green-500 -z-10 transition-all duration-700 ease-out rounded-full"
            style={{
              width: `${((step - 1) / 3) * 100}%`,
            }}
          ></div>

          {[
            { id: 1, label: "Info", icon: "person" },
            { id: 2, label: "Identity", icon: "badge" },
            { id: 3, label: "Selfie", icon: "face" },
            { id: 4, label: "Review", icon: "verified" },
          ].map((s) => {
            const isCompleted = step > s.id;
            const isActive = step === s.id;

            return (
              <div
                key={s.id}
                className="flex flex-col items-center gap-4 relative z-10"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 ${
                    isCompleted
                      ? "bg-green-500 border-green-50 dark:border-green-900/30 text-white shadow-xl shadow-green-500/20"
                      : isActive
                        ? "bg-[#254294] border-white dark:border-slate-800 text-white shadow-2xl shadow-blue-900/40 scale-110"
                        : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600 shadow-sm"
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-2xl font-black italic">
                      check
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-2xl italic">
                      {s.icon}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500 italic hidden sm:block ${
                    isCompleted
                      ? "text-green-600 dark:text-green-400"
                      : isActive
                        ? "text-[#254294] dark:text-blue-400"
                        : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-20 group/container">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="p-8 md:p-14 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-10">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                  Step 01: Personal Meta
                </h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest italic leading-relaxed">
                  Provide your legally recognized{" "}
                  <span className="text-[#254294] dark:text-blue-400">
                    identification details
                  </span>
                </p>
              </div>
              <div className="bg-blue-50/50 dark:bg-blue-900/10 px-5 py-3 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#254294] animate-pulse"></span>
                <span className="text-[10px] font-black text-[#254294] dark:text-blue-400 uppercase tracking-widest italic">
                  Data Privacy Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
                  Full Name (per Identity Card)
                </label>
                <input
                  type="text"
                  className="w-full px-6 py-4.5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white text-sm font-black italic transition-all shadow-sm"
                  placeholder="Arthur Morgan"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
                  National ID (NIK / Passport)
                </label>
                <input
                  type="text"
                  className="w-full px-6 py-4.5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white text-sm font-black italic transition-all shadow-sm"
                  placeholder="3201************"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
                  Birth Timeline
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    className="w-full pl-6 pr-14 py-4.5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white text-sm font-black italic transition-all shadow-sm cursor-pointer"
                    placeholder="DD / MM / YYYY"
                  />
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#254294] pointer-events-none transition-colors italic">
                    calendar_month
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
                  Active Mobile Frequency
                </label>
                <div className="flex gap-4">
                  <div className="w-20 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-xs font-black italic text-slate-400">
                    +62
                  </div>
                  <input
                    type="text"
                    className="flex-1 px-6 py-4.5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white text-sm font-black italic transition-all shadow-sm"
                    placeholder="812********"
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-3">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
                  Full Jurisdictional Address
                </label>
                <textarea
                  rows={4}
                  className="w-full px-6 py-5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-3xl focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none dark:text-white text-sm font-black italic resize-none transition-all shadow-sm leading-relaxed"
                  placeholder="Street name, Building, District, City..."
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 mt-6 border-t border-slate-100 dark:border-slate-800/50">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic max-w-xs text-center sm:text-left">
                By proceeding, you agree to our{" "}
                <span className="text-[#254294] dark:text-blue-400">
                  KYC Policy
                </span>{" "}
                and biometric data processing laws.
              </p>
              <button
                onClick={nextStep}
                className="w-full sm:w-auto bg-[#254294] hover:bg-blue-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest italic shadow-2xl shadow-blue-900/10 flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95"
              >
                Identification Module
                <span className="material-symbols-outlined text-[20px] font-black italic">
                  arrow_right_alt
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Identification */}
        {step === 2 && (
          <div className="p-8 md:p-14 space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                  Step 02: Document Feed
                </h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest italic">
                  Upload high-fidelity{" "}
                  <span className="text-[#254294] dark:text-blue-400">
                    identification scans
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-5 py-3 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500 text-lg">
                    check_circle
                  </span>
                  <span className="text-[9px] font-black uppercase text-green-600 dark:text-green-400 italic">
                    Clear Text
                  </span>
                </div>
                <div className="px-5 py-3 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500 text-lg">
                    light_mode
                  </span>
                  <span className="text-[9px] font-black uppercase text-green-600 dark:text-green-400 italic">
                    No Glare
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
                  Primary ID Front Scan
                </label>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#254294] to-blue-400 rounded-4xl blur opacity-0 group-hover:opacity-10 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-4xl p-12 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-800/30 min-h-[300px] transition-all group-hover:border-[#254294] shadow-inner">
                    <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-900/5 border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 text-4xl font-black italic">
                        photo_camera
                      </span>
                    </div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-2">
                      Capture Front
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                      JPG, PNG • High Res (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-slate-400 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
                  Identity Card Back (Optional)
                </label>
                <div className="relative group cursor-pointer">
                  <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-4xl p-12 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-800/30 min-h-[300px] transition-all group-hover:border-slate-400 shadow-inner">
                    <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-slate-700">
                      <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-4xl font-black italic">
                        cloud_upload
                      </span>
                    </div>
                    <h4 className="text-base font-black text-slate-400 uppercase italic tracking-tight mb-2">
                      Upload Optional
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                      Reverse side details
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 border-t border-slate-100 dark:border-slate-800/50">
              <button
                onClick={() => setStep(1)}
                className="w-full sm:w-auto flex items-center justify-center gap-3 text-slate-400 hover:text-[#254294] text-[10px] font-black uppercase tracking-widest italic transition-all group order-2 sm:order-1"
              >
                <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">
                  arrow_left_alt
                </span>
                Reset Parameters
              </button>
              <button
                onClick={nextStep}
                className="w-full sm:w-auto bg-[#254294] hover:bg-blue-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest italic shadow-2xl shadow-blue-900/10 flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 order-1 sm:order-2"
              >
                Biometric Face-Sync
                <span className="material-symbols-outlined text-[20px] font-black italic">
                  arrow_right_alt
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Selfie */}
        {step === 3 && (
          <div className="p-8 md:p-14 space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                  Step 03: Biometric Sync
                </h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest italic leading-relaxed">
                  Match your{" "}
                  <span className="text-[#254294] dark:text-blue-400">
                    physical face
                  </span>{" "}
                  with the identification scanner
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-4xl p-10 flex flex-col items-center justify-center relative min-h-[350px] shadow-inner overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/5 transition-opacity opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 shadow-lg shadow-green-500/20">
                    <span className="material-symbols-outlined text-base">
                      check
                    </span>
                    Optimal Compliance
                  </div>
                  <div className="w-40 h-40 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-8 relative border-4 border-[#254294]/10 shadow-2xl">
                    <span className="material-symbols-outlined text-8xl text-slate-200 dark:text-slate-700 italic">
                      account_circle
                    </span>
                    <div className="absolute bottom-4 right-2 bg-[#FF7D1F] text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase italic shadow-lg rotate-12">
                      ID CARD
                    </div>
                  </div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                    Standard Procedure
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic mt-2 text-center max-w-[250px] leading-relaxed">
                    Hold your ID card next to your face clearly in frame
                  </p>
                </div>

                <div className="bg-blue-500/5 border border-blue-100 dark:border-blue-900/20 rounded-3xl p-6">
                  <h5 className="text-[10px] font-black text-[#254294] dark:text-blue-400 uppercase tracking-widest italic mb-4">
                    Submission Ethics
                  </h5>
                  <ul className="space-y-3">
                    {[
                      "Maintain neutral background",
                      "Ensure eyelids are fully open",
                      "No eyewear or covering allowed",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 italic uppercase"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#254294]"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic px-2">
                  Live Biometric Feed
                </label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-4xl bg-slate-50/50 dark:bg-slate-800/30 min-h-[500px] flex flex-col items-center justify-center p-12 text-center group transition-all hover:border-[#254294] shadow-inner">
                  <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-blue-900/10 border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl text-[#254294] dark:text-blue-400 italic font-black">
                      face_unlock
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-4 leading-none">
                    Activate Camera
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic mb-10 max-w-[200px] mx-auto leading-relaxed">
                    Our AI will automatically scan and crop for optimal quality
                  </p>
                  <button className="bg-[#254294] hover:bg-blue-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest italic shadow-2xl shadow-blue-900/10 flex items-center gap-4 transition-all hover:scale-105 active:scale-95">
                    <span className="material-symbols-outlined italic font-black">
                      shutter_speed
                    </span>
                    Capture Feed
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 border-t border-slate-100 dark:border-slate-800/50">
              <button
                onClick={() => setStep(2)}
                className="w-full sm:w-auto flex items-center justify-center gap-3 text-slate-400 hover:text-[#254294] text-[10px] font-black uppercase tracking-widest italic transition-all group order-2 sm:order-1"
              >
                <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">
                  arrow_left_alt
                </span>
                Re-scan Document
              </button>
              <button
                onClick={nextStep}
                className="w-full sm:w-auto bg-[#254294] hover:bg-blue-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest italic shadow-2xl shadow-blue-900/10 flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 order-1 sm:order-2"
              >
                Assemble Package
                <span className="material-symbols-outlined text-[20px] font-black italic">
                  arrow_right_alt
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="p-8 md:p-14 space-y-12 animate-in zoom-in-95 duration-1000">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-green-500 rounded-4xl flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30 mb-8 border-4 border-white dark:border-slate-900 animate-bounce-slow">
                <span className="material-symbols-outlined text-white text-5xl font-black italic">
                  verified
                </span>
              </div>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
                Package Complete
              </h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] italic">
                Vault ready for compliance review
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-4xl p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-black text-slate-400 uppercase italic">
                    Document Evidence
                  </span>
                  <button
                    onClick={() => setStep(2)}
                    className="text-[10px] font-black text-[#254294] dark:text-blue-400 italic hover:underline"
                  >
                    Revise
                  </button>
                </div>
                <div className="aspect-16/10 bg-slate-900 rounded-3xl overflow-hidden relative group">
                  <Image
                    src="https://img.freepik.com/free-photo/young-asian-business-man-isolated-gray-background-doing-ok-sign-with-fingers-excellent-symbol_1187-17482.jpg?w=740"
                    alt="KTP Feed"
                    className="w-full h-full object-cover opacity-60 grayscale"
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-[10px] font-black italic text-white uppercase tracking-widest">
                      ktp_v1_secure.jpg
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-4xl p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-black text-slate-400 uppercase italic">
                    Biometric Proof
                  </span>
                  <button
                    onClick={() => setStep(3)}
                    className="text-[10px] font-black text-[#254294] dark:text-blue-400 italic hover:underline"
                  >
                    Re-capture
                  </button>
                </div>
                <div className="aspect-16/10 bg-slate-900 rounded-3xl overflow-hidden relative group">
                  <Image
                    src="https://img.freepik.com/free-photo/young-asian-business-man-isolated-gray-background-doing-ok-sign-with-fingers-excellent-symbol_1187-17482.jpg?w=740"
                    alt="Selfie Feed"
                    className="w-full h-full object-cover opacity-60 grayscale blur-[1px]"
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-[10px] font-black italic text-white uppercase tracking-widest">
                      face_node_locked.jpg
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-xl mx-auto space-y-10 py-10">
              <div className="flex items-start gap-5 group">
                <input
                  type="checkbox"
                  id="consent"
                  className="w-6 h-6 rounded-lg bg-slate-100 border-slate-200 text-[#254294] focus:ring-[#254294] mt-1 shrink-0 cursor-pointer"
                />
                <label
                  htmlFor="consent"
                  className="text-[11px] font-black text-slate-500 uppercase italic tracking-widest leading-relaxed cursor-pointer select-none"
                >
                  I certify that all information provided is accurate and
                  corresponds to my legal identification documents.
                </label>
              </div>

              <button className="w-full bg-[#254294] hover:bg-blue-900 text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] italic shadow-2xl shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-95 text-sm flex items-center justify-center gap-4">
                Commit To Verification Network
                <span className="material-symbols-outlined font-black italic">
                  rocket_launch
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Footer Info */}
      <footer className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic mb-20 md:mb-10">
        <div className="flex flex-col md:flex-row items-center gap-8 text-center">
          <a href="#" className="hover:text-[#254294] transition-colors">
            Compliance Engine
          </a>
          <a href="#" className="hover:text-[#254294] transition-colors">
            Identity Firewall
          </a>
          <a href="#" className="hover:text-[#254294] transition-colors">
            Verification Legals
          </a>
          <div className="flex items-center gap-3 text-[#254294] dark:text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Compliance Node Active
          </div>
        </div>
        <div className="text-center">
          © 2024 AccountArena • Trust Infrastructure • Global KYC Standards
        </div>
      </footer>
    </div>
  );
}
