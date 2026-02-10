"use client";

type VerificationStepIdentityProps = {
  onBack: () => void;
  onNext: () => void;
};

export default function VerificationStepIdentity({
  onBack,
  onNext,
}: VerificationStepIdentityProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 space-y-12 p-8 duration-700 md:p-14">
      <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-10 md:flex-row md:items-center dark:border-slate-800">
        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tight uppercase italic text-slate-900 dark:text-white">
            Step 02: Document Feed
          </h3>
          <p className="text-[11px] font-bold uppercase tracking-widest italic text-slate-400">
            Upload high-fidelity{" "}
            <span className="text-[#254294] dark:text-blue-400">
              identification scans
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-2xl border border-green-500/10 bg-green-500/5 px-5 py-3">
            <span className="material-symbols-outlined text-lg text-green-500">
              check_circle
            </span>
            <span className="text-[9px] font-black uppercase italic text-green-600 dark:text-green-400">
              Clear Text
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-green-500/10 bg-green-500/5 px-5 py-3">
            <span className="material-symbols-outlined text-lg text-green-500">
              light_mode
            </span>
            <span className="text-[9px] font-black uppercase italic text-green-600 dark:text-green-400">
              No Glare
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <label className="block px-2 text-[10px] font-black uppercase tracking-widest italic text-slate-400 dark:text-slate-500">
            Primary ID Front Scan
          </label>
          <div className="group relative cursor-pointer">
            <div className="absolute -inset-1 rounded-4xl bg-linear-to-r from-[#254294] to-blue-400 opacity-0 blur transition duration-1000 group-hover:opacity-10 group-hover:duration-200" />
            <div className="relative flex min-h-75 flex-col items-center justify-center rounded-4xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center shadow-inner transition-all group-hover:border-[#254294] dark:border-slate-800 dark:bg-slate-800/30">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-xl shadow-blue-900/5 transition-transform group-hover:scale-110 dark:border-slate-700 dark:bg-slate-800">
                <span className="material-symbols-outlined text-4xl font-black italic text-[#254294] dark:text-blue-400">
                  photo_camera
                </span>
              </div>
              <h4 className="mb-2 text-base font-black tracking-tight uppercase italic text-slate-900 dark:text-white">
                Capture Front
              </h4>
              <p className="text-[10px] font-bold uppercase tracking-widest italic text-slate-400">
                JPG, PNG • High Res (Max 5MB)
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-slate-400 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
          <label className="block px-2 text-[10px] font-black uppercase tracking-widest italic text-slate-400 dark:text-slate-500">
            Identity Card Back (Optional)
          </label>
          <div className="group relative cursor-pointer">
            <div className="relative flex min-h-75 flex-col items-center justify-center rounded-4xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center shadow-inner transition-all group-hover:border-slate-400 dark:border-slate-800 dark:bg-slate-800/30">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <span className="material-symbols-outlined text-4xl font-black italic text-slate-300 dark:text-slate-600">
                  cloud_upload
                </span>
              </div>
              <h4 className="mb-2 text-base font-black tracking-tight uppercase italic text-slate-400">
                Upload Optional
              </h4>
              <p className="text-[10px] font-bold uppercase tracking-widest italic text-slate-400">
                Reverse side details
              </p>
            </div>
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
          Reset Parameters
        </button>
        <button
          onClick={onNext}
          className="order-1 flex w-full items-center justify-center gap-4 rounded-2xl bg-[#254294] px-12 py-5 text-white shadow-2xl shadow-blue-900/10 transition-all hover:scale-105 hover:bg-blue-900 active:scale-95 sm:order-2 sm:w-auto"
        >
          <span className="text-sm font-black uppercase tracking-widest italic">
            Biometric Face-Sync
          </span>
          <span className="material-symbols-outlined text-[20px] font-black italic">
            arrow_right_alt
          </span>
        </button>
      </div>
    </div>
  );
}
