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
    <nav className="space-y-7">
      {course.modulos.map((m) => (
        <div key={m.id}>
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {m.titulo}
          </p>

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
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg py-2 pl-2 pr-3 text-sm transition-colors",
                      isCurrent
                        ? "bg-primary/10 font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                    )}
                  >
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
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      ) : null}
                    </span>

                    <span className="flex-1 leading-snug">{a.titulo}</span>
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
