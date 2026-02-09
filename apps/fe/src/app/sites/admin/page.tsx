import Image from "next/image";

export default function AdminHome() {
  return (
    <>
      <header className="flex flex-col xl:flex-row justify-between items-start gap-6 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Admin General Overview
          </h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1">
            Global performance and marketplace insights
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full md:w-auto">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-full md:w-72 text-sm transition-all"
              placeholder="Search analytics..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                payments
              </span>
            </div>
            <span className="text-green-500 text-[10px] font-bold flex items-center bg-green-50 dark:bg-green-900/10 px-2 py-1 rounded-full uppercase">
              <span className="material-symbols-outlined text-xs mr-1">
                trending_up
              </span>
              +12.5%
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">
            Monthly Revenue
          </p>
          <div className="flex items-baseline space-x-1">
            <span className="text-xs font-bold text-slate-400 italic">Rp</span>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              128.450.000
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">
                ads_click
              </span>
            </div>
            <span className="text-green-500 text-[10px] font-bold flex items-center bg-green-50 dark:bg-green-900/10 px-2 py-1 rounded-full uppercase">
              <span className="material-symbols-outlined text-xs mr-1">
                trending_up
              </span>
              +2.1%
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">
            Conversion Rate
          </p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            4.82%
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">
                shopping_bag
              </span>
            </div>
            <span className="text-slate-400 text-[10px] font-bold flex items-center bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full uppercase">
              <span className="material-symbols-outlined text-xs mr-1">
                horizontal_rule
              </span>
              0.0%
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">
            Avg Order Value
          </p>
          <div className="flex items-baseline space-x-1">
            <span className="text-xs font-bold text-slate-400 italic">Rp</span>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              450.000
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <span className="material-symbols-outlined text-red-600 dark:text-red-400">
                person_remove
              </span>
            </div>
            <span className="text-red-500 text-[10px] font-bold flex items-center bg-red-50 dark:bg-red-900/10 px-2 py-1 rounded-full uppercase">
              <span className="material-symbols-outlined text-xs mr-1">
                trending_up
              </span>
              +1.5%
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">
            Churn Rate
          </p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            3.12%
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Revenue Growth
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Comparison of revenue vs transactions
                </p>
              </div>
              <select className="text-sm font-bold border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800 py-2 pl-4 pr-10 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="relative h-64 w-full bg-slate-50/50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 p-4 flex items-end justify-between px-8">
                <div className="w-[6%] bg-blue-600/10 h-[30%] rounded-t-lg"></div>
                <div className="w-[6%] bg-blue-600/10 h-[45%] rounded-t-lg"></div>
                <div className="w-[6%] bg-blue-600/10 h-[35%] rounded-t-lg"></div>
                <div className="w-[6%] bg-blue-600/10 h-[60%] rounded-t-lg"></div>
                <div className="w-[6%] bg-blue-600/10 h-[50%] rounded-t-lg"></div>
                <div className="w-[6%] bg-blue-600/10 h-[75%] rounded-t-lg"></div>
                <div className="w-[6%] bg-[#21337e] h-[90%] rounded-t-lg shadow-lg"></div>
                <div className="w-[6%] bg-blue-600/10 h-[65%] rounded-t-lg"></div>
                <div className="w-[6%] bg-blue-600/10 h-[40%] rounded-t-lg"></div>
                <div className="w-[6%] bg-blue-600/10 h-[55%] rounded-t-lg"></div>
              </div>
              <svg
                className="absolute inset-0 w-full h-full p-4 px-8 opacity-40"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M0,85 L10,75 L20,78 L30,60 L40,65 L50,45 L60,30 L70,40 L80,50 L90,35 L100,20"
                  fill="none"
                  stroke="#21337e"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                  className="drop-shadow-sm"
                ></path>
              </svg>
              <div className="absolute top-4 right-8 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#21337e]"></span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Revenue
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-200"></span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Transactions
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between text-[11px] font-bold text-slate-400 px-8 uppercase tracking-widest italic">
              <span>Oct 01</span>
              <span>Oct 07</span>
              <span>Oct 14</span>
              <span>Oct 21</span>
              <span>Oct 28</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-50 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Recent Activity
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Live platform events
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <div className="flex space-x-4 items-start p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all group">
              <div className="w-9 h-9 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0 border border-green-100 dark:border-green-800 shadow-sm">
                <span className="material-symbols-outlined text-lg">
                  shopping_cart
                </span>
              </div>
              <div>
                <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-snug">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Alex Johnson
                  </span>{" "}
                  bought a Level 50 Genshin Account
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase italic">
                  2 minutes ago
                </p>
              </div>
            </div>
            <div className="flex space-x-4 items-start p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all group">
              <div className="w-9 h-9 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0 border border-orange-100 dark:border-orange-800 shadow-sm">
                <span className="material-symbols-outlined text-lg">
                  verified
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-snug">
                  New KYC submission from{" "}
                  <span className="font-bold text-slate-900 dark:text-white">
                    Budi Kusuma
                  </span>
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase italic">
                  15 minutes ago
                </p>
              </div>
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-2 ring-4 ring-blue-50 dark:ring-blue-900/20"></span>
            </div>
            <div className="flex space-x-4 items-start p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all group">
              <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border border-blue-100 dark:border-blue-800 shadow-sm">
                <span className="material-symbols-outlined text-lg">
                  payments
                </span>
              </div>
              <div>
                <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-snug">
                  Withdrawal request of{" "}
                  <span className="font-bold text-slate-900 dark:text-white">
                    Rp 2.500.000
                  </span>{" "}
                  processed
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase italic">
                  45 minutes ago
                </p>
              </div>
            </div>
            <div className="flex space-x-4 items-start p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all group">
              <div className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0 border border-red-100 dark:border-red-800 shadow-sm">
                <span className="material-symbols-outlined text-lg">
                  report_problem
                </span>
              </div>
              <div>
                <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-snug">
                  New dispute opened for{" "}
                  <span className="font-bold text-slate-900 dark:text-white">
                    Order #GM-1294
                  </span>
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase italic">
                  1 hour ago
                </p>
              </div>
            </div>
            <div className="flex space-x-4 items-start p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all group">
              <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0 border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                <Image
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuApRkm-JPqhEY6ycG4ylRHJqB3S2AECdlZsfMSE1BZ-vX_F6dvPwbRJH-D4tgWG2S5qFyOyWgazq7E9wbsO0S29QIs_hTPRBsQt_s1y6qgC-8rUgY-fdRkaYdUjkQuvHOExsLH-qY96gwDzgZkkNLnhgXgZ93B_kqpXPCgsRSKnL5iPk3iaICdgcnvLL6X0jgH5XxRCZSWZVrP75rsliTxkggwxRkZXFlhxuK9BbKV7lRdYspfVlmSvtSGrWqCvt8fIg43pOHeGGA"
                  alt="Avatar"
                  fill
                  sizes="36px"
                />
              </div>
              <div>
                <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-snug">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Sarah Wilson
                  </span>{" "}
                  updated listing price
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase italic">
                  2 hours ago
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800">
            <button className="w-full py-2.5 text-xs font-black text-[#21337e] dark:text-blue-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-all uppercase tracking-widest">
              View All Notifications
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold dark:text-white mb-6">
            Management Summary
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Monthly Target Progress
                </span>
                <span className="text-sm font-bold">78%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[78%]"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">Active Sellers</p>
                <p className="text-xl font-bold dark:text-white">1,240</p>
                <p className="text-[10px] text-green-500 font-bold mt-1">
                  +12 this week
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">Escrow Funds</p>
                <p className="text-xl font-bold dark:text-white">Rp 42.5M</p>
                <p className="text-[10px] text-blue-500 font-bold mt-1">
                  Holding Period: 3d
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold dark:text-white mb-6">
            Inventory by Game
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium text-slate-600 dark:text-slate-400">
                Mobile Legends
              </div>
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mx-4 overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full w-[45%]"></div>
              </div>
              <div className="w-12 text-right text-xs font-bold">1,892</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium text-slate-600 dark:text-slate-400">
                Genshin Impact
              </div>
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mx-4 overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full w-[30%]"></div>
              </div>
              <div className="w-12 text-right text-xs font-bold">1,245</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium text-slate-600 dark:text-slate-400">
                Valorant
              </div>
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mx-4 overflow-hidden">
                <div className="h-full bg-red-500 rounded-full w-[15%]"></div>
              </div>
              <div className="w-12 text-right text-xs font-bold">642</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium text-slate-600 dark:text-slate-400">
                Others
              </div>
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mx-4 overflow-hidden">
                <div className="h-full bg-slate-400 rounded-full w-[10%]"></div>
              </div>
              <div className="w-12 text-right text-xs font-bold">413</div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <button className="text-sm font-medium text-primary dark:text-blue-400 flex items-center">
              View Detailed Inventory Report{" "}
              <span className="material-symbols-outlined text-[16px] ml-1">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 dark:text-slate-400 text-sm">
        <p>© 2024 GAMEMARKET Indonesia. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a className="hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            System Status
          </a>
        </div>
      </footer>
    </>
  );
}
