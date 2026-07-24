import { garantia } from "@/data/site";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

export function Guarantee() {
  const Icon = garantia.icon;
  return (
    <Section id="garantia">
      <Reveal className="mx-auto max-w-3xl">
        <Card className="relative overflow-hidden bg-card/60 p-8 md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground shadow-lg shadow-primary/25">
              <Icon className="h-10 w-10" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{garantia.titulo}</h3>
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
