import Image from "next/image";
import Link from "next/link";
import BuyerFooter from "../components/BuyerFooter";
import BuyerHeader from "../components/BuyerHeader";

const transactions = [
  {
    game: "Valorant",
    date: "12 Okt 2023, 14:20",
    title: "Radiant Rank Account - 150+ Skins, Full Access Email",
    orderId: "TRX-99281723",
    total: "Rp 1.262.500",
    status: "Selesai",
    statusClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    action: "Lihat Detail",
    actionClass:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    actionHref: "/transactions/completed",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80",
  },
  {
    game: "Mobile Legends",
    date: "14 Okt 2023, 09:12",
    title: "Full Skins Collector & Legend, Winrate 70%+",
    orderId: "TRX-99452011",
    total: "Rp 2.424.000",
    status: "Menunggu Pembayaran",
    statusClass: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    action: "Bayar Sekarang",
    actionClass: "bg-secondary text-white hover:brightness-110 shadow-md shadow-orange-500/20",
    actionHref: "/transactions/pending-payment",
    image: "https://images.unsplash.com/photo-1528747045269-390fe33c19f3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    game: "Genshin Impact",
    date: "15 Okt 2023, 20:41",
    title: "AR 60 Whales Account - C6 Raiden, C6 Nahida + BiS",
    orderId: "TRX-99511377",
    total: "Rp 5.555.000",
    status: "Sedang Diproses",
    statusClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    action: "Lihat Status",
    actionClass:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    actionHref: "/transactions/in-progress",
    image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function BuyerTransactionsPage() {
  return (
    <div className="min-h-screen bg-background-light text-slate-900 transition-colors duration-300 dark:bg-background-dark dark:text-slate-100">
      <BuyerHeader isLoggedIn searchPlaceholder="Cari transaksi..." />

      <main className="relative z-0 mx-auto max-w-250 px-4 py-8 md:px-6">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link className="transition-colors hover:text-primary" href="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link className="transition-colors hover:text-primary" href="#">
            Akun Saya
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">Riwayat Transaksi</span>
        </nav>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-extrabold">Riwayat Transaksi</h1>
          <p className="text-slate-500 dark:text-slate-400">Pantau semua status pembelian akun game kamu di sini.</p>
        </div>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-800">
          <div className="custom-scrollbar flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            {["Semua", "Pending", "Sedang Diproses", "Selesai", "Dibatalkan"].map((tab, index) => (
              <button
                className={`rounded-xl px-6 py-2.5 text-sm transition-all ${
                  index === 0
                    ? "bg-primary font-bold text-white shadow-md shadow-blue-500/20"
                    : "font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
                key={tab}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {transactions.map((trx) => (
            <div
              className="rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-800"
              key={trx.orderId}
            >
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl md:w-48">
                  <Image
                    alt={`${trx.game} Thumbnail`}
                    className="h-full w-full object-cover"
                    height={128}
                    src={trx.image}
                    width={192}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase ${
                            trx.game === "Valorant"
                              ? "bg-blue-50 text-primary dark:bg-blue-900/30"
                              : "bg-orange-50 text-secondary dark:bg-orange-900/30"
                          }`}
                        >
                          {trx.game}
                        </span>
                        <span className="text-xs text-slate-400">• {trx.date}</span>
                      </div>
                      <h3 className="text-lg leading-tight font-bold">{trx.title}</h3>
                      <p className="mt-1 text-xs font-medium tracking-tighter text-slate-500 uppercase">
                        Order ID: <span className="font-bold text-slate-700 dark:text-slate-300">{trx.orderId}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="mb-1 text-xs text-slate-500">Total Belanja</p>
                      <p className="text-xl leading-none font-extrabold text-secondary">{trx.total}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
                    <span className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold ${trx.statusClass}`}>
                      <span className="material-symbols-outlined text-sm">
                        {trx.status === "Selesai"
                          ? "check_circle"
                          : trx.status === "Sedang Diproses"
                            ? "hourglass_top"
                            : "schedule"}
                      </span>
                      {trx.status}
                    </span>
                    <Link className={`rounded-xl px-5 py-2 text-xs font-bold transition-all ${trx.actionClass}`} href={trx.actionHref}>
                      {trx.action}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-800"
            disabled
            type="button"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-white" type="button">
            1
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 font-bold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
            type="button"
          >
            2
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 font-bold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
            type="button"
          >
            3
          </button>
          <span className="mx-1 text-slate-400">...</span>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 font-bold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
            type="button"
          >
            12
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
            type="button"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>

      <BuyerFooter />
    </div>
  );
}
