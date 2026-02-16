import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { setPasswordResetContext } from "../password-reset-context";
import {
  OTP_SUCCESS_REDIRECT_DELAY_MS,
  mapForgotPasswordErrorMessage,
  requestPasswordResetOtp,
} from "./handler";

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
      const result = await requestPasswordResetOtp(email);

      setPasswordResetContext({
        identifier: result.normalizedEmail,
        method: "email",
        debugOtp: result.debugOtp,
        resendCooldownSec: result.resendCooldownSec,
      });
      setShowSuccessModal(true);
      navigateTimeoutRef.current = setTimeout(() => {
        navigateToOtpScreen();
      }, OTP_SUCCESS_REDIRECT_DELAY_MS);
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
