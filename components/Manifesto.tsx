"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import founder from "@/public/images/team-1.jpg";
import { Reveal, SectionLabel } from "./ui/Reveal";

const TEXT =
  "We believe a visit to the dentist should feel less like an appointment and more like a moment of care. Unhurried consultations, honest advice, and artistry you can see — every time you smile.";

const HIGHLIGHT = new Set(["care.", "artistry", "smile."]);

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const highlighted = HIGHLIGHT.has(word);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }} className={highlighted ? "italic text-pine-soft" : undefined}>
        {word}
      </motion.span>
    </span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const scrollYProgress = useScrollProgress(ref, ["start 0.85", "end 0.5"]);
  const words = TEXT.split(" ");

  return (
    <section className="py-28 md:py-44">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Reveal>
            <SectionLabel>Our philosophy</SectionLabel>
          </Reveal>
        </div>

        <div className="lg:col-span-9">
          <p ref={ref} className="text-display text-[clamp(2.1rem,4.6vw,4.4rem)] leading-[1.08] text-pine">
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </p>

          <Reveal className="mt-14 flex items-center gap-4" delay={0.1}>
            <Image
              src={founder}
              alt="Dr. Elena Marsh"
              width={56}
              height={56}
              className="size-14 rounded-full object-cover object-[45%_30%]"
            />
            <div>
              <p className="font-serif text-2xl italic text-pine">Dr. Elena Marsh</p>
              <p className="text-sm text-stone">Founder &amp; Lead Cosmetic Dentist</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
