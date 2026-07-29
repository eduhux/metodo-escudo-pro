"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Vitrine de escudos reais na hero. Substitui o emblema genérico por
 * uma amostra do trabalho do professor — prova de autoridade logo de cara.
 */
const featured = [
  "escudo-14.png", // Hydra
  "escudo-13.png", // Dragões
  "escudo-06.png", // Bruxos
  "escudo-18.png", // Magic
  "escudo-08.png", // Chasquis
  "escudo-24.png", // Xavans
];

export function HeroEscudos() {
  return (
    <div className="relative mx-auto grid max-w-md grid-cols-3 gap-4 sm:gap-5">
      {featured.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.15 + i * 0.09,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{
              duration: 4.5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
            className="relative aspect-square rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 to-white/[0.02] p-3 shadow-lg shadow-black/20 backdrop-blur-sm"
          >
            <Image
              src={`/escudos/${src}`}
              alt="Escudo desenvolvido no Método Escudo PRO"
              fill
              sizes="150px"
              className="object-contain p-1.5 drop-shadow-md"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
