"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { EASE, Reveal } from "./ui/Reveal";

const STATS = [
  { value: 17, suffix: "+", decimals: 0, label: "Years of gentle, modern dentistry" },
  { value: 12, suffix: "k", decimals: 0, label: "Smiles cared for and transformed" },
  { value: 4.9, suffix: "", decimals: 1, label: "Average rating from 2,400+ reviews" },
  { value: 98, suffix: "%", decimals: 0, label: "Of patients would refer a friend" },
];

function Counter({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 2.4, ease: EASE });
    return () => controls.stop();
  }, [inView, mv, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{text}</motion.span>
      <span className="text-gold">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-24 md:py-32" aria-label="Lumière in numbers">
      <div className="container-x grid grid-cols-2 gap-y-14 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="border-l border-pine/15 pl-5 md:pl-8">
            <p className="text-display text-[clamp(3.4rem,7vw,6.5rem)] text-pine">
              <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-4 max-w-[14rem] text-sm leading-relaxed text-stone md:text-base">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
