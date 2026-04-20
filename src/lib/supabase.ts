import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  );
}

export const supabase: SupabaseClient = createClient(url, anonKey, {
  auth: { persistSession: false },
});

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!secret) {
    throw new Error("SUPABASE_SECRET_KEY is not set — admin operations disabled");
  }
  adminClient = createClient(url!, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
}

export const BLOG_IMAGES_BUCKET = "blog-images";
