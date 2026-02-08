"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Sales Overview",
      href: "/sites/seller",
      icon: "grid_view",
    },
    {
      name: "My Listings",
      href: "/sites/seller/listings",
      icon: "inventory_2",
    },
    {
      name: "Payouts",
      href: "/sites/seller/payouts",
      icon: "payments",
    },
    {
      name: "Seller Verification",
      href: "/sites/seller/verification",
      icon: "verified_user",
    },
    {
      name: "Store Settings",
      href: "/sites/seller/settings",
      icon: "settings",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-20 transition-all">
        {/* Header Logo */}
        <div className="p-6 pb-2">
          <div className="flex items-center gap-2 text-[#254294] dark:text-white">
            <span className="material-symbols-outlined text-3xl font-bold">
              sports_esports
            </span>
            <h1 className="font-extrabold text-xl tracking-tight">
              GameMarket
            </h1>
          </div>
        </div>

        {/* Store Profile Card */}
        <div className="px-4 mb-2">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 flex items-center gap-3 border border-slate-100 dark:border-slate-700/50">
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-xl">
                storefront
              </span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">
                Seller Center
              </p>
              <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">
                Admin Store
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            // Special handling for exact match on root /sites/seller to avoid highlighting it when on subpages unless we want that?
            // Actually usually we want exact match for dashboard if others are sub-routes.
            // Let's refine:
            const isActiveLink =
              item.href === "/sites/seller"
                ? pathname === item.href
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm ${
                  isActiveLink
                    ? "bg-[#254294] text-white shadow-lg shadow-blue-900/20"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-6 space-y-1">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors rounded-xl text-sm font-bold"
            onClick={() => document.documentElement.classList.toggle("dark")}
          >
            <span className="material-symbols-outlined text-[20px]">
              dark_mode
            </span>
            Toggle Theme
          </button>
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 text-[#FF7D1F] hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors rounded-xl text-sm font-bold"
          >
            <span className="material-symbols-outlined text-[20px]">
              swap_horiz
            </span>
            Switch to Buyer
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
