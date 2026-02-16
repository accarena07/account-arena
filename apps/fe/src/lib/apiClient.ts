import { z } from "zod";
import { ApiEnvelopeSchema, AuthRefreshResponseSchema } from "@acme/shared";
import { clearAuthSession, setAuthSession } from "@/lib/auth-session";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";
const API_TIMEOUT_MS = process.env.NEXT_PUBLIC_API_TIMEOUT_MS
  ? Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS)
  : 15000;

export class ApiClientError extends Error {
  public readonly status?: number;
  public readonly details?: unknown;

  constructor(
    message: string,
    status?: number,
    details?: unknown
  ) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

let ongoingRefresh: Promise<boolean> | null = null;

const tryRefreshSession = async (): Promise<boolean> => {
  if (!ongoingRefresh) {
    ongoingRefresh = (async () => {
      try {
        const res = await fetch(`${BASE}/api/v1/auth/refresh`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          cache: "no-store",
        });

        const json = await res.json().catch(() => null);
        const parsedEnvelope = ApiEnvelopeSchema.safeParse(json);

        if (!parsedEnvelope.success) {
          clearAuthSession();
          return false;
        }

        const envelope = parsedEnvelope.data;
        if (!envelope.ok) {
          clearAuthSession();
          return false;
        }

        const parsedData = AuthRefreshResponseSchema.safeParse(envelope.data);
        if (!parsedData.success) {
          clearAuthSession();
          return false;
        }

        setAuthSession(parsedData.data.session, parsedData.data.user, parsedData.data.roles);
        return true;
      } catch {
        clearAuthSession();
        return false;
      } finally {
        ongoingRefresh = null;
      }
    })();
  }

  return ongoingRefresh;
};

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
  dataSchema?: z.ZodType<T>
): Promise<T> {
  const request = async (): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
    try {
      return await fetch(`${BASE}${path}`, {
        ...init,
        headers: {
          "content-type": "application/json",
          ...(init?.headers ?? {})
        },
        credentials: "include",
        cache: "no-store",
        signal: controller.signal,
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiClientError("Request timeout. Coba lagi.");
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const parseEnvelopeOrThrow = async (res: Response) => {
    const json = await res.json().catch(() => null);
    const parsedEnvelope = ApiEnvelopeSchema.safeParse(json);

    if (!parsedEnvelope.success) {
      throw new ApiClientError("Response format tidak sesuai", res.status, { json });
    }

    return parsedEnvelope.data;
  };

  let res = await request();
  let envelope = await parseEnvelopeOrThrow(res);

  const shouldTryRefresh =
    !envelope.ok &&
    res.status === 401 &&
    path !== "/api/v1/auth/refresh" &&
    path !== "/api/v1/auth/login";

  if (shouldTryRefresh) {
    const refreshed = await tryRefreshSession();
    if (refreshed) {
      res = await request();
      envelope = await parseEnvelopeOrThrow(res);
    }
  }

  if (!envelope.ok) {
    throw new ApiClientError(
      envelope.error?.message ?? "API error",
      res.status,
      envelope.error
    );
  }

  const payload = envelope.data as unknown;

  if (dataSchema) {
    const parsed = dataSchema.safeParse(payload);
    if (!parsed.success) {
      throw new ApiClientError("Data schema mismatch", res.status, parsed.error.flatten());
    }
    return parsed.data;
  }

  return payload as T;
}
