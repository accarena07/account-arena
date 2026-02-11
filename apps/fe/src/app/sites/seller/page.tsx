"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  sellerDashboardStats,
  sellerInventorySnapshot,
} from "./data/dashboard";
import SellerActionModal from "./components/SellerActionModal";
import SellerGlobalFooter from "./components/SellerGlobalFooter";
import SellerPageHeader from "./components/SellerPageHeader";
import SellerProfileInfo from "./components/SellerProfileInfo";
import SellerSearchInput from "./components/SellerSearchInput";
import SellerUtilityButtons from "./components/SellerUtilityButtons";

export default function SellerDashboardPage() {
  const [openModal, setOpenModal] = useState<"pending" | "active" | null>(null);

  const pendingOrders = useMemo(
    () => [
      {
        id: "ORD-9921",
        title: "Valorant Radiant - 150+ skins",
        buyer: "Dimas P.",
        amount: "Rp 1.262.500",
      },
      {
        id: "ORD-9922",
        title: "Mobile Legends Mythic Glory",
        buyer: "Kevin S.",
        amount: "Rp 2.424.000",
      },
      {
        id: "ORD-9923",
        title: "Dota 2 Immortal Account",
        buyer: "Rafi A.",
        amount: "Rp 858.500",
      },
      {
        id: "ORD-9924",
        title: "Genshin AR60 Whale",
        buyer: "Nadia K.",
        amount: "Rp 5.555.000",
      },
      {
        id: "ORD-9925",
        title: "PUBG Conqueror S19",
        buyer: "Hendra T.",
        amount: "Rp 3.200.000",
      },
    ],
    [],
  );

  const activeListings = useMemo(
    () => [
      {
        id: "LST-120",
        title: "Valorant Radiant Full Access",
        game: "Valorant",
        price: "Rp 1.250.000",
      },
      {
        id: "LST-121",
        title: "ML Full Collector Skin",
        game: "Mobile Legends",
        price: "Rp 2.400.000",
      },
      {
        id: "LST-122",
        title: "Dota 2 Immortal 6.5k",
        game: "Dota 2",
        price: "Rp 850.000",
      },
      {
        id: "LST-123",
        title: "Genshin C6 Package",
        game: "Genshin Impact",
        price: "Rp 5.500.000",
      },
      {
        id: "LST-124",
        title: "PUBG Old Rare Account",
        game: "PUBG Mobile",
        price: "Rp 3.200.000",
      },
    ],
    [],
  );

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full">
      <header className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row">
        <SellerSearchInput
          icon="manage_search"
          placeholder="Search orders or listings..."
        />
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <SellerUtilityButtons />
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>
          <div className="flex items-center gap-3 pl-2 ml-auto sm:ml-0">
            <SellerProfileInfo />
          </div>
        </div>
      </header>

      <SellerPageHeader
        align="center"
        breadcrumbs={[{ label: "Dashboard Overview" }]}
        title="Dashboard Overview"
        subtitle={
          <>
            Monitor your performance & manage{" "}
            <span className="text-slate-900 dark:text-white">
              daily operations
            </span>
          </>
        }
        rightContent={
          <Link
            href="/listings/new"
            className="flex w-full items-center justify-center gap-4 rounded-2xl bg-[#254294] px-10 py-4.5 text-xs font-black uppercase tracking-widest italic text-white shadow-2xl shadow-blue-900/20 transition-all hover:scale-[1.02] hover:bg-blue-900 active:scale-95 md:w-auto"
          >
            <span className="material-symbols-outlined text-[24px] font-black italic">
              add_circle
            </span>
            Add New Product
          </Link>
        }
      />

      <div className="mb-10 p-6 md:p-8 bg-orange-50/50 dark:bg-orange-950/10 border border-orange-100 dark:border-orange-900/30 rounded-4xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-14 h-14 bg-white dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-500 shadow-lg shadow-orange-500/10 border border-orange-100 dark:border-orange-900/20 shrink-0 group-hover:rotate-6 transition-transform">
            <span className="material-symbols-outlined text-2xl font-black italic">
              rocket_launch
            </span>
          </div>
          <div>
            <h4 className="font-black text-orange-900 dark:text-orange-300 text-lg italic tracking-tight uppercase">
              5 Pending Shipments Required!
            </h4>
            <p className="text-orange-800/60 dark:text-orange-400/60 font-black text-[10px] uppercase tracking-widest italic mt-1">
              Process these orders now to maintain your{" "}
              <span className="text-orange-600 dark:text-orange-400">
                Pro Seller Status
              </span>
            </p>
          </div>
        </div>
        <button className="w-full lg:w-auto bg-[#FF7D1F] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest italic shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all text-[11px] active:scale-95">
          Process Batch
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2">
        {sellerDashboardStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group"
          >
            <div className="flex justify-between items-start mb-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] italic">
                {stat.label}
              </p>
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-50 dark:border-slate-800 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl italic font-black text-[#254294] dark:text-blue-400">
                  {stat.icon}
                </span>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter">
              {stat.value}
            </h3>

            <p className="text-slate-400 mt-3 text-[10px] font-black uppercase tracking-widest italic group-hover:text-slate-500 transition-colors">
              {stat.note}
            </p>

            {stat.label === "Pending Orders" ? (
              <button
                className="mt-5 rounded-xl border border-orange-200 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-orange-600 transition-colors hover:bg-orange-50 dark:border-orange-900/50 dark:text-orange-400 dark:hover:bg-orange-900/20"
                onClick={() => setOpenModal("pending")}
                type="button"
              >
                View Pending Orders
              </button>
            ) : null}

            {stat.label === "Active Listings" ? (
              <button
                className="mt-5 rounded-xl border border-blue-200 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#254294] transition-colors hover:bg-blue-50 dark:border-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                onClick={() => setOpenModal("active")}
                type="button"
              >
                View Active Listings
              </button>
            ) : null}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm group">
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-10 flex items-center justify-between">
              Inventory Snapshot
              <span className="w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full"></span>
            </h3>
            <div className="space-y-8">
              {sellerInventorySnapshot.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between group/row"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-3 h-3 rounded-full ${item.color} shadow-lg shadow-current/20 group-hover/row:scale-125 transition-transform`}
                    ></div>
                    <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest italic transition-colors group-hover/row:text-slate-900 dark:group-hover/row:text-white">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-slate-900 dark:text-white italic tracking-tighter">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/listings"
              className="mt-12 w-full text-center text-[#254294] dark:text-blue-400 text-[11px] font-black uppercase tracking-widest italic group-hover:translate-x-1 transition-all flex items-center justify-center gap-2 hover:underline decoration-2"
            >
              Management Console{" "}
              <span className="material-symbols-outlined text-lg font-black transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-10 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-8">
            Recent Activity
          </h3>
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
              <p className="text-sm font-bold text-slate-900 dark:text-white">Order ORD-9921 is awaiting shipment data.</p>
              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">2 minutes ago</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
              <p className="text-sm font-bold text-slate-900 dark:text-white">Listing LST-124 has been viewed 42 times today.</p>
              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">1 hour ago</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
              <p className="text-sm font-bold text-slate-900 dark:text-white">Payout request submitted successfully.</p>
              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">3 hours ago</p>
            </div>
          </div>
          <Link
            className="mt-8 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#254294] hover:underline dark:text-blue-400"
            href="/transactions"
          >
            Open Management Summary
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>

      <SellerActionModal
        cancelLabel="Close"
        description="Review orders that still require payment confirmation or account handover."
        open={openModal === "pending"}
        title="Pending Orders"
        onClose={() => setOpenModal(null)}
      >
        <div className="space-y-3">
          {pendingOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{order.title}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{order.id}</p>
                </div>
                <p className="text-xs font-black text-orange-500">{order.amount}</p>
              </div>
              <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">Buyer: {order.buyer}</p>
            </div>
          ))}
        </div>
      </SellerActionModal>

      <SellerActionModal
        cancelLabel="Close"
        description="Current listings that are visible and purchasable by buyers."
        open={openModal === "active"}
        title="Active Listings"
        onClose={() => setOpenModal(null)}
      >
        <div className="space-y-3">
          {activeListings.map((listing) => (
            <div
              key={listing.id}
              className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{listing.title}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{listing.id}</p>
                </div>
                <p className="text-xs font-black text-[#254294] dark:text-blue-400">{listing.price}</p>
              </div>
              <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">Game: {listing.game}</p>
            </div>
          ))}
        </div>
      </SellerActionModal>

      <SellerGlobalFooter
        copyright="© 2024 AccountArena • Premium Gaming Marketplace • All Rights Reserved"
        links={[
          { label: "Safety Guide" },
          { label: "Seller Protection" },
          { label: "Terms of Service" },
        ]}
        statusText="Global Systems Active"
      />
    </div>
  );
}
