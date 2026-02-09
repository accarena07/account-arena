"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BuyerHeader from "../components/BuyerHeader";

type PaymentMethod = "qris" | "bca" | "mandiri" | "gopay";

const paymentMethods: Array<{
  id: PaymentMethod;
  label: string;
  description: string;
  logo: string;
  group: "direct" | "bank" | "wallet";
}> = [
  {
    id: "qris",
    label: "QRIS",
    description: "Scan via GoPay, OVO, ShopeePay",
    logo: "QRIS",
    group: "direct",
  },
  {
    id: "bca",
    label: "BCA Virtual Account",
    description: "Fast confirmation",
    logo: "BCA",
    group: "bank",
  },
  {
    id: "mandiri",
    label: "Mandiri Bill Payment",
    description: "Available 24/7",
    logo: "Mandiri",
    group: "bank",
  },
  {
    id: "gopay",
    label: "GoPay",
    description: "Instant e-wallet payment",
    logo: "GoPay",
    group: "wallet",
  },
];

export default function BuyerPaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("qris");

  return (
    <div className="min-h-screen bg-background-light text-slate-900 transition-colors duration-200 dark:bg-background-dark dark:text-slate-100">
      <BuyerHeader isLoggedIn />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-6">
            <div className="mb-2 flex items-center gap-3">
              <Link className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="/account-detail">
                <span className="material-symbols-outlined text-slate-500">arrow_back</span>
              </Link>
              <h1 className="text-2xl font-bold">Secure Checkout</h1>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <h2 className="mb-4 text-sm font-bold tracking-wider text-slate-500 uppercase">Account Information</h2>
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="h-32 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-700 md:w-48">
                  <Image
                    alt="Game Background"
                    className="h-full w-full object-cover"
                    height={128}
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80"
                    width={192}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      VALORANT
                    </span>
                    <span className="rounded bg-secondary/10 px-2 py-0.5 text-xs font-bold text-secondary">TIER RADIANT</span>
                  </div>
                  <h3 className="text-xl leading-tight font-bold">Radiant Rank Account - 150+ Skins, Full Access Email</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">public</span> Asia Pacific
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified_user</span> Instant Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <h2 className="mb-4 text-sm font-bold tracking-wider text-slate-500 uppercase">Payment Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Account Price</span>
                  <span>Rp 1.250.000</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Platform Admin Fee</span>
                  <span>Rp 12.500</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Payment Processing Fee</span>
                  <span>Rp 5.000</span>
                </div>
                <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4 dark:border-slate-700">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-2xl font-black text-secondary">Rp 1.267.500</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["security", "Buyer Protection", "green"],
                ["verified", "Verified Account", "blue"],
                ["lock", "SSL Encrypted", "purple"],
                ["bolt", "Fast Release", "orange"],
              ].map(([icon, label, tone]) => (
                <div
                  className={`flex flex-col items-center rounded-xl p-4 text-center ${
                    tone === "green"
                      ? "bg-green-50 dark:bg-green-900/10"
                      : tone === "blue"
                        ? "bg-blue-50 dark:bg-blue-900/10"
                        : tone === "purple"
                          ? "bg-purple-50 dark:bg-purple-900/10"
                          : "bg-orange-50 dark:bg-orange-900/10"
                  }`}
                  key={label}
                >
                  <span className="material-symbols-outlined mb-2">{icon}</span>
                  <span className="text-[10px] font-bold uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full space-y-6 lg:w-100">
            <div className="sticky top-24 rounded-2xl border-2 border-primary/10 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-800">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold">Select Payment</h2>
                <div className="flex items-center gap-1 opacity-60">
                  <span className="text-[10px] font-bold">Powered by</span>
                  <span className="text-xs font-black tracking-tighter text-blue-800 dark:text-blue-400">Midtrans</span>
                </div>
              </div>

              <div className="space-y-4">
                {paymentMethods
                  .filter((method) => method.group === "direct")
                  .map((method) => (
                    <button
                      className={`w-full rounded-xl border p-4 text-left transition-all ${
                        selectedMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 hover:border-primary dark:border-slate-700"
                      }`}
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      type="button"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input checked={selectedMethod === method.id} className="h-5 w-5 text-primary" readOnly type="radio" />
                          <div>
                            <p className="text-sm font-bold">{method.label}</p>
                            <p className="text-xs text-slate-500">{method.description}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-500">{method.logo}</span>
                      </div>
                    </button>
                  ))}

                <div className="space-y-2">
                  <p className="ml-1 text-xs font-bold text-slate-400 uppercase">Bank Transfer (Virtual Account)</p>
                  {paymentMethods
                    .filter((method) => method.group === "bank")
                    .map((method) => (
                      <button
                        className={`w-full rounded-xl border p-4 text-left transition-all ${
                          selectedMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 hover:border-primary dark:border-slate-700"
                        }`}
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        type="button"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input checked={selectedMethod === method.id} className="h-5 w-5 text-primary" readOnly type="radio" />
                            <div>
                              <p className="text-sm font-bold">{method.label}</p>
                              <p className="text-xs text-slate-500">{method.description}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-500">{method.logo}</span>
                        </div>
                      </button>
                    ))}
                </div>

                <div className="space-y-2 pt-2">
                  <p className="ml-1 text-xs font-bold text-slate-400 uppercase">E-Wallet Direct</p>
                  {paymentMethods
                    .filter((method) => method.group === "wallet")
                    .map((method) => (
                      <button
                        className={`w-full rounded-xl border p-4 text-left transition-all ${
                          selectedMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 hover:border-primary dark:border-slate-700"
                        }`}
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        type="button"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input checked={selectedMethod === method.id} className="h-5 w-5 text-primary" readOnly type="radio" />
                            <p className="text-sm font-bold">{method.label}</p>
                          </div>
                          <span className="text-xs font-bold text-slate-500">{method.logo}</span>
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Link
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 active:scale-[0.98]"
                  href="/payment/processing"
                >
                  <span className="material-symbols-outlined">lock</span>
                  Pay Now (Rp 1.267.500)
                </Link>
                <p className="px-4 text-center text-[11px] text-slate-500 dark:text-slate-400">
                  By clicking Pay Now, you agree to our Terms of Service and Privacy Policy. Funds are held in escrow
                  until account delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="mb-6 flex flex-wrap justify-center gap-4 opacity-70">
            {[
              "PayPal",
              "Visa",
              "Mastercard",
              "JCB",
            ].map((brand) => (
              <span className="rounded-md border border-slate-200 px-3 py-1 text-xs font-bold text-slate-500 dark:border-slate-700" key={brand}>
                {brand}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2024 GAMEMARKET Indonesia. All transactions are protected by industry-standard 256-bit encryption.
          </p>
        </div>
      </footer>
    </div>
  );
}
