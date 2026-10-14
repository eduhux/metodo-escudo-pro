"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Play } from "lucide-react";
import { hero, heroChecklist, trustCards, socialProof } from "@/data/site";
import { promo } from "@/lib/promo";
import { usePromo } from "@/hooks/use-promo";
import { BuyButton } from "./buy-button";
import { HeroEscudos } from "./hero-escudos";
import { VslPlayer } from "./vsl-player";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  const { ativa: promoAtiva } = usePromo();
  const [vslOpen, setVslOpen] = useState(false);

  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      {/* atmosfera */}
      <div className="glow-primary pointer-events-none absolute inset-x-0 top-0 h-[560px]" />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_55%_at_60%_10%,black,transparent_75%)]" />

      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Coluna de texto */}
          <div>
            <motion.span
              variants={fade}
              custom={0}
              initial="hidden"
              animate="visible"
              className="eyebrow inline-flex items-center gap-2.5 text-[0.7rem] text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Escudos esportivos · do zero ao profissional
            </motion.span>

            <motion.h1
              variants={fade}
              custom={1}
              initial="hidden"
              animate="visible"
              className="mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl md:text-[4.4rem]"
            >
              Do primeiro traço ao{" "}
              <span className="serif-accent text-primary">escudo</span>{" "}
              que o time veste com orgulho.
            </motion.h1>

            <motion.p
              variants={fade}
              custom={2}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {hero.subheadline}
            </motion.p>

            <motion.ul
              variants={fade}
              custom={3}
              initial="hidden"
              animate="visible"
              className="mt-7 flex flex-col gap-2.5"
            >
              {heroChecklist.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-foreground/85"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={fade}
              custom={4}
              initial="hidden"
              animate="visible"
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <BuyButton
                promoLabel="Garantir por R$47"
                className="cta-energy h-13 rounded-full px-7 text-base font-semibold"
              >
                {hero.ctaPrimary}
              </BuyButton>
              <button
                type="button"
                onClick={() => setVslOpen(true)}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/12 py-2 pl-2 pr-5 text-sm font-medium text-foreground/90 transition-colors hover:border-white/25 hover:bg-white/5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                </span>
                Assistir ao método
                <span className="text-muted-foreground">· 51s</span>
              </button>
            </motion.div>

            {/* Prova social */}
            <motion.div
              variants={fade}
              custom={5}
              initial="hidden"
              animate="visible"
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: socialProof.estrelas }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {socialProof.nota}
                  <span className="text-muted-foreground"> · {socialProof.total}</span>
                </span>
              </div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {promoAtiva ? (
                  <>
                    Promoção 72h — de R${promo.precoDe} por{" "}
                    <span className="font-semibold text-primary">
                      R${promo.precoPor}
                    </span>
                  </>
                ) : (
                  "2ª turma aberta · vagas limitadas"
                )}
              </span>
            </motion.div>
          </div>

          {/* Showcase do escudo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <HeroEscudos />
          </motion.div>
        </div>

        {/* Cartões de confiança */}
        <motion.div
          variants={fade}
          custom={6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustCards.map((c) => (
            <div
              key={c.titulo}
              className="surface flex items-start gap-3.5 p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{c.titulo}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {c.texto}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <VslPlayer open={vslOpen} onClose={() => setVslOpen(false)} />
    </section>
  );
}
