"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import { ResizableImage } from "@/components/xp/admin/ResizableImage";
import { SlashCommands } from "@/components/xp/admin/SlashMenu";

interface Props {
  value: string;
  onChange: (html: string) => void;
  postId?: string;
  placeholder?: string;
}

async function uploadImage(file: File, postId: string | undefined): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  if (postId) fd.append("postId", postId);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  if (!res.ok) {
    const msg = await res
      .json()
      .then((j) => j.error ?? "Upload failed")
      .catch(() => "Upload failed");
    throw new Error(msg);
  }
  const json = (await res.json()) as { url: string };
  return json.url;
}

const SWATCHES = [
  "#0a3a8e",
  "#c62727",
  "#0a6b2a",
  "#b35900",
  "#6c3fa0",
  "#1a1a1a",
  "#888888",
];
const HIGHLIGHTS = [
  "#fff2a8",
  "#c5e9c2",
  "#ffd1d1",
  "#d6e4fb",
  "#e8dcff",
  "transparent",
];

export function RichEditor({ value, onChange, postId, placeholder }: Props) {
  const lowlight = useMemo(() => createLowlight(common), []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false, // replaced by CodeBlockLowlight below
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({
        placeholder:
          placeholder ??
          "Type '/' for commands · drag & drop or paste images · select text for formatting…",
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true, HTMLAttributes: { class: "tt-table" } }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: "plaintext" }),
      ResizableImage.configure({ allowBase64: false, HTMLAttributes: { class: "blog-img" } }),
      SlashCommands,
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: { class: "rich-editor-surface" },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (!file) continue;
            event.preventDefault();
            uploadImage(file, postId)
              .then((url) => {
                const { schema } = view.state;
                const node = schema.nodes.image.create({ src: url, alt: "" });
                const tr = view.state.tr.replaceSelectionWith(node);
                view.dispatch(tr);
              })
              .catch((err: Error) => window.alert(`Upload failed: ${err.message}`));
            return true;
          }
        }
        return false;
      },
      handleDrop: (view, event) => {
        const files = event.dataTransfer?.files;
        if (!files?.length) return false;
        const images = Array.from(files).filter((f) => f.type.startsWith("image/"));
        if (!images.length) return false;
        event.preventDefault();
        const coords = view.posAtCoords({ left: event.clientX, top: event.clientY });
        const insertAt = coords?.pos ?? view.state.selection.from;
        (async () => {
          for (const file of images) {
            try {
              const url = await uploadImage(file, postId);
              const { schema } = view.state;
              const node = schema.nodes.image.create({ src: url, alt: "" });
              const tr = view.state.tr.insert(insertAt, node);
              view.dispatch(tr);
            } catch (err) {
              window.alert(`Upload failed: ${(err as Error).message}`);
            }
          }
        })();
        return true;
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [value, editor]);

  const pickAndUpload = useCallback(() => {
    if (!editor) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png,image/jpeg,image/webp,image/gif";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const url = await uploadImage(file, postId);
        editor.chain().focus().setImage({ src: url, alt: "" }).run();
      } catch (err) {
        window.alert(`Upload failed: ${(err as Error).message}`);
      }
    };
    input.click();
  }, [editor, postId]);

  const promptLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL (leave empty to remove)", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className="rich-editor-loading" style={{ padding: 16, color: "#666" }}>
        Loading editor…
      </div>
    );
  }

  const btn = (
    active: boolean,
    onClick: () => void,
    label: React.ReactNode,
    title: string,
  ) => (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rich-tb-btn${active ? " is-active" : ""}`}
      title={title}
      aria-label={title}
    >
      {label}
    </button>
  );

  return (
    <div className="rich-editor">
      <div className="rich-editor-toolbar" role="toolbar">
        {/* Text styling */}
        {btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), <b>B</b>, "Bold (Ctrl+B)")}
        {btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), <i>I</i>, "Italic (Ctrl+I)")}
        {btn(editor.isActive("underline"), () => editor.chain().focus().toggleUnderline().run(), <u>U</u>, "Underline (Ctrl+U)")}
        {btn(editor.isActive("strike"), () => editor.chain().focus().toggleStrike().run(), <s>S</s>, "Strikethrough")}
        {btn(editor.isActive("code"), () => editor.chain().focus().toggleCode().run(), "</>", "Inline code")}

        <span className="rich-tb-sep" />

        {/* Block types */}
        {btn(editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), "H2", "Heading 2")}
        {btn(editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), "H3", "Heading 3")}
        {btn(editor.isActive("paragraph"), () => editor.chain().focus().setParagraph().run(), "¶", "Paragraph")}

        <span className="rich-tb-sep" />

        {/* Lists */}
        {btn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), "• List", "Bulleted list")}
        {btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), "1. List", "Numbered list")}
        {btn(editor.isActive("taskList"), () => editor.chain().focus().toggleTaskList().run(), "☐ Task", "Task list (checkboxes)")}
        {btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), "❝", "Quote")}
        {btn(editor.isActive("codeBlock"), () => editor.chain().focus().toggleCodeBlock().run(), "{ }", "Code block")}

        <span className="rich-tb-sep" />

        {/* Alignment */}
        {btn(editor.isActive({ textAlign: "left" }), () => editor.chain().focus().setTextAlign("left").run(), "⬅", "Align left")}
        {btn(editor.isActive({ textAlign: "center" }), () => editor.chain().focus().setTextAlign("center").run(), "⬍", "Align center")}
        {btn(editor.isActive({ textAlign: "right" }), () => editor.chain().focus().setTextAlign("right").run(), "➡", "Align right")}
        {btn(editor.isActive({ textAlign: "justify" }), () => editor.chain().focus().setTextAlign("justify").run(), "≡", "Justify")}

        <span className="rich-tb-sep" />

        {/* Color + highlight */}
        <ColorPicker
          label="A"
          title="Text color"
          swatches={SWATCHES}
          active={editor.getAttributes("textStyle").color ?? null}
          onPick={(c) => {
            if (c === null) editor.chain().focus().unsetColor().run();
            else editor.chain().focus().setColor(c).run();
          }}
        />
        <ColorPicker
          label="🖍"
          title="Highlight color"
          swatches={HIGHLIGHTS}
          active={editor.getAttributes("highlight").color ?? null}
          onPick={(c) => {
            if (!c || c === "transparent") editor.chain().focus().unsetHighlight().run();
            else editor.chain().focus().setHighlight({ color: c }).run();
          }}
        />

        <span className="rich-tb-sep" />

        {/* Insertables */}
        {btn(editor.isActive("link"), promptLink, "🔗", "Link")}
        {btn(false, pickAndUpload, "🖼 Image", "Insert image (or drag & drop / paste)")}
        {btn(false, () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(), "▦ Table", "Insert table")}
        {btn(false, () => editor.chain().focus().setHorizontalRule().run(), "―", "Divider")}

        <span className="rich-tb-sep" />

        {btn(false, () => editor.chain().focus().undo().run(), "↶", "Undo")}
        {btn(false, () => editor.chain().focus().redo().run(), "↷", "Redo")}
      </div>

      <BubbleMenu
        editor={editor}
        shouldShow={({ editor, from, to }) => {
          if (from === to) return false;
          if (editor.isActive("image")) return false;
          return true;
        }}
      >
        <div className="tt-bubble">
          {btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), <b>B</b>, "Bold")}
          {btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), <i>I</i>, "Italic")}
          {btn(editor.isActive("underline"), () => editor.chain().focus().toggleUnderline().run(), <u>U</u>, "Underline")}
          {btn(editor.isActive("strike"), () => editor.chain().focus().toggleStrike().run(), <s>S</s>, "Strike")}
          {btn(editor.isActive("code"), () => editor.chain().focus().toggleCode().run(), "</>", "Inline code")}
          <span className="rich-tb-sep" />
          {btn(editor.isActive("link"), promptLink, "🔗", "Link")}
          <span className="rich-tb-sep" />
          {btn(editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), "H2", "Heading 2")}
          {btn(editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), "H3", "Heading 3")}
        </div>
      </BubbleMenu>

      <EditorContent editor={editor} className="rich-editor-content" />
    </div>
  );
}

function ColorPicker({
  label,
  title,
  swatches,
  active,
  onPick,
}: {
  label: string;
  title: string;
  swatches: string[];
  active: string | null;
  onPick: (c: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative" }}>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((v) => !v)}
        className="rich-tb-btn"
        title={title}
        aria-label={title}
        style={{
          borderBottom: active ? `3px solid ${active}` : undefined,
        }}
      >
        {label}
      </button>
      {open ? (
        <div className="rich-tb-popover" onMouseLeave={() => setOpen(false)}>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              onPick(null);
              setOpen(false);
            }}
            className="rich-tb-reset"
          >
            Clear
          </button>
          <div className="rich-tb-swatches">
            {swatches.map((c) => (
              <button
                key={c}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onPick(c);
                  setOpen(false);
                }}
                className="rich-tb-swatch"
                style={{
                  background: c === "transparent" ? "#fff" : c,
                  outline: c === "transparent" ? "1px dashed #888" : undefined,
                }}
                title={c}
                aria-label={`Color ${c}`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </span>
  );
}
