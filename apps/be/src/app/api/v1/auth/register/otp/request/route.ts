import { jsonError, jsonOk, readJson } from "@/lib/api";
import { hasMailerEnv, sendRegisterOtpEmail } from "@/lib/mailer";
import {
  createRegisterOtpEntry,
  getRegisterOtpCooldownRemainingSec,
  getRegisterOtpMeta,
  normalizeEmail,
  normalizePhone,
} from "@/lib/register-otp-store";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { RegisterOtpRequestSchema } from "@acme/shared";

export const runtime = "nodejs";

const indonesianPhoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{7,10}$/;

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = RegisterOtpRequestSchema.safeParse(body);
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

    const normalizedEmail = normalizeEmail(parsed.data.email);
    const normalizedPhone = normalizePhone(parsed.data.phone);
    if (!indonesianPhoneRegex.test(normalizedPhone)) {
      return jsonError(
        {
          code: "VALIDATION_ERROR",
          message: "Nomor WhatsApp harus nomor Indonesia (08xx / 62xx / +62xx).",
        },
        422,
      );
    }

    const admin = getSupabaseAdminClient();
    const { data: existingProfileByEmail } = await admin
      .from("profiles")
      .select("id")
      .ilike("email", normalizedEmail)
      .maybeSingle();

    if (existingProfileByEmail) {
      return jsonError(
        {
          code: "EMAIL_ALREADY_REGISTERED",
          message: "Email sudah terdaftar.",
        },
        409,
      );
    }

    const { data: existingProfileByPhone } = await admin
      .from("profiles")
      .select("id")
      .eq("phone", normalizedPhone)
      .maybeSingle();

    if (existingProfileByPhone) {
      return jsonError(
        {
          code: "PHONE_ALREADY_REGISTERED",
          message: "Nomor WhatsApp sudah terdaftar.",
        },
        409,
      );
    }

    const cooldownRemainingSec = await getRegisterOtpCooldownRemainingSec(normalizedEmail);
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

    const entry = await createRegisterOtpEntry({
      email: normalizedEmail,
      password: parsed.data.password,
      fullName: parsed.data.fullName.trim(),
      phone: normalizedPhone,
    });

    if (!hasMailerEnv()) {
      return jsonError(
        {
          code: "MAILER_NOT_CONFIGURED",
          message: "SMTP belum dikonfigurasi di server.",
        },
        503,
      );
    }

    await sendRegisterOtpEmail({
      to: normalizedEmail,
      otp: entry.otp,
      expiresInMin: Math.floor(getRegisterOtpMeta().otpExpiresSec / 60),
    });

    return jsonOk({
      sent: true,
      expiresInSec: getRegisterOtpMeta().otpExpiresSec,
      resendCooldownSec: getRegisterOtpMeta().resendCooldownSec,
      ...(process.env.NODE_ENV !== "production" ? { debugOtp: entry.otp } : {}),
    });
  } catch (e: any) {
    if (e?.code === "MAIL_SEND_TIMEOUT") {
      return jsonError(
        {
          code: "MAIL_SEND_TIMEOUT",
          message: "Pengiriman OTP timeout. Coba lagi.",
        },
        504,
      );
    }
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
