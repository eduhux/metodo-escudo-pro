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
            className="surface relative h-32 w-32 shrink-0 sm:h-40 sm:w-40"
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
    <section id="escudos" className="py-24 sm:py-28">
      <div className="container text-center">
        <span className="eyebrow text-[0.7rem] text-primary">Portfólio</span>
        <h2 className="mt-4 text-[2rem] leading-[1.04] md:text-5xl">
          Escudos desenvolvidos{" "}
          <span className="serif-accent text-primary">pelo professor</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground md:text-lg">
          Uma amostra do nível que você vai aprender a alcançar.{" "}
          <span className="font-semibold text-foreground">
            +{totalEscudos} escudos
          </span>{" "}
          criados do zero no CorelDRAW.
        </p>
      </div>

      <div className="mt-14 space-y-5">
        <Row items={row1} />
        <Row items={row2.length ? row2 : row1} reverse />
      </div>
    </section>
  );
}
