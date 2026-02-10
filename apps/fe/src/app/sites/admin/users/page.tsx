import Image from "next/image";
import AdminPageFooter from "../components/AdminPageFooter";
import AdminStatusBadge from "../components/AdminStatusBadge";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminTableCard from "../components/AdminTableCard";
import { userRows } from "../data/users";

export default function UserManagementPage() {
  function avatarForUser(name: string) {
    if (name === "Sarah Wilson") {
      return {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      };
    }
    if (name === "Alex Johnson") {
      return {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      };
    }
    return { type: "initial" as const, initials: name.split(" ").map((part) => part[0]).join("").slice(0, 2) };
  }

  return (
    <>
      <AdminPageHeader
        description="Manage registered buyers and sellers across the platform"
        searchPlaceholder="Search by name, email or ID..."
        title="Admin User Management"
      />

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

      <AdminTableCard
        actions={
          <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
            <div className="flex max-w-full items-center overflow-x-auto rounded-xl bg-slate-50 p-1 dark:bg-slate-800/50">
              <button className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition-all dark:bg-slate-900 dark:text-white">
                All
              </button>
              <button className="shrink-0 px-4 py-2 text-sm font-bold text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-white">
                Sellers
              </button>
              <button className="shrink-0 px-4 py-2 text-sm font-bold text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-white">
                Buyers
              </button>
            </div>
            <button className="flex items-center space-x-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200">
              <span className="material-symbols-outlined text-xl">filter_list</span>
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center space-x-2 rounded-xl bg-[#21337e] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition-all hover:opacity-90">
              <span className="material-symbols-outlined text-xl">download</span>
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        }
        description="A comprehensive list of all registered platform participants"
        title="User Directory"
      >

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
              {userRows.map((user) => {
                const avatar = avatarForUser(user.name);

                return (
                  <tr className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20" key={user.id}>
                    <td className="px-8 py-5 text-sm font-bold text-slate-400 italic">{user.id}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-4">
                        {avatar.type === "image" ? (
                          <Image
                            alt={user.name}
                            className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm dark:border-slate-800"
                            height={44}
                            src={avatar.src}
                            width={44}
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-blue-50 text-base font-bold text-blue-600 shadow-sm dark:border-slate-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {avatar.initials}
                          </div>
                        )}
                        <div>
                          <p className="leading-tight font-bold text-slate-900 dark:text-white">{user.name}</p>
                          <p className="mt-0.5 text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] font-black tracking-wider uppercase ${
                          user.role === "Seller"
                            ? "border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : "border-slate-100 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                        }`.trim()}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-500 dark:text-slate-400">{user.joinDate}</td>
                    <td className="px-8 py-5 text-center">
                      <AdminStatusBadge size="sm" status={user.status} />
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end space-x-3">
                        <button className="text-slate-400 transition-colors hover:text-blue-600">
                          <span className="material-symbols-outlined text-xl">visibility</span>
                        </button>
                        <button className="text-slate-400 transition-colors hover:text-amber-500">
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        {user.status === "suspended" ? (
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 shadow-sm">
                            <span className="material-symbols-outlined text-xl">lock</span>
                          </button>
                        ) : (
                          <button className="text-slate-400 transition-colors hover:text-red-500">
                            <span className="material-symbols-outlined text-xl">block</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
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
      </AdminTableCard>

      <AdminPageFooter />
    </>
  );
}
