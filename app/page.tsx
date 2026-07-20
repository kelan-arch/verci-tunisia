import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Journey from "@/components/Journey";
import ImageBreak from "@/components/ImageBreak";
import Itinerary from "@/components/Itinerary";
import Experiences from "@/components/Experiences";
import Accommodations from "@/components/Accommodations";
import Details from "@/components/Details";
import ApplyCTA from "@/components/ApplyCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="grain">
      <Hero />
      <Marquee />
      <Journey />
      <ImageBreak
        src="/images/tunisia-046.jpg"
        alt="Tozeur palm grove"
        text="Seven days. Three landscapes. One quest."
      />
      <Itinerary />
      <ImageBreak
        src="/images/tunisia-082.jpg"
        alt="Sahara desert dunes"
      />
      <Experiences />
      <Accommodations />
      <Details />
      <ApplyCTA />
      <Footer />
    </main>
  );
}
