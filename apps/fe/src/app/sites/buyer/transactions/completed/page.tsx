import Image from "next/image";
import Link from "next/link";
import BuyerHeader from "../../components/BuyerHeader";

export default function BuyerTransactionCompletedPage() {
  return (
    <div className="min-h-screen bg-background-light font-sans text-slate-900 transition-colors duration-300 dark:bg-background-dark dark:text-slate-100">
      <BuyerHeader isLoggedIn searchPlaceholder="Search for game accounts..." />

      <main className="mx-auto max-w-300 px-4 py-8 md:px-6">
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link className="transition-colors hover:text-primary" href="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link className="transition-colors hover:text-primary" href="/transactions">
            Daftar Transaksi
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="font-medium text-slate-900 dark:text-slate-100">TRX-9921048821</span>
        </nav>

        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100 p-6 dark:border-slate-700 md:flex-row md:items-center md:p-8">
            <div>
              <h1 className="mb-1 text-2xl font-extrabold">Detail Transaksi</h1>
              <p className="font-medium text-slate-500 dark:text-slate-400">
                Order ID: <span className="font-bold text-primary">TRX-9921048821</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Pesanan Selesai
              </span>
              <span className="text-sm font-medium text-slate-400 dark:text-slate-500">Selesai pada 25 Okt 2023, 10:15</span>
            </div>
          </div>

          <div className="bg-slate-50/50 px-8 py-10 dark:bg-slate-900/50">
            <div className="relative mx-auto flex max-w-2xl items-center justify-between">
              <div className="absolute top-1/2 left-0 z-0 h-1 w-full -translate-y-1/2 bg-green-500"></div>

              {[
                "Pending",
                "Sedang Diproses",
                "Selesai",
              ].map((label, idx) => (
                <div className="relative z-10 flex flex-col items-center gap-3" key={label}>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 ${
                      idx === 2 ? "ring-4 ring-white dark:ring-slate-900" : ""
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <span className="text-xs font-bold tracking-wider text-green-600 uppercase dark:text-green-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <div className="flex items-center gap-2 border-b border-slate-100 p-6 dark:border-slate-700">
                <span className="material-symbols-outlined text-primary">account_box</span>
                <h2 className="text-lg font-bold">Ringkasan Akun</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl md:w-48">
                    <Image
                      alt="Account Preview"
                      className="h-full w-full object-cover"
                      height={128}
                      src="https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80"
                      width={192}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-2 py-1 text-[10px] font-extrabold text-primary uppercase">Radiant Tier</span>
                      <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Valorant • Asia Pacific</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">Radiant Rank Account - 150+ Skins, Full Access Email</h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      Akun premium dengan inventory melimpah, termasuk skin limited edition dan bundle eksklusif. Full
                      access dengan email pertama (OGE).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <div className="flex items-center gap-2 border-b border-slate-100 p-6 dark:border-slate-700">
                <span className="material-symbols-outlined text-primary">rate_review</span>
                <h2 className="text-lg font-bold">Review & Rating</h2>
              </div>
              <div className="p-6">
                <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
                  Bagaimana pengalaman transaksi Anda dengan penjual ini? Berikan ulasan Anda.
                </p>

                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-sm font-bold">Rating Penjual</p>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button className="group" key={star} type="button">
                          <span
                            className={`material-symbols-outlined text-3xl transition-transform group-hover:scale-110 ${
                              star <= 4 ? "text-yellow-400" : "text-slate-200 dark:text-slate-700"
                            }`}
                            style={{ fontVariationSettings: star <= 4 ? "'FILL' 1" : undefined }}
                          >
                            star
                          </span>
                        </button>
                      ))}
                      <span className="ml-2 text-sm font-medium text-slate-400">Pilih rating</span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-bold" htmlFor="review-comment">
                      Ulasan Anda
                    </label>
                    <textarea
                      className="w-full rounded-xl border-slate-200 bg-slate-50 text-sm transition-all placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800/50"
                      id="review-comment"
                      placeholder="Tuliskan pengalaman Anda berbelanja di sini..."
                      rows={4}
                    ></textarea>
                  </div>

                  <button className="w-full rounded-xl bg-primary px-8 py-3 font-bold text-white transition-all hover:bg-blue-800 md:w-auto" type="button">
                    Kirim Ulasan
                  </button>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <h2 className="text-lg font-bold">Rincian Pembayaran</h2>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Harga Akun</span>
                  <span className="font-bold">Rp 1.250.000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Service Fee</span>
                  <span className="font-bold">Rp 12.500</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Kode Unik</span>
                  <span className="font-bold text-secondary">+ Rp 312</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
                  <span className="text-sm font-bold tracking-wider uppercase">Total Bayar</span>
                  <span className="text-2xl font-extrabold text-secondary">Rp 1.262.812</span>
                </div>
                <div className="pt-4">
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700" type="button">
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    Download Invoice
                  </button>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <div className="flex items-center gap-2 border-b border-slate-100 p-6 dark:border-slate-700">
                <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                <h2 className="text-lg font-bold">Metode Pembayaran</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-12 items-center justify-center rounded border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-700">
                      <span className="text-[10px] font-black italic text-blue-900 dark:text-blue-400">BCA</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold">BCA Virtual Account</p>
                      <p className="text-xs font-bold tracking-tight text-green-500 uppercase">Sudah Dibayar</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white">
              <div className="relative z-10">
                <h4 className="mb-2 flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined text-sm">help_outline</span>
                  Butuh Bantuan?
                </h4>
                <p className="mb-4 text-xs text-blue-100/80">Tim support kami tersedia 24/7 untuk membantu kendala transaksi Anda.</p>
                <button className="w-full rounded-lg bg-white/10 py-2.5 text-sm font-bold backdrop-blur-sm transition-colors hover:bg-white/20" type="button">
                  Tiket Bantuan
                </button>
              </div>
              <span className="material-symbols-outlined absolute -right-6 -bottom-6 rotate-12 text-9xl text-white/5">support_agent</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
