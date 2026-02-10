type AdminStatCardProps = {
  icon: string;
  label: string;
  value: string;
  iconClassName?: string;
  trend?: {
    value: string;
    tone: "green" | "red" | "neutral";
  };
  badge?: string;
};

const toneClasses: Record<NonNullable<AdminStatCardProps["trend"]>["tone"], string> = {
  green: "bg-green-50 text-green-500 dark:bg-green-900/10",
  red: "bg-red-50 text-red-500 dark:bg-red-900/10",
  neutral: "bg-slate-50 text-slate-400 dark:bg-slate-800",
};

const iconToneClasses: Record<NonNullable<AdminStatCardProps["trend"]>["tone"], string> = {
  green: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  red: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  neutral: "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export default function AdminStatCard({
  icon,
  label,
  value,
  iconClassName,
  trend,
  badge,
}: AdminStatCardProps) {
  const tone = trend?.tone ?? "neutral";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-xl p-2.5 ${iconToneClasses[tone]}`}>
          <span className={`material-symbols-outlined ${iconClassName ?? ""}`.trim()}>{icon}</span>
        </div>

        {trend ? (
          <span className={`flex items-center rounded-full px-2 py-1 text-[10px] font-bold uppercase ${toneClasses[trend.tone]}`}>
            <span className="material-symbols-outlined mr-1 text-xs">trending_up</span>
            {trend.value}
          </span>
        ) : null}

        {!trend && badge ? (
          <span className="rounded bg-blue-600 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">{badge}</span>
        ) : null}
      </div>

      <p className="mb-1 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">{label}</p>
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{value}</h3>
    </div>
  );
}
