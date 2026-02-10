"use client";

import Link from "next/link";
import Image from "next/image";
import { sellerListings, sellerListingTabs } from "../data/listings";
import SellerGlobalFooter from "../components/SellerGlobalFooter";
import SellerPageHeader from "../components/SellerPageHeader";
import SellerProfileInfo from "../components/SellerProfileInfo";
import SellerStatusBadge from "../components/SellerStatusBadge";

export default function MyListingsPage() {
  return (
    <div className="flex-1 max-w-6xl mx-auto w-full">
      <SellerPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "My Listings" },
        ]}
        title="My Listings"
        subtitle={
          <>
            Manage & monitor your{" "}
            <span className="text-[#254294] dark:text-blue-400">game assets</span>
          </>
        }
        rightContent={
          <div className="flex w-full items-center justify-between gap-6 border-t border-slate-100 pt-6 md:w-auto md:justify-end md:border-t-0 md:pt-0 dark:border-slate-800">
          <Link
            href="/listings/new"
            className="bg-[#254294] hover:bg-blue-900 text-white px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest italic shadow-xl shadow-blue-900/10 flex items-center gap-3 transition-all text-[10px] hover:scale-105 active:scale-95"
          >
            <span className="material-symbols-outlined font-black text-lg">
              add_circle
            </span>
            Create New Listing
          </Link>
          <div className="hidden border-l border-slate-200 pl-6 dark:border-slate-800 sm:flex">
            <SellerProfileInfo />
          </div>
        </div>
        }
      />

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800 mb-10">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide pb-0.5">
          {sellerListingTabs.map((tab, idx) => (
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
          <div className="relative group min-w-40 flex-1 sm:flex-none">
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
              {sellerListings.map((item) => (
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
                    <SellerStatusBadge
                      status={item.statusKind}
                      label={item.status}
                      className="animate-pulse"
                    />
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
          {sellerListings.map((item) => (
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
                  <SellerStatusBadge
                    status={item.statusKind}
                    label={item.status}
                    size="xs"
                    className="mb-2"
                  />
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

      <SellerGlobalFooter
        copyright="© 2024 AccountArena • Premium Gaming Marketplace • All Rights Reserved"
        links={[
          { label: "Safety Guide" },
          { label: "Seller Protection" },
          { label: "Terms of Service" },
        ]}
        statusText="Global Systems Active"
      />
    </div>
  );
}
