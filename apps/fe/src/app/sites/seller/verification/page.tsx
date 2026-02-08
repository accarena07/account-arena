/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function KYCVerificationPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => Math.min(4, s + 1));
  // const prevStep = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="flex-1 max-w-[1200px] mx-auto w-full py-6">
      <header className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#254294] dark:text-blue-400">
            <span className="material-symbols-outlined text-xl font-bold">
              verified_user
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Seller KYC Verification
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
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

      {/* Progress Stepper */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="relative flex justify-between items-center text-center px-4 md:px-12">
          {/* Background Line */}
          <div className="absolute top-6 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -z-10 rounded-full"></div>

          {/* Active Progress Line (Green) */}
          <div
            className="absolute top-6 left-0 h-1 bg-green-500 -z-10 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>

          {[
            { id: 1, label: "PERSONAL INFO", icon: "person" },
            { id: 2, label: "IDENTITY DOC", icon: "badge" },
            { id: 3, label: "SELFIE", icon: "face" },
            { id: 4, label: "REVIEW", icon: "assignment" },
          ].map((s) => {
            const isCompleted = step > s.id;
            const isActive = step === s.id;

            return (
              <div
                key={s.id}
                className="flex flex-col items-center gap-3 bg-white dark:bg-slate-900 px-2 relative z-10"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-[4px] ${
                    isCompleted
                      ? "bg-green-500 border-green-100 dark:border-green-900/30 text-white shadow-lg shadow-green-500/30 scale-100"
                      : isActive
                        ? "bg-[#254294] border-blue-50 dark:border-blue-900/30 text-white shadow-lg shadow-blue-900/30 scale-110"
                        : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-300 dark:text-slate-600"
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-xl font-bold animate-pulse-short">
                      check
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-xl">
                      {s.icon}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                    isCompleted
                      ? "text-green-600 dark:text-green-400"
                      : isActive
                        ? "text-[#254294] dark:text-blue-400"
                        : "text-slate-300 dark:text-slate-600"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-12">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                KYC Step 1: Personal Information
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Please provide your basic details as shown on your legal
                identity card. Ensure all data is accurate to avoid rejection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              {/* Row 1: Name & NIK */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white text-sm placeholder:text-slate-400 font-medium transition-all"
                  placeholder="Enter your full name"
                />
                <p className="mt-2 text-[10px] text-slate-400 font-medium">
                  Must match your Identity Card (KTP/Passport)
                </p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
                  Identity Number (NIK)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white text-sm placeholder:text-slate-400 font-medium transition-all"
                  placeholder="16-digit NIK number"
                />
              </div>

              {/* Row 2: DOB & Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    className="w-full pl-4 pr-10 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white text-sm placeholder:text-slate-400 font-medium appearance-none transition-all"
                    placeholder="mm/dd/yyyy"
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">
                    calendar_today
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
                  Phone Number
                </label>
                <div className="flex gap-3">
                  <div className="w-[70px] flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300">
                    +62
                  </div>
                  <input
                    type="text"
                    className="flex-1 px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white text-sm placeholder:text-slate-400 font-medium transition-all"
                    placeholder="812xxxx"
                  />
                </div>
              </div>

              {/* Row 3: Address  */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
                  Residential Address
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#254294] outline-none dark:text-white text-sm placeholder:text-slate-400 font-medium resize-none transition-all"
                  placeholder="Full address (Street, Village, District, City, Province)"
                ></textarea>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-6 pt-8 mt-4 border-t border-slate-50 dark:border-slate-800">
              <button className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-bold transition-colors">
                Save Draft
              </button>
              <button
                onClick={nextStep}
                className="bg-[#254294] hover:bg-blue-900 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all text-sm"
              >
                Continue to Next Step
                <span className="material-symbols-outlined text-[20px] font-bold">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Upload Identity Document */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Step 2: Upload Identity Document
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Please upload a clear photo of your original Government-issued
                Identity Card (ID Card, Passport, or Driver&#39;s License).
              </p>
            </div>

            {/* Guidelines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">
                  spellcheck
                </span>
                <p className="text-xs font-bold text-green-700 dark:text-green-400">
                  Ensure text is clearly readable
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">
                  wb_sunny
                </span>
                <p className="text-xs font-bold text-green-700 dark:text-green-400">
                  Avoid reflections or glare
                </p>
              </div>
            </div>

            {/* Upload Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Front Side */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
                  Front Side of ID <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-[#254294] dark:hover:border-blue-500 transition-colors cursor-pointer group bg-slate-50 dark:bg-slate-800/30 h-64">
                  <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 text-2xl font-bold">
                      add_a_photo
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-1.5 text-sm">
                    Click to upload front side
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              </div>

              {/* Back Side */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
                  Back Side of ID (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-[#254294] dark:hover:border-blue-500 transition-colors cursor-pointer group bg-slate-50 dark:bg-slate-800/30 h-64">
                  <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-2xl font-bold group-hover:text-[#254294] dark:group-hover:text-blue-400 transition-colors">
                      upload
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-1.5 text-sm">
                    Click to upload back side
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Only if required for your document
                  </p>
                </div>
              </div>
            </div>

            {/* Secure Encryption Note */}
            <div className="bg-[#EFF6FF] dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 flex gap-4 items-start">
              <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 text-xl font-bold">
                lock
              </span>
              <div>
                <h4 className="text-xs font-bold text-[#254294] dark:text-blue-400 mb-1">
                  Secure Encryption
                </h4>
                <p className="text-[10px] text-[#254294]/80 dark:text-blue-400/80 leading-relaxed font-medium">
                  Your identity document is encrypted and will only be used for
                  verification purposes. We do not share your sensitive personal
                  data with any third parties.
                </p>
              </div>
            </div>

            {/* Footer Actions Step 2 */}
            <div className="flex items-center justify-between pt-8 mt-4 border-t border-slate-50 dark:border-slate-800">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-bold transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  arrow_back
                </span>
                Back to Personal Info
              </button>
              <button
                onClick={nextStep}
                className="bg-[#254294] hover:bg-blue-900 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all text-sm"
              >
                Next: Selfie Verification
                <span className="material-symbols-outlined text-[20px] font-bold">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Placeholders for subsequent steps to maintain state logic */}
        {/* Step 3: Selfie Verification */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Step 3: Selfie Verification
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Please take a photo of yourself holding your ID card clearly to
                confirm your identity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column: Guide */}
              <div className="space-y-8">
                {/* Visual Guide */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 flex flex-col items-center justify-center relative border border-slate-100 dark:border-slate-800">
                  <div className="absolute top-6 right-6 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm font-bold">
                      check
                    </span>
                    Correct
                  </div>
                  <div className="w-48 h-48 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-8 relative overflow-hidden">
                    <span className="material-symbols-outlined text-[100px] text-slate-400 dark:text-slate-500">
                      account_circle
                    </span>
                    <div className="absolute bottom-6 right-10 bg-white dark:bg-slate-600 px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 dark:border-slate-500 transform rotate-[-12deg]">
                      <p className="text-[8px] font-bold text-slate-400 dark:text-slate-300 uppercase">
                        ID CARD
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-slate-800 dark:text-white text-sm">
                    Selfie Guide
                  </p>
                </div>

                {/* Checklist */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    QUALITY CHECKLIST
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Face is clearly visible without glasses or mask",
                      "ID card details are sharp and readable",
                      "Background is neutral and lighting is good",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="bg-green-100 dark:bg-green-500/20 rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[14px] font-bold">
                            check
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight pt-0.5">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Upload */}
              <div className="space-y-6">
                <label className="block text-sm font-bold text-slate-800 dark:text-white">
                  Upload your selfie
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-8 flex flex-col items-center justify-center text-center h-[380px] hover:border-[#254294] dark:hover:border-blue-500 transition-colors bg-white dark:bg-slate-900 group">
                  <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/10 rounded-full flex items-center justify-center mb-6 text-[#254294] dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl font-bold">
                      add_a_photo
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-2">
                    Take or Upload Photo
                  </h4>
                  <p className="text-xs text-slate-500 font-medium max-w-[200px] mb-8 leading-relaxed">
                    Click to browse or drag and drop your selfie image. Max 5MB
                    (JPG, PNG).
                  </p>
                  <button className="bg-[#254294] hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20 text-sm">
                    <span className="material-symbols-outlined text-lg">
                      upload
                    </span>
                    Upload Selfie
                  </button>
                </div>
              </div>
            </div>

            {/* Warning Alert */}
            <div className="bg-[#FFF8F1] dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl p-4 flex gap-4 items-start">
              <div className="w-5 h-5 bg-[#FF7D1F] rounded-md flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-white text-[14px] font-bold">
                  warning
                </span>
              </div>
              <p className="text-[11px] text-[#b34900] dark:text-orange-400/90 leading-relaxed font-medium">
                <span className="font-bold">
                  Make sure you are not wearing any hats, glasses, or anything
                  that covers your face.
                </span>{" "}
                Both your face and the ID card must be in the same shot.
              </p>
            </div>

            {/* Footer Navigation Step 3 */}
            <div className="flex items-center justify-between pt-8 mt-4 border-t border-slate-50 dark:border-slate-800">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">
                  arrow_back
                </span>
                Previous Step
              </button>

              <div className="flex items-center gap-4">
                <button className="px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Save Draft
                </button>
                <button
                  onClick={nextStep}
                  className="bg-[#254294] hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all text-sm"
                >
                  Next: Review
                  <span className="material-symbols-outlined text-[20px] font-bold">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Placeholders for subsequent steps to maintain state logic */}
        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <div className="space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Step 4: Review & Submit
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Please review your information carefully before submitting.
              </p>
            </div>

            {/* Inner Progress Stepper for Review */}
            <div className="relative flex justify-between items-center text-center px-8 mb-12">
              <div className="absolute top-5 left-0 w-full h-px bg-green-500 -z-10"></div>
              {[
                { id: 1, label: "Basic Info" },
                { id: 2, label: "ID Document" },
                { id: 3, label: "Face Scan" },
              ].map((s) => (
                <div
                  key={s.id}
                  className="flex flex-col items-center gap-3 bg-white dark:bg-slate-900 px-4"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-green-500 text-white shadow-lg shadow-green-500/20">
                    <span className="material-symbols-outlined text-lg font-bold">
                      check
                    </span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {s.label}
                  </span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-3 bg-white dark:bg-slate-900 px-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-[#254294] text-white shadow-lg shadow-blue-900/20">
                  4
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wide text-[#254294] dark:text-blue-400">
                  Review
                </span>
                <span className="absolute -bottom-6 w-full text-center left-0 text-[10px] text-slate-400 font-bold hidden">
                  Step 4
                </span>
              </div>
            </div>

            {/* Personal Information Review */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#254294] dark:text-blue-400">
                    person
                  </span>
                  <h4 className="font-bold text-slate-800 dark:text-white text-base">
                    Personal Information
                  </h4>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-[#254294] dark:text-blue-400 text-sm font-bold flex items-center gap-1 hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>
                  Edit
                </button>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    FULL NAME
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    Budi Santoso
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    ID NUMBER (NIK)
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    3275012405880003
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    DATE OF BIRTH
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    24 May 1988
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    ADDRESS
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    Jl. Gamer Sejati No. 42, Jakarta
                  </p>
                </div>
              </div>
            </div>

            {/* Uploaded Documents Review */}
            <div>
              <div className="flex items-center justify-between mb-6 mt-8">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#254294] dark:text-blue-400">
                    description
                  </span>
                  <h4 className="font-bold text-slate-800 dark:text-white text-base">
                    Uploaded Documents
                  </h4>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-[#254294] dark:text-blue-400 text-sm font-bold flex items-center gap-1 hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3">
                    IDENTITY CARD (KTP)
                  </p>
                  <div className="aspect-[3/2] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative group">
                    <img
                      src="https://img.freepik.com/free-photo/young-asian-business-man-isolated-gray-background-doing-ok-sign-with-fingers-excellent-symbol_1187-17482.jpg?w=740"
                      alt="KTP"
                      className="w-full h-full object-cover grayscale opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 dark:bg-slate-900/90 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-600 dark:text-slate-300 shadow-sm">
                        ktp_budi_santoso.jpg
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3">
                    SELFIE VERIFICATION
                  </p>
                  <div className="aspect-[3/2] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative group">
                    <img
                      src="https://img.freepik.com/free-photo/young-asian-business-man-isolated-gray-background-doing-ok-sign-with-fingers-excellent-symbol_1187-17482.jpg?w=740"
                      alt="Selfie"
                      className="w-full h-full object-cover grayscale opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 dark:bg-slate-900/90 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-600 dark:text-slate-300 shadow-sm">
                        selfie_budi_santoso.jpg
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Declaration */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 flex gap-4 items-start border border-slate-100 dark:border-slate-800 mt-8">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded-md border-slate-300 text-[#254294] focus:ring-[#254294] cursor-pointer"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
                  Legal Declaration
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  I hereby declare that the information provided is true and
                  accurate. I understand that providing false information may
                  result in the suspension of my seller account and legal
                  action.
                </p>
              </div>
            </div>

            {/* Footer Navigation Step 4 */}
            <div className="flex items-center justify-between pt-8 mt-4 border-t border-slate-50 dark:border-slate-800">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">
                  arrow_back
                </span>
                Back to Face Scan
              </button>

              <button className="bg-[#254294] hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all text-sm ml-auto">
                Submit Application
                <span className="material-symbols-outlined text-[20px] font-bold">
                  check_circle
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Security Note Footer */}
      <div className="max-w-4xl mx-auto mt-8 bg-[#FFF8F1] dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-4 flex gap-4 items-start">
        <div className="w-5 h-5 bg-[#FF7D1F] rounded-full flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-white text-[10px] font-bold">
            priority_high
          </span>
        </div>
        <p className="text-[11px] text-[#b34900] dark:text-orange-400/90 leading-relaxed font-medium">
          <span className="font-bold">Security Note:</span> Your personal data
          is encrypted and used solely for identity verification purposes
          required by financial regulations. We do not share your information
          with third-party buyers or sellers.
        </p>
      </div>
    </div>
  );
}
