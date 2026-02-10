type WizardStepItem = {
  id: number;
  label: string;
  icon?: string;
};

type SellerWizardStepperProps = {
  step: number;
  items: readonly WizardStepItem[];
  variant?: "tab" | "timeline";
  className?: string;
};

export default function SellerWizardStepper({
  step,
  items,
  variant = "tab",
  className,
}: SellerWizardStepperProps) {
  if (variant === "timeline") {
    const maxStep = items.length;
    const progressPercent = ((step - 1) / (maxStep - 1)) * 100;

    return (
      <div className={`mx-auto mb-16 max-w-4xl px-4 ${className ?? ""}`}>
        <div className="relative flex items-start justify-between text-center">
          <div className="absolute left-0 right-0 top-7 -z-10 h-1 rounded-full bg-slate-100 dark:bg-slate-800" />
          <div
            className="absolute left-0 top-7 -z-10 h-1 rounded-full bg-green-500 transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />

          {items.map((item) => {
            const isCompleted = step > item.id;
            const isActive = step === item.id;

            return (
              <div key={item.id} className="relative z-10 flex flex-col items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 transition-all duration-500 ${
                    isCompleted
                      ? "border-green-50 bg-green-500 text-white shadow-xl shadow-green-500/20 dark:border-green-900/30"
                      : isActive
                        ? "scale-110 border-white bg-[#254294] text-white shadow-2xl shadow-blue-900/40 dark:border-slate-800"
                        : "border-slate-100 bg-white text-slate-300 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600"
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-2xl font-black italic">
                      check
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-2xl italic">
                      {item.icon ?? "radio_button_unchecked"}
                    </span>
                  )}
                </div>
                <span
                  className={`hidden text-[9px] font-black uppercase tracking-[0.2em] italic transition-colors duration-500 sm:block ${
                    isCompleted
                      ? "text-green-600 dark:text-green-400"
                      : isActive
                        ? "text-[#254294] dark:text-blue-400"
                        : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`mb-10 border-b border-slate-200 dark:border-slate-800 ${className ?? ""}`}>
      <div className="scrollbar-hide flex items-center gap-8 overflow-x-auto pb-0.5">
        {items.map((item) => {
          const isCompleted = step > item.id;
          const isActive = step === item.id;

          return (
            <div
              key={item.id}
              className={`flex min-w-fit items-center gap-3 whitespace-nowrap border-b-2 pb-4 transition-all ${
                isActive
                  ? "border-[#254294] text-[#254294] dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-slate-400 dark:text-slate-500"
              }`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-black transition-all ${
                  isCompleted
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                    : isActive
                      ? "bg-[#254294] text-white shadow-lg shadow-blue-500/20 dark:bg-blue-600"
                      : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                }`}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-sm font-black">
                    check
                  </span>
                ) : (
                  item.id
                )}
              </div>
              <span
                className={`text-[11px] font-black uppercase tracking-widest italic ${
                  isCompleted ? "text-green-600 dark:text-green-400" : ""
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
