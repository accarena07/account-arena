"use client";

import type { AuthSession, AuthUser } from "@acme/shared";

const STORAGE_KEY = "account_arena_auth";

type StoredAuth = {
  user: AuthUser;
  roles: string[];
  expiresAt: number | null;
};

function hasWindow() {
  return typeof window !== "undefined";
}

export function setAuthSession(session: AuthSession, user: AuthUser, roles: string[]) {
  if (!hasWindow()) return;
  const payload: StoredAuth = {
    user,
    roles,
    expiresAt: session.expiresAt ?? null,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function setAuthIdentity(user: AuthUser, roles: string[]) {
  if (!hasWindow()) return;
  const existing = getStoredAuth();
  const payload: StoredAuth = {
    user,
    roles,
    expiresAt: existing?.expiresAt ?? null,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function getStoredAuth(): StoredAuth | null {
  if (!hasWindow()) return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredAuth;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function getAccessToken(): string | null {
  return null;
}

export function clearAuthSession() {
  if (!hasWindow()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}
