"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useTransform } from "motion/react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import studio from "@/public/images/clinic-stone.jpg";

/** Pinned image that opens from an inset card to full-bleed as you scroll through it. */
export default function StudioReveal() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useScrollProgress(ref, ["start start", "end end"]);

  const insetY = useTransform(scrollYProgress, [0, 0.6], [14, 0]);
  const insetX = useTransform(scrollYProgress, [0, 0.6], [22, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [32, 0]);
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;
  const scale = useTransform(scrollYProgress, [0, 0.7], [1.25, 1]);

  const overlay = useTransform(scrollYProgress, [0.35, 0.75], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.45, 0.85], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section ref={ref} className="relative h-[240vh]" aria-label="Our studio">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath }}>
          <motion.div className="absolute inset-0" style={{ scale }}>
            <Image
              src={studio}
              alt="Treatment room at Lumière Dental Studio with natural light and a stone feature wall"
              fill
              placeholder="blur"
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/45 to-ink/15"
            style={{ opacity: overlay }}
          />
        </motion.div>

        <motion.p
          className="absolute inset-x-0 bottom-[6%] text-center text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-stone"
          style={{ opacity: captionOpacity }}
        >
          Step inside the studio
        </motion.p>

        <motion.div
          className="container-x absolute inset-x-0 bottom-[10%] text-ivory"
          style={{ y: textY, opacity: textOpacity }}
        >
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <h2 className="text-display text-[clamp(2.8rem,7vw,7rem)] lg:col-span-8">
              A space designed <br className="hidden md:block" />
              to feel like <span className="italic text-sage">calm.</span>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-ivory/80 md:text-lg lg:col-span-4">
              Natural light, warm materials and quiet rooms. No fluorescent glare, no waiting-room chaos — just a studio
              built around your comfort, from the moment you walk in.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
