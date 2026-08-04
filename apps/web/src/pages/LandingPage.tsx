import CtaBand, { Footer } from "../components/CtaBand";
import DualPlanes from "../components/DualPlanes";
import Faq from "../components/Faq";
import Hero from "../components/Hero";
import Impact from "../components/Impact";
import Integrations from "../components/Integrations";
import Nav from "../components/Nav";
import Pillars from "../components/Pillars";
import Pipeline from "../components/Pipeline";
import Surfaces from "../components/Surfaces";
import TrustStrip from "../components/TrustStrip";

export default function LandingPage() {
  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Impact />
        <Pillars />
        <Pipeline />
        <Surfaces />
        <DualPlanes />
        <Integrations />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
