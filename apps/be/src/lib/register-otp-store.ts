import { getSupabaseAdminClient } from "@/lib/supabase";
import { decryptString, encryptString } from "@/lib/secure-string";
import { RegisterErrorCode } from "@acme/shared";
import { randomInt } from "crypto";

type RegisterOtpEntry = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  otp: string;
  otpExpiresAt: string;
  attempts: number;
};

type RegisterOtpResendRollbackState = {
  otpCode: string;
  otpExpiresAt: string;
  attempts: number;
  lastSentAt: string;
};

type RegisterOtpResendEntry = {
  email: string;
  otp: string;
  otpExpiresAt: string;
  attempts: number;
  rollbackState: RegisterOtpResendRollbackState;
};

const OTP_EXPIRES_SEC = 10 * 60;
const MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN_SEC = 60;

function nowMs() {
  return Date.now();
}

function generateOtpCode() {
  return String(randomInt(100000, 1000000));
}

export async function deleteRegisterOtpSession(email: string) {
  const admin = getSupabaseAdminClient();
  const { error } = await admin
    .from("register_otp_sessions")
    .delete()
    .eq("email", email);

  if (error) {
    throw new Error(error.message);
  }
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
  const otp = generateOtpCode();
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
    .select("email,otp_code,otp_expires_at,attempts,last_sent_at")
    .eq("email", email)
    .maybeSingle();

  if (selectError) {
    throw new Error(selectError.message);
  }
  if (!entry) return null;

  const otp = generateOtpCode();
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
    otp,
    otpExpiresAt,
    attempts: 0,
    rollbackState: {
      otpCode: entry.otp_code,
      otpExpiresAt: entry.otp_expires_at,
      attempts: entry.attempts,
      lastSentAt: entry.last_sent_at,
    } satisfies RegisterOtpResendRollbackState,
  } satisfies RegisterOtpResendEntry;
}

export async function rollbackResendRegisterOtp(
  email: string,
  state: RegisterOtpResendRollbackState,
) {
  const admin = getSupabaseAdminClient();
  const { error } = await admin
    .from("register_otp_sessions")
    .update({
      otp_code: state.otpCode,
      otp_expires_at: state.otpExpiresAt,
      attempts: state.attempts,
      last_sent_at: state.lastSentAt,
      updated_at: new Date().toISOString(),
    })
    .eq("email", email);

  if (error) {
    throw new Error(error.message);
  }
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
  if (!entry) return { ok: false as const, code: RegisterErrorCode.OTP_NOT_FOUND };
  if (new Date(entry.otp_expires_at).getTime() < nowMs()) {
    return { ok: false as const, code: RegisterErrorCode.OTP_EXPIRED };
  }
  if (entry.attempts >= MAX_ATTEMPTS) {
    return { ok: false as const, code: RegisterErrorCode.OTP_ATTEMPTS_EXCEEDED };
  }
  if (entry.otp_code !== params.otp) {
    const nextAttempts = entry.attempts + 1;
    const { error: updateError } = await admin
      .from("register_otp_sessions")
      .update({
        attempts: nextAttempts,
        updated_at: new Date().toISOString(),
      })
      .eq("email", params.email);
    if (updateError) {
      throw new Error(updateError.message);
    }
    if (nextAttempts >= MAX_ATTEMPTS) {
      return { ok: false as const, code: RegisterErrorCode.OTP_ATTEMPTS_EXCEEDED };
    }
    return { ok: false as const, code: RegisterErrorCode.OTP_INVALID };
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
