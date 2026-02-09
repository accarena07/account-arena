"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { applyInitialTheme, toggleDarkMode } from "../components/theme";

const gallery = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
];

const recommendations = [
  {
    badge: "Immortal",
    game: "Dota 2",
    region: "6.5k MMR",
    title: "Immortal Rank Account - Exclusive Battlepass Items",
    price: "Rp 858.500",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80",
  },
  {
    badge: "Mythical Glory",
    game: "Mobile Legends",
    region: "All Region",
    title: "Full Skins Collector & Legend, Winrate 70%+",
    price: "Rp 2.424.000",
    image: "https://images.unsplash.com/photo-1528747045269-390fe33c19f3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    badge: "AR 60",
    game: "Genshin Impact",
    region: "Asia Server",
    title: "AR 60 Whales Account - C6 Raiden, C6 Nahida + BiS",
    price: "Rp 5.555.000",
    image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    badge: "Conqueror",
    game: "PUBG Mobile",
    region: "S19 Conqueror",
    title: "Old Account S2 - Glacier M4 Max Level",
    price: "Rp 3.200.000",
    image: "https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function BuyerAccountDetailPage() {
  useEffect(() => {
    applyInitialTheme();
  }, []);

  return (
    <div className="bg-background-light text-slate-900 transition-colors duration-200 dark:bg-background-dark dark:text-slate-100">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-2" href="/">
            <div className="rounded-lg bg-primary p-1.5">
              <span className="material-symbols-outlined text-white">sports_esports</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-primary uppercase dark:text-white">GameMarket</span>
          </Link>

          <div className="mx-8 hidden max-w-lg flex-1 md:flex">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <span className="material-symbols-outlined text-sm">search</span>
              </span>
              <input
                className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-10 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                placeholder="Cari akun, item, atau game..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={toggleDarkMode}
              type="button"
            >
              <span className="material-symbols-outlined dark:hidden!">dark_mode</span>
              <span className="material-symbols-outlined hidden! dark:inline-block!">light_mode</span>
            </button>
            <Link className="hidden text-sm font-medium hover:text-primary sm:block" href="/login">
              Login
            </Link>
            <Link className="rounded-xl bg-secondary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-600" href="/register">
              Register
            </Link>
            <button className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white lg:flex" type="button">
              <span className="material-symbols-outlined text-sm">storefront</span>
              Sell Account
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link className="hover:text-primary" href="/">
            Beranda
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link className="hover:text-primary" href="/browse">
            Valorant
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-medium text-slate-900 dark:text-white">Radiant Rank Account - 150+ Skins</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="relative aspect-video">
                <Image alt="Game Character Image" className="h-full w-full object-cover" fill priority sizes="(min-width:1024px) 66vw, 100vw" src={gallery[0]} />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm">Tier Radiant</span>
                </div>
                <div className="absolute right-4 bottom-4 flex gap-2">
                  <button className="rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-all hover:bg-white/40" type="button">
                    <span className="material-symbols-outlined">fullscreen</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto p-4">
                {gallery.map((src, idx) => (
                  <div
                    className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border-2 ${
                      idx === 0 ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-slate-200"
                    }`}
                    key={src}
                  >
                    <Image alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" fill sizes="96px" src={src} />
                  </div>
                ))}
                <div className="flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-500">+12</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex overflow-x-auto border-b border-slate-100 dark:border-slate-800">
                <button className="border-b-2 border-primary px-6 py-3 font-bold whitespace-nowrap text-primary" type="button">Detail Akun</button>
                <button className="border-b-2 border-transparent px-6 py-3 font-medium whitespace-nowrap text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" type="button">
                  Riwayat Transaksi
                </button>
                <button className="border-b-2 border-transparent px-6 py-3 font-medium whitespace-nowrap text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" type="button">
                  Ulasan Pembeli
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-2xl font-bold">Radiant Rank Account - 150+ Skins, Full Access Email</h2>
                  <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                    Dijual akun Valorant pribadi, aman 100%. Rank Radiant Act ini. Koleksi skin melimpah termasuk
                    Arcane Sheriff, RGX Collection, dan Champion 2023 Bundle. Email first-hand, bisa ganti data
                    lengkap. Dijual karena pensiun.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    ["Rank", "Radiant"],
                    ["Region", "Asia Pacific"],
                    ["Bind Status", "Unbind All"],
                    ["Level", "245"],
                  ].map(([label, value]) => (
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50" key={label}>
                      <span className="mb-1 block text-xs text-slate-500">{label}</span>
                      <span className={`font-bold ${label === "Bind Status" ? "text-green-600 dark:text-green-400" : ""}`}>{value}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
                    <span className="material-symbols-outlined text-primary">inventory_2</span>
                    Item Unggulan
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Arcane Sheriff",
                      "RGX Vandal",
                      "Reaver Phantom",
                      "Champions 2023 Kunai",
                      "Oni Claw",
                      "+145 Skins lainnya",
                    ].map((item) => (
                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium dark:bg-slate-800" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
              <h3 className="mb-4 text-lg font-bold">Ringkasan Pembayaran</h3>
              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Harga Akun</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Rp 1.250.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Biaya Layanan</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Rp 12.500</span>
                </div>
                <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-3 dark:border-slate-700">
                  <span className="font-bold">Total Bayar</span>
                  <span className="text-2xl font-extrabold text-secondary">Rp 1.262.500</span>
                </div>
              </div>
              <div className="space-y-3">
                <Link
                  className="block w-full rounded-2xl bg-primary py-4 text-center font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-900"
                  href="/payment"
                >
                  Beli Sekarang
                </Link>
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-50 py-4 font-bold text-slate-700 transition-all hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700" type="button">
                  <span className="material-symbols-outlined text-sm">chat_bubble_outline</span>
                  Tanya Penjual
                </button>
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-3 dark:border-blue-800/50 dark:bg-blue-900/20">
                <span className="material-symbols-outlined mt-0.5 text-sm text-primary">verified_user</span>
                <p className="text-[11px] leading-relaxed text-blue-800 dark:text-blue-300">
                  Dana Anda aman. Kami akan menahan pembayaran hingga Anda mengonfirmasi penerimaan akun sesuai
                  deskripsi.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-4 text-sm font-bold tracking-wider text-slate-400 uppercase">Informasi Penjual</h3>
              <div className="mb-4 flex items-center gap-4">
                <div className="relative">
                  <Image
                    alt="Seller Avatar"
                    className="h-14 w-14 rounded-full border-2 border-white object-cover dark:border-slate-800"
                    height={56}
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                    width={56}
                  />
                  <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-slate-900"></div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">Toko Berkah</h4>
                    <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <span className="material-symbols-outlined text-[14px] text-yellow-400">star</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">4.8</span>
                    <span>(120 Ulasan)</span>
                  </div>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl bg-slate-50 py-2 dark:bg-slate-800/50">
                  <span className="block text-[10px] text-slate-500">Bergabung</span>
                  <span className="text-xs font-bold">2 Thn Lalu</span>
                </div>
                <div className="rounded-xl bg-slate-50 py-2 dark:bg-slate-800/50">
                  <span className="block text-[10px] text-slate-500">Waktu Balas</span>
                  <span className="text-xs font-bold">± 5 Menit</span>
                </div>
              </div>

              <button className="w-full rounded-xl border border-primary/20 py-2 text-sm font-bold text-primary transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20" type="button">
                Kunjungi Toko
              </button>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Rekomendasi Lainnya</h2>
              <p className="text-slate-500">Pilihan akun terbaik untukmu hari ini</p>
            </div>
            <Link className="flex items-center gap-1 font-bold text-primary hover:underline" href="/browse">
              Lihat Semua
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map((item) => (
              <article
                className="group overflow-hidden rounded-4xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                key={item.title}
              >
                <div className="relative aspect-square">
                  <Image alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" src={item.image} />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-white uppercase">{item.badge}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                    <span>{item.game}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                    <span>{item.region}</span>
                  </div>
                  <h4 className="mb-4 line-clamp-2 text-sm font-bold">{item.title}</h4>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="block text-[10px] text-slate-400">Harga</span>
                      <span className="text-lg font-extrabold text-secondary">{item.price}</span>
                    </div>
                    <Link className="rounded-lg bg-primary/10 p-2 text-primary transition-all hover:bg-primary hover:text-white" href="/account-detail">
                      <span className="material-symbols-outlined text-sm">shopping_bag</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-24 bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-white p-1.5">
                  <span className="material-symbols-outlined text-primary">sports_esports</span>
                </div>
                <span className="text-xl font-bold uppercase">GameMarket</span>
              </div>
              <p className="text-sm leading-relaxed text-blue-200">
                Marketplace terpercaya untuk jual beli item dan akun game. Keamanan transaksi adalah prioritas utama
                kami.
              </p>
            </div>

            <div>
              <h5 className="mb-4 text-sm font-bold tracking-wider uppercase">Marketplace</h5>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link className="hover:text-white" href="#">Akun Game</Link></li>
                <li><Link className="hover:text-white" href="#">Item & Skin</Link></li>
                <li><Link className="hover:text-white" href="#">Top Up Voucher</Link></li>
                <li><Link className="hover:text-white" href="#">Game Coins</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-4 text-sm font-bold tracking-wider uppercase">Bantuan</h5>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link className="hover:text-white" href="#">Pusat Bantuan</Link></li>
                <li><Link className="hover:text-white" href="#">Cara Berjualan</Link></li>
                <li><Link className="hover:text-white" href="#">Syarat & Ketentuan</Link></li>
                <li><Link className="hover:text-white" href="#">Kebijakan Privasi</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-4 text-sm font-bold tracking-wider uppercase">Kontak Kami</h5>
              <div className="mb-6 flex gap-4">
                {[
                  ["facebook", "Facebook"],
                  ["photo_camera", "Instagram"],
                  ["public", "Website"],
                ].map(([icon, label]) => (
                  <Link className="rounded-lg bg-blue-800 p-2 transition-colors hover:bg-blue-700" href="#" key={label}>
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-300">
                <span className="material-symbols-outlined text-sm">mail</span>
                support@gamemarket.id
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-blue-800 pt-8 text-xs text-blue-400 md:flex-row">
            <p>© 2024 GAMEMARKET Indonesia. All rights reserved.</p>
            <button
              className="flex cursor-pointer items-center gap-2 rounded-full bg-blue-900/50 px-3 py-1.5 hover:bg-blue-900"
              onClick={toggleDarkMode}
              type="button"
            >
              <span className="material-symbols-outlined text-xs">dark_mode</span>
              Toggle Theme
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
