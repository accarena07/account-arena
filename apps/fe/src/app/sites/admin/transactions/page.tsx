import AdminStatusBadge from "../components/AdminStatusBadge";
import AdminPageFooter from "../components/AdminPageFooter";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminTableCard from "../components/AdminTableCard";
import { transactionRows } from "../data/transactions";

export default function TransactionsPage() {
  const successCount = transactionRows.filter((row) => row.status === "success").length;
  const pendingCount = transactionRows.filter((row) => row.status === "pending").length;
  const refundedCount = transactionRows.filter((row) => row.status === "refunded").length;

  function paymentMethodIcon(method: string) {
    if (method === "Credit Card") {
      return "credit_card";
    }
    return "account_balance_wallet";
  }

  return (
    <>
      <AdminPageHeader
        description="Monitor and manage all platform payment activities"
        searchPlaceholder="Search transactions..."
        title="Admin Transaction Monitoring"
      />

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase italic dark:text-slate-400">Successful Transactions</p>
          <p className="mt-2 text-3xl leading-tight font-bold text-slate-900 dark:text-white">{successCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase italic dark:text-slate-400">Pending Transactions</p>
          <p className="mt-2 text-3xl leading-tight font-bold text-slate-900 dark:text-white">{pendingCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase italic dark:text-slate-400">Refunded Transactions</p>
          <p className="mt-2 text-3xl leading-tight font-bold text-slate-900 dark:text-white">{refundedCount}</p>
        </div>
      </div>

      <div className="mb-8">
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

      <AdminTableCard
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <div className="group flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 transition-all focus-within:ring-2 focus-within:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800">
              <span className="material-symbols-outlined mr-3 text-lg text-slate-400">calendar_today</span>
              <input
                className="w-48 border-none bg-transparent p-0 text-sm font-bold text-slate-700 focus:ring-0 dark:text-slate-200"
                defaultValue="Oct 20, 2023 - Oct 27, 2023"
                type="text"
              />
            </div>
            <div className="relative">
              <select className="appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-sm font-bold outline-none transition-all focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                <option>All Status</option>
                <option>Success</option>
                <option>Pending</option>
                <option>Refunded</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xl text-slate-400">
                expand_more
              </span>
            </div>
            <button className="flex items-center space-x-2 rounded-xl bg-[#21337e] px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-blue-500/20">
              <span className="material-symbols-outlined text-lg">filter_alt</span>
              <span>Apply Filters</span>
            </button>
          </div>
        }
        description="Showing detailed history of all account sales"
        title="Transaction Logs"
      >
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
              {transactionRows.map((row) => (
                <tr className="group transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/30" key={row.id}>
                  <td className="px-8 py-6 text-sm font-black text-slate-900 transition-colors group-hover:text-[#21337e] dark:text-white">
                    {row.id}
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-500 dark:text-slate-400">{row.orderId}</td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <div className="flex w-fit items-center space-x-2 rounded bg-blue-50 px-2 py-1 dark:bg-blue-500/10">
                        <span className="text-[10px] font-black text-blue-600 lowercase dark:text-blue-400">b</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{row.buyer}</span>
                      </div>
                      <div className="flex w-fit items-center space-x-2 rounded bg-orange-50 px-2 py-1 dark:bg-orange-500/10">
                        <span className="text-[10px] font-black text-orange-600 lowercase dark:text-orange-400">s</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{row.seller}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-white">{row.amount}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-lg">{paymentMethodIcon(row.paymentMethod)}</span>
                      <span className="text-xs font-bold">{row.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <AdminStatusBadge pulse={row.status === "pending"} status={row.status} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="rounded-xl p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                      <span className="material-symbols-outlined text-slate-400">more_horiz</span>
                    </button>
                  </td>
                </tr>
              ))}
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
      </AdminTableCard>

      <AdminPageFooter />
    </>
  );
}
