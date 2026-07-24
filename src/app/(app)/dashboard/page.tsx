"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { loadProgress } from "@/lib/progress";
import { course, flatLessons, totalLessons } from "@/data/course";
import { greeting, formatName } from "@/lib/utils";
import type { Progress } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { ProgressRing } from "@/components/dashboard/progress-ring";

export default function DashboardPage() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const doneCount = progress
    ? Object.values(progress.aulasConcluidas).filter(Boolean).length
    : 0;
  const pct = progress?.percentual ?? 0;

  // Determina a próxima aula: última acessada, ou a primeira não concluída, ou a #1.
  const lastId = progress?.ultimaAulaId;
  const continueLesson =
    flatLessons.find((l) => l.id === lastId) ??
    flatLessons.find((l) => !progress?.aulasConcluidas[l.id]) ??
    flatLessons[0];

  const isStarted = Boolean(lastId) || doneCount > 0;

  return (
    <div className="container py-10 md:py-14">
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
      </motion.div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {/* Continuar assistindo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="lg:col-span-2"
        >
          <Card className="relative h-full overflow-hidden bg-gradient-to-br from-card to-secondary/40">
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <CardContent className="relative flex h-full flex-col justify-between gap-6 p-7">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Play className="h-3 w-3 fill-current" />
                  {isStarted ? "Continuar assistindo" : "Comece por aqui"}
                </span>
                <h2 className="mt-4 text-xl font-semibold md:text-2xl">
                  {continueLesson.titulo}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {continueLesson.moduloTitulo}
                </p>
              </div>
              <Button asChild size="lg" className="w-fit">
                <Link href={`/curso/${continueLesson.id}`}>
                  {isStarted ? "Continuar" : "Assistir primeira aula"}
                  <ArrowRight />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progresso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-7">
              <ProgressRing value={pct} />
              <div className="text-center">
                <p className="text-sm font-medium">
                  {doneCount} de {totalLessons} aulas
                </p>
                <p className="text-xs text-muted-foreground">
                  Continue no seu ritmo
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Módulos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10"
      >
        <h3 className="text-lg font-semibold">Conteúdo do curso</h3>
        <div className="mt-4 space-y-3">
          {course.modulos.map((m) => {
            const total = m.aulas.length;
            const done = m.aulas.filter(
              (a) => progress?.aulasConcluidas[a.id]
            ).length;
            const modPct = total ? Math.round((done / total) * 100) : 0;
            return (
              <Link key={m.id} href={`/curso/${m.aulas[0].id}`}>
                <Card className="group transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {modPct === 100 ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <BookOpen className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{m.titulo}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <ProgressBar value={modPct} className="h-1.5 max-w-40" />
                        <span className="text-xs text-muted-foreground">
                          {done}/{total}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
