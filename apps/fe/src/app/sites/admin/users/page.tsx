export default function UserManagementPage() {
  return (
    <>
      <header className="flex flex-col xl:flex-row justify-between items-start gap-6 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Admin User Management
          </h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1">
            Manage registered buyers and sellers across the platform
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full md:w-auto">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-full md:w-72 text-sm transition-all"
              placeholder="Search by name, email or ID..."
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
                <img
                  alt="Admin"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiIW9mGAm-LRo-keYX2PsC1g5aOR0BOHwtIILYkiprP0worCQhRZ2FM0Xydk-ZVfgWLSyvxaVCPUKeYxvG_VW3nA5lCdcsWl0QzDgRix_OPHfa5dDY592XYzFYB5ulkKLe6PiBfp2dZ0Jn2NqO3edYQdV2YA-ZyPlYzenzWlETxN_ulMGpmTZFUc91yk5K31_ecA1XHdOouW7WleeXJy-l4wRCXYqlTpOtxojX316nXiG5P0YXbF-883PfXIsjSJGrQY_5gswWJg"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Active Users */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl">
                person_check
              </span>
            </div>
            <div className="flex items-center space-x-1 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full text-[10px] font-bold text-green-600 dark:text-green-400 uppercase">
              <span className="material-symbols-outlined text-xs">
                trending_up
              </span>
              <span>+2.4%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Active Users
            </p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
              11,842
            </h3>
          </div>
        </div>

        {/* Banned Users */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-2xl">
                person_off
              </span>
            </div>
            <div className="flex items-center space-x-1 bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded-full text-[10px] font-bold text-red-600 dark:text-red-400 uppercase">
              <span className="material-symbols-outlined text-xs">
                trending_up
              </span>
              <span>+12</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Banned Users
            </p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
              156
            </h3>
          </div>
        </div>

        {/* New Signups */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">
                person_add
              </span>
            </div>
            <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded font-bold tracking-wider">
              TODAY
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              New Signups
            </p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
              42
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-12">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              User Directory
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              A comprehensive list of all registered platform participants
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="p-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center overflow-x-auto max-w-full">
              <button className="px-4 py-2 text-sm font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm rounded-lg transition-all shrink-0">
                All
              </button>
              <button className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0">
                Sellers
              </button>
              <button className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0">
                Buyers
              </button>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-xl">
                filter_list
              </span>
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-5 py-2 bg-[#21337e] text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-900/10">
              <span className="material-symbols-outlined text-xl">
                download
              </span>
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-background-light dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  User ID
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Name / Email
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Role
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Join Date
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {/* Arthur Morgan */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="px-8 py-5 text-sm font-bold text-slate-400 italic">
                  #USR-89420
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-base border-2 border-white dark:border-slate-800 shadow-sm">
                      AM
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white leading-tight">
                        Arthur Morgan
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        arthur.m@outlaw.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 uppercase tracking-wider">
                    Seller
                  </span>
                </td>
                <td className="px-8 py-5 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Oct 24, 2023
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                    Active
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end space-x-3">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        visibility
                      </span>
                    </button>
                    <button className="text-slate-400 hover:text-amber-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        edit
                      </span>
                    </button>
                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        block
                      </span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Sarah Wilson */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="px-8 py-5 text-sm font-bold text-slate-400 italic">
                  #USR-89421
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-4">
                    <img
                      alt="Sarah"
                      className="w-11 h-11 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white leading-tight">
                        Sarah Wilson
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        sarah.w@gmail.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700 uppercase tracking-wider">
                    Buyer
                  </span>
                </td>
                <td className="px-8 py-5 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Oct 23, 2023
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
                    Suspended
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end space-x-3">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        visibility
                      </span>
                    </button>
                    <button className="text-slate-400 hover:text-amber-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        edit
                      </span>
                    </button>
                    <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-500 shadow-sm">
                      <span className="material-symbols-outlined text-xl">
                        lock
                      </span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Budi Kusuma */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="px-8 py-5 text-sm font-bold text-slate-400 italic">
                  #USR-89422
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 text-base border-2 border-white dark:border-slate-800 shadow-sm">
                      BK
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white leading-tight">
                        Budi Kusuma
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        budi.k@outlook.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 uppercase tracking-wider">
                    Seller
                  </span>
                </td>
                <td className="px-8 py-5 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Oct 22, 2023
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                    Active
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end space-x-3">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        visibility
                      </span>
                    </button>
                    <button className="text-slate-400 hover:text-amber-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        edit
                      </span>
                    </button>
                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        block
                      </span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Alex Johnson */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="px-8 py-5 text-sm font-bold text-slate-400 italic">
                  #USR-89423
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-4">
                    <img
                      alt="Alex"
                      className="w-11 h-11 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                    />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white leading-tight">
                        Alex Johnson
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        ajohnson@gaming.net
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700 uppercase tracking-wider">
                    Buyer
                  </span>
                </td>
                <td className="px-8 py-5 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Oct 22, 2023
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                    Active
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end space-x-3">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        visibility
                      </span>
                    </button>
                    <button className="text-slate-400 hover:text-amber-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        edit
                      </span>
                    </button>
                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        block
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-8 py-5 border-t border-slate-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#fcfdfe] dark:bg-slate-900/50">
          <p className="text-sm font-bold text-slate-400 italic text-center md:text-left">
            Showing 1 to 4 of 12,458 users
          </p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all">
              Previous
            </button>
            <div className="flex items-center space-x-1">
              <button className="w-10 h-10 rounded-xl bg-[#21337e] text-white text-sm font-black shadow-md shadow-blue-900/20">
                1
              </button>
              <button className="w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-400 text-sm font-black transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-400 text-sm font-black transition-colors">
                3
              </button>
            </div>
            <button className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>

      <footer className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-bold text-slate-400 text-center md:text-left">
          © 2024 GAMEMARKET Indonesia. All rights reserved.
        </p>
        <div className="flex space-x-8">
          <a
            className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
            href="#"
          >
            System Status
          </a>
        </div>
      </footer>
    </>
  );
}
