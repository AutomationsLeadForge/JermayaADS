export type PostStatus = "draft" | "published";

export interface AdminPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  cover_image_url: string | null;
  status: PostStatus;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  deleted_at: string | null;
}

export interface PublicPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  cover_image_url: string | null;
  published_at: string;
}

export interface PostInput {
  title: string;
  slug?: string;
  excerpt?: string;
  content_html?: string;
  cover_image_url?: string | null;
  status?: PostStatus;
}
