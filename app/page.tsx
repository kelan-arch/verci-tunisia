import Invitation from "@/components/Invitation";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import TheWeek from "@/components/TheWeek";
import InstagramEmbed from "@/components/InstagramEmbed";
import Accommodations from "@/components/Accommodations";
import WhosComing from "@/components/WhosComing";
import Eating from "@/components/Eating";
import Activities from "@/components/Activities";
import GettingThere from "@/components/GettingThere";
import RouteMap from "@/components/RouteMap";
import Postcards from "@/components/Postcards";
import FAQ from "@/components/FAQ";
import JoinCTA from "@/components/JoinCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="grain">
      <Invitation />
      <Marquee />
      <AboutSection />
      <TheWeek />
      <InstagramEmbed />
      <Accommodations />
      <WhosComing />
      <Eating />
      <Activities />
      <RouteMap />
      <Postcards />
      <GettingThere />
      <FAQ />
      <JoinCTA />
      <Footer />
    </main>
  );
}
