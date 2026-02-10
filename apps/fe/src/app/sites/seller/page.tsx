"use client";

import Link from "next/link";
import {
  sellerDashboardStats,
  sellerInventorySnapshot,
} from "./data/dashboard";
import SellerGlobalFooter from "./components/SellerGlobalFooter";
import SellerPageHeader from "./components/SellerPageHeader";
import SellerProfileInfo from "./components/SellerProfileInfo";
import SellerSearchInput from "./components/SellerSearchInput";
import SellerUtilityButtons from "./components/SellerUtilityButtons";

export default function SellerDashboardPage() {
  return (
    <div className="flex-1 max-w-6xl mx-auto w-full">
      <header className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row">
        <SellerSearchInput
          icon="manage_search"
          placeholder="Search orders or listings..."
        />
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <SellerUtilityButtons />
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>
          <div className="flex items-center gap-3 pl-2 ml-auto sm:ml-0">
            <SellerProfileInfo />
          </div>
        </div>
      </header>

      <SellerPageHeader
        align="center"
        breadcrumbs={[{ label: "Dashboard Overview" }]}
        title="Dashboard Overview"
        subtitle={
          <>
            Monitor your performance & manage{" "}
            <span className="text-slate-900 dark:text-white">
              daily operations
            </span>
          </>
        }
        rightContent={
          <Link
            href="/listings/new"
            className="flex w-full items-center justify-center gap-4 rounded-2xl bg-[#254294] px-10 py-4.5 text-xs font-black uppercase tracking-widest italic text-white shadow-2xl shadow-blue-900/20 transition-all hover:scale-[1.02] hover:bg-blue-900 active:scale-95 md:w-auto"
          >
            <span className="material-symbols-outlined text-[24px] font-black italic">
              add_circle
            </span>
            Add New Product
          </Link>
        }
      />

      {/* Alert Banner */}
      <div className="mb-10 p-6 md:p-8 bg-orange-50/50 dark:bg-orange-950/10 border border-orange-100 dark:border-orange-900/30 rounded-4xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-14 h-14 bg-white dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-500 shadow-lg shadow-orange-500/10 border border-orange-100 dark:border-orange-900/20 shrink-0 group-hover:rotate-6 transition-transform">
            <span className="material-symbols-outlined text-2xl font-black italic">
              rocket_launch
            </span>
          </div>
          <div>
            <h4 className="font-black text-orange-900 dark:text-orange-300 text-lg italic tracking-tight uppercase">
              5 Pending Shipments Required!
            </h4>
            <p className="text-orange-800/60 dark:text-orange-400/60 font-black text-[10px] uppercase tracking-widest italic mt-1">
              Process these orders now to maintain your{" "}
              <span className="text-orange-600 dark:text-orange-400">
                Pro Seller Status
              </span>
            </p>
          </div>
        </div>
        <button className="w-full lg:w-auto bg-[#FF7D1F] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest italic shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all text-[11px] active:scale-95">
          Process Batch
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {sellerDashboardStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group"
          >
            <div className="flex justify-between items-start mb-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] italic">
                {stat.label}
              </p>
              <div
                className={`w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-50 dark:border-slate-800 group-hover:scale-110 transition-transform`}
              >
                <span
                  className={`material-symbols-outlined text-2xl italic font-black ${stat.icon === "stars" ? "text-orange-400" : "text-[#254294] dark:text-blue-400"}`}
                >
                  {stat.icon}
                </span>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter">
              {stat.value}{" "}
              {stat.suffix && (
                <span className="text-slate-300 text-xs font-black italic tracking-tighter ml-1">
                  {stat.suffix}
                </span>
              )}
            </h3>
            {stat.trend ? (
              <div className="flex items-center gap-1.5 text-emerald-500 mt-3 text-[10px] font-black uppercase italic tracking-widest">
                <span className="material-symbols-outlined text-base font-black italic animate-bounce-slow">
                  trending_up
                </span>
                <span>{stat.trend} increase</span>
              </div>
            ) : (
              <p className="text-slate-400 mt-3 text-[10px] font-black uppercase tracking-widest italic group-hover:text-slate-500 transition-colors">
                {stat.note}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full -mr-48 -mt-48 blur-3xl group-hover:bg-[#254294]/10 transition-colors duration-700"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-12 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tight uppercase">
                Sales Momentum
              </h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">
                Real-time tracking for the last 7 cycles
              </p>
            </div>
            <div className="flex bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 w-full sm:w-auto shadow-inner">
              <button className="flex-1 sm:flex-none px-6 py-2.5 text-[10px] font-black uppercase tracking-widest italic text-slate-400 hover:text-slate-600 transition-colors">
                Weekly
              </button>
              <button className="flex-1 sm:flex-none px-6 py-2.5 text-[10px] font-black uppercase tracking-widest italic text-white bg-[#254294] rounded-xl shadow-xl shadow-blue-900/20">
                Monthly View
              </button>
            </div>
          </div>
          <div className="relative h-64 md:h-80 w-full overflow-hidden z-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 300"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="#254294"
                    stopOpacity="0.2"
                  ></stop>
                  <stop
                    offset="100%"
                    stopColor="#254294"
                    stopOpacity="0"
                  ></stop>
                </linearGradient>
              </defs>
              <path
                d="M0,230 Q100,100 200,180 T400,150 T600,170 T800,80 T1000,190 L1000,300 L0,300 Z"
                fill="url(#chartGradient)"
              ></path>
              <path
                d="M0,230 Q100,100 200,180 T400,150 T600,170 T800,80 T1000,190"
                fill="none"
                stroke="#254294"
                strokeLinecap="round"
                strokeWidth="6"
                className="drop-shadow-lg"
              ></path>
            </svg>
            <div className="flex justify-between mt-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {/* Listing Summary Card */}
          <div className="bg-white dark:bg-slate-900 p-10 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm group">
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-10 flex items-center justify-between">
              Inventory Snapshot
              <span className="w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full"></span>
            </h3>
            <div className="space-y-8">
              {sellerInventorySnapshot.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between group/row"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-3 h-3 rounded-full ${item.color} shadow-lg shadow-current/20 group-hover/row:scale-125 transition-transform`}
                    ></div>
                    <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic transition-colors group-hover/row:text-slate-900 dark:group-hover/row:text-white">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-slate-900 dark:text-white italic tracking-tighter">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/listings"
              className="mt-12 w-full text-center text-[#254294] dark:text-blue-400 text-[11px] font-black uppercase tracking-widest italic group-hover:translate-x-1 transition-all flex items-center justify-center gap-2 hover:underline decoration-2"
            >
              Management Console{" "}
              <span className="material-symbols-outlined text-lg font-black transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Saldo / Revenue Card */}
          <div className="bg-[#254294] dark:bg-slate-900 p-10 rounded-4xl border border-[#254294] dark:border-slate-800 shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-8 relative z-10">
              Wallet <span className="text-blue-200">Liquidity</span>
            </h3>
            <div className="bg-white/10 dark:bg-blue-400/5 p-8 rounded-3xl mb-10 border border-white/10 backdrop-blur-sm relative z-10 shadow-inner group-hover:bg-white/15 transition-colors">
              <p className="text-[10px] text-blue-200 font-black uppercase tracking-widest italic mb-3">
                Current Net Balance
              </p>
              <h4 className="text-3xl font-black text-white italic tracking-tighter">
                Rp 14.250.000
              </h4>
            </div>
            <button className="w-full bg-white text-[#254294] py-5 rounded-2xl font-black uppercase tracking-widest italic shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all text-xs relative z-10">
              Execute Payout
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
