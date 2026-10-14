"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Play,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  FileArchive,
  Download,
  Film,
  Layers,
  Gift,
  Type,
  Shield,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { loadProgress, syncProgressFromCloud } from "@/lib/progress";
import { course, flatLessons, totalLessons } from "@/data/course";
import { greeting, formatName, cn } from "@/lib/utils";
import type { Progress } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { Counter } from "@/components/shared/counter";
import { BorderBeam } from "@/components/ui/border-beam";

const MATERIAIS_URL =
  "https://drive.google.com/file/d/1KFM6JqIY5DH7qACk0b_XNGKlVOuN550L/view?usp=drive_link";

const FONTES_URL =
  "https://drive.google.com/drive/folders/1MOl_YdmujRUcd1fW5J80JN5gdfz3S4SK?usp=sharing";

const ESCUDOS_URL =
  "https://drive.google.com/file/d/12e5QEAb7uJ-7VeHRhdXvC2EmxhHLvnmI/view?usp=drive_link";

const ease = [0.22, 1, 0.36, 1] as const;

export default function DashboardPage() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    setProgress(loadProgress(user?.uid));
    syncProgressFromCloud(user?.uid).then(setProgress).catch(() => {});
  }, [user?.uid]);

  const doneCount = progress
    ? Object.values(progress.aulasConcluidas).filter(Boolean).length
    : 0;
  const pct = progress?.percentual ?? 0;
  const modulosCount = course.modulos.filter((m) => m.id !== "aula-inicial").length;

  const lastId = progress?.ultimaAulaId;
  const continueLesson =
    flatLessons.find((l) => l.id === lastId) ??
    flatLessons.find((l) => !progress?.aulasConcluidas[l.id]) ??
    flatLessons[0];

  const isStarted = Boolean(lastId) || doneCount > 0;

  const stats = [
    { icon: Film, valor: totalLessons, label: "Aulas no total" },
    { icon: Layers, valor: modulosCount, label: "Módulos" },
    { icon: CheckCircle2, valor: doneCount, label: "Aulas concluídas", accent: true },
  ];

  const downloads = [
    {
      icon: FileArchive,
      tag: "Material",
      titulo: "Materiais do curso",
      texto:
        "Baixe o pacote com todos os arquivos usados nas aulas e os mockups. Siga a instalação exatamente como nas aulas.",
      cta: "Baixar materiais",
      url: MATERIAIS_URL,
      bonus: false,
    },
    {
      icon: Type,
      tag: "Bônus",
      titulo: "+200 fontes premium",
      texto:
        "As mesmas fontes que uso nos meus projetos profissionais. Baixe e use nos seus escudos desde o primeiro dia.",
      cta: "Baixar fontes",
      url: FONTES_URL,
      bonus: true,
    },
    {
      icon: Shield,
      tag: "Bônus",
      titulo: "120 escudos de referência",
      texto:
        "120 escudos profissionais em PNG para estudar proporção, cores e estilos — e nunca mais começar do zero.",
      cta: "Baixar pack",
      url: ESCUDOS_URL,
      bonus: true,
    },
  ];

  const jornadaMsg =
    pct === 100
      ? "Você concluiu o método. Agora é colocar em prática e cobrar como profissional."
      : isStarted
        ? `Você já concluiu ${doneCount} ${doneCount === 1 ? "aula" : "aulas"}. Continue de onde parou.`
        : "Sua jornada começa agora. Bora desenvolver seu primeiro escudo?";

  return (
    <div className="relative overflow-hidden">
      {/* atmosfera */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] glow-primary" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 animate-pulse rounded-full bg-primary/10 blur-3xl [animation-duration:6s]" />
      <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 animate-pulse rounded-full bg-[hsl(var(--energy))]/10 blur-3xl [animation-duration:8s]" />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.1]" />

      <div className="container relative py-10 md:py-14">
        {/* ===== Banner de boas-vindas ===== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-card via-card to-secondary/50">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.15]" />
            <CardContent className="relative grid gap-8 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  {greeting()}
                </span>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  Olá,{" "}
                  <span className="text-gradient-accent">
                    {formatName(user?.nome)}
                  </span>{" "}
                  👋
                </h1>
                <p className="mt-2 max-w-md text-muted-foreground">{jornadaMsg}</p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href={`/curso/${continueLesson.id}`}>
                      <Play className="h-4 w-4 fill-current" />
                      {isStarted ? "Continuar assistindo" : "Assistir primeira aula"}
                    </Link>
                  </Button>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {continueLesson.titulo}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {continueLesson.moduloTitulo}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 md:border-l md:border-white/10 md:pl-9">
                <ProgressRing value={pct} />
                <p className="text-sm font-medium">
                  {doneCount} de {totalLessons} aulas
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ===== Estatísticas ===== */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          className="mt-5 grid gap-4 sm:grid-cols-3"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
            >
              <Card className="card-glow relative h-full overflow-hidden border-white/10">
                <BorderBeam size={110} duration={6} delay={i * 1.6} />
                <CardContent className="flex items-center gap-4 p-5">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                      s.accent
                        ? "bg-[hsl(var(--energy))]/15 text-[hsl(var(--energy))]"
                        : "bg-primary/12 text-primary"
                    )}
                  >
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-2xl font-semibold leading-none tabular-nums">
                      <Counter value={s.valor} />
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== Materiais + Bônus ===== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {downloads.map((d, i) => (
            <motion.div
              key={d.titulo}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
            >
              <Card
                className={cn(
                  "card-glow group relative h-full overflow-hidden border-white/10",
                  d.bonus
                    ? "bg-gradient-to-br from-primary/10 via-card to-secondary/40"
                    : "bg-gradient-to-br from-card to-secondary/40"
                )}
              >
                <BorderBeam size={220} duration={7} delay={i * 1.6} />
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />
                <CardContent className="relative flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <d.icon className="h-6 w-6" />
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider",
                        d.bonus
                          ? "bg-[hsl(var(--energy))]/15 text-[hsl(var(--energy))]"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {d.bonus && <Gift className="h-3 w-3" />}
                      {d.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{d.titulo}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {d.texto}
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-auto w-full rounded-full border-white/15 transition-colors group-hover:border-primary/40 group-hover:text-primary"
                  >
                    <a href={d.url} target="_blank" rel="noopener noreferrer">
                      <Download /> {d.cta}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== Módulos ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="mt-12"
        >
          <div className="mb-5 flex items-baseline justify-between">
            <h3 className="text-xl font-semibold tracking-tight">
              Conteúdo do curso
            </h3>
            <span className="text-sm text-muted-foreground">
              {course.modulos.length} seções · {totalLessons} aulas
            </span>
          </div>

          <div className="relative">
            <div className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />
            <div className="space-y-2">
              {course.modulos.map((m) => {
                const total = m.aulas.length;
                const done = m.aulas.filter(
                  (a) => progress?.aulasConcluidas[a.id]
                ).length;
                const modPct = total ? Math.round((done / total) * 100) : 0;
                const modIniciado = done > 0;
                const concluido = modPct === 100;
                return (
                  <Link
                    key={m.id}
                    href={`/curso/${m.aulas[0].id}`}
                    className="group relative flex items-center gap-4 rounded-2xl border border-transparent px-3 py-3.5 transition-all duration-200 hover:border-white/10 hover:bg-card/70"
                  >
                    <span
                      className={cn(
                        "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 bg-background transition-colors",
                        concluido
                          ? "border-primary bg-primary text-primary-foreground"
                          : modIniciado
                            ? "border-primary text-primary"
                            : "border-border text-muted-foreground group-hover:border-primary/50"
                      )}
                    >
                      {concluido ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <BookOpen className="h-4 w-4" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{m.titulo}</p>
                      <div className="mt-1.5 flex items-center gap-3">
                        <ProgressBar value={modPct} className="h-1.5 max-w-44" />
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {done}/{total}
                        </span>
                      </div>
                    </div>
                    <span className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary sm:flex">
                      {concluido ? "Revisar" : modIniciado ? "Continuar" : "Começar"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
