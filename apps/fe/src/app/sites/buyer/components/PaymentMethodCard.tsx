import type { PaymentMethodInfo } from "../types";

type PaymentMethodCardProps = PaymentMethodInfo;

export default function PaymentMethodCard({
  methodName,
  methodSubtitle,
  methodSubtitleClassName,
  bankCode = "BCA",
  accountLabel = "Nomor VA",
  accountNumber,
  infoText,
}: PaymentMethodCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
      <div className="flex items-center gap-2 border-b border-slate-100 p-6 dark:border-slate-700">
        <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
        <h2 className="text-lg font-bold">Metode Pembayaran</h2>
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-12 items-center justify-center rounded border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-700">
              <span className="text-[10px] font-black italic text-blue-900 dark:text-blue-400">{bankCode}</span>
            </div>
            <div>
              <p className="text-sm font-bold">{methodName}</p>
              <p className={`text-xs text-slate-500 ${methodSubtitleClassName ?? ""}`.trim()}>{methodSubtitle}</p>
            </div>
          </div>
        </div>

        {accountNumber ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/60">
            <p className="mb-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{accountLabel}</p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg font-extrabold text-primary">{accountNumber}</span>
              <button className="p-1 text-primary hover:text-blue-700" type="button">
                <span className="material-symbols-outlined text-[20px]">content_copy</span>
              </button>
            </div>
          </div>
        ) : null}

        {infoText ? (
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <span className="material-symbols-outlined text-sm text-blue-600">info</span>
            <p className="text-[11px] text-blue-700 dark:text-blue-300">{infoText}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
