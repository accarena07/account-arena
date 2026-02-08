import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accarena — Seller",
};

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <div className="text-xs uppercase tracking-wide text-zinc-500">
          Seller
        </div>
        <div className="text-base font-medium">Accarena Seller Portal</div>
      </div>
      {children}
    </div>
  );
}
