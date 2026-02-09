import Image from "next/image";
import Link from "next/link";
import BuyerFooter from "./components/BuyerFooter";
import BuyerHeader from "./components/BuyerHeader";

const games = [
  {
    name: "Dota 2",
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Valorant",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Mobile Legends",
    image:
      "https://images.unsplash.com/photo-1528747045269-390fe33c19f3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Genshin Impact",
    image:
      "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Free Fire",
    image:
      "https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "PUBG Mobile",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80",
  },
];

const listings = [
  {
    badge: "Tier Radiant",
    game: "Valorant",
    region: "Asia Pacific",
    title: "Radiant Rank Account - 150+ Skins, Full Access Email",
    price: "Rp1.250.000",
    total: "Rp1.262.500",
    image:
      "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=1200&q=80",
  },
  {
    badge: "Mythical Glory",
    game: "Mobile Legends",
    region: "All Region",
    title: "Full Skins Collector & Legend, Winrate 70%+, No...",
    price: "Rp2.400.000",
    total: "Rp2.424.000",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function BuyerLandingPage() {
  return (
    <div className="bg-background-light text-slate-900 transition-colors duration-300 dark:bg-background-dark dark:text-slate-100">
      <BuyerHeader />

      <main className="container mx-auto px-4 py-6 md:py-8">
        <section className="relative mb-10 min-h-112.5 overflow-hidden rounded-2xl bg-linear-to-br from-[#1e293b] to-background-dark md:mb-16 md:h-125 md:rounded-3xl">
          <Image
            alt="Futuristic gaming background"
            className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay"
            fill
            priority
            sizes="100vw"
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=80"
          />
          <div className="relative z-10 flex h-full max-w-3xl flex-col justify-center px-6 py-12 md:px-16 md:py-0">
            <span className="mb-4 inline-block w-fit rounded-md bg-secondary px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase md:mb-6 md:text-xs">
              Limited Offer
            </span>
            <h1 className="mb-4 text-3xl leading-tight font-extrabold text-white md:text-6xl">
              Dapatkan Akun Premium <br className="hidden md:block" />
              <span className="text-secondary">Harga Termurah</span>
            </h1>
            <p className="mb-8 max-w-xl text-base text-slate-300 md:mb-10 md:text-lg">
              Nikmati transaksi aman dan instan untuk ribuan akun game populer. Diskon hingga 50% untuk pengguna
              baru.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                className="rounded-2xl bg-secondary px-8 py-4 text-center font-extrabold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
                href="/browse"
              >
                Mulai Belanja
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-extrabold dark:text-white md:text-2xl">Pilih Game</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Temukan item dan akun berdasarkan game favoritmu</p>
            </div>
            <Link
              className="flex items-center gap-1 text-sm font-bold text-primary hover:underline dark:text-blue-400"
              href="/browse"
            >
              Lihat Semua Game <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 md:gap-6">
            {games.map((game) => (
              <div className="group cursor-pointer" key={game.name}>
                <div className="relative aspect-square rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all group-hover:-translate-y-2 group-hover:shadow-xl dark:border-slate-800 dark:bg-slate-800 md:rounded-3xl md:p-4">
                  <Image
                    alt={game.name}
                    className="rounded-xl object-cover md:rounded-2xl"
                    fill
                    sizes="(min-width:1024px) 16vw, (min-width:640px) 33vw, 50vw"
                    src={game.image}
                  />
                </div>
                <p className="mt-3 text-center text-sm font-bold text-slate-700 dark:text-slate-300 md:text-base">{game.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold dark:text-white md:text-2xl">Rekomendasi Akun</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Pilihan akun terbaik hari ini</p>
            </div>
            <button
              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
              type="button"
            >
              <span className="material-symbols-outlined text-xl">tune</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {listings.map((listing) => (
              <div
                className="group overflow-hidden rounded-4xl border border-slate-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                key={listing.title}
              >
                <div className="relative h-52 overflow-hidden md:h-56">
                  <Image
                    alt="Listing Image"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
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
                  <h3 className="mb-6 h-10 line-clamp-2 leading-tight font-bold text-slate-900 dark:text-white">
                    {listing.title}
                  </h3>
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
              </div>
            ))}
          </div>
        </section>
      </main>

      <BuyerFooter />
    </div>
  );
}
