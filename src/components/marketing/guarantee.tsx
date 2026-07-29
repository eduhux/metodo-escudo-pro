import { garantia } from "@/data/site";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

export function Guarantee() {
  const Icon = garantia.icon;
  return (
    <Section id="garantia">
      <Reveal className="mx-auto max-w-3xl">
        <Card className="relative overflow-hidden rounded-none border-border bg-card p-8 md:p-12">
          <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-none bg-primary text-primary-foreground hard-shadow">
              <Icon className="h-10 w-10" />
            </div>
            <div>
              <h3 className="text-2xl uppercase">{garantia.titulo}</h3>
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
