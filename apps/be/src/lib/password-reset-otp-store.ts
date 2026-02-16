import { randomUUID } from "crypto";
import { getSupabaseAdminClient } from "@/lib/supabase";

type OtpMethod = "email" | "whatsapp";

type PasswordResetEntry = {
  identifier: string;
  method: OtpMethod;
  userId: string | null;
  otp: string;
  otpExpiresAt: string;
  attempts: number;
  verified: boolean;
  resetToken?: string;
  resetTokenExpiresAt?: string;
};

const OTP_EXPIRES_SEC = 10 * 60;
const RESET_TOKEN_EXPIRES_SEC = 15 * 60;
const MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN_SEC = 60;

function nowMs() {
  return Date.now();
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone: string) {
  const compact = phone.trim().replace(/[\s-]/g, "");
  if (compact.startsWith("+62")) return compact;
  if (compact.startsWith("62")) return `+${compact}`;
  if (compact.startsWith("0")) return `+62${compact.slice(1)}`;
  return compact;
}

export async function createOtpEntry(params: {
  identifier: string;
  method: OtpMethod;
  userId: string | null;
}): Promise<PasswordResetEntry> {
  const admin = getSupabaseAdminClient();
  const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
  const otpExpiresAt = new Date(nowMs() + OTP_EXPIRES_SEC * 1000).toISOString();
  const entry: PasswordResetEntry = {
    identifier: params.identifier,
    method: params.method,
    userId: params.userId,
    otp,
    otpExpiresAt,
    attempts: 0,
    verified: false,
  };

  const { error } = await admin.from("password_reset_otp_sessions").upsert(
    {
      identifier: params.identifier,
      method: params.method,
      user_id: params.userId,
      otp_code: otp,
      otp_expires_at: otpExpiresAt,
      attempts: 0,
      last_sent_at: new Date().toISOString(),
      verified: false,
      reset_token: null,
      reset_token_expires_at: null,
    },
    { onConflict: "identifier" },
  );

  if (error) {
    throw new Error(error.message);
  }

  return entry;
}

export async function verifyOtp(params: { identifier: string; otp: string }) {
  const admin = getSupabaseAdminClient();
  const { data: entry, error: selectError } = await admin
    .from("password_reset_otp_sessions")
    .select("identifier,method,user_id,otp_code,otp_expires_at,attempts,verified")
    .eq("identifier", params.identifier)
    .maybeSingle();

  if (selectError) {
    throw new Error(selectError.message);
  }
  if (!entry) return { ok: false as const, code: "OTP_NOT_FOUND" as const };
  if (new Date(entry.otp_expires_at).getTime() < nowMs()) return { ok: false as const, code: "OTP_EXPIRED" as const };
  if (entry.attempts >= MAX_ATTEMPTS) {
    return { ok: false as const, code: "OTP_ATTEMPTS_EXCEEDED" as const };
  }
  if (entry.otp_code !== params.otp) {
    const nextAttempts = entry.attempts + 1;
    if (nextAttempts >= MAX_ATTEMPTS) {
      return { ok: false as const, code: "OTP_ATTEMPTS_EXCEEDED" as const };
    }

    const { error: updateError } = await admin
      .from("password_reset_otp_sessions")
      .update({ attempts: nextAttempts, updated_at: new Date().toISOString() })
      .eq("identifier", params.identifier);
    if (updateError) {
      throw new Error(updateError.message);
    }
    return { ok: false as const, code: "OTP_INVALID" as const };
  }
  if (!entry.user_id) return { ok: false as const, code: "USER_NOT_FOUND" as const };

  const resetToken = randomUUID();
  const resetTokenExpiresAt = new Date(nowMs() + RESET_TOKEN_EXPIRES_SEC * 1000).toISOString();
  const { error: markVerifiedError } = await admin
    .from("password_reset_otp_sessions")
    .update({
      verified: true,
      reset_token: resetToken,
      reset_token_expires_at: resetTokenExpiresAt,
      updated_at: new Date().toISOString(),
    })
    .eq("identifier", params.identifier);

  if (markVerifiedError) {
    throw new Error(markVerifiedError.message);
  }

  return {
    ok: true as const,
    resetToken,
    expiresInSec: RESET_TOKEN_EXPIRES_SEC,
  };
}

export async function getPasswordResetOtpCooldownRemainingSec(identifier: string) {
  const admin = getSupabaseAdminClient();
  const { data, error } = await admin
    .from("password_reset_otp_sessions")
    .select("last_sent_at")
    .eq("identifier", identifier)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  if (!data?.last_sent_at) return 0;

  const diffSec = Math.floor((Date.now() - new Date(data.last_sent_at).getTime()) / 1000);
  return Math.max(0, RESEND_COOLDOWN_SEC - diffSec);
}

export async function consumeResetToken(params: {
  identifier: string;
  resetToken: string;
}) {
  const admin = getSupabaseAdminClient();
  const { data: entry, error: selectError } = await admin
    .from("password_reset_otp_sessions")
    .select("identifier,user_id,verified,reset_token,reset_token_expires_at")
    .eq("identifier", params.identifier)
    .maybeSingle();

  if (selectError) {
    throw new Error(selectError.message);
  }
  if (!entry) return { ok: false as const, code: "RESET_TOKEN_NOT_FOUND" as const };
  if (!entry.verified || !entry.reset_token) return { ok: false as const, code: "OTP_NOT_VERIFIED" as const };
  if (entry.reset_token !== params.resetToken) return { ok: false as const, code: "RESET_TOKEN_INVALID" as const };
  if (!entry.reset_token_expires_at || new Date(entry.reset_token_expires_at).getTime() < nowMs()) {
    return { ok: false as const, code: "RESET_TOKEN_EXPIRED" as const };
  }
  if (!entry.user_id) return { ok: false as const, code: "USER_NOT_FOUND" as const };

  const { error: deleteError } = await admin
    .from("password_reset_otp_sessions")
    .delete()
    .eq("identifier", params.identifier);
  if (deleteError) {
    throw new Error(deleteError.message);
  }

  return { ok: true as const, userId: entry.user_id };
}

export function getOtpMeta() {
  return {
    otpExpiresSec: OTP_EXPIRES_SEC,
    resendCooldownSec: RESEND_COOLDOWN_SEC,
  };
}
