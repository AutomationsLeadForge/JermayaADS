import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { slugify } from "@/lib/slugify";
import type { WorkProjectInput } from "@/types/work";

export const runtime = "nodejs";

async function guard() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  const url = new URL(request.url);
  const view = url.searchParams.get("view") ?? "active";

  const db = getSupabaseAdmin();
  let query = db
    .from("work_projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (view === "active") query = query.is("deleted_at", null);
  else if (view === "trash") query = query.not("deleted_at", "is", null);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ projects: data });
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  let body: WorkProjectInput;
  try {
    body = (await request.json()) as WorkProjectInput;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const title = (body.title ?? "").trim();
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  const baseSlug = slugify(body.slug?.trim() || title);
  const slug = await ensureUniqueSlug(db, baseSlug);

  // Auto-assign sort_order = (max + 1) if not provided
  let sortOrder = body.sort_order;
  if (sortOrder === undefined || sortOrder === null) {
    const { data: maxRow } = await db
      .from("work_projects")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    sortOrder = (maxRow?.sort_order ?? 0) + 1;
  }

  const { data, error } = await db
    .from("work_projects")
    .insert({
      slug,
      number: body.number ?? "",
      title,
      category: body.category ?? "dev",
      category_label: body.category_label ?? "",
      role: body.role ?? "",
      outcome_metric: body.outcome_metric ?? "",
      outcome_label: body.outcome_label ?? "",
      summary: body.summary ?? "",
      thumbnail_url: body.thumbnail_url ?? null,
      icon_key: body.icon_key ?? "DocumentIcon",
      href: body.href ?? null,
      featured: Boolean(body.featured),
      sort_order: sortOrder,
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ project: data }, { status: 201 });
}

async function ensureUniqueSlug(
  db: ReturnType<typeof getSupabaseAdmin>,
  base: string,
): Promise<string> {
  let candidate = base || "project";
  let i = 2;
  while (true) {
    const { data } = await db
      .from("work_projects")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (!data) return candidate;
    candidate = `${base}-${i++}`;
    if (i > 50) return `${base}-${Date.now()}`;
  }
}
