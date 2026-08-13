"use client";

import { Flame, Check, ShieldCheck, Lock, Infinity as InfinityIcon, Type } from "lucide-react";
import { oferta } from "@/data/site";
import { promo, checkoutUrl } from "@/lib/promo";
import { usePromo } from "@/hooks/use-promo";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "./countdown";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const selosIcons = [Type, ShieldCheck, InfinityIcon];

export function Offer() {
  const { ativa, tempo } = usePromo();

  return (
    <Section id="oferta">
      <Reveal className="mx-auto max-w-xl">
        <Card className="relative overflow-hidden rounded-none border-primary/50 bg-card p-8 text-center hard-shadow md:p-10">
          {/* Selo circular -52% (só na promo) */}
          {ativa && (
            <div
              aria-label={`${promo.descontoPct} por cento de desconto`}
              className="absolute right-3 top-3 z-10 flex h-16 w-16 rotate-12 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg sm:h-20 sm:w-20"
            >
              <span className="font-display text-2xl leading-none sm:text-3xl">
                -{promo.descontoPct}%
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                OFF
              </span>
            </div>
          )}

          <div className="relative">
            <Badge className="mx-auto rounded-none border-energy font-mono text-xs uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5 text-[hsl(var(--energy))]" />
              {ativa ? "Só por 72 horas · depois volta pra R$ 97" : oferta.escassez}
            </Badge>

            <h2 className="mt-5 text-2xl uppercase tracking-tight md:text-4xl">
              Leve tudo isso hoje
            </h2>

            <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground">
              {ativa ? (
                <>
                  Promoção relâmpago de{" "}
                  <span className="font-semibold text-foreground">72 horas</span>.
                  Quando o contador zerar, o preço volta para R$ 97.
                </>
              ) : (
                <>
                  A{" "}
                  <span className="font-semibold text-foreground">
                    1ª turma de 100 alunos esgotou
                  </span>
                  . Esta é a 2ª, também com 100 vagas.
                </>
              )}
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

            {/* Contador (só na promo) */}
            {ativa && (
              <div className="mt-6 flex flex-col items-center gap-2">
                <p className="font-mono text-[11px] uppercase tracking-widest text-[hsl(var(--energy))]">
                  A promoção acaba em
                </p>
                <Countdown tempo={tempo} size="lg" />
              </div>
            )}

            {/* Preço ancorado */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                {ativa
                  ? "De R$ 97 por apenas:"
                  : "Hoje, na promoção de lançamento:"}
              </p>
              <div className="mt-1 flex items-end justify-center gap-3">
                <span
                  className={
                    ativa
                      ? "pb-1 text-2xl text-[#e879f9] line-through"
                      : "pb-1 text-xl text-muted-foreground line-through"
                  }
                >
                  R$ {ativa ? promo.precoDe : oferta.precoDe}
                </span>
                <span
                  className={
                    ativa
                      ? "promo-glow font-display text-7xl text-primary md:text-8xl"
                      : "font-display text-6xl text-primary md:text-7xl"
                  }
                >
                  R$ {ativa ? promo.precoPor : oferta.precoPor}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {ativa
                  ? "acesso vitalício · à vista ou parcelado no cartão"
                  : "à vista ou parcelado no cartão"}
              </p>
            </div>

            {/* Selos da promo */}
            {ativa && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {promo.selos.map((s, idx) => {
                  const Icon = selosIcons[idx] ?? Check;
                  return (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 rounded-none border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      {s}
                    </span>
                  );
                })}
              </div>
            )}

            <Button
              asChild
              size="lg"
              className="cta-energy mt-7 w-full rounded-none font-display text-lg uppercase tracking-wide"
            >
              <a
                href={checkoutUrl(ativa)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ativa ? "Garantir por R$47" : "Quero garantir por R$197"}
              </a>
            </Button>

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
