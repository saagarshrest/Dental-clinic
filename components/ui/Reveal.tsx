"use client";

import { motion } from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, y = 36, duration = 1 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type Token = { word: string; italic: boolean };

/** Splits "The art of a *confident* smile" into words, marking *starred* runs as italic. */
function tokenize(text: string): Token[] {
  let italic = false;
  return text.split(" ").map((raw) => {
    let word = raw;
    const opens = word.startsWith("*");
    if (opens) {
      italic = true;
      word = word.slice(1);
    }
    const isItalic = italic;
    if (word.endsWith("*") || word.match(/\*[.,!?]$/)) {
      italic = false;
      word = word.replace("*", "");
    }
    return { word, italic: isItalic };
  });
}

type SplitHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  italicClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate immediately on mount instead of waiting to scroll into view. */
  onMount?: boolean;
};

/** Heading whose words rise up out of a mask, one after another. */
export function SplitHeading({
  text,
  as: Tag = "h2",
  className,
  italicClassName = "italic text-pine-soft",
  delay = 0,
  stagger = 0.07,
  onMount = false,
}: SplitHeadingProps) {
  const tokens = tokenize(text);
  const trigger = onMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag className={className} aria-label={tokens.map((t) => t.word).join(" ")}>
      <motion.span
        aria-hidden
        className="block"
        initial="hidden"
        {...trigger}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {tokens.map((t, i) => (
          <span key={i} className="mb-[-0.14em] inline-block overflow-hidden pb-[0.14em] pr-[0.06em] align-bottom">
            <motion.span
              className={`inline-block ${t.italic ? italicClassName : ""}`}
              variants={{
                hidden: { y: "115%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE } },
              }}
            >
              {t.word}
            </motion.span>
            {i < tokens.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] ${
        light ? "text-sage" : "text-stone"
      }`}
    >
      <span className="h-px w-8 bg-gold" />
      {children}
    </span>
  );
}
