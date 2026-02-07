import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accarena — Admin",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <div className="text-xs uppercase tracking-wide text-zinc-500">Admin</div>
        <div className="text-base font-medium">Accarena Admin Dashboard</div>
      </div>
      {children}
    </div>
  );
}
