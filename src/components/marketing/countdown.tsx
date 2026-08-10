"use client";

import { cn } from "@/lib/utils";
import type { TempoRestante } from "@/lib/promo";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Contador regressivo reutilizável.
 * - `size="sm"` para a barra de topo, `size="lg"` para a seção de preço.
 * - Dígitos são aria-hidden (mudam a cada segundo); um resumo em sr-only
 *   com aria-live anuncia o tempo por minuto, sem "spammar" o leitor de tela.
 */
export function Countdown({
  tempo,
  size = "sm",
  className,
}: {
  tempo: TempoRestante;
  size?: "sm" | "lg";
  className?: string;
}) {
  const unidades = [
    { v: tempo.dias, l: "dias" },
    { v: tempo.horas, l: "hrs" },
    { v: tempo.minutos, l: "min" },
    { v: tempo.segundos, l: "seg" },
  ];

  const resumo = `Tempo restante: ${tempo.dias} dias, ${tempo.horas} horas e ${tempo.minutos} minutos.`;

  const box =
    size === "lg"
      ? "min-w-[3.75rem] px-2 py-2 text-3xl sm:min-w-[4.5rem] sm:text-4xl"
      : "min-w-[2.1rem] px-1 py-0.5 text-sm sm:text-base";
  const labelCls =
    size === "lg" ? "text-[10px] sm:text-xs" : "text-[9px]";

  return (
    <div
      className={cn("flex items-center", size === "lg" ? "gap-2 sm:gap-3" : "gap-1", className)}
      role="timer"
    >
      {/* Resumo acessível — muda só quando o minuto muda */}
      <span className="sr-only" aria-live="polite">
        {resumo}
      </span>

      {unidades.map((u, i) => (
        <div key={u.l} className="flex items-center gap-1" aria-hidden="true">
          <div
            className={cn(
              "flex flex-col items-center justify-center rounded-none border border-primary/40 bg-black/40 font-display leading-none text-primary tabular-nums",
              box
            )}
          >
            <span>{pad(u.v)}</span>
            <span className={cn("mt-0.5 font-mono uppercase tracking-wider text-primary/70", labelCls)}>
              {u.l}
            </span>
          </div>
          {i < unidades.length - 1 && size === "lg" && (
            <span className="font-display text-2xl text-primary/40 sm:text-3xl">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
