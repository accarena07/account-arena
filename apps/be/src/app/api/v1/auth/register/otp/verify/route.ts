import { jsonError, jsonOk, readJson } from "@/lib/api";
import { getSupabaseAnonClient, getSupabaseAdminClient } from "@/lib/supabase";
import { normalizeEmail, verifyRegisterOtp } from "@/lib/register-otp-store";
import { RegisterOtpVerifySchema } from "@acme/shared";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = RegisterOtpVerifySchema.safeParse(body);
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

    const normalizedEmail = normalizeEmail(parsed.data.email);
    const otpVerified = await verifyRegisterOtp({
      email: normalizedEmail,
      otp: parsed.data.otp,
    });

    if (!otpVerified.ok) {
      const status =
        otpVerified.code === "OTP_NOT_FOUND" ? 404 : otpVerified.code === "OTP_EXPIRED" ? 410 : 400;
      return jsonError(
        {
          code: otpVerified.code,
          message: "Verifikasi OTP gagal.",
        },
        status,
      );
    }

    const admin = getSupabaseAdminClient();
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email: otpVerified.payload.email,
      password: otpVerified.payload.password,
      email_confirm: true,
      user_metadata: {
        full_name: otpVerified.payload.fullName,
        phone: otpVerified.payload.phone,
      },
    });

    if (createError || !created.user) {
      return jsonError(
        {
          code: "REGISTER_CREATE_USER_FAILED",
          message: createError?.message ?? "Gagal membuat user.",
        },
        400,
      );
    }

    await admin
      .from("profiles")
      .update({
        full_name: otpVerified.payload.fullName,
        phone: otpVerified.payload.phone,
        email: otpVerified.payload.email,
      })
      .eq("id", created.user.id);

    const anon = getSupabaseAnonClient();
    const { data: signInData } = await anon.auth.signInWithPassword({
      email: otpVerified.payload.email,
      password: otpVerified.payload.password,
    });

    return jsonOk({
      user: {
        id: created.user.id,
        email: created.user.email ?? otpVerified.payload.email,
      },
      roles: ["buyer"],
      session: signInData?.session
        ? {
            accessToken: signInData.session.access_token,
            refreshToken: signInData.session.refresh_token,
            expiresAt: signInData.session.expires_at ?? null,
          }
        : null,
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
