# Lumière Dental Studio

A modern, single-page website for a boutique dental clinic, built with Next.js 16 (App Router), Tailwind CSS v4, [Motion](https://motion.dev) for animation and [Lenis](https://lenis.darkroom.engineering) for smooth scrolling.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production build
```

## Sections and animations

| Section | File | Effect |
| --- | --- | --- |
| Navbar | `components/Navbar.tsx` | Turns into a frosted pill once you scroll, hides when you scroll down, full-screen mobile menu, gold scroll-progress bar |
| Hero | `components/Hero.tsx` | Masked word-by-word headline, arched portrait with parallax, floating cards |
| Marquee | `components/Marquee.tsx` | Treatment ribbon that speeds up and reverses with scroll velocity |
| Philosophy | `components/Manifesto.tsx` | Words light up one by one as you scroll |
| Studio | `components/StudioReveal.tsx` | Pinned image opens from an inset card to full-bleed |
| Stats | `components/Stats.tsx` | Count-up numbers when they come into view |
| Treatments | `components/Services.tsx` | Editorial list with a photo preview that follows the cursor |
| Your visit | `components/Journey.tsx` | Pinned horizontal scroll through the four steps |
| Technology | `components/Technology.tsx` | Sticky image that wipes between features as you scroll |
| Team | `components/Team.tsx` | Staggered cards, drifting background type, bio on hover |
| Reviews | `components/Testimonials.tsx` | Auto-advancing quote carousel with progress bars |
| FAQ | `components/FAQ.tsx` | Animated accordion |
| Booking | `components/Booking.tsx` | Appointment form with an animated confirmation |
| Footer | `components/Footer.tsx` | Oversized wordmark reveal |

Shared building blocks live in `components/ui/` (`Reveal`, `SplitHeading`, `Magnetic`, `Button`, `Logo`). Colours and fonts are design tokens in `app/globals.css` (`@theme`).

Animations respect the visitor's "reduce motion" setting.

## Before going live

- **Content is placeholder.** The clinic name, address, phone, email, opening hours, team, reviews, ratings and statistics are all made up. Replace them with real details.
- **The booking form isn't connected yet.** `onSubmit` in `components/Booking.tsx` just simulates a request. Wire it to your booking system, an email service or a Next.js route handler.
- **Social and legal links** in the footer point to `#`.

## Images

Photos are from [Unsplash](https://unsplash.com) (free to use under the Unsplash License) and are stored in `public/images/`. To swap a photo, replace the file with one of the same name, or change the import at the top of the component.

## Note on scroll progress

`lib/useScrollProgress.ts` wraps Motion's `useScroll`. Motion v13 hands scroll-linked values to the browser's native `ViewTimeline`, but for input ranges that don't span 0–1 (for example, fading out over the first quarter of a section) the value drifts back and snaps to its start value once the section has scrolled past. The wrapper keeps those transforms on Motion's JavaScript path, where they map correctly. Use it instead of `useScroll({ target })` for new scroll-linked effects.
