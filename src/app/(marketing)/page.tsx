import { Hero } from "@/components/marketing/hero";
import { Marquee } from "@/components/marketing/marquee";
import { EscudosShowcase } from "@/components/marketing/escudos-showcase";
import { Benefits } from "@/components/marketing/benefits";
import { Curriculum } from "@/components/marketing/curriculum";
import { Bonus } from "@/components/marketing/bonus";
import { Audience } from "@/components/marketing/audience";
import { Testimonials } from "@/components/marketing/testimonials";
import { Guarantee } from "@/components/marketing/guarantee";
import { Offer } from "@/components/marketing/offer";
import { Faq } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Marquee />
      <EscudosShowcase />
      <Benefits />
      <Curriculum />
      <Bonus />
      <Audience />
      <Testimonials />
      <Guarantee />
      <div aria-hidden className="container">
        <div
          className="mx-auto h-7 max-w-4xl stripes-energy opacity-30"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent)",
          }}
        />
      </div>
      <Offer />
      <Faq />
      <FinalCta />
    </>
  );
}
