import { jsonError, jsonOk, readJson } from "@/lib/api";
import {
  normalizeEmail,
  normalizePhone,
  verifyOtp,
} from "@/lib/password-reset-otp-store";
import { PasswordResetOtpVerifySchema } from "@acme/shared";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = PasswordResetOtpVerifySchema.safeParse(body);
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

    const normalizedIdentifier = emailRegex.test(parsed.data.identifier)
      ? normalizeEmail(parsed.data.identifier)
      : normalizePhone(parsed.data.identifier);

    const result = await verifyOtp({
      identifier: normalizedIdentifier,
      otp: parsed.data.otp,
    });

    if (!result.ok) {
      const status =
        result.code === "USER_NOT_FOUND" || result.code === "OTP_NOT_FOUND"
          ? 404
          : result.code === "OTP_ATTEMPTS_EXCEEDED" || result.code === "OTP_EXPIRED"
            ? 410
            : 400;
      return jsonError(
        {
          code: result.code,
          message: "Verifikasi OTP gagal.",
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
