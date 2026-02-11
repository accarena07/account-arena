import { jsonError, jsonOk } from "@/lib/api";
import { requireAuth } from "@/lib/auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const auth = await requireAuth(req);
    if (!auth.ok) return auth.response;

    const admin = getSupabaseAdminClient();

    const { data: latestSubmission, error: submissionError } = await admin
      .from("kyc_submissions")
      .select(
        "id, kyc_level, status, full_name, nik, birth_place, birth_date, address, submitted_at, reviewed_at, review_notes",
      )
      .eq("user_id", auth.context.user.id)
      .order("submitted_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (submissionError) {
      return jsonError(
        {
          code: "KYC_FETCH_FAILED",
          message: submissionError.message,
        },
        400,
      );
    }

    if (!latestSubmission) {
      return jsonOk({
        exists: false,
        submission: null,
        documents: [],
      });
    }

    const { data: docs, error: docsError } = await admin
      .from("kyc_documents")
      .select("id, doc_type, file_url, metadata, created_at")
      .eq("submission_id", latestSubmission.id)
      .order("created_at", { ascending: true });

    if (docsError) {
      return jsonError(
        {
          code: "KYC_DOCS_FETCH_FAILED",
          message: docsError.message,
        },
        400,
      );
    }

    return jsonOk({
      exists: true,
      submission: latestSubmission,
      documents: docs ?? [],
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
