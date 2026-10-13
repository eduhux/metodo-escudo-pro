import { garantia } from "@/data/site";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

export function Guarantee() {
  const Icon = garantia.icon;
  return (
    <Section id="garantia">
      <Reveal className="mx-auto max-w-3xl">
        <Card className="relative overflow-hidden rounded-3xl border-white/10 bg-gradient-to-br from-card via-card to-primary/5 p-8 hard-shadow md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground lift">
              <Icon className="h-10 w-10" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold md:text-3xl">
                {garantia.titulo}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {garantia.texto}
              </p>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
