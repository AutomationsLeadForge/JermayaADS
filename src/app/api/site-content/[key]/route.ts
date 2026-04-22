import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ key: string }> };

const ALLOWED_KEYS = new Set(["about", "readme"]);

export async function GET(_: Request, ctx: Ctx) {
  const { key } = await ctx.params;
  if (!ALLOWED_KEYS.has(key)) {
    return NextResponse.json({ error: "Unknown key" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("site_content")
    .select("key, value, updated_at")
    .eq("key", key)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ content: data ?? null });
}
