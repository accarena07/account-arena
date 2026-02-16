import { z } from "zod";
import { ApiEnvelopeSchema } from "@acme/shared";

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

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
  dataSchema?: z.ZodType<T>
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
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

  const json = await res.json().catch(() => null);
  const parsedEnvelope = ApiEnvelopeSchema.safeParse(json);

  if (!parsedEnvelope.success) {
    throw new ApiClientError("Response format tidak sesuai", res.status, { json });
  }
  const envelope = parsedEnvelope.data;

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
