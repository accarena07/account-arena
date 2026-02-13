import {
  PasswordResetOtpRequestResponseSchema,
  PasswordResetOtpVerifyResponseSchema,
  RegisterOtpRequestResponseSchema,
  RegisterOtpVerifyResponseSchema,
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
    description: "Masukkan 6 digit kode yang dikirim ke email/WhatsApp Anda",
  };
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
  if (error instanceof ApiClientError) {
    return {
      title: "Verifikasi Gagal",
      message: error.message || "Verifikasi OTP gagal. Silakan coba lagi.",
    };
  }

  return {
    title: "Verifikasi Gagal",
    message: "Verifikasi OTP gagal. Silakan coba lagi.",
  };
};

export const mapResendOtpError = (error: unknown): OtpVerifyErrorState => {
  if (error instanceof ApiClientError) {
    return {
      title: "Gagal Kirim Ulang OTP",
      message: error.message || "Gagal kirim ulang OTP.",
    };
  }

  return {
    title: "Gagal Kirim Ulang OTP",
    message: "Gagal kirim ulang OTP.",
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
  method: "email" | "whatsapp",
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
