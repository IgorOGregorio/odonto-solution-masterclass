import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Gallery } from "@/components/sections/gallery";
import { Scheduling } from "@/components/sections/scheduling";
import { Location } from "@/components/sections/location";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <About />
        <Gallery />
        <Scheduling />
        <Location />
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton variant="fab" />
    </>
  );
}
