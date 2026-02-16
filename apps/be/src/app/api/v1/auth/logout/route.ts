import { jsonError, jsonOk } from "@/lib/api";
import { clearAuthCookieHeaders } from "@/lib/auth-cookie";

export const runtime = "nodejs";

export async function POST() {
  try {
    return jsonOk(
      { loggedOut: true },
      {
        headers: clearAuthCookieHeaders(),
      },
    );
  } catch (e: any) {
    return jsonError(
      {
        code: e?.code ?? "BAD_REQUEST",
        message: e?.message ?? "Bad request",
        details: e?.details,
      },
      400,
    );
  }
}
