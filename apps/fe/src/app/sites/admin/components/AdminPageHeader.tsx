import Image from "next/image";

type AdminPageHeaderProps = {
  title: string;
  description: string;
  searchPlaceholder?: string;
};

export default function AdminPageHeader({
  title,
  description,
  searchPlaceholder,
}: AdminPageHeaderProps) {
  return (
    <header className="mb-10 flex flex-col items-start justify-between gap-6 xl:flex-row">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 md:text-base">{description}</p>
      </div>

      <div className="flex w-full flex-col items-center gap-4 xl:w-auto md:flex-row">
        {searchPlaceholder ? (
          <div className="relative w-full md:w-auto">
            <span className="material-symbols-outlined absolute top-2.5 left-3 text-xl text-slate-400">search</span>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 md:w-72"
              placeholder={searchPlaceholder}
              type="text"
            />
          </div>
        ) : null}

        <div className="flex w-full items-center justify-between gap-4 md:w-auto">
          <button className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <span className="material-symbols-outlined text-2xl">notifications</span>
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-900" />
          </button>
          <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-800 md:block" />
          <div className="ml-auto flex items-center gap-3 md:ml-0">
            <div className="hidden text-right md:block">
              <p className="text-sm leading-tight font-bold text-slate-900 dark:text-white">Admin Store</p>
              <p className="text-[11px] font-medium tracking-tight text-slate-500 uppercase">Super Admin</p>
            </div>
            <div className="relative">
              <Image
                alt="Admin"
                className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
                height={40}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiIW9mGAm-LRo-keYX2PsC1g5aOR0BOHwtIILYkiprP0worCQhRZ2FM0Xydk-ZVfgWLSyvxaVCPUKeYxvG_VW3nA5lCdcsWl0QzDgRix_OPHfa5dDY592XYzFYB5ulkKLe6PiBfp2dZ0Jn2NqO3edYQdV2YA-ZyPlYzenzWlETxN_ulMGpmTZFUc91yk5K31_ecA1XHdOouW7WleeXJy-l4wRCXYqlTpOtxojX316nXiG5P0YXbF-883PfXIsjSJGrQY_5gswWJg"
                width={40}
              />
              <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
