import { jsonError, jsonOk, parseJsonWithSchema } from "@/lib/api";
import {
  normalizeEmail,
  normalizePhone,
  verifyOtp,
} from "@/lib/password-reset-otp-store";
import { EMAIL_REGEX, PasswordResetErrorCode, PasswordResetOtpVerifySchema } from "@acme/shared";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const parsed = await parseJsonWithSchema(req, PasswordResetOtpVerifySchema, {
      code: PasswordResetErrorCode.VALIDATION_ERROR,
      message: "Input tidak valid",
      status: 422,
    });
    if (!parsed.ok) return parsed.response;

    const normalizedIdentifier = EMAIL_REGEX.test(parsed.data.identifier)
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
