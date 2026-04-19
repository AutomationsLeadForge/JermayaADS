"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/redesign/Container";
import { MobileNavOverlay } from "@/components/redesign/MobileNavOverlay";
import { PRIMARY_NAV, SITE_META } from "@/lib/redesign-content";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-[var(--paper)] border-b border-[var(--rule)]",
      )}
    >
      <Container className="flex items-center justify-between py-4 md:py-5">
        <Link
          href="/"
          className="font-[var(--font-display)] text-2xl md:text-[28px] font-medium tracking-tight leading-none"
          aria-label="Home"
        >
          {SITE_META.wordmark}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8"
        >
          {PRIMARY_NAV.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="t-body-sm text-[var(--ink)] hover:text-[var(--ember)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a href={SITE_META.calendlyUrl} className="btn-primary">
            Book a call
          </a>
        </nav>

        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={open}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center"
          onClick={() => setOpen(true)}
        >
          <Menu size={24} />
        </button>
      </Container>

      <MobileNavOverlay open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
