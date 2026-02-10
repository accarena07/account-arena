type SellerSearchInputProps = {
  placeholder: string;
  icon?: string;
};

export default function SellerSearchInput({
  placeholder,
  icon = "search",
}: SellerSearchInputProps) {
  return (
    <div className="group relative w-full md:w-96">
      <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-[20px] italic text-slate-400 transition-colors group-focus-within:text-[#254294]">
        {icon}
      </span>
      <input
        className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-14 pr-6 text-sm font-bold italic shadow-sm outline-none transition-all placeholder:text-slate-300 focus:border-[#254294] focus:ring-4 focus:ring-blue-500/5 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
}
