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
    <section className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
      <div className="glow-primary pointer-events-none absolute inset-x-0 top-0 h-80" />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent_75%)]" />

      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-[0.7rem] text-primary">
            Última chamada
          </span>
          <h2 className="mt-5 text-balance text-4xl leading-[1.04] md:text-6xl">
            Seu primeiro escudo{" "}
            <span className="serif-accent text-primary">profissional</span>{" "}
            começa hoje
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
            {subtitulo}
          </p>

          <div className="mt-9 flex justify-center">
            <BuyButton
              promoLabel="Garantir por R$47"
              className="h-13 rounded-full px-9 text-base"
            >
              {finalCta.cta}
            </BuyButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
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
