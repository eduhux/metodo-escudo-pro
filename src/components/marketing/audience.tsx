import { paraQuemE } from "@/data/site";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

export function Audience() {
  return (
    <Section id="para-quem">
      <SectionHeading
        eyebrow="Para quem é"
        title={
          <>
            Este curso é{" "}
            <span className="serif-accent text-primary">para você</span>
          </>
        }
        subtitle="Não importa o seu ponto de partida: o método foi desenhado para levar você ao próximo nível."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {paraQuemE.map((p, i) => (
          <Reveal key={p.titulo} delay={i}>
            <Card className="card-glow h-full rounded-2xl border-white/10 bg-card p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <p.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{p.titulo}</h3>
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
