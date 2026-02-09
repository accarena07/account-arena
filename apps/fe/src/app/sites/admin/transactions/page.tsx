import Link from "next/link";
import Image from "next/image";

export default function TransactionsPage() {
  return (
    <>
      <header className="flex flex-col xl:flex-row justify-between items-start gap-6 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Admin Transaction Monitoring
          </h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1">
            Monitor and manage all platform payment activities
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full md:w-auto">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-full md:w-72 text-sm transition-all"
              placeholder="Search transactions..."
              type="text"
            />
          </div>
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 relative hover:bg-slate-50 transition-colors shrink-0">
              <span className="material-symbols-outlined text-2xl">
                notifications
              </span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
            <div className="flex items-center gap-3 ml-auto md:ml-0">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  Admin Store
                </p>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-tight">
                  Super Admin
                </p>
              </div>
              <div className="relative">
                <Image
                  alt="Admin"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  height={40}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiIW9mGAm-LRo-keYX2PsC1g5aOR0BOHwtIILYkiprP0worCQhRZ2FM0Xydk-ZVfgWLSyvxaVCPUKeYxvG_VW3nA5lCdcsWl0QzDgRix_OPHfa5dDY592XYzFYB5ulkKLe6PiBfp2dZ0Jn2NqO3edYQdV2YA-ZyPlYzenzWlETxN_ulMGpmTZFUc91yk5K31_ecA1XHdOouW7WleeXJy-l4wRCXYqlTpOtxojX316nXiG5P0YXbF-883PfXIsjSJGrQY_5gswWJg"
                  width={40}
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 italic">
                  Total Transaction Volume
                </p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  Rp 1.458.290.000
                </h3>
              </div>
              <div className="flex items-center space-x-1.5 bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-500/20">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xs font-bold">
                  trending_up
                </span>
                <span className="text-green-600 dark:text-green-400 text-[11px] font-black uppercase">
                  +18.4%
                </span>
              </div>
            </div>
            <div className="h-44 w-full flex items-end justify-between space-x-4 px-2">
              {[
                { day: "Mon", h: "35%" },
                { day: "Tue", h: "65%" },
                { day: "Wed", h: "45%" },
                { day: "Thu", h: "10%" },
                { day: "Fri", h: "8%" },
                { day: "Sat", h: "55%" },
                { day: "Sun", h: "40%" },
              ].map((bar) => (
                <div
                  key={bar.day}
                  className="flex-1 flex flex-col items-center group"
                >
                  <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-t-lg h-32 relative overflow-hidden">
                    <div
                      style={{ height: bar.h }}
                      className="absolute bottom-0 w-full bg-[#21337e] rounded-t-lg transition-all duration-500 group-hover:bg-blue-600"
                    ></div>
                  </div>
                  <span className="mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest italic group-hover:text-slate-600 transition-colors">
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 italic">
            Success Rate
          </h4>
          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <div className="relative w-40 h-40">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  className="text-slate-100 dark:text-slate-800"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="12"
                ></circle>
                <circle
                  className="text-orange-500"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="42"
                  stroke="currentColor"
                  strokeDasharray="264"
                  strokeDashoffset="13"
                  strokeLinecap="round"
                  strokeWidth="12"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(249,115,22,0.2))",
                  }}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-slate-900 dark:text-white leading-none">
                  95%
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                  Target: 98%
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800">
            <div className="flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 p-2 rounded-xl">
              <span className="flex items-center text-[11px] font-black text-slate-500 uppercase tracking-widest italic leading-none">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-2.5 ring-4 ring-orange-500/10"></span>
                Success
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                1,240
              </span>
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="flex items-center text-[11px] font-black text-slate-500 uppercase tracking-widest italic leading-none">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 mr-2.5"></span>
                Pending
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                42
              </span>
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="flex items-center text-[11px] font-black text-slate-500 uppercase tracking-widest italic leading-none">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2.5"></span>
                Refunded
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                18
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Transaction Logs
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Showing detailed history of all account sales
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 group focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                <span className="material-symbols-outlined text-lg text-slate-400 mr-3">
                  calendar_today
                </span>
                <input
                  className="bg-transparent border-none p-0 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-0 w-48"
                  type="text"
                  defaultValue="Oct 20, 2023 - Oct 27, 2023"
                />
              </div>
              <div className="relative">
                <select className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold px-4 py-2.5 pr-10 focus:ring-2 focus:ring-blue-500/10 outline-none dark:text-white transition-all">
                  <option>All Status</option>
                  <option>Success</option>
                  <option>Pending</option>
                  <option>Refunded</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xl">
                  expand_more
                </span>
              </div>
              <button className="flex items-center space-x-2 px-6 py-2.5 bg-[#21337e] text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                <span className="material-symbols-outlined text-lg">
                  filter_alt
                </span>
                <span>Apply Filters</span>
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800">
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Transaction ID
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Order ID
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Buyer / Seller
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Amount
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Payment Method
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Status
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-white group-hover:text-[#21337e] transition-colors">
                  #TXN-984021
                </td>
                <td className="px-8 py-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                  ORD-55209
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded w-fit">
                      <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 lowercase">
                        b
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        alex_gamer
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded w-fit">
                      <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 lowercase">
                        s
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        elite_seller
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-white">
                  Rp 2.450.000
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      account_balance_wallet
                    </span>
                    <span className="text-xs font-bold">Virtual Account</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase dark:bg-green-500/10 bg-green-50 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-500/20 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                    Success
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                    <span className="material-symbols-outlined text-slate-400">
                      more_horiz
                    </span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-white group-hover:text-[#21337e] transition-colors">
                  #TXN-984022
                </td>
                <td className="px-8 py-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                  ORD-55210
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded w-fit">
                      <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 lowercase">
                        b
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        ryan_king
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded w-fit">
                      <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 lowercase">
                        s
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        pro_account
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-white">
                  Rp 850.000
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      account_balance_wallet
                    </span>
                    <span className="text-xs font-bold">E-Wallet</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase dark:bg-orange-500/10 bg-orange-50 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
                    Pending
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                    <span className="material-symbols-outlined text-slate-400">
                      more_horiz
                    </span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-white group-hover:text-[#21337e] transition-colors">
                  #TXN-984023
                </td>
                <td className="px-8 py-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                  ORD-55211
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded w-fit">
                      <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 lowercase">
                        b
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        shadow_user
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded w-fit">
                      <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 lowercase">
                        s
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        mythic_store
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-white">
                  Rp 15.000.000
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      credit_card
                    </span>
                    <span className="text-xs font-bold">Credit Card</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase dark:bg-red-500/10 bg-red-50 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                    Refunded
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                    <span className="material-symbols-outlined text-slate-400">
                      more_horiz
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
          <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic">
            Showing 1 to 3 of 1,240 transactions
          </p>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-black uppercase tracking-tighter disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 transition-all"
              disabled
            >
              Previous
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#21337e] text-white text-xs font-black uppercase shadow-lg shadow-blue-500/20">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-black uppercase hover:bg-white dark:hover:bg-slate-800 transition-all">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-black uppercase hover:bg-white dark:hover:bg-slate-800 transition-all">
              3
            </button>
            <button className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-black uppercase tracking-tighter hover:bg-white dark:hover:bg-slate-800 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
        <p>© 2024 GAMEMARKET Indonesia. All rights reserved.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a
            className="hover:text-[#21337e] dark:hover:text-blue-400 transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="hover:text-[#21337e] dark:hover:text-blue-400 transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="hover:text-[#21337e] dark:hover:text-blue-400 transition-colors"
            href="#"
          >
            System Status
          </a>
        </div>
      </footer>
    </>
  );
}
