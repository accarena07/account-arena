import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type SellerBreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function SellerBreadcrumb({ items }: SellerBreadcrumbProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-black uppercase tracking-widest italic text-slate-400">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={`${item.label}-${idx}`} className="flex items-center gap-2">
            {isLast ? (
              <span className="text-[#254294] dark:text-blue-400">{item.label}</span>
            ) : item.href ? (
              <Link href={item.href} className="transition-colors hover:text-slate-600">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {!isLast ? (
              <span className="material-symbols-outlined text-xs font-black">chevron_right</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
