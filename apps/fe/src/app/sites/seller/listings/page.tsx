"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import SellerActionModal from "../components/SellerActionModal";
import SellerGlobalFooter from "../components/SellerGlobalFooter";
import SellerPageHeader from "../components/SellerPageHeader";
import SellerProfileInfo from "../components/SellerProfileInfo";
import SellerStatusBadge from "../components/SellerStatusBadge";
import { sellerListings, sellerListingTabs } from "../data/listings";
import type { SellerListing } from "../types";

type ListingTabKey = "all" | "active" | "sold" | "draft";

export default function MyListingsPage() {
  const [listings, setListings] = useState<SellerListing[]>(sellerListings);
  const [activeTab, setActiveTab] = useState<ListingTabKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [gameFilter, setGameFilter] = useState("all");

  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editStatus, setEditStatus] = useState<SellerListing["statusKind"]>("active");

  const selectedListing = useMemo(
    () => listings.find((item) => item.id === selectedId) ?? null,
    [listings, selectedId],
  );

  const tabCounts = useMemo(
    () => ({
      all: listings.length,
      active: listings.filter((item) => item.statusKind === "active").length,
      sold: listings.filter((item) => item.statusKind === "sold").length,
      draft: listings.filter((item) => item.statusKind === "draft").length,
    }),
    [listings],
  );

  const games = useMemo(
    () => Array.from(new Set(listings.map((item) => item.game))).sort((a, b) => a.localeCompare(b)),
    [listings],
  );

  const filteredListings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return listings.filter((item) => {
      const tabMatch = activeTab === "all" ? true : item.statusKind === activeTab;
      const gameMatch = gameFilter === "all" ? true : item.game === gameFilter;
      const searchMatch =
        query.length === 0
          ? true
          : item.title.toLowerCase().includes(query) ||
            item.game.toLowerCase().includes(query) ||
            item.level.toLowerCase().includes(query);

      return tabMatch && gameMatch && searchMatch;
    });
  }, [activeTab, gameFilter, listings, searchQuery]);

  function openEditModal(item: SellerListing) {
    setSelectedId(item.id);
    setEditPrice(item.price);
    setEditStatus(item.statusKind);
    setModalType("edit");
  }

  function openDeleteModal(item: SellerListing) {
    setSelectedId(item.id);
    setModalType("delete");
  }

  function closeModal() {
    setModalType(null);
    setSelectedId(null);
  }

  function saveListingEdit() {
    if (!selectedListing) return;

    const statusLabelMap: Record<SellerListing["statusKind"], string> = {
      active: "Active",
      sold: "Sold",
      draft: "Draft",
      success: "Success",
      processing: "Processing",
      failed: "Failed",
    };

    setListings((prev) =>
      prev.map((item) =>
        item.id === selectedListing.id
          ? { ...item, price: editPrice, statusKind: editStatus, status: statusLabelMap[editStatus] }
          : item,
      ),
    );
    closeModal();
  }

  function deleteListing() {
    if (!selectedListing) return;
    setListings((prev) => prev.filter((item) => item.id !== selectedListing.id));
    closeModal();
  }

  const tabMeta: Array<{ label: string; key: ListingTabKey }> = sellerListingTabs.map((tab, idx) => ({
    label: tab.label,
    key: (["all", "active", "sold", "draft"][idx] as ListingTabKey) ?? "all",
  }));

  return (
    <div className="mx-auto flex-1 w-full max-w-6xl">
      <SellerPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "My Listings" },
        ]}
        rightContent={
          <div className="flex w-full items-center justify-between gap-6 border-t border-slate-100 pt-6 dark:border-slate-800 md:w-auto md:justify-end md:border-t-0 md:pt-0">
            <Link
              className="flex items-center gap-3 rounded-2xl bg-[#254294] px-6 py-3.5 text-[10px] font-black tracking-widest text-white uppercase italic shadow-xl shadow-blue-900/10 transition-all hover:scale-105 hover:bg-blue-900 active:scale-95"
              href="/listings/new"
            >
              <span className="material-symbols-outlined text-lg font-black">add_circle</span>
              Create New Listing
            </Link>
            <div className="hidden border-l border-slate-200 pl-6 dark:border-slate-800 sm:flex">
              <SellerProfileInfo />
            </div>
          </div>
        }
        subtitle={
          <>
            Manage & monitor your <span className="text-[#254294] dark:text-blue-400">game assets</span>
          </>
        }
        title="My Listings"
      />

      <div className="mb-10 border-b border-slate-200 dark:border-slate-800">
        <div className="scrollbar-hide flex items-center gap-8 overflow-x-auto pb-0.5">
          {tabMeta.map((tab) => (
            <button
              className={`group flex min-w-fit items-center gap-2 border-b-2 pb-4 transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-[#254294] text-[#254294] dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500"
              }`}
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              <span className="text-[11px] font-black tracking-widest uppercase italic">{tab.label}</span>
              <span
                className={`rounded-lg px-2 py-0.5 text-[9px] font-black italic transition-colors ${
                  activeTab === tab.key
                    ? "bg-[#254294] text-white"
                    : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 dark:bg-slate-800"
                }`}
              >
                {tabCounts[tab.key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-10 flex items-stretch gap-6 lg:flex-row flex-col">
        <div className="group relative flex-1">
          <span className="material-symbols-outlined absolute top-1/2 left-6 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#254294] italic">
            search_insights
          </span>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pr-6 pl-14 text-sm font-bold italic text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-300 focus:border-[#254294] focus:ring-4 focus:ring-[#254294]/5 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title, game, or account keywords..."
            type="text"
            value={searchQuery}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
          <div className="group relative min-w-40 flex-1 sm:flex-none">
            <select
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-white py-4 pr-12 pl-6 text-[11px] font-black tracking-widest uppercase italic shadow-sm outline-none transition-all hover:border-[#254294] dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              onChange={(event) => setGameFilter(event.target.value)}
              value={gameFilter}
            >
              <option value="all">All Games</option>
              {games.map((game) => (
                <option key={game} value={game}>
                  {game}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition-colors group-hover:text-[#254294]">
              unfold_more
            </span>
          </div>
          <button className="group flex flex-1 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-[11px] font-black tracking-widest text-slate-600 uppercase italic shadow-sm transition-all hover:bg-slate-50 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 sm:flex-none" type="button">
            <span className="material-symbols-outlined text-xl transition-transform group-hover:rotate-12">tune</span>
            Advanced
          </button>
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <div className="mb-10 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          No listings match your current filters.
        </div>
      ) : null}

      <div className="mb-12 overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30">
                <th className="px-8 py-6 text-[10px] font-black tracking-widest text-slate-400 uppercase italic">Listing Overview</th>
                <th className="px-8 py-6 text-[10px] font-black tracking-widest text-slate-400 uppercase italic">Pricing Tag</th>
                <th className="px-8 py-6 text-[10px] font-black tracking-widest text-slate-400 uppercase italic">Current Status</th>
                <th className="px-8 py-6 text-right text-[10px] font-black tracking-widest text-slate-400 uppercase italic">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredListings.map((item) => (
                <tr className="group/row transition-all hover:bg-slate-50/30 dark:hover:bg-slate-800/20" key={item.id}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="group/img relative">
                        <Image
                          alt={item.game}
                          className="h-12 w-16 shrink-0 rounded-xl border border-slate-200 bg-slate-100 object-cover shadow-sm transition-transform duration-500 group-hover/img:scale-110 dark:border-slate-700"
                          height={48}
                          src={item.image}
                          width={64}
                        />
                        <div className="absolute inset-0 rounded-xl bg-[#254294]/10 opacity-0 transition-opacity group-hover/img:opacity-100" />
                      </div>
                      <div>
                        <h4 className="mb-1 line-clamp-1 text-base font-black tracking-tight text-slate-900 italic transition-colors group-hover/row:text-[#254294] dark:text-white">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold tracking-tighter text-slate-400 uppercase italic">{item.game}</span>
                          <span className="h-1 w-1 rounded-full bg-slate-300" />
                          <span className="text-[10px] font-bold tracking-tighter text-slate-400 uppercase italic">{item.level}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-lg font-black tracking-tight text-[#FF7D1F] italic">{item.price}</span>
                  </td>
                  <td className="px-8 py-6">
                    <SellerStatusBadge className="animate-pulse" label={item.status} status={item.statusKind} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="group/btn flex h-10 w-10 items-center justify-center rounded-xl border border-transparent bg-slate-50 text-slate-400 shadow-sm transition-all hover:border-slate-100 hover:bg-white hover:text-[#254294] active:scale-90 dark:bg-slate-800/50 dark:hover:bg-slate-700"
                        onClick={() => openEditModal(item)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-xl font-black transition-transform group-hover/btn:rotate-12 italic">edit_note</span>
                      </button>
                      <button
                        className="group/btn flex h-10 w-10 items-center justify-center rounded-xl border border-transparent bg-slate-50 text-slate-400 shadow-sm transition-all hover:border-slate-100 hover:bg-white hover:text-red-500 active:scale-90 dark:bg-slate-800/50 dark:hover:bg-slate-700"
                        onClick={() => openDeleteModal(item)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-xl font-black italic">delete_forever</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 lg:hidden">
          {filteredListings.map((item) => (
            <div className="space-y-6 p-6 transition-all hover:bg-slate-50/30 dark:hover:bg-slate-800/20" key={item.id}>
              <div className="flex gap-5">
                <Image
                  alt={item.game}
                  className="h-20 w-24 shrink-0 rounded-2xl border border-slate-200 bg-slate-100 object-cover shadow-sm dark:border-slate-800"
                  height={80}
                  src={item.image}
                  width={96}
                />
                <div className="min-w-0 flex-1">
                  <SellerStatusBadge className="mb-2" label={item.status} size="xs" status={item.statusKind} />
                  <h4 className="mb-1 line-clamp-2 text-base font-black tracking-tight text-slate-900 italic dark:text-white">{item.title}</h4>
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase italic">
                    {item.game} • {item.level}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/50">
                <div>
                  <p className="mb-1 text-[9px] font-black tracking-widest text-slate-400 uppercase italic">Asking Price</p>
                  <span className="text-xl font-black tracking-tight text-[#FF7D1F] italic">{item.price}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-transform active:scale-90 dark:bg-slate-800"
                    onClick={() => openEditModal(item)}
                    type="button"
                  >
                    <span className="material-symbols-outlined font-black italic">edit</span>
                  </button>
                  <button
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-transform active:scale-90 dark:bg-red-500/10"
                    onClick={() => openDeleteModal(item)}
                    type="button"
                  >
                    <span className="material-symbols-outlined font-black italic">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-100 bg-slate-50/30 px-8 py-6 dark:border-slate-800 dark:bg-slate-800/20 md:flex-row">
          <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase italic text-center md:text-left">
            Displaying <span className="text-slate-900 dark:text-white">1 - {filteredListings.length}</span> of{" "}
            <span className="text-slate-900 dark:text-white">{listings.length}</span> listings
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button className="cursor-not-allowed rounded-xl border border-slate-200 px-5 py-2.5 text-[10px] font-black tracking-widest text-slate-400 uppercase italic opacity-50 dark:border-slate-800" disabled type="button">
              Prev
            </button>
            <div className="flex items-center px-1">
              {[1, 2, 3].map((p) => (
                <button
                  className={`h-10 w-10 rounded-xl text-[10px] font-black transition-all italic ${
                    p === 1
                      ? "scale-105 bg-[#254294] text-white shadow-lg shadow-blue-900/10"
                      : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  key={p}
                  type="button"
                >
                  {p}
                </button>
              ))}
            </div>
            <button className="rounded-xl border border-slate-200 px-5 py-2.5 text-[10px] font-black tracking-widest text-slate-600 uppercase italic shadow-sm transition-all hover:bg-white dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800" type="button">
              Next
            </button>
          </div>
        </div>
      </div>

      <SellerGlobalFooter
        copyright="© 2024 AccountArena • Premium Gaming Marketplace • All Rights Reserved"
        links={[
          { label: "Safety Guide" },
          { label: "Seller Protection" },
          { label: "Terms of Service" },
        ]}
        statusText="Global Systems Active"
      />

      <SellerActionModal
        confirmLabel="Save Listing"
        description={`Update listing data for ${selectedListing?.title ?? "selected item"}.`}
        onClose={closeModal}
        onConfirm={saveListingEdit}
        open={modalType === "edit" && Boolean(selectedListing)}
        title="Edit Listing"
      >
        <div className="space-y-4">
          <label className="block text-sm font-black tracking-wider text-slate-500 uppercase">
            Price
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              onChange={(event) => setEditPrice(event.target.value)}
              value={editPrice}
            />
          </label>
          <label className="block text-sm font-black tracking-wider text-slate-500 uppercase">
            Status
            <select
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              onChange={(event) => setEditStatus(event.target.value as SellerListing["statusKind"])}
              value={editStatus}
            >
              <option value="active">Active</option>
              <option value="sold">Sold</option>
              <option value="draft">Draft</option>
            </select>
          </label>
        </div>
      </SellerActionModal>

      <SellerActionModal
        confirmLabel="Delete Listing"
        description={`This will permanently remove ${selectedListing?.title ?? "this listing"} from your inventory.`}
        onClose={closeModal}
        onConfirm={deleteListing}
        open={modalType === "delete" && Boolean(selectedListing)}
        title="Delete Listing"
        tone="danger"
      />
    </div>
  );
}
