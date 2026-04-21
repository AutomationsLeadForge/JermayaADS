"use client";

import { useEffect } from "react";
import { BLOG_POSTS } from "@/lib/blog";

/**
 * Warms the browser HTTP cache with images the user is most likely to see
 * after the initial desktop paints:
 *   • Portfolio thumbnails used by the Projects window (`/images/portfolio/1..10.png`)
 *   • Blog hero images referenced by BLOG_POSTS
 *
 * Strategy:
 *   1. Wait until the landing page has actually finished loading
 *      (the `load` event fires after images, fonts and scripts in the initial
 *      paint are done). Starting earlier would compete for bandwidth with
 *      everything the user can actually see.
 *   2. Defer even further with `requestIdleCallback` so we never steal a frame
 *      from the main thread. Fallback: a short `setTimeout`.
 *   3. Construct off-DOM `Image()` objects. Setting `.src` is enough to
 *      populate the browser cache — no element is mounted, so layout/paint
 *      is untouched. Subsequent `<img src>` renders hit the cache instantly.
 *   4. Throttle to a handful of parallel requests so we don't saturate the
 *      connection on slow networks.
 */
const PORTFOLIO_THUMBS: readonly string[] = Array.from(
  { length: 10 },
  (_, i) => `/images/portfolio/${i + 1}.png`,
);

const MAX_CONCURRENT = 4;

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    const img = new window.Image();
    // Hint to the browser that these are low-priority background fetches —
    // anything the user-visible UI needs should jump the queue.
    // `fetchPriority` is a standard attribute on HTMLImageElement.
    (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "low";
    img.decoding = "async";
    img.loading = "eager";
    const done = () => resolve();
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
    img.src = url;
  });
}

async function preloadInBatches(urls: readonly string[]) {
  // Simple sliding-window pool — keeps at most N requests in flight.
  let cursor = 0;
  const workers = Array.from({ length: MAX_CONCURRENT }, async () => {
    while (cursor < urls.length) {
      const idx = cursor++;
      await preloadImage(urls[idx]);
    }
  });
  await Promise.all(workers);
}

export function BackgroundPreloader() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const urls: string[] = [
      ...PORTFOLIO_THUMBS,
      ...BLOG_POSTS.map((p) => p.heroImage).filter(
        (u): u is string => typeof u === "string" && u.length > 0,
      ),
    ];
    if (urls.length === 0) return;

    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      const ric = (
        window as Window &
          typeof globalThis & {
            requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
          }
      ).requestIdleCallback;
      if (typeof ric === "function") {
        ric(() => {
          if (!cancelled) void preloadInBatches(urls);
        }, { timeout: 2000 });
      } else {
        // Safari fallback — a short timeout is close enough to an idle slice.
        setTimeout(() => {
          if (!cancelled) void preloadInBatches(urls);
        }, 500);
      }
    };

    // If the initial landing already finished loading by the time we mount
    // (common after Next.js hydration), run immediately; otherwise wait.
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, []);

  return null;
}
