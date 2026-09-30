"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useTransform } from "motion/react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { CalendarDays, ShieldCheck, Star } from "lucide-react";
import heroImg from "@/public/images/hero-smile.jpg";
import avatar1 from "@/public/images/avatar-1.jpg";
import avatar2 from "@/public/images/avatar-2.jpg";
import avatar3 from "@/public/images/avatar-3.jpg";
import avatar4 from "@/public/images/avatar-4.jpg";
import { Button } from "./ui/Button";
import { EASE, SplitHeading } from "./ui/Reveal";

const AVATARS = [avatar1, avatar2, avatar3, avatar4];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useScrollProgress(ref, ["start start", "end start"]);

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const frameRadius = useTransform(scrollYProgress, [0, 1], [220, 32]);
  const cardAY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const cardBY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pb-20 pt-32 md:pt-40 lg:min-h-[100svh] lg:pb-28">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 size-[36rem] rounded-full bg-sage/25 blur-[120px]" />
        <div className="absolute -right-20 top-1/3 size-[30rem] rounded-full bg-gold/15 blur-[120px]" />
      </div>

      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <motion.div className="lg:col-span-7" style={{ y: contentY, opacity: contentOpacity }}>
          <motion.span
            className="inline-flex items-center gap-2.5 rounded-full border border-pine/10 bg-white/60 px-4 py-2 text-xs font-semibold tracking-wide text-pine backdrop-blur"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
            </span>
            Now welcoming new patients
          </motion.span>

          <SplitHeading
            as="h1"
            onMount
            delay={0.4}
            text="The art of a *confident* smile."
            className="text-display mt-8 text-[clamp(3.4rem,8.4vw,8.6rem)] text-pine"
          />

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-stone md:text-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.95, ease: EASE }}
          >
            A boutique dental studio where advanced, gentle care meets a calm, beautiful space. Cosmetic, restorative
            and family dentistry — done unhurriedly, and done well.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.1, ease: EASE }}
          >
            <Button href="#book">Book your visit</Button>
            <a href="#treatments" className="group relative text-sm font-semibold text-pine">
              Explore treatments
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right bg-pine/30 transition-transform duration-500 ease-expo group-hover:scale-x-0" />
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform delay-100 duration-500 ease-expo group-hover:scale-x-100" />
            </a>
          </motion.div>

          <motion.div
            className="mt-14 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.35 }}
          >
            <div className="flex -space-x-3">
              {AVATARS.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 rounded-full border-2 border-ivory object-cover"
                />
              ))}
            </div>
            <div className="text-sm leading-tight">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
                ))}
                <span className="ml-1.5 font-semibold text-ink">4.9</span>
              </div>
              <p className="mt-1 text-stone">from 2,400+ patient reviews</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative lg:col-span-5">
          <motion.div
            className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden bg-cream shadow-[0_40px_80px_-30px_rgba(22,50,45,0.35)]"
            style={{
              borderTopLeftRadius: frameRadius,
              borderTopRightRadius: frameRadius,
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
            }}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
          >
            <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
              <Image
                src={heroImg}
                alt="Smiling patient with a bright, natural smile"
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-[50%_30%]"
              />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-pine/30 to-transparent" />
          </motion.div>

          {/* Floating glass cards */}
          <motion.div style={{ y: cardAY }} className="absolute -left-2 top-[18%] sm:-left-8 lg:-left-16">
            <motion.div
              className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-3 pr-5 shadow-[0_20px_50px_-20px_rgba(22,50,45,0.35)] backdrop-blur-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 1, delay: 1.4 },
                x: { duration: 1, delay: 1.4, ease: EASE },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.4 },
              }}
            >
              <span className="grid size-11 place-items-center rounded-xl bg-pine text-ivory">
                <CalendarDays className="size-5" strokeWidth={1.6} />
              </span>
              <span className="text-sm leading-tight">
                <span className="block text-xs text-stone">Next available</span>
                <span className="block font-semibold text-ink">Tomorrow · 9:30 AM</span>
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: cardBY }}
            className="absolute -right-2 bottom-[12%] sm:-right-6 lg:-right-4 xl:-right-8"
          >
            <motion.div
              className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-[0_20px_50px_-20px_rgba(22,50,45,0.35)] backdrop-blur-xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
              transition={{
                opacity: { duration: 1, delay: 1.6 },
                x: { duration: 1, delay: 1.6, ease: EASE },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.6 },
              }}
            >
              <div className="flex items-center gap-2 text-pine">
                <ShieldCheck className="size-5" strokeWidth={1.6} />
                <span className="text-xs font-semibold uppercase tracking-[0.18em]">Comfort promise</span>
              </div>
              <p className="mt-2 max-w-[13rem] font-serif text-xl leading-snug text-ink">
                Anxiety-free dentistry, <span className="italic">at your own pace.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-stone">Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-pine/15">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-pine"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
