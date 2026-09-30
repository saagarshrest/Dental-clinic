"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";

const ITEMS = [
  "Cosmetic Dentistry",
  "Clear Aligners",
  "Dental Implants",
  "Teeth Whitening",
  "Porcelain Veneers",
  "Family Care",
];

/** A ribbon of treatments that drifts on its own and speeds up (or reverses) with your scroll. */
function VelocityRow({ baseVelocity, children }: { baseVelocity: number; children: React.ReactNode }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = velocityFactor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex flex-nowrap" style={{ x }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex shrink-0" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Our treatments" className="border-y border-pine/10 py-8 md:py-10">
      <VelocityRow baseVelocity={-2.2}>
        {ITEMS.map((item, i) => (
          <span key={item} className="flex items-center">
            <span
              className={`px-6 font-serif text-5xl tracking-tight text-pine md:px-10 md:text-7xl ${
                i % 2 ? "italic text-pine-soft/80" : ""
              }`}
            >
              {item}
            </span>
            <svg viewBox="0 0 24 24" className="size-5 text-gold md:size-7" fill="currentColor" aria-hidden>
              <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" />
            </svg>
          </span>
        ))}
      </VelocityRow>
    </section>
  );
}
