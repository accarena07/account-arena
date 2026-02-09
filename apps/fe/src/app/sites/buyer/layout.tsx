import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import ThemeInitializer from "./components/ThemeInitializer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GameMarket - Marketplace Akun Game Terpercaya",
};

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={plusJakartaSans.className}>
      <ThemeInitializer />
      {children}
    </div>
  );
}
