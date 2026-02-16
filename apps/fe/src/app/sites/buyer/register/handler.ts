import {
  RegisterErrorCode,
  RegisterOtpRequestResponseSchema,
  isRegisterSystemErrorCode,
} from "@acme/shared";
import { ApiClientError, apiFetch } from "@/lib/apiClient";
import type {
  RegisterFormErrors,
  RegisterFormValues,
  RegisterModalError,
  RegisterSubmitResult,
} from "./register.type";

export const EMAIL_MIN_LENGTH = 6;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const indonesianPhoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{7,10}$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}$/;

export const clearRegisterFieldError = (
  errors: RegisterFormErrors,
  field: keyof RegisterFormErrors,
): RegisterFormErrors => {
  return { ...errors, [field]: undefined };
};

export const validateRegisterForm = (values: RegisterFormValues): RegisterFormErrors => {
  const nextErrors: RegisterFormErrors = {};
  const normalizedEmail = values.email.trim();
  const normalizedPhone = values.whatsApp.trim().replace(/[\s-]/g, "");

  if (normalizedEmail.length < EMAIL_MIN_LENGTH) {
    nextErrors.email = `Email minimal ${EMAIL_MIN_LENGTH} karakter.`;
  } else if (!emailRegex.test(normalizedEmail)) {
    nextErrors.email = "Format email tidak valid.";
  }

  if (!indonesianPhoneRegex.test(normalizedPhone)) {
    nextErrors.whatsapp = "Nomor WhatsApp harus nomor Indonesia (08xx / 62xx / +62xx).";
  }

  if (!strongPasswordRegex.test(values.password)) {
    nextErrors.password =
      "Kata sandi minimal 8 karakter dan wajib ada huruf besar, huruf kecil, angka, serta karakter spesial.";
  }
  if (!values.termsAccepted) {
    nextErrors.terms = "Anda harus menyetujui Syarat & Ketentuan.";
  }

  return nextErrors;
};

export const shouldProceedToOtp = (errors: RegisterFormErrors): boolean => {
  return Object.keys(errors).length === 0;
};

export const submitRegisterOtpRequest = async (values: RegisterFormValues) => {
  const result = await apiFetch(
    "/api/v1/auth/register/otp/request",
    {
      method: "POST",
      body: JSON.stringify({
        email: values.email.trim(),
        password: values.password,
        fullName: values.email.split("@")[0],
        phone: values.whatsApp.trim(),
        termsAccepted: values.termsAccepted,
      }),
    },
    RegisterOtpRequestResponseSchema,
  );

  return {
    email: values.email.trim().toLowerCase(),
    debugOtp: result.debugOtp,
    resendCooldownSec: result.resendCooldownSec,
  };
};

export const mapRegisterSubmitError = (error: unknown): RegisterModalError => {
  let message = "Server sedang mengalami gangguan. Silakan coba beberapa saat lagi.";
  let title = "Registrasi Gagal";
  let secondaryLabel: string | undefined;
  let secondaryHref: string | undefined;

  if (error instanceof ApiClientError) {
    const errorCode = (error.details as { code?: string } | undefined)?.code;
    if (
      errorCode === RegisterErrorCode.EMAIL_ALREADY_REGISTERED ||
      errorCode === RegisterErrorCode.PHONE_ALREADY_REGISTERED
    ) {
      title = "Akun Sudah Terdaftar";
      message = "Email atau nomor WhatsApp ini sudah terpakai. Silakan login.";
      secondaryLabel = "Masuk ke Akun";
      secondaryHref = "/login";
    } else if (
      (typeof error.status === "number" && error.status >= 500) ||
      isRegisterSystemErrorCode(errorCode)
    ) {
      message = "Server sedang mengalami gangguan. Silakan coba beberapa saat lagi.";
    } else if (
      error.message.toLowerCase().includes("timeout") ||
      error.message.toLowerCase().includes("network")
    ) {
      message = "Koneksi sedang bermasalah. Silakan coba beberapa saat lagi.";
    } else {
      message = error.message || "Pendaftaran gagal. Silakan coba lagi.";
    }
  }

  return {
    title,
    message,
    secondaryActionLabel: secondaryLabel,
    secondaryActionHref: secondaryHref,
  };
};

export const submitRegisterForm = async (
  values: RegisterFormValues,
): Promise<RegisterSubmitResult> => {
  const nextErrors = validateRegisterForm(values);
  if (!shouldProceedToOtp(nextErrors)) {
    return {
      ok: false,
      formErrors: nextErrors,
    };
  }

  try {
    const data = await submitRegisterOtpRequest(values);
    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      modalError: mapRegisterSubmitError(error),
    };
  }
};
