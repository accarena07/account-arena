import { jsonError, jsonOk, readJson } from "@/lib/api";
import { EchoRequestSchema } from "@acme/shared";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = EchoRequestSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(
        { code: "VALIDATION_ERROR", message: "Input tidak valid", details: parsed.error.flatten() },
        422
      );
    }

    return jsonOk({ echo: parsed.data.message });
  } catch (e: any) {
    return jsonError(
      { code: e?.code ?? "BAD_REQUEST", message: e?.message ?? "Bad request", details: e?.details },
      e?.code === "UNSUPPORTED_MEDIA_TYPE" ? 415 : 400
    );
  }
}
