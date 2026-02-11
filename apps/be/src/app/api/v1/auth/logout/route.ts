import { jsonOk } from "@/lib/api";

export const runtime = "nodejs";

export async function POST() {
  return jsonOk({
    loggedOut: true,
    message: "Logout endpoint success. Remove client tokens on frontend.",
  });
}
