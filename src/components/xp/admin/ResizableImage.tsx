"use client";

import Image from "@tiptap/extension-image";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { useCallback, useRef, useState } from "react";

type Align = "left" | "center" | "right" | "none";

const alignToCss = (a: Align): React.CSSProperties => {
  switch (a) {
    case "left":
      return { display: "block", marginLeft: 0, marginRight: "auto" };
    case "right":
      return { display: "block", marginLeft: "auto", marginRight: 0 };
    case "center":
      return { display: "block", marginLeft: "auto", marginRight: "auto" };
    default:
      return {};
  }
};

function ResizableImageComponent(props: NodeViewProps) {
  const { node, updateAttributes, selected } = props;
  const { src, alt, title, width, align } = node.attrs as {
    src: string;
    alt?: string;
    title?: string;
    width?: number | null;
    align?: Align;
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const onHandleDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const startX = e.clientX;
      const startWidth = wrapper.getBoundingClientRect().width;
      const parent = wrapper.parentElement as HTMLElement | null;
      const maxW = parent ? parent.getBoundingClientRect().width : startWidth * 2;

      setDragging(true);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

      const move = (ev: PointerEvent) => {
        const dx = ev.clientX - startX;
        const next = Math.max(60, Math.min(maxW, Math.round(startWidth + dx)));
        wrapper.style.width = `${next}px`;
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        setDragging(false);
        const finalWidth = Math.round(wrapper.getBoundingClientRect().width);
        updateAttributes({ width: finalWidth });
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [updateAttributes],
  );

  const setAlign = (next: Align) => updateAttributes({ align: next });
  const setPercent = (percent: number) => {
    const parent = wrapperRef.current?.parentElement as HTMLElement | null;
    if (!parent) return;
    const w = Math.round(parent.getBoundingClientRect().width * percent);
    updateAttributes({ width: w });
  };

  const currentAlign: Align = align ?? "none";

  return (
    <NodeViewWrapper
      as="div"
      className="tt-image-wrap"
      data-align={currentAlign}
      style={{
        ...alignToCss(currentAlign),
        position: "relative",
        width: width ? `${width}px` : "auto",
        maxWidth: "100%",
        margin: "12px 0",
        userSelect: "none",
      }}
    >
      <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
        <img
          src={src}
          alt={alt ?? ""}
          title={title ?? undefined}
          draggable={false}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            outline: selected ? "2px solid #1a66d6" : "none",
            outlineOffset: 2,
          }}
        />

        {(selected || dragging) && (
          <>
            {/* Corner handles */}
            <div
              role="presentation"
              aria-label="Resize image"
              onPointerDown={onHandleDown}
              style={{
                position: "absolute",
                right: -6,
                bottom: -6,
                width: 12,
                height: 12,
                background: "#1a66d6",
                border: "2px solid #fff",
                cursor: "nwse-resize",
                borderRadius: 2,
                zIndex: 2,
              }}
            />
            <div
              role="presentation"
              onPointerDown={onHandleDown}
              style={{
                position: "absolute",
                left: -6,
                bottom: -6,
                width: 12,
                height: 12,
                background: "#1a66d6",
                border: "2px solid #fff",
                cursor: "nesw-resize",
                borderRadius: 2,
                zIndex: 2,
              }}
            />

            {/* Mini toolbar under the image */}
            <div
              contentEditable={false}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: -36,
                display: "flex",
                gap: 4,
                padding: 3,
                background: "#1f1f1f",
                color: "#fff",
                border: "1px solid #000",
                borderRadius: 4,
                fontFamily: "Tahoma, sans-serif",
                fontSize: 11,
                whiteSpace: "nowrap",
                zIndex: 3,
              }}
            >
              <MiniBtn active={currentAlign === "left"} onClick={() => setAlign("left")}>Left</MiniBtn>
              <MiniBtn active={currentAlign === "center"} onClick={() => setAlign("center")}>Center</MiniBtn>
              <MiniBtn active={currentAlign === "right"} onClick={() => setAlign("right")}>Right</MiniBtn>
              <span style={{ width: 1, background: "#555", margin: "0 2px" }} />
              <MiniBtn onClick={() => setPercent(0.33)}>33%</MiniBtn>
              <MiniBtn onClick={() => setPercent(0.5)}>50%</MiniBtn>
              <MiniBtn onClick={() => setPercent(0.75)}>75%</MiniBtn>
              <MiniBtn onClick={() => setPercent(1)}>Full</MiniBtn>
              <span style={{ width: 1, background: "#555", margin: "0 2px" }} />
              <MiniBtn
                onClick={() => {
                  const next = window.prompt("Alt text (for screen readers)", alt ?? "");
                  if (next !== null) updateAttributes({ alt: next });
                }}
              >
                Alt
              </MiniBtn>
            </div>
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
}

function MiniBtn({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      style={{
        padding: "3px 8px",
        background: active ? "#1a66d6" : "transparent",
        color: "#fff",
        border: "1px solid transparent",
        cursor: "pointer",
        fontSize: 11,
        borderRadius: 3,
      }}
    >
      {children}
    </button>
  );
}

export const ResizableImage = Image.extend({
  name: "image",
  draggable: true,
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (el) => {
          const w = el.getAttribute("width") ?? el.style.width;
          if (!w) return null;
          const n = parseInt(String(w), 10);
          return Number.isFinite(n) ? n : null;
        },
        renderHTML: (attrs) => {
          if (!attrs.width) return {};
          return { width: attrs.width, style: `width: ${attrs.width}px;` };
        },
      },
      align: {
        default: "none",
        parseHTML: (el) => el.getAttribute("data-align") ?? "none",
        renderHTML: (attrs) => {
          if (!attrs.align || attrs.align === "none") return {};
          return { "data-align": attrs.align };
        },
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});
