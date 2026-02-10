"use client";

type VerificationStepPersonalInfoProps = {
  onNext: () => void;
};

export default function VerificationStepPersonalInfo({
  onNext,
}: VerificationStepPersonalInfoProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-12 p-8 duration-700 md:p-14">
      <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-10 md:flex-row md:items-center dark:border-slate-800">
        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tight uppercase italic text-slate-900 dark:text-white">
            Step 01: Personal Meta
          </h3>
          <p className="text-[11px] font-bold uppercase tracking-widest italic leading-relaxed text-slate-400">
            Provide your legally recognized{" "}
            <span className="text-[#254294] dark:text-blue-400">
              identification details
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 px-5 py-3 dark:border-blue-900/30 dark:bg-blue-900/10">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#254294]" />
          <span className="text-[10px] font-black uppercase tracking-widest italic text-[#254294] dark:text-blue-400">
            Data Privacy Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        <div className="space-y-3">
          <label className="block px-2 text-[10px] font-black uppercase tracking-widest italic text-slate-400 dark:text-slate-500">
            Full Name (per Identity Card)
          </label>
          <input
            type="text"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-4.5 text-sm font-black italic text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#254294] focus:ring-4 focus:ring-blue-500/5 dark:border-slate-800 dark:bg-slate-800/20 dark:text-white"
            placeholder="Arthur Morgan"
          />
        </div>

        <div className="space-y-3">
          <label className="block px-2 text-[10px] font-black uppercase tracking-widest italic text-slate-400 dark:text-slate-500">
            National ID (NIK / Passport)
          </label>
          <input
            type="text"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-4.5 text-sm font-black italic text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#254294] focus:ring-4 focus:ring-blue-500/5 dark:border-slate-800 dark:bg-slate-800/20 dark:text-white"
            placeholder="3201************"
          />
        </div>

        <div className="space-y-3">
          <label className="block px-2 text-[10px] font-black uppercase tracking-widest italic text-slate-400 dark:text-slate-500">
            Birth Timeline
          </label>
          <div className="group relative">
            <input
              type="text"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/50 py-4.5 pl-6 pr-14 text-sm font-black italic text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#254294] focus:ring-4 focus:ring-blue-500/5 dark:border-slate-800 dark:bg-slate-800/20 dark:text-white"
              placeholder="DD / MM / YYYY"
            />
            <span className="material-symbols-outlined pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 italic text-slate-400 transition-colors group-hover:text-[#254294]">
              calendar_month
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block px-2 text-[10px] font-black uppercase tracking-widest italic text-slate-400 dark:text-slate-500">
            Active Mobile Frequency
          </label>
          <div className="flex gap-4">
            <div className="flex w-20 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-xs font-black italic text-slate-400 dark:border-slate-800 dark:bg-slate-800/50">
              +62
            </div>
            <input
              type="text"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-4.5 text-sm font-black italic text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#254294] focus:ring-4 focus:ring-blue-500/5 dark:border-slate-800 dark:bg-slate-800/20 dark:text-white"
              placeholder="812********"
            />
          </div>
        </div>

        <div className="col-span-1 space-y-3 md:col-span-2">
          <label className="block px-2 text-[10px] font-black uppercase tracking-widest italic text-slate-400 dark:text-slate-500">
            Full Jurisdictional Address
          </label>
          <textarea
            rows={4}
            className="w-full resize-none rounded-3xl border border-slate-200 bg-slate-50/50 px-6 py-5 text-sm font-black italic leading-relaxed text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#254294] focus:ring-4 focus:ring-blue-500/5 dark:border-slate-800 dark:bg-slate-800/20 dark:text-white"
            placeholder="Street name, Building, District, City..."
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-12 sm:flex-row dark:border-slate-800/50">
        <p className="max-w-xs text-center text-[9px] font-black uppercase tracking-[0.2em] italic text-slate-400 sm:text-left">
          By proceeding, you agree to our{" "}
          <span className="text-[#254294] dark:text-blue-400">KYC Policy</span>{" "}
          and biometric data processing laws.
        </p>
        <button
          onClick={onNext}
          className="flex w-full items-center justify-center gap-4 rounded-2xl bg-[#254294] px-12 py-5 text-white shadow-2xl shadow-blue-900/10 transition-all hover:scale-105 hover:bg-blue-900 active:scale-95 sm:w-auto"
        >
          <span className="text-sm font-black uppercase tracking-widest italic">
            Identification Module
          </span>
          <span className="material-symbols-outlined text-[20px] font-black italic">
            arrow_right_alt
          </span>
        </button>
      </div>
    </div>
  );
}
