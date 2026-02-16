import { jsonError, jsonOk } from "@/lib/api";
import { requireAuth } from "@/lib/auth-guard";
import { logError, logInfo, logWarn, maskEmail } from "@/lib/logger";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const auth = await requireAuth(req);
    if (!auth.ok) {
      logWarn("auth.me.unauthorized");
      return auth.response;
    }

    logInfo("auth.me.success", {
      userId: auth.context.user.id,
      email: maskEmail(auth.context.user.email),
    });

    return jsonOk(auth.context);
  } catch (e: any) {
    logError("auth.me.unexpected_error", e);
    return jsonError(
      {
        code: e?.code ?? "BAD_REQUEST",
        message: e?.message ?? "Bad request",
        details: e?.details,
      },
      400,
    );
  }
}
