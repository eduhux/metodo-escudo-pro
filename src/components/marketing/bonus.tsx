import { Gift, Check } from "lucide-react";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BuyButton } from "./buy-button";

const amostras = [
  { label: "Aa", family: "Georgia, 'Times New Roman', serif" },
  { label: "Aa", family: "system-ui, Arial, sans-serif" },
  { label: "Aa", family: "'Courier New', monospace" },
  { label: "Ag", family: "'Brush Script MT', cursive" },
  { label: "Aa", family: "Impact, Haettenschweiler, sans-serif" },
  { label: "Ag", family: "'Palatino Linotype', Palatino, serif" },
];

const perks = ["Mais de 200 fontes", "Prontas para usar", "Acesso imediato"];

export function Bonus() {
  return (
    <Section id="bonus">
      <Reveal>
        <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-card to-secondary/40 p-8 md:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            {/* Texto */}
            <div>
              <Badge>
                <Gift className="h-3.5 w-3.5" />
                Bônus exclusivo — grátis
              </Badge>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
                <span className="text-gradient-accent">+200 fontes premium</span>{" "}
                de brinde
              </h2>

              <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
                As mesmas fontes que eu uso nos meus projetos profissionais,
                inclusas{" "}
                <strong className="text-foreground/90">gratuitamente</strong> ao
                entrar no curso. Acesso imediato junto com as aulas — para você
                desenvolver escudos com tipografia de alto nível desde o primeiro dia.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2.5">
                {perks.map((p) => (
                  <li
                    key={p}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-sm"
                  >
                    <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <BuyButton>Quero o curso + bônus</BuyButton>
              </div>
            </div>

            {/* Visual das fontes */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="grid grid-cols-3 gap-3">
                {amostras.map((f, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-xl border border-border bg-card/70 text-4xl text-foreground/90"
                    style={{ fontFamily: f.family }}
                  >
                    {f.label}
                  </div>
                ))}
              </div>

              <div className="absolute -bottom-5 -right-2 flex flex-col items-center justify-center rounded-2xl bg-primary px-5 py-3 text-center text-primary-foreground shadow-lg shadow-primary/30">
                <span className="text-2xl font-bold leading-none">+200</span>
                <span className="text-[11px] font-medium uppercase tracking-wider">
                  fontes
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
