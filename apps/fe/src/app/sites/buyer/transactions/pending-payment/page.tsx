import Image from "next/image";
import Link from "next/link";
import BuyerHeader from "../../components/BuyerHeader";

export default function BuyerTransactionPendingPage() {
  return (
    <div className="min-h-screen bg-background-light text-slate-900 transition-colors duration-300 dark:bg-background-dark dark:text-slate-100">
      <BuyerHeader isLoggedIn searchPlaceholder="Search for game accounts..." />

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link className="transition-colors hover:text-primary" href="/sites/buyer">
            Home
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link className="transition-colors hover:text-primary" href="/sites/buyer/transactions">
            Daftar Transaksi
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="font-medium text-slate-900 dark:text-slate-100">TRX-9921048821</span>
        </nav>

        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100 p-6 dark:border-slate-700 md:flex-row md:items-center md:p-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-extrabold">Detail Transaksi</h1>
              <div className="flex items-center gap-3">
                <p className="font-medium text-slate-500 dark:text-slate-400">
                  Order ID: <span className="font-bold text-primary">TRX-9921048821</span>
                </p>
                <button className="rounded-lg border border-red-200 px-3 py-1 text-xs font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white" type="button">
                  Batalkan Pesanan
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                </span>
                Menunggu Pembayaran
              </span>
              <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                Berakhir dalam: <span className="font-bold text-red-500">23:59:59</span>
              </span>
            </div>
          </div>

          <div className="bg-slate-50/50 px-8 py-10 dark:bg-slate-900/50">
            <div className="relative mx-auto flex max-w-2xl items-center justify-between">
              <div className="absolute top-1/2 left-0 -z-0 h-1 w-full -translate-y-1/2 bg-slate-200 dark:bg-slate-700"></div>
              <div className="absolute top-1/2 left-0 -z-0 h-1 w-[0%] -translate-y-1/2 bg-primary"></div>

              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white ring-4 ring-white shadow-lg shadow-primary/30 dark:ring-slate-900">
                  <span className="material-symbols-outlined text-sm">payments</span>
                </div>
                <span className="text-xs font-bold tracking-wider text-primary uppercase">Pending</span>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-400 dark:bg-slate-700">
                  <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                </div>
                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Diproses</span>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-400 dark:bg-slate-700">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                </div>
                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Selesai</span>
              </div>
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
                      Akun premium dengan inventory melimpah, termasuk skin limited edition dan bundle eksklusif.
                      Full access dengan email pertama (OGE).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <div className="flex items-center gap-2 border-b border-slate-100 p-6 dark:border-slate-700">
                <span className="material-symbols-outlined text-primary">help_outline</span>
                <h2 className="text-lg font-bold">Cara Pembayaran</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {[
                    ["1", "Pilih Metode Pembayaran", "Pastikan Anda telah memilih metode pembayaran yang sesuai di kolom sebelah kanan."],
                    [
                      "2",
                      "Transfer Sesuai Nominal",
                      "Lakukan transfer ke nomor Virtual Account yang tertera dengan nominal yang tepat hingga 3 digit terakhir (kode unik).",
                    ],
                    [
                      "3",
                      "Tunggu Verifikasi Otomatis",
                      "Sistem akan melakukan verifikasi secara otomatis dalam waktu maksimal 5-10 menit setelah transfer berhasil.",
                    ],
                  ].map(([step, title, desc]) => (
                    <div className="flex gap-4" key={step}>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-primary dark:bg-slate-700">
                        {step}
                      </div>
                      <div>
                        <h4 className="mb-1 font-bold">{title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-orange-100 bg-orange-50 p-4 dark:border-orange-900/30 dark:bg-orange-900/20">
                <span className="material-symbols-outlined shrink-0 text-orange-600">warning</span>
                <p className="text-xs font-medium text-orange-700 dark:text-orange-300">
                  Penting: Jangan tutup halaman ini sampai Anda selesai melakukan pembayaran. Batas waktu pembayaran
                  adalah 24 jam sejak pesanan dibuat.
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <div className="flex items-center gap-2 border-b border-slate-100 p-6 dark:border-slate-700">
                <span className="material-symbols-outlined text-primary">payments</span>
                <h2 className="text-lg font-bold">Rincian Pembayaran</h2>
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
              </div>
              <div className="flex justify-center bg-slate-50 p-4 dark:bg-slate-700/40">
                <Link
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-extrabold text-white transition-all hover:bg-blue-800"
                  href="/sites/buyer/payment/processing"
                >
                  <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                  Bayar Sekarang
                </Link>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <div className="flex items-center gap-2 border-b border-slate-100 p-6 dark:border-slate-700">
                <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                <h2 className="text-lg font-bold">Metode Pembayaran</h2>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-12 items-center justify-center rounded border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-700">
                      <span className="text-[10px] font-black italic text-blue-900 dark:text-blue-400">BCA</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold">BCA Virtual Account</p>
                      <p className="text-xs text-slate-500">Otomatis Terverifikasi</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/60">
                  <p className="mb-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Nomor VA</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lg font-extrabold text-primary">8077 0895 2210 12</span>
                    <button className="p-1 text-primary hover:text-blue-700" type="button">
                      <span className="material-symbols-outlined text-[20px]">content_copy</span>
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                  <span className="material-symbols-outlined text-sm text-blue-600">info</span>
                  <p className="text-[11px] text-blue-700 dark:text-blue-300">Harap transfer nominal yang sesuai hingga angka terakhir.</p>
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

      <footer className="mt-20 bg-primary py-16 text-slate-300">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white/10 p-2 backdrop-blur-sm">
                <span className="material-symbols-outlined text-white">sports_esports</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">GameMarket</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              The most trusted marketplace to buy and sell premium game accounts and items with verified security.
            </p>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Marketplace</h4>
            <ul className="space-y-4 text-sm">
              <li><Link className="transition-colors hover:text-white" href="#">Browse Accounts</Link></li>
              <li><Link className="transition-colors hover:text-white" href="#">Item & Skins</Link></li>
              <li><Link className="transition-colors hover:text-white" href="#">Top Up Voucher</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link className="transition-colors hover:text-white" href="#">Help Center</Link></li>
              <li><Link className="transition-colors hover:text-white" href="#">How to Sell</Link></li>
              <li><Link className="transition-colors hover:text-white" href="#">Safety Tips</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Newsletter</h4>
            <p className="mb-4 text-sm">Get updates on new premium listings.</p>
            <div className="relative">
              <input
                className="w-full rounded-lg border-white/10 bg-white/5 py-3 px-4 text-sm outline-none focus:border-transparent focus:ring-secondary"
                placeholder="Your email address"
                type="email"
              />
              <button className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md bg-secondary p-1.5 text-white transition-all hover:brightness-110" type="button">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-[1440px] flex-col items-center justify-between gap-4 border-t border-white/5 px-6 pt-8 text-xs font-medium md:flex-row">
          <p>© 2024 GAMEMARKET Indonesia. All rights reserved.</p>
          <div className="flex gap-8">
            <Link className="hover:text-white" href="#">Privacy Policy</Link>
            <Link className="hover:text-white" href="#">Terms of Use</Link>
            <Link className="hover:text-white" href="#">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
