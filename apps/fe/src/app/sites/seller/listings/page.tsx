"use client";

import React from "react";
import Link from "next/link";

export default function MyListingsPage() {
  const listings = [
    {
      id: 1,
      title: "Mythic Glory | 250 Skins | All Heroes",
      game: "Mobile Legends",
      level: "Level 80",
      price: "$145.00",
      status: "Active",
      statusColor:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRD4wuYwoRj7MqlKl4a5Afz6yv9QEKmFQFdy5qED5W21gUX1wlbedM6txU6wpuhKgKBZeUEE2CEpVZOVvinebCMQQf_4a4ibCBCOev0tLTla95lRVo4niUZ-i35VS7uxnDKv9KuoPwrVsTQEch-nl7Eh2iMvc9YlYEE-7ZmXXrCUJedrEXHpyAFJ-ajS_H3jJ5Vjh9g4xO7S9CgcQI55TFMQXl1LtvO5645ZPxYxcAXH82h6eGkqDhz_AX9LudYIvo3mjdgaVVoA",
    },
    {
      id: 2,
      title: "Immortal 3 | Prime Vandal | Reaver Knife",
      game: "VALORANT",
      level: "Level 142",
      price: "$210.00",
      status: "Sold",
      statusColor:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCf4Lolu7AaB5TUEdIMRZ4h_DQI6WzNEQrQxsZEBCk1JzY7DWzfzJKETqdXyhkebHh1pqdHT9Vpe6bodaSRk0euMGEbZMI6xp41f9vhHtszvWKIGf8kgKhpt07cBRewLawS07jV98_xjPbM3Rj0JIqV6fKXpwUdMG7JF1EztlnrChl_Fhs-ee2OZHRshfGHP8ukzZvY-L8VgPo2hIadBsrzw-ZZQlTqeHMUj4s3AMvgYcIY5kdpN6S9lQd7hMdqEvSTcaeoRtT8Tw",
    },
    {
      id: 3,
      title: "AR 60 | C6 Raiden | 15x 5-Star Weapons",
      game: "Genshin Impact",
      level: "Asia Server",
      price: "$380.00",
      status: "Draft",
      statusColor:
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDXSU_g8hdwk_O6PMbzrBwRxJ45D-AjTy4iY1Lve93ORqADtDVcW3zKi1uKXOvL0kO5pZY6PSazIsOP-1d0T-baxWb1aqg0BWhqk-gWnBaG5MX6jkHlrQATaAzvPilqj-g51WFQqowKaEG6mFAre1dVtgjtCT5g4_jVGnbdFuwMt_0lfDRYrll6jtPzNvNfKV_iynDxoNRApRWZyV4jL_xn9N7NYWBGDZwp7OHmxXXX6EaiW-xOjrz0kmjEqi1qn80C8hddqoQF_Q",
    },
  ];

  return (
    <div className="flex-1 max-w-[1200px] mx-auto w-full">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            My Listings
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Manage and monitor your game account listings
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/sites/seller/listings/new"
            className="bg-[#254294] hover:bg-blue-900 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-[#254294]/20 flex items-center gap-2 transition-all text-sm"
          >
            <span className="material-symbols-outlined font-bold text-lg">
              add
            </span>
            Create New Listing
          </Link>
          <div className="hidden md:flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">
                Admin Store
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Premium Seller
              </p>
            </div>
            <img
              alt="Profile"
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuALL4MNDR1C_NUyFVHybHloH6M8YfbkdIvKzI7T_k4HpLXMXCc8NM-4QBx0R3I9m_02Tz8RipzypJzBzPTLLZIDpfWIRqiFiekk4-Qrlim-jRmaF9YTlmkqDMvomJT6GyT0Pf3FpD50gUGghwfff6ZLVBR8ZEErIcD86V80P5vX_eFSepUp76QmZA7wy-aCof8wlJfY78J731Ztmd2SqzeCunW0UjITbg1LQPat79T21M94UJu5Pl98o01eoWNjUdNbUxKretMb-g"
            />
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200 dark:border-slate-800 mb-8">
        <button className="pb-3 text-[#254294] border-b-[3px] border-[#254294] font-bold text-sm">
          All (24)
        </button>
        <button className="pb-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 font-medium text-sm transition-colors">
          Active (12)
        </button>
        <button className="pb-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 font-medium text-sm transition-colors">
          Sold (8)
        </button>
        <button className="pb-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 font-medium text-sm transition-colors">
          Draft (4)
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
            search
          </span>
          <input
            className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-[#254294] focus:border-[#254294] outline-none transition-all dark:text-white text-sm placeholder:text-slate-400"
            placeholder="Search by title or game..."
            type="text"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold outline-none dark:text-white cursor-pointer hover:border-slate-300 transition-colors min-w-[140px]">
              <option>All Games</option>
              <option>Mobile Legends</option>
              <option>Genshin Impact</option>
              <option>VALORANT</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xl">
              expand_more
            </span>
          </div>
          <button className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-200">
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Game Account
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {listings.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
              >
                <td className="px-6 py-4 w-[45%]">
                  <div className="flex items-center gap-4">
                    <img
                      alt={item.game}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-100 dark:border-slate-700"
                      src={item.image}
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {item.game} • {item.level}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-[#FF7D1F] text-sm">
                    {item.price}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 ${item.statusColor} text-[10px] font-bold rounded-md uppercase tracking-wide inline-block min-w-[60px] text-center`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    {item.status === "Active" && (
                      <>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-[#254294] transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-[#FF7D1F] transition-colors"
                          title="Promote"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            auto_awesome
                          </span>
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </>
                    )}
                    {item.status === "Sold" && (
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-[#254294] transition-colors"
                        title="View Details"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          visibility
                        </span>
                      </button>
                    )}
                    {item.status === "Draft" && (
                      <>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-[#254294] transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing{" "}
            <span className="font-bold text-slate-800 dark:text-white">
              1-10
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-800 dark:text-white">24</span>{" "}
            listings
          </p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled
            >
              Previous
            </button>
            <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
