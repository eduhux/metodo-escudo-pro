"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Vitrine de escudos reais na hero: 1 escudo em destaque (grande) + 3 de apoio.
 * Preenche melhor a altura da coluna e cria uma hierarquia de foco.
 * O destaque flutua para cima; o trio flutua para baixo (movimento coordenado).
 */
const featured = "escudo-14.png"; // Hydra
const trio = ["escudo-13.png", "escudo-06.png", "escudo-18.png"];

const tile =
  "relative aspect-square rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 to-white/[0.02] shadow-xl shadow-black/25 backdrop-blur-sm";

export function HeroEscudos() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {/* Escudo em destaque */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-[66%]"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className={`${tile} p-5`}
        >
          <Image
            src={`/escudos/${featured}`}
            alt="Escudo desenvolvido no Método Escudo PRO"
            fill
            sizes="290px"
            className="object-contain p-2 drop-shadow-lg"
          />
        </motion.div>
      </motion.div>

      {/* Trio de apoio */}
      <div className="mt-5 grid grid-cols-3 gap-4">
        {trio.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.35 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              className={`${tile} p-3`}
            >
              <Image
                src={`/escudos/${src}`}
                alt="Escudo desenvolvido no Método Escudo PRO"
                fill
                sizes="130px"
                className="object-contain p-1.5 drop-shadow-md"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
