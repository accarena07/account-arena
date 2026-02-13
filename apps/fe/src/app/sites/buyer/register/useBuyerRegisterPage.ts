import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { clearRegisterFieldError, submitRegisterForm } from "./handler";
import { setRegisterOtpContext } from "./register-otp-context";
import type { RegisterFormErrors } from "./register.type";

export const useBuyerRegisterPage = () => {
  const router = useRouter();
  const [showTncModal, setShowTncModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState("Registrasi Gagal");
  const [errorMessage, setErrorMessage] = useState("Pendaftaran gagal. Silakan coba lagi.");
  const [errorSecondaryActionLabel, setErrorSecondaryActionLabel] = useState<string | undefined>(undefined);
  const [errorSecondaryActionHref, setErrorSecondaryActionHref] = useState<string | undefined>(undefined);

  const onEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => clearRegisterFieldError(prev, "email"));
  };

  const onWhatsAppChange = (value: string) => {
    setWhatsApp(value);
    setErrors((prev) => clearRegisterFieldError(prev, "whatsapp"));
  };

  const onPasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prev) => clearRegisterFieldError(prev, "password"));
  };

  const onOpenTncModal = () => {
    setShowTncModal(true);
  };

  const onCloseTncModal = () => {
    setShowTncModal(false);
  };

  const onTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const result = await submitRegisterForm({ email, whatsApp, password });

    if (!result.ok && "formErrors" in result) {
      setErrors(result.formErrors);
      setIsSubmitting(false);
      return;
    }

    if (!result.ok && "modalError" in result) {
      setErrorTitle(result.modalError.title);
      setErrorMessage(result.modalError.message);
      setErrorSecondaryActionLabel(result.modalError.secondaryActionLabel);
      setErrorSecondaryActionHref(result.modalError.secondaryActionHref);
      setShowErrorModal(true);
      setIsSubmitting(false);
      return;
    }

    setRegisterOtpContext({
      email: result.data.email,
      debugOtp: result.data.debugOtp,
      resendCooldownSec: result.data.resendCooldownSec,
    });
    router.push("/register/otp");
  };

  return {
    showTncModal,
    showPassword,
    email,
    whatsApp,
    password,
    errors,
    isSubmitting,
    showErrorModal,
    errorTitle,
    errorMessage,
    errorSecondaryActionLabel,
    errorSecondaryActionHref,
    onEmailChange,
    onWhatsAppChange,
    onPasswordChange,
    onOpenTncModal,
    onCloseTncModal,
    onTogglePassword,
    onCloseErrorModal,
    onSubmit,
  };
};
