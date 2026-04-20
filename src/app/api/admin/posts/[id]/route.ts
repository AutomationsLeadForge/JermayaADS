import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { slugify } from "@/lib/slugify";
import type { PostInput, PostStatus } from "@/types/blog";

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
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post: data });
}

export async function PATCH(request: Request, ctx: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await ctx.params;

  let body: PostInput;
  try {
    body = (await request.json()) as PostInput;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const db = getSupabaseAdmin();

  const { data: existing } = await db
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const update: Record<string, unknown> = {};

  if (typeof body.title === "string") update.title = body.title.trim();
  if (typeof body.excerpt === "string") update.excerpt = body.excerpt;
  if (typeof body.content_html === "string") update.content_html = body.content_html;
  if (body.cover_image_url === null || typeof body.cover_image_url === "string") {
    update.cover_image_url = body.cover_image_url;
  }

  if (typeof body.slug === "string" && body.slug.trim()) {
    const next = slugify(body.slug);
    if (next !== existing.slug) {
      const { data: clash } = await db
        .from("blog_posts")
        .select("id")
        .eq("slug", next)
        .maybeSingle();
      if (clash && clash.id !== id) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
      }
      update.slug = next;
    }
  }

  if (body.status === "draft" || body.status === "published") {
    const nextStatus: PostStatus = body.status;
    update.status = nextStatus;
    if (nextStatus === "published" && !existing.published_at) {
      update.published_at = new Date().toISOString();
    }
  }

  const { data, error } = await db
    .from("blog_posts")
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data });
}

// Soft delete (move to recycle bin)
export async function DELETE(_: Request, ctx: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await ctx.params;

  const db = getSupabaseAdmin();
  const { error } = await db
    .from("blog_posts")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
