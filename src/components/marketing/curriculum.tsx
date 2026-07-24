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
        subtitle={`Um método completo em ${course.modulos.length} módulos — da criação das formas até a precificação e venda.`}
      />

      <div className="mx-auto mt-14 max-w-3xl space-y-3">
        {course.modulos.map((m, i) => (
          <Reveal key={m.id} delay={i}>
            <Card className="card-glow flex items-center gap-4 bg-card/60 p-5 transition-all duration-300 hover:border-primary/30">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-medium md:text-lg">{m.titulo}</p>
              <Shield className="ml-auto hidden h-5 w-5 text-muted-foreground/40 sm:block" />
            </Card>
          </Reveal>
        ))}

        <div className="flex justify-center pt-3">
          <Badge variant="glass">+ Bônus e atualizações futuras inclusos</Badge>
        </div>
      </div>
    </Section>
  );
}
