import { benefits } from "@/data/site";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

export function Benefits() {
  return (
    <Section id="beneficios">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Título fixo à esquerda */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            <span aria-hidden>//</span>
            Por que este método
          </span>
          <h2 className="mt-4 text-3xl uppercase leading-[1.08] md:text-4xl">
            Tudo o que você precisa para dominar o desenvolvimento de escudos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Um caminho claro e prático que leva iniciantes ao nível profissional
            no desenvolvimento de escudos.
          </p>
        </Reveal>

        {/* Lista numerada à direita */}
        <div className="divide-y divide-border">
          {benefits.map((b, i) => (
            <Reveal key={b.titulo} delay={i % 3}>
              <div className="group flex gap-5 py-6 first:pt-0 sm:gap-7">
                <span className="pt-0.5 font-mono text-2xl leading-none text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <b.icon className="h-5 w-5 shrink-0 text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-[hsl(var(--energy))]" />
                    <h3 className="text-lg uppercase">{b.titulo}</h3>
                  </div>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {b.texto}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
