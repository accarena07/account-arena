"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AdminActionModal from "../components/AdminActionModal";
import AdminPageHeader from "../components/AdminPageHeader";

export default function SettingsPage() {
  const initialCategories = [
    {
      name: "Mobile Legends",
      listings: "1,240",
      image:
        "https://wallpapers.com/images/hd/mobile-legends-avatar-1080-x-1080-px-k0v6p6n9p2p2k0v6.jpg",
    },
    {
      name: "PUBG Mobile",
      listings: "890",
      image:
        "https://e0.pxfuel.com/wallpapers/383/651/desktop-wallpaper-avatar-pubg-mobile.jpg",
    },
    { name: "Genshin Impact", listings: "567", image: "" },
    { name: "Free Fire", listings: "1,102", image: "" },
    { name: "Valorant", listings: "342", image: "" },
    { name: "Roblox", listings: "2,150", image: "" },
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [sellerTiers, setSellerTiers] = useState([
    { range: "Rp 0 - Rp 10M", fee: "10%" },
    { range: "Rp 10M - Rp 50M", fee: "7.5%" },
    { range: "Above Rp 50M", fee: "5%" },
  ]);
  const [buyerFees, setBuyerFees] = useState([
    { type: "Standard Transaction", fee: "Rp 5.000" },
    { type: "Express Withdrawal", fee: "Rp 15.000" },
  ]);

  const [minimumWithdrawal, setMinimumWithdrawal] = useState("50.000");
  const [fraudSensitivity, setFraudSensitivity] = useState("Balanced");
  const [mandatoryKyc, setMandatoryKyc] = useState(true);

  const [modalType, setModalType] = useState<
    | null
    | "addTier"
    | "deleteTier"
    | "deleteBuyerFee"
    | "addGame"
    | "editGame"
    | "deleteGame"
    | "saveSecurity"
    | "discardAll"
    | "saveAll"
  >(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [tierRangeInput, setTierRangeInput] = useState("");
  const [tierFeeInput, setTierFeeInput] = useState("");

  const [gameNameInput, setGameNameInput] = useState("");
  const [gameListingsInput, setGameListingsInput] = useState("");
  const [gameImageInput, setGameImageInput] = useState("");

  function openModal(type: NonNullable<typeof modalType>, index?: number) {
    setModalType(type);
    setSelectedIndex(index ?? null);

    if (type === "addTier") {
      setTierRangeInput("");
      setTierFeeInput("");
    }

    if ((type === "editGame" || type === "deleteGame") && typeof index === "number") {
      const selected = categories[index];
      if (selected) {
        setGameNameInput(selected.name);
        setGameListingsInput(selected.listings);
        setGameImageInput(selected.image);
      }
    }

    if (type === "addGame") {
      setGameNameInput("");
      setGameListingsInput("");
      setGameImageInput("");
    }
  }

  function closeModal() {
    setModalType(null);
    setSelectedIndex(null);
  }

  function handleModalConfirm() {
    if (modalType === "addTier") {
      if (!tierRangeInput || !tierFeeInput) return;
      setSellerTiers((prev) => [...prev, { range: tierRangeInput, fee: tierFeeInput }]);
      closeModal();
      return;
    }

    if (modalType === "deleteTier" && selectedIndex !== null) {
      setSellerTiers((prev) => prev.filter((_, idx) => idx !== selectedIndex));
      closeModal();
      return;
    }

    if (modalType === "deleteBuyerFee" && selectedIndex !== null) {
      setBuyerFees((prev) => prev.filter((_, idx) => idx !== selectedIndex));
      closeModal();
      return;
    }

    if (modalType === "addGame") {
      if (!gameNameInput || !gameListingsInput) return;
      setCategories((prev) => [...prev, { name: gameNameInput, listings: gameListingsInput, image: gameImageInput }]);
      closeModal();
      return;
    }

    if (modalType === "editGame" && selectedIndex !== null) {
      setCategories((prev) =>
        prev.map((game, idx) =>
          idx === selectedIndex ? { ...game, name: gameNameInput, listings: gameListingsInput, image: gameImageInput } : game,
        ),
      );
      closeModal();
      return;
    }

    if (modalType === "deleteGame" && selectedIndex !== null) {
      setCategories((prev) => prev.filter((_, idx) => idx !== selectedIndex));
      closeModal();
      return;
    }

    closeModal();
  }

  return (
    <>
      <AdminPageHeader
        description="Configure marketplace commission, game categories, and security protocols"
        title="Platform Settings"
      />

      <div className="space-y-10 mb-32">
        {/* Fees Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
              <span className="material-symbols-outlined mr-3 text-orange-500">
                payments
              </span>
              Fees & Commission Structure
            </h2>
            <button
              className="text-[#21337e] dark:text-blue-400 text-xs font-black uppercase tracking-widest italic hover:opacity-80 transition-all"
              onClick={() => openModal("addTier")}
              type="button"
            >
              Add New Tier
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Seller Commission Tiers */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
                  Seller Commission Tiers
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-100">
                  <thead className="border-b border-slate-50 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                        Sales Volume (Monthly)
                      </th>
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                        Fee (%)
                      </th>
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-tighter text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {sellerTiers.map((row, idx) => (
                      <tr key={idx} className="group">
                        <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">
                          {row.range}
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-16 h-8 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-900 dark:text-white">
                            {row.fee}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-red-500 transition-colors" onClick={() => openModal("deleteTier", idx)} type="button">
                            <span className="material-symbols-outlined text-lg">
                              delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Buyer Service Fees */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
                  Buyer Service Fees
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-100">
                  <thead className="border-b border-slate-50 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                        Transaction Range
                      </th>
                      <th className="px-6 py-3 text-[10px) font-black text-slate-400 uppercase tracking-tighter">
                        Flat Fee
                      </th>
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-tighter text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {buyerFees.map((row, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">
                          {row.type}
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-24 h-8 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-900 dark:text-white">
                            {row.fee}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-red-500 transition-colors" onClick={() => openModal("deleteBuyerFee", idx)} type="button">
                            <span className="material-symbols-outlined text-lg">
                              delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Game Categories Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
              <span className="material-symbols-outlined mr-3 text-blue-500">
                grid_view
              </span>
              Supported Game Categories
            </h2>
            <button className="flex items-center space-x-2 px-5 py-2 bg-[#21337e] text-white rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all w-full md:w-auto justify-center" onClick={() => openModal("addGame")} type="button">
              <span className="material-symbols-outlined text-lg">add</span>
              <span>Add New Game</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((game, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-sm group hover:border-[#21337e] transition-all relative overflow-hidden"
              >
                <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 mb-3 overflow-hidden relative">
                  {game.image ? (
                    <Image
                      src={game.image}
                      alt={game.name}
                      className="object-cover"
                      fill
                      sizes="(min-width:1024px) 16vw, (min-width:768px) 25vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700">
                        image
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <button className="w-7 h-7 bg-white/90 dark:bg-slate-900/90 rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-[#21337e] transition-colors" onClick={() => openModal("editGame", idx)} type="button">
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                    </button>
                    <button
                      className="mt-1 w-7 h-7 bg-white/90 dark:bg-slate-900/90 rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-red-500 transition-colors"
                      onClick={() => openModal("deleteGame", idx)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
                <h4 className="text-[12px] font-black text-slate-900 dark:text-white truncate uppercase italic tracking-tight">
                  {game.name}
                </h4>
                <div className="mt-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase italic tracking-tighter">
                    Active Listings:
                  </p>
                  <p className="text-[11px] font-bold text-slate-500">
                    {game.listings}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Security Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
              <span className="material-symbols-outlined mr-3 text-red-500">
                security
              </span>
              Platform Security
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic">
                  Minimum Withdrawal Limit
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm italic">
                    Rp
                  </span>
                  <input
                    className="w-full pl-10 pr-6 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-900 dark:text-white"
                    onChange={(event) => setMinimumWithdrawal(event.target.value)}
                    value={minimumWithdrawal}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic">
                  Fraud Detection Sensitivity
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-900 dark:text-white appearance-none" onChange={(event) => setFraudSensitivity(event.target.value)} value={fraudSensitivity}>
                    <option>Balanced</option>
                    <option>Conservative</option>
                    <option>Aggressive</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-orange-50/50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-orange-600">
                    verified
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase italic tracking-tight text-left">
                    Mandatory KYC for Sellers
                  </h4>
                  <p className="text-xs text-orange-700/70 dark:text-orange-400/70 font-bold uppercase italic tracking-tighter text-left">
                    Require all sellers to verify ID before listing items
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-14 sm:ml-0">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={mandatoryKyc}
                  onChange={() => setMandatoryKyc((prev) => !prev)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <div className="flex justify-end">
              <button
                className="rounded-xl bg-[#21337e] px-5 py-2 text-xs font-black tracking-widest text-white uppercase hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                onClick={() => openModal("saveSecurity")}
                type="button"
              >
                Save Security Settings
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Bottom Bar (imitating the screenshot's container) */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 md:p-6 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-50">
        <div className="flex flex-col xl:flex-row justify-between items-center max-w-7xl mx-auto gap-6 mt-4 md:mt-0">
          <div className="flex flex-col items-center xl:items-start space-y-3 xl:space-y-1 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic text-center xl:text-left order-2 xl:order-1">
            <p>© 2024 GAMEMARKET Indonesia. All rights reserved.</p>
            <div className="flex flex-wrap justify-center xl:justify-start gap-4 md:gap-6">
              <Link
                href="#"
                className="hover:text-[#21337e] dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-[#21337e] dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="hover:text-[#21337e] dark:hover:text-blue-400 transition-colors"
              >
                System Status
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto order-1 xl:order-2">
            <button className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" onClick={() => openModal("discardAll")} type="button">
              Discard Changes
            </button>
            <button className="flex-1 sm:flex-none px-4 md:px-10 py-2.5 bg-[#21337e] text-white rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:shadow-lg hover:shadow-blue-500/20 transition-all shadow-md" onClick={() => openModal("saveAll")} type="button">
              Save All Settings
            </button>
          </div>
        </div>
      </div>

      <AdminActionModal
        confirmLabel="Create Tier"
        description="Tambahkan tier baru untuk komisi seller berdasarkan volume transaksi."
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        open={modalType === "addTier"}
        title="Add New Commission Tier"
      >
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
            Sales Range
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              onChange={(event) => setTierRangeInput(event.target.value)}
              placeholder="Contoh: Rp 50M - Rp 100M"
              value={tierRangeInput}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
            Fee Percentage
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              onChange={(event) => setTierFeeInput(event.target.value)}
              placeholder="Contoh: 4%"
              value={tierFeeInput}
            />
          </label>
        </div>
      </AdminActionModal>

      <AdminActionModal
        confirmLabel="Delete Tier"
        description="Tier komisi yang dihapus tidak dapat dikembalikan."
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        open={modalType === "deleteTier"}
        title="Delete Commission Tier"
        tone="danger"
      />

      <AdminActionModal
        confirmLabel="Delete Fee Rule"
        description="Aturan biaya buyer yang dihapus tidak dapat dikembalikan."
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        open={modalType === "deleteBuyerFee"}
        title="Delete Buyer Fee Rule"
        tone="danger"
      />

      <AdminActionModal
        confirmLabel={modalType === "editGame" ? "Save Category" : "Add Category"}
        description="Kelola kategori game dan jumlah listing aktif."
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        open={modalType === "addGame" || modalType === "editGame"}
        title={modalType === "editGame" ? "Edit Game Category" : "Add New Game Category"}
      >
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
            Game Name
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              onChange={(event) => setGameNameInput(event.target.value)}
              placeholder="Contoh: Honor of Kings"
              value={gameNameInput}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
            Active Listings
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              onChange={(event) => setGameListingsInput(event.target.value)}
              placeholder="Contoh: 350"
              value={gameListingsInput}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
            Image URL (optional)
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              onChange={(event) => setGameImageInput(event.target.value)}
              placeholder="https://..."
              value={gameImageInput}
            />
          </label>
        </div>
      </AdminActionModal>

      <AdminActionModal
        confirmLabel="Delete Category"
        description="Kategori game akan dihapus dari daftar platform settings."
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        open={modalType === "deleteGame"}
        title="Delete Game Category"
        tone="danger"
      />

      <AdminActionModal
        confirmLabel="Save Security"
        description="Pastikan konfigurasi ini sudah sesuai kebijakan operasional."
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        open={modalType === "saveSecurity"}
        title="Save Security Settings"
      />

      <AdminActionModal
        confirmLabel="Discard All Changes"
        description="Perubahan yang belum disimpan akan hilang."
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        open={modalType === "discardAll"}
        title="Discard Changes"
        tone="danger"
      />

      <AdminActionModal
        confirmLabel="Save All"
        description="Simpan seluruh konfigurasi platform settings."
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        open={modalType === "saveAll"}
        title="Save All Settings"
      />
    </>
  );
}
