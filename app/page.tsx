import Invitation from "@/components/Invitation";
import CrackReveal from "@/components/CrackReveal";
import AboutSection from "@/components/AboutSection";
import TheWeek from "@/components/TheWeek";
import InstagramEmbed from "@/components/InstagramEmbed";
import Accommodations from "@/components/Accommodations";
import WhosComing from "@/components/WhosComing";
import RouteMap from "@/components/RouteMap";
import Postcards from "@/components/Postcards";
import FAQ from "@/components/FAQ";
import JoinCTA from "@/components/JoinCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="grain">
      <CrackReveal />
      <Invitation />
      <AboutSection />
      <TheWeek />
      <RouteMap />
      <Accommodations />
      <WhosComing />
      <Postcards />
      <InstagramEmbed />
      <FAQ />
      <JoinCTA />
      <Footer />
    </main>
  );
}
