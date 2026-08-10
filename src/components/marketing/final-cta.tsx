"use client";

import { finalCta, beneficiosAcesso } from "@/data/site";
import { promo } from "@/lib/promo";
import { usePromo } from "@/hooks/use-promo";
import { Reveal } from "@/components/shared/reveal";
import { BuyButton } from "./buy-button";

export function FinalCta() {
  const { ativa } = usePromo();

  const subtitulo = ativa
    ? `Curso completo, +200 fontes premium de bônus e 7 dias de garantia. Só por 72 horas: de R$${promo.precoDe} por R$${promo.precoPor} — depois volta pra R$${promo.precoDe}.`
    : finalCta.subtitulo;

  return (
    <section className="relative overflow-hidden border-t border-border py-24 md:py-32">
      <div
        className="stripe-lime pointer-events-none absolute inset-x-0 top-0 h-16 opacity-30"
        style={{
          maskImage: "linear-gradient(180deg, #000, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, #000, transparent)",
        }}
      />

      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            // Última chamada
          </p>
          <h2 className="mt-4 text-balance text-4xl uppercase leading-[1.02] md:text-6xl">
            {finalCta.titulo}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
            {subtitulo}
          </p>

          <div className="mt-9 flex justify-center">
            <BuyButton
              promoLabel="Garantir por R$47"
              className="rounded-none px-10 font-display text-lg uppercase tracking-wide"
            >
              {finalCta.cta}
            </BuyButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            {beneficiosAcesso.map((b) => (
              <span key={b.texto} className="inline-flex items-center gap-1.5">
                <b.icon className="h-4 w-4 text-primary" />
                {b.texto}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
