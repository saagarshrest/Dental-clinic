import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import StudioReveal from "@/components/StudioReveal";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Journey from "@/components/Journey";
import Technology from "@/components/Technology";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <StudioReveal />
        <Stats />
        <Services />
        <Journey />
        <Technology />
        <Team />
        <Testimonials />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
