"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** 01 — section-enter: fade + 16px rise, staggered children */
export function useSectionEnter(
  ref: RefObject<HTMLElement | null>,
  options: {
    selector?: string;
    stagger?: number;
    duration?: number;
    start?: string;
    once?: boolean;
  } = {},
) {
  const {
    selector = "[data-enter]",
    stagger = 0.08,
    duration = 0.6,
    start = "top 85%",
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(selector);
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { y: 16, opacity: 0 });
      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        scrollTrigger: {
          trigger: el,
          start,
          once,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [ref, selector, stagger, duration, start, once]);
}

/** 02 — headline-reveal: per-line clip mask on display headlines */
export function useHeadlineReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = el.querySelectorAll<HTMLElement>("[data-line]");
    if (!lines.length) return;

    if (prefersReducedMotion()) {
      gsap.set(lines, { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(lines, { yPercent: 110 });
      gsap.to(lines, {
        yPercent: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        delay: 0.1,
      });
    }, el);

    return () => ctx.revert();
  }, [ref]);
}

/** 03 — count-up: ease numeric value on scroll-in */
export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  target: number,
  options: { duration?: number; format?: (n: number) => string } = {},
) {
  const { duration = 1.2, format = (n) => String(Math.round(n)) } = options;
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || played.current) return;
    if (prefersReducedMotion()) {
      el.textContent = format(target);
      return;
    }

    const obj = { n: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        played.current = true;
        gsap.to(obj, {
          n: target,
          duration,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          onUpdate: () => {
            el.textContent = format(obj.n);
          },
        });
      },
    });
    return () => trigger.kill();
  }, [ref, target, duration, format]);
}

/** Lenis-powered smooth scroll — opt-in, disabled under prefers-reduced-motion */
export function useLenisSmoothScroll(enable = true) {
  useEffect(() => {
    if (!enable || prefersReducedMotion()) return;
    let raf = 0;
    let lenis: import("lenis").default | null = null;

    (async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });
      const tick = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      ScrollTrigger.update();
      lenis.on("scroll", ScrollTrigger.update);
    })();

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [enable]);
}
