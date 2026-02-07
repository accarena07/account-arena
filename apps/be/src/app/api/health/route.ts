import { jsonOk } from "@/lib/api";

export const runtime = "nodejs";

export async function GET() {
  return jsonOk({
    ok: true,
    service: "be",
    time: new Date().toISOString()
  });
}
