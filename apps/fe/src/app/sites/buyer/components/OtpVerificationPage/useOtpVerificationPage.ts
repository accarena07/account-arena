import { useRouter } from "next/navigation";
import { useEffect, useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { setAuthSession } from "@/lib/auth-session";
import { getPasswordResetContext, updatePasswordResetContext } from "../../login/password-reset-context";
import { clearRegisterOtpContext, getRegisterOtpContext, updateRegisterOtpContext } from "../../register/register-otp-context";
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
import type { OtpFlow, OtpVerifyErrorState } from "./otp-verification.type";

type UseOtpUiState = {
  otpDigits: string[];
  showOtpErrorModal: boolean;
  showResendSuccessModal: boolean;
  errorTitle: string;
  errorMessage: string;
  isSubmitting: boolean;
  isResending: boolean;
  resendCooldownSec: number;
  setOtpDigits: Dispatch<SetStateAction<string[]>>;
  setShowOtpErrorModal: Dispatch<SetStateAction<boolean>>;
  setShowResendSuccessModal: Dispatch<SetStateAction<boolean>>;
  setErrorTitle: Dispatch<SetStateAction<string>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setIsResending: Dispatch<SetStateAction<boolean>>;
  setResendCooldownSec: Dispatch<SetStateAction<number>>;
};

const useOtpUiState = (): UseOtpUiState => {
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [showOtpErrorModal, setShowOtpErrorModal] = useState(false);
  const [showResendSuccessModal, setShowResendSuccessModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState("Verifikasi Gagal");
  const [errorMessage, setErrorMessage] = useState("Kode OTP yang Anda masukkan salah. Silakan cek kembali dan coba lagi.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldownSec, setResendCooldownSec] = useState(DEFAULT_RESEND_COOLDOWN_SEC);

  return {
    otpDigits,
    showOtpErrorModal,
    showResendSuccessModal,
    errorTitle,
    errorMessage,
    isSubmitting,
    isResending,
    resendCooldownSec,
    setOtpDigits,
    setShowOtpErrorModal,
    setShowResendSuccessModal,
    setErrorTitle,
    setErrorMessage,
    setIsSubmitting,
    setIsResending,
    setResendCooldownSec,
  };
};

const applyOtpError = (state: UseOtpUiState, mapped: OtpVerifyErrorState) => {
  state.setErrorTitle(mapped.title);
  state.setErrorMessage(mapped.message);
  state.setShowOtpErrorModal(true);
};

const useOtpCooldown = (
  resendCooldownSec: number,
  setResendCooldownSec: Dispatch<SetStateAction<number>>,
) => {
  useEffect(() => {
    if (resendCooldownSec <= 0) return;
    const timer = window.setInterval(() => {
      setResendCooldownSec((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [resendCooldownSec, setResendCooldownSec]);
};

const useOtpBootstrap = (
  flow: OtpFlow,
  router: ReturnType<typeof useRouter>,
  setResendCooldownSec: Dispatch<SetStateAction<number>>,
) => {
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

    const context = getRegisterOtpContext();
    if (!context) {
      router.replace(getOtpContextMissingRedirect(flow));
      return;
    }
    setResendCooldownSec(context.resendCooldownSec ?? DEFAULT_RESEND_COOLDOWN_SEC);
  }, [flow, router, setResendCooldownSec]);
};

const ensureOtpLength = (otpCode: string, state: UseOtpUiState): boolean => {
  if (otpCode.length === OTP_LENGTH) return true;
  applyOtpError(state, {
    title: "Verifikasi Gagal",
    message: OTP_LENGTH_ERROR_MESSAGE,
  });
  return false;
};

const verifyResetPasswordOtp = async (
  flow: OtpFlow,
  otpCode: string,
  router: ReturnType<typeof useRouter>,
  state: UseOtpUiState,
) => {
  const context = getPasswordResetContext();
  if (!context) {
    router.replace(getOtpContextMissingRedirect(flow));
    return;
  }

  try {
    state.setIsSubmitting(true);
    const result = await verifyPasswordResetOtp(context.identifier, otpCode);
    updatePasswordResetContext({ resetToken: result.resetToken });
    router.push("/login/reset-password");
  } catch (error) {
    applyOtpError(state, mapVerifyOtpError(error));
  } finally {
    state.setIsSubmitting(false);
  }
};

const verifyRegisterOtpFlow = async (
  flow: OtpFlow,
  otpCode: string,
  router: ReturnType<typeof useRouter>,
  state: UseOtpUiState,
) => {
  const context = getRegisterOtpContext();
  if (!context) {
    router.replace(getOtpContextMissingRedirect(flow));
    return;
  }

  try {
    state.setIsSubmitting(true);
    const result = await verifyRegisterOtp(context.email, otpCode);
    if (result.session) {
      setAuthSession(result.session, result.user, result.roles);
    }
    clearRegisterOtpContext();
    router.push("/register/success");
  } catch (error) {
    applyOtpError(state, mapVerifyOtpError(error));
  } finally {
    state.setIsSubmitting(false);
  }
};

const resendResetPasswordOtp = async (
  flow: OtpFlow,
  router: ReturnType<typeof useRouter>,
  state: UseOtpUiState,
) => {
  const context = getPasswordResetContext();
  if (!context) {
    router.replace(getOtpContextMissingRedirect(flow));
    return;
  }

  try {
    state.setIsResending(true);
    const result = await resendPasswordResetOtp(context.identifier, context.method);
    updatePasswordResetContext({ debugOtp: result.debugOtp, resendCooldownSec: result.resendCooldownSec });
    state.setResendCooldownSec(result.resendCooldownSec);
    state.setShowResendSuccessModal(true);
  } catch (error) {
    const retryAfterSec = extractRetryAfterSec(error);
    if (retryAfterSec) {
      state.setResendCooldownSec(retryAfterSec);
      return;
    }
    applyOtpError(state, mapResendOtpError(error));
  } finally {
    state.setIsResending(false);
  }
};

const resendRegisterOtpFlow = async (
  flow: OtpFlow,
  router: ReturnType<typeof useRouter>,
  state: UseOtpUiState,
) => {
  const context = getRegisterOtpContext();
  if (!context) {
    router.replace(getOtpContextMissingRedirect(flow));
    return;
  }

  try {
    state.setIsResending(true);
    const result = await resendRegisterOtp(context.email);
    updateRegisterOtpContext({ debugOtp: result.debugOtp, resendCooldownSec: result.resendCooldownSec });
    state.setResendCooldownSec(result.resendCooldownSec);
    state.setShowResendSuccessModal(true);
  } catch (error) {
    const retryAfterSec = extractRetryAfterSec(error);
    if (retryAfterSec) {
      state.setResendCooldownSec(retryAfterSec);
      return;
    }
    applyOtpError(state, mapResendOtpError(error));
  } finally {
    state.setIsResending(false);
  }
};

const verifyByFlow = async (
  flow: OtpFlow,
  otpCode: string,
  router: ReturnType<typeof useRouter>,
  state: UseOtpUiState,
) => {
  if (flow === "reset-password") {
    await verifyResetPasswordOtp(flow, otpCode, router, state);
    return;
  }
  await verifyRegisterOtpFlow(flow, otpCode, router, state);
};

const resendByFlow = async (flow: OtpFlow, router: ReturnType<typeof useRouter>, state: UseOtpUiState) => {
  if (flow === "reset-password") {
    await resendResetPasswordOtp(flow, router, state);
    return;
  }
  await resendRegisterOtpFlow(flow, router, state);
};

const createOnCloseOtpErrorModal = (state: UseOtpUiState) => {
  return () => {
    state.setShowOtpErrorModal(false);
  };
};

const createOnCloseResendSuccessModal = (state: UseOtpUiState) => {
  return () => {
    state.setShowResendSuccessModal(false);
  };
};

const createOnChangeDigit = (state: UseOtpUiState) => {
  return (index: number, value: string) => {
    const sanitized = sanitizeOtpDigit(value);
    state.setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = sanitized;
      return next;
    });
  };
};

const createOnSubmit = (
  flow: OtpFlow,
  router: ReturnType<typeof useRouter>,
  state: UseOtpUiState,
) => {
  return async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const otpCode = buildOtpCode(state.otpDigits);
    if (!ensureOtpLength(otpCode, state)) return;
    await verifyByFlow(flow, otpCode, router, state);
  };
};

const createOnResendOtp = (
  flow: OtpFlow,
  router: ReturnType<typeof useRouter>,
  state: UseOtpUiState,
) => {
  return async () => {
    if (state.isResending || state.resendCooldownSec > 0) return;
    await resendByFlow(flow, router, state);
  };
};

const buildOtpPageState = (
  state: UseOtpUiState,
  flow: OtpFlow,
  handlers: {
    onCloseOtpErrorModal: () => void;
    onCloseResendSuccessModal: () => void;
    onChangeDigit: (index: number, value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    onResendOtp: () => Promise<void>;
  },
) => {
  const { backHref, backLabel, description } = getOtpFlowUiMeta(flow);
  return {
    otpDigits: state.otpDigits,
    showOtpErrorModal: state.showOtpErrorModal,
    showResendSuccessModal: state.showResendSuccessModal,
    errorTitle: state.errorTitle,
    errorMessage: state.errorMessage,
    isSubmitting: state.isSubmitting,
    isResending: state.isResending,
    resendCooldownSec: state.resendCooldownSec,
    backHref,
    backLabel,
    description,
    ...handlers,
    formatCooldown,
    resendSuccessMessage: RESEND_SUCCESS_MESSAGE,
  };
};

export const useOtpVerificationPage = (flow: OtpFlow) => {
  const router = useRouter();
  const state = useOtpUiState();

  useOtpCooldown(state.resendCooldownSec, state.setResendCooldownSec);
  useOtpBootstrap(flow, router, state.setResendCooldownSec);

  const handlers = {
    onCloseOtpErrorModal: createOnCloseOtpErrorModal(state),
    onCloseResendSuccessModal: createOnCloseResendSuccessModal(state),
    onChangeDigit: createOnChangeDigit(state),
    onSubmit: createOnSubmit(flow, router, state),
    onResendOtp: createOnResendOtp(flow, router, state),
  };

  return buildOtpPageState(state, flow, handlers);
};
