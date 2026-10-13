import Image from "next/image";
import { Gift, Check, Shirt, Sparkles, MonitorPlay } from "lucide-react";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BuyButton } from "./buy-button";

const amostras = [
  { label: "Aa", family: "Georgia, 'Times New Roman', serif" },
  { label: "Aa", family: "system-ui, Arial, sans-serif" },
  { label: "Aa", family: "'Courier New', monospace" },
  { label: "Ag", family: "'Brush Script MT', cursive" },
  { label: "Aa", family: "Impact, Haettenschweiler, sans-serif" },
  { label: "Ag", family: "'Palatino Linotype', Palatino, serif" },
];

const perks = ["Mais de 200 fontes", "Prontas para usar", "Acesso imediato"];

const escudosAmostra = [
  "escudo-14.png",
  "escudo-13.png",
  "escudo-06.png",
  "escudo-18.png",
  "escudo-08.png",
  "escudo-24.png",
];

const escudosPerks = [
  "120 escudos em PNG",
  "Referência de proporção e cores",
  "Na sua área de aluno",
];

const mockupEscudoPerks = [
  "Textura e relevo realistas",
  "É só trocar a sua arte",
  "Pronto para apresentar ao cliente",
];

const mockupCamisaPerks = [
  "Camisa 100% personalizável",
  "Escudo aplicado no uniforme",
  "Ideal para fechar clientes",
];

function BonusBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="rounded-full border-energy bg-transparent text-xs font-medium">
      <Gift className="h-3.5 w-3.5 text-[hsl(var(--energy))]" />
      {children}
    </Badge>
  );
}

function Perks({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2.5">
      {items.map((p) => (
        <li
          key={p}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/60 px-3.5 py-1.5 text-sm"
        >
          <Check className="h-4 w-4 text-primary" strokeWidth={3} />
          {p}
        </li>
      ))}
    </ul>
  );
}

function AulaCallout() {
  return (
    <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-foreground">
      <MonitorPlay className="h-4 w-4 shrink-0 text-primary" />
      Inclui aula exclusiva: aplicação passo a passo
    </p>
  );
}

const cardCls =
  "relative overflow-hidden rounded-3xl border-white/10 bg-gradient-to-br from-card to-secondary/40 p-8 md:p-12";

export function Bonus() {
  return (
    <Section id="bonus">
      {/* Bônus 1 — fontes */}
      <Reveal>
        <Card className={cardCls}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <BonusBadge>Bônus 1 · grátis</BonusBadge>
              <h2 className="mt-5 text-3xl md:text-4xl">
                <span className="text-gradient-accent">+200 fontes premium</span>{" "}
                de brinde
              </h2>
              <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
                As mesmas fontes que eu uso nos meus projetos profissionais,
                inclusas{" "}
                <strong className="text-foreground/90">gratuitamente</strong> ao
                entrar no curso. Tipografia de alto nível desde o primeiro dia.
              </p>
              <Perks items={perks} />
              <div className="mt-8">
                <BuyButton>Quero o curso + bônus</BuyButton>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="grid grid-cols-3 gap-3">
                {amostras.map((f, i) => (
                  <div
                    key={i}
                    className="surface flex aspect-square items-center justify-center text-4xl text-foreground/90"
                    style={{ fontFamily: f.family }}
                  >
                    {f.label}
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-5 -right-2 flex flex-col items-center justify-center rounded-2xl bg-primary px-5 py-3 text-center text-primary-foreground lift">
                <span className="text-2xl font-extrabold leading-none">+200</span>
                <span className="text-[11px] font-medium uppercase tracking-wider">
                  fontes
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>

      {/* Bônus 2 — escudos de referência */}
      <Reveal className="mt-6">
        <Card className={cardCls}>
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div className="relative order-2 mx-auto w-full max-w-sm lg:order-1">
              <div className="grid grid-cols-3 gap-3">
                {escudosAmostra.map((src) => (
                  <div
                    key={src}
                    className="surface relative flex aspect-square items-center justify-center p-2"
                  >
                    <Image
                      src={`/escudos/${src}`}
                      alt="Escudo de referência do pack de bônus"
                      fill
                      sizes="120px"
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-5 -left-2 flex flex-col items-center justify-center rounded-2xl bg-[hsl(var(--energy))] px-5 py-3 text-center text-[hsl(var(--energy-foreground))] lift">
                <span className="text-2xl font-extrabold leading-none">+120</span>
                <span className="text-[11px] font-medium uppercase tracking-wider">
                  escudos
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <BonusBadge>Bônus 2 · grátis</BonusBadge>
              <h2 className="mt-5 text-3xl md:text-4xl">
                <span className="text-gradient-accent">+120 escudos</span> de
                referência
              </h2>
              <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
                Nunca mais trave na tela em branco. Você leva uma biblioteca com{" "}
                <strong className="text-foreground/90">
                  120 escudos reais em PNG
                </strong>{" "}
                para estudar proporção, cores e estilos que funcionam — e se
                inspirar na hora.
              </p>
              <Perks items={escudosPerks} />
              <div className="mt-8">
                <BuyButton>Quero o curso + bônus</BuyButton>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>

      {/* Bônus 3 — mockup do escudo */}
      <Reveal className="mt-6">
        <Card className={cardCls}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <BonusBadge>Bônus 3 · grátis</BonusBadge>
              <h2 className="mt-5 text-3xl md:text-4xl">
                <span className="text-gradient-accent">Mockup de apresentação</span>{" "}
                do escudo
              </h2>
              <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
                O mesmo mockup que eu uso para apresentar escudos aos meus
                clientes. Você coloca a sua arte e entrega uma{" "}
                <strong className="text-foreground/90">
                  prévia realista, com textura e relevo
                </strong>
                . A diferença entre "mandar um PNG" e "entregar um projeto".
              </p>
              <Perks items={mockupEscudoPerks} />
              <AulaCallout />
              <div className="mt-8">
                <BuyButton>Quero o curso + bônus</BuyButton>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="surface relative aspect-square overflow-hidden hard-shadow">
                <Image
                  src="/bonus/mockup-escudo.jpg"
                  alt="Mockup de apresentação do escudo aplicado em tecido"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-2 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-primary-foreground lift">
                <Sparkles className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Mockup editável
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>

      {/* Bônus 4 — mockup de camisa */}
      <Reveal className="mt-6">
        <Card className={cardCls}>
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div className="relative order-2 mx-auto w-full max-w-md lg:order-1">
              <div className="surface relative aspect-[16/13] overflow-hidden hard-shadow">
                <Image
                  src="/bonus/mockup-camisa.png"
                  alt="Mockup de camisa de time com o escudo aplicado, em várias cores"
                  fill
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="object-contain p-2"
                />
              </div>
              <div className="absolute -bottom-5 -left-2 inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--energy))] px-4 py-2.5 text-[hsl(var(--energy-foreground))] lift">
                <Shirt className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Camisa personalizável
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <BonusBadge>Bônus 4 · grátis</BonusBadge>
              <h2 className="mt-5 text-3xl md:text-4xl">
                <span className="text-gradient-accent">Mockup de camisa</span> do
                time
              </h2>
              <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
                Apresente o escudo onde ele realmente vive:{" "}
                <strong className="text-foreground/90">no uniforme</strong>.
                Personalize as cores e mostre ao cliente como a arte fica na
                camisa do time. É o argumento que fecha o projeto.
              </p>
              <Perks items={mockupCamisaPerks} />
              <AulaCallout />
              <div className="mt-8">
                <BuyButton>Quero o curso + bônus</BuyButton>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
