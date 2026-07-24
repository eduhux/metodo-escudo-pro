"use client";

import { MOCK_MODE } from "@/lib/config";
import { totalLessons } from "@/data/course";
import type { Progress } from "@/types";

const KEY = "mep_progress";

const empty: Progress = {
  aulasConcluidas: {},
  percentual: 0,
};

function computePct(map: Record<string, boolean>): number {
  const done = Object.values(map).filter(Boolean).length;
  if (totalLessons === 0) return 0;
  return Math.round((done / totalLessons) * 100);
}

/**
 * Camada de progresso.
 * MOCK: usa localStorage. Produção: substitua por leitura/escrita no Firestore
 * (progress/{uid}) — a assinatura das funções foi mantida para facilitar.
 */
export function loadProgress(): Progress {
  if (typeof window === "undefined") return empty;
  if (MOCK_MODE) {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return empty;
      const parsed = JSON.parse(raw) as Progress;
      return { ...empty, ...parsed };
    } catch {
      return empty;
    }
  }
  // TODO produção: buscar de progress/{uid} no Firestore.
  return empty;
}

export function saveLastLesson(aulaId: string): Progress {
  const current = loadProgress();
  const next: Progress = {
    ...current,
    ultimaAulaId: aulaId,
    atualizadoEm: new Date().toISOString(),
  };
  persist(next);
  return next;
}

export function toggleLessonDone(aulaId: string, done: boolean): Progress {
  const current = loadProgress();
  const aulasConcluidas = { ...current.aulasConcluidas, [aulaId]: done };
  const next: Progress = {
    ...current,
    aulasConcluidas,
    percentual: computePct(aulasConcluidas),
    atualizadoEm: new Date().toISOString(),
  };
  persist(next);
  return next;
}

function persist(p: Progress) {
  if (typeof window === "undefined") return;
  if (MOCK_MODE) {
    localStorage.setItem(KEY, JSON.stringify(p));
    return;
  }
  // TODO produção: gravar em progress/{uid} no Firestore.
}
