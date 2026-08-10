"use client";

import { useEffect, useRef } from "react";
import { Zap } from "lucide-react";
import { usePromo } from "@/hooks/use-promo";
import { checkoutUrl } from "@/lib/promo";
import { Countdown } from "./countdown";

/**
 * Barra fixa no topo com a promo relâmpago.
 * - Some sozinha quando a promo expira (ativa === false).
 * - Publica a própria altura em `--promo-h` para o navbar e o <main>
 *   descerem exatamente o necessário (sem sobrepor conteúdo).
 */
export function AnnouncementBar() {
  const { montado, ativa, tempo } = usePromo();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;

    if (!montado || !ativa || !el) {
      root.style.setProperty("--promo-h", "0px");
      return;
    }

    const set = () =>
      root.style.setProperty("--promo-h", `${el.offsetHeight}px`);
    set();

    const ro = new ResizeObserver(set);
    ro.observe(el);
    window.addEventListener("resize", set);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", set);
      root.style.setProperty("--promo-h", "0px");
    };
  }, [montado, ativa]);

  if (!montado || !ativa) return null;

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Oferta por tempo limitado"
      className="fixed inset-x-0 top-0 z-[60] border-b border-primary/30 bg-[#0b0a07]/95 backdrop-blur-md"
    >
      <div className="container flex flex-col items-center justify-center gap-2 py-2 text-center sm:flex-row sm:gap-4">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-foreground sm:text-xs">
          <Zap className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
          <span>
            <span className="font-bold text-primary">Promoção 72h</span> — de{" "}
            <span className="line-through opacity-60">R$97</span> por{" "}
            <span className="font-bold text-primary">R$47</span>
          </span>
        </p>

        <Countdown tempo={tempo} size="sm" />

        <a
          href={checkoutUrl(true)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-none bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground transition hover:brightness-110 sm:text-xs"
        >
          Garantir agora
        </a>
      </div>
    </div>
  );
}
