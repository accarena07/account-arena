import { jsonError, jsonOk, readJson } from "@/lib/api";
import { hasMailerEnv, sendPasswordResetOtpEmail } from "@/lib/mailer";
import {
  createOtpEntry,
  getPasswordResetOtpCooldownRemainingSec,
  getOtpMeta,
  normalizeEmail,
} from "@/lib/password-reset-otp-store";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { PasswordResetOtpRequestSchema } from "@acme/shared";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = PasswordResetOtpRequestSchema.safeParse(body);
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

    const { identifier, method: requestedMethod } = parsed.data;
    if (requestedMethod && requestedMethod !== "email") {
      return jsonError(
        {
          code: "METHOD_NOT_SUPPORTED",
          message: "Saat ini OTP hanya dapat dikirim melalui email.",
        },
        422,
      );
    }
    const method = "email" as const;
    const normalizedIdentifier = normalizeEmail(identifier);

    if (!emailRegex.test(normalizedIdentifier)) {
      return jsonError({ code: "VALIDATION_ERROR", message: "Format email tidak valid." }, 422);
    }

    const cooldownRemainingSec = await getPasswordResetOtpCooldownRemainingSec(normalizedIdentifier);
    if (cooldownRemainingSec > 0) {
      return jsonError(
        {
          code: "OTP_RESEND_TOO_FAST",
          message: "Tunggu sebelum meminta OTP baru.",
          details: { retryAfterSec: cooldownRemainingSec },
        },
        429,
      );
    }

    const admin = getSupabaseAdminClient();
    const query = admin
      .from("profiles")
      .select("id")
      .limit(1);
    const { data: profile } = await query.ilike("email", normalizedIdentifier).maybeSingle();
    if (!profile?.id) {
      return jsonError(
        {
          code: "EMAIL_NOT_REGISTERED",
          message: "Email belum terdaftar.",
        },
        404,
      );
    }

    const otpEntry = await createOtpEntry({
      identifier: normalizedIdentifier,
      method,
      userId: profile.id,
    });

    if (!hasMailerEnv()) {
      return jsonError(
        {
          code: "MAILER_NOT_CONFIGURED",
          message: "SMTP belum dikonfigurasi di server.",
        },
        503,
      );
    }

    await sendPasswordResetOtpEmail({
      to: normalizedIdentifier,
      otp: otpEntry.otp,
      expiresInMin: Math.floor(getOtpMeta().otpExpiresSec / 60),
    });

    return jsonOk({
      sent: true,
      method,
      expiresInSec: getOtpMeta().otpExpiresSec,
      resendCooldownSec: getOtpMeta().resendCooldownSec,
      ...(process.env.NODE_ENV !== "production" ? { debugOtp: otpEntry.otp } : {}),
    });
  } catch (e: any) {
    if (e?.code === "MAIL_SEND_TIMEOUT") {
      return jsonError(
        {
          code: "MAIL_SEND_TIMEOUT",
          message: "Pengiriman OTP timeout. Coba lagi.",
        },
        504,
      );
    }
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
