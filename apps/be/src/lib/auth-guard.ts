import { jsonError } from "@/lib/api";
import { getAccessTokenFromCookieHeader } from "@/lib/auth-cookie";
import { getSupabaseAdminClient } from "@/lib/supabase";

type UserProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

type AuthContext = {
  user: {
    id: string;
    email: string | null;
  };
  profile: UserProfile | null;
  roles: string[];
  sellerAccess: {
    hasSellerRole: boolean;
    kycStatus: string | null;
    canSell: boolean;
  };
};

type GuardResult =
  | { ok: true; context: AuthContext }
  | { ok: false; response: Response };

function getBearerToken(req: Request): string | null {
  const authHeader =
    req.headers.get("authorization") ?? req.headers.get("Authorization");
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(" ");
  if (!scheme || !token || scheme.toLowerCase() !== "bearer") return null;

  return token.trim();
}

function getAuthToken(req: Request): string | null {
  const bearerToken = getBearerToken(req);
  if (bearerToken) return bearerToken;
  return getAccessTokenFromCookieHeader(req.headers.get("cookie"));
}

export async function requireAuth(req: Request): Promise<GuardResult> {
  const accessToken = getAuthToken(req);
  if (!accessToken) {
    return {
      ok: false,
      response: jsonError(
        { code: "UNAUTHORIZED", message: "Missing auth token" },
        401,
      ),
    };
  }

  const admin = getSupabaseAdminClient();
  const { data: authData, error: authError } = await admin.auth.getUser(accessToken);

  if (authError || !authData.user) {
    return {
      ok: false,
      response: jsonError(
        { code: "UNAUTHORIZED", message: authError?.message ?? "Invalid token" },
        401,
      ),
    };
  }

  const userId = authData.user.id;
  const [{ data: profile }, { data: roleRows }, { data: latestKyc }] =
    await Promise.all([
      admin
        .from("profiles")
        .select(
          "id, email, full_name, phone, avatar_url, status, created_at, updated_at",
        )
        .eq("id", userId)
        .maybeSingle(),
      admin
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("is_active", true),
      admin
        .from("kyc_submissions")
        .select("status, submitted_at")
        .eq("user_id", userId)
        .order("submitted_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

  const roles = (roleRows ?? []).map((r) => r.role);
  const hasSellerRole = roles.includes("seller");
  const kycStatus = latestKyc?.status ?? null;
  const canSell = hasSellerRole && kycStatus === "approved";

  return {
    ok: true,
    context: {
      user: {
        id: authData.user.id,
        email: authData.user.email ?? null,
      },
      profile: profile as UserProfile | null,
      roles,
      sellerAccess: {
        hasSellerRole,
        kycStatus,
        canSell,
      },
    },
  };
}

export async function requireRole(
  req: Request,
  role: "buyer" | "seller" | "admin",
): Promise<GuardResult> {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth;

  if (!auth.context.roles.includes(role)) {
    return {
      ok: false,
      response: jsonError(
        { code: "FORBIDDEN", message: `Requires ${role} role` },
        403,
      ),
    };
  }

  return auth;
}

export async function requireSellerEligible(req: Request): Promise<GuardResult> {
  const auth = await requireRole(req, "seller");
  if (!auth.ok) return auth;

  if (!auth.context.sellerAccess.canSell) {
    return {
      ok: false,
      response: jsonError(
        {
          code: "SELLER_NOT_ELIGIBLE",
          message: "Seller access requires approved KYC",
          details: auth.context.sellerAccess,
        },
        403,
      ),
    };
  }

  return auth;
}
