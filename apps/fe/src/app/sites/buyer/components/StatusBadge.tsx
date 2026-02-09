import type { TransactionStatusVariant } from "../types";

type StatusBadgeProps = {
  variant: TransactionStatusVariant;
  label?: string;
  className?: string;
  showPing?: boolean;
};

const variantStyles: Record<TransactionStatusVariant, string> = {
  pending_payment: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  in_progress: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
};

const variantIcons: Record<TransactionStatusVariant, string> = {
  pending_payment: "schedule",
  in_progress: "hourglass_top",
  completed: "check_circle",
};

export default function StatusBadge({
  variant,
  label,
  className = "",
  showPing = false,
}: StatusBadgeProps) {
  return (
    <span className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold ${variantStyles[variant]} ${className}`.trim()}>
      {showPing ? (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current"></span>
        </span>
      ) : (
        <span className="material-symbols-outlined text-sm">{variantIcons[variant]}</span>
      )}
      {label}
    </span>
  );
}
