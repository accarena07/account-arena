export type AdminStatus =
  | "active"
  | "suspended"
  | "pending_review"
  | "approved"
  | "rejected"
  | "success"
  | "pending"
  | "refunded"
  | "open"
  | "under_review"
  | "resolved";

type AdminStatusBadgeProps = {
  status: AdminStatus;
  size?: "sm" | "md";
  pulse?: boolean;
};

const statusConfig: Record<
  AdminStatus,
  { label: string; className: string; dotClassName: string }
> = {
  active: {
    label: "Active",
    className:
      "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    dotClassName: "bg-green-500",
  },
  suspended: {
    label: "Suspended",
    className: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    dotClassName: "bg-red-500",
  },
  pending_review: {
    label: "Pending Review",
    className:
      "bg-orange-50 text-orange-600 border border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
    dotClassName: "bg-orange-500",
  },
  approved: {
    label: "Approved",
    className:
      "bg-green-50 text-green-600 border border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
    dotClassName: "bg-green-500",
  },
  rejected: {
    label: "Rejected",
    className:
      "bg-red-50 text-red-600 border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
    dotClassName: "bg-red-500",
  },
  success: {
    label: "Success",
    className:
      "bg-green-50 text-green-600 border border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
    dotClassName: "bg-green-500",
  },
  pending: {
    label: "Pending",
    className:
      "bg-orange-50 text-orange-600 border border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
    dotClassName: "bg-orange-500",
  },
  refunded: {
    label: "Refunded",
    className:
      "bg-red-50 text-red-600 border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
    dotClassName: "bg-red-500",
  },
  open: {
    label: "Open",
    className:
      "bg-orange-50 text-orange-600 border border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
    dotClassName: "bg-orange-500",
  },
  under_review: {
    label: "Under Review",
    className:
      "bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
    dotClassName: "bg-blue-500",
  },
  resolved: {
    label: "Resolved",
    className:
      "bg-green-50 text-green-600 border border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
    dotClassName: "bg-green-500",
  },
};

export default function AdminStatusBadge({
  status,
  size = "md",
  pulse = false,
}: AdminStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full uppercase italic ${
        size === "sm"
          ? "px-3 py-1 text-[10px] font-black tracking-wider"
          : "px-3 py-1 text-[11px] font-black"
      } ${config.className}`.trim()}
    >
      <span
        className={`mr-2 h-1.5 w-1.5 rounded-full ${config.dotClassName} ${
          pulse ? "animate-pulse shadow-[0_0_8px_currentColor]" : ""
        }`.trim()}
      />
      {config.label}
    </span>
  );
}
