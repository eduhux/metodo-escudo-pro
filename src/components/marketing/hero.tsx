"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import {
  hero,
  heroChecklist,
  socialProof,
  trustCards,
  oferta,
} from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BuyButton } from "./buy-button";
import { AnimatedShield } from "./animated-shield";

const fade = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  const [pre, highlight, post] = hero.headline.split(
    new RegExp(`(${hero.headlineHighlight})`)
  );

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] glow-primary" />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Coluna de texto */}
          <div>
            <motion.div variants={fade} custom={0} initial="hidden" animate="visible">
              <Badge>
                <Star className="h-3.5 w-3.5 fill-primary" />
                {hero.badge}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fade}
              custom={1}
              initial="hidden"
              animate="visible"
              className="mt-6 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-gradient sm:text-5xl md:text-[3.4rem]"
            >
              {pre}
              <span className="text-gradient-accent">{highlight}</span>
              {post}
            </motion.h1>

            <motion.p
              variants={fade}
              custom={2}
              initial="hidden"
              animate="visible"
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {hero.subheadline}
            </motion.p>

            <motion.ul
              variants={fade}
              custom={3}
              initial="hidden"
              animate="visible"
              className="mt-7 grid gap-3 sm:grid-cols-2"
            >
              {heroChecklist.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/90">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
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
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <BuyButton className="w-full sm:w-auto">{hero.ctaPrimary}</BuyButton>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="#conteudo">{hero.ctaSecondary}</Link>
              </Button>
            </motion.div>

            <motion.p
              variants={fade}
              custom={5}
              initial="hidden"
              animate="visible"
              className="mt-4 text-sm"
            >
              <span className="text-muted-foreground line-through">
                R$ {oferta.precoDe}
              </span>{" "}
              <span className="font-semibold text-foreground">
                por R$ {oferta.precoPor}
              </span>{" "}
              <span className="text-muted-foreground">
                · oferta por tempo limitado
              </span>
            </motion.p>

            <motion.div
              variants={fade}
              custom={5}
              initial="hidden"
              animate="visible"
              className="mt-8 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {["from-violet-400 to-violet-600", "from-fuchsia-400 to-purple-600", "from-indigo-400 to-violet-600", "from-purple-400 to-fuchsia-600"].map(
                  (g, i) => (
                    <span
                      key={i}
                      className={`h-9 w-9 rounded-full border-2 border-background bg-gradient-to-br ${g}`}
                    />
                  )
                )}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-primary">
                  {Array.from({ length: socialProof.estrelas }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{socialProof.nota}</span>{" "}
                  · {socialProof.total}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Coluna do emblema */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-72 w-72 rounded-full glow-orb blur-2xl md:h-96 md:w-96" />
            </div>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <AnimatedShield />
            </motion.div>
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
              className="card-glow flex items-start gap-3.5 rounded-xl border border-border bg-card/60 p-4 transition-all duration-300"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{c.titulo}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
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
