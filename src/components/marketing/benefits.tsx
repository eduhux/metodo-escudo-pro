import { benefits } from "@/data/site";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

export function Benefits() {
  return (
    <Section id="beneficios">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* Título fixo à esquerda */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow text-[0.7rem] text-primary">
            Por que este método
          </span>
          <h2 className="mt-4 text-[2rem] leading-[1.05] md:text-[2.75rem]">
            Tudo o que você precisa para dominar o{" "}
            <span className="serif-accent text-primary">desenvolvimento</span>{" "}
            de escudos
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Um caminho claro e prático que leva iniciantes ao nível profissional
            — sem juntar tutoriais soltos que não levam a lugar nenhum.
          </p>
        </Reveal>

        {/* Lista numerada à direita */}
        <div className="flex flex-col divide-y divide-white/8">
          {benefits.map((b, i) => (
            <Reveal key={b.titulo} delay={i % 3}>
              <div className="group flex gap-5 py-7 first:pt-0 sm:gap-7">
                <span className="pt-1 font-mono text-sm tabular-nums text-primary/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary transition-colors group-hover:bg-primary/20">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold">{b.titulo}</h3>
                  </div>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
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
