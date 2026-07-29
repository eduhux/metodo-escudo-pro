import { Flame, Check, ShieldCheck, Lock } from "lucide-react";
import { oferta } from "@/data/site";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BuyButton } from "./buy-button";

export function Offer() {
  return (
    <Section id="oferta">
      <Reveal className="mx-auto max-w-xl">
        <Card className="relative overflow-hidden border-primary/40 bg-gradient-to-b from-card to-secondary/40 p-8 text-center md:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />

          <div className="relative">
            <Badge className="mx-auto border-energy">
              <Flame className="h-3.5 w-3.5 text-[hsl(var(--energy))]" />
              {oferta.escassez}
            </Badge>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-gradient md:text-3xl">
              Leve tudo isso hoje
            </h2>

            <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground">
              A{" "}
              <span className="font-semibold text-foreground">
                1ª turma de 100 alunos esgotou
              </span>
              . Esta é a 2ª, também com 100 vagas.
            </p>

            {/* Empilhamento de valor */}
            <div className="mt-7 space-y-1 text-left">
              {oferta.itens.map((i) => (
                <div
                  key={i.nome}
                  className="flex items-center justify-between gap-3 border-b border-border py-3"
                >
                  <span className="flex items-center gap-2.5 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={3} />
                    {i.nome}
                  </span>
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {i.valor}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 py-3">
                <span className="text-sm font-medium">Valor total</span>
                <span className="text-sm text-muted-foreground line-through">
                  R$ {oferta.valorTotal}
                </span>
              </div>
            </div>

            {/* Preço ancorado */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                Hoje, na promoção de lançamento:
              </p>
              <div className="mt-1 flex items-end justify-center gap-3">
                <span className="pb-1 text-xl text-muted-foreground line-through">
                  R$ {oferta.precoDe}
                </span>
                <span className="text-5xl font-bold text-gradient-accent md:text-6xl">
                  R$ {oferta.precoPor}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                à vista ou parcelado no cartão
              </p>
            </div>

            <BuyButton className="mt-7 w-full" size="lg">
              Quero garantir por R$97
            </BuyButton>

            <div className="mt-5 flex flex-col items-center gap-2 text-xs text-muted-foreground sm:flex-row sm:justify-center sm:gap-5">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Garantia de 7 dias
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-primary" />
                Pagamento 100% seguro
              </span>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
