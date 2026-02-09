"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PayoutsPage() {
  const [transactions] = useState([
    {
      id: 1,
      date: "24 Okt 2023",
      time: "14:20 WIB",
      amount: "Rp 5.000.000",
      bank: "BCA",
      accountNumber: "8831****22",
      accountName: "Admin Store",
      status: "Success",
      statusColor:
        "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200/50 dark:border-green-500/20",
    },
    {
      id: 2,
      date: "22 Okt 2023",
      time: "09:15 WIB",
      amount: "Rp 2.500.000",
      bank: "Mandiri",
      accountNumber: "1220****11",
      accountName: "Admin Store",
      status: "Processing",
      statusColor:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-500/20",
    },
    {
      id: 3,
      date: "18 Okt 2023",
      time: "16:45 WIB",
      amount: "Rp 1.200.000",
      bank: "BCA",
      accountNumber: "8831****22",
      accountName: "Admin Store",
      status: "Failed",
      statusColor:
        "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200/50 dark:border-red-500/20",
    },
    {
      id: 4,
      date: "15 Okt 2023",
      time: "10:00 WIB",
      amount: "Rp 750.000",
      bank: "BCA",
      accountNumber: "8831****22",
      accountName: "Admin Store",
      status: "Success",
      statusColor:
        "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200/50 dark:border-green-500/20",
    },
  ]);

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 italic">
        <Link
          href="/sites/seller"
          className="hover:text-slate-600 transition-colors"
        >
          Dashboard
        </Link>
        <span className="material-symbols-outlined text-xs font-black">
          chevron_right
        </span>
        <span className="text-[#254294] dark:text-blue-400">Payouts</span>
      </div>

      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div className="w-full md:w-auto">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight uppercase italic tracking-tight">
            Payout Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-[11px] font-bold uppercase tracking-widest italic">
            Control your{" "}
            <span className="text-[#254294] dark:text-blue-400">earnings</span>{" "}
            & withdrawal history
          </p>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 text-center md:text-right">
          <div className="hidden sm:block">
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
      </header>

      {/* Balance Section */}
      <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 mb-10 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-[#254294]/10 transition-colors duration-700"></div>
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 relative z-10">
          {/* Available Balance */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 flex items-center justify-center text-[#254294] dark:text-blue-400">
                <span className="material-symbols-outlined text-2xl font-black italic">
                  account_balance_wallet
                </span>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                Available to Withdraw
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#254294] dark:text-white italic tracking-tighter">
              Rp 14.250.000
            </h2>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400/80">
              <span className="material-symbols-outlined text-lg font-black animate-pulse">
                check_circle
              </span>
              <p className="text-[10px] font-black uppercase italic tracking-widest leading-none">
                Ready for instant withdrawal
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-slate-100 dark:bg-slate-800"></div>

          {/* Held Balance */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-2xl font-black italic">
                  lock_clock
                </span>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                Currently Escrowed
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-300 dark:text-slate-700 italic tracking-tighter">
              Rp 2.100.000
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase italic tracking-widest">
              * Funds being held for 1 active order
            </p>
          </div>

          {/* Action */}
          <div className="flex flex-col justify-center items-center lg:items-end gap-4 min-w-[240px]">
            <button className="w-full bg-[#254294] hover:bg-blue-900 text-white px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-widest italic shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 text-sm">
              <span className="material-symbols-outlined text-xl italic font-black">
                payments
              </span>
              Withdraw Funds
            </button>
            <p className="text-[9px] font-black text-slate-400 uppercase italic tracking-[0.2em]">
              Processing time: ~24 Business Hours
            </p>
          </div>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-12 group/history">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-slate-50/10 dark:bg-slate-800/20">
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-xl italic tracking-tight uppercase">
              Withdrawal Log
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic mt-1">
              Your recent financial activities
            </p>
          </div>
          <button className="w-full md:w-auto text-[#254294] dark:text-blue-400 text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-3 hover:bg-white dark:hover:bg-slate-800 px-6 py-3 rounded-xl border border-slate-100 dark:border-slate-800 transition-all shadow-sm active:scale-95 group/down">
            <span className="material-symbols-outlined text-xl transition-transform group-hover/down:translate-y-0.5">
              download_done
            </span>
            Export XLS Report
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  Timestamp
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  Payout Value
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  Destination Account
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-right">
                  System Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-all group/row"
                >
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-900 dark:text-white italic tracking-tight uppercase">
                      {tx.date}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase italic tracking-tighter">
                      {tx.time}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-lg font-black text-[#FF7D1F] italic tracking-tight">
                      {tx.amount}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-slate-400 border border-slate-100 dark:border-slate-800 shadow-sm group-hover/row:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-xl italic font-black">
                          account_balance
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2 italic">
                          <span>{tx.bank}</span>
                          <span className="text-slate-300">/</span>
                          <span className="text-slate-600 dark:text-slate-300 font-bold tracking-tight">
                            {tx.accountNumber}
                          </span>
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase italic tracking-widest mt-1">
                          Ref: {tx.accountName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span
                      className={`inline-flex px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest italic shadow-sm items-center gap-2 ${tx.statusColor}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View / Card View */}
        <div className="lg:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-6 space-y-6 hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase italic tracking-widest mb-1">
                    Withdrawal Date
                  </p>
                  <p className="text-sm font-black text-slate-900 dark:text-white italic tracking-tight uppercase">
                    {tx.date}{" "}
                    <span className="text-slate-300 font-bold mx-1">•</span>{" "}
                    {tx.time}
                  </p>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest italic inline-flex items-center gap-1.5 ${tx.statusColor}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {tx.status}
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-slate-50/50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-xl font-black italic">
                    account_balance
                  </span>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white italic tracking-tight mb-1">
                    {tx.bank} • {tx.accountNumber}
                  </p>
                  <p className="text-[9px] font-black text-slate-400 uppercase italic tracking-widest">
                    Payee: {tx.accountName}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase italic tracking-widest mb-1">
                    Net Payout
                  </p>
                  <span className="font-black text-[#FF7D1F] text-2xl italic tracking-tight">
                    {tx.amount}
                  </span>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest italic text-[#254294] dark:text-blue-400 flex items-center gap-1">
                  Details{" "}
                  <span className="material-symbols-outlined text-lg">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Pagination */}
        <div className="px-8 py-6 bg-slate-50/30 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic text-center md:text-left">
            Showing <span className="text-slate-900 dark:text-white">4</span> of{" "}
            <span className="text-slate-900 dark:text-white">24</span> total
            transactions record
          </p>
          <div className="flex items-center gap-3">
            <button
              className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest italic text-slate-400 opacity-50 cursor-not-allowed"
              disabled
            >
              Prev
            </button>
            <button className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest italic text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95">
              Next Log
            </button>
          </div>
        </div>
      </div>

      {/* Global Footer Info */}
      <footer className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic mb-20 md:mb-10">
        <div className="flex flex-col md:flex-row items-center gap-8 text-center">
          <a href="#" className="hover:text-[#254294] transition-colors">
            Payout Policy
          </a>
          <a href="#" className="hover:text-[#254294] transition-colors">
            Bank Partners
          </a>
          <a href="#" className="hover:text-[#254294] transition-colors">
            Tax Information
          </a>
          <div className="flex items-center gap-3 text-[#254294] dark:text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Fin-Secured Node
          </div>
        </div>
        <div className="text-center">
          © 2024 AccountArena • Secure Seller Network • Payout Infrastructure
        </div>
      </footer>
    </div>
  );
}
