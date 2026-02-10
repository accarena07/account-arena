"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateStepOne } from "@/lib/redux/slices/sellerCreateListingSlice";
import SellerFieldLabel from "../form/SellerFieldLabel";
import SellerInputShell from "../form/SellerInputShell";
import SellerSectionCard from "../form/SellerSectionCard";

type CreateListingStepOneProps = {
  onNext: () => void;
};

export default function CreateListingStepOne({
  onNext,
}: CreateListingStepOneProps) {
  const dispatch = useAppDispatch();
  const { gameCategory, listingHeadline, rankProgress, description } =
    useAppSelector((state) => state.sellerCreateListing);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <SellerSectionCard className="p-6 md:p-10 transition-all hover:shadow-xl hover:shadow-blue-900/5 group">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="space-y-3">
                <SellerFieldLabel>Game Category</SellerFieldLabel>
                <div className="relative group/sel">
                  <SellerInputShell className="hover:border-[#254294] group-focus-within/sel:border-[#254294]">
                    <select
                      className="w-full px-5 py-4 bg-transparent outline-none dark:text-white appearance-none cursor-pointer font-bold text-sm italic"
                      value={gameCategory}
                      onChange={(event) =>
                        dispatch(updateStepOne({ gameCategory: event.target.value }))
                      }
                    >
                      <option value="">Select a game</option>
                      <option>Mobile Legends: Bang Bang</option>
                      <option>Genshin Impact</option>
                      <option>VALORANT</option>
                    </select>
                  </SellerInputShell>
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover/sel:text-[#254294] pointer-events-none transition-colors">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <SellerFieldLabel>Listing Headline</SellerFieldLabel>
                <SellerInputShell className="focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-[#254294]">
                  <input
                    type="text"
                    placeholder="e.g. Mythic Glory | 200+ Skins | Full Emblem"
                    className="w-full px-5 py-4 bg-transparent outline-none dark:text-white placeholder:text-slate-300 font-bold text-sm italic"
                    value={listingHeadline}
                    onChange={(event) =>
                      dispatch(updateStepOne({ listingHeadline: event.target.value }))
                    }
                  />
                </SellerInputShell>
                <p className="px-1 text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">
                  * Use catchy words to attract buyers
                </p>
              </div>

              <div className="space-y-3">
                <SellerFieldLabel>Rank / Level / Progress</SellerFieldLabel>
                <div className="relative group/inp">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/inp:text-[#254294] transition-colors text-xl">
                    military_tech
                  </span>
                  <SellerInputShell className="focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-[#254294]">
                    <input
                      type="text"
                      placeholder="e.g. AR 60 / Immortal 3"
                      className="w-full pl-14 pr-5 py-4 bg-transparent outline-none dark:text-white placeholder:text-slate-300 font-bold text-sm italic"
                      value={rankProgress}
                      onChange={(event) =>
                        dispatch(updateStepOne({ rankProgress: event.target.value }))
                      }
                    />
                  </SellerInputShell>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <SellerFieldLabel>Detailed Description</SellerFieldLabel>
              <SellerInputShell className="rounded-4xl focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-[#254294]">
                <textarea
                  placeholder="Describe everything: inventory, rare skins, login method, winrate, etc..."
                  className="w-full h-full min-h-75 px-6 py-5 bg-transparent outline-none dark:text-white placeholder:text-slate-300 font-bold text-sm resize-none italic leading-relaxed"
                  value={description}
                  onChange={(event) =>
                    dispatch(updateStepOne({ description: event.target.value }))
                  }
                />
              </SellerInputShell>
            </div>
          </div>

          <div className="mt-12 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-[1.25rem] p-5 flex gap-5 items-center">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-blue-900/30 shadow-sm border border-blue-100 dark:border-blue-800 flex items-center justify-center text-[#254294]">
              <span className="material-symbols-outlined text-lg font-black italic">
                info
              </span>
            </div>
            <p className="text-[10px] text-[#254294] dark:text-blue-400 font-bold uppercase tracking-widest italic leading-relaxed">
              Account details must be accurate. False info leads to bans.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-50 dark:border-slate-800/50">
            <button className="w-full sm:w-auto px-8 py-3.5 text-slate-400 hover:text-slate-900 dark:hover:text-white text-[10px] font-black uppercase tracking-widest italic transition-colors">
              Cancel
            </button>
            <button
              onClick={onNext}
              className="w-full sm:w-auto bg-[#254294] hover:bg-blue-900 text-white px-10 py-4 rounded-[1.25rem] font-black uppercase tracking-widest italic shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 transition-all"
            >
              Next Step
              <span className="material-symbols-outlined text-[20px] font-black">
                arrow_forward
              </span>
            </button>
          </div>
        </SellerSectionCard>
      </div>
      <div className="space-y-6" />
    </div>
  );
}
