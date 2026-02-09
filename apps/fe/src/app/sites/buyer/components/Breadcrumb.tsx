import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      className={`mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 ${className}`.trim()}
    >
      {items.map((item, idx) => (
        <div className="flex items-center gap-2" key={`${item.label}-${idx}`}>
          {idx > 0 ? <span className="material-symbols-outlined text-xs">chevron_right</span> : null}
          {item.href ? (
            <Link className="transition-colors hover:text-primary" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-900 dark:text-slate-100">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
