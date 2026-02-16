import { jsonError, jsonOk, readJson } from "@/lib/api";
import { createAuthCookieHeaders } from "@/lib/auth-cookie";
import { getSupabaseAnonClient, getSupabaseAdminClient } from "@/lib/supabase";
import {
  deleteRegisterOtpSession,
  normalizeEmail,
  verifyRegisterOtp,
} from "@/lib/register-otp-store";
import { RegisterOtpVerifySchema } from "@acme/shared";

export const runtime = "nodejs";
const REGISTER_TERMS_VERSION = process.env.REGISTER_TERMS_VERSION ?? "v1";

const mapCreateUserError = (rawMessage?: string) => {
  const normalized = (rawMessage ?? "").toLowerCase();
  if (normalized.includes("already") && normalized.includes("registered")) {
    return {
      code: "EMAIL_ALREADY_REGISTERED",
      message: "Email sudah terdaftar.",
      status: 409,
    };
  }
  return {
    code: "REGISTER_CREATE_USER_FAILED",
    message: "Gagal membuat akun. Silakan coba lagi beberapa saat.",
    status: 500,
  };
};

const mapCreateUserErrorSafe = (error: unknown) => {
  const authError = (error ?? {}) as { status?: unknown; code?: unknown; message?: unknown };
  const status = typeof authError.status === "number" ? authError.status : null;
  const code = typeof authError.code === "string" ? authError.code.toLowerCase() : "";

  if (code === "email_exists" || code === "user_already_exists" || status === 422) {
    return {
      code: "EMAIL_ALREADY_REGISTERED",
      message: "Email sudah terdaftar.",
      status: 409,
    };
  }

  return mapCreateUserError(typeof authError.message === "string" ? authError.message : undefined);
};

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = RegisterOtpVerifySchema.safeParse(body);
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
    const otpVerified = await verifyRegisterOtp({
      email: normalizedEmail,
      otp: parsed.data.otp,
    });

    if (!otpVerified.ok) {
      const status =
        otpVerified.code === "OTP_NOT_FOUND"
          ? 404
          : otpVerified.code === "OTP_EXPIRED" || otpVerified.code === "OTP_ATTEMPTS_EXCEEDED"
            ? 410
            : 400;
      const message =
        otpVerified.code === "OTP_ATTEMPTS_EXCEEDED"
          ? "Batas percobaan OTP tercapai. Silakan minta OTP baru."
          : "Verifikasi OTP gagal.";
      return jsonError(
        {
          code: otpVerified.code,
          message,
        },
        status,
      );
    }

    const admin = getSupabaseAdminClient();
    const { data: existingProfileByEmail } = await admin
      .from("profiles")
      .select("id")
      .ilike("email", otpVerified.payload.email)
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

    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email: otpVerified.payload.email,
      password: otpVerified.payload.password,
      email_confirm: true,
      user_metadata: {
        full_name: otpVerified.payload.fullName,
        phone: otpVerified.payload.phone,
      },
    });

    if (createError || !created.user) {
      const mapped = mapCreateUserErrorSafe(createError);
      return jsonError(
        {
          code: mapped.code,
          message: mapped.message,
        },
        mapped.status,
      );
    }

    const { error: profileUpdateError } = await admin
      .from("profiles")
      .update({
        full_name: otpVerified.payload.fullName,
        phone: otpVerified.payload.phone,
        email: otpVerified.payload.email,
        terms_accepted_at: new Date().toISOString(),
        terms_version: REGISTER_TERMS_VERSION,
      })
      .eq("id", created.user.id);
    if (profileUpdateError) {
      const { error: deleteCreatedUserError } = await admin.auth.admin.deleteUser(created.user.id);
      if (profileUpdateError.code === "23505") {
        if (deleteCreatedUserError) {
          console.warn("[register-otp-verify] failed to rollback created user after phone conflict", {
            userId: created.user.id,
            email: otpVerified.payload.email,
            error: deleteCreatedUserError,
          });
        }
        return jsonError(
          {
            code: "PHONE_ALREADY_REGISTERED",
            message: "Nomor WhatsApp sudah terdaftar.",
          },
          409,
        );
      }

      if (deleteCreatedUserError) {
        console.warn("[register-otp-verify] failed to rollback created user after profile sync failure", {
          userId: created.user.id,
          email: otpVerified.payload.email,
          error: deleteCreatedUserError,
        });
      }
      return jsonError(
        {
          code: "REGISTER_PROFILE_UPDATE_FAILED",
          message: "Registrasi gagal saat sinkronisasi profil. Silakan coba lagi.",
        },
        500,
      );
    }

    const anon = getSupabaseAnonClient();
    const { data: signInData, error: signInError } = await anon.auth.signInWithPassword({
      email: otpVerified.payload.email,
      password: otpVerified.payload.password,
    });
    if (signInError || !signInData.session) {
      console.warn("[register-otp-verify] auto-login failed after successful registration", {
        email: otpVerified.payload.email,
        error: signInError,
      });
    }

    await deleteRegisterOtpSession(normalizedEmail).catch((error: unknown) => {
      console.warn("[register-otp-verify] failed to delete OTP session after success", {
        email: normalizedEmail,
        error,
      });
    });

    const payload = {
      user: {
        id: created.user.id,
        email: created.user.email ?? otpVerified.payload.email,
      },
      roles: ["buyer"],
      session: signInData?.session
        ? {
            accessToken: signInData.session.access_token,
            refreshToken: signInData.session.refresh_token,
            expiresAt: signInData.session.expires_at ?? null,
          }
        : null,
    };

    if (!signInData?.session) {
      return jsonOk(payload);
    }

    const accessTokenMaxAgeSec =
      typeof signInData.session.expires_in === "number" && Number.isFinite(signInData.session.expires_in)
        ? Math.max(60, Math.floor(signInData.session.expires_in))
        : 60 * 60;

    return jsonOk(payload, {
      headers: createAuthCookieHeaders({
        accessToken: signInData.session.access_token,
        refreshToken: signInData.session.refresh_token,
        accessTokenMaxAgeSec,
      }),
    });
  } catch (e: any) {
    if (e?.code === "OTP_ENCRYPTION_KEY_MISSING") {
      return jsonError(
        {
          code: "OTP_ENCRYPTION_KEY_MISSING",
          message: "Konfigurasi keamanan OTP belum lengkap di server.",
        },
        503,
      );
    }
    if (e?.code === "UNSUPPORTED_MEDIA_TYPE") {
      return jsonError(
        {
          code: "UNSUPPORTED_MEDIA_TYPE",
          message: "Content-Type harus application/json",
        },
        415,
      );
    }
    return jsonError(
      {
        code: "REGISTER_OTP_VERIFY_FAILED",
        message: "Verifikasi registrasi gagal. Silakan coba lagi.",
      },
      500,
    );
  }
}
