"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DarkModeToggle from "./components/DarkModeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard Overview", href: "/", icon: "grid_view" },
    { name: "User Management", href: "/users", icon: "group" },
    { name: "KYC Verification", href: "/kyc", icon: "verified" },
    { name: "Transactions", href: "/transactions", icon: "description" },
    { name: "Disputes", href: "/disputes", icon: "gavel" },
  ];

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#21337e] rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
            <span className="material-symbols-outlined text-white text-lg">
              sports_esports
            </span>
          </div>
          <span className="font-black text-lg tracking-tight text-[#21337e] dark:text-white uppercase italic">
            GameMarket
          </span>
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
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 flex flex-col pt-4 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="px-6 py-4 items-center space-x-3 mb-6 hidden md:flex">
          <div className="w-10 h-10 bg-[#21337e] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <span className="material-symbols-outlined text-white text-2xl">
              sports_esports
            </span>
          </div>
          <span className="font-black text-xl tracking-tight text-[#21337e] dark:text-white uppercase italic">
            GameMarket
          </span>
        </div>

        {/* Mobile Close Button */}
        <div className="md:hidden p-4 flex justify-end">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                className={`flex items-center space-x-4 p-3.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#21337e] text-white shadow-xl shadow-blue-900/20"
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400"
                }`}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span
                  className={`material-symbols-outlined ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-bold text-sm tracking-wide">
                  {item.name}
                </span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              className={`flex items-center space-x-4 p-3.5 rounded-xl transition-all duration-200 ${
                pathname === "/settings"
                  ? "bg-[#21337e] text-white shadow-xl shadow-blue-900/20"
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400"
              }`}
              href="/settings"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span
                className={`material-symbols-outlined ${
                  pathname === "/settings" ? "text-white" : "text-slate-400"
                }`}
              >
                settings
              </span>
              <span className="font-bold text-sm tracking-wide">
                Platform Settings
              </span>
            </Link>
          </div>
        </nav>

        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 m-4 rounded-2xl border border-slate-100 dark:border-slate-800 mt-auto">
          <DarkModeToggle />
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen transition-all duration-300">
        <main className="p-4 md:p-10">{children}</main>
      </div>
    </div>
  );
}
