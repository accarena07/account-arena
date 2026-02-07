export default function SellerHome() {
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Seller Portal</h1>
      <p className="text-sm text-zinc-600">
        Kamu sedang berada di <span className="font-mono">seller.accarena.store</span>.
      </p>

      <div className="rounded-2xl border border-zinc-200 p-5 shadow-sm">
        <h2 className="text-lg font-medium">Next step</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>Buat halaman seller di folder <span className="font-mono">src/app/_sites/seller</span></li>
          <li>Tambahkan auth/role seller di layout seller</li>
        </ul>
      </div>
    </main>
  );
}
