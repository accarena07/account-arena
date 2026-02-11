import { jsonError, jsonOk } from "@/lib/api";
import { requireRole } from "@/lib/auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const guard = await requireRole(req, "admin");
    if (!guard.ok) return guard.response;

    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") ?? "20")));
    const status = url.searchParams.get("status");
    const search = (url.searchParams.get("search") ?? "").trim();

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const admin = getSupabaseAdminClient();

    let query = admin
      .from("kyc_submissions")
      .select(
        "id, user_id, kyc_level, status, full_name, nik, submitted_at, reviewed_at, review_notes",
        { count: "exact" },
      )
      .order("submitted_at", { ascending: false })
      .range(from, to);

    if (status) query = query.eq("status", status);
    if (search) query = query.or(`full_name.ilike.%${search}%,nik.ilike.%${search}%`);

    const { data, error, count } = await query;

    if (error) {
      return jsonError({ code: "KYC_LIST_FAILED", message: error.message }, 400);
    }

    return jsonOk({
      items: data ?? [],
      meta: {
        page,
        limit,
        total: count ?? 0,
        totalPages: Math.max(1, Math.ceil((count ?? 0) / limit)),
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
