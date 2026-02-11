"use client";

import { sellerPayoutTransactions } from "../data/payouts";
import SellerGlobalFooter from "../components/SellerGlobalFooter";
import SellerPageHeader from "../components/SellerPageHeader";
import SellerProfileInfo from "../components/SellerProfileInfo";
import SellerStatusBadge from "../components/SellerStatusBadge";

export default function PayoutsPage() {
  return (
    <div className="flex-1 max-w-6xl mx-auto w-full">
      <SellerPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Payouts" },
        ]}
        title="Payout Management"
        subtitle={
          <>
            Control your{" "}
            <span className="text-[#254294] dark:text-blue-400">earnings</span>{" "}
            & withdrawal history
          </>
        }
        rightContent={
          <div className="flex w-full items-center justify-between gap-6 border-t border-slate-100 pt-6 text-center md:w-auto md:justify-end md:border-t-0 md:pt-0 md:text-right dark:border-slate-800">
          <div className="hidden sm:block">
            <SellerProfileInfo />
          </div>
          <div className="sm:hidden">
            <SellerProfileInfo showMeta={false} />
          </div>
        </div>
        }
      />

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
              {sellerPayoutTransactions.map((tx) => (
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
                    <SellerStatusBadge status={tx.statusKind} label={tx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View / Card View */}
        <div className="lg:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {sellerPayoutTransactions.map((tx) => (
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
                <SellerStatusBadge
                  size="xs"
                  status={tx.statusKind}
                  label={tx.status}
                />
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

      <SellerGlobalFooter
        copyright="© 2024 AccountArena • Secure Seller Network • Payout Infrastructure"
        links={[
          { label: "Payout Policy" },
          { label: "Bank Partners" },
          { label: "Tax Information" },
        ]}
        statusText="Fin-Secured Node"
      />
    </div>
  );
}
