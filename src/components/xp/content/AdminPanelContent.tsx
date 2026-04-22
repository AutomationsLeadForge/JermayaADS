"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useWindowManager } from "@/components/xp/WindowManager";
import {
  notifyAuthChanged,
  useAdminAuth,
} from "@/components/xp/admin/useAdminAuth";
import { RichEditor } from "@/components/xp/admin/RichEditor";
import { ProjectEditor } from "@/components/xp/admin/ProjectEditor";
import { AboutEditor } from "@/components/xp/admin/AboutEditor";
import { ReadmeEditor } from "@/components/xp/admin/ReadmeEditor";
import { renderWorkIcon } from "@/components/xp/admin/WorkIconPicker";
import type { AdminPost, PostStatus } from "@/types/blog";
import type { AdminWorkProject } from "@/types/work";

type Section = "blog" | "projects" | "about" | "readme";
type BlogTab = "list" | "editor" | "trash";
type ProjectTab = "list" | "editor" | "trash";

export function AdminPanelContent() {
  const { open, close } = useWindowManager();
  const { authenticated, refresh } = useAdminAuth();

  const [section, setSection] = useState<Section>("blog");

  /* ------------------------ BLOG STATE ------------------------ */
  const [blogTab, setBlogTab] = useState<BlogTab>("list");
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [trashedPosts, setTrashedPosts] = useState<AdminPost[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(true);

  /* ------------------------ PROJECTS STATE ------------------------ */
  const [projectTab, setProjectTab] = useState<ProjectTab>("list");
  const [projects, setProjects] = useState<AdminWorkProject[]>([]);
  const [trashedProjects, setTrashedProjects] = useState<AdminWorkProject[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const reloadBlog = useCallback((): Promise<void> => {
    if (!authenticated) return Promise.resolve();
    setLoadingPosts(true);
    return Promise.all([
      fetch("/api/admin/posts?view=active", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/admin/posts?view=trash", { cache: "no-store" }).then((r) => r.json()),
    ])
      .then(([a, t]) => {
        setPosts(a.posts ?? []);
        setTrashedPosts(t.posts ?? []);
      })
      .finally(() => setLoadingPosts(false));
  }, [authenticated]);

  const reloadProjects = useCallback((): Promise<void> => {
    if (!authenticated) return Promise.resolve();
    setLoadingProjects(true);
    return Promise.all([
      fetch("/api/admin/work-projects?view=active", { cache: "no-store" }).then(
        (r) => r.json(),
      ),
      fetch("/api/admin/work-projects?view=trash", { cache: "no-store" }).then(
        (r) => r.json(),
      ),
    ])
      .then(([a, t]) => {
        setProjects(a.projects ?? []);
        setTrashedProjects(t.projects ?? []);
      })
      .finally(() => setLoadingProjects(false));
  }, [authenticated]);

  useEffect(() => {
    if (!authenticated) return;
    let cancelled = false;
    Promise.all([
      fetch("/api/admin/posts?view=active", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/admin/posts?view=trash", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/admin/work-projects?view=active", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/admin/work-projects?view=trash", { cache: "no-store" }).then((r) => r.json()),
    ])
      .then(([a, t, pa, pt]) => {
        if (cancelled) return;
        setPosts(a.posts ?? []);
        setTrashedPosts(t.posts ?? []);
        setProjects(pa.projects ?? []);
        setTrashedProjects(pt.projects ?? []);
      })
      .finally(() => {
        if (cancelled) return;
        setLoadingPosts(false);
        setLoadingProjects(false);
      });
    return () => {
      cancelled = true;
    };
  }, [authenticated]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    notifyAuthChanged();
    setEditingPostId(null);
    setEditingProjectId(null);
    close("admin");
  };

  const editingPost = useMemo(
    () => posts.find((p) => p.id === editingPostId) ?? null,
    [posts, editingPostId],
  );
  const editingProject = useMemo(
    () => projects.find((p) => p.id === editingProjectId) ?? null,
    [projects, editingProjectId],
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
            You need to sign in to manage content.
          </p>
          <button
            type="button"
            onClick={() => open("admin-login")}
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
        <SectionBar
          section={section}
          onChange={(s) => {
            setSection(s);
            setEditingPostId(null);
            setEditingProjectId(null);
            if (s === "blog") setBlogTab("list");
            if (s === "projects") setProjectTab("list");
          }}
          counts={{
            blog: posts.length,
            projects: projects.length,
          }}
          onLogout={handleLogout}
          onReload={() => {
            if (section === "blog") reloadBlog();
            else if (section === "projects") reloadProjects();
          }}
        />

        <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>
          {section === "blog" ? (
            <BlogSection
              tab={blogTab}
              onTab={setBlogTab}
              posts={posts}
              trashed={trashedPosts}
              loading={loadingPosts}
              editingPost={editingPost}
              onEdit={(id) => {
                setEditingPostId(id);
                setBlogTab("editor");
              }}
              onNew={() => {
                setEditingPostId(null);
                setBlogTab("editor");
              }}
              onTrash={async (id) => {
                if (!window.confirm("Move this post to the recycle bin?")) return;
                await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
                await reloadBlog();
              }}
              onRestore={async (id) => {
                await fetch(`/api/admin/posts/${id}/restore`, { method: "POST" });
                await reloadBlog();
              }}
              onPurge={async (id) => {
                if (
                  !window.confirm(
                    "Permanently delete? This also removes any uploaded images and cannot be undone.",
                  )
                )
                  return;
                await fetch(`/api/admin/posts/${id}/purge`, { method: "DELETE" });
                await reloadBlog();
              }}
              onSaved={async (saved) => {
                await reloadBlog();
                setEditingPostId(saved.id);
              }}
              onBackToList={() => {
                setEditingPostId(null);
                setBlogTab("list");
              }}
            />
          ) : null}

          {section === "projects" ? (
            <ProjectsSection
              tab={projectTab}
              onTab={setProjectTab}
              projects={projects}
              trashed={trashedProjects}
              loading={loadingProjects}
              editingProject={editingProject}
              onEdit={(id) => {
                setEditingProjectId(id);
                setProjectTab("editor");
              }}
              onNew={() => {
                setEditingProjectId(null);
                setProjectTab("editor");
              }}
              onTrash={async (id) => {
                if (!window.confirm("Move this project to the recycle bin?")) return;
                await fetch(`/api/admin/work-projects/${id}`, { method: "DELETE" });
                await reloadProjects();
              }}
              onRestore={async (id) => {
                await fetch(`/api/admin/work-projects/${id}/restore`, {
                  method: "POST",
                });
                await reloadProjects();
              }}
              onPurge={async (id) => {
                if (
                  !window.confirm(
                    "Permanently delete? This also removes any uploaded images and cannot be undone.",
                  )
                )
                  return;
                await fetch(`/api/admin/work-projects/${id}/purge`, {
                  method: "DELETE",
                });
                await reloadProjects();
              }}
              onSaved={async (saved) => {
                await reloadProjects();
                setEditingProjectId(saved.id);
              }}
              onBackToList={() => {
                setEditingProjectId(null);
                setProjectTab("list");
              }}
            />
          ) : null}

          {section === "about" ? <AboutEditor /> : null}
          {section === "readme" ? <ReadmeEditor /> : null}
        </div>
      </div>
    </Shell>
  );
}

/* ================================================================
   Shell & top-level section bar
   ================================================================ */
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

function SectionBar({
  section,
  onChange,
  counts,
  onLogout,
  onReload,
}: {
  section: Section;
  onChange: (s: Section) => void;
  counts: { blog: number; projects: number };
  onLogout: () => void;
  onReload: () => void;
}) {
  const tab = (id: Section, label: string) => (
    <button
      key={id}
      type="button"
      onClick={() => onChange(id)}
      style={{
        padding: "8px 16px",
        border: "1px solid #7a7a7a",
        borderBottomColor: section === id ? "#fff" : "#7a7a7a",
        background: section === id
          ? "#fff"
          : "linear-gradient(to bottom, #fefefe 0%, #e5e5e5 45%, #d2d2d2 55%, #eaeaea 100%)",
        fontWeight: section === id ? 700 : 500,
        fontSize: 13,
        color: section === id ? "#0a3a8e" : "#1a1a1a",
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
        gap: 4,
        padding: "10px 10px 0",
        background: "#ece9d8",
        borderBottom: "1px solid #919b9c",
        flexWrap: "wrap",
      }}
    >
      {tab("blog", `📰 Blog (${counts.blog})`)}
      {tab("projects", `🗂 Projects (${counts.projects})`)}
      {tab("about", "👤 About")}
      {tab("readme", "📄 Readme")}
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

/* ================================================================
   BLOG SECTION
   ================================================================ */
function BlogSection({
  tab,
  onTab,
  posts,
  trashed,
  loading,
  editingPost,
  onEdit,
  onNew,
  onTrash,
  onRestore,
  onPurge,
  onSaved,
  onBackToList,
}: {
  tab: BlogTab;
  onTab: (t: BlogTab) => void;
  posts: AdminPost[];
  trashed: AdminPost[];
  loading: boolean;
  editingPost: AdminPost | null;
  onEdit: (id: string) => void;
  onNew: () => void;
  onTrash: (id: string) => void;
  onRestore: (id: string) => void;
  onPurge: (id: string) => void;
  onSaved: (post: AdminPost) => void;
  onBackToList: () => void;
}) {
  return (
    <div>
      <SubTabs
        value={tab}
        onChange={onTab}
        tabs={[
          { id: "list", label: `📄 Posts (${posts.length})` },
          { id: "editor", label: "✏️ Editor" },
          { id: "trash", label: `🗑 Recycle Bin (${trashed.length})` },
        ]}
      />
      {tab === "list" && (
        <PostList
          posts={posts}
          loading={loading}
          onEdit={onEdit}
          onNew={onNew}
          onTrash={onTrash}
        />
      )}
      {tab === "editor" && (
        <PostEditor
          post={editingPost}
          onSaved={onSaved}
          onBack={onBackToList}
          onDelete={
            editingPost
              ? async () => {
                  onTrash(editingPost.id);
                  onBackToList();
                }
              : undefined
          }
        />
      )}
      {tab === "trash" && (
        <RecycleBin
          items={trashed}
          loading={loading}
          onRestore={onRestore}
          onPurge={onPurge}
          labelFor={(p) => ({ title: p.title, sub: `/${p.slug}`, deletedAt: p.deleted_at })}
        />
      )}
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
          {loading
            ? "Loading posts…"
            : `${posts.length} post${posts.length === 1 ? "" : "s"}`}
        </h2>
        <button type="button" onClick={onNew} style={primaryBtnStyle}>
          + New post
        </button>
      </div>

      {posts.length === 0 && !loading ? (
        <EmptyHint>
          No posts yet. Click <b>+ New post</b> to create your first one.
        </EmptyHint>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#d4d0c8" }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Updated</th>
              <th style={{ ...thStyle, width: 200 }} />
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
                  <button
                    type="button"
                    onClick={() => onTrash(p.id)}
                    style={dangerFilledBtnStyle}
                    title="Move to Recycle Bin"
                  >
                    🗑 Delete
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
  onDelete,
}: {
  post: AdminPost | null;
  onSaved: (post: AdminPost) => void;
  onBack: () => void;
  onDelete?: () => void;
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
      setMessage(status === "published" ? "Published ✔" : "Draft saved ✔");
      onSaved(json.post);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 14, display: "grid", gap: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        <button type="button" onClick={onBack} style={barBtnStyle}>
          ← Back to list
        </button>
        <div style={{ display: "flex", gap: 6 }}>
          {onDelete && savedId ? (
            <button
              type="button"
              onClick={onDelete}
              style={dangerFilledBtnStyle}
              title="Move to Recycle Bin"
            >
              🗑 Delete
            </button>
          ) : null}
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

/* ================================================================
   PROJECTS SECTION
   ================================================================ */
function ProjectsSection({
  tab,
  onTab,
  projects,
  trashed,
  loading,
  editingProject,
  onEdit,
  onNew,
  onTrash,
  onRestore,
  onPurge,
  onSaved,
  onBackToList,
}: {
  tab: ProjectTab;
  onTab: (t: ProjectTab) => void;
  projects: AdminWorkProject[];
  trashed: AdminWorkProject[];
  loading: boolean;
  editingProject: AdminWorkProject | null;
  onEdit: (id: string) => void;
  onNew: () => void;
  onTrash: (id: string) => void;
  onRestore: (id: string) => void;
  onPurge: (id: string) => void;
  onSaved: (p: AdminWorkProject) => void;
  onBackToList: () => void;
}) {
  return (
    <div>
      <SubTabs
        value={tab}
        onChange={onTab}
        tabs={[
          { id: "list", label: `🗂 Projects (${projects.length})` },
          { id: "editor", label: "✏️ Editor" },
          { id: "trash", label: `🗑 Recycle Bin (${trashed.length})` },
        ]}
      />
      {tab === "list" && (
        <ProjectList
          projects={projects}
          loading={loading}
          onEdit={onEdit}
          onNew={onNew}
          onTrash={onTrash}
        />
      )}
      {tab === "editor" && (
        <div>
          <div
            style={{
              padding: "10px 14px 0",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {editingProject ? (
              <button
                type="button"
                onClick={() => {
                  onTrash(editingProject.id);
                  onBackToList();
                }}
                style={dangerFilledBtnStyle}
                title="Move to Recycle Bin"
              >
                🗑 Delete
              </button>
            ) : null}
          </div>
          <ProjectEditor
            project={editingProject}
            onSaved={onSaved}
            onBack={onBackToList}
          />
        </div>
      )}
      {tab === "trash" && (
        <RecycleBin
          items={trashed}
          loading={loading}
          onRestore={onRestore}
          onPurge={onPurge}
          labelFor={(p) => ({ title: p.title, sub: `/${p.slug}`, deletedAt: p.deleted_at })}
        />
      )}
    </div>
  );
}

function ProjectList({
  projects,
  loading,
  onEdit,
  onNew,
  onTrash,
}: {
  projects: AdminWorkProject[];
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
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 14 }}>
          {loading
            ? "Loading projects…"
            : `${projects.length} project${projects.length === 1 ? "" : "s"}`}
        </h2>
        <button type="button" onClick={onNew} style={primaryBtnStyle}>
          + New project
        </button>
      </div>

      {projects.length === 0 && !loading ? (
        <EmptyHint>
          No DB-managed projects yet. The public My Work window will show the
          built-in project list until you add one here.
          <br />
          Click <b>+ New project</b> to create one.
        </EmptyHint>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#d4d0c8" }}>
              <th style={{ ...thStyle, width: 48 }} />
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Outcome</th>
              <th style={{ ...thStyle, width: 200 }} />
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  {renderWorkIcon(p.icon_key, 22)}
                </td>
                <td style={tdStyle}>
                  <div style={{ fontWeight: 600 }}>
                    {p.number ? `${p.number} — ` : ""}
                    {p.title}
                  </div>
                  <div style={{ color: "#777", fontSize: 11 }}>
                    /{p.slug} {p.featured ? "· featured" : ""}
                  </div>
                </td>
                <td style={tdStyle}>{p.category_label || p.category}</td>
                <td style={tdStyle}>
                  <span style={{ fontWeight: 700 }}>{p.outcome_metric}</span>{" "}
                  <span style={{ color: "#555" }}>{p.outcome_label}</span>
                </td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  <button type="button" onClick={() => onEdit(p.id)} style={barBtnStyle}>
                    Edit
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() => onTrash(p.id)}
                    style={dangerFilledBtnStyle}
                    title="Move to Recycle Bin"
                  >
                    🗑 Delete
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

/* ================================================================
   Shared RecycleBin for both posts and projects
   ================================================================ */
function RecycleBin<T extends { id: string; deleted_at: string | null }>({
  items,
  loading,
  onRestore,
  onPurge,
  labelFor,
}: {
  items: T[];
  loading: boolean;
  onRestore: (id: string) => void;
  onPurge: (id: string) => void;
  labelFor: (item: T) => { title: string; sub: string; deletedAt: string | null };
}) {
  return (
    <div style={{ padding: 14 }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 14 }}>
        {loading
          ? "Loading…"
          : `${items.length} item${items.length === 1 ? "" : "s"} in bin`}
      </h2>
      <p style={{ margin: "0 0 12px", color: "#666", fontSize: 12 }}>
        Restore items or delete them permanently.
      </p>

      {items.length === 0 && !loading ? (
        <EmptyHint>The recycle bin is empty.</EmptyHint>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#d4d0c8" }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Deleted</th>
              <th style={{ ...thStyle, width: 240 }} />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const label = labelFor(item);
              return (
                <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600 }}>{label.title}</div>
                    <div style={{ color: "#777", fontSize: 11 }}>{label.sub}</div>
                  </td>
                  <td style={tdStyle}>
                    {label.deletedAt
                      ? new Date(label.deletedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => onRestore(item.id)}
                      style={barBtnStyle}
                    >
                      Restore
                    </button>{" "}
                    <button
                      type="button"
                      onClick={() => onPurge(item.id)}
                      style={dangerFilledBtnStyle}
                    >
                      Delete forever
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ================================================================
   Small shared bits
   ================================================================ */
function SubTabs<T extends string>({
  value,
  onChange,
  tabs,
}: {
  value: T;
  onChange: (t: T) => void;
  tabs: ReadonlyArray<{ id: T; label: string }>;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "10px 14px 0",
        background: "#fff",
        borderBottom: "1px solid #d4d0c8",
        flexWrap: "wrap",
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          style={{
            padding: "6px 14px",
            border: "1px solid #919b9c",
            borderBottom: value === t.id ? "1px solid #fff" : "1px solid #919b9c",
            background: value === t.id ? "#fff" : "#d4d0c8",
            fontWeight: value === t.id ? 700 : 400,
            marginRight: 2,
            cursor: "pointer",
            position: "relative",
            top: 1,
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 32,
        textAlign: "center",
        color: "#666",
        border: "1px dashed #bbb",
        background: "#fafafa",
        fontSize: 13,
        lineHeight: 1.5,
      }}
    >
      {children}
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
const dangerFilledBtnStyle: React.CSSProperties = {
  ...barBtnStyle,
  border: "1px solid #7a1111",
  background:
    "linear-gradient(to bottom, #ee6c6c 0%, #c62727 45%, #a21717 55%, #c62727 100%)",
  color: "#fff",
  fontWeight: 700,
};
