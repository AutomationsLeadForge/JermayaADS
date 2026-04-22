import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ key: string }> };

const ALLOWED_KEYS = new Set(["about", "readme"]);

async function guard() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(_: Request, ctx: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  const { key } = await ctx.params;
  if (!ALLOWED_KEYS.has(key)) {
    return NextResponse.json({ error: "Unknown key" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("site_content")
    .select("*")
    .eq("key", key)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ content: data ?? null });
}

export async function PUT(request: Request, ctx: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  const { key } = await ctx.params;
  if (!ALLOWED_KEYS.has(key)) {
    return NextResponse.json({ error: "Unknown key" }, { status: 400 });
  }

  let body: { value?: unknown };
  try {
    body = (await request.json()) as { value?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  if (body.value === undefined) {
    return NextResponse.json({ error: "Missing value" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("site_content")
    .upsert({ key, value: body.value }, { onConflict: "key" })
    .select("*")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ content: data });
}
