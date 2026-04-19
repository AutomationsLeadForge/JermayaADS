"use client";

import { useEffect, useRef } from "react";

/**
 * Fullscreen looping video as the desktop wallpaper.
 * Autoplays muted + playsInline for cross-browser compatibility.
 * Uses `src` directly on the element (more reliable than <source> child
 * when the element mounts dynamically via React).
 */
export function VideoBackground() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Some browsers need an explicit play() after mount even with autoPlay set.
    v.muted = true;
    v.play().catch(() => {
      /* autoplay blocked by browser — will start on first user interaction */
    });
  }, []);

  return (
    <video
      ref={ref}
      className="xp-video-bg"
      src="/videos/xp-wallpaper.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
