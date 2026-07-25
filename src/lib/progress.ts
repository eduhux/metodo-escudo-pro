"use client";

import { totalLessons } from "@/data/course";
import type { Progress } from "@/types";

const empty: Progress = {
  aulasConcluidas: {},
  percentual: 0,
};

function storageKey(uid?: string | null) {
  return `mep_progress_${uid || "anon"}`;
}

function computePct(map: Record<string, boolean>): number {
  const done = Object.values(map).filter(Boolean).length;
  if (totalLessons === 0) return 0;
  return Math.round((done / totalLessons) * 100);
}

/**
 * Progresso do aluno, salvo no navegador (localStorage), separado por usuário.
 * Reflete de imediato no dashboard, no anel de progresso e nas barras dos módulos.
 * (Evolução futura: sincronizar entre dispositivos via Firestore em progress/{uid}.)
 */
export function loadProgress(uid?: string | null): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(storageKey(uid));
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Progress;
    const aulasConcluidas = parsed.aulasConcluidas || {};
    return {
      ...empty,
      ...parsed,
      aulasConcluidas,
      percentual: computePct(aulasConcluidas),
    };
  } catch {
    return empty;
  }
}

export function saveLastLesson(
  uid: string | null | undefined,
  aulaId: string
): Progress {
  const current = loadProgress(uid);
  const next: Progress = {
    ...current,
    ultimaAulaId: aulaId,
    atualizadoEm: new Date().toISOString(),
  };
  persist(uid, next);
  return next;
}

export function toggleLessonDone(
  uid: string | null | undefined,
  aulaId: string,
  done: boolean
): Progress {
  const current = loadProgress(uid);
  const aulasConcluidas = { ...current.aulasConcluidas, [aulaId]: done };
  const next: Progress = {
    ...current,
    aulasConcluidas,
    percentual: computePct(aulasConcluidas),
    atualizadoEm: new Date().toISOString(),
  };
  persist(uid, next);
  return next;
}

function persist(uid: string | null | undefined, p: Progress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(storageKey(uid), JSON.stringify(p));
  } catch {
    /* ignora falhas de armazenamento */
  }
}
