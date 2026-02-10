import { z } from "zod";
import { ApiEnvelopeSchema } from "@acme/shared";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

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

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
  dataSchema?: z.ZodType<T>
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  const json = await res.json().catch(() => null);
  const env = ApiEnvelopeSchema.safeParse(json);

  if (!env.success) {
    throw new ApiClientError("Response format tidak sesuai", res.status, { json });
  }
  if (!env.data.ok) {
    throw new ApiClientError(env.data.error?.message ?? "API error", res.status, env.data.error);
  }

  const payload = env.data.data as unknown;

  if (dataSchema) {
    const parsed = dataSchema.safeParse(payload);
    if (!parsed.success) {
      throw new ApiClientError("Data schema mismatch", res.status, parsed.error.flatten());
    }
    return parsed.data;
  }

  return payload as T;
}
