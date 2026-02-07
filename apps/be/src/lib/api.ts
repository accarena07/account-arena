import { randomUUID } from "crypto";

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

export function jsonOk<T>(data: T, init?: ResponseInit) {
  const requestId = randomUUID();
  return Response.json(
    { ok: true, data, meta: { requestId } },
    { status: 200, ...init }
  );
}

export function jsonError(error: ApiError, status = 400, init?: ResponseInit) {
  const requestId = randomUUID();
  return Response.json(
    { ok: false, error, meta: { requestId } },
    { status, ...init }
  );
}

export async function readJson<T>(req: Request): Promise<T> {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw { code: "UNSUPPORTED_MEDIA_TYPE", message: "Content-Type harus application/json" };
  }
  return (await req.json()) as T;
}
