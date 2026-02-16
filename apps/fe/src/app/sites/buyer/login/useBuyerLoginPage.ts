import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthLoginResponseSchema } from "@acme/shared";
import { ApiClientError, apiFetch } from "@/lib/apiClient";
import { setAuthSession } from "@/lib/auth-session";

export const useBuyerLoginPage = () => {
  const router = useRouter();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Kata sandi yang Anda masukkan salah. Silakan coba lagi.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const onTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!email.trim() || !password) {
      setErrorMessage("Email dan kata sandi wajib diisi.");
      setShowErrorModal(true);
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await apiFetch(
        "/api/v1/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        },
        AuthLoginResponseSchema,
      );

      setAuthSession(result.session, result.user, result.roles);
      router.push("/");
    } catch (error) {
      const message =
        error instanceof ApiClientError ? error.message : "Terjadi kendala saat login. Silakan coba lagi.";
      setErrorMessage(message);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    showErrorModal,
    errorMessage,
    isSubmitting,
    showPassword,
    email,
    password,
    setEmail,
    setPassword,
    onCloseErrorModal,
    onTogglePasswordVisibility,
    onSubmit,
  };
};
