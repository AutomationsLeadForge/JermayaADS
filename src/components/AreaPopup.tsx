"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { CloseIcon } from "@/components/icons";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function AreaPopup({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 overflow-hidden rounded-[inherit] pt-4 transition-all duration-200",
        open ? "opacity-100 visible" : "opacity-0 invisible",
      )}
      style={{ backgroundColor: "rgba(0,0,0,0.14)" }}
      aria-hidden={!open}
    >
      <div className="mx-auto mb-0 mt-auto max-w-full">
        <div className="relative border-2 border-white rounded-[10px] bg-[#1d1d1d]">
          <div className="px-[15px] pt-[25px] pb-[6px]">
            <h5 className="text-[16px] font-semibold text-[#c073a2] mb-0">
              {title}
            </h5>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-[10px] right-[18px] flex h-6 w-6 items-center justify-center rounded-full bg-[#c62727] opacity-100 transition-transform hover:translate-y-[3px] active:translate-y-[3px]"
              style={{ boxShadow: "0 3px rgba(0,0,0,0.49)" }}
            >
              <CloseIcon width={11} height={11} />
            </button>
          </div>
          <div className="max-h-[210px] overflow-auto px-[15px] pb-3 pt-[6px] text-[14px] leading-[1.75] no-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
