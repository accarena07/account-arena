import type { ReactNode } from "react";

type AdminTableCardProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AdminTableCard({
  title,
  description,
  actions,
  children,
  footer,
}: AdminTableCardProps) {
  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-50 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:p-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
          {description ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
        </div>
        {actions ? <div className="flex w-full items-center gap-3 md:w-auto">{actions}</div> : null}
      </div>
      {children}
      {footer ? <div className="border-t border-slate-50 bg-slate-50/30 px-8 py-6 dark:border-slate-800 dark:bg-slate-800/20">{footer}</div> : null}
    </section>
  );
}
