import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { clearRegisterFieldError, submitRegisterForm } from "./handler";
import { setRegisterOtpContext } from "./register-otp-context";
import type { RegisterFormErrors } from "./register.type";

const useRegisterInputState = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFullNameChange = (value: string) => {
    setFullName(value);
    setErrors((prev) => clearRegisterFieldError(prev, "fullName"));
  };

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
  const onTermsAcceptedChange = (value: boolean) => {
    setTermsAccepted(value);
    setErrors((prev) => clearRegisterFieldError(prev, "terms"));
  };

  return {
    fullName,
    email,
    whatsApp,
    password,
    termsAccepted,
    errors,
    isSubmitting,
    setIsSubmitting,
    setErrors,
    onFullNameChange,
    onEmailChange,
    onWhatsAppChange,
    onPasswordChange,
    onTermsAcceptedChange,
  };
};

const useRegisterUiState = () => {
  const [showTncModal, setShowTncModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onOpenTncModal = () => {
    setShowTncModal(true);
  };

  const onCloseTncModal = () => {
    setShowTncModal(false);
  };

  const onTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    showTncModal,
    showPassword,
    onOpenTncModal,
    onCloseTncModal,
    onTogglePassword,
  };
};

const useRegisterErrorModalState = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState("Registrasi Gagal");
  const [errorMessage, setErrorMessage] = useState("Pendaftaran gagal. Silakan coba lagi.");
  const [errorSecondaryActionLabel, setErrorSecondaryActionLabel] = useState<string | undefined>(undefined);
  const [errorSecondaryActionHref, setErrorSecondaryActionHref] = useState<string | undefined>(undefined);

  const onCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return {
    showErrorModal,
    errorTitle,
    errorMessage,
    errorSecondaryActionLabel,
    errorSecondaryActionHref,
    setShowErrorModal,
    setErrorTitle,
    setErrorMessage,
    setErrorSecondaryActionLabel,
    setErrorSecondaryActionHref,
    onCloseErrorModal,
  };
};

const useRegisterSubmitAction = (
  router: ReturnType<typeof useRouter>,
  inputState: ReturnType<typeof useRegisterInputState>,
  modalState: ReturnType<typeof useRegisterErrorModalState>,
) => {
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputState.isSubmitting) return;

    inputState.setIsSubmitting(true);
    const result = await submitRegisterForm({
      fullName: inputState.fullName,
      email: inputState.email,
      whatsApp: inputState.whatsApp,
      password: inputState.password,
      termsAccepted: inputState.termsAccepted,
    });

    if (!result.ok && "formErrors" in result) {
      inputState.setErrors(result.formErrors);
      inputState.setIsSubmitting(false);
      return;
    }

    if (!result.ok && "modalError" in result) {
      modalState.setErrorTitle(result.modalError.title);
      modalState.setErrorMessage(result.modalError.message);
      modalState.setErrorSecondaryActionLabel(result.modalError.secondaryActionLabel);
      modalState.setErrorSecondaryActionHref(result.modalError.secondaryActionHref);
      modalState.setShowErrorModal(true);
      inputState.setIsSubmitting(false);
      return;
    }

    setRegisterOtpContext({
      email: result.data.email,
      debugOtp: result.data.debugOtp,
      resendCooldownSec: result.data.resendCooldownSec,
    });
    router.push("/register/otp");
  };

  return { onSubmit };
};

export const useBuyerRegisterPage = () => {
  const router = useRouter();
  const inputState = useRegisterInputState();
  const uiState = useRegisterUiState();
  const modalState = useRegisterErrorModalState();
  const { onSubmit } = useRegisterSubmitAction(router, inputState, modalState);

  return {
    ...inputState,
    ...uiState,
    ...modalState,
    onSubmit,
  };
};
