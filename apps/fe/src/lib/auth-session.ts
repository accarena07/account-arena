"use client";

import type { AuthSession, AuthUser } from "@acme/shared";

const STORAGE_KEY = "account_arena_auth";

type StoredAuth = {
  session: AuthSession;
  user: AuthUser;
  roles: string[];
};

function hasWindow() {
  return typeof window !== "undefined";
}

export function setAuthSession(session: AuthSession, user: AuthUser, roles: string[]) {
  if (!hasWindow()) return;
  const payload: StoredAuth = { session, user, roles };
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
  return getStoredAuth()?.session.accessToken ?? null;
}

export function clearAuthSession() {
  if (!hasWindow()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}
