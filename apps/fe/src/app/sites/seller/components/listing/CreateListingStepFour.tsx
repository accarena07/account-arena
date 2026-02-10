"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";

type CreateListingStepFourProps = {
  onEditStepOne: () => void;
  onEditStepTwo: () => void;
  onEditStepThree: () => void;
  onPublish: () => void;
  onSaveDraft: () => void;
};

export default function CreateListingStepFour({
  onEditStepOne,
  onEditStepTwo,
  onEditStepThree,
  onPublish,
  onSaveDraft,
}: CreateListingStepFourProps) {
  const {
    gameCategory,
    listingHeadline,
    rankProgress,
    description,
    price,
    deliveryMethod,
  } = useAppSelector((state) => state.sellerCreateListing);

  const priceNumber = Number(price || 0);
  const platformFee = Math.round(priceNumber * 0.05);
  const netPayout = priceNumber - platformFee;
  const formatIdr = (value: number) =>
    `Rp ${new Intl.NumberFormat("id-ID").format(Math.max(value, 0))}`;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group">
        <div className="px-8 md:px-12 py-8 md:py-10 border-b border-slate-100 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-[#254294] shadow-sm">
              <span className="material-symbols-outlined text-xl font-black italic">
                person
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
              Account Details
            </h3>
          </div>
          <button
            onClick={onEditStepOne}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-[#254294] transition-all"
          >
            <span className="material-symbols-outlined text-lg font-black italic">
              edit
            </span>
          </button>
        </div>
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-16">
            <div className="space-y-1.5">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic leading-none">
                Game Category
              </p>
              <p className="font-black text-slate-900 dark:text-white text-lg italic tracking-tight">
                {gameCategory || "-"}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic leading-none">
                Rank / Progress
              </p>
              <p className="font-black text-slate-900 dark:text-white text-lg italic tracking-tight">
                {rankProgress || "-"}
              </p>
            </div>
            <div className="md:col-span-2 space-y-1.5 pt-4 md:pt-0">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic leading-none">
                Listing Headline
              </p>
              <p className="font-black text-slate-900 dark:text-white text-xl italic tracking-tight p-5 bg-slate-50/50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
                {listingHeadline || "-"}
              </p>
            </div>
            <div className="md:col-span-2 space-y-3 pt-4 md:pt-0">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic leading-none">
                Full Description
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed italic border-l-4 border-[#254294] pl-6 py-2">
                {description || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group">
        <div className="px-8 md:px-12 py-8 md:py-10 border-b border-slate-100 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-[#254294] shadow-sm">
              <span className="material-symbols-outlined text-xl font-black italic">
                image
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
              Media Gallery
            </h3>
          </div>
          <button
            onClick={onEditStepTwo}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-[#254294] transition-all"
          >
            <span className="material-symbols-outlined text-lg font-black italic">
              edit
            </span>
          </button>
        </div>
        <div className="p-8 md:p-12">
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative w-48 h-32 rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shrink-0 transform hover:scale-105 transition-transform cursor-pointer shadow-md"
              >
                <Image
                  alt={`Screenshot ${i}`}
                  className="object-cover"
                  fill
                  sizes="192px"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIBC51fxhgrgBkcfYA03Jp4q19UBjRHkniaexxKWE_Dv0ZUSWM8vSacnWMi_7fe22gKWNItAM7TqQ_HNNKXCmNgN9u4YHs883-IGCvxomuiCMYPEWKhRwVYkS2pKairrbxbIkKivGAvqOcz94f-RLdQPSCGxlAcBdzkfKHvH8CXJzUD8qD9WGM09oVrNkOEwXpRNAa3Bt1pt4PzJPsmd97pG0UqlK4RKGzTtLhtJHablzDILDfV4RZrr2CWTtJwXUuoOJp7XLhQg"
                />
              </div>
            ))}
            <div className="w-48 h-32 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 shrink-0 group/more cursor-pointer">
              <span className="text-2xl font-black text-slate-300 group-hover/more:text-[#254294] transition-colors italic">
                +2
              </span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                More Media
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group">
        <div className="px-8 md:px-12 py-8 md:py-10 border-b border-slate-100 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-[#254294] shadow-sm">
              <span className="material-symbols-outlined text-xl font-black italic">
                sell
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
              Pricing & Payout
            </h3>
          </div>
          <button
            onClick={onEditStepThree}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-[#254294] transition-all"
          >
            <span className="material-symbols-outlined text-lg font-black italic">
              edit
            </span>
          </button>
        </div>
        <div className="p-8 md:p-12">
          <div className="w-full space-y-6">
            <div className="flex justify-between items-center group/p">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                Listing Price
              </span>
              <span className="text-xl font-black text-slate-900 dark:text-white italic tracking-tight">
                {formatIdr(priceNumber)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-8 border-b border-slate-100 dark:border-slate-800/50">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">
                Platform Fee (5%)
              </span>
              <span className="text-sm font-bold text-red-500 italic">
                -{formatIdr(platformFee)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-2">
                  Total Net Payout
                </span>
                <span className="text-4xl font-black text-[#FF7D1F] italic tracking-tighter">
                  {formatIdr(netPayout)}
                </span>
              </div>
              <div className="w-16 h-16 bg-[#FF7D1F]/10 rounded-3xl flex items-center justify-center text-[#FF7D1F]">
                <span className="material-symbols-outlined text-3xl font-black italic">
                  savings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-xl shadow-blue-900/5">
        <div
          className="flex items-start gap-6 mb-10 group cursor-pointer"
          onClick={() => {
            const el = document.getElementById("terms") as HTMLInputElement;
            if (el) {
              el.checked = !el.checked;
            }
          }}
        >
          <div className="flex items-center h-6 mt-1">
            <input
              className="w-6 h-6 rounded-lg border-slate-300 dark:border-slate-700 text-[#254294] focus:ring-[#254294] transition-all cursor-pointer"
              id="terms"
              type="checkbox"
            />
          </div>
          <div className="flex-1">
            <label
              className="font-black text-slate-900 dark:text-white block mb-2 cursor-pointer text-base uppercase italic tracking-tight"
              htmlFor="terms"
            >
              Confirm Ownership
            </label>
            <p className="text-slate-400 font-bold text-xs leading-relaxed italic pr-4">
              I confirm that I am the rightful owner of this account. I
              understand that fraudulent listings will result in permanent
              account suspension and legal action.
            </p>
            <p className="mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
              Delivery: {deliveryMethod === "instant" ? "Instant" : "Manual"}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <button
            onClick={onPublish}
            className="w-full md:w-3/4 bg-[#254294] hover:bg-blue-900 text-white py-5 rounded-3xl font-black uppercase tracking-widest italic shadow-2xl shadow-blue-900/30 flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 text-lg"
          >
            <span className="material-symbols-outlined font-black text-2xl italic">
              rocket_launch
            </span>
            Publish Listing
          </button>
          <button
            onClick={onSaveDraft}
            className="w-full md:w-1/4 py-5 text-slate-400 hover:text-slate-900 dark:hover:text-white font-black uppercase tracking-widest italic text-[11px] transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-xl"
          >
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  );
}
