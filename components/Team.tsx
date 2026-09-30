"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useTransform } from "motion/react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import elena from "@/public/images/team-1.jpg";
import arjun from "@/public/images/team-2.jpg";
import sofia from "@/public/images/team-3.jpg";
import kenji from "@/public/images/team-4.jpg";
import { EASE, Reveal, SectionLabel, SplitHeading } from "./ui/Reveal";

type Member = { name: string; role: string; bio: string; image: StaticImageData; position: string };

const TEAM: Member[] = [
  {
    name: "Dr. Elena Marsh",
    role: "Founder · Cosmetic Dentist",
    bio: "18 years crafting natural, confident smiles.",
    image: elena,
    position: "45% 30%",
  },
  {
    name: "Dr. Arjun Mehta",
    role: "Implantologist",
    bio: "Guided implant surgery & full-arch restorations.",
    image: arjun,
    position: "50% 25%",
  },
  {
    name: "Dr. Sofia Reyes",
    role: "Orthodontist",
    bio: "Clear aligner specialist for teens and adults.",
    image: sofia,
    position: "50% 15%",
  },
  {
    name: "Dr. Kenji Park",
    role: "Family Dentist",
    bio: "Gentle care for nervous patients and little ones.",
    image: kenji,
    position: "50% 12%",
  },
];

function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, delay: index * 0.1, ease: EASE }}
      className={`group ${index % 2 ? "lg:mt-24" : ""}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-cream">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.06]"
          style={{ objectPosition: member.position }}
        />
        <div className="absolute inset-x-3 bottom-3 translate-y-[120%] rounded-2xl bg-ivory/90 p-4 backdrop-blur transition-transform duration-700 ease-expo group-hover:translate-y-0">
          <p className="text-sm leading-relaxed text-ink">{member.bio}</p>
        </div>
      </div>
      <h3 className="mt-5 font-serif text-3xl text-pine">{member.name}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone">{member.role}</p>
      <p className="mt-3 text-sm text-stone lg:hidden">{member.bio}</p>
    </motion.article>
  );
}

export default function Team() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useScrollProgress(ref, ["start end", "end start"]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <section id="team" ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <motion.p
        aria-hidden
        className="pointer-events-none absolute left-0 top-16 whitespace-nowrap font-serif text-[22vw] italic leading-none text-pine/[0.04]"
        style={{ x: bgX }}
      >
        caring specialists
      </motion.p>

      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>Our team</SectionLabel>
            </Reveal>
            <SplitHeading
              text="Meet the *specialists.*"
              className="text-display mt-6 text-[clamp(2.6rem,5.6vw,5.4rem)] text-pine"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-lg leading-relaxed text-stone">
              A small, senior team who&apos;ve trained across three continents — and who still take the time to get to
              know you.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <MemberCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
