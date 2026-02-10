import Image from "next/image";

type SellerProfileInfoProps = {
  showMeta?: boolean;
  name?: string;
  role?: string;
};

export default function SellerProfileInfo({
  showMeta = true,
  name = "Admin Store",
  role = "Premium Seller",
}: SellerProfileInfoProps) {
  return (
    <div className="flex items-center gap-3">
      {showMeta ? (
        <div className="text-right">
          <p className="text-sm font-black leading-none italic text-slate-800 dark:text-white">
            {name}
          </p>
          <p className="mt-1.5 text-[10px] font-black uppercase tracking-widest italic text-slate-400">
            {role}
          </p>
        </div>
      ) : null}
      <Image
        alt="Profile"
        className="h-11 w-11 rounded-full border-2 border-[#254294]/20 object-cover shadow-sm"
        height={44}
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuALL4MNDR1C_NUyFVHybHloH6M8YfbkdIvKzI7T_k4HpLXMXCc8NM-4QBx0R3I9m_02Tz8RipzypJzBzPTLLZIDpfWIRqiFiekk4-Qrlim-jRmaF9YTlmkqDMvomJT6GyT0Pf3FpD50gUGghwfff6ZLVBR8ZEErIcD86V80P5vX_eFSepUp76QmZA7wy-aCof8wlJfY78J731Ztmd2SqzeCunW0UjITbg1LQPat79T21M94UJu5Pl98o01eoWNjUdNbUxKretMb-g"
        width={44}
      />
    </div>
  );
}
