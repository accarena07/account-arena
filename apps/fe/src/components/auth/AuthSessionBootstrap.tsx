"use client";

import { useEffect } from "react";
import { AuthMeResponseSchema } from "@acme/shared";
import { apiFetch } from "@/lib/apiClient";
import { clearAuthSession, getStoredAuth, setAuthSession } from "@/lib/auth-session";

export default function AuthSessionBootstrap() {
  useEffect(() => {
    let active = true;

    async function bootstrap() {
      const stored = getStoredAuth();
      if (!stored?.session?.accessToken) return;

      try {
        const me = await apiFetch(
          "/api/v1/auth/me",
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${stored.session.accessToken}`,
            },
          },
          AuthMeResponseSchema,
        );

        if (!active) return;
        setAuthSession(stored.session, me.user, me.roles);
      } catch {
        if (!active) return;
        clearAuthSession();
      }
    }

    void bootstrap();
    return () => {
      active = false;
    };
  }, []);

  return null;
}
