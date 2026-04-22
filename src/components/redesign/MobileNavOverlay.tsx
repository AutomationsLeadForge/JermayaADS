"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRIMARY_NAV, SITE_META } from "@/lib/redesign-content";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileNavOverlay({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-[var(--paper)] transition-transform duration-300",
        open ? "translate-x-0" : "translate-x-full",
      )}
      aria-hidden={!open}
    >
      <div className="container-wide flex items-center justify-between py-4">
        <Link
          href="/"
          onClick={onClose}
          className="font-[var(--font-display)] text-2xl font-medium"
        >
          {SITE_META.wordmark}
        </Link>
        <button
          type="button"
          aria-label="Close navigation"
          className="inline-flex h-10 w-10 items-center justify-center"
          onClick={onClose}
        >
          <X size={24} />
        </button>
      </div>
      <nav
        aria-label="Mobile primary"
        className="container-wide flex flex-col gap-4 pt-8"
      >
        {PRIMARY_NAV.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="t-display-md text-[var(--ink)] hover:text-[var(--ember)] transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href={SITE_META.whatsappUrl}
          onClick={onClose}
          className="btn-primary mt-6 self-start"
        >
          Send a WhatsApp
        </a>
      </nav>
    </div>
  );
}
