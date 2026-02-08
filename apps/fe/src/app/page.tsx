export default function RootPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">
        Accarena Multi-Domain FE
      </h1>
      <p className="text-sm text-zinc-600">
        Halaman ini biasanya tidak terlihat di production karena request akan
        di-rewrite oleh middleware berdasarkan domain:
      </p>

      <div className="rounded-2xl border border-zinc-200 p-5 shadow-sm">
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>
            <span className="font-mono">accarena.store</span> → Buyer
          </li>
          <li>
            <span className="font-mono">seller.accarena.store</span> → Seller
          </li>
          <li>
            <span className="font-mono">admin.accarena.store</span> → Admin
          </li>
        </ul>
      </div>

      <p className="text-sm text-zinc-600">
        Untuk dev lokal, kamu bisa pakai host header (contoh){" "}
        <span className="font-mono">seller.localhost</span> /
        <span className="font-mono"> admin.localhost</span> dengan mapping hosts
        atau pakai fitur Local Domains di Vercel.
      </p>
    </main>
  );
}
