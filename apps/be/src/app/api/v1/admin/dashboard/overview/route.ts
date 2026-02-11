import { jsonError, jsonOk } from "@/lib/api";
import { requireRole } from "@/lib/auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

type OrderRow = {
  id: string;
  total_amount: number;
  created_at: string;
  order_code: string;
  status: string;
};

type ListingRow = {
  id: string;
  game_id: string;
  status: string;
};

type GameRow = {
  id: string;
  name: string;
};

export async function GET(req: Request) {
  try {
    const guard = await requireRole(req, "admin");
    if (!guard.ok) return guard.response;

    const url = new URL(req.url);
    const range = (url.searchParams.get("range") ?? "30d").trim();

    const dayMap: Record<string, number> = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
    };

    const days = dayMap[range] ?? 30;
    const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const admin = getSupabaseAdminClient();

    const [
      { data: users, error: usersError, count: totalUsers },
      { count: pendingKyc, error: kycError },
      { count: openDisputes, error: disputesError },
      { data: orders, error: ordersError },
      { data: listings, error: listingsError },
      { data: games, error: gamesError },
      { data: recentOrderEvents, error: eventsError },
    ] = await Promise.all([
      admin.from("profiles").select("id", { count: "exact", head: true }),
      admin
        .from("kyc_submissions")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending"),
      admin
        .from("disputes")
        .select("id", { count: "exact", head: true })
        .in("status", ["open", "under_review"]),
      admin
        .from("orders")
        .select("id, total_amount, created_at, order_code, status")
        .gte("created_at", fromDate)
        .order("created_at", { ascending: false })
        .limit(300),
      admin
        .from("listings")
        .select("id, game_id, status")
        .eq("status", "active"),
      admin.from("games").select("id, name"),
      admin
        .from("order_events")
        .select("id, event_type, created_at, order_id")
        .order("created_at", { ascending: false })
        .limit(8),
    ]);

    if (usersError || kycError || disputesError || ordersError || listingsError || gamesError || eventsError) {
      return jsonError(
        {
          code: "ADMIN_OVERVIEW_FAILED",
          message:
            usersError?.message ||
            kycError?.message ||
            disputesError?.message ||
            ordersError?.message ||
            listingsError?.message ||
            gamesError?.message ||
            eventsError?.message ||
            "Failed to build dashboard",
        },
        400,
      );
    }

    const orderRows = (orders ?? []) as OrderRow[];
    const now = Date.now();
    const prevFrom = new Date(now - days * 2 * 24 * 60 * 60 * 1000).toISOString();

    const currentRevenue = orderRows
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

    const { data: prevOrders, error: prevOrdersError } = await admin
      .from("orders")
      .select("total_amount, status, created_at")
      .gte("created_at", prevFrom)
      .lt("created_at", fromDate)
      .eq("status", "completed")
      .limit(500);

    if (prevOrdersError) {
      return jsonError({ code: "ADMIN_OVERVIEW_FAILED", message: prevOrdersError.message }, 400);
    }

    const previousRevenue = (prevOrders ?? []).reduce(
      (sum, o: any) => sum + Number(o.total_amount || 0),
      0,
    );

    const growthPct = previousRevenue > 0
      ? Number((((currentRevenue - previousRevenue) / previousRevenue) * 100).toFixed(2))
      : currentRevenue > 0
        ? 100
        : 0;

    const listingRows = (listings ?? []) as ListingRow[];
    const gamesMap = new Map((games as GameRow[] | null ?? []).map((g) => [g.id, g.name]));

    const inventoryMap = new Map<string, number>();
    for (const listing of listingRows) {
      const gameName = gamesMap.get(listing.game_id) ?? "Unknown Game";
      inventoryMap.set(gameName, (inventoryMap.get(gameName) ?? 0) + 1);
    }

    const inventoryGame = Array.from(inventoryMap.entries())
      .map(([gameName, activeListings]) => ({ gameName, activeListings }))
      .sort((a, b) => b.activeListings - a.activeListings)
      .slice(0, 12);

    const recentActivity = (recentOrderEvents ?? []).map((ev: any) => ({
      id: ev.id,
      type: ev.event_type,
      message: `Order ${ev.order_id} event: ${ev.event_type}`,
      createdAt: ev.created_at,
    }));

    const pendingTransactions = orderRows.filter((o) =>
      ["pending_payment", "paid", "processing"].includes(o.status),
    ).length;

    return jsonOk({
      monthlyRevenue: {
        current: currentRevenue,
        previous: previousRevenue,
        growthPct,
      },
      inventoryGame,
      managementSummary: {
        totalUsers: totalUsers ?? users?.length ?? 0,
        pendingKyc: pendingKyc ?? 0,
        openDisputes: openDisputes ?? 0,
        pendingTransactions,
      },
      recentActivity,
      meta: {
        range,
        fromDate,
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
