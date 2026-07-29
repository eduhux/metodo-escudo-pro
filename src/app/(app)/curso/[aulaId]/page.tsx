"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { findLesson, flatLessons, totalLessons } from "@/data/course";
import {
  loadProgress,
  saveLastLesson,
  toggleLessonDone,
  syncProgressFromCloud,
} from "@/lib/progress";
import { useAuth } from "@/context/auth-context";
import type { Progress } from "@/types";
import { PandaPlayer } from "@/components/course/panda-player";
import { LessonSidebar } from "@/components/course/lesson-sidebar";
import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function CoursePage({
  params,
}: {
  params: Promise<{ aulaId: string }>;
}) {
  const { aulaId } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const data = useMemo(() => findLesson(aulaId), [aulaId]);

  useEffect(() => {
    setProgress(loadProgress(user?.uid));
    syncProgressFromCloud(user?.uid).then(setProgress).catch(() => {});
  }, [user?.uid]);

  useEffect(() => {
    if (data) setProgress(saveLastLesson(user?.uid, aulaId));
    setSidebarOpen(false);
  }, [aulaId, data, user?.uid]);

  // Atalhos de teclado (recurso de usuário avançado): C conclui, setas navegam.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!data || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" && data.next) {
        router.push(`/curso/${data.next.id}`);
      } else if (e.key === "ArrowLeft" && data.prev) {
        router.push(`/curso/${data.prev.id}`);
      } else if (e.key.toLowerCase() === "c") {
        const done = Boolean(progress?.aulasConcluidas[data.lesson.id]);
        setProgress(toggleLessonDone(user?.uid, data.lesson.id, !done));
        if (!done) setCelebrate(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [data, progress, router, user?.uid]);

  // Auto-fecha a micro-celebração.
  useEffect(() => {
    if (!celebrate) return;
    const t = setTimeout(() => setCelebrate(false), 1600);
    return () => clearTimeout(t);
  }, [celebrate]);

  if (!data) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-medium">Aula não encontrada</p>
        <Button onClick={() => router.push("/dashboard")}>
          Voltar ao dashboard
        </Button>
      </div>
    );
  }

  const { lesson, prev, next } = data;
  const isDone = Boolean(progress?.aulasConcluidas[lesson.id]);
  const doneCount = progress
    ? Object.values(progress.aulasConcluidas).filter(Boolean).length
    : 0;
  const pct = progress?.percentual ?? 0;
  const lessonIndex = flatLessons.findIndex((l) => l.id === lesson.id) + 1;

  function handleToggleDone() {
    const willBeDone = !isDone;
    setProgress(toggleLessonDone(user?.uid, lesson.id, willBeDone));
    if (willBeDone) setCelebrate(true);
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[340px] glow-primary opacity-60" />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.1]" />

      {/* Micro-celebração ao concluir uma aula */}
      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex flex-col items-center gap-3 rounded-3xl border border-energy bg-card/90 px-10 py-8 shadow-2xl backdrop-blur"
            >
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--energy))] text-[hsl(var(--energy-foreground))]">
                <Check className="h-8 w-8" strokeWidth={3} />
                <span className="absolute inset-0 rounded-full bg-[hsl(var(--energy))] opacity-40 animate-ping" />
              </span>
              <p className="text-lg font-semibold">Aula concluída!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container relative py-6 lg:py-8">
        {/* Mobile: barra superior com progresso */}
        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <Button variant="outline" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu /> Aulas
          </Button>
          <div className="flex flex-1 items-center gap-2">
            <ProgressBar value={pct} className="h-1.5" />
            <span className="shrink-0 text-xs text-muted-foreground">
              {doneCount}/{totalLessons}
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          {/* Coluna esquerda — progresso + lista de aulas (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-border glass p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Seu progresso
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold">{pct}% concluído</span>
                <span className="text-xs text-muted-foreground">
                  {doneCount}/{totalLessons} aulas
                </span>
              </div>
              <ProgressBar value={pct} className="mt-2 h-1.5" />

              <Separator className="my-5" />

              <LessonSidebar currentId={lesson.id} progress={progress} />
            </div>
          </aside>

          {/* Coluna direita — player e detalhes */}
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-w-0"
          >
            {/* Breadcrumb (desktop) */}
            <div className="mb-4 hidden items-center gap-2 text-sm lg:flex">
              <Link
                href="/dashboard"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
              <span className="text-muted-foreground/50">/</span>
              <span className="text-primary">{lesson.moduloTitulo}</span>
            </div>

            {/* Player com moldura e brilho */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-primary/10 blur-3xl" />
              <div className="rounded-2xl border border-border bg-card/40 p-1.5 shadow-2xl shadow-primary/10">
                <PandaPlayer videoId={lesson.pandaVideoId} title={lesson.titulo} />
              </div>
            </div>

            {/* Detalhes */}
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {lesson.moduloTitulo}
                </span>
                <span className="text-xs text-muted-foreground">
                  Aula {lessonIndex} de {totalLessons}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                {lesson.titulo}
              </h1>
              {lesson.descricao && (
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {lesson.descricao}
                </p>
              )}
            </div>

            {/* Ações */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button
                onClick={handleToggleDone}
                size="lg"
                variant={isDone ? "secondary" : "default"}
              >
                {isDone ? (
                  <>
                    <CheckCircle2 className="text-[hsl(var(--energy))]" /> Aula
                    concluída
                  </>
                ) : (
                  <>
                    <Check /> Marcar como concluída
                  </>
                )}
              </Button>
              <p className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                Atalhos:
                <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[11px]">
                  C
                </kbd>
                concluir
                <span className="text-muted-foreground/40">·</span>
                <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[11px]">
                  ←
                </kbd>
                <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[11px]">
                  →
                </kbd>
                navegar
              </p>
            </div>

            {/* Materiais */}
            {lesson.materiais && lesson.materiais.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Materiais complementares
                </h2>
                <div className="mt-3 space-y-2">
                  {lesson.materiais.map((mat) => (
                    <a
                      key={mat.titulo}
                      href={mat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-border bg-card/40 p-3.5 transition-colors hover:border-primary/30 hover:bg-card"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FileText className="h-4 w-4" />
                      </span>
                      <span className="flex-1 text-sm font-medium">
                        {mat.titulo}
                      </span>
                      <Download className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-8" />

            {/* Navegação entre aulas */}
            <div className="flex items-center justify-between gap-3">
              {prev ? (
                <Button asChild variant="outline">
                  <Link href={`/curso/${prev.id}`}>
                    <ArrowLeft />
                    <span className="hidden sm:inline">Aula anterior</span>
                    <span className="sm:hidden">Anterior</span>
                  </Link>
                </Button>
              ) : (
                <span />
              )}

              {next ? (
                <Button asChild>
                  <Link href={`/curso/${next.id}`}>
                    <span className="hidden sm:inline">Próxima aula</span>
                    <span className="sm:hidden">Próxima</span>
                    <ArrowRight />
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="secondary">
                  <Link href="/dashboard">
                    Concluir curso <CheckCircle2 />
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar mobile (drawer) */}
        <div
          className={cn(
            "fixed inset-0 z-50 lg:hidden",
            sidebarOpen ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-black/60 transition-opacity",
              sidebarOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className={cn(
              "absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto border-r border-border bg-card p-5 transition-transform duration-300",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Conteúdo do curso</p>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{pct}% concluído</span>
                <span className="text-xs text-muted-foreground">
                  {doneCount}/{totalLessons}
                </span>
              </div>
              <ProgressBar value={pct} className="mt-2 h-1.5" />
            </div>
            <LessonSidebar
              currentId={lesson.id}
              progress={progress}
              onNavigate={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
