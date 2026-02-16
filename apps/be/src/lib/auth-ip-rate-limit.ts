import { getSupabaseAdminClient } from "@/lib/supabase";

type AuthIpRateLimitScope = "auth_login";

type AuthIpRateLimitConfig = {
  maxRequests: number;
  windowSec: number;
};

type AuthIpRateLimitResult = {
  allowed: boolean;
  retryAfterSec: number;
};

const DEFAULT_RATE_LIMITS: Record<AuthIpRateLimitScope, AuthIpRateLimitConfig> = {
  auth_login: {
    maxRequests: 10,
    windowSec: 10 * 60,
  },
};

const nowMs = () => Date.now();

const toIso = (epochMs: number): string => new Date(epochMs).toISOString();

const getLimitConfig = (scope: AuthIpRateLimitScope): AuthIpRateLimitConfig => {
  return DEFAULT_RATE_LIMITS[scope];
};

export const checkAuthIpRateLimit = async (
  scope: AuthIpRateLimitScope,
  ipAddress: string,
): Promise<AuthIpRateLimitResult> => {
  const admin = getSupabaseAdminClient();
  const config = getLimitConfig(scope);
  const now = nowMs();
  const windowMs = config.windowSec * 1000;

  const { data: existing, error: selectError } = await admin
    .from("auth_ip_rate_limits")
    .select("request_count,window_started_at")
    .eq("scope", scope)
    .eq("ip_address", ipAddress)
    .maybeSingle();

  if (selectError) {
    throw new Error(selectError.message);
  }

  if (!existing) {
    const { error: insertError } = await admin
      .from("auth_ip_rate_limits")
      .insert({
        scope,
        ip_address: ipAddress,
        request_count: 1,
        window_started_at: toIso(now),
      });

    if (insertError) {
      throw new Error(insertError.message);
    }

    return { allowed: true, retryAfterSec: 0 };
  }

  const windowStartedAtMs = new Date(existing.window_started_at).getTime();
  const elapsedMs = now - windowStartedAtMs;

  if (Number.isNaN(windowStartedAtMs) || elapsedMs >= windowMs) {
    const { error: resetError } = await admin
      .from("auth_ip_rate_limits")
      .update({
        request_count: 1,
        window_started_at: toIso(now),
        updated_at: toIso(now),
      })
      .eq("scope", scope)
      .eq("ip_address", ipAddress);

    if (resetError) {
      throw new Error(resetError.message);
    }

    return { allowed: true, retryAfterSec: 0 };
  }

  if (existing.request_count >= config.maxRequests) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((windowMs - elapsedMs) / 1000)),
    };
  }

  const { error: incrementError } = await admin
    .from("auth_ip_rate_limits")
    .update({
      request_count: existing.request_count + 1,
      updated_at: toIso(now),
    })
    .eq("scope", scope)
    .eq("ip_address", ipAddress);

  if (incrementError) {
    throw new Error(incrementError.message);
  }

  return { allowed: true, retryAfterSec: 0 };
};
