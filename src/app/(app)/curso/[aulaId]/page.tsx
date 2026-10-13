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
  FolderDown,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { course, findLesson, totalLessons } from "@/data/course";
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

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-md border border-white/10 bg-white/5 px-1.5 font-mono text-[11px] font-medium text-foreground/80">
      {children}
    </kbd>
  );
}

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
  const modulo = course.modulos.find((m) =>
    m.aulas.some((a) => a.id === lesson.id)
  );
  const posNoModulo = modulo
    ? modulo.aulas.findIndex((a) => a.id === lesson.id) + 1
    : 1;
  const totalNoModulo = modulo?.aulas.length ?? 1;
  const moduloIndex = modulo
    ? course.modulos.filter((m) => m.id !== "aula-inicial").findIndex((m) => m.id === modulo.id) + 1
    : 0;

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
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-white/10 glass p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="eyebrow text-[0.6rem] text-muted-foreground">
                    Seu progresso
                  </p>
                  <p className="mt-1 text-3xl font-bold leading-none tabular-nums">
                    {pct}
                    <span className="text-lg text-muted-foreground">%</span>
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {doneCount}/{totalLessons} aulas
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-[hsl(var(--energy))] transition-all duration-700 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>

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
              <div className="glow-orb pointer-events-none absolute -inset-8 -z-10 opacity-60" />
              <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-1.5 shadow-2xl shadow-black/40">
                <div className="overflow-hidden rounded-[0.9rem]">
                  <PandaPlayer videoId={lesson.pandaVideoId} title={lesson.titulo} />
                </div>
              </div>
            </div>

            {/* Detalhes */}
            <div className="mt-7">
              <div className="flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary">
                {moduloIndex > 0 && (
                  <span className="tabular-nums">
                    Módulo {String(moduloIndex).padStart(2, "0")}
                  </span>
                )}
                <span className="h-1 w-1 rounded-full bg-primary/50" />
                <span className="text-muted-foreground">
                  Aula {posNoModulo}/{totalNoModulo}
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                {lesson.titulo}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {lesson.moduloTitulo}
              </p>
              {lesson.descricao && (
                <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                  {lesson.descricao}
                </p>
              )}
            </div>

            {/* Ações */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button
                onClick={handleToggleDone}
                size="lg"
                variant={isDone ? "secondary" : "default"}
                className={
                  isDone
                    ? "rounded-full"
                    : "cta-energy rounded-full font-semibold"
                }
              >
                {isDone ? (
                  <>
                    <CheckCircle2 className="text-[hsl(var(--energy))]" />
                    Aula concluída
                  </>
                ) : (
                  <>
                    <Check strokeWidth={3} />
                    Marcar como concluída
                  </>
                )}
              </Button>

              <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                <Kbd>C</Kbd>
                <span>concluir</span>
                <span className="mx-1 h-3 w-px bg-border" />
                <Kbd>←</Kbd>
                <Kbd>→</Kbd>
                <span>navegar entre aulas</span>
              </div>
            </div>

            {/* Materiais */}
            {lesson.materiais && lesson.materiais.length > 0 && (
              <div className="mt-10">
                <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Material de apoio
                </h2>
                <div className="mt-3 grid gap-2.5">
                  {lesson.materiais.map((mat) => (
                    <a
                      key={mat.titulo}
                      href={mat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-card to-secondary/40 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
                    >
                      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                        <FolderDown className="h-6 w-6" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold leading-tight">
                          {mat.titulo}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <ExternalLink className="h-3 w-3" />
                          Google Drive · abre em nova aba
                        </p>
                      </div>

                      <span className="relative z-10 inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all group-hover:brightness-110">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Baixar</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-8" />

            {/* Navegação entre aulas */}
            <div className="grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/curso/${prev.id}`}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-card/40 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-card"
                >
                  <ArrowLeft className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-x-0.5 group-hover:text-primary" />
                  <div className="min-w-0">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      Aula anterior
                    </p>
                    <p className="truncate text-sm font-medium">{prev.titulo}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {prev.moduloTitulo}
                    </p>
                  </div>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}

              {next ? (
                <Link
                  href={`/curso/${next.id}`}
                  className="group flex items-center justify-end gap-3 rounded-2xl border border-white/10 bg-card/40 p-4 text-right transition-all duration-200 hover:border-primary/30 hover:bg-card"
                >
                  <div className="min-w-0">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-wider text-primary">
                      Próxima aula
                    </p>
                    <p className="truncate text-sm font-medium">{next.titulo}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {next.moduloTitulo}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="group flex items-center justify-end gap-3 rounded-2xl border border-[hsl(var(--energy))]/30 bg-[hsl(var(--energy))]/10 p-4 text-right transition-all duration-200 hover:bg-[hsl(var(--energy))]/15"
                >
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-wider text-[hsl(var(--energy))]">
                      Fim do curso
                    </p>
                    <p className="text-sm font-medium">
                      Concluir e voltar ao dashboard
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[hsl(var(--energy))]" />
                </Link>
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
