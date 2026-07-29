import Image from "next/image";
import { escudos, totalEscudos } from "@/data/escudos";

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
            className="relative h-32 w-32 shrink-0 rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/40 to-background/40 sm:h-40 sm:w-40"
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
        <p className="text-sm font-semibold uppercase tracking-widest text-energy">
          Portfólio
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Escudos desenvolvidos pelo professor
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Uma amostra do nível que você vai aprender a alcançar. Mais de{" "}
          {totalEscudos} escudos criados do zero no CorelDRAW.
        </p>
      </div>

      <div className="mt-12 space-y-5">
        <Row items={row1} />
        <Row items={row2.length ? row2 : row1} reverse />
      </div>
    </section>
  );
}
