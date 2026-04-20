import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, content_html, cover_image_url, published_at")
    .eq("status", "published")
    .is("deleted_at", null)
    .order("published_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data ?? [] });
}
