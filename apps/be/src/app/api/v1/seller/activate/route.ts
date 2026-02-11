import { jsonError, jsonOk } from "@/lib/api";
import { requireAuth } from "@/lib/auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const auth = await requireAuth(req);
    if (!auth.ok) return auth.response;

    const admin = getSupabaseAdminClient();

    const { error: upsertError } = await admin.from("user_roles").upsert(
      {
        user_id: auth.context.user.id,
        role: "seller",
        is_active: true,
      },
      { onConflict: "user_id,role" },
    );

    if (upsertError) {
      return jsonError(
        {
          code: "SELLER_ACTIVATE_FAILED",
          message: upsertError.message,
        },
        400,
      );
    }

    // Re-fetch latest active roles + latest KYC for updated eligibility response.
    const [{ data: roleRows }, { data: latestKyc }] = await Promise.all([
      admin
        .from("user_roles")
        .select("role")
        .eq("user_id", auth.context.user.id)
        .eq("is_active", true),
      admin
        .from("kyc_submissions")
        .select("status, submitted_at")
        .eq("user_id", auth.context.user.id)
        .order("submitted_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    const roles = (roleRows ?? []).map((r) => r.role);
    const hasSellerRole = roles.includes("seller");
    const kycStatus = latestKyc?.status ?? null;
    const canSell = hasSellerRole && kycStatus === "approved";

    return jsonOk({
      activated: true,
      roles,
      sellerAccess: {
        hasSellerRole,
        kycStatus,
        canSell,
      },
      nextStep: canSell ? "ready_to_sell" : "complete_kyc",
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
