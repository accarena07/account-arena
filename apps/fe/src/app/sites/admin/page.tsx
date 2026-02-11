import AdminPageHeader from "./components/AdminPageHeader";
import AdminStatCard from "./components/AdminStatCard";

export default function AdminHome() {
  return (
    <>
      <AdminPageHeader
        description="Global performance and marketplace insights"
        searchPlaceholder="Search analytics..."
        title="Admin General Overview"
      />

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AdminStatCard icon="payments" label="Monthly Revenue" trend={{ tone: "green", value: "+12.5%" }} value="Rp 128.450.000" />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
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
          </div>
          <div className="p-4 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800">
            <button className="w-full py-2.5 text-xs font-black text-[#21337e] dark:text-blue-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-all uppercase tracking-widest">
              View All Notifications
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-6 text-lg font-bold dark:text-white">Management Summary</h2>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Monthly Target Progress</span>
                <span className="text-sm font-bold">78%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-[78%] rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
                <p className="mb-1 text-xs text-slate-500">Active Sellers</p>
                <p className="text-xl font-bold dark:text-white">1,240</p>
                <p className="mt-1 text-[10px] font-bold text-green-500">+12 this week</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
                <p className="mb-1 text-xs text-slate-500">Escrow Funds</p>
                <p className="text-xl font-bold dark:text-white">Rp 42.5M</p>
                <p className="mt-1 text-[10px] font-bold text-blue-500">Holding Period: 3d</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold dark:text-white">Inventory by Game</h2>
          <button className="flex items-center text-sm font-medium text-primary dark:text-blue-400">
            View Detailed Inventory Report
            <span className="material-symbols-outlined ml-1 text-[16px]">chevron_right</span>
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-24 text-sm font-medium text-slate-600 dark:text-slate-400">Mobile Legends</div>
            <div className="mx-4 h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full w-[45%] rounded-full bg-orange-500"></div>
            </div>
            <div className="w-12 text-right text-xs font-bold">1,892</div>
          </div>
          <div className="flex items-center">
            <div className="w-24 text-sm font-medium text-slate-600 dark:text-slate-400">Genshin Impact</div>
            <div className="mx-4 h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full w-[30%] rounded-full bg-blue-400"></div>
            </div>
            <div className="w-12 text-right text-xs font-bold">1,245</div>
          </div>
          <div className="flex items-center">
            <div className="w-24 text-sm font-medium text-slate-600 dark:text-slate-400">Valorant</div>
            <div className="mx-4 h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full w-[15%] rounded-full bg-red-500"></div>
            </div>
            <div className="w-12 text-right text-xs font-bold">642</div>
          </div>
          <div className="flex items-center">
            <div className="w-24 text-sm font-medium text-slate-600 dark:text-slate-400">Others</div>
            <div className="mx-4 h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full w-[10%] rounded-full bg-slate-400"></div>
            </div>
            <div className="w-12 text-right text-xs font-bold">413</div>
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
