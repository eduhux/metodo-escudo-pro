import Image from "next/image";
import { escudos, totalEscudos } from "@/data/escudos";
import { Counter } from "@/components/shared/counter";

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="marquee-track flex w-max items-center gap-5"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {[...items, ...items].map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-32 w-32 shrink-0 rounded-none border border-border bg-card sm:h-40 sm:w-40"
          >
            <Image
              src={`/escudos/${src}`}
              alt="Escudo desenvolvido no Método Escudo PRO"
              fill
              sizes="160px"
              className="object-contain p-3"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />
    </div>
  );
}

export function EscudosShowcase() {
  if (!escudos.length) return null;

  const half = Math.ceil(escudos.length / 2);
  const row1 = escudos.slice(0, half);
  const row2 = escudos.slice(half);

  return (
    <section id="escudos" className="py-20 sm:py-28">
      <div className="container text-center">
        <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          <span aria-hidden>//</span>
          Portfólio
        </p>
        <h2 className="mt-4 text-3xl uppercase leading-[1.05] sm:text-5xl">
          Escudos desenvolvidos pelo professor
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Uma amostra do nível que você vai aprender a alcançar. Mais de{" "}
          <Counter
            value={totalEscudos}
            className="font-semibold text-foreground"
          />{" "}
          escudos criados do zero no CorelDRAW.
        </p>
      </div>

      <div className="mt-12 space-y-5">
        <Row items={row1} />
        <Row items={row2.length ? row2 : row1} reverse />
      </div>
    </section>
  );
}
