import { jsonError, jsonOk, readJson } from "@/lib/api";
import {
  normalizeEmail,
  normalizePhone,
  verifyOtp,
} from "@/lib/password-reset-otp-store";
import { PasswordResetErrorCode, PasswordResetOtpVerifySchema } from "@acme/shared";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = PasswordResetOtpVerifySchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(
        {
          code: PasswordResetErrorCode.VALIDATION_ERROR,
          message: "Input tidak valid",
          details: parsed.error.flatten(),
        },
        422,
      );
    }

    const normalizedIdentifier = emailRegex.test(parsed.data.identifier)
      ? normalizeEmail(parsed.data.identifier)
      : normalizePhone(parsed.data.identifier);

    const result = await verifyOtp({
      identifier: normalizedIdentifier,
      otp: parsed.data.otp,
    });

    if (!result.ok) {
      const status =
        result.code === PasswordResetErrorCode.USER_NOT_FOUND ||
        result.code === PasswordResetErrorCode.OTP_NOT_FOUND
          ? 404
          : result.code === PasswordResetErrorCode.OTP_ATTEMPTS_EXCEEDED ||
              result.code === PasswordResetErrorCode.OTP_EXPIRED
            ? 410
            : 400;
      const message =
        result.code === PasswordResetErrorCode.OTP_ATTEMPTS_EXCEEDED
          ? "Batas percobaan OTP tercapai. Silakan minta OTP baru."
          : "Verifikasi OTP gagal.";
      return jsonError(
        {
          code: result.code,
          message,
        },
        status,
      );
    }

    return jsonOk({
      verified: true,
      resetToken: result.resetToken,
      expiresInSec: result.expiresInSec,
    });
  } catch (e: any) {
    if (e?.code === PasswordResetErrorCode.OTP_ENCRYPTION_KEY_MISSING) {
      return jsonError(
        {
          code: PasswordResetErrorCode.OTP_ENCRYPTION_KEY_MISSING,
          message: "Konfigurasi keamanan OTP belum lengkap di server.",
        },
        503,
      );
    }
    if (e?.code === PasswordResetErrorCode.UNSUPPORTED_MEDIA_TYPE) {
      return jsonError(
        {
          code: PasswordResetErrorCode.UNSUPPORTED_MEDIA_TYPE,
          message: "Content-Type harus application/json",
        },
        415,
      );
    }
    return jsonError(
      {
        code: PasswordResetErrorCode.PASSWORD_RESET_OTP_VERIFY_FAILED,
        message: "Verifikasi OTP reset password gagal. Silakan coba lagi.",
      },
      500,
    );
  }
}
