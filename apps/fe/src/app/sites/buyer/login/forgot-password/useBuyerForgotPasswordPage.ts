import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { PasswordResetOtpRequestResponseSchema } from "@acme/shared";
import { apiFetch, ApiClientError } from "@/lib/apiClient";
import { setPasswordResetContext } from "../password-reset-context";

const SYSTEM_ERROR_MESSAGE = "Sistem sedang mengalami gangguan. Silakan coba beberapa saat lagi.";
const FALLBACK_ERROR_MESSAGE = "Gagal mengirim OTP. Silakan coba lagi.";
const BUSINESS_ERROR_CODES = new Set([
  "VALIDATION_ERROR",
  "EMAIL_NOT_REGISTERED",
  "OTP_RESEND_TOO_FAST",
]);
const SYSTEM_ERROR_CODES = new Set([
  "MAILER_NOT_CONFIGURED",
  "MAIL_SEND_TIMEOUT",
  "BAD_REQUEST",
]);

const isSystemLevelError = (error: ApiClientError, errorCode?: string) => {
  const loweredMessage = error.message.toLowerCase();
  return (
    (typeof error.status === "number" && error.status >= 500) ||
    SYSTEM_ERROR_CODES.has(errorCode ?? "") ||
    loweredMessage.includes("timeout") ||
    loweredMessage.includes("network")
  );
};

const mapForgotPasswordErrorMessage = (error: unknown) => {
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

export const useBuyerForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateToOtpScreen = () => {
    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current);
      navigateTimeoutRef.current = null;
    }
    router.push("/login/otp");
  };

  useEffect(() => {
    return () => {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }
    };
  }, []);

  const onCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
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

      setPasswordResetContext({
        identifier: normalizedEmail,
        method: "email",
        debugOtp: result.debugOtp,
        resendCooldownSec: result.resendCooldownSec,
      });
      setShowSuccessModal(true);
      navigateTimeoutRef.current = setTimeout(() => {
        navigateToOtpScreen();
      }, 1200);
    } catch (error) {
      const message = mapForgotPasswordErrorMessage(error);
      setErrorMessage(message);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    isSubmitting,
    errorMessage,
    showErrorModal,
    showSuccessModal,
    setEmail,
    onCloseErrorModal,
    navigateToOtpScreen,
    onSubmit,
  };
};
