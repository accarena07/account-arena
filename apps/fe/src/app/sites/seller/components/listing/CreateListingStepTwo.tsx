"use client";

import Image from "next/image";
import {
  sellerCreateListingPreviewImages,
  sellerCreateListingRequirements,
} from "../../data/create-listing";

type CreateListingStepTwoProps = {
  onBack: () => void;
  onNext: () => void;
};

export default function CreateListingStepTwo({
  onBack,
  onNext,
}: CreateListingStepTwoProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-10 transition-all hover:shadow-xl hover:shadow-blue-900/5 group/card">
          <div className="mb-10">
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
              Account Screenshots
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic mt-1">
              Upload high-quality images of your inventory & rank
            </p>
          </div>

          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-4xl p-10 md:p-16 flex flex-col items-center justify-center text-center hover:border-[#254294] dark:hover:border-blue-500 transition-all cursor-pointer group/upload bg-slate-50/30 dark:bg-slate-800/20 mb-10 shadow-inner">
            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-lg flex items-center justify-center mb-6 group-hover/upload:scale-110 group-hover/upload:rotate-3 transition-transform">
              <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 text-4xl font-black italic">
                cloud_upload
              </span>
            </div>
            <h4 className="font-black text-slate-900 dark:text-white mb-2 text-lg uppercase italic tracking-tight">
              Drag & Drop Media
            </h4>
            <p className="text-[10px] text-slate-400 mb-8 font-black uppercase tracking-widest italic">
              Support PNG, JPG, or WEBP (Max 5MB)
            </p>
            <button className="px-10 py-3.5 bg-[#254294] text-white rounded-2xl font-black text-xs uppercase tracking-widest italic shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all">
              Choose Files
            </button>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-widest italic flex items-center gap-3">
              Uploaded Media
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[9px] text-[#254294]">
                (4/10)
              </span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {sellerCreateListingPreviewImages.map((src, index) => {
                const number = index + 1;
                return (
                  <div
                    key={src}
                    className={`relative group aspect-square rounded-3xl overflow-hidden border-2 transition-all ${
                      number === 1
                        ? "border-[#254294] shadow-xl shadow-blue-900/5 ring-4 ring-blue-500/5"
                        : "border-slate-50 dark:border-slate-800 hover:border-[#254294]"
                    }`}
                  >
                    <Image
                      alt={`Screenshot ${number}`}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      fill
                      sizes="(min-width:640px) 25vw, 50vw"
                      src={src}
                    />
                    {number === 1 && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-[#254294] text-white text-[8px] font-black rounded-lg shadow-lg uppercase tracking-widest italic text-center">
                        Thumbnail
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[1px]">
                      <button className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/40 text-white transition-colors backdrop-blur-md flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm">
                          visibility
                        </span>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors backdrop-blur-md flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-50 dark:border-slate-800/50">
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-8 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white text-[10px] font-black uppercase tracking-widest italic transition-colors flex items-center justify-center gap-2 order-2 sm:order-1"
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
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
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-[#FF7D1F] font-bold text-2xl">
              verified_user
            </span>
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">
              Screenshot Requirements
            </h3>
          </div>
          <ul className="space-y-6">
            {sellerCreateListingRequirements.map((item) => (
              <li key={item.title} className="flex gap-3 items-start">
                <div className="w-5 h-5 bg-[#254294] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-white text-xs font-bold">
                    check
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#EFF6FF] dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-[#254294] dark:text-blue-400 font-bold">
              lightbulb
            </span>
            <p className="font-bold text-sm text-[#254294] dark:text-blue-300">
              Seller Tip
            </p>
          </div>
          <p className="text-xs font-medium text-blue-800 dark:text-blue-300 leading-relaxed">
            High-quality, clear screenshots can increase your chances of a
            quick sale by up to 60%. Buyers prefer seeing exactly what they are
            paying for.
          </p>
        </div>
      </div>
    </div>
  );
}
