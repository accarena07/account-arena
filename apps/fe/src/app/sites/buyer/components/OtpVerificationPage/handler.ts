import {
  PasswordResetErrorCode,
  PasswordResetOtpRequestResponseSchema,
  PasswordResetOtpVerifyResponseSchema,
  RegisterErrorCode,
  RegisterOtpRequestResponseSchema,
  RegisterOtpVerifyResponseSchema,
  isPasswordResetSystemErrorCode,
  isRegisterSystemErrorCode,
} from "@acme/shared";
import { ApiClientError, apiFetch } from "@/lib/apiClient";
import type {
  OtpFlow,
  OtpFlowUiMeta,
  OtpVerifyErrorState,
  PasswordOtpResendResult,
  PasswordOtpVerifyResult,
  RegisterOtpResendResult,
  RegisterOtpVerifyResult,
} from "./otp-verification.type";

export const OTP_LENGTH = 6;
export const DEFAULT_RESEND_COOLDOWN_SEC = 60;
export const RESEND_SUCCESS_MESSAGE = "Kode OTP baru sudah dikirim. Silakan cek email Anda.";
export const OTP_LENGTH_ERROR_MESSAGE = "Kode OTP harus 6 digit.";
const SYSTEM_ERROR_MESSAGE = "Sistem sedang mengalami gangguan. Silakan coba beberapa saat lagi.";
const VERIFY_FALLBACK_MESSAGE = "Verifikasi OTP gagal. Silakan coba lagi.";
const RESEND_FALLBACK_MESSAGE = "Gagal kirim ulang OTP.";
const VERIFY_BUSINESS_ERROR_CODES = new Set<string>([
  RegisterErrorCode.VALIDATION_ERROR,
  RegisterErrorCode.OTP_INVALID,
  RegisterErrorCode.OTP_EXPIRED,
  RegisterErrorCode.OTP_NOT_FOUND,
  RegisterErrorCode.OTP_ATTEMPTS_EXCEEDED,
  PasswordResetErrorCode.USER_NOT_FOUND,
]);
const RESEND_BUSINESS_ERROR_CODES = new Set<string>([
  RegisterErrorCode.VALIDATION_ERROR,
  RegisterErrorCode.OTP_RESEND_TOO_FAST,
  RegisterErrorCode.OTP_NOT_FOUND,
  PasswordResetErrorCode.EMAIL_NOT_REGISTERED,
]);
const SYSTEM_ERROR_CODES = new Set<string>([
  RegisterErrorCode.MAILER_NOT_CONFIGURED,
  RegisterErrorCode.MAIL_SEND_TIMEOUT,
  PasswordResetErrorCode.MAILER_NOT_CONFIGURED,
  PasswordResetErrorCode.MAIL_SEND_TIMEOUT,
  "BAD_REQUEST",
]);

const isSystemLevelError = (error: ApiClientError, errorCode?: string) => {
  const loweredMessage = error.message.toLowerCase();
  return (
    (typeof error.status === "number" && error.status >= 500) ||
    SYSTEM_ERROR_CODES.has(errorCode ?? "") ||
    isRegisterSystemErrorCode(errorCode) ||
    isPasswordResetSystemErrorCode(errorCode) ||
    loweredMessage.includes("timeout") ||
    loweredMessage.includes("network")
  );
};

export const getOtpFlowUiMeta = (flow: OtpFlow): OtpFlowUiMeta => {
  if (flow === "register") {
    return {
      backHref: "/register",
      backLabel: "Kembali ke Daftar",
      description: "Masukkan 6 digit kode yang dikirim ke email untuk menyelesaikan pendaftaran",
    };
  }

  return {
    backHref: "/login",
    backLabel: "Kembali ke Login",
    description: "Masukkan 6 digit kode yang dikirim ke email Anda",
  };
};

export const getOtpContextMissingRedirect = (flow: OtpFlow) => {
  return flow === "register" ? "/register" : "/login/forgot-password";
};

export const sanitizeOtpDigit = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 1);
};

export const buildOtpCode = (digits: string[]): string => {
  return digits.join("");
};

export const formatCooldown = (sec: number): string => {
  const minute = Math.floor(sec / 60);
  const second = sec % 60;
  return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
};

export const mapVerifyOtpError = (error: unknown): OtpVerifyErrorState => {
  if (!(error instanceof ApiClientError)) {
    return {
      title: "Verifikasi Gagal",
      message: SYSTEM_ERROR_MESSAGE,
    };
  }

  const errorCode = (error.details as { code?: string } | undefined)?.code;
  if (isSystemLevelError(error, errorCode)) {
    return {
      title: "Verifikasi Gagal",
      message: SYSTEM_ERROR_MESSAGE,
    };
  }
  if (VERIFY_BUSINESS_ERROR_CODES.has(errorCode ?? "")) {
    return {
      title: "Verifikasi Gagal",
      message: error.message || VERIFY_FALLBACK_MESSAGE,
    };
  }
  return {
    title: "Verifikasi Gagal",
    message: VERIFY_FALLBACK_MESSAGE,
  };
};

export const mapResendOtpError = (error: unknown): OtpVerifyErrorState => {
  if (!(error instanceof ApiClientError)) {
    return {
      title: "Gagal Kirim Ulang OTP",
      message: SYSTEM_ERROR_MESSAGE,
    };
  }

  const errorCode = (error.details as { code?: string } | undefined)?.code;
  if (isSystemLevelError(error, errorCode)) {
    return {
      title: "Gagal Kirim Ulang OTP",
      message: SYSTEM_ERROR_MESSAGE,
    };
  }
  if (RESEND_BUSINESS_ERROR_CODES.has(errorCode ?? "")) {
    return {
      title: "Gagal Kirim Ulang OTP",
      message: error.message || RESEND_FALLBACK_MESSAGE,
    };
  }
  return {
    title: "Gagal Kirim Ulang OTP",
    message: RESEND_FALLBACK_MESSAGE,
  };
};

export const extractRetryAfterSec = (error: unknown): number | null => {
  if (!(error instanceof ApiClientError)) return null;
  const errorDetails = error.details as
    | { details?: { retryAfterSec?: unknown } }
    | undefined;
  const retryAfterSec = errorDetails?.details?.retryAfterSec;
  if (typeof retryAfterSec !== "number" || !Number.isFinite(retryAfterSec) || retryAfterSec <= 0) {
    return null;
  }
  return Math.floor(retryAfterSec);
};

export const verifyRegisterOtp = async (email: string, otp: string): Promise<RegisterOtpVerifyResult> => {
  const result = await apiFetch(
    "/api/v1/auth/register/otp/verify",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        otp,
      }),
    },
    RegisterOtpVerifyResponseSchema,
  );

  return {
    session: result.session,
    user: result.user,
    roles: result.roles,
  };
};

export const verifyPasswordResetOtp = async (
  identifier: string,
  otp: string,
): Promise<PasswordOtpVerifyResult> => {
  const result = await apiFetch(
    "/api/v1/auth/password/otp/verify",
    {
      method: "POST",
      body: JSON.stringify({
        identifier,
        otp,
      }),
    },
    PasswordResetOtpVerifyResponseSchema,
  );

  return {
    resetToken: result.resetToken,
  };
};

export const resendRegisterOtp = async (email: string): Promise<RegisterOtpResendResult> => {
  const result = await apiFetch(
    "/api/v1/auth/register/otp/resend",
    {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    },
    RegisterOtpRequestResponseSchema,
  );

  return {
    debugOtp: result.debugOtp,
    resendCooldownSec: result.resendCooldownSec,
  };
};

export const resendPasswordResetOtp = async (
  identifier: string,
  method: "email",
): Promise<PasswordOtpResendResult> => {
  const result = await apiFetch(
    "/api/v1/auth/password/otp/request",
    {
      method: "POST",
      body: JSON.stringify({
        identifier,
        method,
      }),
    },
    PasswordResetOtpRequestResponseSchema,
  );

  return {
    debugOtp: result.debugOtp,
    resendCooldownSec: result.resendCooldownSec,
  };
};
