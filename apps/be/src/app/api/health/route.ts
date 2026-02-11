import { jsonOk } from "@/lib/api";
import { getSupabaseAdminClient, hasSupabaseEnv } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  let db = {
    connected: false,
    configured: false,
    error: null as string | null,
  };

  if (hasSupabaseEnv()) {
    db.configured = true;
    try {
      const supabase = getSupabaseAdminClient();
      const { error } = await supabase
        .from("game_categories")
        .select("id", { head: true, count: "exact" });

      if (error) throw error;
      db.connected = true;
    } catch (err) {
      db.error = err instanceof Error ? err.message : "Unknown DB error";
    }
  }

  return jsonOk({
    ok: true,
    service: "be",
    time: new Date().toISOString(),
    db,
  });
}
