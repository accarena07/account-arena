import { jsonError, jsonOk } from "@/lib/api";
import { clearAuthCookieHeaders, getAccessTokenFromCookieHeader } from "@/lib/auth-cookie";
import { logError, logInfo, logWarn } from "@/lib/logger";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const accessToken = getAccessTokenFromCookieHeader(req.headers.get("cookie"));
    if (!accessToken) {
      logWarn("auth.logout.missing_access_token");
      return jsonOk(
        { loggedOut: true, revoked: false },
        {
          headers: clearAuthCookieHeaders(),
        },
      );
    }

    const admin = getSupabaseAdminClient();
    const { error: revokeError } = await admin.auth.admin.signOut(accessToken, "global");
    if (revokeError) {
      logError("auth.logout.revoke_failed", revokeError);
      return jsonError(
        {
          code: "LOGOUT_REVOKE_FAILED",
          message: "Logout gagal menyelesaikan invalidasi sesi. Silakan coba lagi.",
        },
        500,
        {
          headers: clearAuthCookieHeaders(),
        },
      );
    }

    logInfo("auth.logout.success", { revoked: true });
    return jsonOk(
      { loggedOut: true, revoked: true },
      {
        headers: clearAuthCookieHeaders(),
      },
    );
  } catch (e: any) {
    logError("auth.logout.unexpected_error", e);
    return jsonError(
      {
        code: e?.code ?? "BAD_REQUEST",
        message: e?.message ?? "Bad request",
        details: e?.details,
      },
      400,
      {
        headers: clearAuthCookieHeaders(),
      },
    );
  }
}
