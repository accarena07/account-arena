import { jsonError, jsonOk } from "@/lib/api";
import { requireRole } from "@/lib/auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

type Params = { params: Promise<{ submissionId: string }> };

export async function GET(req: Request, { params }: Params) {
  try {
    const guard = await requireRole(req, "admin");
    if (!guard.ok) return guard.response;

    const { submissionId } = await params;
    const admin = getSupabaseAdminClient();

    const { data: submission, error: submissionError } = await admin
      .from("kyc_submissions")
      .select(
        "id, user_id, kyc_level, status, full_name, nik, birth_place, birth_date, address, submitted_at, reviewed_by, reviewed_at, review_notes",
      )
      .eq("id", submissionId)
      .maybeSingle();

    if (submissionError) {
      return jsonError(
        { code: "KYC_DETAIL_FAILED", message: submissionError.message },
        400,
      );
    }

    if (!submission) {
      return jsonError({ code: "NOT_FOUND", message: "KYC submission not found" }, 404);
    }

    const { data: documents, error: docsError } = await admin
      .from("kyc_documents")
      .select("id, doc_type, file_url, metadata, created_at")
      .eq("submission_id", submissionId)
      .order("created_at", { ascending: true });

    if (docsError) {
      return jsonError(
        { code: "KYC_DOCS_FAILED", message: docsError.message },
        400,
      );
    }

    return jsonOk({ submission, documents: documents ?? [] });
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
