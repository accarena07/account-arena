import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
const SUPABASE_SECRET_KEY =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

function getRequiredEnv(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`[supabase] Missing required env: ${name}`);
  }
  return value;
}

export function hasSupabaseEnv() {
  return Boolean(SUPABASE_URL && SUPABASE_SECRET_KEY);
}

export function getSupabaseAdminClient(): SupabaseClient {
  return createClient(
    getRequiredEnv("SUPABASE_URL", SUPABASE_URL),
    getRequiredEnv("SUPABASE_SECRET_KEY", SUPABASE_SECRET_KEY),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

export function getSupabaseAnonClient(): SupabaseClient {
  return createClient(
    getRequiredEnv("SUPABASE_URL", SUPABASE_URL),
    getRequiredEnv("SUPABASE_PUBLISHABLE_KEY", SUPABASE_PUBLISHABLE_KEY),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
