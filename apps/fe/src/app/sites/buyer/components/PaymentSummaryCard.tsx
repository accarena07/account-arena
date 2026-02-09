import Link from "next/link";
import type { PaymentSummaryAction, PaymentSummaryRow } from "../types";

type PaymentSummaryCardProps = {
  title?: string;
  rows: PaymentSummaryRow[];
  totalLabel?: string;
  totalValue: string;
  totalValueClassName?: string;
  action?: PaymentSummaryAction;
};

export default function PaymentSummaryCard({
  title = "Rincian Pembayaran",
  rows,
  totalLabel = "Total Bayar",
  totalValue,
  totalValueClassName = "text-secondary",
  action,
}: PaymentSummaryCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
      <div className="flex items-center gap-2 border-b border-slate-100 p-6 dark:border-slate-700">
        <span className="material-symbols-outlined text-primary">payments</span>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <div className="space-y-4 p-6">
        {rows.map((row) => (
          <div className="flex items-center justify-between text-sm" key={row.label}>
            <span className="text-slate-500 dark:text-slate-400">{row.label}</span>
            <span className={`font-bold ${row.valueClassName ?? ""}`.trim()}>{row.value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
          <span className="text-sm font-bold tracking-wider uppercase">{totalLabel}</span>
          <span className={`text-2xl font-extrabold ${totalValueClassName}`}>{totalValue}</span>
        </div>
        {action ? (
          <div className="pt-4">
            {action.href ? (
              <Link className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-extrabold transition-all ${action.className}`} href={action.href}>
                {action.icon ? <span className="material-symbols-outlined text-xl">{action.icon}</span> : null}
                {action.label}
              </Link>
            ) : (
              <button className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-extrabold transition-all ${action.className}`} type="button">
                {action.icon ? <span className="material-symbols-outlined text-xl">{action.icon}</span> : null}
                {action.label}
              </button>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
