"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./ui/Logo";
import { Button } from "./ui/Button";
import { EASE } from "./ui/Reveal";

const LINKS = [
  { href: "#treatments", label: "Treatments" },
  { href: "#journey", label: "Your visit" },
  { href: "#technology", label: "Technology" },
  { href: "#team", label: "Team" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 600 && y > prev && !open);
  });

  const closeMenu = () => {
    lenis?.start();
    setOpen(false);
  };

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gold" style={{ scaleX: progress }} />

      <motion.header
        className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4"
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <motion.div
          className="container-x"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
        >
          <nav
            className={`flex items-center justify-between rounded-full py-2 pl-4 pr-2 transition-all duration-700 ease-expo md:pl-6 ${
              scrolled
                ? "border border-pine/10 bg-ivory/75 shadow-[0_10px_40px_-12px_rgba(22,50,45,0.18)] backdrop-blur-xl"
                : "border border-transparent"
            }`}
          >
            <Logo />

            <ul className="hidden items-center gap-1 lg:flex">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group relative rounded-full px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-ink"
                  >
                    {l.label}
                    <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-expo group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href="tel:+15550142290"
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-ink xl:flex"
              >
                <Phone className="size-4" strokeWidth={1.6} />
                (555) 014-2290
              </a>
              <div className="hidden sm:block">
                <Button href="#book">Book a visit</Button>
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="grid size-11 place-items-center rounded-full bg-pine text-ivory lg:hidden"
                aria-label="Open menu"
                aria-expanded={open}
              >
                <Menu className="size-5" strokeWidth={1.6} />
              </button>
            </div>
          </nav>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-pine text-ivory lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: 0.8, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-x flex items-center justify-between pt-5">
              <Logo light />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-full bg-ivory text-pine"
                aria-label="Close menu"
              >
                <X className="size-5" strokeWidth={1.6} />
              </button>
            </div>

            <ul className="container-x mt-12 flex flex-1 flex-col gap-1">
              {LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-ivory/10">
                  <motion.a
                    href={l.href}
                    onClick={closeMenu}
                    className="flex items-baseline justify-between py-4 font-serif text-5xl"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: EASE }}
                  >
                    {l.label}
                    <span className="font-sans text-xs tracking-[0.2em] text-ivory/40">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              className="container-x flex flex-col gap-4 pb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            >
              <a href="tel:+15550142290" className="text-sm text-ivory/70">
                (555) 014-2290 · hello@lumieredental.com
              </a>
              <div onClick={closeMenu}>
                <Button href="#book" variant="light">
                  Book a visit
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
