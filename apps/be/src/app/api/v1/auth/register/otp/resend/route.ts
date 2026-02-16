import { jsonError, jsonOk, readJson } from "@/lib/api";
import { hasMailerEnv, sendRegisterOtpEmail } from "@/lib/mailer";
import {
  getRegisterOtpCooldownRemainingSec,
  getRegisterOtpMeta,
  normalizeEmail,
  rollbackResendRegisterOtp,
  resendRegisterOtp,
} from "@/lib/register-otp-store";
import { z } from "zod";

export const runtime = "nodejs";

const ResendRegisterOtpSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = ResendRegisterOtpSchema.safeParse(body);
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
    const cooldownRemainingSec = await getRegisterOtpCooldownRemainingSec(normalizedEmail);
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

    if (!hasMailerEnv()) {
      return jsonError(
        {
          code: "MAILER_NOT_CONFIGURED",
          message: "SMTP belum dikonfigurasi di server.",
        },
        503,
      );
    }

    const resent = await resendRegisterOtp(normalizedEmail);
    if (!resent) {
      return jsonError(
        {
          code: "OTP_NOT_FOUND",
          message: "Sesi OTP tidak ditemukan. Ulangi proses registrasi.",
        },
        404,
      );
    }

    try {
      await sendRegisterOtpEmail({
        to: normalizedEmail,
        otp: resent.otp,
        expiresInMin: Math.floor(getRegisterOtpMeta().otpExpiresSec / 60),
      });
    } catch (error) {
      await rollbackResendRegisterOtp(normalizedEmail, resent.rollbackState).catch((rollbackError: unknown) => {
        console.warn("[register-otp-resend] failed to rollback OTP session after send failure", {
          email: normalizedEmail,
          error: rollbackError,
        });
      });
      throw error;
    }

    return jsonOk({
      sent: true,
      expiresInSec: getRegisterOtpMeta().otpExpiresSec,
      resendCooldownSec: getRegisterOtpMeta().resendCooldownSec,
      ...(process.env.NODE_ENV !== "production" ? { debugOtp: resent.otp } : {}),
    });
  } catch (e: any) {
    if (e?.code === "OTP_ENCRYPTION_KEY_MISSING") {
      return jsonError(
        {
          code: "OTP_ENCRYPTION_KEY_MISSING",
          message: "Konfigurasi keamanan OTP belum lengkap di server.",
        },
        503,
      );
    }
    if (e?.code === "MAIL_SEND_TIMEOUT") {
      return jsonError(
        {
          code: "MAIL_SEND_TIMEOUT",
          message: "Pengiriman OTP timeout. Coba lagi.",
        },
        504,
      );
    }
    if (e?.code === "UNSUPPORTED_MEDIA_TYPE") {
      return jsonError(
        {
          code: "UNSUPPORTED_MEDIA_TYPE",
          message: "Content-Type harus application/json",
        },
        415,
      );
    }
    return jsonError(
      {
        code: "REGISTER_OTP_RESEND_FAILED",
        message: "Kirim ulang OTP registrasi gagal. Silakan coba lagi.",
      },
      500,
    );
  }
}
