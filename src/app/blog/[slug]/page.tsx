import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchPublishedPost } from "@/lib/posts-server";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPublishedPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Jermaya Leijen`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
      type: "article",
      publishedTime: post.published_at,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPublishedPost(slug);
  if (!post) notFound();

  return (
    <main
      style={{
        maxWidth: 780,
        margin: "0 auto",
        padding: "64px 24px 120px",
        fontFamily: "Tahoma, sans-serif",
        color: "#1a1a1a",
      }}
    >
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginBottom: 32,
          fontSize: 13,
          color: "#0a3a8e",
        }}
      >
        ← Back to JermayaOS
      </Link>

      <p
        style={{
          fontSize: 12,
          color: "#b35900",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          margin: 0,
        }}
      >
        {formatDate(post.published_at)}
      </p>

      <h1
        style={{
          fontSize: 40,
          lineHeight: 1.15,
          margin: "12px 0 16px",
          color: "#0a3a8e",
        }}
      >
        {post.title}
      </h1>

      {post.excerpt ? (
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.5,
            color: "#444",
            margin: "0 0 32px",
          }}
        >
          {post.excerpt}
        </p>
      ) : null}

      {post.cover_image_url ? (
        <img
          src={post.cover_image_url}
          alt=""
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 4,
            marginBottom: 32,
          }}
        />
      ) : null}

      <article
        className="blog-post-body"
        dangerouslySetInnerHTML={{ __html: post.content_html }}
        style={{ fontSize: 16, lineHeight: 1.7 }}
      />
    </main>
  );
}
