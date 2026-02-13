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
};

export type RegisterFormErrors = {
  email?: string;
  whatsapp?: string;
  password?: string;
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
