import { paraQuemE } from "@/data/site";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

export function Audience() {
  return (
    <Section id="para-quem">
      <SectionHeading
        eyebrow="Para quem é"
        title="Este curso é para você"
        subtitle="Não importa o seu ponto de partida — o método foi desenhado para levar você ao próximo nível."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {paraQuemE.map((p, i) => (
          <Reveal key={p.titulo} delay={i}>
            <Card className="h-full bg-card/60 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
                <p.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-semibold">{p.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.texto}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
