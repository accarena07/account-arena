import { jsonError, jsonOk, readJson } from "@/lib/api";
import { requireRole } from "@/lib/auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { z } from "zod";

export const runtime = "nodejs";

type Params = { params: Promise<{ submissionId: string }> };

const BodySchema = z.object({
  note: z.string().max(500).optional(),
});

export async function POST(req: Request, { params }: Params) {
  try {
    const guard = await requireRole(req, "admin");
    if (!guard.ok) return guard.response;

    const body = await readJson<unknown>(req);
    const parsed = BodySchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(
        {
          code: "VALIDATION_ERROR",
          message: "Input tidak valid",
          details: parsed.error.flatten(),
        },
        422,
      );
    }

    const { submissionId } = await params;
    const admin = getSupabaseAdminClient();

    const { data, error } = await admin
      .from("kyc_submissions")
      .update({
        status: "approved",
        reviewed_by: guard.context.user.id,
        reviewed_at: new Date().toISOString(),
        review_notes: parsed.data.note ?? null,
      })
      .eq("id", submissionId)
      .select("id, status, reviewed_by, reviewed_at, review_notes")
      .maybeSingle();

    if (error) {
      return jsonError({ code: "KYC_APPROVE_FAILED", message: error.message }, 400);
    }

    if (!data) {
      return jsonError({ code: "NOT_FOUND", message: "KYC submission not found" }, 404);
    }

    return jsonOk({ approved: true, submission: data });
  } catch (e: any) {
    return jsonError(
      {
        code: e?.code ?? "BAD_REQUEST",
        message: e?.message ?? "Bad request",
        details: e?.details,
      },
      e?.code === "UNSUPPORTED_MEDIA_TYPE" ? 415 : 400,
    );
  }
}
