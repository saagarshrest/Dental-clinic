"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { EASE, Reveal, SectionLabel, SplitHeading } from "./ui/Reveal";

const FAQS = [
  {
    q: "Do you accept my insurance?",
    a: "We're in-network with most major PPO plans and happily file claims on your behalf. For everything else, we offer transparent pricing and flexible 0% financing.",
  },
  {
    q: "I'm nervous about the dentist. Can you help?",
    a: "Absolutely — it's something we're known for. Let us know ahead of time and we'll plan a gentler visit: longer appointments, computer-guided anaesthesia, headphones, and sedation if you'd like it.",
  },
  {
    q: "How long does clear aligner treatment take?",
    a: "Most cases take between 4 and 12 months. After your 3D scan we'll show you a simulation of your final result and an exact timeline before you commit.",
  },
  {
    q: "Do you see emergency patients?",
    a: "Yes. We hold same-day appointments every weekday for existing and new patients. Call us and we'll see you as soon as we can.",
  },
  {
    q: "Is professional whitening safe for sensitive teeth?",
    a: "It is. We use a low-sensitivity professional gel and custom-fitted trays, and adjust the strength to your comfort throughout.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 md:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionLabel>FAQ</SectionLabel>
            </Reveal>
            <SplitHeading
              text="Questions, *answered.*"
              className="text-display mt-6 text-[clamp(2.6rem,5.6vw,5.4rem)] text-pine"
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-sm text-lg leading-relaxed text-stone">
                Can&apos;t find what you&apos;re looking for? Call us on{" "}
                <a
                  href="tel:+15550142290"
                  className="font-semibold text-pine underline decoration-gold underline-offset-4"
                >
                  (555) 014-2290
                </a>{" "}
                — a real person will pick up.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.06} y={24}>
                <div className="border-b border-pine/15">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-2xl text-pine md:text-3xl">{item.q}</span>
                    <motion.span
                      className={`grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                        isOpen ? "border-pine bg-pine text-ivory" : "border-pine/20 text-pine"
                      }`}
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <Plus className="size-4" strokeWidth={1.8} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-8 text-base leading-relaxed text-stone md:text-lg">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
