// Shared schemas & types for FE/BE

import { z } from "zod";

export const HealthSchema = z.object({
  ok: z.boolean(),
  service: z.string(),
  time: z.string()
});
export type Health = z.infer<typeof HealthSchema>;

export const EchoRequestSchema = z.object({
  message: z.string().min(1).max(500)
});
export type EchoRequest = z.infer<typeof EchoRequestSchema>;

export const EchoResponseSchema = z.object({
  echo: z.string()
});
export type EchoResponse = z.infer<typeof EchoResponseSchema>;

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
