"use client";

import { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import exam from "@/public/images/svc-exam.jpg";
import whitening from "@/public/images/smile-red.jpg";
import aligners from "@/public/images/svc-aligners.jpg";
import implants from "@/public/images/svc-implants.jpg";
import veneers from "@/public/images/svc-treatment.jpg";
import hygiene from "@/public/images/svc-cleaning.jpg";
import { EASE, Reveal, SectionLabel, SplitHeading } from "./ui/Reveal";

type Service = { title: string; text: string; tag: string; image: StaticImageData };

const SERVICES: Service[] = [
  {
    title: "Preventive & Family Care",
    text: "Thorough check-ups and gentle care for every age, from first teeth onward.",
    tag: "All ages",
    image: exam,
  },
  {
    title: "Teeth Whitening",
    text: "Professional, low-sensitivity whitening for a natural, luminous brightness.",
    tag: "1 visit",
    image: whitening,
  },
  {
    title: "Clear Aligners",
    text: "Straighter teeth, discreetly — planned in 3D so you see your result first.",
    tag: "4–12 months",
    image: aligners,
  },
  {
    title: "Dental Implants",
    text: "Permanent, natural-looking replacements placed with guided precision.",
    tag: "Lifetime",
    image: implants,
  },
  {
    title: "Porcelain Veneers",
    text: "Hand-finished veneers designed around your face, features and bite.",
    tag: "Bespoke",
    image: veneers,
  },
  {
    title: "Hygiene & Gum Health",
    text: "Deep, comfortable cleans and periodontal care that keep smiles healthy.",
    tag: "Every 6 months",
    image: hygiene,
  },
];

export default function Services() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    x.set(px);
    y.set(py);
    // While hidden, snap the preview to the cursor so it doesn't fly in from afar.
    if (active === null) {
      sx.jump(px);
      sy.jump(py);
    }
  }

  return (
    <section id="treatments" className="py-28 md:py-40">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>Treatments</SectionLabel>
            </Reveal>
            <SplitHeading
              text="Everything your smile needs, *under one roof.*"
              className="text-display mt-6 text-[clamp(2.6rem,5.6vw,5.4rem)] text-pine"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-lg leading-relaxed text-stone">
              From routine check-ups to complete smile makeovers, every treatment is planned with you — clearly
              explained, fairly priced and beautifully executed.
            </p>
          </Reveal>
        </div>

        <div
          ref={listRef}
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
          className="relative mt-16 md:mt-24"
        >
          <ul className="border-b border-pine/15">
            {SERVICES.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: EASE }}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                className="border-t border-pine/15"
              >
                <a
                  href="#book"
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-7 md:grid-cols-12 md:gap-6 md:py-9"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-cream transition-transform duration-700 ease-expo group-hover:scale-y-100" />

                  <span className="relative text-xs font-semibold tracking-[0.2em] text-stone md:col-span-1">
                    0{i + 1}
                  </span>

                  <span className="relative flex items-center gap-4 md:col-span-6">
                    <Image
                      src={s.image}
                      alt=""
                      width={72}
                      height={72}
                      className="size-14 shrink-0 rounded-xl object-cover md:hidden"
                    />
                    <span className="font-serif text-3xl leading-none tracking-tight text-pine transition-transform duration-700 ease-expo group-hover:translate-x-3 md:text-5xl">
                      {s.title}
                    </span>
                  </span>

                  <span className="relative hidden text-sm leading-relaxed text-stone md:col-span-3 md:block">
                    {s.text}
                  </span>

                  <span className="relative flex items-center justify-end gap-5 md:col-span-2">
                    <span className="hidden rounded-full border border-pine/15 px-3 py-1 text-xs font-medium text-stone xl:inline">
                      {s.tag}
                    </span>
                    <span className="grid size-11 place-items-center rounded-full border border-pine/20 text-pine transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:border-pine group-hover:bg-pine group-hover:text-ivory">
                      <ArrowUpRight className="size-4" strokeWidth={1.8} />
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Cursor-following preview (desktop, mouse only) */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[300px] w-[240px] md:block"
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
            animate={{
              opacity: active === null ? 0 : 1,
              scale: active === null ? 0.6 : 1,
              rotate: active === null ? -6 : 0,
            }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="relative size-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(22,50,45,0.45)]">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.15 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Image src={s.image} alt="" fill sizes="240px" className="object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
