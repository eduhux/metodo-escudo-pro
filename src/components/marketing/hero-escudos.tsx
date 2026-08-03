"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Vitrine de escudos na hero — cluster sobreposto e rotacionado (underground),
 * mas cada posição vai ALTERNANDO de escudo com crossfade, ciclando pela
 * biblioteca. As 4 posições ficam sempre com escudos diferentes (passo 6).
 */
const ESCUDOS = [
  "escudo-14.png", // 0  (destaque inicial: Hydra)
  "escudo-01.png",
  "escudo-02.png",
  "escudo-03.png",
  "escudo-04.png",
  "escudo-05.png",
  "escudo-13.png", // 6  (Dragões)
  "escudo-07.png",
  "escudo-09.png",
  "escudo-11.png",
  "escudo-12.png",
  "escudo-16.png",
  "escudo-18.png", // 12 (Magic)
  "escudo-17.png",
  "escudo-19.png",
  "escudo-20.png",
  "escudo-21.png",
  "escudo-23.png",
  "escudo-06.png", // 18 (Bruxos)
  "escudo-08.png",
  "escudo-10.png",
  "escudo-15.png",
  "escudo-22.png",
  "escudo-24.png",
];

const slots = [
  { pos: "w-[62%] left-[14%] top-[-4%]", z: "z-30", border: "border-primary", rot: -7 },
  { pos: "w-[44%] left-[-2%] top-[30%]", z: "z-20", border: "border-border", rot: 6 },
  { pos: "w-[46%] left-[52%] top-[24%]", z: "z-20", border: "border-border", rot: 9 },
  { pos: "w-[36%] left-[26%] top-[62%]", z: "z-10", border: "border-border", rot: -4 },
];

export function HeroEscudos() {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(
      () => setOffset((o) => (o + 1) % ESCUDOS.length),
      2600
    );
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      {/* nós de vetor (motivo CorelDRAW) */}
      <span className="absolute -left-2 top-6 font-mono text-primary/60">+</span>
      <span className="absolute right-0 top-16 font-mono text-primary/60">□</span>
      <span className="absolute bottom-8 left-8 font-mono text-primary/60">□</span>

      {slots.map((s, i) => {
        const src = ESCUDOS[(offset + i * 6) % ESCUDOS.length];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24, rotate: s.rot }}
            animate={{ opacity: 1, y: 0, rotate: s.rot }}
            transition={{
              duration: 0.6,
              delay: 0.15 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`absolute aspect-square border bg-card hard-shadow ${s.pos} ${s.z} ${s.border}`}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 p-3"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={`/escudos/${src}`}
                    alt="Escudo desenvolvido no Método Escudo PRO"
                    fill
                    sizes="280px"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
