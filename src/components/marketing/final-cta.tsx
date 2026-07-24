import { finalCta, beneficiosAcesso } from "@/data/site";
import { Reveal } from "@/components/shared/reveal";
import { BuyButton } from "./buy-button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] glow-primary rotate-180" />

      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-gradient md:text-5xl">
            {finalCta.titulo}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
            {finalCta.subtitulo}
          </p>

          <div className="mt-9 flex justify-center">
            <BuyButton className="px-10">{finalCta.cta}</BuyButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
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
