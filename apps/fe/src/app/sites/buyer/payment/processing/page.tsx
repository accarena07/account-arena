"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BuyerHeader from "../../components/BuyerHeader";

const INITIAL_SECONDS = 23 * 3600 + 54 * 60 + 12;

function formatTime(totalSeconds: number) {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export default function BuyerPaymentProcessingPage() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background-light text-slate-900 transition-colors duration-200 dark:bg-background-dark dark:text-slate-100">
      <BuyerHeader isLoggedIn />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-800 md:p-12">
            <div className="absolute top-0 left-0 h-1.5 w-full bg-slate-100 dark:bg-slate-700">
              <div className="h-full w-2/3 bg-primary"></div>
            </div>

            <div className="relative mb-8 flex justify-center">
              <div className="h-24 w-24 animate-spin rounded-full border-4 border-slate-100 border-t-primary dark:border-slate-700 dark:border-t-primary"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-primary">payments</span>
              </div>
            </div>

            <h1 className="mb-2 text-2xl font-bold md:text-3xl">Sedang Menunggu Pembayaran</h1>
            <p className="mb-8 text-slate-500 dark:text-slate-400">Mohon selesaikan pembayaran Anda sebelum waktu habis.</p>

            <div className="mb-10 grid grid-cols-1 gap-6 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left dark:border-slate-700 dark:bg-slate-900/50 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">Order ID</p>
                <p className="font-mono text-lg font-bold text-slate-700 dark:text-slate-200">#GM-9823104</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">Total Amount</p>
                <p className="text-lg font-black text-secondary">Rp 1.267.500</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">Expires In</p>
                <div className="flex items-center gap-1.5 text-lg font-bold text-red-500">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  <span>{formatTime(secondsLeft)}</span>
                </div>
              </div>
            </div>

            <div className="mx-auto flex max-w-sm flex-col gap-4">
              <button
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700"
                type="button"
              >
                <span>Lanjutkan Pembayaran</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">open_in_new</span>
              </button>
              <Link
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                href="/payment/success"
              >
                <span className="material-symbols-outlined text-xl">refresh</span>
                <span>Cek Status Pembayaran</span>
              </Link>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="flex items-start gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10">
              <span className="material-symbols-outlined mt-0.5 text-blue-600">info</span>
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="mb-1 font-bold">Sudah membayar tapi status belum berubah?</p>
                <p>
                  Terkadang sistem membutuhkan waktu hingga 5 menit untuk sinkronisasi dengan bank atau e-wallet.
                  Silakan klik tombol <b>Cek Status</b> secara berkala.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 opacity-60 grayscale">
              {["QRIS", "BCA", "Mandiri", "GoPay"].map((brand) => (
                <span className="rounded-md border border-slate-200 px-3 py-1 text-xs font-bold text-slate-500 dark:border-slate-700" key={brand}>
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <Link className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-primary dark:text-slate-400" href="/">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Kembali ke Beranda
          </Link>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2024 GAMEMARKET Indonesia. Layanan pembayaran aman didukung oleh sistem enkripsi standar industri.
          </p>
        </div>
      </footer>
    </div>
  );
}
