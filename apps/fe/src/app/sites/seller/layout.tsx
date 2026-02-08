"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="flex items-center gap-2 text-[#254294] dark:text-white">
          <span className="material-symbols-outlined text-2xl font-bold">
            sports_esports
          </span>
          <h1 className="font-extrabold text-lg tracking-tight">GameMarket</h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Header Logo */}
        <div className="p-6 pb-2 hidden md:block">
          <div className="flex items-center gap-2 text-[#254294] dark:text-white">
            <span className="material-symbols-outlined text-3xl font-bold">
              sports_esports
            </span>
            <h1 className="font-extrabold text-xl tracking-tight">
              GameMarket
            </h1>
          </div>
        </div>

        {/* Mobile Close Button (Optional, but good for UX) */}
        <div className="md:hidden p-4 flex justify-end">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Store Profile Card */}
        <div className="px-4 mb-2 mt-2 md:mt-0">
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
        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            // Refined active logic
            const isActiveLink =
              item.href === "/sites/seller"
                ? pathname === item.href
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile nav
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
        <div className="p-6 space-y-1 border-t border-slate-100 dark:border-slate-800 mt-auto">
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
      <main className="md:ml-64 p-4 md:p-8 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
