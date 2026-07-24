"use client";

import { useEffect } from "react";

/** Registra o service worker para tornar o site instalável como app (PWA). */
export function PwaRegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* falha silenciosa — não afeta o uso do site */
      });
    }
  }, []);

  return null;
}
