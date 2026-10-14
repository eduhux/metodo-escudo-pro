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

// Um clipe por cena → o visual troca exatamente quando cada áudio começa.
const CLIPS = [
  "/vsl/cena-1.mp3",
  "/vsl/cena-2.mp3",
  "/vsl/cena-3.mp3",
  "/vsl/cena-4.mp3",
  "/vsl/cena-5.mp3",
  "/vsl/cena-6.mp3",
  "/vsl/cena-7.mp3",
];
const DUR = [5.59, 7.5, 7.81, 9.72, 7.03, 6.37, 6.79];
const TOTAL = DUR.reduce((a, b) => a + b, 0);
const before = (i: number) => DUR.slice(0, i).reduce((a, b) => a + b, 0);

const ease = [0.22, 1, 0.36, 1] as const;

// Entradas mount-based: o atraso (delay) é relativo ao início do clipe da cena.
const rise = (delay: number, y = 16) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
});

export function VslPlayer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [i, setI] = useState(0);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);

  const { ativa } = usePromo();
  const checkout = checkoutUrl(ativa);

  // Abrir/fechar
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (open) {
      CLIPS.forEach((s) => {
        const pre = new Audio();
        pre.preload = "auto";
        pre.src = s;
      });
      setI(0);
      setT(0);
      setEnded(false);
    } else {
      a.pause();
      setPlaying(false);
      setI(0);
      setT(0);
    }
  }, [open]);

  // Toca o clipe atual sempre que a cena muda (e quando abre)
  useEffect(() => {
    if (!open) return;
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [i, open]);

  // Relógio ~60fps
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
  }, [open, ended, playing, i]);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (ended) {
      setEnded(false);
      setT(0);
      if (i === 0) {
        a.currentTime = 0;
        a.play();
        setPlaying(true);
      } else {
        setI(0);
      }
      return;
    }
    if (a.paused) {
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  }

  function onClipEnded() {
    if (i < CLIPS.length - 1) {
      setI((v) => v + 1);
    } else {
      setPlaying(false);
      setEnded(true);
    }
  }

  const globalT = before(i) + t;
  const progress = Math.min(100, (globalT / TOTAL) * 100);

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
            src={CLIPS[i]}
            muted={muted}
            onEnded={onClipEnded}
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
              <AnimatePresence>
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="absolute inset-0"
                >
                  {i === 0 && <S1 />}
                  {i === 1 && <S2 />}
                  {i === 2 && <S3 />}
                  {i === 3 && <S4 />}
                  {i === 4 && <S5 />}
                  {i === 5 && <S6 />}
                  {i === 6 && <S7 checkout={checkout} />}
                </motion.div>
              </AnimatePresence>

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

              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-[hsl(var(--energy))]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                {fmt(globalT)} / {fmt(TOTAL)}
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

/* ============================ Cenas ============================ */

const stageBase =
  "absolute inset-0 flex flex-col items-center justify-center bg-[#07080d] text-center overflow-hidden px-8";

const popSpring = (delay: number, s = 0.6) => ({
  initial: { opacity: 0, scale: s },
  animate: { opacity: 1, scale: 1 },
  transition: { type: "spring" as const, stiffness: 420, damping: 15, delay },
});
const fly = (delay: number, x = 0, y = 34, r = 0) => ({
  initial: { opacity: 0, x, y, rotate: r },
  animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
  transition: { type: "spring" as const, stiffness: 260, damping: 20, delay },
});

function Glow() {
  return (
    <div className="glow-orb pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[70%] -translate-x-1/2 -translate-y-1/2 opacity-60" />
  );
}

/** Fundo vivo comum a todas as cenas: grade de pontos + varredura de luz. */
function SceneBg({ glow }: { glow?: boolean }) {
  return (
    <>
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-1/2 inset-y-0 w-[200%]"
        style={{
          background:
            "linear-gradient(105deg, transparent 42%, rgba(82,122,255,0.07) 50%, transparent 58%)",
        }}
        animate={{ x: ["-12%", "12%"] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      {glow && <Glow />}
    </>
  );
}

function Scene({
  children,
  glow,
}: {
  children: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <div className={stageBase}>
      <SceneBg glow={glow} />
      {children}
    </div>
  );
}

/** Contador animado (sobe de 0 até `to`). */
function Count({
  to,
  delay = 0,
  duration = 900,
}: {
  to: number;
  delay?: number;
  duration?: number;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const begin = performance.now() + delay * 1000;
    const tick = (now: number) => {
      if (now >= begin) {
        const p = Math.min(1, (now - begin) / duration);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p >= 1) return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, delay, duration]);
  return <>{n}</>;
}

/* Cena 1 — gancho (5.59s) */
function S1() {
  return (
    <Scene glow>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center justify-center"
      >
        {/* anel girando atrás do escudo */}
        <motion.div
          aria-hidden
          className="absolute aspect-square h-[128%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(82,122,255,0.55), transparent 38%)",
            maskImage:
              "radial-gradient(circle, transparent 58%, black 60%, black 64%, transparent 66%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 58%, black 60%, black 64%, transparent 66%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
        <motion.img
          src="/escudos/escudo-14.png"
          alt=""
          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
          className="relative h-[58%] w-auto object-contain drop-shadow-[0_20px_55px_rgba(82,122,255,0.45)]"
        />
      </motion.div>
      <motion.p
        {...popSpring(4.3, 0.85)}
        className="relative mt-6 text-lg font-semibold text-white/90 sm:text-2xl"
      >
        Dá pra{" "}
        <span className="text-primary" style={{ textShadow: "0 0 24px rgba(82,122,255,0.6)" }}>
          viver disso.
        </span>
      </motion.p>
    </Scene>
  );
}

/* Cena 2 — problema (7.50s) */
function S2() {
  return (
    <Scene>
      {/* flash de energia no risco */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[hsl(var(--energy))]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.16, 0] }}
        transition={{ duration: 0.5, delay: 1.7, times: [0, 0.3, 1] }}
      />
      <motion.p
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1, x: [0, -5, 5, -3, 3, 0] }}
        transition={{
          opacity: { duration: 0.3, delay: 1.1 },
          scale: { duration: 0.4, delay: 1.1, ease },
          x: { duration: 0.45, delay: 1.5 },
        }}
        className="relative text-4xl font-extrabold tracking-tight text-white/70 sm:text-6xl"
      >
        TALENTO
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 1.7, ease }}
          className="absolute left-0 top-1/2 h-1.5 w-full origin-left bg-[hsl(var(--energy))]"
        />
      </motion.p>
      <motion.p
        {...popSpring(3.4, 0.9)}
        className="relative mt-6 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl"
      >
        O que falta é o passo a passo.
      </motion.p>
    </Scene>
  );
}

/* Cena 3 — marca (7.81s) */
function S3() {
  return (
    <Scene glow>
      <motion.div
        initial={{ opacity: 0, scale: 1.55 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 13, delay: 1.2 }}
        className="relative"
      >
        <Logo className="h-16 sm:h-20" />
      </motion.div>
      <motion.p
        {...rise(4.6)}
        className="relative mt-6 text-base uppercase tracking-[0.2em] text-primary sm:text-lg"
      >
        Do zero ao profissional
      </motion.p>
      <motion.p
        {...rise(6.3, 10)}
        className="relative mt-3 flex items-center gap-2 text-sm text-muted-foreground"
      >
        <PenTool className="h-4 w-4 text-primary" /> no CorelDRAW, mesmo começando
        do zero
      </motion.p>
    </Scene>
  );
}

/* Cena 4 — método / prova (9.72s) */
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
  ["Forma", 5.2],
  ["Cor", 5.7],
  ["Acabamento", 6.6],
  ["Como cobrar", 7.8],
];

function S4() {
  return (
    <Scene>
      <div className="relative grid grid-cols-4 gap-3">
        {GRID.map((src, idx) => (
          <motion.div
            key={src}
            {...popSpring(0.2 + idx * 0.09, 0.4)}
            className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1.5 sm:h-20 sm:w-20"
          >
            <img src={`/escudos/${src}`} alt="" className="h-full w-full object-contain" />
          </motion.div>
        ))}
        {/* brilho varrendo a grade */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -skew-x-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
          }}
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 1.1, delay: 1.3, ease }}
        />
      </div>

      <motion.p
        {...rise(0.8, 12)}
        className="relative mt-6 text-2xl font-extrabold text-white sm:text-4xl"
      >
        <span className="text-primary">+<Count to={100} delay={0.9} /> escudos</span>{" "}
        reais, destrinchados.
      </motion.p>

      <div className="relative mt-4 flex flex-wrap justify-center gap-2.5">
        {CHIPS.map(([label, delay]) => (
          <motion.span
            key={label}
            {...popSpring(delay, 0.7)}
            className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground sm:text-sm"
          >
            {label}
          </motion.span>
        ))}
      </div>
    </Scene>
  );
}

/* Cena 5 — transformação (7.03s) */
function S5() {
  return (
    <Scene glow>
      <div className="relative overflow-hidden">
        <motion.img
          src="/bonus/mockup-camisa.png"
          alt=""
          initial={{ opacity: 0, scale: 0.85, y: 20, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.2 }}
          className="relative h-[58%] w-auto object-contain"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -skew-x-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          }}
          initial={{ x: "-130%" }}
          animate={{ x: "130%" }}
          transition={{ duration: 1.2, delay: 1.0, ease }}
        />
      </div>
      <motion.p
        {...popSpring(1.8, 0.9)}
        className="relative mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-4xl"
      >
        Um <span className="text-primary">projeto profissional</span>.
      </motion.p>
    </Scene>
  );
}

/* Cena 6 — bônus (6.37s) */
const BONUS: [string, string, number, number][] = [
  ["+200", "fontes premium", 1.0, -70],
  ["+120", "escudos de referência", 4.1, 0],
  ["Mockups", "de apresentação", 5.0, 70],
];

function S6() {
  return (
    <Scene>
      <motion.p
        {...rise(0.1, 0)}
        className="relative text-sm font-semibold uppercase tracking-[0.2em] text-primary"
      >
        E ainda leva de bônus
      </motion.p>
      <div className="relative mt-6 grid grid-cols-3 gap-3 sm:gap-5">
        {BONUS.map(([big, label, delay, x]) => (
          <motion.div
            key={label}
            {...fly(delay, x, 30, x > 0 ? 6 : x < 0 ? -6 : 0)}
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
    </Scene>
  );
}

/* Cena 7 — CTA (6.79s) */
function S7({ checkout }: { checkout: string }) {
  return (
    <Scene>
      <motion.div
        className="glow-primary pointer-events-none absolute inset-0"
        animate={{ opacity: [0.5, 0.95, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.p
        {...rise(0.3, 0)}
        className="relative text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--energy))]"
      >
        2ª turma aberta · vagas limitadas
      </motion.p>

      <motion.p
        {...rise(3.6)}
        className="relative mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl"
      >
        Comece o seu{" "}
        <span className="text-primary" style={{ textShadow: "0 0 28px rgba(82,122,255,0.6)" }}>
          primeiro escudo
        </span>{" "}
        hoje.
      </motion.p>

      <motion.div
        animate={{ scale: [1, 1.045, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 5.2 }}
        className="relative mt-7"
      >
        <motion.a
          href={checkout}
          target="_blank"
          rel="noopener noreferrer"
          {...popSpring(4.7, 0.9)}
          className="cta-energy inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground"
        >
          Quero começar
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 5.2 }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.span>
        </motion.a>
      </motion.div>
    </Scene>
  );
}
