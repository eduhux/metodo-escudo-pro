"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
import { findLesson } from "@/data/course";
import {
  loadProgress,
  saveLastLesson,
  toggleLessonDone,
} from "@/lib/progress";
import { useAuth } from "@/context/auth-context";
import type { Progress } from "@/types";
import { PandaPlayer } from "@/components/course/panda-player";
import { LessonSidebar } from "@/components/course/lesson-sidebar";
import { Button } from "@/components/ui/button";
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

  const data = useMemo(() => findLesson(aulaId), [aulaId]);

  useEffect(() => {
    setProgress(loadProgress(user?.uid));
  }, [user?.uid]);

  useEffect(() => {
    if (data) setProgress(saveLastLesson(user?.uid, aulaId));
    setSidebarOpen(false);
  }, [aulaId, data, user?.uid]);

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

  function handleToggleDone() {
    const updated = toggleLessonDone(user?.uid, lesson.id, !isDone);
    setProgress(updated);
  }

  return (
    <div className="container py-6 lg:py-8">
      {/* Mobile: botão para abrir a lista de aulas */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <Button variant="outline" size="sm" onClick={() => setSidebarOpen(true)}>
          <Menu /> Aulas
        </Button>
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Dashboard
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* Coluna esquerda — lista de módulos e aulas (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl border border-border bg-card/40 p-4">
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
          <PandaPlayer videoId={lesson.pandaVideoId} title={lesson.titulo} />

          <div className="mt-6">
            <p className="text-sm text-primary">{data.lesson.moduloTitulo}</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
              {lesson.titulo}
            </h1>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {lesson.descricao}
            </p>
          </div>

          {/* Ações */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              onClick={handleToggleDone}
              variant={isDone ? "secondary" : "default"}
            >
              {isDone ? (
                <>
                  <CheckCircle2 /> Aula concluída
                </>
              ) : (
                <>
                  <Check /> Marcar como concluída
                </>
              )}
            </Button>
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
                    className="group flex items-center gap-3 rounded-lg border border-border bg-card/40 p-3.5 transition-colors hover:border-primary/30 hover:bg-card"
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
                  <ArrowLeft /> <span className="hidden sm:inline">Aula anterior</span>
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
                  <span className="sm:hidden">Próxima</span> <ArrowRight />
                </Link>
              </Button>
            ) : (
              <Button asChild variant="secondary">
                <Link href="/dashboard">
                  Concluir <CheckCircle2 />
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
          <LessonSidebar
            currentId={lesson.id}
            progress={progress}
            onNavigate={() => setSidebarOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
