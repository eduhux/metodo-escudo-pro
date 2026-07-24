"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import { hero, beneficiosAcesso } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { BuyButton } from "./buy-button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] glow-primary" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge className="mx-auto">
              <Star className="h-3.5 w-3.5 fill-primary" />
              {hero.badge}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-gradient sm:text-5xl md:text-6xl"
          >
            Crie{" "}
            <span className="text-gradient-accent">escudos esportivos</span>{" "}
            profissionais do zero ao avançado
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <BuyButton className="w-full sm:w-auto">{hero.ctaPrimary}</BuyButton>
            <Link
              href="#conteudo"
              className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-lg border border-border px-8 text-base font-medium text-foreground transition-colors hover:bg-accent sm:w-auto"
            >
              {hero.ctaSecondary}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            {beneficiosAcesso.map((b) => (
              <span key={b.texto} className="inline-flex items-center gap-1.5">
                <b.icon className="h-4 w-4 text-primary" />
                {b.texto}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Vídeo de apresentação */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div className="group relative aspect-video overflow-hidden rounded-2xl glass-strong shadow-2xl">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <button
                className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition-transform group-hover:scale-110"
                aria-label="Assistir vídeo de apresentação"
              >
                <Play className="h-8 w-8 translate-x-0.5 fill-current" />
              </button>
              <p className="text-sm text-muted-foreground">
                Assista à apresentação do método
              </p>
            </div>
            {/*
              Para exibir o vídeo real do Panda, substitua o bloco acima por:
              <iframe src="https://player-vz-XXXX.tv.pandavideo.com.br/embed/?v=SEU_VIDEO_ID"
                className="h-full w-full" allow="fullscreen" allowFullScreen />
            */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
