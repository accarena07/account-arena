import { jsonError, jsonOk, parseJsonWithSchema } from "@/lib/api";
import {
  consumeResetToken,
  normalizeEmail,
  normalizePhone,
} from "@/lib/password-reset-otp-store";
import { getSupabaseAdminClient } from "@/lib/supabase";
import {
  EMAIL_REGEX,
  PasswordResetErrorCode,
  PasswordResetSubmitSchema,
  isStrongPassword,
} from "@acme/shared";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const parsed = await parseJsonWithSchema(req, PasswordResetSubmitSchema, {
      code: PasswordResetErrorCode.VALIDATION_ERROR,
      message: "Input tidak valid",
      status: 422,
    });
    if (!parsed.ok) return parsed.response;

    const { identifier, resetToken, newPassword } = parsed.data;
    if (!isStrongPassword(newPassword)) {
      return jsonError(
        {
          code: PasswordResetErrorCode.VALIDATION_ERROR,
          message:
            "Kata sandi minimal 8 karakter dan wajib ada huruf besar, huruf kecil, angka, serta karakter spesial.",
        },
        422,
      );
    }

    const normalizedIdentifier = EMAIL_REGEX.test(identifier)
      ? normalizeEmail(identifier)
      : normalizePhone(identifier);

    const consumed = await consumeResetToken({
      identifier: normalizedIdentifier,
      resetToken,
    });

    if (!consumed.ok) {
      return jsonError(
        {
          code: PasswordResetErrorCode.INVALID_RESET_TOKEN,
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
        {
          code: PasswordResetErrorCode.PASSWORD_RESET_FAILED,
          message: "Gagal memperbarui kata sandi. Silakan coba lagi.",
        },
        500,
      );
    }

    return jsonOk({
      passwordUpdated: true,
    });
  } catch (e: any) {
    if (e?.code === PasswordResetErrorCode.UNSUPPORTED_MEDIA_TYPE) {
      return jsonError(
        {
          code: PasswordResetErrorCode.UNSUPPORTED_MEDIA_TYPE,
          message: "Content-Type harus application/json",
        },
        415,
      );
    }
    return jsonError(
      {
        code: PasswordResetErrorCode.PASSWORD_RESET_SUBMIT_FAILED,
        message: "Reset password gagal. Silakan coba lagi.",
      },
      500,
    );
  }
}
