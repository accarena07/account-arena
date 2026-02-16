import type { FormEvent } from "react";

export type TermsSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type TermsDocument = {
  id: "master" | "buyer";
  title: string;
  subtitle?: string;
  effectiveDate: string;
  sections: TermsSection[];
};

export type RegisterFormValues = {
  email: string;
  whatsApp: string;
  password: string;
  termsAccepted: boolean;
};

export type RegisterFormErrors = {
  email?: string;
  whatsapp?: string;
  password?: string;
  terms?: string;
};

export type RegisterModalError = {
  title: string;
  message: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
};

export type RegisterSubmitSuccess = {
  email: string;
  debugOtp?: string;
  resendCooldownSec: number;
};

export type RegisterSubmitResult =
  | {
      ok: false;
      formErrors: RegisterFormErrors;
    }
  | {
      ok: false;
      modalError: RegisterModalError;
    }
  | {
      ok: true;
      data: RegisterSubmitSuccess;
    };

export type RegisterOtpContext = {
  email: string;
  debugOtp?: string;
  resendCooldownSec?: number;
};

export type RegisterFormProps = {
  email: string;
  whatsApp: string;
  password: string;
  termsAccepted: boolean;
  showPassword: boolean;
  isSubmitting: boolean;
  errors: RegisterFormErrors;
  onEmailChange: (value: string) => void;
  onWhatsAppChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTermsAcceptedChange: (value: boolean) => void;
  onTogglePassword: () => void;
  onOpenTncModal: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export type RegisterInputProps = Pick<
  RegisterFormProps,
  | "email"
  | "whatsApp"
  | "password"
  | "termsAccepted"
  | "showPassword"
  | "isSubmitting"
  | "errors"
  | "onEmailChange"
  | "onWhatsAppChange"
  | "onPasswordChange"
  | "onTermsAcceptedChange"
  | "onTogglePassword"
>;

export type RegisterTextFieldProps = {
  label: string;
  icon: string;
  placeholder: string;
  type: string;
  value: string;
  disabled: boolean;
  error?: string;
  onChange: (value: string) => void;
};

export type RegisterPasswordFieldProps = {
  value: string;
  showPassword: boolean;
  disabled: boolean;
  error?: string;
  onChange: (value: string) => void;
  onTogglePassword: () => void;
};

export type PasswordVisibilityButtonProps = Pick<
  RegisterPasswordFieldProps,
  "showPassword" | "disabled" | "onTogglePassword"
>;

export type RegisterIdentityFieldsProps = Pick<
  RegisterInputProps,
  "email" | "whatsApp" | "isSubmitting" | "errors" | "onEmailChange" | "onWhatsAppChange"
>;

export type RegisterTermsAgreementProps = {
  termsAccepted: boolean;
  error?: string;
  isSubmitting: boolean;
  onTermsAcceptedChange: (value: boolean) => void;
  onOpenTncModal: () => void;
};

export type RegisterSubmitSectionProps = {
  isSubmitting: boolean;
};

export type RegisterTermsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type RegisterTermsDocumentProps = {
  title: string;
  subtitle?: string;
  effectiveDate: string;
  sections: TermsSection[];
};

export type RegisterModalCloseProps = {
  onClose: () => void;
};
