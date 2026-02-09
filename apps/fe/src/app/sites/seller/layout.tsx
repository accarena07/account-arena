"use client";

import Link from "next/link";
import Image from "next/image";
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
      name: "Strategy Dashboard",
      href: "/",
      icon: "dashboard",
    },
    {
      name: "Inventory Hub",
      href: "/listings",
      icon: "layers",
    },
    {
      name: "Payout Portfolio",
      href: "/payouts",
      icon: "account_balance",
    },
    {
      name: "Compliance Check",
      href: "/verification",
      icon: "verified_user",
    },
    {
      name: "Terminal Config",
      href: "/settings",
      icon: "tune",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 min-h-screen font-sans">
      {/* Mobile Header - Premium Glassmorphism */}
      <div className="md:hidden flex items-center justify-between p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-3 text-[#254294] dark:text-white">
          <div className="w-10 h-10 rounded-xl bg-[#254294] flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
            <span className="material-symbols-outlined text-2xl font-black italic">
              bolt
            </span>
          </div>
          <h1 className="font-black text-lg tracking-tighter uppercase italic leading-none">
            Account<span className="text-[#FF7D1F]">Arena</span>
          </h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-10 h-10 flex items-center justify-center text-slate-500 bg-slate-50 dark:bg-slate-800 rounded-xl transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-2xl">
            {isSidebarOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 z-40 md:hidden backdrop-blur-sm transition-opacity duration-500 animate-in fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Precision Engineered Sidebar */}
      <aside
        className={`w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-50 transition-all duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Header Logo */}
        <div className="p-8 pb-10 hidden md:block">
          <div className="flex items-center gap-4 text-[#254294] dark:text-white group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-[#254294] flex items-center justify-center text-white shadow-2xl shadow-blue-900/40 group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-3xl font-black italic">
                bolt
              </span>
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tighter uppercase italic leading-none">
                Account<span className="text-[#FF7D1F]">Arena</span>
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1.5 italic">
                Seller Console
              </p>
            </div>
          </div>
        </div>

        {/* Store Profile Card - Sidebar Version */}
        <div className="px-6 mb-10">
          <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl p-5 flex items-center gap-4 border border-slate-100 dark:border-slate-800/50 shadow-inner group">
            <div className="relative">
              <Image
                alt="Profile"
                className="w-11 h-11 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform"
                height={44}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALL4MNDR1C_NUyFVHybHloH6M8YfbkdIvKzI7T_k4HpLXMXCc8NM-4QBx0R3I9m_02Tz8RipzypJzBzPTLLZIDpfWIRqiFiekk4-Qrlim-jRmaF9YTlmkqDMvomJT6GyT0Pf3FpD50gUGghwfff6ZLVBR8ZEErIcD86V80P5vX_eFSepUp76QmZA7wy-aCof8wlJfY78J731Ztmd2SqzeCunW0UjITbg1LQPat79T21M94UJu5Pl98o01eoWNjUdNbUxKretMb-g"
                width={44}
              />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-4 border-white dark:border-slate-900 rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-slate-800 dark:text-white leading-none italic truncate">
                Admin Store
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7D1F]"></span>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest italic leading-none">
                  Pro Tier
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const isActiveLink =
              item.href === "/"
                ? pathname === item.href
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                  isActiveLink
                    ? "bg-[#254294] text-white shadow-2xl shadow-blue-900/30 -translate-y-0.5"
                    : "text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-[#254294] dark:hover:text-blue-400"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[24px] transition-transform ${isActiveLink ? "font-black italic" : "group-hover:scale-110"}`}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-[11px] font-black uppercase tracking-[0.15em] italic ${isActiveLink ? "opacity-100" : "opacity-80"}`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Action Footer */}
        <div className="p-6 space-y-3 bg-slate-50/30 dark:bg-slate-900/30 mt-auto border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="w-full flex items-center justify-between px-5 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl text-slate-400">
                contrast
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest italic text-slate-500">
                Theme Engine
              </span>
            </div>
            <div className="w-8 h-4 bg-slate-200 dark:bg-[#254294] rounded-full relative transition-colors">
              <div className="absolute top-0.5 left-0.5 dark:left-auto dark:right-0.5 w-3 h-3 bg-white rounded-full transition-all"></div>
            </div>
          </button>

          <Link
            href="/"
            className="w-full flex items-center gap-4 px-5 py-4 text-red-500/60 hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/10 transition-all rounded-2xl"
          >
            <span className="material-symbols-outlined text-xl font-black italic">
              logout
            </span>
            <span className="text-[11px] font-black uppercase tracking-widest italic">
              Terminate
            </span>
          </Link>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main
        className={`transition-all duration-500 min-h-screen ${
          isSidebarOpen ? "blur-sm md:blur-none" : ""
        } md:ml-72 p-6 md:p-10 lg:p-14 mb-20 md:mb-0`}
      >
        <div className="animate-in fade-in duration-1000 slide-in-from-bottom-2">
          {children}
        </div>
      </main>
    </div>
  );
}
