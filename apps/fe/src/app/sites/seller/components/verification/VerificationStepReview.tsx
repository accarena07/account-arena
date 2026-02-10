"use client";

import Image from "next/image";

type VerificationStepReviewProps = {
  onGoToIdentity: () => void;
  onGoToSelfie: () => void;
};

export default function VerificationStepReview({
  onGoToIdentity,
  onGoToSelfie,
}: VerificationStepReviewProps) {
  return (
    <div className="animate-in zoom-in-95 space-y-12 p-8 duration-1000 md:p-14">
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 animate-bounce-slow items-center justify-center rounded-4xl border-4 border-white bg-green-500 shadow-2xl shadow-green-500/30 dark:border-slate-900">
          <span className="material-symbols-outlined text-5xl font-black italic text-white">verified</span>
        </div>
        <h3 className="text-4xl font-black leading-none tracking-tighter uppercase italic text-slate-900 dark:text-white">
          Package Complete
        </h3>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] italic text-slate-400">
          Vault ready for compliance review
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6 rounded-4xl border border-slate-100 bg-slate-50/50 p-8 dark:border-slate-800 dark:bg-slate-800/30">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
            <span className="text-[10px] font-black uppercase italic text-slate-400">Document Evidence</span>
            <button onClick={onGoToIdentity} className="text-[10px] font-black italic text-[#254294] hover:underline dark:text-blue-400">
              Revise
            </button>
          </div>
          <div className="group relative aspect-16/10 overflow-hidden rounded-3xl bg-slate-900">
            <Image
              src="https://img.freepik.com/free-photo/young-asian-business-man-isolated-gray-background-doing-ok-sign-with-fingers-excellent-symbol_1187-17482.jpg?w=740"
              alt="KTP Feed"
              className="h-full w-full object-cover grayscale opacity-60"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest italic text-white backdrop-blur-xl">
                ktp_v1_secure.jpg
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-4xl border border-slate-100 bg-slate-50/50 p-8 dark:border-slate-800 dark:bg-slate-800/30">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
            <span className="text-[10px] font-black uppercase italic text-slate-400">Biometric Proof</span>
            <button onClick={onGoToSelfie} className="text-[10px] font-black italic text-[#254294] hover:underline dark:text-blue-400">
              Re-capture
            </button>
          </div>
          <div className="group relative aspect-16/10 overflow-hidden rounded-3xl bg-slate-900">
            <Image
              src="https://img.freepik.com/free-photo/young-asian-business-man-isolated-gray-background-doing-ok-sign-with-fingers-excellent-symbol_1187-17482.jpg?w=740"
              alt="Selfie Feed"
              className="h-full w-full object-cover grayscale opacity-60 blur-[1px]"
              fill
              sizes="(min-width:768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest italic text-white backdrop-blur-xl">
                face_node_locked.jpg
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl space-y-10 py-10">
        <div className="group flex items-start gap-5">
          <input
            type="checkbox"
            id="consent"
            className="mt-1 h-6 w-6 shrink-0 cursor-pointer rounded-lg border-slate-200 bg-slate-100 text-[#254294] focus:ring-[#254294]"
          />
          <label htmlFor="consent" className="cursor-pointer select-none text-[11px] font-black uppercase tracking-widest italic leading-relaxed text-slate-500">
            I certify that all information provided is accurate and corresponds to my legal identification documents.
          </label>
        </div>

        <button className="flex w-full items-center justify-center gap-4 rounded-3xl bg-[#254294] py-6 text-sm font-black uppercase tracking-[0.3em] italic text-white shadow-2xl shadow-blue-900/20 transition-all hover:scale-[1.02] hover:bg-blue-900 active:scale-95">
          Commit To Verification Network
          <span className="material-symbols-outlined font-black italic">rocket_launch</span>
        </button>
      </div>
    </div>
  );
}
