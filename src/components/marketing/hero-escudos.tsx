"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PenTool } from "lucide-react";

/**
 * Showcase do hero — um "display case" premium: um escudo grande,
 * centralizado, que vai alternando pela biblioteca com crossfade.
 */
const ESCUDOS = [
  "escudo-14.png",
  "escudo-13.png",
  "escudo-18.png",
  "escudo-06.png",
  "escudo-08.png",
  "escudo-21.png",
  "escudo-03.png",
  "escudo-19.png",
  "escudo-11.png",
  "escudo-24.png",
];

export function HeroEscudos() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % ESCUDOS.length), 2800);
    return () => clearInterval(t);
  }, [reduce]);

  const src = ESCUDOS[i];

  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      {/* glow atrás */}
      <div className="glow-orb pointer-events-none absolute -inset-10 -z-10" />

      {/* display case */}
      <div className="surface relative aspect-square overflow-hidden rounded-[2rem] hard-shadow">
        <div className="dot-grid absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/10 to-transparent" />

        {/* escudo em crossfade */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative h-full w-full">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.04, y: -10 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{ filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.5))" }}
              >
                <Image
                  src={`/escudos/${src}`}
                  alt="Escudo desenvolvido no Método Escudo PRO"
                  fill
                  sizes="420px"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* chip superior */}
        <div className="glass absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.7rem] font-medium">
          <PenTool className="h-3.5 w-3.5 text-primary" />
          Feito no CorelDRAW
        </div>
      </div>

      {/* chip flutuante inferior */}
      <div className="glass-strong absolute -bottom-5 -right-3 rounded-2xl px-5 py-3 text-center lift">
        <p className="text-2xl font-extrabold leading-none text-primary">+100</p>
        <p className="mt-1 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
          escudos criados
        </p>
      </div>
    </div>
  );
}
