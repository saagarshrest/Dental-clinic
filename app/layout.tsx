import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière Dental Studio — Modern dentistry, gently done",
  description:
    "A boutique dental studio for cosmetic, restorative and family dentistry. Advanced technology, unhurried care and a calm, beautiful space.",
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="grain font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
