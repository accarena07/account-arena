import type { TransactionStepState } from "../types";

type TransactionProgressStepperProps = {
  state: TransactionStepState;
  middleLabel?: string;
};

const STATE_PROGRESS: Record<TransactionStepState, string> = {
  pending: "w-[0%]",
  in_progress: "w-1/2",
  completed: "w-full",
};

export default function TransactionProgressStepper({
  state,
  middleLabel = "Diproses",
}: TransactionProgressStepperProps) {
  const isCompleted = state === "completed";
  const lineColor = isCompleted ? "bg-green-500" : "bg-primary";

  return (
    <div className="relative mx-auto flex max-w-2xl items-center justify-between">
      <div className="absolute top-1/2 left-0 z-0 h-1 w-full -translate-y-1/2 bg-slate-200 dark:bg-slate-700"></div>
      <div className={`absolute top-1/2 left-0 z-0 h-1 -translate-y-1/2 ${lineColor} ${STATE_PROGRESS[state]}`}></div>

      {[
        { key: "pending", label: "Pending", icon: "payments" },
        { key: "in_progress", label: middleLabel, icon: "hourglass_empty" },
        { key: "completed", label: "Selesai", icon: "verified_user" },
      ].map((step, idx) => {
        const stepIdx = idx;
        const activeIdx = state === "pending" ? 0 : state === "in_progress" ? 1 : 2;
        const isDone = isCompleted || stepIdx < activeIdx;
        const isCurrent = stepIdx === activeIdx;

        const circleClass = isCompleted
          ? `bg-green-500 text-white shadow-lg shadow-green-500/30 ${isCurrent ? "ring-4 ring-white dark:ring-slate-900" : ""}`
          : isDone
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : isCurrent
              ? "bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-white dark:ring-slate-900"
              : "bg-slate-200 text-slate-400 dark:bg-slate-700";

        const textClass = isCompleted
          ? "text-green-600 dark:text-green-400"
          : isCurrent
            ? "text-primary"
            : "text-slate-400";

        const icon = isCompleted || isDone ? "check" : step.icon;

        return (
          <div className="relative z-10 flex flex-col items-center gap-3" key={step.key}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${circleClass}`}>
              <span className="material-symbols-outlined text-sm">{icon}</span>
            </div>
            <span className={`text-xs font-bold tracking-wider uppercase ${textClass}`}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
