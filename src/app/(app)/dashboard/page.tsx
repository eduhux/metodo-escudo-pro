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

const MATERIAIS_URL =
  "https://drive.google.com/file/d/1KFM6JqIY5DH7qACk0b_XNGKlVOuN550L/view?usp=drive_link";

const FONTES_URL =
  "https://drive.google.com/drive/folders/1MOl_YdmujRUcd1fW5J80JN5gdfz3S4SK?usp=sharing";

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
    { icon: Film, valor: totalLessons, label: "Aulas no total", accent: false },
    { icon: Layers, valor: modulosCount, label: "Módulos", accent: false },
    {
      icon: CheckCircle2,
      valor: doneCount,
      label: "Aulas concluídas",
      accent: true,
    },
  ];

  const jornadaMsg =
    pct === 100
      ? "Você concluiu o método. Agora é colocar em prática e cobrar como profissional."
      : isStarted
        ? `Você já concluiu ${doneCount} ${doneCount === 1 ? "aula" : "aulas"}. Continue de onde parou e mantenha o ritmo.`
        : "Sua jornada começa agora. Bora desenvolver seu primeiro escudo?";

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] glow-primary opacity-70" />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.12]" />

      <div className="container relative py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            {greeting()}, que bom te ver
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
            Olá, {formatName(user?.nome)} 👋
          </h1>
          <p className="mt-2 text-muted-foreground">{jornadaMsg}</p>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-8 flex flex-wrap items-stretch divide-x divide-border overflow-hidden rounded-2xl border border-border bg-card/40"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex min-w-[8rem] flex-1 items-center gap-3.5 px-6 py-5"
            >
              <s.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  s.accent ? "text-[hsl(var(--energy))]" : "text-primary"
                )}
              />
              <div>
                <p className="text-2xl font-semibold leading-none tabular-nums">
                  <Counter value={s.valor} />
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Continuar + Progresso */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="relative h-full overflow-hidden bg-gradient-to-br from-card to-secondary/40">
              <div className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
              <CardContent className="relative grid h-full gap-6 p-7 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Play className="h-3 w-3 fill-current" />
                    {isStarted ? "Continuar assistindo" : "Comece por aqui"}
                  </span>
                  <h2 className="mt-4 text-xl font-semibold md:text-2xl">
                    {continueLesson.titulo}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {continueLesson.moduloTitulo}
                  </p>
                  <Button asChild size="lg" className="mt-6 w-fit">
                    <Link href={`/curso/${continueLesson.id}`}>
                      {isStarted ? "Continuar" : "Assistir primeira aula"}
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>

                {/* Miniatura estilo player */}
                <Link
                  href={`/curso/${continueLesson.id}`}
                  className="group relative hidden aspect-[4/3] w-44 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary/40 sm:flex"
                >
                  <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform group-hover:scale-110">
                    <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                  </span>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Card className="h-full">
              <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-7">
                <ProgressRing value={pct} />
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {doneCount} de {totalLessons} aulas
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {pct === 0
                      ? "Comece sua jornada hoje"
                      : pct === 100
                        ? "Parabéns, curso concluído!"
                        : "Continue no seu ritmo"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Materiais + Bônus (lado a lado) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-5 grid gap-5 lg:grid-cols-2"
        >
          {/* Materiais do curso */}
          <Card className="relative h-full overflow-hidden bg-gradient-to-br from-card to-secondary/40">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <CardContent className="relative flex h-full flex-col gap-4 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileArchive className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Materiais do curso</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Baixe o pacote com todos os arquivos usados nas aulas.{" "}
                    <strong className="text-foreground/90">Importante:</strong>{" "}
                    faça o download e a instalação seguindo exatamente as
                    orientações das aulas.
                  </p>
                </div>
              </div>
              <Button asChild size="lg" className="mt-auto w-full sm:w-fit">
                <a href={MATERIAIS_URL} target="_blank" rel="noopener noreferrer">
                  <Download /> Baixar materiais
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Bônus — pacote de fontes */}
          <Card className="relative h-full overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-card to-secondary/40">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
            <CardContent className="relative flex h-full flex-col gap-4 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Type className="h-6 w-6" />
                </span>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                    <Gift className="h-3.5 w-3.5" />
                    Bônus exclusivo
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">
                    Pacote com +200 fontes premium
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Este pack é o seu{" "}
                    <strong className="text-foreground/90">
                      bônus por ter adquirido o curso
                    </strong>
                    , com as mesmas fontes que uso nos meus projetos. Baixe e use
                    nos seus escudos.
                  </p>
                </div>
              </div>
              <Button asChild size="lg" className="mt-auto w-full sm:w-fit">
                <a href={FONTES_URL} target="_blank" rel="noopener noreferrer">
                  <Download /> Baixar fontes
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Módulos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-10"
        >
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-lg font-semibold">Conteúdo do curso</h3>
            <span className="text-sm text-muted-foreground">
              {course.modulos.length} seções · {totalLessons} aulas
            </span>
          </div>

          <div className="relative">
            <div className="absolute bottom-6 left-[31px] top-6 w-px bg-border" />
            <div className="space-y-1">
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
                    className="group relative flex items-center gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-card/60"
                  >
                    <span
                      className={cn(
                        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-background transition-colors",
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
                      {concluido
                        ? "Revisar"
                        : modIniciado
                          ? "Continuar"
                          : "Começar"}
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
