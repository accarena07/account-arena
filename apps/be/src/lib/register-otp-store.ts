import { getSupabaseAdminClient } from "@/lib/supabase";
import { decryptString, encryptString } from "@/lib/secure-string";

type RegisterOtpEntry = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  otp: string;
  otpExpiresAt: string;
  attempts: number;
};

const OTP_EXPIRES_SEC = 10 * 60;
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

export async function createRegisterOtpEntry(params: {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}) {
  const admin = getSupabaseAdminClient();
  const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
  const otpExpiresAt = new Date(nowMs() + OTP_EXPIRES_SEC * 1000).toISOString();

  const { error } = await admin.from("register_otp_sessions").upsert(
    {
      email: params.email,
      password: encryptString(params.password),
      full_name: params.fullName,
      phone: params.phone,
      otp_code: otp,
      otp_expires_at: otpExpiresAt,
      attempts: 0,
      last_sent_at: new Date().toISOString(),
    },
    { onConflict: "email" },
  );

  if (error) {
    throw new Error(error.message);
  }

  return {
    ...params,
    otp,
    otpExpiresAt,
    attempts: 0,
  } satisfies RegisterOtpEntry;
}

export async function resendRegisterOtp(email: string) {
  const admin = getSupabaseAdminClient();
  const { data: entry, error: selectError } = await admin
    .from("register_otp_sessions")
    .select("email,password,full_name,phone")
    .eq("email", email)
    .maybeSingle();

  if (selectError) {
    throw new Error(selectError.message);
  }
  if (!entry) return null;

  const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
  const otpExpiresAt = new Date(nowMs() + OTP_EXPIRES_SEC * 1000).toISOString();
  const { error: updateError } = await admin
    .from("register_otp_sessions")
    .update({
      otp_code: otp,
      otp_expires_at: otpExpiresAt,
      attempts: 0,
      last_sent_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("email", email);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return {
    email: entry.email,
    password: entry.password,
    fullName: entry.full_name,
    phone: entry.phone,
    otp,
    otpExpiresAt,
    attempts: 0,
  } satisfies RegisterOtpEntry;
}

export async function verifyRegisterOtp(params: { email: string; otp: string }) {
  const admin = getSupabaseAdminClient();
  const { data: entry, error: selectError } = await admin
    .from("register_otp_sessions")
    .select("email,password,full_name,phone,otp_code,otp_expires_at,attempts")
    .eq("email", params.email)
    .maybeSingle();

  if (selectError) {
    throw new Error(selectError.message);
  }
  if (!entry) return { ok: false as const, code: "OTP_NOT_FOUND" as const };
  if (new Date(entry.otp_expires_at).getTime() < nowMs()) {
    return { ok: false as const, code: "OTP_EXPIRED" as const };
  }
  if (entry.attempts >= MAX_ATTEMPTS) return { ok: false as const, code: "OTP_ATTEMPTS_EXCEEDED" as const };
  if (entry.otp_code !== params.otp) {
    const { error: updateError } = await admin
      .from("register_otp_sessions")
      .update({
        attempts: entry.attempts + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("email", params.email);
    if (updateError) {
      throw new Error(updateError.message);
    }
    return { ok: false as const, code: "OTP_INVALID" as const };
  }

  const { error: deleteError } = await admin
    .from("register_otp_sessions")
    .delete()
    .eq("email", params.email);
  if (deleteError) {
    throw new Error(deleteError.message);
  }

  return {
    ok: true as const,
    payload: {
      email: entry.email,
      password: decryptString(entry.password),
      fullName: entry.full_name,
      phone: entry.phone,
    },
  };
}

export async function getRegisterOtpCooldownRemainingSec(email: string) {
  const admin = getSupabaseAdminClient();
  const { data, error } = await admin
    .from("register_otp_sessions")
    .select("last_sent_at")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  if (!data?.last_sent_at) return 0;

  const diffSec = Math.floor((Date.now() - new Date(data.last_sent_at).getTime()) / 1000);
  return Math.max(0, RESEND_COOLDOWN_SEC - diffSec);
}

export function getRegisterOtpMeta() {
  return { otpExpiresSec: OTP_EXPIRES_SEC, resendCooldownSec: RESEND_COOLDOWN_SEC };
}
