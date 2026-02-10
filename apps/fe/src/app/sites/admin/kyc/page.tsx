import Image from "next/image";
import AdminPageFooter from "../components/AdminPageFooter";
import AdminStatusBadge from "../components/AdminStatusBadge";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminTableCard from "../components/AdminTableCard";
import { kycRows } from "../data/kyc";

export default function KYCVerificationPage() {
  function kycAvatar(name: string) {
    if (name === "Sarah Wilson") {
      return {
        type: "image" as const,
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuApRkm-JPqhEY6ycG4ylRHJqB3S2AECdlZsfMSE1BZ-vX_F6dvPwbRJH-D4tgWG2S5qFyOyWgazq7E9wbsO0S29QIs_hTPRBsQt_s1y6qgC-8rUgY-fdRkaYdUjkQuvHOExsLH-qY96gwDzgZkkNLnhgXgZ93B_kqpXPCgsRSKnL5iPk3iaICdgcnvLL6X0jgH5XxRCZSWZVrP75rsliTxkggwxRkZXFlhxuK9BbKV7lRdYspfVlmSvtSGrWqCvt8fIg43pOHeGGA",
      };
    }
    if (name === "Alex Johnson") {
      return {
        type: "image" as const,
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwjGf0hnm-0OAVxo9HQDlAYDmAsXTZh--9sklq3mXNOsmntV1T3etnjldZXfLnVd6xVgwk_j-mgALTo5nK4aDn_goL-4UsOLH1o9E1TMMY8e-88sXOMLC8ExddCjURmWvUEAD-2jnVmf66ZIonOqj9KBK_wUpw2MzxLQJ7u6L6EJX6dbkQd80W8a04aaQPqiU3GpQ44kInywcai-PoLsG8mUE-LQTigBlCVhjoEazkfOe6OsgD7ZGTcPF5jWdT2L8yU2_xnbrhYA",
      };
    }
    return { type: "initial" as const, initials: name.split(" ").map((part) => part[0]).join("").slice(0, 2) };
  }

  function actionLabel(status: (typeof kycRows)[number]["status"]) {
    if (status === "approved") {
      return "View Details";
    }
    return "Review";
  }

  return (
    <>
      <AdminPageHeader
        description="Platform management and verification center"
        searchPlaceholder="Search users or IDs..."
        title="Admin Control Panel"
      />

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

      <AdminTableCard
        actions={
          <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
            <button className="group shrink-0 flex items-center space-x-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold transition-all hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined text-lg text-slate-400 transition-colors group-hover:text-slate-600">
                filter_list
              </span>
              <span>Filter</span>
            </button>
            <button className="shrink-0 flex items-center space-x-2 rounded-xl bg-[#21337e] px-5 py-2.5 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-blue-500/20">
              <span className="material-symbols-outlined text-lg">download</span>
              <span>Export CSV</span>
            </button>
          </div>
        }
        description="Review pending identity submissions for platform sellers"
        title="Seller Verification List"
      >
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
              {kycRows.map((row) => {
                const avatar = kycAvatar(row.name);

                return (
                  <tr className="group transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/30" key={`${row.email}-${row.submittedDate}`}>
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-4">
                        {avatar.type === "image" ? (
                          <Image
                            alt={row.name}
                            className="h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm dark:border-slate-700"
                            height={40}
                            src={avatar.src}
                            width={40}
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs font-black text-slate-500 dark:border-slate-700 dark:bg-slate-800">
                            {avatar.initials}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-slate-900 transition-colors group-hover:text-[#21337e] dark:text-white dark:group-hover:text-blue-400">
                            {row.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{row.submittedDate}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                        {row.verificationType}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <AdminStatusBadge pulse={row.status === "pending_review"} status={row.status} />
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        className={`rounded-xl text-[11px] font-black tracking-widest uppercase transition-all ${
                          row.status === "approved"
                            ? "border border-slate-200 px-4 py-2 text-slate-600 hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            : "bg-[#21337e] px-6 py-2 text-white hover:shadow-lg hover:shadow-blue-500/20"
                        }`.trim()}
                      >
                        {actionLabel(row.status)}
                      </button>
                    </td>
                  </tr>
                );
              })}
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
      </AdminTableCard>

      <AdminPageFooter />
    </>
  );
}
