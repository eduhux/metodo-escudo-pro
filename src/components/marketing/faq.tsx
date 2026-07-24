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
    <Section id="faq" className="bg-secondary/20">
      <SectionHeading
        eyebrow="Dúvidas frequentes"
        title="Perguntas que talvez você tenha"
      />

      <Reveal className="mx-auto mt-14 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faq.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{f.pergunta}</AccordionTrigger>
              <AccordionContent>{f.resposta}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
