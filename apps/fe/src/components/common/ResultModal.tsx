"use client";

import Link from "next/link";

export type ResultModalVariant = "success" | "error";

type ResultModalProps = {
  isOpen: boolean;
  variant: ResultModalVariant;
  title: string;
  message: string;
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  onClose: () => void;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
};

const variantStyles: Record<
  ResultModalVariant,
  {
    icon: string;
    iconColor: string;
    iconBg: string;
  }
> = {
  success: {
    icon: "check_circle",
    iconColor: "text-green-500",
    iconBg: "bg-green-100 dark:bg-green-900/30",
  },
  error: {
    icon: "error",
    iconColor: "text-red-500",
    iconBg: "bg-red-100 dark:bg-red-900/30",
  },
};

export default function ResultModal({
  isOpen,
  variant,
  title,
  message,
  primaryActionLabel,
  onPrimaryAction,
  onClose,
  secondaryActionLabel,
  secondaryActionHref,
}: ResultModalProps) {
  const selected = variantStyles[variant];

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <button
        aria-label="Close modal"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />
      <div className="relative w-full max-w-sm rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${selected.iconBg}`}>
          <span className={`material-symbols-outlined text-4xl ${selected.iconColor}`}>{selected.icon}</span>
        </div>

        <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">{message}</p>

        <div className="space-y-3">
          <button
            className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 hover:bg-blue-800"
            onClick={onPrimaryAction}
            type="button"
          >
            {primaryActionLabel}
          </button>

          {secondaryActionLabel && secondaryActionHref ? (
            <Link className="block text-sm font-semibold text-primary hover:underline dark:text-blue-400" href={secondaryActionHref}>
              {secondaryActionLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

