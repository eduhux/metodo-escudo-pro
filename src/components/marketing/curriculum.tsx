import { PlayCircle, Clock } from "lucide-react";
import { course, totalLessons } from "@/data/course";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function Curriculum() {
  return (
    <Section id="conteudo" className="bg-secondary/20">
      <SectionHeading
        eyebrow="Conteúdo do curso"
        title="O que você vai aprender, módulo a módulo"
        subtitle={`${course.modulos.length} módulos e ${totalLessons} aulas práticas, do primeiro traço à exportação final.`}
      />

      <Reveal className="mx-auto mt-14 max-w-3xl">
        <Accordion
          type="single"
          collapsible
          defaultValue={course.modulos[0]?.id}
          className="space-y-3"
        >
          {course.modulos.map((m, i) => (
            <AccordionItem key={m.id} value={m.id}>
              <AccordionTrigger>
                <div className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{m.titulo}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  {m.aulas.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-accent/50"
                    >
                      <span className="flex items-center gap-3 text-foreground/90">
                        <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
                        {a.titulo}
                      </span>
                      {a.duracao && (
                        <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {a.duracao}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-6 flex justify-center">
          <Badge variant="glass">
            + Bônus e atualizações futuras inclusos
          </Badge>
        </div>
      </Reveal>
    </Section>
  );
}
