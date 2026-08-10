"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { hero, heroChecklist, trustCards } from "@/data/site";
import { promo } from "@/lib/promo";
import { usePromo } from "@/hooks/use-promo";
import { BuyButton } from "./buy-button";
import { HeroEscudos } from "./hero-escudos";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  const { ativa: promoAtiva } = usePromo();

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-36 md:pb-24">
      {/* halftone no canto */}
      <div
        className="halftone-lime pointer-events-none absolute -right-16 -top-16 hidden h-[420px] w-[420px] opacity-25 lg:block"
        style={{
          maskImage: "radial-gradient(circle at 70% 30%, #000, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 70% 30%, #000, transparent 70%)",
        }}
      />

      <div className="container relative">
        {/* faixa de listras (camisa) */}
        <div className="stripe-lime pointer-events-none absolute inset-y-0 right-[33%] hidden w-16 -skew-x-6 opacity-40 lg:block" />
        {/* palavra fantasma */}
        <span className="pointer-events-none absolute top-0 left-0 hidden font-display text-[9rem] uppercase leading-[0.8] tracking-tight text-foreground/[0.03] lg:block">
          Vetor
        </span>

        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative">
            <motion.p
              variants={fade}
              custom={0}
              initial="hidden"
              animate="visible"
              className="font-mono text-xs uppercase tracking-[0.25em] text-primary"
            >
              <span className="mr-3 inline-block h-px w-8 bg-primary align-middle" />
              Escudos esportivos // do zero ao pro
            </motion.p>

            <motion.h1
              variants={fade}
              custom={1}
              initial="hidden"
              animate="visible"
              className="mt-6 font-display text-4xl uppercase leading-[0.95] sm:text-5xl md:text-[4rem]"
            >
              Do primeiro traço
              <br />
              ao <span className="outline-text">escudo</span>
              <br />
              <span className="text-primary">profissional.</span>
            </motion.h1>

            <motion.p
              variants={fade}
              custom={2}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground md:text-lg"
            >
              {hero.subheadline}
            </motion.p>

            <motion.ul
              variants={fade}
              custom={3}
              initial="hidden"
              animate="visible"
              className="mt-6 flex flex-col gap-2"
            >
              {heroChecklist.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-foreground/80"
                >
                  <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={fade}
              custom={4}
              initial="hidden"
              animate="visible"
              className="mt-9 flex flex-wrap items-center gap-6"
            >
              <BuyButton
                promoLabel="Garantir por R$47"
                className="rounded-none font-display text-lg uppercase tracking-wide"
              >
                {hero.ctaPrimary}
              </BuyButton>
              <Link
                href="#conteudo"
                className="border-b-2 border-[hsl(var(--energy))] pb-1 font-mono text-xs uppercase tracking-widest text-foreground/90 transition-colors hover:text-foreground"
              >
                {hero.ctaSecondary}
              </Link>
            </motion.div>

            <motion.p
              variants={fade}
              custom={5}
              initial="hidden"
              animate="visible"
              className="mt-9 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
            >
              {promoAtiva ? (
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-primary" aria-hidden />
                  Promoção 72h — de{" "}
                  <span className="line-through opacity-60">R${promo.precoDe}</span>{" "}
                  por{" "}
                  <span className="font-bold text-primary">
                    R${promo.precoPor}
                  </span>{" "}
                  · -{promo.descontoPct}% OFF
                </span>
              ) : (
                <>
                  1ª turma esgotada &nbsp;/&nbsp;{" "}
                  <span className="text-[hsl(var(--energy))]">
                    2ª turma aberta · 100 vagas
                  </span>
                </>
              )}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <HeroEscudos />
          </motion.div>
        </div>

        {/* Cartões de confiança — blocos duros, divididos */}
        <motion.div
          variants={fade}
          custom={6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid border border-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustCards.map((c, i) => (
            <div
              key={c.titulo}
              className={`flex items-start gap-3.5 p-5 ${
                i > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide">
                  {c.titulo}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {c.texto}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
