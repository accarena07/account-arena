import { randomUUID } from "crypto";
import { z } from "zod";

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

type ParseJsonSuccess<T> = {
  ok: true;
  data: T;
};

type ParseJsonFailure = {
  ok: false;
  response: Response;
};

export type ParseJsonResult<T> = ParseJsonSuccess<T> | ParseJsonFailure;

export async function parseJsonWithSchema<S extends z.ZodTypeAny>(
  req: Request,
  schema: S,
  options?: {
    code?: string;
    message?: string;
    status?: number;
  }
): Promise<ParseJsonResult<z.infer<S>>> {
  const body = await readJson<unknown>(req);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return {
      ok: false,
      response: jsonError(
        {
          code: options?.code ?? "VALIDATION_ERROR",
          message: options?.message ?? "Input tidak valid",
          details: parsed.error.flatten(),
        },
        options?.status ?? 422
      ),
    };
  }

  return { ok: true, data: parsed.data };
}
