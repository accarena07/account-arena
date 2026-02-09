"use client";

import Link from "next/link";
import BuyerHeader from "../../components/BuyerHeader";

export default function BuyerPaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background-light text-slate-900 transition-colors duration-200 dark:bg-background-dark dark:text-slate-100">
      <BuyerHeader isLoggedIn />

      <main className="relative mx-auto max-w-4xl px-4 py-12">
        <div className="pointer-events-none absolute top-0 left-0 hidden h-48 w-full overflow-hidden md:block">
          <div className="confetti-piece confetti-1 top-10"></div>
          <div className="confetti-piece confetti-2 top-24"></div>
          <div className="confetti-piece confetti-3 top-16"></div>
          <div className="confetti-piece confetti-4 top-32"></div>
          <div className="confetti-piece confetti-5 top-12"></div>
          <div className="confetti-piece confetti-6 top-28"></div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-800 md:p-12">
            <div className="absolute top-0 left-0 h-1.5 w-full bg-green-500"></div>

            <div className="relative mb-6 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <span className="material-symbols-outlined text-6xl font-bold text-green-500">check_circle</span>
              </div>
            </div>

            <h1 className="mb-2 text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">Pembayaran Berhasil!</h1>
            <p className="mx-auto mb-8 max-w-md text-slate-500 dark:text-slate-400">
              Pesanan Anda telah kami terima dan sedang diproses. Detail akun akan dikirimkan melalui email dan menu
              pesanan.
            </p>

            <div className="mb-10 grid grid-cols-1 gap-6 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left dark:border-slate-700 dark:bg-slate-900/50 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">Order ID</p>
                <p className="font-mono text-lg font-bold text-slate-700 dark:text-slate-200">#GM-9823104</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">Total Amount</p>
                <p className="text-lg font-black text-slate-700 dark:text-white">Rp 1.267.500</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">Status</p>
                <div className="flex items-center gap-1.5 text-lg font-bold text-green-500">
                  <span className="material-symbols-outlined text-lg">verified</span>
                  <span>Lunas</span>
                </div>
              </div>
            </div>

            <div className="mx-auto flex max-w-sm flex-col gap-4">
              <Link
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700"
                href="/sites/buyer/transactions"
              >
                <span>Lihat Detail Pesanan</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">receipt_long</span>
              </Link>
              <Link
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                href="/sites/buyer"
              >
                <span className="material-symbols-outlined text-xl">home</span>
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="flex items-start gap-4 rounded-xl border border-green-100 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
              <span className="material-symbols-outlined mt-0.5 text-green-500">verified_user</span>
              <div className="text-left text-sm text-green-800 dark:text-green-300">
                <p className="mb-1 font-bold">Transaksi Anda Terlindungi</p>
                <p>
                  Dana Anda akan diteruskan ke penjual setelah Anda mengonfirmasi penerimaan akun. Keamanan Anda
                  adalah prioritas kami.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 opacity-40 grayscale">
              {["QRIS", "BCA", "Mandiri", "GoPay"].map((brand) => (
                <span className="rounded-md border border-slate-200 px-3 py-1 text-xs font-bold text-slate-500 dark:border-slate-700" key={brand}>
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-primary dark:text-slate-400" type="button">
            <span className="material-symbols-outlined text-lg">help</span>
            Butuh Bantuan? Hubungi Support
          </button>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2024 GAMEMARKET Indonesia. Layanan pembayaran aman didukung oleh sistem enkripsi standar industri.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          opacity: 0.7;
        }
        .confetti-1 {
          left: 10%;
          background: #2563eb;
          transform: rotate(15deg);
        }
        .confetti-2 {
          left: 25%;
          background: #22c55e;
          transform: rotate(-25deg);
        }
        .confetti-3 {
          left: 40%;
          background: #f97316;
          transform: rotate(45deg);
        }
        .confetti-4 {
          left: 60%;
          background: #8b5cf6;
          transform: rotate(-15deg);
        }
        .confetti-5 {
          left: 80%;
          background: #22c55e;
          transform: rotate(30deg);
        }
        .confetti-6 {
          left: 90%;
          background: #ef4444;
          transform: rotate(-45deg);
        }
      `}</style>
    </div>
  );
}
