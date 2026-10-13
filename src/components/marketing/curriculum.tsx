import { Shield } from "lucide-react";
import { course } from "@/data/course";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/** O que o aluno sai sabendo fazer ao final de cada módulo. */
const resultados: Record<string, string> = {
  "aula-inicial":
    "Instale, configure e conheça o ambiente. Você começa do zero de verdade.",
  m1: "Domine as ferramentas de forma para desenhar a base de qualquer escudo.",
  m2: "Cor, contorno e profundidade: o acabamento que separa o amador do profissional.",
  m3: "Junte tudo e desenvolva um escudo completo, do rascunho à arte final.",
  m4: "Apresente o escudo na camisa com um mockup que impressiona o cliente.",
  "mockup-3d":
    "Aplique o escudo em um mockup 3D realista e entregue uma apresentação de impacto.",
  m5: "Saiba quanto cobrar, monte seu portfólio e feche seus primeiros clientes.",
};

export function Curriculum() {
  const totalAulas = course.modulos.reduce((n, m) => n + m.aulas.length, 0);

  return (
    <Section id="conteudo">
      <SectionHeading
        eyebrow="Conteúdo do curso"
        title={
          <>
            O que você vai aprender,{" "}
            <span className="serif-accent text-primary">módulo a módulo</span>
          </>
        }
        subtitle={`Uma aula inicial e 6 módulos práticos — ${totalAulas} aulas do primeiro traço à precificação e venda.`}
      />

      <div className="mx-auto mt-14 max-w-3xl space-y-3">
        {course.modulos.map((m, i) => (
          <Reveal key={m.id} delay={i}>
            <Card className="card-glow flex items-start gap-4 rounded-2xl border-white/10 bg-card p-5">
              <span className="pt-0.5 font-mono text-sm tabular-nums text-primary/70">
                {String(i).padStart(2, "0")}
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <Shield className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="font-semibold md:text-lg">{m.titulo}</p>
                  <span className="text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
                    {m.aulas.length} {m.aulas.length === 1 ? "aula" : "aulas"}
                  </span>
                </div>
                {resultados[m.id] && (
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {resultados[m.id]}
                  </p>
                )}
              </div>
            </Card>
          </Reveal>
        ))}

        <div className="flex justify-center pt-4">
          <Badge
            variant="outline"
            className="rounded-full border-white/15 px-4 py-1.5 text-xs font-medium"
          >
            + Bônus e atualizações inclusos
          </Badge>
        </div>
      </div>
    </Section>
  );
}
