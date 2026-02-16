"use client";

import { useEffect } from "react";
import { AuthMeResponseSchema } from "@acme/shared";
import { apiFetch } from "@/lib/apiClient";
import { clearAuthSession, setAuthIdentity } from "@/lib/auth-session";

export default function AuthSessionBootstrap() {
  useEffect(() => {
    let active = true;

    async function bootstrap() {
      try {
        const me = await apiFetch(
          "/api/v1/auth/me",
          { method: "GET" },
          AuthMeResponseSchema,
        );

        if (!active) return;
        setAuthIdentity(me.user, me.roles);
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
