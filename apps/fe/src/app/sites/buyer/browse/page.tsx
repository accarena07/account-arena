"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { applyInitialTheme, toggleDarkMode } from "../components/theme";

const listingCards = [
  {
    badge: "Tier Radiant",
    badgeClass: "bg-primary",
    game: "Valorant",
    region: "Asia Pacific",
    title: "Radiant Rank Account - 150+ Skins, Full Access Email",
    price: "Rp 1.250.000",
    fee: "+ Rp 12.500",
    total: "Rp 1.262.500",
    titleHover: "group-hover:text-primary",
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80",
  },
  {
    badge: "Mythical Glory",
    badgeClass: "bg-secondary",
    game: "Mobile Legends",
    region: "Indonesia",
    title: "Full Skins Collector & Legend, Winrate 70%+, No Minus",
    price: "Rp 2.400.000",
    fee: "+ Rp 24.000",
    total: "Rp 2.424.000",
    titleHover: "group-hover:text-secondary",
    image:
      "https://images.unsplash.com/photo-1528747045269-390fe33c19f3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    badge: "AR 60",
    badgeClass: "bg-blue-500",
    game: "Genshin Impact",
    region: "Asia Server",
    title: "AR 60 Whales Account - C6 Raiden, C6 Nahida + BiS Weapons",
    price: "Rp 5.500.000",
    fee: "+ Rp 55.000",
    total: "Rp 5.555.000",
    titleHover: "group-hover:text-blue-400",
    image:
      "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    badge: "Immortal",
    badgeClass: "bg-red-600",
    game: "Dota 2",
    region: "6.5k MMR",
    title: "Immortal Rank Account - Exclusive Battlepass Items",
    price: "Rp 850.000",
    fee: "+ Rp 8.500",
    total: "Rp 858.500",
    titleHover: "group-hover:text-red-500",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function BuyerBrowsePage() {
  useEffect(() => {
    applyInitialTheme();
  }, []);

  return (
    <div className="min-h-screen bg-background-light text-slate-900 transition-colors duration-300 dark:bg-background-dark dark:text-slate-100">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex h-20 max-w-360 items-center justify-between gap-4 px-4 md:gap-8 md:px-6">
          <div className="shrink-0">
            <Link className="flex items-center gap-2" href="/">
              <div className="rounded-lg bg-primary p-2">
                <span className="material-symbols-outlined text-white">sports_esports</span>
              </div>
              <span className="hidden text-xl font-bold tracking-tight text-primary uppercase dark:text-white sm:block">
                GameMarket
              </span>
            </Link>
          </div>

          <div className="relative hidden max-w-2xl flex-1 sm:flex">
            <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-400">search</span>
            <input
              className="w-full rounded-full border-slate-200 bg-slate-50 py-2.5 pr-4 pl-12 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
              placeholder="Search for game accounts, skins, or items..."
              type="text"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2 md:gap-4">
            <button
              className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={toggleDarkMode}
              type="button"
            >
              <span className="material-symbols-outlined dark:!hidden">dark_mode</span>
              <span className="material-symbols-outlined !hidden dark:!inline-block">light_mode</span>
            </button>
            <div className="mx-1 hidden h-8 w-px bg-slate-200 md:block dark:bg-slate-700"></div>
            <Link
              className="px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:text-primary dark:text-slate-200"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="rounded-lg bg-secondary px-4 py-2.5 text-sm font-bold whitespace-nowrap text-white shadow-lg shadow-orange-500/20 transition-all hover:brightness-110 md:px-6"
              href="/register"
            >
              Register
            </Link>
            <button
              className="hidden items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold whitespace-nowrap text-white transition-all hover:brightness-110 xl:flex"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">storefront</span>
              Sell Account
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-4 py-8 md:px-6">
        <nav className="mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-xs text-slate-500 md:text-sm dark:text-slate-400">
          <Link className="hover:text-primary" href="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link className="hover:text-primary" href="/browse">
            Games
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-medium text-slate-900 dark:text-slate-100">Browse Accounts</span>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full flex-shrink-0 space-y-6 lg:w-72">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <span className="material-symbols-outlined text-primary">filter_list</span>
                  Filters
                </h2>
                <button className="text-xs font-semibold text-primary hover:underline" type="button">
                  Reset
                </button>
              </div>

              <div className="mb-8">
                <h3 className="mb-4 text-[11px] font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                  Select Game
                </h3>
                <div className="space-y-2">
                  {[
                    ["Valorant", true],
                    ["Dota 2", false],
                    ["Mobile Legends", false],
                    ["Genshin Impact", false],
                  ].map(([game, checked]) => (
                    <label
                      className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-700"
                      key={game}
                    >
                      <input className="h-4 w-4 text-primary focus:ring-primary" defaultChecked={checked} name="game" type="radio" />
                      <span className="text-sm font-medium group-hover:text-primary">{game}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="mb-4 text-[11px] font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                  Rank Tier
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["Iron", false],
                    ["Gold", false],
                    ["Diamond", false],
                    ["Radiant", true],
                  ].map(([tier, active]) => (
                    <button
                      className={`rounded-lg border px-3 py-2 text-xs font-bold transition-all ${
                        active
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-200 hover:border-primary hover:text-primary dark:border-slate-700"
                      }`}
                      key={tier}
                      type="button"
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="mb-4 text-[11px] font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                  Price Range
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    className="w-full rounded-lg border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                    placeholder="Rp Min"
                    type="text"
                  />
                  <div className="h-px w-2 bg-slate-300 dark:bg-slate-600"></div>
                  <input
                    className="w-full rounded-lg border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                    placeholder="Rp Max"
                    type="text"
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-[11px] font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                  Region
                </h3>
                <select className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800">
                  <option>All Regions</option>
                  <option>Asia Pacific</option>
                  <option>North America</option>
                  <option>Europe</option>
                </select>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-blue-900 p-6 text-white shadow-lg">
              <div className="relative z-10">
                <span className="mb-2 inline-block rounded bg-white/20 px-2 py-1 text-[10px] font-bold uppercase">Exclusive</span>
                <h4 className="mb-1 font-bold">Secure Transactions</h4>
                <p className="mb-4 text-xs leading-relaxed text-blue-100/80">
                  Every account trade is protected by our middleman system.
                </p>
                <button className="flex items-center gap-1 text-xs font-bold transition-all hover:gap-2" type="button">
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 rotate-12 text-8xl text-white/10">
                security
              </span>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="mb-1 text-3xl font-extrabold">Valorant Accounts</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Showing 124 premium accounts available today</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-400">Sort by:</span>
                <select className="rounded-lg border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-primary dark:border-slate-700 dark:bg-slate-800">
                  <option>Latest Listings</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rank</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {listingCards.map((listing) => (
                <article
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-2xl dark:border-slate-800 dark:bg-slate-800"
                  key={listing.title}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      alt={listing.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      fill
                      sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
                      src={listing.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span
                        className={`${listing.badgeClass} rounded px-2.5 py-1 text-[10px] font-extrabold tracking-widest text-white uppercase shadow-lg`}
                      >
                        {listing.badge}
                      </span>
                    </div>
                    <div className="absolute right-4 bottom-4 left-4">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-[9px] font-bold tracking-widest text-blue-400 uppercase">{listing.game}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-500"></span>
                        <span className="text-[9px] font-bold tracking-widest text-slate-300 uppercase">{listing.region}</span>
                      </div>
                      <h3 className={`font-bold leading-tight text-white transition-colors ${listing.titleHover}`}>{listing.title}</h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div className="mb-6 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Harga Akun</span>
                        <span className="font-bold">{listing.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 dark:text-slate-500">Admin Fee</span>
                        <span className="text-slate-400">{listing.fee}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
                        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">TOTAL</span>
                        <span className="text-xl font-extrabold text-secondary">{listing.total}</span>
                      </div>
                    </div>

                    <Link
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-900"
                      href="/account-detail"
                    >
                      <span className="material-symbols-outlined text-sm">shopping_cart</span>
                      Beli Sekarang
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 flex items-center justify-center gap-2">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-800"
                disabled
                type="button"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-white shadow-md shadow-primary/20" type="button">
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
            <p className="max-w-xs text-sm leading-relaxed">
              The most trusted marketplace to buy and sell premium game accounts and items with verified security.
            </p>
            <div className="flex items-center gap-4">
              {["public", "photo_camera", "language"].map((icon) => (
                <Link
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
                  href="#"
                  key={icon}
                >
                  <span className="material-symbols-outlined text-xl">{icon}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Marketplace</h4>
            <ul className="space-y-4 text-sm">
              {[
                "Browse Accounts",
                "Item & Skins",
                "Top Up Voucher",
                "Game Top Up",
              ].map((item) => (
                <li key={item}>
                  <Link className="transition-colors hover:text-white" href="#">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Support</h4>
            <ul className="space-y-4 text-sm">
              {["Help Center", "How to Sell", "Safety Tips", "Term & Conditions"].map((item) => (
                <li key={item}>
                  <Link className="transition-colors hover:text-white" href="#">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Newsletter</h4>
            <p className="mb-4 text-sm">Get updates on new premium listings.</p>
            <div className="relative">
              <input
                className="w-full rounded-lg border border-white/10 bg-white/5 py-3.5 pr-12 pl-4 text-sm outline-none focus:border-transparent focus:ring-secondary"
                placeholder="Your email address"
                type="email"
              />
              <button
                className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center justify-center rounded-md bg-secondary p-2 text-white transition-all hover:brightness-110"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-[1440px] flex-col items-center justify-between gap-4 border-t border-white/5 px-6 pt-8 text-[11px] font-medium text-slate-400 md:flex-row">
          <p>© 2024 GAMEMARKET Indonesia. All rights reserved.</p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Use", "Contact Us"].map((item) => (
              <Link className="transition-colors hover:text-white" href="#" key={item}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
