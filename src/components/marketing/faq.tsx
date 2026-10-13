import { faq } from "@/data/site";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="Dúvidas frequentes"
        title={
          <>
            Perguntas que{" "}
            <span className="serif-accent text-primary">talvez você tenha</span>
          </>
        }
      />

      <Reveal className="mx-auto mt-14 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faq.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-card px-5 transition-colors hover:border-white/20"
            >
              <AccordionTrigger className="text-left font-medium">
                {f.pergunta}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.resposta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
