import { jsonError, jsonOk, parseJsonWithSchema } from "@/lib/api";
import { hasMailerEnv, sendRegisterOtpEmail } from "@/lib/mailer";
import { logError, logInfo, logWarn, maskEmail } from "@/lib/logger";
import { checkRegisterIpRateLimit } from "@/lib/register-ip-rate-limit";
import {
  getRegisterOtpCooldownRemainingSec,
  getRegisterOtpMeta,
  normalizeEmail,
  rollbackResendRegisterOtp,
  resendRegisterOtp,
} from "@/lib/register-otp-store";
import { getClientIp } from "@/lib/request-ip";
import { RegisterErrorCode } from "@acme/shared";
import { z } from "zod";

export const runtime = "nodejs";

const ResendRegisterOtpSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const parsed = await parseJsonWithSchema(req, ResendRegisterOtpSchema, {
      code: RegisterErrorCode.VALIDATION_ERROR,
      message: "Input tidak valid",
      status: 422,
    });
    if (!parsed.ok) return parsed.response;

    const clientIp = getClientIp(req);
    const ipRateLimit = await checkRegisterIpRateLimit("register_otp_resend", clientIp);
    if (!ipRateLimit.allowed) {
      logWarn("register.otp.resend.rate_limited", {
        ipAddress: clientIp,
        retryAfterSec: ipRateLimit.retryAfterSec,
      });
      return jsonError(
        {
          code: RegisterErrorCode.IP_RATE_LIMITED,
          message: "Terlalu banyak permintaan kirim ulang OTP. Coba lagi beberapa saat.",
          details: { retryAfterSec: ipRateLimit.retryAfterSec },
        },
        429,
      );
    }

    const normalizedEmail = normalizeEmail(parsed.data.email);
    const cooldownRemainingSec = await getRegisterOtpCooldownRemainingSec(normalizedEmail);
    if (cooldownRemainingSec > 0) {
      return jsonError(
        {
          code: RegisterErrorCode.OTP_RESEND_TOO_FAST,
          message: "Tunggu sebelum meminta OTP baru.",
          details: { retryAfterSec: cooldownRemainingSec },
        },
        429,
      );
    }

    if (!hasMailerEnv()) {
      return jsonError(
        {
          code: RegisterErrorCode.MAILER_NOT_CONFIGURED,
          message: "SMTP belum dikonfigurasi di server.",
        },
        503,
      );
    }

    const resent = await resendRegisterOtp(normalizedEmail);
    if (!resent) {
      return jsonError(
        {
          code: RegisterErrorCode.OTP_NOT_FOUND,
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
        logWarn("register.otp.resend.rollback_failed_after_mail_send_failure", {
          email: maskEmail(normalizedEmail),
          error: rollbackError,
        });
      });
      throw error;
    }

    logInfo("register.otp.resend.sent", {
      email: maskEmail(normalizedEmail),
    });

    return jsonOk({
      sent: true,
      expiresInSec: getRegisterOtpMeta().otpExpiresSec,
      resendCooldownSec: getRegisterOtpMeta().resendCooldownSec,
      ...(process.env.NODE_ENV !== "production" ? { debugOtp: resent.otp } : {}),
    });
  } catch (e: any) {
    if (e?.code === RegisterErrorCode.OTP_ENCRYPTION_KEY_MISSING) {
      return jsonError(
        {
          code: RegisterErrorCode.OTP_ENCRYPTION_KEY_MISSING,
          message: "Konfigurasi keamanan OTP belum lengkap di server.",
        },
        503,
      );
    }
    if (e?.code === RegisterErrorCode.MAIL_SEND_TIMEOUT) {
      return jsonError(
        {
          code: RegisterErrorCode.MAIL_SEND_TIMEOUT,
          message: "Pengiriman OTP timeout. Coba lagi.",
        },
        504,
      );
    }
    if (e?.code === RegisterErrorCode.UNSUPPORTED_MEDIA_TYPE) {
      return jsonError(
        {
          code: RegisterErrorCode.UNSUPPORTED_MEDIA_TYPE,
          message: "Content-Type harus application/json",
        },
        415,
      );
    }
    logError("register.otp.resend.failed", e);
    return jsonError(
      {
        code: RegisterErrorCode.REGISTER_OTP_RESEND_FAILED,
        message: "Kirim ulang OTP registrasi gagal. Silakan coba lagi.",
      },
      500,
    );
  }
}
