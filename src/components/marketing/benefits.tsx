import { benefits } from "@/data/site";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

export function Benefits() {
  return (
    <Section id="beneficios">
      <SectionHeading
        eyebrow="Por que este método"
        title="Tudo o que você precisa para dominar o desenvolvimento de escudos"
        subtitle="Um caminho claro e prático que leva iniciantes ao nível profissional no desenvolvimento de escudos."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b, i) => (
          <Reveal key={b.titulo} delay={i}>
            <Card className="group h-full bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{b.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {b.texto}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
