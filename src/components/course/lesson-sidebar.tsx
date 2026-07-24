"use client";

import Link from "next/link";
import { CheckCircle2, PlayCircle, Circle } from "lucide-react";
import { course } from "@/data/course";
import { cn } from "@/lib/utils";
import type { Progress } from "@/types";

export function LessonSidebar({
  currentId,
  progress,
  onNavigate,
}: {
  currentId: string;
  progress: Progress | null;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-6">
      {course.modulos.map((m) => (
        <div key={m.id}>
          <p className="mb-3 px-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {m.titulo}
          </p>

          <ul className="space-y-1">
            {m.aulas.map((a) => {
              const isCurrent = a.id === currentId;
              const isDone = Boolean(progress?.aulasConcluidas[a.id]);
              return (
                <li key={a.id}>
                  <Link
                    href={`/curso/${a.id}`}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      isCurrent
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  >
                    <span className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : isCurrent ? (
                        <PlayCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <Circle className="h-4 w-4 opacity-50" />
                      )}
                    </span>
                    <span className="flex-1 leading-snug">{a.titulo}</span>
                    {a.duracao && (
                      <span className="shrink-0 text-xs opacity-70">
                        {a.duracao}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
