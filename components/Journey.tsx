"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import consult from "@/public/images/clinic-white.jpg";
import scan from "@/public/images/svc-scan.jpg";
import treatment from "@/public/images/svc-treatment.jpg";
import care from "@/public/images/care-bamboo.jpg";
import { Button } from "./ui/Button";
import { SectionLabel } from "./ui/Reveal";

type Step = { title: string; text: string; image: StaticImageData; meta: string };

const STEPS: Step[] = [
  {
    title: "Consultation",
    meta: "45 minutes",
    text: "A relaxed conversation first. We listen, examine, then explain every option in plain language — no rush, no pressure.",
    image: consult,
  },
  {
    title: "3D scan & plan",
    meta: "Same day",
    text: "Digital scans and low-dose imaging let us design your treatment — and show you the result before we begin.",
    image: scan,
  },
  {
    title: "Gentle treatment",
    meta: "At your pace",
    text: "Computer-guided anaesthesia, noise-cancelling headphones and a warm blanket. Comfort is part of the plan.",
    image: treatment,
  },
  {
    title: "Lifelong care",
    meta: "Always",
    text: "Tailored hygiene visits, friendly reminders and a team that knows your name. We're here for the long run.",
    image: care,
  },
];

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const [height, setHeight] = useState<string>("400vh");

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const d = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      distance.set(d);
      setHeight(`${d + window.innerHeight}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance]);

  const scrollYProgress = useScrollProgress(sectionRef, ["start start", "end end"]);
  const x = useTransform(() => -scrollYProgress.get() * distance.get());
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="journey" ref={sectionRef} className="relative bg-cream" style={{ height }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex w-max items-stretch gap-6 pl-[clamp(1.25rem,4vw,3.5rem)] pr-[clamp(1.25rem,4vw,3.5rem)] md:gap-8"
          style={{ x }}
        >
          {/* Intro panel */}
          <div className="flex w-[85vw] shrink-0 flex-col justify-between py-4 sm:w-[60vw] lg:w-[38vw]">
            <div>
              <SectionLabel>Your visit</SectionLabel>
              <h2 className="text-display mt-6 text-[clamp(2.6rem,5vw,5rem)] text-pine">
                From first hello to <span className="italic text-pine-soft">lifelong</span> smiles.
              </h2>
            </div>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-stone">
              Four simple steps, designed around you. Keep scrolling to walk through a visit at Lumière.
            </p>
          </div>

          {STEPS.map((step, i) => (
            <article
              key={step.title}
              className="group flex h-[72svh] max-h-[640px] w-[82vw] shrink-0 flex-col overflow-hidden rounded-[2rem] bg-ivory p-3 shadow-[0_30px_60px_-35px_rgba(22,50,45,0.35)] sm:w-[56vw] lg:w-[30vw]"
            >
              <div className="relative flex-1 overflow-hidden rounded-[1.5rem]">
                <Image
                  src={step.image}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30vw, 80vw"
                  className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-ivory/85 px-3 py-1 text-xs font-semibold text-pine backdrop-blur">
                  {step.meta}
                </span>
              </div>
              <div className="flex items-start gap-5 px-3 pb-3 pt-6">
                <span className="text-display text-outline text-6xl [--stroke:var(--color-gold)]">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-3xl text-pine">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{step.text}</p>
                </div>
              </div>
            </article>
          ))}

          {/* Closing panel */}
          <div className="flex w-[82vw] shrink-0 flex-col items-start justify-center rounded-[2rem] bg-pine p-10 text-ivory sm:w-[56vw] lg:w-[30vw]">
            <p className="text-display text-[clamp(2.4rem,4vw,4rem)]">
              Ready when <span className="italic text-sage">you are.</span>
            </p>
            <p className="mt-5 max-w-xs text-ivory/70">New patients are usually seen within the week.</p>
            <div className="mt-10">
              <Button href="#book" variant="light">
                Book a consultation
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="container-x mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-pine/15">
            <motion.div className="h-px origin-left bg-pine" style={{ scaleX: progress }} />
          </div>
          <span className="text-xs font-semibold tracking-[0.2em] text-stone">SCROLL</span>
        </div>
      </div>
    </section>
  );
}
