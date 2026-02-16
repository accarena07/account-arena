import { jsonError, jsonOk } from "@/lib/api";
import { createAuthCookieHeaders, getRefreshTokenFromCookieHeader } from "@/lib/auth-cookie";
import { logError, logInfo, logWarn, maskEmail } from "@/lib/logger";
import { getSupabaseAdminClient, getSupabaseAnonClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const refreshToken = getRefreshTokenFromCookieHeader(req.headers.get("cookie"));

    if (!refreshToken) {
      return jsonError(
        {
          code: "UNAUTHORIZED",
          message: "Missing refresh token",
        },
        401,
      );
    }

    const anon = getSupabaseAnonClient();
    const { data, error } = await anon.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error || !data.user || !data.session) {
      logWarn("auth.refresh.failed", {
        error,
      });
      return jsonError(
        {
          code: "UNAUTHORIZED",
          message: "Sesi login telah berakhir. Silakan login ulang.",
        },
        401,
      );
    }

    const admin = getSupabaseAdminClient();
    const { data: rolesRows, error: rolesError } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("is_active", true);

    if (rolesError) {
      logError("auth.refresh.roles_query_failed", rolesError, {
        userId: data.user.id,
      });
      return jsonError(
        {
          code: "AUTH_REFRESH_FAILED",
          message: "Gagal memperbarui sesi login. Silakan coba lagi.",
        },
        500,
      );
    }

    const accessTokenMaxAgeSec =
      typeof data.session.expires_in === "number" && Number.isFinite(data.session.expires_in)
        ? Math.max(60, Math.floor(data.session.expires_in))
        : 60 * 60;

    logInfo("auth.refresh.success", {
      userId: data.user.id,
      email: maskEmail(data.user.email),
    });

    return jsonOk(
      {
        user: {
          id: data.user.id,
          email: data.user.email,
        },
        roles: (rolesRows ?? []).map((r) => r.role),
        session: {
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          expiresAt: data.session.expires_at ?? null,
        },
      },
      {
        headers: createAuthCookieHeaders({
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          accessTokenMaxAgeSec,
        }),
      },
    );
  } catch (error: unknown) {
    logError("auth.refresh.unexpected_error", error);
    return jsonError(
      {
        code: "AUTH_REFRESH_FAILED",
        message: "Gagal memperbarui sesi login. Silakan login ulang.",
      },
      500,
    );
  }
}
