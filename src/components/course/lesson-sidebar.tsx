"use client";

import Link from "next/link";
import { Check } from "lucide-react";
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
      {course.modulos.map((m) => {
        const total = m.aulas.length;
        const done = m.aulas.filter(
          (a) => progress?.aulasConcluidas[a.id]
        ).length;
        const hasCurrent = m.aulas.some((a) => a.id === currentId);

        return (
          <div key={m.id}>
            <div className="mb-2.5 flex items-center justify-between gap-2 px-2">
              <p
                className={cn(
                  "text-[0.7rem] font-semibold uppercase tracking-widest",
                  hasCurrent ? "text-primary" : "text-muted-foreground"
                )}
              >
                {m.titulo}
              </p>
              <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-medium tabular-nums text-muted-foreground">
                {done}/{total}
              </span>
            </div>

            <ul className="relative space-y-0.5">
              {/* fio da timeline */}
              <div className="absolute bottom-4 left-4 top-4 w-px bg-border" />

              {m.aulas.map((a) => {
                const isCurrent = a.id === currentId;
                const isDone = Boolean(progress?.aulasConcluidas[a.id]);
                return (
                  <li key={a.id}>
                    <Link
                      href={`/curso/${a.id}`}
                      onClick={onNavigate}
                      aria-current={isCurrent ? "page" : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 overflow-hidden rounded-xl py-2 pl-2.5 pr-3 text-sm transition-colors",
                        isCurrent
                          ? "bg-primary/12 font-medium text-foreground"
                          : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                      )}
                    >
                      {/* barra de acento na aula atual */}
                      {isCurrent && (
                        <span className="absolute inset-y-1.5 left-0 w-1 rounded-full bg-primary" />
                      )}

                      <span
                        className={cn(
                          "relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border bg-background transition-all group-hover:scale-110",
                          isDone
                            ? "border-[hsl(var(--energy))] bg-[hsl(var(--energy))] text-[hsl(var(--energy-foreground))]"
                            : isCurrent
                              ? "border-primary"
                              : "border-border group-hover:border-primary/50"
                        )}
                      >
                        {isDone ? (
                          <Check className="h-3 w-3" strokeWidth={3} />
                        ) : isCurrent ? (
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                        ) : null}
                      </span>

                      <span className="flex-1 leading-snug">{a.titulo}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
