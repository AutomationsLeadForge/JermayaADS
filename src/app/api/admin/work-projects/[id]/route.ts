import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { slugify } from "@/lib/slugify";
import type { WorkProjectInput } from "@/types/work";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

async function guard() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(_: Request, ctx: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await ctx.params;

  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("work_projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ project: data });
}

export async function PATCH(request: Request, ctx: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await ctx.params;

  let body: WorkProjectInput;
  try {
    body = (await request.json()) as WorkProjectInput;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const db = getSupabaseAdmin();

  const { data: existing } = await db
    .from("work_projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const update: Record<string, unknown> = {};

  if (typeof body.title === "string") update.title = body.title.trim();
  if (typeof body.number === "string") update.number = body.number;
  if (typeof body.category === "string") update.category = body.category;
  if (typeof body.category_label === "string") update.category_label = body.category_label;
  if (typeof body.role === "string") update.role = body.role;
  if (typeof body.outcome_metric === "string") update.outcome_metric = body.outcome_metric;
  if (typeof body.outcome_label === "string") update.outcome_label = body.outcome_label;
  if (typeof body.summary === "string") update.summary = body.summary;
  if (body.thumbnail_url === null || typeof body.thumbnail_url === "string") {
    update.thumbnail_url = body.thumbnail_url;
  }
  if (typeof body.icon_key === "string") update.icon_key = body.icon_key;
  if (body.href === null || typeof body.href === "string") update.href = body.href;
  if (typeof body.featured === "boolean") update.featured = body.featured;
  if (typeof body.sort_order === "number") update.sort_order = body.sort_order;

  if (typeof body.slug === "string" && body.slug.trim()) {
    const next = slugify(body.slug);
    if (next !== existing.slug) {
      const { data: clash } = await db
        .from("work_projects")
        .select("id")
        .eq("slug", next)
        .maybeSingle();
      if (clash && clash.id !== id) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
      }
      update.slug = next;
    }
  }

  const { data, error } = await db
    .from("work_projects")
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ project: data });
}

// Soft delete (move to recycle bin)
export async function DELETE(_: Request, ctx: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await ctx.params;

  const db = getSupabaseAdmin();
  const { error } = await db
    .from("work_projects")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
