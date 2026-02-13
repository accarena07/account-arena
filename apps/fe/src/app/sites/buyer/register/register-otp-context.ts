"use client";

import type { RegisterOtpContext } from "./register.type";

const STORAGE_KEY = "buyer_register_otp_context";

const hasWindow = () => {
  return typeof window !== "undefined";
};

export const getRegisterOtpContext = (): RegisterOtpContext | null => {
  if (!hasWindow()) return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RegisterOtpContext;
  } catch {
    window.sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const setRegisterOtpContext = (next: RegisterOtpContext) => {
  if (!hasWindow()) return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const updateRegisterOtpContext = (
  patch: Partial<RegisterOtpContext>,
): void => {
  const current = getRegisterOtpContext();
  if (!current) return;
  setRegisterOtpContext({ ...current, ...patch });
};

export const clearRegisterOtpContext = () => {
  if (!hasWindow()) return;
  window.sessionStorage.removeItem(STORAGE_KEY);
};
