import { jsonError, jsonOk } from "@/lib/api";
import { requireAuth } from "@/lib/auth-guard";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const auth = await requireAuth(req);
    if (!auth.ok) return auth.response;

    return jsonOk({
      user: auth.context.user,
      roles: auth.context.roles,
      sellerAccess: auth.context.sellerAccess,
      requirements: {
        sellerRoleRequired: !auth.context.sellerAccess.hasSellerRole,
        approvedKycRequired: auth.context.sellerAccess.kycStatus !== "approved",
      },
    });
  } catch (e: any) {
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
