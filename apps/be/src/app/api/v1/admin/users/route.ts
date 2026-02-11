import { jsonError, jsonOk } from "@/lib/api";
import { requireRole } from "@/lib/auth-guard";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

type UserRoleRow = {
  user_id: string;
  role: string;
  is_active: boolean;
};

export async function GET(req: Request) {
  try {
    const guard = await requireRole(req, "admin");
    if (!guard.ok) return guard.response;

    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") ?? "20")));
    const search = (url.searchParams.get("search") ?? "").trim();
    const status = (url.searchParams.get("status") ?? "").trim();
    const role = (url.searchParams.get("role") ?? "").trim();
    const joinedFrom = url.searchParams.get("joinedFrom");
    const joinedTo = url.searchParams.get("joinedTo");
    const sortBy = (url.searchParams.get("sortBy") ?? "joinedAt").trim();
    const sortOrder = (url.searchParams.get("sortOrder") ?? "desc").trim().toLowerCase() === "asc";

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const admin = getSupabaseAdminClient();

    let profileQuery = admin
      .from("profiles")
      .select("id, email, full_name, phone, status, created_at, updated_at", { count: "exact" });

    if (search) {
      profileQuery = profileQuery.or(`email.ilike.%${search}%,full_name.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    if (status) {
      profileQuery = profileQuery.eq("status", status);
    }

    if (joinedFrom) {
      profileQuery = profileQuery.gte("created_at", joinedFrom);
    }

    if (joinedTo) {
      profileQuery = profileQuery.lte("created_at", joinedTo);
    }

    const orderColumn = sortBy === "lastActiveAt" ? "updated_at" : "created_at";

    profileQuery = profileQuery
      .order(orderColumn, { ascending: sortOrder })
      .range(from, to);

    const { data: profiles, error: profilesError, count } = await profileQuery;

    if (profilesError) {
      return jsonError({ code: "ADMIN_USERS_FETCH_FAILED", message: profilesError.message }, 400);
    }

    const profileRows = (profiles ?? []) as ProfileRow[];
    const userIds = profileRows.map((p) => p.id);

    let rolesMap = new Map<string, string[]>();

    if (userIds.length > 0) {
      let roleQuery = admin
        .from("user_roles")
        .select("user_id, role, is_active")
        .in("user_id", userIds)
        .eq("is_active", true);

      if (role) {
        roleQuery = roleQuery.eq("role", role);
      }

      const { data: roleRows, error: roleError } = await roleQuery;
      if (roleError) {
        return jsonError({ code: "ADMIN_USER_ROLES_FETCH_FAILED", message: roleError.message }, 400);
      }

      for (const row of (roleRows ?? []) as UserRoleRow[]) {
        const curr = rolesMap.get(row.user_id) ?? [];
        curr.push(row.role);
        rolesMap.set(row.user_id, curr);
      }
    }

    const items = profileRows
      .map((p) => ({
        id: p.id,
        email: p.email,
        fullName: p.full_name,
        phone: p.phone,
        status: p.status,
        roles: rolesMap.get(p.id) ?? [],
        joinedAt: p.created_at,
        lastActiveAt: p.updated_at,
      }))
      .filter((u) => {
        if (!role) return true;
        return u.roles.includes(role);
      });

    return jsonOk({
      items,
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
