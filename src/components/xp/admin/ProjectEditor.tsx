"use client";

import { useEffect, useRef, useState } from "react";
import {
  WORK_CATEGORY_OPTIONS,
  WORK_ICON_KEYS,
  type AdminWorkProject,
  type WorkCategoryId,
  type WorkIconKey,
} from "@/types/work";
import { WorkIconPicker, renderWorkIcon } from "./WorkIconPicker";

export function ProjectEditor({
  project,
  onSaved,
  onBack,
}: {
  project: AdminWorkProject | null;
  onSaved: (p: AdminWorkProject) => void;
  onBack: () => void;
}) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [number, setNumber] = useState(project?.number ?? "");
  const [category, setCategory] = useState<WorkCategoryId>(
    (project?.category as WorkCategoryId) ?? "dev",
  );
  const [categoryLabel, setCategoryLabel] = useState(
    project?.category_label ?? deriveCategoryLabel("dev"),
  );
  const [role, setRole] = useState(project?.role ?? "");
  const [outcomeMetric, setOutcomeMetric] = useState(project?.outcome_metric ?? "");
  const [outcomeLabel, setOutcomeLabel] = useState(project?.outcome_label ?? "");
  const [summary, setSummary] = useState(project?.summary ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(project?.thumbnail_url ?? "");
  const [iconKey, setIconKey] = useState<WorkIconKey>(
    (WORK_ICON_KEYS as readonly string[]).includes(project?.icon_key ?? "")
      ? (project!.icon_key as WorkIconKey)
      : "DocumentIcon",
  );
  const [href, setHref] = useState(project?.href ?? "");
  const [featured, setFeatured] = useState(Boolean(project?.featured));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savedId, setSavedId] = useState(project?.id ?? null);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(project?.title ?? "");
    setSlug(project?.slug ?? "");
    setNumber(project?.number ?? "");
    const cat = (project?.category as WorkCategoryId) ?? "dev";
    setCategory(cat);
    setCategoryLabel(project?.category_label ?? deriveCategoryLabel(cat));
    setRole(project?.role ?? "");
    setOutcomeMetric(project?.outcome_metric ?? "");
    setOutcomeLabel(project?.outcome_label ?? "");
    setSummary(project?.summary ?? "");
    setThumbnailUrl(project?.thumbnail_url ?? "");
    setIconKey(
      (WORK_ICON_KEYS as readonly string[]).includes(project?.icon_key ?? "")
        ? (project!.icon_key as WorkIconKey)
        : "DocumentIcon",
    );
    setHref(project?.href ?? "");
    setFeatured(Boolean(project?.featured));
    setSavedId(project?.id ?? null);
    setMessage(null);
  }, [project]);

  const save = async () => {
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
        number,
        category,
        category_label: categoryLabel || deriveCategoryLabel(category),
        role,
        outcome_metric: outcomeMetric,
        outcome_label: outcomeLabel,
        summary,
        thumbnail_url: thumbnailUrl.trim() || null,
        icon_key: iconKey,
        href: href.trim() || null,
        featured,
      };
      const res = savedId
        ? await fetch(`/api/admin/work-projects/${savedId}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/work-projects", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMessage(j.error ?? "Save failed");
        return;
      }
      const json = (await res.json()) as { project: AdminWorkProject };
      setSavedId(json.project.id);
      setSlug(json.project.slug);
      setMessage("Saved ✔");
      onSaved(json.project);
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setMessage(null);
    try {
      // If we haven't saved yet, upload into a generic staging folder.
      // Once saved, move subsequent uploads into work-projects/{id}/.
      const folder = savedId ? `work-projects/${savedId}` : "work-projects/staging";
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMessage(j.error ?? "Upload failed");
        return;
      }
      const json = (await res.json()) as { url: string };
      setThumbnailUrl(json.url);
      setMessage("Image uploaded — remember to save.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div style={{ padding: 14, display: "grid", gap: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <button type="button" onClick={onBack} style={barBtnStyle}>
          ← Back to list
        </button>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            style={primaryBtnStyle}
          >
            {savedId ? "Update project" : "Create project"}
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

      <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 10 }}>
        <label style={labelStyle}>
          <span>No.</span>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="01"
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project name"
            style={inputStyle}
          />
        </label>
      </div>

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
          <span>External link (optional)</span>
          <input
            value={href}
            onChange={(e) => setHref(e.target.value)}
            placeholder="https://…"
            style={inputStyle}
          />
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <label style={labelStyle}>
          <span>Category</span>
          <select
            value={category}
            onChange={(e) => {
              const next = e.target.value as WorkCategoryId;
              setCategory(next);
              // If the label currently matches a derived label, follow
              // the selection. Otherwise leave the user's custom label alone.
              const derived = deriveCategoryLabel(category);
              if (!categoryLabel || categoryLabel === derived) {
                setCategoryLabel(deriveCategoryLabel(next));
              }
            }}
            style={inputStyle}
          >
            {WORK_CATEGORY_OPTIONS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label style={labelStyle}>
          <span>Category label (shown on card)</span>
          <input
            value={categoryLabel}
            onChange={(e) => setCategoryLabel(e.target.value)}
            placeholder="e.g. AI"
            style={inputStyle}
          />
        </label>
      </div>

      <label style={labelStyle}>
        <span>Role</span>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Architect, builder"
          style={inputStyle}
        />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <label style={labelStyle}>
          <span>Outcome metric</span>
          <input
            value={outcomeMetric}
            onChange={(e) => setOutcomeMetric(e.target.value)}
            placeholder="13"
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          <span>Outcome label</span>
          <input
            value={outcomeLabel}
            onChange={(e) => setOutcomeLabel(e.target.value)}
            placeholder="orchestrated agents"
            style={inputStyle}
          />
        </label>
      </div>

      <label style={labelStyle}>
        <span>Summary</span>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={5}
          placeholder="What it is, what you built, why it matters."
          style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
        />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        <span>Featured (show on homepage &ldquo;Selected Work&rdquo;)</span>
      </label>

      <div style={labelStyle}>
        <span>Thumbnail image</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: thumbnailUrl ? "160px 1fr" : "1fr",
            gap: 10,
            alignItems: "start",
          }}
        >
          {thumbnailUrl ? (
            <div
              style={{
                border: "2px solid #000",
                aspectRatio: "16 / 9",
                overflow: "hidden",
                background: "#ece9d8",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailUrl}
                alt="thumbnail preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ) : null}
          <div style={{ display: "grid", gap: 6 }}>
            <input
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://… or upload below"
              style={inputStyle}
            />
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              {/* Hidden native input — triggered by the visible button so the
                  control renders consistently regardless of OS/browser chrome. */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f);
                }}
                style={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  border: 0,
                }}
                aria-hidden="true"
                tabIndex={-1}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                style={{
                  ...barBtnStyle,
                  padding: "5px 14px",
                  fontWeight: 700,
                  opacity: uploading ? 0.6 : 1,
                  cursor: uploading ? "not-allowed" : "pointer",
                }}
              >
                {uploading ? "Uploading…" : thumbnailUrl ? "Replace image…" : "Choose image…"}
              </button>
              {thumbnailUrl ? (
                <button
                  type="button"
                  onClick={() => setThumbnailUrl("")}
                  style={{ ...barBtnStyle, color: "#7a0000" }}
                >
                  Clear
                </button>
              ) : null}
            </div>
            <div style={{ fontSize: 11, color: "#666" }}>
              PNG / JPG / WebP / GIF, ≤ 5 MB. 16:9 works best.
            </div>
          </div>
        </div>
      </div>

      <div style={labelStyle}>
        <span>
          Icon — current:{" "}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              verticalAlign: "middle",
            }}
          >
            {renderWorkIcon(iconKey, 16)}
            <code style={{ fontSize: 11 }}>{iconKey}</code>
          </span>
        </span>
        <WorkIconPicker value={iconKey} onChange={setIconKey} />
      </div>
    </div>
  );
}

function deriveCategoryLabel(id: WorkCategoryId): string {
  const match = WORK_CATEGORY_OPTIONS.find((c) => c.id === id);
  return match?.label ?? "";
}

/* Shared styles — kept local so this module is independent of AdminPanelContent */
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
