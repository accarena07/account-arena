/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

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
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
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
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
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
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
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
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
  ]);

  return (
    <div className="flex-1 max-w-[1200px] mx-auto w-full py-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search payout history..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#254294] transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
            <span className="material-symbols-outlined text-xl font-bold">
              notifications
            </span>
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
            <span className="material-symbols-outlined text-xl font-bold">
              help
            </span>
          </button>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex items-center gap-3">
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

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Seller Payout Management
        </h1>
        <p className="text-slate-500 text-sm">
          Kelola pendapatan dan riwayat penarikan saldo Anda.
        </p>
      </div>

      {/* Balance Cards */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Available Balance */}
          <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 pb-8 md:pb-0 md:pr-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-slate-400">
                account_balance_wallet
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                SALDO TERSEDIA
              </span>
            </div>
            <h2 className="text-4xl font-bold text-[#254294] dark:text-blue-400 mb-2">
              Rp 14.250.000
            </h2>
            <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
              <span className="material-symbols-outlined text-sm font-bold">
                check_circle
              </span>
              <p className="text-xs font-bold">Dapat ditarik kapan saja</p>
            </div>
          </div>

          {/* Held Balance */}
          <div className="flex-1 w-full md:px-8 pb-8 md:pb-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-slate-400">
                pending
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                SALDO TERTAHAN
              </span>
            </div>
            <h2 className="text-4xl font-bold text-slate-300 dark:text-slate-600 mb-2">
              Rp 2.100.000
            </h2>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="material-symbols-outlined text-sm font-bold">
                info
              </span>
              <p className="text-xs font-medium">Proses verifikasi pesanan</p>
            </div>
          </div>

          {/* Withdraw Action */}
          <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-3 pl-8 border-l border-slate-100 dark:border-slate-800">
            <button className="bg-[#254294] hover:bg-blue-900 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all w-full md:w-auto justify-center">
              <span className="material-symbols-outlined">account_balance</span>
              Tarik Saldo
            </button>
            <p className="text-[10px] text-slate-400 text-center md:text-right">
              Estimasi waktu pencairan: 1x24 jam kerja
            </p>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 dark:text-white text-lg">
            Riwayat Penarikan
          </h3>
          <button className="text-[#254294] dark:text-blue-400 text-sm font-bold flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-lg">download</span>
            Download Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-left">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  TANGGAL
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  NOMINAL
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  REKENING TUJUAN
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
                      {tx.date}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {tx.time}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      {tx.amount}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                        <span className="material-symbols-outlined text-lg">
                          account_balance
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white flex items-center gap-1">
                          <span className="font-bold">{tx.bank}</span>
                          <span className="text-slate-400">-</span>
                          <span className="text-slate-600 dark:text-slate-300 font-medium">
                            {tx.accountNumber}
                          </span>
                        </p>
                        <p className="text-[11px] text-slate-400">
                          a.n. {tx.accountName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold ${tx.statusColor}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Menampilkan 4 dari 24 transaksi
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
