import { Hero } from "@/components/marketing/hero";
import { Benefits } from "@/components/marketing/benefits";
import { Curriculum } from "@/components/marketing/curriculum";
import { Audience } from "@/components/marketing/audience";
import { Testimonials } from "@/components/marketing/testimonials";
import { Guarantee } from "@/components/marketing/guarantee";
import { Faq } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Curriculum />
      <Audience />
      <Testimonials />
      <Guarantee />
      <Faq />
      <FinalCta />
    </>
  );
}
