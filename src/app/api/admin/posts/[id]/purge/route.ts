import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSupabaseAdmin, BLOG_IMAGES_BUCKET } from "@/lib/supabase";

export const runtime = "nodejs";

export async function DELETE(_: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;

  const db = getSupabaseAdmin();

  // Try to list images for this post and delete them from storage (best-effort).
  const { data: files } = await db.storage
    .from(BLOG_IMAGES_BUCKET)
    .list(id, { limit: 200 });
  if (files && files.length) {
    const paths = files.map((f) => `${id}/${f.name}`);
    await db.storage.from(BLOG_IMAGES_BUCKET).remove(paths);
  }

  const { error } = await db.from("blog_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
