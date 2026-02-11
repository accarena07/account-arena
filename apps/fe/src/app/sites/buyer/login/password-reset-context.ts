"use client";

const STORAGE_KEY = "buyer_password_reset_context";

export type PasswordResetMethod = "email" | "whatsapp";

export type PasswordResetContext = {
  identifier: string;
  method: PasswordResetMethod;
  debugOtp?: string;
  resendCooldownSec?: number;
  resetToken?: string;
};

function hasWindow() {
  return typeof window !== "undefined";
}

export function getPasswordResetContext(): PasswordResetContext | null {
  if (!hasWindow()) return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PasswordResetContext;
  } catch {
    window.sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function setPasswordResetContext(next: PasswordResetContext) {
  if (!hasWindow()) return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function updatePasswordResetContext(
  patch: Partial<PasswordResetContext>,
) {
  const current = getPasswordResetContext();
  if (!current) return;
  setPasswordResetContext({ ...current, ...patch });
}

export function clearPasswordResetContext() {
  if (!hasWindow()) return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}
