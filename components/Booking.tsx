"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Clock, LoaderCircle, Mail, MapPin, Phone } from "lucide-react";
import { EASE, Reveal, SectionLabel, SplitHeading } from "./ui/Reveal";

const HOURS = [
  ["Monday – Thursday", "8:00 – 19:00"],
  ["Friday", "8:00 – 17:00"],
  ["Saturday", "9:00 – 14:00"],
  ["Sunday", "Closed"],
];

const TREATMENTS = [
  "New patient consultation",
  "Check-up & hygiene",
  "Teeth whitening",
  "Clear aligners",
  "Dental implants",
  "Porcelain veneers",
  "Emergency appointment",
];

const field =
  "peer w-full rounded-none border-0 border-b border-pine/20 bg-transparent px-0 pb-3 pt-6 text-base text-ink outline-none transition-colors placeholder:text-transparent focus:border-pine";
const label =
  "pointer-events-none absolute left-0 top-6 origin-left text-base text-stone transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-pine peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

function Field({
  name,
  label: text,
  type = "text",
  required = false,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={text}
        className={field}
      />
      <label htmlFor={name} className={label}>
        {text}
        {required && <span className="text-gold"> *</span>}
      </label>
    </div>
  );
}

export default function Booking() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [name, setName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setName(String(data.get("name") ?? "").split(" ")[0]);
    setStatus("sending");
    // Placeholder: connect this to your booking system, email service or API route.
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("sent");
  }

  return (
    <section id="book" className="relative overflow-hidden bg-pine py-28 text-ivory md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[40rem] rounded-full bg-sage/10 blur-[120px]"
      />

      <div className="container-x relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel light>Book a visit</SectionLabel>
          </Reveal>
          <SplitHeading
            text="Your new smile *starts here.*"
            className="text-display mt-6 text-[clamp(2.8rem,6vw,5.8rem)] text-ivory"
            italicClassName="italic text-sage"
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ivory/70">
              Request an appointment and our care coordinator will call you within one business day to find a time that
              suits you.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-12 space-y-5 text-ivory/85">
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="group flex items-start gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.6} />
              <span>
                18 Linden Row, Suite 200
                <br />
                Portland, OR 97205
              </span>
            </a>
            <a href="tel:+15550142290" className="flex items-center gap-4 transition-colors hover:text-ivory">
              <Phone className="size-5 text-gold" strokeWidth={1.6} />
              (555) 014-2290
            </a>
            <a
              href="mailto:hello@lumieredental.com"
              className="flex items-center gap-4 transition-colors hover:text-ivory"
            >
              <Mail className="size-5 text-gold" strokeWidth={1.6} />
              hello@lumieredental.com
            </a>
          </Reveal>

          <Reveal delay={0.3} className="mt-12 rounded-3xl border border-ivory/10 p-6">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              <Clock className="size-4" strokeWidth={1.8} /> Opening hours
            </p>
            <dl className="mt-4 divide-y divide-ivory/10 text-sm">
              {HOURS.map(([d, h]) => (
                <div key={d} className="flex justify-between py-2.5">
                  <dt className="text-ivory/70">{d}</dt>
                  <dd className="font-medium">{h}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1} y={60}>
          <div className="relative overflow-hidden rounded-[2rem] bg-ivory p-7 text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] md:p-12">
            <AnimatePresence mode="wait">
              {status !== "sent" ? (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="space-y-7"
                >
                  <h3 className="font-serif text-4xl text-pine">Request an appointment</h3>
                  <div className="grid gap-7 md:grid-cols-2">
                    <Field name="name" label="Full name" required autoComplete="name" />
                    <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
                  </div>
                  <Field name="email" label="Email" type="email" required autoComplete="email" />
                  <div className="grid gap-7 md:grid-cols-2">
                    <div className="relative">
                      <label htmlFor="treatment" className="text-xs text-stone">
                        Treatment
                      </label>
                      <select
                        id="treatment"
                        name="treatment"
                        defaultValue={TREATMENTS[0]}
                        className="w-full cursor-pointer appearance-none border-0 border-b border-pine/20 bg-transparent pb-3 pt-2 text-base outline-none focus:border-pine"
                      >
                        {TREATMENTS.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="relative">
                      <label htmlFor="date" className="text-xs text-stone">
                        Preferred date
                      </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        className="w-full border-0 border-b border-pine/20 bg-transparent pb-3 pt-2 text-base outline-none focus:border-pine"
                      />
                    </div>
                  </div>
                  <Field name="message" label="Anything we should know? (optional)" />

                  <div className="flex flex-col-reverse items-start justify-between gap-5 pt-2 sm:flex-row sm:items-center">
                    <p className="max-w-[16rem] text-xs leading-relaxed text-stone">
                      We&apos;ll only use your details to arrange your visit.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex items-center gap-4 rounded-full bg-pine py-2 pl-7 pr-2 text-sm font-semibold text-ivory transition-colors hover:bg-ink disabled:opacity-70"
                    >
                      {status === "sending" ? "Sending…" : "Request appointment"}
                      <span className="grid size-10 place-items-center rounded-full bg-ivory text-pine transition-transform duration-500 ease-expo group-hover:rotate-45">
                        {status === "sending" ? (
                          <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                          <ArrowUpRight className="size-4" strokeWidth={2} />
                        )}
                      </span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="flex min-h-[28rem] flex-col items-start justify-center"
                  role="status"
                >
                  <svg
                    viewBox="0 0 52 52"
                    className="size-16 text-pine"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <motion.circle
                      cx="26"
                      cy="26"
                      r="24"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: EASE }}
                    />
                    <motion.path
                      d="M15 27l7 7 15-16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
                    />
                  </svg>
                  <h3 className="mt-8 font-serif text-5xl text-pine">Thank you{name ? `, ${name}` : ""}.</h3>
                  <p className="mt-4 max-w-sm text-lg leading-relaxed text-stone">
                    Your request is in. We&apos;ll call you within one business day to confirm your appointment.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-10 text-sm font-semibold text-pine underline decoration-gold underline-offset-4"
                  >
                    Book another visit
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
