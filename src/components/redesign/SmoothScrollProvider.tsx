"use client";

import { useLenisSmoothScroll } from "@/lib/motion";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenisSmoothScroll(true);
  return <>{children}</>;
}
