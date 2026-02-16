"use client";

import { Inter, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ThemeToggleButton from "../../components/ThemeToggleButton";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

const registerHighlights = [
  {
    icon: "verified_user",
    title: "Keamanan Terjamin",
    description: "Verifikasi OTP untuk setiap akses akun.",
  },
  {
    icon: "payments",
    title: "Transaksi Instan",
    description: "Proses serah terima akun otomatis & cepat.",
  },
] as const;

const partnerLogos = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC5V8jr1q6bZWKwJuxcX38JnoaRT5M85ypggGB9cWOdblzj2KFBR9sxchG8pY4z69l4b5JsbbusQp0kH2AM67NzKIEcpb2sSbQBTd3Yl8_4FaSXngPfiDhr3RozKQ5fT9dVP8qA3za69hOM1AY2qi7WPdhwju_bIrP1czry_v6cDBttXaIVdja4Qn-U8FwBJXbIAfNPDl0YC5eZStLOrz6-BKN8DYIr3XbG-6Hwci6S5UHn8JgspOHIF2kYZePdXP1uqeQ-ntuoVT50",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCeNbD_owIdRPUpTjhvoRF7CqORYUJTqyfKCIwbUkx8OTY_J0bFe2cPwLdla7wAXTYo-sE-17WYxKsdXPwOs0PqmQgQNxgqxuMrlakmzolHPzIo25zeZCrzxV-t78xsT7ve9kKVy-hOGBNitzyLzKUFM8CRepU2At7Ctb77-U31eFnrok3v9vawEOjeAZ0Aw7_nCjht-7pLcRXaBviYi8Xgx84wdYlh6iD_UTjGIxMJ0-fYlfoTfqup_O0QIUyZOzqUr4r5-Aaumsgk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDCFMfHpLCgn7Gz9_MCtECnMb3i0E9kYq4vev1e1Q8pfe3VE2jrHSfu_aeXKIdLMoI5o2w5Mfk_HEsk_igMEV0qBoFoBSPKWOcq82djpdVqbKApK8LJW26j-KHTz1vGy_HOZCnLZa84-ps74R83auGWyqvzMv7LQgKarSkuClzKyHMpOKA2RwA3tJmSuplBt503Tdc075p_lc1M5IigOTWhUTTZ7IHu9bz4FGz49kGOBReKTB1to8vRkQuHXlt41QO1QV2ScVLsS4ea",
] as const;

const ThemeToggle = () => {
  return (
    <div className="fixed top-6 right-6 z-50">
      <ThemeToggleButton className="bg-white p-3 text-gray-600 shadow-lg transition-all hover:scale-110 dark:bg-slate-800 dark:text-gray-300" />
    </div>
  );
};

const LeftHighlightCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <span className="material-symbols-outlined text-secondary">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-blue-200">{description}</p>
      </div>
    </div>
  );
};

const LeftPanel = () => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden bg-primary p-12 text-white lg:w-5/12">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-secondary opacity-20 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-blue-400 opacity-20 blur-3xl" />

      <div className="relative z-10 max-w-md text-center">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
          <span className="material-symbols-outlined text-4xl text-white">sports_esports</span>
        </div>
        <h1 className={`${poppins.className} mb-6 text-4xl font-bold`}>Mulai Petualangan Gaming Anda</h1>
        <p className="mb-8 text-lg leading-relaxed text-blue-100">
          Satu akun untuk semua kebutuhan marketplace game Anda. Aman, terpercaya, dan instan.
        </p>
        <div className="grid grid-cols-1 gap-4 text-left">
          {registerHighlights.map((item) => (
            <LeftHighlightCard description={item.description} icon={item.icon} key={item.title} title={item.title} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 text-xs font-medium text-white/50">© 2024 GAMEMARKET Indonesia. All rights reserved.</div>
    </div>
  );
};

const SuccessBadge = () => {
  return (
    <div className="relative mb-8">
      <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <span className="material-symbols-outlined text-6xl text-green-500">check_circle</span>
        <span className="material-symbols-outlined absolute -top-2 -right-2 animate-bounce text-secondary">star</span>
        <span className="material-symbols-outlined absolute top-1/2 -left-8 text-xl text-blue-400">celebration</span>
        <span className="material-symbols-outlined absolute -right-6 bottom-0 text-xl text-orange-400">redeem</span>
      </div>
    </div>
  );
};

const SuccessActions = ({ showLoginRequiredNotice }: { showLoginRequiredNotice: boolean }) => {
  return (
    <div className="space-y-4">
      {showLoginRequiredNotice ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-900/30 dark:text-amber-200">
          Akun berhasil dibuat, tetapi sesi login otomatis belum terbentuk. Silakan login manual.
        </div>
      ) : null}
      <Link
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 hover:bg-[#1a306e]"
        href="/login"
      >
        <span className="material-symbols-outlined">login</span>
        Masuk ke Akun
      </Link>
      <p className="pt-4 text-sm text-gray-500 dark:text-gray-500">
        Butuh bantuan?{" "}
        <a className="font-semibold text-primary hover:underline dark:text-secondary" href="mailto:accarena07@gmail.com">
          Hubungi Support
        </a>
      </p>
    </div>
  );
};

const PartnerLogoGrid = () => {
  return (
    <div className="mt-16 grid grid-cols-3 gap-8 opacity-20 grayscale dark:invert">
      {partnerLogos.map((logo) => (
        <Image alt="gaming icon" className="h-8 w-8 opacity-50" height={32} key={logo} src={logo} width={32} />
      ))}
    </div>
  );
};

const RightPanel = ({ showLoginRequiredNotice }: { showLoginRequiredNotice: boolean }) => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white p-8 text-center dark:bg-slate-900 lg:w-7/12 lg:p-16">
      <div className="mb-12 flex items-center gap-3 self-start lg:absolute lg:top-16 lg:left-[41.666667%] lg:ml-16">
        <span className="material-symbols-outlined text-3xl text-primary dark:text-secondary">account_balance_wallet</span>
        <span className={`${poppins.className} text-2xl font-bold tracking-tight text-gray-900 uppercase dark:text-white`}>
          GameMarket
        </span>
      </div>

      <div className="mx-auto w-full max-w-md">
        <SuccessBadge />
        <h2 className={`${poppins.className} mb-4 text-3xl font-bold text-gray-900 dark:text-white`}>Registrasi Berhasil!</h2>
        <p className="mb-10 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Akun Anda telah berhasil dibuat. Silakan masuk untuk mulai menjelajahi marketplace.
        </p>
        <SuccessActions showLoginRequiredNotice={showLoginRequiredNotice} />
      </div>

      <PartnerLogoGrid />
    </div>
  );
};

const BuyerRegisterSuccessPage = () => {
  const searchParams = useSearchParams();
  const showLoginRequiredNotice = searchParams.get("loginRequired") === "1";

  return (
    <div className={`${inter.className} bg-background-light flex min-h-screen items-center justify-center p-4 transition-colors duration-300 dark:bg-background-dark`}>
      <ThemeToggle />

      <main className="mx-auto flex min-h-187.5 w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 lg:flex-row">
        <LeftPanel />
        <RightPanel showLoginRequiredNotice={showLoginRequiredNotice} />
      </main>
    </div>
  );
};

export default BuyerRegisterSuccessPage;
