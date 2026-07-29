"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Vitrine de escudos reais na hero. Substitui o emblema genérico por
 * uma amostra do trabalho do professor — prova de autoridade logo de cara.
 * 4 escudos grandes em grade 2x2 para ganhar presença.
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
      {featured.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, y: 26, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.15 + i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={i % 2 === 1 ? "mt-8 sm:mt-12" : ""}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4.5 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
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
      ))}
    </div>
  );
}
