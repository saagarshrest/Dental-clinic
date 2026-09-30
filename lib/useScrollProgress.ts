"use client";

import type { RefObject } from "react";
import { useScroll, useTransform } from "motion/react";

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * Scroll progress (0 → 1) of `target` through the viewport.
 *
 * motion hands range-mapped scroll values to native ViewTimelines, but it doesn't pad
 * partial input ranges (e.g. [0, 0.25]) — the value drifts back toward its start after
 * the range and snaps back once the section is scrolled past. Re-deriving the progress
 * through a function keeps every downstream transform on motion's JS path.
 */
export function useScrollProgress(target: RefObject<HTMLElement | null>, offset: Offset) {
  const { scrollYProgress } = useScroll({ target, offset });
  return useTransform(scrollYProgress, (v) => v);
}
