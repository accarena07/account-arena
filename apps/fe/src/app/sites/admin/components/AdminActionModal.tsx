"use client";

import type { ReactNode } from "react";

type AdminActionModalProps = {
  open: boolean;
  title: string;
  description?: string;
  tone?: "default" | "danger";
  confirmLabel?: string;
  cancelLabel?: string;
  onClose: () => void;
  onConfirm?: () => void;
  children?: ReactNode;
};

export default function AdminActionModal({
  open,
  title,
  description,
  tone = "default",
  confirmLabel = "Simpan",
  cancelLabel = "Batal",
  onClose,
  onConfirm,
  children,
}: AdminActionModalProps) {
  if (!open) return null;

  const confirmClassName =
    tone === "danger"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-[#21337e] text-white hover:bg-blue-900";

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        aria-label="Close modal backdrop"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-start justify-between border-b border-slate-100 p-6 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
            {description ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
          </div>
          <button
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {children ? <div className="space-y-4 p-6">{children}</div> : null}

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 p-6 dark:border-slate-800">
          <button
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={onClose}
            type="button"
          >
            {cancelLabel}
          </button>
          {onConfirm ? (
            <button className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${confirmClassName}`} onClick={onConfirm} type="button">
              {confirmLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
