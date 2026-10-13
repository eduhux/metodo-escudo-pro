import { Star, Quote } from "lucide-react";
import { depoimentos } from "@/data/site";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Testimonials() {
  return (
    <Section id="depoimentos">
      <SectionHeading
        eyebrow="Depoimentos"
        title={
          <>
            Quem fez,{" "}
            <span className="serif-accent text-primary">aprovou</span>
          </>
        }
        subtitle="Alunos que saíram do zero e hoje desenvolvem escudos profissionais."
      />

      <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
        {depoimentos.map((d, i) => (
          <Reveal key={d.nome} delay={i % 2}>
            <Card className="card-glow relative h-full rounded-2xl border-white/10 bg-card p-6">
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/20" />
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-pretty leading-relaxed text-foreground/90">
                “{d.texto}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="border border-white/10">
                  <AvatarFallback className="bg-primary/12 text-sm font-semibold text-primary">
                    {d.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{d.nome}</p>
                  <p className="text-xs text-muted-foreground">{d.papel}</p>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
