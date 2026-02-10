import type { SellerStatusKind } from "../types";

type SellerStatusBadgeProps = {
  status: SellerStatusKind;
  label: string;
  size?: "sm" | "xs";
  className?: string;
};

const STATUS_CLASS: Record<SellerStatusKind, string> = {
  active:
    "border-green-200/50 bg-green-500/10 text-green-600 dark:border-green-500/20 dark:text-green-400",
  sold: "border-blue-200/50 bg-blue-500/10 text-blue-600 dark:border-blue-500/20 dark:text-blue-400",
  draft: "border-slate-200/50 bg-slate-500/10 text-slate-600 dark:border-slate-800 dark:text-slate-400",
  success:
    "border-green-200/50 bg-green-500/10 text-green-600 dark:border-green-500/20 dark:text-green-400",
  processing:
    "border-blue-200/50 bg-blue-500/10 text-blue-600 dark:border-blue-500/20 dark:text-blue-400",
  failed: "border-red-200/50 bg-red-500/10 text-red-600 dark:border-red-500/20 dark:text-red-400",
};

const SIZE_CLASS: Record<NonNullable<SellerStatusBadgeProps["size"]>, string> = {
  sm: "px-4 py-1.5 text-[10px]",
  xs: "px-3 py-1.5 text-[9px]",
};

export default function SellerStatusBadge({
  status,
  label,
  size = "sm",
  className,
}: SellerStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-xl border font-black uppercase tracking-widest italic shadow-sm ${STATUS_CLASS[status]} ${SIZE_CLASS[size]} ${className ?? ""}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
