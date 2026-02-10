import type { ReactNode } from "react";
import SellerBreadcrumb from "./SellerBreadcrumb";

type SellerHeaderBreadcrumbItem = {
  label: string;
  href?: string;
};

type SellerPageHeaderProps = {
  breadcrumbs: SellerHeaderBreadcrumbItem[];
  title: string;
  subtitle: ReactNode;
  rightContent?: ReactNode;
  leading?: ReactNode;
  align?: "center" | "start";
};

export default function SellerPageHeader({
  breadcrumbs,
  title,
  subtitle,
  rightContent,
  leading,
  align = "start",
}: SellerPageHeaderProps) {
  const headerClass =
    align === "center"
      ? "mb-10 flex flex-col items-center justify-between gap-6 md:flex-row"
      : "mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center";

  return (
    <>
      <SellerBreadcrumb items={breadcrumbs} />
      <header className={headerClass}>
        <div className="w-full md:w-auto">
          <div className={leading ? "flex items-center gap-5" : undefined}>
            {leading}
            <div>
              <h2 className="text-2xl font-black leading-tight tracking-tight uppercase italic text-slate-900 dark:text-white md:text-3xl">
                {title}
              </h2>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest italic text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
        {rightContent}
      </header>
    </>
  );
}
