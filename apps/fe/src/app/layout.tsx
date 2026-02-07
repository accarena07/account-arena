import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FE App",
  description: "Next.js FE (TS + Tailwind v4)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-dvh bg-white text-zinc-900">
        <div className="mx-auto max-w-3xl p-6">{children}</div>
      </body>
    </html>
  );
}
