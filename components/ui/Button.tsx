import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
};

/** Pill call-to-action with a rotating arrow disc and a magnetic hover. */
export function Button({ href, children, variant = "dark", className = "" }: ButtonProps) {
  const dark = variant === "dark";
  return (
    <Magnetic>
      <a
        href={href}
        className={`group relative inline-flex items-center gap-4 overflow-hidden rounded-full py-2 pl-7 pr-2 text-sm font-semibold tracking-wide transition-colors duration-500 ${
          dark ? "bg-pine text-ivory hover:bg-ink" : "bg-ivory text-pine hover:bg-white"
        } ${className}`}
      >
        <span>{children}</span>
        <span
          className={`grid size-10 place-items-center rounded-full transition-transform duration-500 ease-(--ease-expo) group-hover:rotate-45 ${
            dark ? "bg-ivory text-pine" : "bg-pine text-ivory"
          }`}
        >
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </span>
      </a>
    </Magnetic>
  );
}
