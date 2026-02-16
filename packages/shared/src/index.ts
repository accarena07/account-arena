// Shared schemas & types for FE/BE

import { z } from "zod";

export const HealthSchema = z.object({
  ok: z.boolean(),
  service: z.string(),
  time: z.string()
});
export type Health = z.infer<typeof HealthSchema>;

export const ApiEnvelopeSchema = z.object({
  ok: z.boolean(),
  data: z.unknown().optional(),
  error: z
    .object({
      code: z.string(),
      message: z.string(),
      details: z.unknown().optional()
    })
    .optional(),
  meta: z
    .object({
      requestId: z.string().optional()
    })
    .optional()
});
export type ApiEnvelope = z.infer<typeof ApiEnvelopeSchema>;

export const RegisterErrorCode = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  EMAIL_ALREADY_REGISTERED: "EMAIL_ALREADY_REGISTERED",
  PHONE_ALREADY_REGISTERED: "PHONE_ALREADY_REGISTERED",
  OTP_RESEND_TOO_FAST: "OTP_RESEND_TOO_FAST",
  OTP_NOT_FOUND: "OTP_NOT_FOUND",
  OTP_EXPIRED: "OTP_EXPIRED",
  OTP_ATTEMPTS_EXCEEDED: "OTP_ATTEMPTS_EXCEEDED",
  OTP_INVALID: "OTP_INVALID",
  MAILER_NOT_CONFIGURED: "MAILER_NOT_CONFIGURED",
  OTP_ENCRYPTION_KEY_MISSING: "OTP_ENCRYPTION_KEY_MISSING",
  MAIL_SEND_TIMEOUT: "MAIL_SEND_TIMEOUT",
  UNSUPPORTED_MEDIA_TYPE: "UNSUPPORTED_MEDIA_TYPE",
  REGISTER_CREATE_USER_FAILED: "REGISTER_CREATE_USER_FAILED",
  REGISTER_PROFILE_UPDATE_FAILED: "REGISTER_PROFILE_UPDATE_FAILED",
  REGISTER_EMAIL_CHECK_FAILED: "REGISTER_EMAIL_CHECK_FAILED",
  REGISTER_PHONE_CHECK_FAILED: "REGISTER_PHONE_CHECK_FAILED",
  REGISTER_OTP_REQUEST_FAILED: "REGISTER_OTP_REQUEST_FAILED",
  REGISTER_OTP_RESEND_FAILED: "REGISTER_OTP_RESEND_FAILED",
  REGISTER_OTP_VERIFY_FAILED: "REGISTER_OTP_VERIFY_FAILED",
} as const;

export type RegisterErrorCode = (typeof RegisterErrorCode)[keyof typeof RegisterErrorCode];

export const REGISTER_BUSINESS_ERROR_CODES = [
  RegisterErrorCode.VALIDATION_ERROR,
  RegisterErrorCode.EMAIL_ALREADY_REGISTERED,
  RegisterErrorCode.PHONE_ALREADY_REGISTERED,
  RegisterErrorCode.OTP_RESEND_TOO_FAST,
  RegisterErrorCode.OTP_NOT_FOUND,
  RegisterErrorCode.OTP_EXPIRED,
  RegisterErrorCode.OTP_ATTEMPTS_EXCEEDED,
  RegisterErrorCode.OTP_INVALID,
] as const;

export const REGISTER_SYSTEM_ERROR_CODES = [
  RegisterErrorCode.MAILER_NOT_CONFIGURED,
  RegisterErrorCode.OTP_ENCRYPTION_KEY_MISSING,
  RegisterErrorCode.MAIL_SEND_TIMEOUT,
  RegisterErrorCode.UNSUPPORTED_MEDIA_TYPE,
  RegisterErrorCode.REGISTER_CREATE_USER_FAILED,
  RegisterErrorCode.REGISTER_PROFILE_UPDATE_FAILED,
  RegisterErrorCode.REGISTER_EMAIL_CHECK_FAILED,
  RegisterErrorCode.REGISTER_PHONE_CHECK_FAILED,
  RegisterErrorCode.REGISTER_OTP_REQUEST_FAILED,
  RegisterErrorCode.REGISTER_OTP_RESEND_FAILED,
  RegisterErrorCode.REGISTER_OTP_VERIFY_FAILED,
] as const;

const REGISTER_BUSINESS_ERROR_CODE_SET = new Set<string>(REGISTER_BUSINESS_ERROR_CODES);
const REGISTER_SYSTEM_ERROR_CODE_SET = new Set<string>(REGISTER_SYSTEM_ERROR_CODES);

export const isRegisterBusinessErrorCode = (code: unknown): code is RegisterErrorCode => {
  return typeof code === "string" && REGISTER_BUSINESS_ERROR_CODE_SET.has(code);
};

export const isRegisterSystemErrorCode = (code: unknown): code is RegisterErrorCode => {
  return typeof code === "string" && REGISTER_SYSTEM_ERROR_CODE_SET.has(code);
};

export const PasswordResetErrorCode = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  METHOD_NOT_SUPPORTED: "METHOD_NOT_SUPPORTED",
  EMAIL_NOT_REGISTERED: "EMAIL_NOT_REGISTERED",
  OTP_RESEND_TOO_FAST: "OTP_RESEND_TOO_FAST",
  OTP_NOT_FOUND: "OTP_NOT_FOUND",
  OTP_EXPIRED: "OTP_EXPIRED",
  OTP_ATTEMPTS_EXCEEDED: "OTP_ATTEMPTS_EXCEEDED",
  OTP_INVALID: "OTP_INVALID",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_RESET_TOKEN: "INVALID_RESET_TOKEN",
  MAILER_NOT_CONFIGURED: "MAILER_NOT_CONFIGURED",
  MAIL_SEND_TIMEOUT: "MAIL_SEND_TIMEOUT",
  OTP_ENCRYPTION_KEY_MISSING: "OTP_ENCRYPTION_KEY_MISSING",
  UNSUPPORTED_MEDIA_TYPE: "UNSUPPORTED_MEDIA_TYPE",
  PASSWORD_RESET_FAILED: "PASSWORD_RESET_FAILED",
  PASSWORD_RESET_OTP_REQUEST_FAILED: "PASSWORD_RESET_OTP_REQUEST_FAILED",
  PASSWORD_RESET_OTP_VERIFY_FAILED: "PASSWORD_RESET_OTP_VERIFY_FAILED",
  PASSWORD_RESET_SUBMIT_FAILED: "PASSWORD_RESET_SUBMIT_FAILED",
} as const;

export type PasswordResetErrorCode =
  (typeof PasswordResetErrorCode)[keyof typeof PasswordResetErrorCode];

export const PASSWORD_RESET_BUSINESS_ERROR_CODES = [
  PasswordResetErrorCode.VALIDATION_ERROR,
  PasswordResetErrorCode.METHOD_NOT_SUPPORTED,
  PasswordResetErrorCode.EMAIL_NOT_REGISTERED,
  PasswordResetErrorCode.OTP_RESEND_TOO_FAST,
  PasswordResetErrorCode.OTP_NOT_FOUND,
  PasswordResetErrorCode.OTP_EXPIRED,
  PasswordResetErrorCode.OTP_ATTEMPTS_EXCEEDED,
  PasswordResetErrorCode.OTP_INVALID,
  PasswordResetErrorCode.USER_NOT_FOUND,
  PasswordResetErrorCode.INVALID_RESET_TOKEN,
] as const;

export const PASSWORD_RESET_SYSTEM_ERROR_CODES = [
  PasswordResetErrorCode.MAILER_NOT_CONFIGURED,
  PasswordResetErrorCode.MAIL_SEND_TIMEOUT,
  PasswordResetErrorCode.OTP_ENCRYPTION_KEY_MISSING,
  PasswordResetErrorCode.UNSUPPORTED_MEDIA_TYPE,
  PasswordResetErrorCode.PASSWORD_RESET_FAILED,
  PasswordResetErrorCode.PASSWORD_RESET_OTP_REQUEST_FAILED,
  PasswordResetErrorCode.PASSWORD_RESET_OTP_VERIFY_FAILED,
  PasswordResetErrorCode.PASSWORD_RESET_SUBMIT_FAILED,
] as const;

const PASSWORD_RESET_SYSTEM_ERROR_CODE_SET = new Set<string>(PASSWORD_RESET_SYSTEM_ERROR_CODES);

export const isPasswordResetSystemErrorCode = (code: unknown): code is PasswordResetErrorCode => {
  return typeof code === "string" && PASSWORD_RESET_SYSTEM_ERROR_CODE_SET.has(code);
};

export const AuthUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().nullable(),
});
export type AuthUser = z.infer<typeof AuthUserSchema>;

export const AuthSessionSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.number().nullable().optional(),
});
export type AuthSession = z.infer<typeof AuthSessionSchema>;

export const SellerAccessSchema = z.object({
  hasSellerRole: z.boolean(),
  kycStatus: z.string().nullable(),
  canSell: z.boolean(),
});
export type SellerAccess = z.infer<typeof SellerAccessSchema>;

export const AuthSignupRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2).max(80).optional(),
  phone: z.string().min(8).max(20).optional(),
});
export type AuthSignupRequest = z.infer<typeof AuthSignupRequestSchema>;

export const AuthSignupResponseSchema = z.object({
  user: AuthUserSchema.nullable(),
  roles: z.array(z.string()),
  session: AuthSessionSchema.nullable(),
  emailConfirmationRequired: z.boolean(),
});
export type AuthSignupResponse = z.infer<typeof AuthSignupResponseSchema>;

export const AuthLoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type AuthLoginRequest = z.infer<typeof AuthLoginRequestSchema>;

export const AuthLoginResponseSchema = z.object({
  user: AuthUserSchema,
  roles: z.array(z.string()),
  session: AuthSessionSchema,
});
export type AuthLoginResponse = z.infer<typeof AuthLoginResponseSchema>;

export const AuthMeResponseSchema = z.object({
  user: AuthUserSchema,
  profile: z
    .object({
      id: z.string().uuid(),
      email: z.string().email().nullable(),
      full_name: z.string().nullable(),
      phone: z.string().nullable(),
      avatar_url: z.string().nullable(),
      status: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    })
    .nullable(),
  roles: z.array(z.string()),
  sellerAccess: SellerAccessSchema,
});
export type AuthMeResponse = z.infer<typeof AuthMeResponseSchema>;

export const PasswordResetOtpRequestSchema = z.object({
  identifier: z.string().min(3).max(120),
  method: z.literal("email").optional(),
});
export type PasswordResetOtpRequest = z.infer<typeof PasswordResetOtpRequestSchema>;

export const PasswordResetOtpRequestResponseSchema = z.object({
  sent: z.boolean(),
  method: z.literal("email"),
  expiresInSec: z.number().int().positive(),
  resendCooldownSec: z.number().int().positive(),
  debugOtp: z.string().optional(),
});
export type PasswordResetOtpRequestResponse = z.infer<typeof PasswordResetOtpRequestResponseSchema>;

export const PasswordResetOtpVerifySchema = z.object({
  identifier: z.string().min(3).max(120),
  otp: z.string().regex(/^\d{6}$/),
});
export type PasswordResetOtpVerify = z.infer<typeof PasswordResetOtpVerifySchema>;

export const PasswordResetOtpVerifyResponseSchema = z.object({
  verified: z.boolean(),
  resetToken: z.string(),
  expiresInSec: z.number().int().positive(),
});
export type PasswordResetOtpVerifyResponse = z.infer<typeof PasswordResetOtpVerifyResponseSchema>;

export const PasswordResetSubmitSchema = z.object({
  identifier: z.string().min(3).max(120),
  resetToken: z.string().min(10),
  newPassword: z.string().min(8),
});
export type PasswordResetSubmit = z.infer<typeof PasswordResetSubmitSchema>;

export const PasswordResetSubmitResponseSchema = z.object({
  passwordUpdated: z.boolean(),
});
export type PasswordResetSubmitResponse = z.infer<typeof PasswordResetSubmitResponseSchema>;

export const RegisterOtpRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2).max(80),
  phone: z.string().min(8).max(20),
  termsAccepted: z.literal(true),
});
export type RegisterOtpRequest = z.infer<typeof RegisterOtpRequestSchema>;

export const RegisterOtpRequestResponseSchema = z.object({
  sent: z.boolean(),
  expiresInSec: z.number().int().positive(),
  resendCooldownSec: z.number().int().positive(),
  debugOtp: z.string().optional(),
});
export type RegisterOtpRequestResponse = z.infer<typeof RegisterOtpRequestResponseSchema>;

export const RegisterOtpVerifySchema = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^\d{6}$/),
});
export type RegisterOtpVerify = z.infer<typeof RegisterOtpVerifySchema>;

export const RegisterOtpVerifyResponseSchema = z.object({
  user: AuthUserSchema,
  roles: z.array(z.string()),
  session: AuthSessionSchema.nullable(),
});
export type RegisterOtpVerifyResponse = z.infer<typeof RegisterOtpVerifyResponseSchema>;
