import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

function normalizeHost(host: string) {
  // host bisa membawa port (localhost:3000)
  return host.split(":")[0].toLowerCase();
}

export function middleware(req: NextRequest) {
  const host = normalizeHost(req.headers.get("host") ?? "");
  const url = req.nextUrl;

  // Lewati asset statis & Next internals
  if (
    PUBLIC_FILE.test(url.pathname) ||
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/favicon") ||
    url.pathname.startsWith("/robots.txt") ||
    url.pathname.startsWith("/sitemap.xml") ||
    url.pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Default: buyer
  let site: "buyer" | "seller" | "admin" = "buyer";

  // Production domains
  if (host === "seller.accarena.store") site = "seller";
  if (host === "admin.accarena.store") site = "admin";

  // Dev convenience (opsional): seller.localhost / admin.localhost
  if (host === "seller.localhost") site = "seller";
  if (host === "admin.localhost") site = "admin";

  // Prevent double prefix kalau user akses langsung /_sites/...
  if (url.pathname.startsWith("/_sites/")) {
    return NextResponse.next();
  }

  url.pathname = `/_sites/${site}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
