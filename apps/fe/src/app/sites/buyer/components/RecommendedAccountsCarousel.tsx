"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type ListingItem = {
  badge: string;
  game: string;
  region: string;
  title: string;
  price: string;
  total: string;
  image: string;
};

type RecommendedAccountsCarouselProps = {
  listings: ListingItem[];
};

export default function RecommendedAccountsCarousel({ listings }: RecommendedAccountsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCards(direction: "left" | "right") {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-card='recommended']");
    const cardWidth = card?.offsetWidth ?? 320;
    const gap = 24;
    const delta = cardWidth + gap;

    track.scrollBy({
      left: direction === "left" ? -delta : delta,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <button
        aria-label="Lihat rekomendasi sebelumnya"
        className="absolute top-1/2 left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 md:block"
        onClick={() => {
          scrollByCards("left");
        }}
        type="button"
      >
        <span className="material-symbols-outlined text-xl">chevron_left</span>
      </button>
      <button
        aria-label="Lihat rekomendasi berikutnya"
        className="absolute top-1/2 right-0 z-20 hidden translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 md:block"
        onClick={() => {
          scrollByCards("right");
        }}
        type="button"
      >
        <span className="material-symbols-outlined text-xl">chevron_right</span>
      </button>

      <div
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        ref={trackRef}
      >
        {listings.map((listing) => (
          <article
            className="group min-w-70 flex-[0_0_280px] snap-start overflow-hidden rounded-4xl border border-slate-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:min-w-[320px] sm:flex-[0_0_320px] lg:min-w-85 lg:flex-[0_0_340px]"
            data-card="recommended"
            key={listing.title}
          >
            <div className="relative h-52 overflow-hidden md:h-56">
              <Image
                alt="Listing Image"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                fill
                sizes="(min-width:1024px) 340px, (min-width:640px) 320px, 280px"
                src={listing.image}
              />
              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold text-white uppercase backdrop-blur-md">
                  {listing.badge}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-wider text-primary uppercase dark:text-blue-400">
                  {listing.game}
                </span>
                <span className="text-[10px] text-slate-400">•</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">{listing.region}</span>
              </div>
              <h3 className="mb-6 h-10 line-clamp-2 leading-tight font-bold text-slate-900 dark:text-white">{listing.title}</h3>
              <div className="mb-6 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Harga Akun</span>
                  <span className="font-bold dark:text-white">{listing.price}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">TOTAL</span>
                  <span className="text-lg font-extrabold text-secondary">{listing.total}</span>
                </div>
              </div>
              <Link
                className="block w-full rounded-2xl bg-primary py-3.5 text-center font-bold text-white transition-colors hover:bg-blue-900"
                href="/account-detail"
              >
                Beli Sekarang
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
