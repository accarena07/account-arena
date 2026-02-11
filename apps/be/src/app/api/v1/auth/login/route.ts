import { jsonError, jsonOk, readJson } from "@/lib/api";
import { getSupabaseAnonClient, getSupabaseAdminClient } from "@/lib/supabase";
import { AuthLoginRequestSchema } from "@acme/shared";

export const runtime = "nodejs";

export async function POST(req: Request) {
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
        { code: "AUTH_LOGIN_FAILED", message: error?.message ?? "Login gagal" },
        401,
      );
    }

    const admin = getSupabaseAdminClient();
    const { data: rolesRows } = await admin
      .from("user_roles")
      .select("role, is_active")
      .eq("user_id", data.user.id)
      .eq("is_active", true);

    return jsonOk({
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
}
