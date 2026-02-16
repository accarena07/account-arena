import {
  PasswordResetErrorCode,
  PasswordResetOtpRequestResponseSchema,
  isPasswordResetSystemErrorCode,
} from "@acme/shared";
import { ApiClientError, apiFetch } from "@/lib/apiClient";

export const SYSTEM_ERROR_MESSAGE = "Sistem sedang mengalami gangguan. Silakan coba beberapa saat lagi.";
export const FALLBACK_ERROR_MESSAGE = "Gagal mengirim OTP. Silakan coba lagi.";
export const OTP_SUCCESS_REDIRECT_DELAY_MS = 1200;

const BUSINESS_ERROR_CODES = new Set<string>([
  PasswordResetErrorCode.VALIDATION_ERROR,
  PasswordResetErrorCode.EMAIL_NOT_REGISTERED,
  PasswordResetErrorCode.OTP_RESEND_TOO_FAST,
]);

const SYSTEM_ERROR_CODES = new Set<string>([
  PasswordResetErrorCode.MAILER_NOT_CONFIGURED,
  PasswordResetErrorCode.MAIL_SEND_TIMEOUT,
  "BAD_REQUEST",
]);

const isSystemLevelError = (error: ApiClientError, errorCode?: string) => {
  const loweredMessage = error.message.toLowerCase();
  return (
    (typeof error.status === "number" && error.status >= 500) ||
    SYSTEM_ERROR_CODES.has(errorCode ?? "") ||
    isPasswordResetSystemErrorCode(errorCode) ||
    loweredMessage.includes("timeout") ||
    loweredMessage.includes("network")
  );
};

export const mapForgotPasswordErrorMessage = (error: unknown) => {
  if (!(error instanceof ApiClientError)) {
    return SYSTEM_ERROR_MESSAGE;
  }

  const errorCode = (error.details as { code?: string } | undefined)?.code;
  if (isSystemLevelError(error, errorCode)) {
    return SYSTEM_ERROR_MESSAGE;
  }
  if (BUSINESS_ERROR_CODES.has(errorCode ?? "")) {
    return error.message || FALLBACK_ERROR_MESSAGE;
  }
  return FALLBACK_ERROR_MESSAGE;
};

export const requestPasswordResetOtp = async (email: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const result = await apiFetch(
    "/api/v1/auth/password/otp/request",
    {
      method: "POST",
      body: JSON.stringify({
        identifier: normalizedEmail,
        method: "email",
      }),
    },
    PasswordResetOtpRequestResponseSchema,
  );

  return {
    normalizedEmail,
    debugOtp: result.debugOtp,
    resendCooldownSec: result.resendCooldownSec,
  };
};
