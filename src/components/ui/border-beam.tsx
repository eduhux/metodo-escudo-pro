"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * BorderBeam — uma luz que percorre a borda do elemento pai.
 * Implementação self-contained (sem dependência externa): usa offset-path
 * + máscara para desenhar o "feixe" só na borda. O pai precisa ser
 * `relative` e, de preferência, `overflow-hidden` com cantos arredondados.
 *
 * A animação `border-beam` está registrada no tailwind.config.
 */
interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 180,
  duration = 7,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#527AFF",
  colorTo = "#54C8FF",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )}
    />
  );
}

export default BorderBeam;
