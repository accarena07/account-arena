import { jsonError, jsonOk, readJson } from "@/lib/api";
import {
  consumeResetToken,
  normalizeEmail,
  normalizePhone,
} from "@/lib/password-reset-otp-store";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { PasswordResetErrorCode, PasswordResetSubmitSchema } from "@acme/shared";

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
          code: PasswordResetErrorCode.VALIDATION_ERROR,
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
          code: PasswordResetErrorCode.VALIDATION_ERROR,
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
