export function ToothMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M7 3.5c-2.2 0-3.5 1.8-3.5 4.3 0 2 .7 3.4 1.2 5.2.5 1.9.6 4.2 1.3 6.2.3.9.8 1.3 1.4 1.3.9 0 1.2-.8 1.4-2l.6-3.2c.3-1 1.1-1.6 2.6-1.6s2.3.6 2.6 1.6l.6 3.2c.2 1.2.5 2 1.4 2 .6 0 1.1-.4 1.4-1.3.7-2 .8-4.3 1.3-6.2.5-1.8 1.2-3.2 1.2-5.2 0-2.5-1.3-4.3-3.5-4.3-1.6 0-3.4 1-5 1s-3.4-1-5-1z" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      className={`group flex items-center gap-2.5 ${light ? "text-ivory" : "text-pine"}`}
      aria-label="Lumière Dental Studio — home"
    >
      <span
        className={`grid size-9 place-items-center rounded-full border transition-colors duration-500 ${
          light
            ? "border-ivory/30 group-hover:bg-ivory group-hover:text-pine"
            : "border-pine/20 group-hover:bg-pine group-hover:text-ivory"
        }`}
      >
        <ToothMark className="size-[18px]" />
      </span>
      <span className="leading-none">
        <span className="block font-serif text-[1.55rem] tracking-tight">Lumière</span>
        <span
          className={`block text-[0.55rem] font-semibold uppercase tracking-[0.32em] ${light ? "text-ivory/60" : "text-stone"}`}
        >
          Dental Studio
        </span>
      </span>
    </a>
  );
}
