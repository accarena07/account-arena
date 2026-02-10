"use client";

import type { ReactNode } from "react";

type SellerSectionCardProps = {
  children: ReactNode;
  className?: string;
};

export default function SellerSectionCard({
  children,
  className = "",
}: SellerSectionCardProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

