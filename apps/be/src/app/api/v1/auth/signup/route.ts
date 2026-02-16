import { jsonError, jsonOk, readJson } from "@/lib/api";
import { getSupabaseAnonClient } from "@/lib/supabase";
import { AuthSignupRequestSchema, isValidIndonesianPhone } from "@acme/shared";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = AuthSignupRequestSchema.safeParse(body);

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

    const { email, password, fullName, phone } = parsed.data;

    if (phone && !isValidIndonesianPhone(phone)) {
      return jsonError(
        {
          code: "VALIDATION_ERROR",
          message: "Nomor WhatsApp harus nomor Indonesia (08xx / 62xx / +62xx).",
        },
        422,
      );
    }

    const supabase = getSupabaseAnonClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
        },
      },
    });

    if (error) {
      return jsonError(
        { code: "AUTH_SIGNUP_FAILED", message: error.message },
        400,
      );
    }

    return jsonOk({
      user: data.user
        ? {
            id: data.user.id,
            email: data.user.email,
          }
        : null,
      roles: ["buyer"],
      session: data.session
        ? {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            expiresAt: data.session.expires_at ?? null,
          }
        : null,
      emailConfirmationRequired: !data.session,
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
