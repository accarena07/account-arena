"use client";

const STORAGE_KEY = "buyer_password_reset_context";

export type PasswordResetMethod = "email";

export type PasswordResetContext = {
  identifier: string;
  method: PasswordResetMethod;
  debugOtp?: string;
  resendCooldownSec?: number;
  resetToken?: string;
};

const hasWindow = () => {
  return typeof window !== "undefined";
};

export const getPasswordResetContext = (): PasswordResetContext | null => {
  if (!hasWindow()) return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PasswordResetContext;
  } catch {
    window.sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const setPasswordResetContext = (next: PasswordResetContext) => {
  if (!hasWindow()) return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const updatePasswordResetContext = (
  patch: Partial<PasswordResetContext>,
): void => {
  const current = getPasswordResetContext();
  if (!current) return;
  setPasswordResetContext({ ...current, ...patch });
};

export const clearPasswordResetContext = () => {
  if (!hasWindow()) return;
  window.sessionStorage.removeItem(STORAGE_KEY);
};
