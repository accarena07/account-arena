import { jsonError, jsonOk, readJson } from "@/lib/api";
import {
  createOtpEntry,
  getPasswordResetOtpCooldownRemainingSec,
  getOtpMeta,
  normalizeEmail,
  normalizePhone,
} from "@/lib/password-reset-otp-store";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { PasswordResetOtpRequestSchema } from "@acme/shared";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const indonesianPhoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{7,10}$/;

type OtpMethod = "email" | "whatsapp";

function resolveMethod(identifier: string, requested?: OtpMethod): OtpMethod {
  if (requested) return requested;
  return emailRegex.test(identifier) ? "email" : "whatsapp";
}

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = PasswordResetOtpRequestSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(
        {
          code: "VALIDATION_ERROR",
          message: "Input tidak valid",
          details: parsed.error.flatten(),
        },
        422,
      );
    }

    const { identifier, method: requestedMethod } = parsed.data;
    const method = resolveMethod(identifier, requestedMethod);
    const normalizedIdentifier =
      method === "email" ? normalizeEmail(identifier) : normalizePhone(identifier);

    if (method === "email" && !emailRegex.test(normalizedIdentifier)) {
      return jsonError({ code: "VALIDATION_ERROR", message: "Format email tidak valid." }, 422);
    }
    if (method === "whatsapp" && !indonesianPhoneRegex.test(normalizedIdentifier)) {
      return jsonError(
        {
          code: "VALIDATION_ERROR",
          message: "Nomor WhatsApp harus nomor Indonesia (08xx / 62xx / +62xx).",
        },
        422,
      );
    }

    const cooldownRemainingSec = await getPasswordResetOtpCooldownRemainingSec(normalizedIdentifier);
    if (cooldownRemainingSec > 0) {
      return jsonError(
        {
          code: "OTP_RESEND_TOO_FAST",
          message: "Tunggu sebelum meminta OTP baru.",
          details: { retryAfterSec: cooldownRemainingSec },
        },
        429,
      );
    }

    const admin = getSupabaseAdminClient();
    const query = admin
      .from("profiles")
      .select("id")
      .limit(1);
    const { data: profile } =
      method === "email"
        ? await query.ilike("email", normalizedIdentifier).maybeSingle()
        : await query.eq("phone", normalizedIdentifier).maybeSingle();

    const otpEntry = await createOtpEntry({
      identifier: normalizedIdentifier,
      method,
      userId: profile?.id ?? null,
    });

    // TODO: integrate real provider for email/whatsapp OTP delivery.
    return jsonOk({
      sent: true,
      method,
      expiresInSec: getOtpMeta().otpExpiresSec,
      resendCooldownSec: getOtpMeta().resendCooldownSec,
      ...(process.env.NODE_ENV !== "production" ? { debugOtp: otpEntry.otp } : {}),
    });
  } catch (e: any) {
    return jsonError(
      {
        code: e?.code ?? "BAD_REQUEST",
        message: e?.message ?? "Bad request",
        details: e?.details,
      },
      e?.code === "UNSUPPORTED_MEDIA_TYPE" ? 415 : 400,
    );
  }
}
