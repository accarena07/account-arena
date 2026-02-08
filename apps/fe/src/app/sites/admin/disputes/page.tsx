import Link from "next/link";

export default function DisputesPage() {
  return (
    <>
      <header className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Admin Dispute Resolution
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Mediate and resolve conflicts between buyers and sellers
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-72 text-sm transition-all"
              placeholder="Search tickets, orders..."
              type="text"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 relative hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-2xl">
                notifications
              </span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-2xl">
                report_problem
              </span>
            </div>
            <span className="bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest italic">
              ACTIVE
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic leading-none mb-2">
              Open Disputes
            </p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              24 Tickets
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl font-bold">
                done_all
              </span>
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
          <div>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic leading-none mb-2">
              Resolved (This Month)
            </p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              142 Cases
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">
                schedule
              </span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic leading-none mb-2">
              Average Resolution Time
            </p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              4h 22m
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Dispute Management
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Monitoring all active and historical dispute cases
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
              <span className="material-symbols-outlined text-lg text-slate-400 group-hover:text-slate-600 transition-colors">
                filter_list
              </span>
              <span>Filter</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20">
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Ticket ID
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Related Order
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Initiator
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Reason
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Created Date
                </th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest italic text-center">
                  Priority
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
              {[
                {
                  id: "#DIS-8821",
                  order: "ORD-22941",
                  desc: "Valorant Ascendant Account",
                  initiator: "BK",
                  initiatorType: "Buyer",
                  reason: "Account Recovery Link Broken",
                  date: "Oct 24, 14:20",
                  priority: "HIGH",
                  status: "Open",
                  statusDot: "bg-orange-500",
                },
                {
                  id: "#DIS-8819",
                  order: "ORD-22850",
                  desc: "Genshin Impact AR 55",
                  initiator: "SW",
                  initiatorType: "Seller",
                  initiatorColor:
                    "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
                  reason: "Payment Not Received",
                  date: "Oct 23, 09:15",
                  priority: "MEDIUM",
                  status: "Under Review",
                  statusDot: "bg-blue-500",
                },
                {
                  id: "#DIS-8815",
                  order: "ORD-22792",
                  desc: "MLBB Mythic Glory Acc",
                  initiator: "AJ",
                  initiatorType: "Buyer",
                  reason: "In-game currency missing",
                  date: "Oct 22, 17:45",
                  priority: "LOW",
                  status: "Resolved",
                  statusDot: "bg-green-500",
                  action: "View Log",
                },
                {
                  id: "#DIS-8812",
                  order: "ORD-22610",
                  desc: "Steam Account CS2",
                  initiator: "JD",
                  initiatorType: "Buyer",
                  reason: "Login credentials invalid",
                  date: "Oct 22, 12:00",
                  priority: "HIGH",
                  status: "Open",
                  statusDot: "bg-orange-500",
                },
              ].map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group"
                >
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-[#21337e] dark:text-blue-400 tracking-tighter uppercase italic">
                      {ticket.id}
                    </p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                      {ticket.order}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">
                      {ticket.desc}
                    </p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black border border-slate-200 dark:border-slate-700 ${ticket.initiatorColor || "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"}`}
                      >
                        {ticket.initiator}
                      </div>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {ticket.initiatorType}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed max-w-[200px]">
                      {ticket.reason}
                    </p>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 dark:text-slate-500 font-medium">
                    <span className="block">{ticket.date.split(",")[0]}</span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tabular-nums">
                      {ticket.date.split(",")[1]}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span
                      className={`text-[9px] font-black px-2.5 py-1 rounded-md tracking-widest border italic inline-block w-20 ${
                        ticket.priority === "HIGH"
                          ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                          : ticket.priority === "MEDIUM"
                            ? "bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                            : "bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase italic border ${
                        ticket.status === "Open"
                          ? "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20"
                          : ticket.status === "Under Review"
                            ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                            : "bg-green-50 text-green-600 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${ticket.statusDot} mr-2 shadow-[0_0_8px_currentColor] animate-pulse`}
                      ></span>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    {ticket.action === "View Log" ? (
                      <button className="px-5 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        View Log
                      </button>
                    ) : (
                      <button className="px-5 py-2 bg-[#21337e] text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                        Take Action
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
          <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic">
            Showing 1 to 4 of 24 open disputes
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
            Resolution Guidelines
          </a>
        </div>
      </footer>
    </>
  );
}
