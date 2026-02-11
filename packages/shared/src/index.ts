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
