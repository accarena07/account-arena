import Image from "next/image";

export default function KYCVerificationPage() {
  return (
    <>
      <header className="flex flex-col xl:flex-row justify-between items-start gap-6 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Admin Control Panel
          </h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1">
            Platform management and verification center
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full md:w-auto">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-full md:w-72 text-sm transition-all"
              placeholder="Search users or IDs..."
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
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">
                payments
              </span>
            </div>
            <div className="flex items-center space-x-1 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full text-[10px] font-bold text-green-600 dark:text-green-400 uppercase">
              <span className="material-symbols-outlined text-xs">
                trending_up
              </span>
              <span>+12.5%</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic">
              Total Revenue
            </p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 leading-tight">
              Rp 128.450.000
            </h3>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-2xl">
                group
              </span>
            </div>
            <div className="flex items-center space-x-1 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full text-[10px] font-bold text-green-600 dark:text-green-400 uppercase">
              <span className="material-symbols-outlined text-xs">
                trending_up
              </span>
              <span>+4.2%</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic">
              Total Users
            </p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 leading-tight">
              12,458
            </h3>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-2xl">
                inventory_2
              </span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic">
              Active Listings
            </p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 leading-tight">
              3,892
            </h3>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-2xl">
                pending_actions
              </span>
            </div>
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter italic shadow-sm shadow-red-500/20">
              URGENT
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic">
              Pending KYC
            </p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1 leading-tight">
              47
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Seller Verification List
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Review pending identity submissions for platform sellers
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button className="flex items-center space-x-2 px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group shrink-0">
              <span className="material-symbols-outlined text-lg text-slate-400 group-hover:text-slate-600 transition-colors">
                filter_list
              </span>
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-[#21337e] text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all shrink-0">
              <span className="material-symbols-outlined text-lg">
                download
              </span>
              <span>Export CSV</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800">
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Seller Information
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Submitted Date
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Verification Type
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
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-500 text-xs border border-slate-200 dark:border-slate-700">
                      JD
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#21337e] dark:group-hover:text-blue-400 transition-colors">
                        John Doe
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        john.doe@email.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Oct 24, 2023 • 14:20
                  </p>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    ID Card & Selfie
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase dark:bg-orange-500/10 bg-orange-50 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
                    Pending Review
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="px-6 py-2 bg-[#21337e] text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                    Review
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-4">
                    <Image
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                      height={40}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuApRkm-JPqhEY6ycG4ylRHJqB3S2AECdlZsfMSE1BZ-vX_F6dvPwbRJH-D4tgWG2S5qFyOyWgazq7E9wbsO0S29QIs_hTPRBsQt_s1y6qgC-8rUgY-fdRkaYdUjkQuvHOExsLH-qY96gwDzgZkkNLnhgXgZ93B_kqpXPCgsRSKnL5iPk3iaICdgcnvLL6X0jgH5XxRCZSWZVrP75rsliTxkggwxRkZXFlhxuK9BbKV7lRdYspfVlmSvtSGrWqCvt8fIg43pOHeGGA"
                      width={40}
                    />
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#21337e] dark:group-hover:text-blue-400 transition-colors">
                        Sarah Wilson
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        sarah.w@gmail.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Oct 23, 2023 • 09:15
                  </p>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    Passport
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase dark:bg-green-500/10 bg-green-50 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-500/20 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                    Approved
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all">
                    View Details
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-500 text-xs border border-slate-200 dark:border-slate-700">
                      BK
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#21337e] dark:group-hover:text-blue-400 transition-colors">
                        Budi Kusuma
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        budi.k@outlook.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Oct 22, 2023 • 17:45
                  </p>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    ID Card
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase dark:bg-red-500/10 bg-red-50 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                    Rejected
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all">
                    Review
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-4">
                    <Image
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                      height={40}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwjGf0hnm-0OAVxo9HQDlAYDmAsXTZh--9sklq3mXNOsmntV1T3etnjldZXfLnVd6xVgwk_j-mgALTo5nK4aDn_goL-4UsOLH1o9E1TMMY8e-88sXOMLC8ExddCjURmWvUEAD-2jnVmf66ZIonOqj9KBK_wUpw2MzxLQJ7u6L6EJX6dbkQd80W8a04aaQPqiU3GpQ44kInywcai-PoLsG8mUE-LQTigBlCVhjoEazkfOe6OsgD7ZGTcPF5jWdT2L8yU2_xnbrhYA"
                      width={40}
                    />
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#21337e] dark:group-hover:text-blue-400 transition-colors">
                        Alex Johnson
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        ajohnson@gaming.net
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Oct 22, 2023 • 12:00
                  </p>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    ID Card & Selfie
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase dark:bg-orange-500/10 bg-orange-50 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
                    Pending Review
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="px-6 py-2 bg-[#21337e] text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                    Review
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 border-t border-slate-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30 dark:bg-slate-800/20">
          <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic text-center md:text-left">
            Showing 1 to 4 of 47 pending verifications
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

      <footer className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
        <p className="text-center md:text-left">
          © 2024 GAMEMARKET Indonesia. All rights reserved.
        </p>
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
