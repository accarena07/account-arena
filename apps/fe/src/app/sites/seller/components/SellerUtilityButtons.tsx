type SellerUtilityButtonsProps = {
  showNotificationDot?: boolean;
};

export default function SellerUtilityButtons({
  showNotificationDot = true,
}: SellerUtilityButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      <button className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <span className="material-symbols-outlined text-[20px] font-black italic transition-transform group-hover:scale-110">
          notifications
        </span>
        {showNotificationDot ? (
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-900" />
        ) : null}
      </button>
      <button className="group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <span className="material-symbols-outlined text-[20px] font-black italic transition-transform group-hover:rotate-12">
          help
        </span>
      </button>
    </div>
  );
}
