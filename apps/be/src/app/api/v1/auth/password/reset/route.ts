import { jsonError, jsonOk, readJson } from "@/lib/api";
import {
  consumeResetToken,
  normalizeEmail,
  normalizePhone,
} from "@/lib/password-reset-otp-store";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { PasswordResetSubmitSchema } from "@acme/shared";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}$/;

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = PasswordResetSubmitSchema.safeParse(body);
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

    const { identifier, resetToken, newPassword } = parsed.data;
    if (!strongPasswordRegex.test(newPassword)) {
      return jsonError(
        {
          code: "VALIDATION_ERROR",
          message:
            "Kata sandi minimal 8 karakter dan wajib ada huruf besar, huruf kecil, angka, serta karakter spesial.",
        },
        422,
      );
    }

    const normalizedIdentifier = emailRegex.test(identifier)
      ? normalizeEmail(identifier)
      : normalizePhone(identifier);

    const consumed = await consumeResetToken({
      identifier: normalizedIdentifier,
      resetToken,
    });

    if (!consumed.ok) {
      return jsonError(
        {
          code: consumed.code,
          message: "Reset token tidak valid atau sudah kedaluwarsa.",
        },
        401,
      );
    }

    const admin = getSupabaseAdminClient();
    const { error } = await admin.auth.admin.updateUserById(consumed.userId, {
      password: newPassword,
    });

    if (error) {
      return jsonError(
        { code: "PASSWORD_RESET_FAILED", message: error.message },
        400,
      );
    }

    return jsonOk({
      passwordUpdated: true,
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
