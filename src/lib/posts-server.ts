import { supabase } from "@/lib/supabase";
import type { PublicPost } from "@/types/blog";

export async function fetchPublishedPost(slug: string): Promise<PublicPost | null> {
  const { data } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, content_html, cover_image_url, published_at")
    .eq("slug", slug)
    .eq("status", "published")
    .is("deleted_at", null)
    .maybeSingle();
  return (data as PublicPost | null) ?? null;
}

export async function fetchPublishedPosts(): Promise<PublicPost[]> {
  const { data } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, content_html, cover_image_url, published_at")
    .eq("status", "published")
    .is("deleted_at", null)
    .order("published_at", { ascending: false });
  return (data as PublicPost[] | null) ?? [];
}
