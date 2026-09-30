"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          lerp: 0.09,
          smoothWheel: !reduceMotion,
          anchors: true,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
