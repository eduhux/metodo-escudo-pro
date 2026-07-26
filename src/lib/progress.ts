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

/* ---------- Cache local (instantâneo) ---------- */

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

function persistLocal(uid: string | null | undefined, p: Progress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(storageKey(uid), JSON.stringify(p));
  } catch {
    /* ignora falhas de armazenamento */
  }
}

/* ---------- Sincronização com o Firestore (entre dispositivos) ---------- */

async function getDb() {
  const { db } = await import("@/lib/firebase/client");
  return db;
}

function mergeProgress(a: Progress, b: Progress): Progress {
  const keys = new Set([
    ...Object.keys(a.aulasConcluidas || {}),
    ...Object.keys(b.aulasConcluidas || {}),
  ]);
  const aulasConcluidas: Record<string, boolean> = {};
  keys.forEach((k) => {
    aulasConcluidas[k] =
      Boolean(a.aulasConcluidas?.[k]) || Boolean(b.aulasConcluidas?.[k]);
  });
  const ta = a.atualizadoEm ?? "";
  const tb = b.atualizadoEm ?? "";
  const maisNovo = tb >= ta ? b : a;
  return {
    aulasConcluidas,
    percentual: computePct(aulasConcluidas),
    ultimaAulaId: maisNovo.ultimaAulaId ?? a.ultimaAulaId ?? b.ultimaAulaId,
    atualizadoEm: tb >= ta ? tb : ta,
  };
}

async function writeCloud(uid: string, p: Progress) {
  try {
    const db = await getDb();
    if (!db) return;
    const { doc, setDoc } = await import("firebase/firestore");
    await setDoc(doc(db, "progress", uid), p, { merge: true });
  } catch {
    /* silencioso — o cache local mantém o progresso */
  }
}

/**
 * Lê o progresso do Firestore, junta com o cache local, grava o resultado
 * nos dois lados e retorna o progresso final. Chame logo após loadProgress().
 */
export async function syncProgressFromCloud(
  uid?: string | null
): Promise<Progress> {
  const local = loadProgress(uid);
  if (!uid) return local;
  try {
    const db = await getDb();
    if (!db) return local;
    const { doc, getDoc } = await import("firebase/firestore");
    const snap = await getDoc(doc(db, "progress", uid));
    const cloud = snap.exists() ? (snap.data() as Progress) : empty;
    const merged = mergeProgress(cloud, local);
    persistLocal(uid, merged);
    void writeCloud(uid, merged);
    return merged;
  } catch {
    return local;
  }
}

/* ---------- Ações do aluno (local imediato + Firestore em 2º plano) ---------- */

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
  persistLocal(uid, next);
  if (uid) void writeCloud(uid, next);
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
  persistLocal(uid, next);
  if (uid) void writeCloud(uid, next);
  return next;
}
