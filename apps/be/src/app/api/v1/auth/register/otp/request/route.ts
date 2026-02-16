import { jsonError, jsonOk, parseJsonWithSchema } from "@/lib/api";
import { hasMailerEnv, sendRegisterOtpEmail } from "@/lib/mailer";
import { logError, logInfo, logWarn, maskEmail } from "@/lib/logger";
import {
  createRegisterOtpEntry,
  getRegisterOtpCooldownRemainingSec,
  getRegisterOtpMeta,
  normalizeEmail,
  normalizePhone,
} from "@/lib/register-otp-store";
import { findProfileIdByEmail, findProfileIdByPhone } from "@/lib/register-profile-lookup";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { RegisterErrorCode, RegisterOtpRequestSchema } from "@acme/shared";

export const runtime = "nodejs";

const indonesianPhoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{7,10}$/;

export async function POST(req: Request) {
  try {
    const parsed = await parseJsonWithSchema(req, RegisterOtpRequestSchema, {
      code: RegisterErrorCode.VALIDATION_ERROR,
      message: "Input tidak valid",
      status: 422,
    });
    if (!parsed.ok) return parsed.response;

    const normalizedEmail = normalizeEmail(parsed.data.email);
    const normalizedPhone = normalizePhone(parsed.data.phone);
    if (!indonesianPhoneRegex.test(normalizedPhone)) {
      return jsonError(
        {
          code: RegisterErrorCode.VALIDATION_ERROR,
          message: "Nomor WhatsApp harus nomor Indonesia (08xx / 62xx / +62xx).",
        },
        422,
      );
    }

    const existingProfileByEmail = await findProfileIdByEmail(normalizedEmail);

    if (existingProfileByEmail) {
      return jsonError(
        {
          code: RegisterErrorCode.EMAIL_ALREADY_REGISTERED,
          message: "Email sudah terdaftar.",
        },
        409,
      );
    }

    const existingProfileByPhone = await findProfileIdByPhone(normalizedPhone);

    if (existingProfileByPhone) {
      return jsonError(
        {
          code: RegisterErrorCode.PHONE_ALREADY_REGISTERED,
          message: "Nomor WhatsApp sudah terdaftar.",
        },
        409,
      );
    }

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

    const entry = await createRegisterOtpEntry({
      email: normalizedEmail,
      password: parsed.data.password,
      fullName: parsed.data.fullName.trim(),
      phone: normalizedPhone,
    });

    try {
      await sendRegisterOtpEmail({
        to: normalizedEmail,
        otp: entry.otp,
        expiresInMin: Math.floor(getRegisterOtpMeta().otpExpiresSec / 60),
      });
    } catch (error) {
      const admin = getSupabaseAdminClient();
      const { error: cleanupError } = await admin
        .from("register_otp_sessions")
        .delete()
        .eq("email", normalizedEmail);
      if (cleanupError) {
        logWarn("register.otp.request.cleanup_failed_after_mail_send_failure", {
          email: maskEmail(normalizedEmail),
          error: cleanupError,
        });
      }
      throw error;
    }

    logInfo("register.otp.request.sent", {
      email: maskEmail(normalizedEmail),
    });

    return jsonOk({
      sent: true,
      expiresInSec: getRegisterOtpMeta().otpExpiresSec,
      resendCooldownSec: getRegisterOtpMeta().resendCooldownSec,
      ...(process.env.NODE_ENV !== "production" ? { debugOtp: entry.otp } : {}),
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
    logError("register.otp.request.failed", e);
    return jsonError(
      {
        code: RegisterErrorCode.REGISTER_OTP_REQUEST_FAILED,
        message: "Permintaan OTP registrasi gagal. Silakan coba lagi.",
      },
      500,
    );
  }
}
