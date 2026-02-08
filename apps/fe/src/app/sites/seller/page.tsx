import Link from "next/link";
import React from "react";

export default function SellerDashboardPage() {
  return (
    <>
      <header className="flex items-center justify-between mb-10">
        <div className="relative w-96 group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] group-focus-within:text-[#254294] transition-colors">
            search
          </span>
          <input
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-[#254294] outline-none transition-all dark:text-white text-sm shadow-sm"
            placeholder="Find orders or listings..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="w-11 h-11 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 relative hover:bg-slate-50 transition-all shadow-sm group">
            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
              notifications
            </span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          <button className="w-11 h-11 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[22px]">help</span>
          </button>
          <div className="h-8 w-[1.5px] bg-slate-100 dark:bg-slate-800 mx-1"></div>
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right">
              <p className="text-sm font-black text-slate-800 dark:text-white leading-tight italic">
                Admin Store
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                Premium Seller
              </p>
            </div>
            <div className="relative">
              <img
                alt="Profile"
                className="w-11 h-11 rounded-full border-2 border-slate-100 dark:border-slate-800 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALL4MNDR1C_NUyFVHybHloH6M8YfbkdIvKzI7T_k4HpLXMXCc8NM-4QBx0R3I9m_02Tz8RipzypJzBzPTLLZIDpfWIRqiFiekk4-Qrlim-jRmaF9YTlmkqDMvomJT6GyT0Pf3FpD50gUGghwfff6ZLVBR8ZEErIcD86V80P5vX_eFSepUp76QmZA7wy-aCof8wlJfY78J731Ztmd2SqzeCunW0UjITbg1LQPat79T21M94UJu5Pl98o01eoWNjUdNbUxKretMb-g"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Seller Dashboard Overview
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Monitor performa tokomu dan kelola pesanan hari ini.
          </p>
        </div>
        <Link
          href="/listings/new"
          className="bg-[#FF7D1F] hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest italic flex items-center gap-3 shadow-xl shadow-orange-500/10 transition-all transform hover:-translate-y-1 active:translate-y-0"
        >
          <span className="material-symbols-outlined text-[24px]">add</span>
          Tambah Produk
        </Link>
      </div>

      <div className="mb-10 p-6 bg-orange-50/50 dark:bg-orange-950/10 border border-orange-100 dark:border-orange-900/30 rounded-3xl flex items-center justify-between shadow-sm relative overflow-hidden group">
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-12 h-12 bg-white dark:bg-orange-900/40 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-sm border border-orange-100 dark:border-orange-900/20">
            <span className="material-symbols-outlined text-2xl font-black">
              warning
            </span>
          </div>
          <div>
            <h4 className="font-black text-orange-900 dark:text-orange-300 text-base italic tracking-tight">
              5 Pesanan Baru Perlu Dikirim!
            </h4>
            <p className="text-orange-800/60 dark:text-orange-400/60 font-semibold text-xs uppercase tracking-tighter italic">
              Segera proses pesanan sebelum batas waktu pengiriman berakhir.
            </p>
          </div>
        </div>
        <button className="bg-[#FF7D1F] text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest italic hover:shadow-lg transition-all relative z-10 border border-orange-200 dark:border-transparent">
          Proses Sekarang
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Penjualan Hari Ini",
            value: "Rp 2.500.000",
            icon: "account_balance_wallet",
            trend: "+15.4%",
            color: "blue",
          },
          {
            label: "Pesanan Menunggu",
            value: "12",
            icon: "pending_actions",
            note: "Belum diproses",
            color: "blue",
          },
          {
            label: "Listing Aktif",
            value: "48",
            icon: "inventory_2",
            note: "Produk tayang",
            color: "blue",
          },
          {
            label: "Rating Toko",
            value: "4.8",
            icon: "star",
            suffix: "/ 5.0",
            note: "Dari 120 ulasan",
            color: "orange",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative"
          >
            <div className="flex justify-between items-start mb-6">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                {stat.label}
              </p>
              <div
                className={`w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center`}
              >
                <span
                  className={`material-symbols-outlined text-base ${stat.icon === "star" ? "text-orange-400 fill-1" : "text-[#254294] dark:text-blue-400"}`}
                >
                  {stat.icon}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white italic">
              {stat.value}{" "}
              {stat.suffix && (
                <span className="text-slate-300 text-xs font-bold italic tracking-tighter ml-1">
                  {stat.suffix}
                </span>
              )}
            </h3>
            {stat.trend ? (
              <div className="flex items-center gap-1 text-emerald-500 mt-2 text-[10px] font-black uppercase italic">
                <span className="material-symbols-outlined text-sm font-black">
                  trending_up
                </span>
                <span>{stat.trend}</span>
              </div>
            ) : (
              <p className="text-slate-400 mt-2 text-[10px] font-black uppercase tracking-widest italic">
                {stat.note}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white italic tracking-tight">
                Performa Penjualan
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Grafik pendapatan 7 hari terakhir
              </p>
            </div>
            <div className="flex bg-slate-100/50 dark:bg-slate-800 p-1 rounded-2xl border border-slate-100 dark:border-slate-700">
              <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest italic text-slate-400">
                Weekly
              </button>
              <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest italic text-white bg-[#254294] rounded-xl shadow-lg shadow-blue-900/20">
                Monthly
              </button>
            </div>
          </div>
          <div className="relative h-72 w-full">
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
                    stopOpacity="0.1"
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
                strokeWidth="4"
              ></path>
            </svg>
            <div className="flex justify-between mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
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
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-8">
              Ringkasan Listing
            </h3>
            <div className="space-y-6">
              {[
                { label: "Aktif", count: 42, color: "bg-emerald-500" },
                { label: "Terjual", count: 156, color: "bg-orange-500" },
                { label: "Arsip", count: 6, color: "bg-slate-400" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${item.color}`}
                    ></span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-10 w-full text-center text-[#254294] dark:text-blue-400 text-[11px] font-black uppercase tracking-widest italic hover:translate-x-1 transition-transform inline-flex items-center justify-center gap-1">
              Kelola Listing{" "}
              <span className="material-symbols-outlined text-sm font-black">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-6">
              Informasi Saldo
            </h3>
            <div className="bg-[#F8FAFC] dark:bg-slate-800/50 p-6 rounded-2xl mb-6 border border-slate-50 dark:border-slate-800 px-8">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic mb-2">
                Saldo Tersedia
              </p>
              <h4 className="text-2xl font-black text-[#254294] dark:text-white italic">
                Rp 14.250.000
              </h4>
            </div>
            <button className="w-full bg-[#254294] text-white py-4 rounded-2xl font-black uppercase tracking-widest italic shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all">
              Tarik Saldo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
