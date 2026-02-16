import { RegisterErrorCode } from "@acme/shared";
import { getSupabaseAdminClient } from "@/lib/supabase";

const makeLookupError = (code: string, message: string) => {
  const error = new Error(message) as Error & { code?: string };
  error.code = code;
  return error;
};

export const findProfileIdByEmail = async (email: string): Promise<string | null> => {
  const admin = getSupabaseAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("id")
    .ilike("email", email)
    .maybeSingle();

  if (error) {
    throw makeLookupError(
      RegisterErrorCode.REGISTER_EMAIL_CHECK_FAILED,
      "Gagal memeriksa ketersediaan email.",
    );
  }

  return data?.id ?? null;
};

export const findProfileIdByPhone = async (phone: string): Promise<string | null> => {
  const admin = getSupabaseAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("id")
    .eq("phone", phone)
    .maybeSingle();

  if (error) {
    throw makeLookupError(
      RegisterErrorCode.REGISTER_PHONE_CHECK_FAILED,
      "Gagal memeriksa ketersediaan nomor WhatsApp.",
    );
  }

  return data?.id ?? null;
};
