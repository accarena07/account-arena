import { jsonError, jsonOk, readJson } from "@/lib/api";
import { requireAuth } from "@/lib/auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { z } from "zod";

export const runtime = "nodejs";

const KycDocumentSchema = z.object({
  docType: z.enum(["ktp", "selfie", "passport", "npwp", "other"]),
  fileUrl: z.string().url(),
  metadata: z.record(z.string(), z.any()).optional(),
});

const KycSubmitSchema = z.object({
  kycLevel: z.string().min(1).default("basic"),
  fullName: z.string().min(2).max(120),
  nik: z.string().min(8).max(32).optional(),
  birthPlace: z.string().min(2).max(100).optional(),
  birthDate: z.string().date().optional(),
  address: z.string().min(5).max(300).optional(),
  documents: z.array(KycDocumentSchema).min(1),
});

export async function POST(req: Request) {
  try {
    const auth = await requireAuth(req);
    if (!auth.ok) return auth.response;

    const body = await readJson<unknown>(req);
    const parsed = KycSubmitSchema.safeParse(body);

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

    const data = parsed.data;
    const admin = getSupabaseAdminClient();

    const { data: submission, error: submissionError } = await admin
      .from("kyc_submissions")
      .insert({
        user_id: auth.context.user.id,
        kyc_level: data.kycLevel,
        status: "pending",
        full_name: data.fullName,
        nik: data.nik,
        birth_place: data.birthPlace,
        birth_date: data.birthDate,
        address: data.address,
      })
      .select("id, status, submitted_at")
      .single();

    if (submissionError || !submission) {
      return jsonError(
        {
          code: "KYC_SUBMIT_FAILED",
          message: submissionError?.message ?? "Failed to create KYC submission",
        },
        400,
      );
    }

    const docsPayload = data.documents.map((doc) => ({
      submission_id: submission.id,
      doc_type: doc.docType,
      file_url: doc.fileUrl,
      metadata: doc.metadata ?? null,
    }));

    const { error: docsError } = await admin.from("kyc_documents").insert(docsPayload);

    if (docsError) {
      return jsonError(
        {
          code: "KYC_DOCUMENTS_FAILED",
          message: docsError.message,
        },
        400,
      );
    }

    return jsonOk({
      submitted: true,
      submission: {
        id: submission.id,
        status: submission.status,
        submittedAt: submission.submitted_at,
      },
      documentsCount: docsPayload.length,
    });
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
