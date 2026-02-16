import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { setAuthSession } from "@/lib/auth-session";
import {
  getPasswordResetContext,
  updatePasswordResetContext,
} from "../../login/password-reset-context";
import {
  clearRegisterOtpContext,
  getRegisterOtpContext,
  updateRegisterOtpContext,
} from "../../register/register-otp-context";
import {
  DEFAULT_RESEND_COOLDOWN_SEC,
  OTP_LENGTH,
  OTP_LENGTH_ERROR_MESSAGE,
  RESEND_SUCCESS_MESSAGE,
  buildOtpCode,
  extractRetryAfterSec,
  formatCooldown,
  getOtpContextMissingRedirect,
  getOtpFlowUiMeta,
  mapResendOtpError,
  mapVerifyOtpError,
  resendPasswordResetOtp,
  resendRegisterOtp,
  sanitizeOtpDigit,
  verifyPasswordResetOtp,
  verifyRegisterOtp,
} from "./handler";
import type { OtpFlow } from "./otp-verification.type";

export const useOtpVerificationPage = (flow: OtpFlow) => {
  const router = useRouter();
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [showOtpErrorModal, setShowOtpErrorModal] = useState(false);
  const [showResendSuccessModal, setShowResendSuccessModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState("Verifikasi Gagal");
  const [errorMessage, setErrorMessage] = useState("Kode OTP yang Anda masukkan salah. Silakan cek kembali dan coba lagi.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldownSec, setResendCooldownSec] = useState(DEFAULT_RESEND_COOLDOWN_SEC);

  useEffect(() => {
    if (resendCooldownSec <= 0) return;
    const timer = window.setInterval(() => {
      setResendCooldownSec((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [resendCooldownSec]);

  useEffect(() => {
    if (flow === "reset-password") {
      const context = getPasswordResetContext();
      if (!context) {
        router.replace(getOtpContextMissingRedirect(flow));
        return;
      }
      setResendCooldownSec(context.resendCooldownSec ?? DEFAULT_RESEND_COOLDOWN_SEC);
      return;
    }

    const registerContext = getRegisterOtpContext();
    if (!registerContext) {
      router.replace(getOtpContextMissingRedirect(flow));
      return;
    }
    setResendCooldownSec(registerContext.resendCooldownSec ?? DEFAULT_RESEND_COOLDOWN_SEC);
  }, [flow, router]);

  const onCloseOtpErrorModal = () => {
    setShowOtpErrorModal(false);
  };

  const onCloseResendSuccessModal = () => {
    setShowResendSuccessModal(false);
  };

  const onChangeDigit = (index: number, value: string) => {
    const sanitized = sanitizeOtpDigit(value);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = sanitized;
      return next;
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const otpCode = buildOtpCode(otpDigits);
    if (otpCode.length !== OTP_LENGTH) {
      setErrorTitle("Verifikasi Gagal");
      setErrorMessage(OTP_LENGTH_ERROR_MESSAGE);
      setShowOtpErrorModal(true);
      return;
    }

    if (flow === "reset-password") {
      const context = getPasswordResetContext();
      if (!context) {
        router.replace(getOtpContextMissingRedirect(flow));
        return;
      }

      try {
        setIsSubmitting(true);
        const result = await verifyPasswordResetOtp(context.identifier, otpCode);
        updatePasswordResetContext({ resetToken: result.resetToken });
        router.push("/login/reset-password");
        return;
      } catch (error) {
        const mapped = mapVerifyOtpError(error);
        setErrorTitle(mapped.title);
        setErrorMessage(mapped.message);
        setShowOtpErrorModal(true);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const context = getRegisterOtpContext();
    if (!context) {
      router.replace(getOtpContextMissingRedirect(flow));
      return;
    }
    try {
      setIsSubmitting(true);
      const result = await verifyRegisterOtp(context.email, otpCode);
      if (result.session) {
        setAuthSession(result.session, result.user, result.roles);
      }
      clearRegisterOtpContext();
      router.push("/register/success");
    } catch (error) {
      const mapped = mapVerifyOtpError(error);
      setErrorTitle(mapped.title);
      setErrorMessage(mapped.message);
      setShowOtpErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResendOtp = async () => {
    if (isResending || resendCooldownSec > 0) return;

    if (flow === "reset-password") {
      const context = getPasswordResetContext();
      if (!context) {
        router.replace(getOtpContextMissingRedirect(flow));
        return;
      }

      try {
        setIsResending(true);
        const result = await resendPasswordResetOtp(context.identifier, context.method);
        updatePasswordResetContext({
          debugOtp: result.debugOtp,
          resendCooldownSec: result.resendCooldownSec,
        });
        setResendCooldownSec(result.resendCooldownSec);
        setShowResendSuccessModal(true);
      } catch (error) {
        const retryAfterSec = extractRetryAfterSec(error);
        if (retryAfterSec) {
          setResendCooldownSec(retryAfterSec);
          return;
        }
        const mapped = mapResendOtpError(error);
        setErrorTitle(mapped.title);
        setErrorMessage(mapped.message);
        setShowOtpErrorModal(true);
      } finally {
        setIsResending(false);
      }
      return;
    }

    const registerContext = getRegisterOtpContext();
    if (!registerContext) {
      router.replace(getOtpContextMissingRedirect(flow));
      return;
    }

    try {
      setIsResending(true);
      const result = await resendRegisterOtp(registerContext.email);
      updateRegisterOtpContext({
        debugOtp: result.debugOtp,
        resendCooldownSec: result.resendCooldownSec,
      });
      setResendCooldownSec(result.resendCooldownSec);
      setShowResendSuccessModal(true);
    } catch (error) {
      const retryAfterSec = extractRetryAfterSec(error);
      if (retryAfterSec) {
        setResendCooldownSec(retryAfterSec);
        return;
      }
      const mapped = mapResendOtpError(error);
      setErrorTitle(mapped.title);
      setErrorMessage(mapped.message);
      setShowOtpErrorModal(true);
    } finally {
      setIsResending(false);
    }
  };

  const { backHref, backLabel, description } = getOtpFlowUiMeta(flow);

  return {
    otpDigits,
    showOtpErrorModal,
    showResendSuccessModal,
    errorTitle,
    errorMessage,
    isSubmitting,
    isResending,
    resendCooldownSec,
    backHref,
    backLabel,
    description,
    onCloseOtpErrorModal,
    onCloseResendSuccessModal,
    onChangeDigit,
    onSubmit,
    onResendOtp,
    formatCooldown,
    resendSuccessMessage: RESEND_SUCCESS_MESSAGE,
  };
};
