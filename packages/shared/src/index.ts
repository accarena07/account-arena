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
