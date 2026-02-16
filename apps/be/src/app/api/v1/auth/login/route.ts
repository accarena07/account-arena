import { jsonError, jsonOk, readJson } from "@/lib/api";
import { createAuthCookieHeaders } from "@/lib/auth-cookie";
import { getSupabaseAnonClient, getSupabaseAdminClient } from "@/lib/supabase";
import { AuthLoginRequestSchema } from "@acme/shared";

export const runtime = "nodejs";

const mapLoginErrorMessage = (rawMessage?: string) => {
  const normalized = (rawMessage ?? "").toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Email atau kata sandi salah.";
  }
  if (normalized.includes("email not confirmed")) {
    return "Email belum terverifikasi. Silakan cek email Anda.";
  }
  if (normalized.includes("too many requests")) {
    return "Terlalu banyak percobaan login. Silakan coba lagi beberapa saat.";
  }

  return "Login gagal. Silakan coba lagi.";
};

export const POST = async (req: Request) => {
  try {
    const body = await readJson<unknown>(req);
    const parsed = AuthLoginRequestSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(
        {
          code: "VALIDATION_ERROR",
          message: "Input tidak valid",
          details: parsed.error.flatten(),
        },
        422,
      );
    }

    const supabase = getSupabaseAnonClient();
    const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

    if (error || !data.user || !data.session) {
      return jsonError(
        {
          code: "AUTH_LOGIN_FAILED",
          message: mapLoginErrorMessage(error?.message),
        },
        401,
      );
    }

    const admin = getSupabaseAdminClient();
    const { data: rolesRows } = await admin
      .from("user_roles")
      .select("role, is_active")
      .eq("user_id", data.user.id)
      .eq("is_active", true);

    const payload = {
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
    };

    const accessTokenMaxAgeSec =
      typeof data.session.expires_in === "number" && Number.isFinite(data.session.expires_in)
        ? Math.max(60, Math.floor(data.session.expires_in))
        : 60 * 60;

    return jsonOk(payload, {
      headers: createAuthCookieHeaders({
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        accessTokenMaxAgeSec,
      }),
    });
  } catch (e: any) {
    return jsonError(
      {
        code: e?.code ?? "BAD_REQUEST",
        message: e?.message ?? "Bad request",
        details: e?.details,
      },
      e?.code === "UNSUPPORTED_MEDIA_TYPE" ? 415 : 400,
    );
  }
};
