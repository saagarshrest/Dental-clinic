"use client";

import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { Logo } from "./ui/Logo";
import { EASE } from "./ui/Reveal";

const COLUMNS = [
  {
    title: "Treatments",
    links: ["Preventive care", "Teeth whitening", "Clear aligners", "Dental implants", "Porcelain veneers"],
    href: "#treatments",
  },
  {
    title: "Studio",
    links: ["Your visit", "Technology", "Our team", "Reviews", "FAQ"],
    href: "#journey",
  },
  {
    title: "Follow",
    links: ["Instagram", "Facebook", "Google Reviews", "TikTok"],
    href: "#",
  },
];

export default function Footer() {
  const lenis = useLenis();

  return (
    <footer className="relative overflow-hidden bg-ivory pt-24">
      <div className="container-x">
        <div className="grid gap-14 border-b border-pine/15 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs leading-relaxed text-stone">
              Modern dentistry, gently done. Cosmetic, restorative and family care in the heart of the city.
            </p>
            <form
              className="mt-8 flex max-w-sm items-center border-b border-pine/25 pb-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                placeholder="Smile tips, once a month"
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-stone/70"
              />
              <button type="submit" className="text-sm font-semibold text-pine">
                Subscribe
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href={col.href} className="group relative text-pine">
                      {l}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-expo group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2 lg:text-right">
            <button
              type="button"
              onClick={() => lenis?.scrollTo(0, { duration: 2 })}
              className="inline-flex items-center gap-3 text-sm font-semibold text-pine"
            >
              Back to top
              <span className="grid size-10 place-items-center rounded-full border border-pine/20 transition-colors hover:bg-pine hover:text-ivory">
                <ArrowUp className="size-4" strokeWidth={1.8} />
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-xs text-stone sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Lumière Dental Studio. All rights reserved.</p>
          <p className="flex gap-6">
            <a href="#" className="hover:text-pine">
              Privacy
            </a>
            <a href="#" className="hover:text-pine">
              Accessibility
            </a>
            <a href="#" className="hover:text-pine">
              Patient forms
            </a>
          </p>
        </div>
      </div>

      <div className="overflow-hidden pt-[4vw]" aria-hidden>
        <motion.p
          className="text-display select-none text-center text-[30vw] leading-[0.74] text-pine"
          initial={{ y: "60%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          Lumière
        </motion.p>
      </div>
    </footer>
  );
}
