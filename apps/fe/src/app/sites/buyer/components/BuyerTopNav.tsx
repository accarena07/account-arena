import BuyerHeader from "./BuyerHeader";

type BuyerTopNavProps = {
  isLoggedIn?: boolean;
  searchPlaceholder?: string;
};

export default function BuyerTopNav({
  isLoggedIn = false,
  searchPlaceholder = "Cari game, item, atau akun...",
}: BuyerTopNavProps) {
  return <BuyerHeader isLoggedIn={isLoggedIn} searchPlaceholder={searchPlaceholder} />;
}
