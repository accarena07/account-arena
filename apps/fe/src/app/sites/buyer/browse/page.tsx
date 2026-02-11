"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import BuyerFooter from "../components/BuyerFooter";
import BuyerTopNav from "../components/BuyerTopNav";

const listingCards = [
  {
    badge: "Tier Radiant",
    badgeClass: "bg-primary",
    tier: "Radiant",
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
    tier: "Gold",
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
    tier: "Diamond",
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
    tier: "Iron",
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

const gameOptions: Array<[string, boolean]> = [
  ["Valorant", true],
  ["Dota 2", false],
  ["Mobile Legends", false],
  ["Genshin Impact", false],
];

const rankOptions: Array<[string, boolean]> = [
  ["Iron", false],
  ["Gold", false],
  ["Diamond", false],
  ["Radiant", true],
];

type Filters = {
  game: string;
  rank: string;
  minPrice: string;
  maxPrice: string;
  region: string;
};

const defaultGame = gameOptions.find(([, checked]) => checked)?.[0] ?? "All Games";
const defaultRank = rankOptions.find(([, checked]) => checked)?.[0] ?? "";

const defaultFilters: Filters = {
  game: defaultGame,
  rank: defaultRank,
  minPrice: "",
  maxPrice: "",
  region: "All Regions",
};

function parseRupiah(value: string) {
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly ? Number(digitsOnly) : null;
}

export default function BuyerBrowsePage() {
  const [draftFilters, setDraftFilters] = useState<Filters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(defaultFilters);
  const [sortBy, setSortBy] = useState("Latest Listings");

  const isFilterDirty = JSON.stringify(draftFilters) !== JSON.stringify(appliedFilters);

  const filteredListings = useMemo(() => {
    let result = [...listingCards];

    if (appliedFilters.game !== "All Games") {
      result = result.filter((item) => item.game === appliedFilters.game);
    }

    if (appliedFilters.rank) {
      result = result.filter((item) => item.tier === appliedFilters.rank);
    }

    if (appliedFilters.region !== "All Regions") {
      result = result.filter((item) => item.region === appliedFilters.region);
    }

    const min = parseRupiah(appliedFilters.minPrice);
    const max = parseRupiah(appliedFilters.maxPrice);

    if (min !== null) {
      result = result.filter((item) => (parseRupiah(item.price) ?? 0) >= min);
    }

    if (max !== null) {
      result = result.filter((item) => (parseRupiah(item.price) ?? 0) <= max);
    }

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => (parseRupiah(a.price) ?? 0) - (parseRupiah(b.price) ?? 0));
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => (parseRupiah(b.price) ?? 0) - (parseRupiah(a.price) ?? 0));
    }

    return result;
  }, [appliedFilters, sortBy]);

  const pageTitle = appliedFilters.game === "All Games" ? "Browse Accounts" : `${appliedFilters.game} Accounts`;

  function handleResetFilters() {
    setDraftFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  }

  function handleApplyFilters() {
    setAppliedFilters(draftFilters);
  }

  return (
    <div className="min-h-screen bg-background-light text-slate-900 transition-colors duration-300 dark:bg-background-dark dark:text-slate-100">
      <BuyerTopNav searchPlaceholder="Search for game accounts, skins, or items..." />

      <main className="mx-auto max-w-360 px-4 py-8 md:px-6">
        <Breadcrumb
          className="mb-8 text-xs md:text-sm"
          items={[
            { label: "Home", href: "/" },
            { label: "Games", href: "/browse" },
            { label: "Browse Accounts" },
          ]}
        />

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 space-y-6 lg:w-72">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <span className="material-symbols-outlined text-primary">filter_list</span>
                  Filters
                </h2>
                <button className="text-xs font-semibold text-primary hover:underline" onClick={handleResetFilters} type="button">
                  Reset
                </button>
              </div>

              <div className="mb-8">
                <h3 className="mb-4 text-[11px] font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                  Select Game
                </h3>
                <div className="space-y-2">
                  {gameOptions.map(([game]) => (
                    <label
                      className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-700"
                      key={game}
                    >
                      <input
                        checked={draftFilters.game === game}
                        className="h-4 w-4 text-primary focus:ring-primary"
                        name="game"
                        onChange={() => {
                          setDraftFilters((prev) => ({ ...prev, game }));
                        }}
                        type="radio"
                      />
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
                  {rankOptions.map(([tier]) => (
                    <button
                      className={`rounded-lg border px-3 py-2 text-xs font-bold transition-all ${
                        draftFilters.rank === tier
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-200 hover:border-primary hover:text-primary dark:border-slate-700"
                      }`}
                      key={tier}
                      onClick={() => {
                        setDraftFilters((prev) => ({ ...prev, rank: tier }));
                      }}
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
                    value={draftFilters.minPrice}
                    onChange={(event) => {
                      setDraftFilters((prev) => ({ ...prev, minPrice: event.target.value }));
                    }}
                    type="text"
                  />
                  <div className="h-px w-2 bg-slate-300 dark:bg-slate-600"></div>
                  <input
                    className="w-full rounded-lg border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                    placeholder="Rp Max"
                    value={draftFilters.maxPrice}
                    onChange={(event) => {
                      setDraftFilters((prev) => ({ ...prev, maxPrice: event.target.value }));
                    }}
                    type="text"
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-[11px] font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                  Region
                </h3>
                <select
                  className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                  onChange={(event) => {
                    setDraftFilters((prev) => ({ ...prev, region: event.target.value }));
                  }}
                  value={draftFilters.region}
                >
                  <option>All Regions</option>
                  <option>Asia Pacific</option>
                  <option>North America</option>
                  <option>Europe</option>
                </select>
              </div>

              <button
                className="mt-6 w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isFilterDirty}
                onClick={handleApplyFilters}
                type="button"
              >
                Apply Filters
              </button>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-primary to-blue-900 p-6 text-white shadow-lg">
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
                <h1 className="mb-1 text-3xl font-extrabold">{pageTitle}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Showing {filteredListings.length} premium accounts available today
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-400">Sort by:</span>
                <select
                  className="rounded-lg border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-primary dark:border-slate-700 dark:bg-slate-800"
                  onChange={(event) => {
                    setSortBy(event.target.value);
                  }}
                  value={sortBy}
                >
                  <option>Latest Listings</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rank</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredListings.map((listing) => (
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
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
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
            {filteredListings.length === 0 && (
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                Tidak ada akun yang cocok dengan filter saat ini. Coba ubah filter lalu klik Apply.
              </div>
            )}

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

      <BuyerFooter />
    </div>
  );
}
