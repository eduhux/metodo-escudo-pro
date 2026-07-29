"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Vitrine de escudos na hero — cluster sobreposto e rotacionado, com sombra
 * dura (pegada underground). Um escudo em destaque + de apoio, vazando.
 */
const cluster = [
  { src: "escudo-14.png", pos: "w-[62%] left-[14%] top-[-4%]", z: "z-30", border: "border-primary", rot: -7 },
  { src: "escudo-06.png", pos: "w-[44%] left-[-2%] top-[30%]", z: "z-20", border: "border-border", rot: 6 },
  { src: "escudo-18.png", pos: "w-[46%] left-[52%] top-[24%]", z: "z-20", border: "border-border", rot: 9 },
  { src: "escudo-15.png", pos: "w-[36%] left-[26%] top-[62%]", z: "z-10", border: "border-border", rot: -4 },
];

export function HeroEscudos() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      {/* nós de vetor (motivo CorelDRAW) */}
      <span className="absolute -left-2 top-6 font-mono text-primary/70">+</span>
      <span className="absolute right-0 top-16 font-mono text-primary/70">□</span>
      <span className="absolute bottom-8 left-8 font-mono text-primary/70">□</span>

      {cluster.map((e, i) => (
        <motion.div
          key={e.src}
          initial={{ opacity: 0, y: 26, rotate: e.rot }}
          animate={{ opacity: 1, y: 0, rotate: e.rot }}
          transition={{
            duration: 0.6,
            delay: 0.15 + i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`absolute aspect-square border bg-card hard-shadow ${e.pos} ${e.z} ${e.border}`}
        >
          <div className="relative h-full w-full p-3">
            <Image
              src={`/escudos/${e.src}`}
              alt="Escudo desenvolvido no Método Escudo PRO"
              fill
              sizes="280px"
              className="object-contain"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
