import Invitation from "@/components/Invitation";
import Marquee from "@/components/Marquee";
import Pitch from "@/components/Pitch";
import RouteMap from "@/components/RouteMap";
import Postcards from "@/components/Postcards";
import HeadingSouth from "@/components/HeadingSouth";
import Oases from "@/components/Oases";
import SaharaNight from "@/components/SaharaNight";
import JoinCTA from "@/components/JoinCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="grain">
      <Invitation />
      <Marquee />
      <Pitch />
      <RouteMap />
      <Postcards />
      <HeadingSouth />
      <Oases />
      <SaharaNight />
      <JoinCTA />
      <Footer />
    </main>
  );
}
