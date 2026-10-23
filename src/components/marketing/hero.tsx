"use client";

import { motion } from "framer-motion";
import { trustCards } from "@/data/site";
import { PandaPlayer } from "@/components/course/panda-player";

const HERO_VIDEO_ID = "c6667f3e-f618-4a41-a37f-fb3f245e5234";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="glow-primary pointer-events-none absolute inset-x-0 top-0 h-[560px]" />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent_75%)]" />

      <div className="container relative">
        {/* Vídeo — primeira coisa que o visitante vê */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl"
        >
          <div className="glow-orb pointer-events-none absolute left-1/2 top-24 -z-10 hidden h-[420px] w-[70%] -translate-x-1/2 opacity-50 md:block" />
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
            <PandaPlayer
              videoId={HERO_VIDEO_ID}
              title="Método Escudo PRO — conheça o método"
            />
          </div>
        </motion.div>

        {/* Cartões de confiança */}
        <motion.div
          variants={fade}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustCards.map((c) => (
            <div key={c.titulo} className="surface flex items-start gap-3.5 p-5">
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
    </section>
  );
}
