"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog";
import { NotepadIcon } from "@/components/xp/PixelIcons";
import type { PublicPost } from "@/types/blog";

const PIXEL_FONT = 'var(--font-pixel), "Pixelify Sans", "Tahoma", sans-serif';
const PAGE_SIZE = 6;

/** A post shown in the feed — unifies the hard-coded archive with DB-backed
 *  posts authored via the admin panel. `inlineHtml` is set for DB posts so
 *  the detail view can skip the per-slug JSON fetch. */
type DisplayPost = BlogPost & { isNew?: boolean; inlineHtml?: string };

function toDisplayPost(p: PublicPost): DisplayPost {
  const isoDate = (p.published_at ?? "").slice(0, 10) || "1970-01-01";
  return {
    slug: p.slug,
    title: p.title,
    date: isoDate,
    excerpt: p.excerpt ?? "",
    heroImage: p.cover_image_url ?? null,
    url: `/blog/${p.slug}`,
    isNew: true,
    inlineHtml: p.content_html ?? "",
  };
}

/* =========================================================
   Body cache + on-demand fetch
   ========================================================= */
const bodyCache = new Map<string, string>();
const inFlight = new Map<string, Promise<string>>();

function fetchBody(slug: string): Promise<string> {
  const cached = bodyCache.get(slug);
  if (cached !== undefined) return Promise.resolve(cached);
  const existing = inFlight.get(slug);
  if (existing) return existing;
  const p = fetch(`/blog/${slug}.json`, { cache: "force-cache" })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<{ slug: string; bodyHtml: string }>;
    })
    .then((data) => {
      bodyCache.set(slug, data.bodyHtml);
      inFlight.delete(slug);
      return data.bodyHtml;
    })
    .catch((err) => {
      inFlight.delete(slug);
      throw err;
    });
  inFlight.set(slug, p);
  return p;
}

function prefetchBody(slug: string) {
  void fetchBody(slug).catch(() => {});
}

/* =========================================================
   Utils
   ========================================================= */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* =========================================================
   Shared bits
   ========================================================= */
function PaperHeader({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "10px 16px",
        background: "#c62727",
        color: "#fffbe6",
        fontFamily: PIXEL_FONT,
        fontSize: 14,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        borderBottom: "2px solid #6d1212",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <span>{title}</span>
      {right}
    </div>
  );
}

/* =========================================================
   PostCard — memoized + plain <img> + hover prefetch
   ========================================================= */
const PostCard = memo(function PostCard({
  post,
  onOpen,
  onHoverPrefetch,
}: {
  post: DisplayPost;
  onOpen: () => void;
  onHoverPrefetch: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => onHoverPrefetch(post.slug)}
      onFocus={() => onHoverPrefetch(post.slug)}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "grid",
        gridTemplateColumns: "88px 1fr",
        gap: 12,
        padding: "14px 16px 14px 32px",
        borderBottom: "1px dashed #c8c2a8",
        position: "relative",
        background:
          "repeating-linear-gradient(to bottom, transparent 0 23px, #d6e4fb 23px 24px)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "#fff6c5";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background =
          "repeating-linear-gradient(to bottom, transparent 0 23px, #d6e4fb 23px 24px)";
      }}
    >
      {/* Red margin line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 24,
          top: 0,
          bottom: 0,
          width: 1,
          background: "#c62727",
        }}
      />

      {/* Thumbnail */}
      <div
        className="xp-bevel-sunken"
        style={{
          width: 88,
          height: 72,
          background: "#ece9d8",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
      >
        {post.heroImage ? (
          <img
            src={post.heroImage}
            alt=""
            width={88}
            height={72}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <NotepadIcon size={48} className="xp-icon-pixel" />
        )}
      </div>

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: PIXEL_FONT,
            fontSize: 12,
            color: "#b35900",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 2,
          }}
        >
          {formatDate(post.date)}
          {post.isNew ? (
            <span
              style={{
                marginLeft: 8,
                padding: "1px 6px",
                background: "#0a3a8e",
                color: "#fffbe6",
                fontSize: 10,
                letterSpacing: "0.04em",
              }}
            >
              NEW
            </span>
          ) : null}
        </div>
        <div
          style={{
            fontFamily: "Tahoma, sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "#0a3a8e",
            textDecoration: "underline",
            textDecorationThickness: "1px",
            lineHeight: 1.25,
            marginBottom: 4,
          }}
        >
          {post.title}
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: "Tahoma, sans-serif",
            fontSize: 13,
            color: "#1a1a1a",
            lineHeight: "24px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>
      </div>
    </button>
  );
});

/* =========================================================
   Pager
   ========================================================= */
function Pager({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  const btn = (disabled: boolean): React.CSSProperties => ({
    fontFamily: PIXEL_FONT,
    fontSize: 12,
    padding: "4px 12px",
    background: "#ece9d8",
    color: "#000",
    border: "1px solid",
    borderTopColor: "#fff",
    borderLeftColor: "#fff",
    borderRightColor: "#808080",
    borderBottomColor: "#808080",
    cursor: disabled ? "default" : "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    opacity: disabled ? 0.5 : 1,
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        padding: "10px 16px",
        background: "#ece9d8",
        borderTop: "1px solid #c8c2a8",
        borderBottom: "1px solid #c8c2a8",
      }}
    >
      <button
        type="button"
        style={btn(page === 0)}
        onClick={() => page > 0 && onChange(page - 1)}
        disabled={page === 0}
      >
        ◀ Prev page
      </button>

      <div
        role="tablist"
        aria-label="Go to page"
        style={{ display: "flex", gap: 6, alignItems: "center" }}
      >
        {Array.from({ length: totalPages }, (_, i) => {
          const active = i === page;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Page ${i + 1}`}
              onClick={() => onChange(i)}
              style={{
                width: 22,
                height: 22,
                padding: 0,
                fontFamily: PIXEL_FONT,
                fontSize: 11,
                color: active ? "#fff" : "#000",
                background: active ? "#0a3a8e" : "#fff",
                border: "1px solid #000",
                boxShadow: active
                  ? "inset 1px 1px 0 #4477d8"
                  : "inset 1px 1px 0 #ece9d8",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        style={btn(page === totalPages - 1)}
        onClick={() => page < totalPages - 1 && onChange(page + 1)}
        disabled={page === totalPages - 1}
      >
        Next page ▶
      </button>
    </div>
  );
}

/* =========================================================
   Detail view — fetches bodyHtml on mount
   ========================================================= */
function DetailHeader({
  onBack,
  index,
  total,
  onPrev,
  onNext,
}: {
  onBack: () => void;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const navBtn: React.CSSProperties = {
    fontFamily: PIXEL_FONT,
    fontSize: 12,
    padding: "4px 10px",
    background: "#ece9d8",
    color: "#000",
    border: "1px solid",
    borderTopColor: "#fff",
    borderLeftColor: "#fff",
    borderRightColor: "#808080",
    borderBottomColor: "#808080",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderBottom: "1px solid #c8c2a8",
        background: "#ece9d8",
      }}
    >
      <button type="button" style={navBtn} onClick={onBack}>
        ← All posts
      </button>
      <div style={{ flex: 1, textAlign: "center" }}>
        <span
          style={{
            fontFamily: "Tahoma, sans-serif",
            fontSize: 12,
            color: "#3c3c3c",
          }}
        >
          Post {index + 1} of {total}
        </span>
      </div>
      <button
        type="button"
        style={navBtn}
        onClick={onPrev}
        disabled={index === 0}
        aria-label="Previous post"
      >
        ◀ Prev
      </button>
      <button
        type="button"
        style={navBtn}
        onClick={onNext}
        disabled={index === total - 1}
        aria-label="Next post"
      >
        Next ▶
      </button>
    </div>
  );
}

function PostDetail({
  post,
  onBack,
  index,
  total,
  onPrev,
  onNext,
}: {
  post: DisplayPost;
  onBack: () => void;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [body, setBody] = useState<string | null>(
    () => post.inlineHtml ?? bodyCache.get(post.slug) ?? null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // DB-backed posts ship their HTML inline — no fetch needed.
    if (post.inlineHtml) return;
    // useState initializer already hydrated `body` from cache on mount.
    // We rely on the caller keying <PostDetail key={slug} /> so that slug
    // changes remount and re-run the initializer — no sync setState here.
    if (body !== null) return;
    let cancelled = false;
    fetchBody(post.slug)
      .then((html) => {
        if (!cancelled) setBody(html);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
    // Only rerun when slug changes — `body` is the initial-mount seed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.slug]);

  return (
    <div style={{ display: "grid", gap: 0 }}>
      <DetailHeader
        onBack={onBack}
        index={index}
        total={total}
        onPrev={onPrev}
        onNext={onNext}
      />

      <article style={{ padding: "18px 22px 28px", background: "#fffbe6" }}>
        {post.heroImage ? (
          <div
            style={{
              border: "2px solid #000",
              boxShadow: "4px 4px 0 #000",
              marginBottom: 18,
              background: "#fff",
              aspectRatio: "16 / 9",
              overflow: "hidden",
            }}
          >
            <img
              src={post.heroImage}
              alt=""
              loading="eager"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ) : null}

        <div
          style={{
            fontFamily: PIXEL_FONT,
            fontSize: 13,
            color: "#b35900",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          {formatDate(post.date)}
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: PIXEL_FONT,
            fontSize: 28,
            color: "#0a3a8e",
            lineHeight: 1.15,
            letterSpacing: "0.01em",
            marginBottom: 14,
          }}
        >
          {post.title}
        </h1>

        {body ? (
          <div
            className="xp-prose"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : error ? (
          <div
            style={{
              padding: 14,
              border: "1px solid #c8c2a8",
              background: "#fff",
              fontFamily: "Tahoma, sans-serif",
              fontSize: 13,
              color: "#8a1111",
            }}
          >
            Couldn&apos;t load this post ({error}). Try again in a moment.
          </div>
        ) : (
          <div
            style={{
              padding: "20px 14px",
              fontFamily: PIXEL_FONT,
              fontSize: 14,
              color: "#3c3c3c",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Loading post<span className="xp-term-blink">_</span>
          </div>
        )}

        {body ? (
          <div
            style={{
              marginTop: 28,
              padding: "12px 14px",
              background: "#ece9d8",
              border: "1px solid #c8c2a8",
              fontFamily: "Tahoma, sans-serif",
              fontSize: 12,
              color: "#3c3c3c",
              textAlign: "center",
            }}
          >
            — End of post —
          </div>
        ) : null}
      </article>
    </div>
  );
}

/* =========================================================
   Top-level list / detail switcher — all posts, one feed
   ========================================================= */
const ARCHIVE_POSTS: DisplayPost[] = BLOG_POSTS.map((p) => ({ ...p }));

export function BlogContent() {
  const [dbPosts, setDbPosts] = useState<DisplayPost[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/posts", { cache: "no-store" })
      .then((r) => r.json() as Promise<{ posts?: PublicPost[]; error?: string }>)
      .then((json) => {
        if (cancelled) return;
        setDbPosts((json.posts ?? []).map(toDisplayPost));
      })
      .catch(() => {
        if (!cancelled) setDbPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Newest first — DB posts and archive posts interleave by date.
  const posts = useMemo<DisplayPost[]>(() => {
    const merged = [...(dbPosts ?? []), ...ARCHIVE_POSTS];
    merged.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    return merged;
  }, [dbPosts]);

  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeIndex = activeSlug
    ? posts.findIndex((p) => p.slug === activeSlug)
    : -1;
  const active = activeIndex >= 0 ? posts[activeIndex] : null;

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const pageStart = page * PAGE_SIZE;
  const visible = posts.slice(pageStart, pageStart + PAGE_SIZE);

  const handleHoverPrefetch = useCallback((slug: string) => {
    prefetchBody(slug);
  }, []);

  const handleOpen = useCallback((slug: string) => {
    setActiveSlug(slug);
  }, []);

  // Reset scroll on view/page change
  useEffect(() => {
    if (!scrollRef.current) return;
    const parent = scrollRef.current.closest(".xp-window-body");
    if (parent) parent.scrollTop = 0;
  }, [activeSlug, page]);

  // Prefetch adjacent posts in detail view, so Prev/Next feels instant
  useEffect(() => {
    if (!active) return;
    if (activeIndex > 0) prefetchBody(posts[activeIndex - 1].slug);
    if (activeIndex < posts.length - 1) prefetchBody(posts[activeIndex + 1].slug);
  }, [active, activeIndex, posts]);

  // Keyboard: detail nav + list pagination
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active) {
        if (e.key === "Escape") {
          setActiveSlug(null);
        } else if (e.key === "ArrowLeft" && activeIndex > 0) {
          setActiveSlug(posts[activeIndex - 1].slug);
        } else if (e.key === "ArrowRight" && activeIndex < posts.length - 1) {
          setActiveSlug(posts[activeIndex + 1].slug);
        }
        return;
      }
      if (e.key === "ArrowLeft" && page > 0) {
        setPage((p) => p - 1);
      } else if (e.key === "ArrowRight" && page < totalPages - 1) {
        setPage((p) => p + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, activeIndex, posts, page, totalPages]);

  return (
    <div
      ref={scrollRef}
      style={{
        display: "grid",
        gap: 0,
        background: "#fffbe6",
        marginInline: -14,
        marginBlock: -14,
        border: "1px solid #c8c2a8",
      }}
    >
      <PaperHeader
        title="Jermaya's Notepad — Blog Feed"
        right={
          <span
            style={{
              fontFamily: "Tahoma, sans-serif",
              fontSize: 11,
              opacity: 0.9,
              textTransform: "none",
              letterSpacing: "0.02em",
            }}
          >
            {active
              ? `${posts.length} entries`
              : `${posts.length} entries · page ${page + 1} of ${totalPages}`}
          </span>
        }
      />
      {active ? (
        <PostDetail
          key={active.slug}
          post={active}
          index={activeIndex}
          total={posts.length}
          onBack={() => setActiveSlug(null)}
          onPrev={() =>
            activeIndex > 0 && setActiveSlug(posts[activeIndex - 1].slug)
          }
          onNext={() =>
            activeIndex < posts.length - 1 &&
            setActiveSlug(posts[activeIndex + 1].slug)
          }
        />
      ) : (
        <>
          {visible.map((p) => (
            <PostCard
              key={p.slug}
              post={p}
              onOpen={() => handleOpen(p.slug)}
              onHoverPrefetch={handleHoverPrefetch}
            />
          ))}
          {totalPages > 1 ? (
            <Pager page={page} totalPages={totalPages} onChange={setPage} />
          ) : null}
        </>
      )}

      <div
        style={{
          padding: "8px 16px",
          background: "#ece9d8",
          borderTop: "1px solid #c8c2a8",
          fontFamily: "Tahoma, sans-serif",
          fontSize: 11,
          color: "#3c3c3c",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>
          {active
            ? "Reading inside Notepad — external links open in a new tab."
            : `Showing ${pageStart + 1}–${Math.min(
                pageStart + PAGE_SIZE,
                posts.length,
              )} of ${posts.length}. Click any post to open.`}
        </span>
        <span style={{ color: "#3c3c3c" }}>
          Tip: {active ? "← / → to flip · ESC for list" : "← / → to change page"}
        </span>
      </div>
    </div>
  );
}
