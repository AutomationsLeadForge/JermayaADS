"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useWindowManager } from "@/components/xp/WindowManager";
import {
  notifyAuthChanged,
  useAdminAuth,
} from "@/components/xp/admin/useAdminAuth";
import { RichEditor } from "@/components/xp/admin/RichEditor";
import type { AdminPost, PostStatus } from "@/types/blog";

type Tab = "list" | "editor" | "trash";

export function AdminPanelContent() {
  const { open, close } = useWindowManager();
  const { authenticated, refresh } = useAdminAuth();
  const [tab, setTab] = useState<Tab>("list");
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [trashed, setTrashed] = useState<AdminPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback((): Promise<void> => {
    if (!authenticated) return Promise.resolve();
    setLoading(true);
    return Promise.all([
      fetch("/api/admin/posts?view=active", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/admin/posts?view=trash", { cache: "no-store" }).then((r) => r.json()),
    ])
      .then(([a, t]) => {
        setPosts(a.posts ?? []);
        setTrashed(t.posts ?? []);
      })
      .finally(() => setLoading(false));
  }, [authenticated]);

  useEffect(() => {
    if (!authenticated) return;
    let cancelled = false;
    Promise.all([
      fetch("/api/admin/posts?view=active", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/admin/posts?view=trash", { cache: "no-store" }).then((r) => r.json()),
    ])
      .then(([a, t]) => {
        if (cancelled) return;
        setPosts(a.posts ?? []);
        setTrashed(t.posts ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [authenticated]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    notifyAuthChanged();
    setEditingId(null);
    close("admin");
  };

  const editingPost = useMemo(
    () => posts.find((p) => p.id === editingId) ?? null,
    [posts, editingId],
  );

  if (authenticated === null) {
    return <Shell>Checking credentials…</Shell>;
  }

  if (!authenticated) {
    return (
      <Shell>
        <div style={{ padding: 24, display: "grid", gap: 12, placeItems: "start" }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Admin area — locked 🔒</div>
          <p style={{ margin: 0, color: "#444", lineHeight: 1.5 }}>
            You need to sign in to manage posts.
          </p>
          <button
            type="button"
            onClick={() => {
              open("admin-login");
            }}
            style={barBtnStyle}
          >
            Open sign-in window
          </button>
          <button
            type="button"
            onClick={() => refresh()}
            style={{ ...barBtnStyle, marginTop: 4 }}
          >
            I just signed in — refresh
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <TabsBar
          tab={tab}
          onChange={(t) => {
            setTab(t);
            if (t !== "editor") setEditingId(null);
          }}
          counts={{ list: posts.length, trash: trashed.length }}
          onLogout={handleLogout}
          onReload={reload}
        />

        <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
          {tab === "list" && (
            <PostList
              posts={posts}
              loading={loading}
              onEdit={(id) => {
                setEditingId(id);
                setTab("editor");
              }}
              onNew={() => {
                setEditingId(null);
                setTab("editor");
              }}
              onTrash={async (id) => {
                if (!window.confirm("Move this post to the recycle bin?")) return;
                await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
                await reload();
              }}
            />
          )}
          {tab === "editor" && (
            <PostEditor
              post={editingPost}
              onSaved={async (saved) => {
                await reload();
                setEditingId(saved.id);
              }}
              onBack={() => {
                setEditingId(null);
                setTab("list");
              }}
            />
          )}
          {tab === "trash" && (
            <RecycleBin
              posts={trashed}
              loading={loading}
              onRestore={async (id) => {
                await fetch(`/api/admin/posts/${id}/restore`, { method: "POST" });
                await reload();
              }}
              onPurge={async (id) => {
                if (
                  !window.confirm(
                    "Permanently delete? This also removes any uploaded images and cannot be undone.",
                  )
                )
                  return;
                await fetch(`/api/admin/posts/${id}/purge`, { method: "DELETE" });
                await reload();
              }}
            />
          )}
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        margin: -14,
        height: "calc(100% + 28px)",
        minHeight: 420,
        background: "#ece9d8",
        fontFamily: "Tahoma, sans-serif",
        fontSize: 13,
        color: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

function TabsBar({
  tab,
  onChange,
  counts,
  onLogout,
  onReload,
}: {
  tab: Tab;
  onChange: (t: Tab) => void;
  counts: { list: number; trash: number };
  onLogout: () => void;
  onReload: () => void;
}) {
  const tabBtn = (id: Tab, label: string) => (
    <button
      type="button"
      onClick={() => onChange(id)}
      style={{
        padding: "6px 14px",
        border: "1px solid #919b9c",
        borderBottom: tab === id ? "1px solid #fff" : "1px solid #919b9c",
        background: tab === id ? "#fff" : "#d4d0c8",
        fontWeight: tab === id ? 700 : 400,
        marginRight: 2,
        cursor: "pointer",
        position: "relative",
        top: 1,
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "10px 10px 0",
        background: "#ece9d8",
        borderBottom: "1px solid #919b9c",
      }}
    >
      {tabBtn("list", `📄 Posts (${counts.list})`)}
      {tabBtn("editor", "✏️ Editor")}
      {tabBtn("trash", `🗑 Recycle Bin (${counts.trash})`)}
      <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
        <button type="button" onClick={onReload} style={barBtnStyle}>
          Refresh
        </button>
        <button type="button" onClick={onLogout} style={barBtnStyle}>
          Log out
        </button>
      </div>
    </div>
  );
}

function PostList({
  posts,
  loading,
  onEdit,
  onNew,
  onTrash,
}: {
  posts: AdminPost[];
  loading: boolean;
  onEdit: (id: string) => void;
  onNew: () => void;
  onTrash: (id: string) => void;
}) {
  return (
    <div style={{ padding: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 14 }}>
          {loading ? "Loading posts…" : `${posts.length} post${posts.length === 1 ? "" : "s"}`}
        </h2>
        <button type="button" onClick={onNew} style={primaryBtnStyle}>
          + New post
        </button>
      </div>

      {posts.length === 0 && !loading ? (
        <div
          style={{
            padding: 32,
            textAlign: "center",
            color: "#666",
            border: "1px dashed #bbb",
            background: "#fafafa",
          }}
        >
          No posts yet. Click <b>+ New post</b> to create your first one.
        </div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#d4d0c8" }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Updated</th>
              <th style={{ ...thStyle, width: 160 }} />
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>
                  <div style={{ fontWeight: 600 }}>{p.title}</div>
                  <div style={{ color: "#777", fontSize: 11 }}>/{p.slug}</div>
                </td>
                <td style={tdStyle}>
                  <StatusPill status={p.status} />
                </td>
                <td style={tdStyle}>
                  {new Date(p.updated_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  <button type="button" onClick={() => onEdit(p.id)} style={barBtnStyle}>
                    Edit
                  </button>{" "}
                  <button type="button" onClick={() => onTrash(p.id)} style={dangerBtnStyle}>
                    Trash
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: PostStatus }) {
  const color = status === "published" ? "#0a6b2a" : "#8b5a00";
  const bg = status === "published" ? "#dff3e3" : "#fff2d6";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        border: `1px solid ${color}`,
        color,
        background: bg,
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      {status}
    </span>
  );
}

function PostEditor({
  post,
  onSaved,
  onBack,
}: {
  post: AdminPost | null;
  onSaved: (post: AdminPost) => void;
  onBack: () => void;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [cover, setCover] = useState(post?.cover_image_url ?? "");
  const [html, setHtml] = useState(post?.content_html ?? "");
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState(post?.id ?? null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setTitle(post?.title ?? "");
    setSlug(post?.slug ?? "");
    setExcerpt(post?.excerpt ?? "");
    setCover(post?.cover_image_url ?? "");
    setHtml(post?.content_html ?? "");
    setSavedId(post?.id ?? null);
    setMessage(null);
  }, [post]);

  const save = async (status: PostStatus) => {
    if (!title.trim()) {
      setMessage("Title is required.");
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim() || undefined,
        excerpt,
        content_html: html,
        cover_image_url: cover.trim() || null,
        status,
      };
      const res = savedId
        ? await fetch(`/api/admin/posts/${savedId}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/posts", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMessage(j.error ?? "Save failed");
        return;
      }
      const json = (await res.json()) as { post: AdminPost };
      setSavedId(json.post.id);
      setSlug(json.post.slug);
      setMessage(
        status === "published" ? "Published ✔" : "Draft saved ✔",
      );
      onSaved(json.post);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 14, display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button type="button" onClick={onBack} style={barBtnStyle}>
          ← Back to list
        </button>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            onClick={() => save("draft")}
            disabled={saving}
            style={barBtnStyle}
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={() => save("published")}
            disabled={saving}
            style={primaryBtnStyle}
          >
            {post?.status === "published" ? "Update post" : "Publish"}
          </button>
        </div>
      </div>

      {message ? (
        <div
          style={{
            padding: "6px 10px",
            border: "1px solid #aec7ff",
            background: "#eaf2ff",
            color: "#0a3a8e",
          }}
        >
          {message}
        </div>
      ) : null}

      <label style={labelStyle}>
        <span>Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A punchy headline"
          style={inputStyle}
        />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <label style={labelStyle}>
          <span>Slug (optional)</span>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto-from-title"
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          <span>Cover image URL (optional)</span>
          <input
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="https://…"
            style={inputStyle}
          />
        </label>
      </div>

      <label style={labelStyle}>
        <span>Excerpt</span>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Short summary shown on the blog list"
          style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
        />
      </label>

      <div style={labelStyle}>
        <span>Body</span>
        <RichEditor
          value={html}
          onChange={setHtml}
          postId={savedId ?? undefined}
          placeholder="Write your post. Drag, paste or click the image button to add images inline."
        />
        {!savedId ? (
          <div style={{ fontSize: 11, color: "#777", marginTop: 4 }}>
            Tip: save a draft first — images you upload afterwards will be organised under this post.
          </div>
        ) : null}
      </div>
    </div>
  );
}

function RecycleBin({
  posts,
  loading,
  onRestore,
  onPurge,
}: {
  posts: AdminPost[];
  loading: boolean;
  onRestore: (id: string) => void;
  onPurge: (id: string) => void;
}) {
  return (
    <div style={{ padding: 14 }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 14 }}>
        {loading ? "Loading…" : `${posts.length} item${posts.length === 1 ? "" : "s"} in bin`}
      </h2>
      <p style={{ margin: "0 0 12px", color: "#666", fontSize: 12 }}>
        Items are kept for 30 days, then permanently deleted.
      </p>

      {posts.length === 0 && !loading ? (
        <div
          style={{
            padding: 32,
            textAlign: "center",
            color: "#666",
            border: "1px dashed #bbb",
            background: "#fafafa",
          }}
        >
          The recycle bin is empty.
        </div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#d4d0c8" }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Deleted</th>
              <th style={{ ...thStyle, width: 220 }} />
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>
                  <div style={{ fontWeight: 600 }}>{p.title}</div>
                  <div style={{ color: "#777", fontSize: 11 }}>/{p.slug}</div>
                </td>
                <td style={tdStyle}>
                  {p.deleted_at
                    ? new Date(p.deleted_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  <button type="button" onClick={() => onRestore(p.id)} style={barBtnStyle}>
                    Restore
                  </button>{" "}
                  <button type="button" onClick={() => onPurge(p.id)} style={dangerBtnStyle}>
                    Delete forever
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ---------- shared styles ---------- */
const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  border: "1px solid #d4d0c8",
};
const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "6px 8px",
  borderBottom: "1px solid #b8b4a8",
  fontSize: 12,
  fontWeight: 700,
};
const tdStyle: React.CSSProperties = {
  padding: "8px",
  verticalAlign: "middle",
};
const labelStyle: React.CSSProperties = {
  display: "grid",
  gap: 4,
  fontWeight: 600,
};
const inputStyle: React.CSSProperties = {
  padding: "6px 8px",
  border: "1px solid #7f9db9",
  fontFamily: "Tahoma, sans-serif",
  fontSize: 13,
  background: "#fff",
  fontWeight: 400,
};
const barBtnStyle: React.CSSProperties = {
  padding: "4px 12px",
  border: "1px solid #7a7a7a",
  background:
    "linear-gradient(to bottom, #fefefe 0%, #e5e5e5 45%, #d2d2d2 55%, #eaeaea 100%)",
  fontFamily: "Tahoma, sans-serif",
  fontSize: 12,
  cursor: "pointer",
};
const primaryBtnStyle: React.CSSProperties = {
  ...barBtnStyle,
  border: "1px solid #0a3a8e",
  background:
    "linear-gradient(to bottom, #5a9cff 0%, #1a66d6 45%, #0a4fb5 55%, #1a66d6 100%)",
  color: "#fff",
  fontWeight: 700,
};
const dangerBtnStyle: React.CSSProperties = {
  ...barBtnStyle,
  border: "1px solid #8a1a1a",
  color: "#7a0000",
};
