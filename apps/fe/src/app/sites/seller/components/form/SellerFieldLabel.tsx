"use client";

import type { ReactNode } from "react";

type SellerFieldLabelProps = {
  children: ReactNode;
};

export default function SellerFieldLabel({ children }: SellerFieldLabelProps) {
  return (
    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
      {children}
    </label>
  );
}
