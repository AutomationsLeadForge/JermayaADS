// Hardcoded-archive blog posts — intentionally empty.
// All blog content now comes from the admin-managed `blog_posts` Supabase table
// (create/edit via the Admin Panel → Blog tab).
// NOTE: scripts/build-blog-data.mjs will repopulate this array from
// docs/research/blog/posts/*.json — don't run it unless you want the old
// jermayads.nl archive back.

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO YYYY-MM-DD */
  date: string;
  excerpt: string;
  /** Local path under public/, or null if no hero. */
  heroImage: string | null;
  /** Original post URL on jermayads.nl — kept for reference only. */
  url: string;
}

export const BLOG_POSTS: BlogPost[] = [];
