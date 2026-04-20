"use client";

import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion, { type SuggestionOptions } from "@tiptap/suggestion";
import {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import type { Editor, Range } from "@tiptap/core";

export interface SlashCommand {
  id: string;
  title: string;
  description: string;
  icon: string;
  aliases?: string[];
  run: (ctx: { editor: Editor; range: Range }) => void;
}

const COMMANDS: SlashCommand[] = [
  {
    id: "h2",
    title: "Heading 2",
    description: "Section heading",
    icon: "H2",
    aliases: ["heading", "h2", "title"],
    run: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run(),
  },
  {
    id: "h3",
    title: "Heading 3",
    description: "Sub-section heading",
    icon: "H3",
    aliases: ["heading", "h3", "subtitle"],
    run: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run(),
  },
  {
    id: "p",
    title: "Paragraph",
    description: "Plain text",
    icon: "¶",
    aliases: ["text", "paragraph", "body"],
    run: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setParagraph().run(),
  },
  {
    id: "ul",
    title: "Bullet list",
    description: "Unordered list",
    icon: "•",
    aliases: ["ul", "bullet", "unordered"],
    run: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleBulletList().run(),
  },
  {
    id: "ol",
    title: "Numbered list",
    description: "1. 2. 3.",
    icon: "1.",
    aliases: ["ol", "ordered", "numbered"],
    run: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
  },
  {
    id: "task",
    title: "Task list",
    description: "Checkbox list",
    icon: "☐",
    aliases: ["task", "todo", "checkbox", "check"],
    run: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleTaskList().run(),
  },
  {
    id: "quote",
    title: "Quote",
    description: "Blockquote",
    icon: "❝",
    aliases: ["quote", "blockquote"],
    run: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
  },
  {
    id: "code",
    title: "Code block",
    description: "With syntax highlighting",
    icon: "</>",
    aliases: ["code", "codeblock", "pre"],
    run: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    id: "table",
    title: "Table",
    description: "Insert 3×3 table",
    icon: "▦",
    aliases: ["table", "grid"],
    run: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
  },
  {
    id: "hr",
    title: "Divider",
    description: "Horizontal rule",
    icon: "―",
    aliases: ["hr", "divider", "rule", "separator"],
    run: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).setHorizontalRule().run(),
  },
];

function filterCommands(query: string): SlashCommand[] {
  if (!query) return COMMANDS;
  const q = query.toLowerCase();
  return COMMANDS.filter((c) => {
    if (c.title.toLowerCase().includes(q)) return true;
    if (c.id.includes(q)) return true;
    if (c.aliases?.some((a) => a.includes(q))) return true;
    return false;
  });
}

interface ListProps {
  items: SlashCommand[];
  command: (item: SlashCommand) => void;
}

interface ListHandle {
  onKeyDown: (opts: { event: KeyboardEvent }) => boolean;
}

const SlashList = forwardRef<ListHandle, ListProps>(function SlashList(
  { items, command },
  ref,
) {
  // "Adjust state while rendering" pattern — React docs-approved way to reset
  // the selection when the filtered list changes, without an effect.
  const [prevItems, setPrevItems] = useState(items);
  const [selected, setSelected] = useState(0);
  if (prevItems !== items) {
    setPrevItems(items);
    setSelected(0);
  }

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        setSelected((s) => (s - 1 + items.length) % Math.max(1, items.length));
        return true;
      }
      if (event.key === "ArrowDown") {
        setSelected((s) => (s + 1) % Math.max(1, items.length));
        return true;
      }
      if (event.key === "Enter") {
        const item = items[selected];
        if (item) command(item);
        return true;
      }
      return false;
    },
  }));

  if (items.length === 0) {
    return (
      <div className="tt-slash-menu tt-slash-empty">No matching commands</div>
    );
  }

  return (
    <div className="tt-slash-menu" role="listbox">
      {items.map((item, i) => (
        <button
          key={item.id}
          type="button"
          role="option"
          aria-selected={i === selected}
          className={`tt-slash-item${i === selected ? " is-active" : ""}`}
          onMouseEnter={() => setSelected(i)}
          onMouseDown={(e) => {
            e.preventDefault();
            command(item);
          }}
        >
          <span className="tt-slash-icon">{item.icon}</span>
          <span className="tt-slash-text">
            <span className="tt-slash-title">{item.title}</span>
            <span className="tt-slash-desc">{item.description}</span>
          </span>
        </button>
      ))}
    </div>
  );
});

export const SlashCommands = Extension.create({
  name: "slashCommands",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }) => {
          (props as SlashCommand).run({ editor, range });
        },
      } as Partial<SuggestionOptions<SlashCommand, SlashCommand>>,
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion<SlashCommand, SlashCommand>({
        editor: this.editor,
        ...this.options.suggestion,
        items: ({ query }) => filterCommands(query).slice(0, 10),
        render: () => {
          let component: ReactRenderer<ListHandle, ListProps> | null = null;
          let popup: HTMLDivElement | null = null;

          const mount = () => {
            popup = document.createElement("div");
            popup.style.position = "absolute";
            popup.style.zIndex = "9999";
            popup.style.pointerEvents = "auto";
            document.body.appendChild(popup);
          };

          const positionAt = (rect: DOMRect | null | undefined) => {
            if (!popup || !rect) return;
            const pad = 6;
            const menuH = popup.getBoundingClientRect().height || 240;
            const vh = window.innerHeight;
            const below = rect.bottom + pad;
            const fitsBelow = below + menuH < vh;
            const top = fitsBelow ? below : rect.top - pad - menuH;
            popup.style.top = `${Math.max(8, top) + window.scrollY}px`;
            popup.style.left = `${Math.max(8, rect.left) + window.scrollX}px`;
          };

          return {
            onStart: (props) => {
              mount();
              component = new ReactRenderer<ListHandle, ListProps>(SlashList, {
                editor: props.editor,
                props: { items: props.items, command: props.command },
              });
              if (popup && component.element) {
                popup.appendChild(component.element as Node);
                positionAt(props.clientRect?.());
              }
            },
            onUpdate: (props) => {
              component?.updateProps({ items: props.items, command: props.command });
              positionAt(props.clientRect?.());
            },
            onKeyDown: (props) => {
              if (props.event.key === "Escape") {
                popup?.remove();
                component?.destroy();
                return true;
              }
              return component?.ref?.onKeyDown({ event: props.event }) ?? false;
            },
            onExit: () => {
              popup?.remove();
              popup = null;
              component?.destroy();
              component = null;
            },
          };
        },
      }),
    ];
  },
});
