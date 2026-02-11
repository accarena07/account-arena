export const EMAIL_MIN_LENGTH = 6;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const indonesianPhoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{7,10}$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}$/;

export type RegisterFormValues = {
  email: string;
  whatsApp: string;
  password: string;
};

export type RegisterFormErrors = {
  email?: string;
  whatsapp?: string;
  password?: string;
};

export function clearRegisterFieldError(
  errors: RegisterFormErrors,
  field: keyof RegisterFormErrors,
): RegisterFormErrors {
  return { ...errors, [field]: undefined };
}

export function validateRegisterForm(values: RegisterFormValues): RegisterFormErrors {
  const nextErrors: RegisterFormErrors = {};
  const normalizedEmail = values.email.trim();
  const normalizedPhone = values.whatsApp.trim().replace(/[\s-]/g, "");

  if (normalizedEmail.length < EMAIL_MIN_LENGTH) {
    nextErrors.email = `Email minimal ${EMAIL_MIN_LENGTH} karakter.`;
  } else if (!emailRegex.test(normalizedEmail)) {
    nextErrors.email = "Format email tidak valid.";
  }

  if (!indonesianPhoneRegex.test(normalizedPhone)) {
    nextErrors.whatsapp = "Nomor WhatsApp harus nomor Indonesia (08xx / 62xx / +62xx).";
  }

  if (!strongPasswordRegex.test(values.password)) {
    nextErrors.password =
      "Kata sandi minimal 8 karakter dan wajib ada huruf besar, huruf kecil, angka, serta karakter spesial.";
  }

  return nextErrors;
}

export function shouldProceedToOtp(errors: RegisterFormErrors): boolean {
  return Object.keys(errors).length === 0;
}

