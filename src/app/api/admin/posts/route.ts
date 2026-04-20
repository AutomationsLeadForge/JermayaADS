import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { slugify } from "@/lib/slugify";
import type { PostInput, PostStatus } from "@/types/blog";

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
  const view = url.searchParams.get("view") ?? "active"; // active | trash | all

  const db = getSupabaseAdmin();
  let query = db
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (view === "active") query = query.is("deleted_at", null);
  else if (view === "trash") query = query.not("deleted_at", "is", null);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data });
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  let body: PostInput;
  try {
    body = (await request.json()) as PostInput;
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

  const status: PostStatus = body.status === "published" ? "published" : "draft";
  const now = new Date().toISOString();

  const { data, error } = await db
    .from("blog_posts")
    .insert({
      slug,
      title,
      excerpt: body.excerpt ?? "",
      content_html: body.content_html ?? "",
      cover_image_url: body.cover_image_url ?? null,
      status,
      published_at: status === "published" ? now : null,
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data }, { status: 201 });
}

async function ensureUniqueSlug(
  db: ReturnType<typeof getSupabaseAdmin>,
  base: string,
): Promise<string> {
  let candidate = base;
  let i = 2;
  while (true) {
    const { data } = await db
      .from("blog_posts")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (!data) return candidate;
    candidate = `${base}-${i++}`;
    if (i > 50) return `${base}-${Date.now()}`;
  }
}
