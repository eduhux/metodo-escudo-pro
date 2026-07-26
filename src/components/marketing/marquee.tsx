import { Shield } from "lucide-react";

const itens = [
  "Escudos de várzea",
  "E-sports",
  "Times amadores",
  "Campeonatos",
  "Identidade visual",
  "CorelDRAW",
  "Portfólio que vende",
  "Do zero ao avançado",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-secondary/20 py-5">
      <div className="marquee-track flex w-max items-center gap-8">
        {[...itens, ...itens].map((t, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest text-muted-foreground/60 md:text-base">
              {t}
            </span>
            <Shield className="h-4 w-4 shrink-0 text-primary/50" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
