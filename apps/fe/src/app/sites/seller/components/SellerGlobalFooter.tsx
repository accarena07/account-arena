type SellerFooterLink = {
  label: string;
  href?: string;
};

type SellerGlobalFooterProps = {
  links: SellerFooterLink[];
  statusText: string;
  copyright: string;
  className?: string;
};

export default function SellerGlobalFooter({
  links,
  statusText,
  copyright,
  className,
}: SellerGlobalFooterProps) {
  return (
    <footer
      className={`mb-20 mt-20 flex flex-col items-center gap-8 border-t border-slate-100 pt-10 text-[10px] font-black uppercase tracking-[0.2em] italic text-slate-400 dark:border-slate-800 dark:text-slate-500 md:mb-10 ${className ?? ""}`}
    >
      <div className="flex flex-col items-center gap-8 text-center md:flex-row">
        {links.map((item) => (
          <a
            key={item.label}
            href={item.href ?? "#"}
            className="transition-colors hover:text-[#254294]"
          >
            {item.label}
          </a>
        ))}
        <div className="flex items-center gap-3 text-[#254294] dark:text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          {statusText}
        </div>
      </div>
      <div className="text-center">{copyright}</div>
    </footer>
  );
}
