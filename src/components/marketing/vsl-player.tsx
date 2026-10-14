"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  RotateCcw,
  ArrowRight,
  PenTool,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { usePromo } from "@/hooks/use-promo";
import { checkoutUrl } from "@/lib/promo";

const SRC = "/vsl/narracao.mp3";
const TOTAL = 50.65;

const SCENES = [
  { start: 0 },
  { start: 5.56 },
  { start: 13.03 },
  { start: 20.81 },
  { start: 30.5 },
  { start: 37.5 },
  { start: 43.85 },
];

const ease = [0.22, 1, 0.36, 1] as const;
const vis = { opacity: 1, y: 0, scale: 1 };
const hid = (y = 16, s = 1) => ({ opacity: 0, y, scale: s });

function sceneIndex(t: number) {
  let idx = 0;
  for (let i = 0; i < SCENES.length; i++) if (t >= SCENES[i].start) idx = i;
  return idx;
}

export function VslPlayer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [t, setT] = useState(0);
  const [ended, setEnded] = useState(false);

  const { ativa } = usePromo();
  const checkout = checkoutUrl(ativa);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (open) {
      a.currentTime = 0;
      setT(0);
      setEnded(false);
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      a.pause();
      setPlaying(false);
      setT(0);
    }
  }, [open]);

  // Lê o tempo do áudio a ~60fps enquanto toca (sync preciso dos cues).
  useEffect(() => {
    if (!open || !playing) return;
    let raf = 0;
    const loop = () => {
      const a = audioRef.current;
      if (a) setT(a.currentTime);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [open, playing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      if (ended) {
        a.currentTime = 0;
        setEnded(false);
      }
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const a = audioRef.current;
    if (!a) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const nt = Math.max(0, Math.min(TOTAL, ratio * TOTAL));
    a.currentTime = nt;
    setT(nt);
    setEnded(false);
  }

  const progress = Math.min(100, (t / TOTAL) * 100);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Vídeo: o método por dentro"
        >
          <audio
            ref={audioRef}
            src={SRC}
            muted={muted}
            onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
            onEnded={() => {
              setPlaying(false);
              setEnded(true);
            }}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#07080d] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Stage t={t} checkout={checkout} />

              {!playing && (
                <button
                  onClick={toggle}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/20"
                  aria-label={ended ? "Assistir novamente" : "Reproduzir"}
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/40 transition-transform hover:scale-105">
                    {ended ? (
                      <RotateCcw className="h-8 w-8" />
                    ) : (
                      <Play className="ml-1 h-9 w-9 fill-current" />
                    )}
                  </span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 bg-black/40 px-4 py-3">
              <button
                onClick={toggle}
                className="shrink-0 text-foreground/90 transition-colors hover:text-primary"
                aria-label={playing ? "Pausar" : "Reproduzir"}
              >
                {playing ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 fill-current" />
                )}
              </button>

              <div
                className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-white/15"
                onClick={seek}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-[hsl(var(--energy))]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                {fmt(t)} / {fmt(TOTAL)}
              </span>

              <button
                onClick={() => setMuted((m) => !m)}
                className="shrink-0 text-foreground/90 transition-colors hover:text-primary"
                aria-label={muted ? "Ativar som" : "Mudo"}
              >
                {muted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur transition-colors hover:bg-black/70 hover:text-white"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${m}:${String(ss).padStart(2, "0")}`;
}

/* ============================ Palco ============================ */

function Stage({ t, checkout }: { t: number; checkout: string }) {
  const idx = sceneIndex(t);
  return (
    <AnimatePresence>
      <motion.div
        key={idx}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease }}
        className="absolute inset-0"
      >
        {idx === 0 && <S1 t={t} />}
        {idx === 1 && <S2 t={t} />}
        {idx === 2 && <S3 t={t} />}
        {idx === 3 && <S4 t={t} />}
        {idx === 4 && <S5 t={t} />}
        {idx === 5 && <S6 t={t} />}
        {idx === 6 && <S7 t={t} checkout={checkout} />}
      </motion.div>
    </AnimatePresence>
  );
}

const stageBase =
  "absolute inset-0 flex flex-col items-center justify-center bg-[#07080d] text-center overflow-hidden px-8";
const tr = { duration: 0.55, ease };

function Glow() {
  return (
    <div className="glow-orb pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[70%] -translate-x-1/2 -translate-y-1/2 opacity-60" />
  );
}

/* Cena 1 — gancho (0–5.56) */
function S1({ t }: { t: number }) {
  return (
    <div className={stageBase}>
      <Glow />
      <motion.img
        src="/escudos/escudo-14.png"
        alt=""
        initial={false}
        animate={t >= 0.2 ? { opacity: 1, scale: 1, y: 0 } : hid(20, 0.7)}
        transition={{ duration: 1, ease }}
        className="relative h-[62%] w-auto object-contain drop-shadow-[0_20px_50px_rgba(82,122,255,0.4)]"
      />
      <motion.p
        initial={false}
        animate={t >= 4.4 ? vis : hid(14)}
        transition={tr}
        className="relative mt-6 text-lg font-semibold text-white/90 sm:text-2xl"
      >
        Dá pra <span className="text-primary">viver disso.</span>
      </motion.p>
    </div>
  );
}

/* Cena 2 — problema (5.56–13.03) */
function S2({ t }: { t: number }) {
  return (
    <div className={stageBase}>
      <div className="relative">
        <motion.p
          initial={false}
          animate={t >= 6.4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
          transition={tr}
          className="relative text-4xl font-extrabold tracking-tight text-white/70 sm:text-6xl"
        >
          TALENTO
          <motion.span
            initial={false}
            animate={t >= 7.3 ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.45, ease }}
            className="absolute left-0 top-1/2 h-1 w-full origin-left bg-[hsl(var(--energy))]"
          />
        </motion.p>
      </div>
      <motion.p
        initial={false}
        animate={t >= 9.1 ? vis : hid(16)}
        transition={tr}
        className="mt-6 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl"
      >
        O que falta é o passo a passo.
      </motion.p>
    </div>
  );
}

/* Cena 3 — marca (13.03–20.81) */
function S3({ t }: { t: number }) {
  return (
    <div className={stageBase}>
      <Glow />
      <motion.div
        initial={false}
        animate={t >= 15.3 ? { opacity: 1, scale: 1 } : hid(0, 0.8)}
        transition={{ duration: 0.8, ease }}
        className="relative"
      >
        <Logo className="h-16 sm:h-20" />
      </motion.div>
      <motion.p
        initial={false}
        animate={t >= 17.6 ? vis : hid(14)}
        transition={tr}
        className="relative mt-6 text-base uppercase tracking-[0.2em] text-primary sm:text-lg"
      >
        Do zero ao profissional
      </motion.p>
      <motion.p
        initial={false}
        animate={t >= 18.4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={tr}
        className="relative mt-3 flex items-center gap-2 text-sm text-muted-foreground"
      >
        <PenTool className="h-4 w-4 text-primary" /> no CorelDRAW, mesmo começando
        do zero
      </motion.p>
    </div>
  );
}

/* Cena 4 — método / prova (20.81–30.5) */
const GRID = [
  "escudo-13.png",
  "escudo-18.png",
  "escudo-06.png",
  "escudo-08.png",
  "escudo-21.png",
  "escudo-03.png",
  "escudo-19.png",
  "escudo-24.png",
];
const CHIPS: [string, number][] = [
  ["Forma", 26.0],
  ["Cor", 26.5],
  ["Acabamento", 27.4],
  ["Como cobrar", 28.6],
];

function S4({ t }: { t: number }) {
  return (
    <div className={stageBase}>
      <div className="relative grid grid-cols-4 gap-3">
        {GRID.map((src, i) => (
          <motion.div
            key={src}
            initial={false}
            animate={t >= 20.9 + i * 0.12 ? { opacity: 1, scale: 1 } : hid(0, 0.6)}
            transition={{ duration: 0.45, ease }}
            className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1.5 sm:h-20 sm:w-20"
          >
            <img src={`/escudos/${src}`} alt="" className="h-full w-full object-contain" />
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={false}
        animate={t >= 21.5 ? vis : hid(12)}
        transition={tr}
        className="relative mt-6 text-2xl font-extrabold text-white sm:text-4xl"
      >
        <span className="text-primary">+100 escudos</span> reais, destrinchados.
      </motion.p>

      <div className="relative mt-4 flex flex-wrap justify-center gap-2.5">
        {CHIPS.map(([label, at]) => (
          <motion.span
            key={label}
            initial={false}
            animate={t >= at ? vis : hid(10)}
            transition={{ duration: 0.4, ease }}
            className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground sm:text-sm"
          >
            {label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* Cena 5 — transformação (30.5–37.5) */
function S5({ t }: { t: number }) {
  return (
    <div className={stageBase}>
      <Glow />
      <motion.img
        src="/bonus/mockup-camisa.png"
        alt=""
        initial={false}
        animate={t >= 30.7 ? { opacity: 1, scale: 1, y: 0 } : hid(16, 0.85)}
        transition={{ duration: 0.8, ease }}
        className="relative h-[58%] w-auto object-contain"
      />
      <motion.p
        initial={false}
        animate={t >= 32.2 ? vis : hid(14)}
        transition={tr}
        className="relative mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-4xl"
      >
        Um <span className="text-primary">projeto profissional</span>.
      </motion.p>
    </div>
  );
}

/* Cena 6 — bônus (37.5–43.85) */
const BONUS: [string, string, number][] = [
  ["+200", "fontes premium", 38.2],
  ["+120", "escudos de referência", 41.6],
  ["Mockups", "de apresentação", 42.7],
];

function S6({ t }: { t: number }) {
  return (
    <div className={stageBase}>
      <motion.p
        initial={false}
        animate={t >= 37.6 ? { opacity: 1 } : { opacity: 0 }}
        transition={tr}
        className="relative text-sm font-semibold uppercase tracking-[0.2em] text-primary"
      >
        E ainda leva de bônus
      </motion.p>
      <div className="relative mt-6 grid grid-cols-3 gap-3 sm:gap-5">
        {BONUS.map(([big, label, at]) => (
          <motion.div
            key={label}
            initial={false}
            animate={t >= at ? { opacity: 1, y: 0, scale: 1 } : hid(24, 0.9)}
            transition={{ duration: 0.5, ease }}
            className="flex min-w-[6rem] flex-col items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent px-4 py-5 sm:px-6"
          >
            <span className="text-2xl font-extrabold text-primary sm:text-4xl">
              {big}
            </span>
            <span className="mt-1 text-[0.65rem] uppercase tracking-wider text-muted-foreground sm:text-xs">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* Cena 7 — CTA (43.85–50.65) */
function S7({ t, checkout }: { t: number; checkout: string }) {
  return (
    <div className={stageBase}>
      <div className="glow-primary pointer-events-none absolute inset-0" />

      <motion.p
        initial={false}
        animate={t >= 44.2 ? { opacity: 1 } : { opacity: 0 }}
        transition={tr}
        className="relative text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--energy))]"
      >
        2ª turma aberta · vagas limitadas
      </motion.p>

      <motion.p
        initial={false}
        animate={t >= 47.3 ? vis : hid(16)}
        transition={tr}
        className="relative mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl"
      >
        Comece o seu <span className="text-primary">primeiro escudo</span> hoje.
      </motion.p>

      <motion.a
        href={checkout}
        target="_blank"
        rel="noopener noreferrer"
        initial={false}
        animate={t >= 48.3 ? { opacity: 1, scale: 1 } : hid(0, 0.9)}
        transition={{ duration: 0.5, ease }}
        className="cta-energy relative mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground"
      >
        Quero começar
        <ArrowRight className="h-5 w-5" />
      </motion.a>
    </div>
  );
}
