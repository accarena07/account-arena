"use client";

const STORAGE_KEY = "buyer_register_otp_context";

type RegisterOtpContext = {
  email: string;
  debugOtp?: string;
  resendCooldownSec?: number;
};

function hasWindow() {
  return typeof window !== "undefined";
}

export function getRegisterOtpContext(): RegisterOtpContext | null {
  if (!hasWindow()) return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RegisterOtpContext;
  } catch {
    window.sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function setRegisterOtpContext(next: RegisterOtpContext) {
  if (!hasWindow()) return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function updateRegisterOtpContext(
  patch: Partial<RegisterOtpContext>,
) {
  const current = getRegisterOtpContext();
  if (!current) return;
  setRegisterOtpContext({ ...current, ...patch });
}

export function clearRegisterOtpContext() {
  if (!hasWindow()) return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}
