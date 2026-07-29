"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Vitrine de escudos reais na hero. Substitui o emblema genérico por
 * uma amostra do trabalho do professor — prova de autoridade logo de cara.
 * Grade 2x2 alinhada (dois em cima, dois embaixo) com flutuação coordenada:
 * a linha de cima e a de baixo se movem em sentidos opostos.
 */
const featured = [
  "escudo-14.png", // Hydra
  "escudo-13.png", // Dragões
  "escudo-06.png", // Bruxos
  "escudo-18.png", // Magic
];

export function HeroEscudos() {
  return (
    <div className="relative mx-auto grid w-full max-w-[440px] grid-cols-2 gap-6">
      {featured.map((src, i) => {
        const topRow = i < 2; // 0,1 = cima | 2,3 = baixo
        return (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.15 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              animate={{ y: topRow ? [0, -10, 0] : [0, 10, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative aspect-square rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 to-white/[0.02] p-4 shadow-xl shadow-black/25 backdrop-blur-sm"
            >
              <Image
                src={`/escudos/${src}`}
                alt="Escudo desenvolvido no Método Escudo PRO"
                fill
                sizes="220px"
                className="object-contain p-2 drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
