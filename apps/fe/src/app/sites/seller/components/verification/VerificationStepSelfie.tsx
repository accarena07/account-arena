"use client";

type VerificationStepSelfieProps = {
  onBack: () => void;
  onNext: () => void;
};

export default function VerificationStepSelfie({
  onBack,
  onNext,
}: VerificationStepSelfieProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 space-y-12 p-8 duration-700 md:p-14">
      <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-10 md:flex-row md:items-center dark:border-slate-800">
        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tight uppercase italic text-slate-900 dark:text-white">
            Step 03: Biometric Sync
          </h3>
          <p className="text-[11px] font-bold uppercase tracking-widest italic leading-relaxed text-slate-400">
            Match your <span className="text-[#254294] dark:text-blue-400">physical face</span>{" "}
            with the identification scanner
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="relative flex min-h-87.5 flex-col items-center justify-center overflow-hidden rounded-4xl border border-slate-100 bg-slate-50/50 p-10 shadow-inner dark:border-slate-800 dark:bg-slate-800/30">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-green-500 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest italic text-white shadow-lg shadow-green-500/20">
              <span className="material-symbols-outlined text-base">check</span>
              Optimal Compliance
            </div>
            <div className="relative mb-8 flex h-40 w-40 items-center justify-center rounded-full border-4 border-[#254294]/10 bg-white shadow-2xl dark:bg-slate-800">
              <span className="material-symbols-outlined text-8xl italic text-slate-200 dark:text-slate-700">
                account_circle
              </span>
              <div className="absolute bottom-4 right-2 rotate-12 rounded-lg bg-[#FF7D1F] px-3 py-1 text-[9px] font-black uppercase italic text-white shadow-lg">
                ID CARD
              </div>
            </div>
            <h4 className="text-base font-black tracking-tight uppercase italic text-slate-900 dark:text-white">
              Standard Procedure
            </h4>
            <p className="mt-2 max-w-62.5 text-center text-[10px] font-bold uppercase tracking-widest italic leading-relaxed text-slate-400">
              Hold your ID card next to your face clearly in frame
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-500/5 p-6 dark:border-blue-900/20">
            <h5 className="mb-4 text-[10px] font-black uppercase tracking-widest italic text-[#254294] dark:text-blue-400">
              Submission Ethics
            </h5>
            <ul className="space-y-3">
              {["Maintain neutral background", "Ensure eyelids are fully open", "No eyewear or covering allowed"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[10px] font-bold uppercase italic text-slate-500 dark:text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#254294]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <label className="block px-2 text-[10px] font-black uppercase tracking-widest italic text-slate-400 dark:text-slate-500">
            Live Biometric Feed
          </label>
          <div className="group flex min-h-125 flex-col items-center justify-center rounded-4xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center shadow-inner transition-all hover:border-[#254294] dark:border-slate-800 dark:bg-slate-800/30">
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-100 bg-white shadow-xl shadow-blue-900/10 transition-transform group-hover:scale-110 dark:border-slate-700 dark:bg-slate-800">
              <span className="material-symbols-outlined text-4xl font-black italic text-[#254294] dark:text-blue-400">
                face_unlock
              </span>
            </div>
            <h4 className="mb-4 text-xl font-black leading-none tracking-tight uppercase italic text-slate-900 dark:text-white">
              Activate Camera
            </h4>
            <p className="mx-auto mb-10 max-w-50 text-[10px] font-bold uppercase tracking-widest italic leading-relaxed text-slate-400">
              Our AI will automatically scan and crop for optimal quality
            </p>
            <button className="flex items-center gap-4 rounded-2xl bg-[#254294] px-10 py-5 text-white shadow-2xl shadow-blue-900/10 transition-all hover:scale-105 hover:bg-blue-900 active:scale-95">
              <span className="material-symbols-outlined font-black italic">shutter_speed</span>
              <span className="font-black uppercase tracking-widest italic">Capture Feed</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 border-t border-slate-100 pt-10 sm:flex-row dark:border-slate-800/50">
        <button
          onClick={onBack}
          className="group order-2 flex w-full items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest italic text-slate-400 transition-all hover:text-[#254294] sm:order-1 sm:w-auto"
        >
          <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">
            arrow_left_alt
          </span>
          Re-scan Document
        </button>
        <button
          onClick={onNext}
          className="order-1 flex w-full items-center justify-center gap-4 rounded-2xl bg-[#254294] px-12 py-5 text-white shadow-2xl shadow-blue-900/10 transition-all hover:scale-105 hover:bg-blue-900 active:scale-95 sm:order-2 sm:w-auto"
        >
          <span className="text-sm font-black uppercase tracking-widest italic">
            Assemble Package
          </span>
          <span className="material-symbols-outlined text-[20px] font-black italic">
            arrow_right_alt
          </span>
        </button>
      </div>
    </div>
  );
}
