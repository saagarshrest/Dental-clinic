"use client";

import { useCallback, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import a1 from "@/public/images/avatar-1.jpg";
import a2 from "@/public/images/avatar-2.jpg";
import a3 from "@/public/images/avatar-3.jpg";
import a4 from "@/public/images/avatar-4.jpg";
import { EASE, Reveal, SectionLabel } from "./ui/Reveal";

type Review = { quote: string; name: string; treatment: string; avatar: StaticImageData };

const REVIEWS: Review[] = [
  {
    quote:
      "I've been terrified of dentists my whole life. Lumière changed that in a single visit — calm, kind and genuinely painless.",
    name: "James Whitaker",
    treatment: "Dental implants",
    avatar: a1,
  },
  {
    quote:
      "My aligner journey took seven months and the result is beyond anything I imagined. The 3D preview was spot on.",
    name: "Claire Donovan",
    treatment: "Clear aligners",
    avatar: a2,
  },
  {
    quote:
      "It feels more like a boutique hotel than a clinic. Dr. Marsh redesigned my smile with veneers and I can't stop smiling.",
    name: "Marcus Hale",
    treatment: "Porcelain veneers",
    avatar: a3,
  },
  {
    quote:
      "They see my whole family, from my five-year-old to my dad. Everyone actually looks forward to their check-ups now.",
    name: "Hannah Brooks",
    treatment: "Family care",
    avatar: a4,
  },
];

const DURATION = 7000;

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((step: number) => {
    setState(([i]) => [(i + step + REVIEWS.length) % REVIEWS.length, step]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  const review = REVIEWS[index];

  return (
    <section id="reviews" className="bg-cream py-28 md:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionLabel>Kind words</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-display mt-8 text-[clamp(5rem,10vw,9rem)] text-pine">4.9</p>
            <div className="mt-2 flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-current" strokeWidth={0} />
              ))}
            </div>
            <p className="mt-4 max-w-xs text-stone">
              Average rating across 2,400+ verified Google reviews from patients like you.
            </p>
          </Reveal>
        </div>

        <div
          className="flex flex-col justify-between lg:col-span-8"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[18rem] md:min-h-[20rem]" aria-live="polite">
            <svg viewBox="0 0 48 36" className="mb-8 h-9 w-12 text-gold" fill="currentColor" aria-hidden>
              <path d="M0 36V21.6C0 9.4 6.9 2.2 18.6 0l2 4.6C13.8 6.6 10.6 10.8 10.2 16.2H19V36H0zm27 0V21.6C27 9.4 33.9 2.2 45.6 0l2 4.6c-6.8 2-10 6.2-10.4 11.6H46V36H27z" />
            </svg>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={index}
                custom={dir}
                initial="enter"
                animate="center"
                exit="exit"
                variants={{
                  enter: (d: number) => ({ opacity: 0, y: d > 0 ? 40 : -40, filter: "blur(6px)" }),
                  center: { opacity: 1, y: 0, filter: "blur(0px)" },
                  exit: (d: number) => ({ opacity: 0, y: d > 0 ? -40 : 40, filter: "blur(6px)" }),
                }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="text-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.12] text-pine">
                  {review.quote}
                </p>
                <footer className="mt-10 flex items-center gap-4">
                  <Image
                    src={review.avatar}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 rounded-full object-cover"
                  />
                  <div>
                    <cite className="block font-semibold not-italic text-ink">{review.name}</cite>
                    <span className="text-sm text-stone">{review.treatment}</span>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex flex-1 gap-2">
              {REVIEWS.map((r, i) => (
                <button
                  key={r.name}
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className="relative h-8 flex-1"
                  aria-label={`Show review from ${r.name}`}
                >
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-pine/15" />
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 origin-left bg-pine"
                      initial={{ scaleX: paused ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused ? 0 : DURATION / 1000, ease: "linear" }}
                    />
                  )}
                  {i < index && <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-pine/50" />}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                className="grid size-12 place-items-center rounded-full border border-pine/20 text-pine transition-colors hover:bg-pine hover:text-ivory"
                aria-label="Previous review"
              >
                <ArrowLeft className="size-4" strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="grid size-12 place-items-center rounded-full border border-pine/20 text-pine transition-colors hover:bg-pine hover:text-ivory"
                aria-label="Next review"
              >
                <ArrowRight className="size-4" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
