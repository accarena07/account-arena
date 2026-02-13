import type {
  PasswordResetOtpRequestResponse,
  PasswordResetOtpVerifyResponse,
  RegisterOtpRequestResponse,
  RegisterOtpVerifyResponse,
} from "@acme/shared";

export type OtpFlow = "register" | "reset-password";

export type OtpVerificationPageProps = {
  flow: OtpFlow;
};

export type OtpVerifyErrorState = {
  title: string;
  message: string;
};

export type OtpFlowUiMeta = {
  backHref: string;
  backLabel: string;
  description: string;
};

export type RegisterOtpResendResult = Pick<RegisterOtpRequestResponse, "debugOtp" | "resendCooldownSec">;
export type PasswordOtpResendResult = Pick<PasswordResetOtpRequestResponse, "debugOtp" | "resendCooldownSec">;
export type RegisterOtpVerifyResult = Pick<RegisterOtpVerifyResponse, "session" | "roles" | "user">;
export type PasswordOtpVerifyResult = Pick<PasswordResetOtpVerifyResponse, "resetToken">;
