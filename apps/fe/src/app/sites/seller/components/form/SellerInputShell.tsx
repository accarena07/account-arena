"use client";

import type { ReactNode } from "react";

type SellerInputShellProps = {
  children: ReactNode;
  className?: string;
};

export default function SellerInputShell({
  children,
  className = "",
}: SellerInputShellProps) {
  return (
    <div
      className={`rounded-[1.25rem] bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 shadow-inner transition-all ${className}`}
    >
      {children}
    </div>
  );
}

