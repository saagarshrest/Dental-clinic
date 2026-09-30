"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useInView } from "motion/react";
import scan from "@/public/images/svc-scan.jpg";
import guided from "@/public/images/tech-3d.jpg";
import xray from "@/public/images/svc-implants.jpg";
import comfort from "@/public/images/clinic-teal.jpg";
import { EASE, Reveal, SectionLabel, SplitHeading } from "./ui/Reveal";

type Feature = { title: string; text: string; points: string[]; image: StaticImageData };

const FEATURES: Feature[] = [
  {
    title: "3D digital scanning",
    text: "No more uncomfortable impressions. A 90-second intraoral scan maps your smile with micron-level precision.",
    points: ["No impression trays", "Instant 3D preview"],
    image: scan,
  },
  {
    title: "Guided implant surgery",
    text: "Cone-beam CT and 3D-printed surgical guides make implant placement precise, predictable and minimally invasive.",
    points: ["Faster healing", "Keyhole precision"],
    image: guided,
  },
  {
    title: "Low-dose digital X-rays",
    text: "Up to 90% less radiation than film, with high-definition images we review together, chairside.",
    points: ["90% less radiation", "Results in seconds"],
    image: xray,
  },
  {
    title: "Comfort-first rooms",
    text: "Computer-controlled anaesthesia, sedation options, weighted blankets and your own playlist. Seriously.",
    points: ["Sedation available", "Anxious patients welcome"],
    image: comfort,
  },
];

function FeatureBlock({
  feature,
  index,
  onActive,
}: {
  feature: Feature;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-49% 0px -49% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex min-h-[70svh] flex-col justify-center py-10 lg:min-h-[85svh]">
      {/* Mobile image */}
      <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-3xl lg:hidden">
        <Image src={feature.image} alt="" fill placeholder="blur" sizes="90vw" className="object-cover" />
      </div>

      <div
        className="transition-opacity duration-700 lg:opacity-(--o)"
        style={{ "--o": inView ? 1 : 0.3 } as React.CSSProperties}
      >
        <span className="text-sm font-semibold tracking-[0.2em] text-gold">
          0{index + 1} / 0{FEATURES.length}
        </span>
        <h3 className="text-display mt-4 text-[clamp(2.2rem,3.8vw,3.8rem)] text-ivory">{feature.title}</h3>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ivory/70">{feature.text}</p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {feature.points.map((p) => (
            <li key={p} className="rounded-full border border-ivory/15 px-4 py-2 text-sm text-ivory/80">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Technology() {
  const [active, setActive] = useState(0);

  return (
    <section id="technology" className="relative bg-pine text-ivory">
      <div className="container-x pb-16 pt-28 md:pt-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel light>Technology</SectionLabel>
            </Reveal>
            <SplitHeading
              text="Precision you can't see. *Comfort you can feel.*"
              className="text-display mt-6 text-[clamp(2.6rem,5.6vw,5.4rem)] text-ivory"
              italicClassName="italic text-sage"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-lg leading-relaxed text-ivory/70">
              We invest in the same tools used by leading university clinics — so treatment is faster, more accurate and
              far more comfortable than you might remember.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container-x grid gap-10 pb-20 lg:grid-cols-12 lg:gap-16 lg:pb-32">
        {/* Sticky visual (desktop) */}
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-[12svh] h-[76svh] overflow-hidden rounded-[2rem]">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="absolute inset-0"
                initial={false}
                animate={{ clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{ scale: i === active ? 1 : 1.2 }}
                  transition={{ duration: 1.6, ease: EASE }}
                >
                  <Image src={f.image} alt={f.title} fill placeholder="blur" sizes="45vw" className="object-cover" />
                </motion.div>
              </motion.div>
            ))}

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-ink/60 to-transparent p-6">
              <span className="font-serif text-2xl italic">{FEATURES[active].title}</span>
              <div className="flex gap-1.5">
                {FEATURES.map((f, i) => (
                  <span
                    key={f.title}
                    className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-ivory" : "w-3 bg-ivory/40"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          {FEATURES.map((f, i) => (
            <FeatureBlock key={f.title} feature={f} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
