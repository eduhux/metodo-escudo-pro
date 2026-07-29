import { Shield } from "lucide-react";
import { course } from "@/data/course";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Curriculum() {
  return (
    <Section id="conteudo" className="bg-secondary/20">
      <SectionHeading
        eyebrow="Conteúdo do curso"
        title="O que você vai aprender, módulo a módulo"
        subtitle="Uma aula inicial e 5 módulos completos, do desenvolvimento das formas até a precificação e venda."
      />

      <div className="mx-auto mt-14 max-w-3xl space-y-3">
        {course.modulos.map((m, i) => (
          <Reveal key={m.id} delay={i}>
            <Card className="card-glow flex items-center gap-4 rounded-none border-border bg-card p-5 transition-all duration-300 hover:border-primary/40">
              <span className="font-mono text-xl leading-none text-primary">
                {String(i).padStart(2, "0")}
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </span>
              <p className="font-medium uppercase tracking-wide md:text-lg">
                {m.titulo}
              </p>
            </Card>
          </Reveal>
        ))}

        <div className="flex justify-center pt-3">
          <Badge
            variant="outline"
            className="rounded-none font-mono text-xs uppercase tracking-wider"
          >
            + Bônus e atualizações inclusos
          </Badge>
        </div>
      </div>
    </Section>
  );
}
