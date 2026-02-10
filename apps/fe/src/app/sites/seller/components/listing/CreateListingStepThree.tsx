"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  updateStepThree,
  type SellerDeliveryMethod,
} from "@/lib/redux/slices/sellerCreateListingSlice";
import SellerFieldLabel from "../form/SellerFieldLabel";
import SellerInputShell from "../form/SellerInputShell";
import SellerSectionCard from "../form/SellerSectionCard";

type CreateListingStepThreeProps = {
  onBack: () => void;
  onNext: () => void;
};

export default function CreateListingStepThree({
  onBack,
  onNext,
}: CreateListingStepThreeProps) {
  const dispatch = useAppDispatch();
  const { price, priceNegotiable, deliveryMethod } = useAppSelector(
    (state) => state.sellerCreateListing,
  );

  return (
    <SellerSectionCard className="p-6 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-10">
          <div className="space-y-4">
            <SellerFieldLabel>Selling Price (IDR)</SellerFieldLabel>
            <div className="relative group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400 group-focus-within:text-[#254294] transition-colors italic">
                Rp
              </span>
              <SellerInputShell className="rounded-3xl focus-within:ring-4 focus-within:ring-[#254294]/5 focus-within:border-[#254294]">
                <input
                  className="w-full pl-16 pr-6 py-5 bg-transparent outline-none dark:text-white font-black text-2xl placeholder:text-slate-200 italic"
                  placeholder="0"
                  type="number"
                  value={price}
                  onChange={(event) =>
                    dispatch(updateStepThree({ price: event.target.value }))
                  }
                />
              </SellerInputShell>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-orange-50/30 dark:bg-orange-900/10 rounded-3xl border border-dashed border-orange-200 dark:border-orange-900/30 group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-orange-900/20 flex items-center justify-center text-orange-500 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl font-black italic">
                  handshake
                </span>
              </div>
              <div>
                <span className="block text-sm font-black text-slate-900 dark:text-white italic tracking-tight">
                  Price Negotiation
                </span>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-tighter italic">
                  Allow buyers to offer
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={priceNegotiable}
                onChange={(event) =>
                  dispatch(updateStepThree({ priceNegotiable: event.target.checked }))
                }
              />
              <div className="w-12 h-6.5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF7D1F]"></div>
            </label>
          </div>

          <div className="space-y-4">
            <SellerFieldLabel>Delivery Method</SellerFieldLabel>
            <div className="relative group">
              <SellerInputShell className="rounded-3xl hover:border-[#254294] group-focus-within:border-[#254294]">
                <select
                  className="w-full px-6 py-5 bg-transparent outline-none dark:text-white font-black text-sm appearance-none cursor-pointer italic"
                  value={deliveryMethod}
                  onChange={(event) =>
                    dispatch(
                      updateStepThree({
                        deliveryMethod: event.target.value as SellerDeliveryMethod,
                      }),
                    )
                  }
                >
                  <option value="instant">Instant Delivery (Automated)</option>
                  <option value="manual">Manual Delivery (Chat-based)</option>
                </select>
              </SellerInputShell>
              <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#254294] pointer-events-none transition-colors">
                expand_more
              </span>
            </div>
            <div className="flex items-center gap-2 px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                Recommended: Instant increases sales by 40%
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-50/50 dark:bg-black/20 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8 italic flex items-center gap-2">
              <span className="w-4 h-0.5 bg-slate-200 dark:bg-slate-800"></span>
              Earnings Breakdown
            </h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center group/item">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Price
                </span>
                <span className="text-base font-black text-slate-900 dark:text-white italic">
                  Rp 1.500.000
                </span>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                  Platform Fee (5%)
                </span>
                <span className="text-sm font-black text-red-500 italic">
                  - Rp 75.000
                </span>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">
                    You Receive
                  </span>
                  <span className="text-3xl font-black text-[#FF7D1F] italic tracking-tight">
                    Rp 1.425.000
                  </span>
                </div>
                <div className="w-12 h-12 bg-[#FF7D1F]/10 rounded-2xl flex items-center justify-center text-[#FF7D1F]">
                  <span className="material-symbols-outlined text-2xl font-black italic">
                    payments
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-3xl p-6 flex gap-5 items-start">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20 border-2 border-blue-50">
              <span className="material-symbols-outlined text-xl font-black italic">
                verified_user
              </span>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-blue-900 dark:text-blue-400 mb-1 uppercase tracking-widest italic">
                Seller Protection
              </h4>
              <p className="text-[10px] text-blue-800/70 dark:text-blue-400/70 leading-relaxed font-bold italic tracking-tight">
                Funds stay in escrow until delivery is confirmed. You are
                protected against unauthorized chargebacks.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-50 dark:border-slate-800/50">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-8 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white text-[10px] font-black uppercase tracking-widest italic transition-colors flex items-center justify-center gap-2 order-2 sm:order-1"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Previous
        </button>
        <button
          onClick={onNext}
          className="w-full sm:w-auto bg-[#254294] hover:bg-blue-900 text-white px-10 py-4 rounded-[1.25rem] font-black uppercase tracking-widest italic shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 transition-all order-1 sm:order-2"
        >
          Next Step
          <span className="material-symbols-outlined text-[20px] font-black">
            arrow_forward
          </span>
        </button>
      </div>
    </SellerSectionCard>
  );
}
