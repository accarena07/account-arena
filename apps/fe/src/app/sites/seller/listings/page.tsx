"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function MyListingsPage() {
  const listings = [
    {
      id: 1,
      title: "Mythic Glory | 250 Skins | All Heroes",
      game: "Mobile Legends",
      level: "Level 80",
      price: "Rp 1.500.000",
      status: "Active",
      statusColor:
        "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200/50 dark:border-green-500/20",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRD4wuYwoRj7MqlKl4a5Afz6yv9QEKmFQFdy5qED5W21gUX1wlbedM6txU6wpuhKgKBZeUEE2CEpVZOVvinebCMQQf_4a4ibCBCOev0tLTla95lRVo4niUZ-i35VS7uxnDKv9KuoPwrVsTQEch-nl7Eh2iMvc9YlYEE-7ZmXXrCUJedrEXHpyAFJ-ajS_H3jJ5Vjh9g4xO7S9CgcQI55TFMQXl1LtvO5645ZPxYxcAXH82h6eGkqDhz_AX9LudYIvo3mjdgaVVoA",
    },
    {
      id: 2,
      title: "Immortal 3 | Prime Vandal | Reaver Knife",
      game: "VALORANT",
      level: "Level 142",
      price: "Rp 2.100.000",
      status: "Sold",
      statusColor:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-500/20",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCf4Lolu7AaB5TUEdIMRZ4h_DQI6WzNEQrQxsZEBCk1JzY7DWzfzJKETqdXyhkebHh1pqdHT9Vpe6bodaSRk0euMGEbZMI6xp41f9vhHtszvWKIGf8kgKhpt07cBRewLawS07jV98_xjPbM3Rj0JIqV6fKXpwUdMG7JF1EztlnrChl_Fhs-ee2OZHRshfGHP8ukzZvY-L8VgPo2hIadBsrzw-ZZQlTqeHMUj4s3AMvgYcIY5kdpN6S9lQd7hMdqEvSTcaeoRtT8Tw",
    },
    {
      id: 3,
      title: "AR 60 | C6 Raiden | 15x 5-Star Weapons",
      game: "Genshin Impact",
      level: "Asia Server",
      price: "Rp 3.800.000",
      status: "Draft",
      statusColor:
        "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200/50 dark:border-slate-800",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDXSU_g8hdwk_O6PMbzrBwRxJ45D-AjTy4iY1Lve93ORqADtDVcW3zKi1uKXOvL0kO5pZY6PSazIsOP-1d0T-baxWb1aqg0BWhqk-gWnBaG5MX6jkHlrQATaAzvPilqj-g51WFQqowKaEG6mFAre1dVtgjtCT5g4_jVGnbdFuwMt_0lfDRYrll6jtPzNvNfKV_iynDxoNRApRWZyV4jL_xn9N7NYWBGDZwp7OHmxXXX6EaiW-xOjrz0kmjEqi1qn80C8hddqoQF_Q",
    },
  ];

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 italic">
        <Link
          href="/"
          className="hover:text-slate-600 transition-colors"
        >
          Dashboard
        </Link>
        <span className="material-symbols-outlined text-xs font-black">
          chevron_right
        </span>
        <span className="text-[#254294] dark:text-blue-400">My Listings</span>
      </div>

      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div className="w-full md:w-auto">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight uppercase italic tracking-tight">
            My Listings
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-[11px] font-bold uppercase tracking-widest italic">
            Manage & monitor your{" "}
            <span className="text-[#254294] dark:text-blue-400">
              game assets
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
          <Link
            href="/listings/new"
            className="bg-[#254294] hover:bg-blue-900 text-white px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest italic shadow-xl shadow-blue-900/10 flex items-center gap-3 transition-all text-[10px] hover:scale-105 active:scale-95"
          >
            <span className="material-symbols-outlined font-black text-lg">
              add_circle
            </span>
            Create New Listing
          </Link>
          <div className="hidden sm:flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-800">
            <div className="text-right">
              <p className="text-sm font-black text-slate-800 dark:text-white leading-none italic">
                Admin Store
              </p>
              <p className="text-[10px] text-slate-400 font-black uppercase italic mt-1.5 tracking-widest">
                Premium Seller
              </p>
            </div>
            <Image
              alt="Profile"
              className="w-11 h-11 rounded-full border-2 border-[#254294]/20 shadow-sm object-cover"
              height={44}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuALL4MNDR1C_NUyFVHybHloH6M8YfbkdIvKzI7T_k4HpLXMXCc8NM-4QBx0R3I9m_02Tz8RipzypJzBzPTLLZIDpfWIRqiFiekk4-Qrlim-jRmaF9YTlmkqDMvomJT6GyT0Pf3FpD50gUGghwfff6ZLVBR8ZEErIcD86V80P5vX_eFSepUp76QmZA7wy-aCof8wlJfY78J731Ztmd2SqzeCunW0UjITbg1LQPat79T21M94UJu5Pl98o01eoWNjUdNbUxKretMb-g"
              width={44}
            />
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800 mb-10">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide pb-0.5">
          {[
            { label: "All Listings", count: 24, active: true },
            { label: "Active", count: 12 },
            { label: "Sold Out", count: 8 },
            { label: "Drafts", count: 4 },
          ].map((tab, idx) => (
            <button
              key={idx}
              className={`flex items-center gap-2 pb-4 border-b-2 transition-all whitespace-nowrap min-w-fit group ${
                tab.active
                  ? "border-[#254294] text-[#254294] dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600"
              }`}
            >
              <span className="font-black text-[11px] uppercase tracking-widest italic">
                {tab.label}
              </span>
              <span
                className={`px-2 py-0.5 rounded-lg text-[9px] font-black italic transition-colors ${
                  tab.active
                    ? "bg-[#254294] text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-slate-200"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10 items-stretch">
        <div className="relative flex-1 group">
          <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#254294] transition-colors italic">
            search_insights
          </span>
          <input
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-[#254294]/5 focus:border-[#254294] outline-none dark:text-white font-bold text-sm placeholder:text-slate-300 transition-all shadow-sm italic"
            placeholder="Search by title, game, or account keywords..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
          <div className="relative group min-w-[160px] flex-1 sm:flex-none">
            <select className="appearance-none w-full pl-6 pr-12 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest italic outline-none dark:text-white cursor-pointer hover:border-[#254294] transition-all shadow-sm">
              <option>Filter by Game</option>
              <option>Mobile Legends</option>
              <option>VALORANT</option>
              <option>Genshin Impact</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#254294] pointer-events-none transition-colors">
              unfold_more
            </span>
          </div>
          <button className="flex-1 sm:flex-none px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest italic flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-200 shadow-sm active:scale-95 group">
            <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">
              tune
            </span>
            Advanced
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-12 group/container">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  Listing Overview
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  Pricing Tag
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  Current Status
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-right">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {listings.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-all group/row"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="relative group/img">
                        <Image
                          alt={item.game}
                          className="w-16 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 dark:border-slate-700 shrink-0 shadow-sm group-hover/img:scale-110 transition-transform duration-500"
                          height={48}
                          src={item.image}
                          width={64}
                        />
                        <div className="absolute inset-0 bg-[#254294]/10 opacity-0 group-hover/img:opacity-100 transition-opacity rounded-xl"></div>
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white text-base mb-1 italic tracking-tight group-hover/row:text-[#254294] transition-colors line-clamp-1">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">
                            {item.game}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">
                            {item.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-black text-[#FF7D1F] text-lg italic tracking-tight">
                      {item.price}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div
                      className={`px-4 py-1.5 rounded-xl border ${item.statusColor} text-[10px] font-black uppercase tracking-widest italic inline-flex items-center gap-2 shadow-sm`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                      {item.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 hover:text-[#254294] hover:bg-white dark:hover:bg-slate-700 transition-all border border-transparent hover:border-slate-100 shadow-sm group/btn active:scale-90">
                        <span className="material-symbols-outlined text-xl italic font-black group-hover:rotate-12 transition-transform">
                          edit_note
                        </span>
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-700 transition-all border border-transparent hover:border-slate-100 shadow-sm group/btn active:scale-90">
                        <span className="material-symbols-outlined text-xl italic font-black">
                          delete_forever
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View / Card View */}
        <div className="lg:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {listings.map((item) => (
            <div
              key={item.id}
              className="p-6 space-y-6 hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-all"
            >
              <div className="flex gap-5">
                <Image
                  alt={item.game}
                  className="w-24 h-20 rounded-2xl object-cover bg-slate-100 border border-slate-200 dark:border-slate-800 shrink-0 shadow-sm"
                  height={80}
                  src={item.image}
                  width={96}
                />
                <div className="flex-1 min-w-0">
                  <div
                    className={`px-3 py-1 rounded-lg border ${item.statusColor} text-[8px] font-black uppercase tracking-widest italic inline-flex items-center gap-1.5 mb-2`}
                  >
                    <span className="w-1 h-1 rounded-full bg-current animate-pulse"></span>
                    {item.status}
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white text-base mb-1 italic tracking-tight line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                    {item.game} • {item.level}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-1">
                    Asking Price
                  </p>
                  <span className="font-black text-[#FF7D1F] text-xl italic tracking-tight">
                    {item.price}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 active:scale-90 transition-transform">
                    <span className="material-symbols-outlined italic font-black">
                      edit
                    </span>
                  </button>
                  <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 active:scale-90 transition-transform">
                    <span className="material-symbols-outlined italic font-black">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Pagination */}
        <div className="px-8 py-6 bg-slate-50/30 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic text-center md:text-left">
            Displaying{" "}
            <span className="text-slate-900 dark:text-white">1 - 10</span> of{" "}
            <span className="text-slate-900 dark:text-white">24</span> active
            listings
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest italic text-slate-400 opacity-50 cursor-not-allowed"
              disabled
            >
              Prev
            </button>
            <div className="flex items-center px-1">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`w-10 h-10 rounded-xl text-[10px] font-black italic transition-all ${
                    p === 1
                      ? "bg-[#254294] text-white shadow-lg shadow-blue-900/10 scale-105"
                      : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest italic text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Global Footer Info */}
      <footer className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic mb-20 md:mb-10">
        <div className="flex flex-col md:flex-row items-center gap-8 text-center">
          <a href="#" className="hover:text-[#254294] transition-colors">
            Safety Guide
          </a>
          <a href="#" className="hover:text-[#254294] transition-colors">
            Seller Protection
          </a>
          <a href="#" className="hover:text-[#254294] transition-colors">
            Terms of Service
          </a>
          <div className="flex items-center gap-3 text-[#254294] dark:text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Global Systems Active
          </div>
        </div>
        <div className="text-center">
          © 2024 AccountArena • Premium Gaming Marketplace • All Rights Reserved
        </div>
      </footer>
    </div>
  );
}
