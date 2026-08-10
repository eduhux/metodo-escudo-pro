"use client";

import { useEffect, useState } from "react";
import {
  isPromoAtiva,
  tempoRestante,
  type TempoRestante,
} from "@/lib/promo";

export interface PromoState {
  /** true depois que o componente montou no cliente (evita mismatch de hidratação). */
  montado: boolean;
  /** A promo está ativa neste instante. */
  ativa: boolean;
  tempo: TempoRestante;
}

const zerado: TempoRestante = {
  dias: 0,
  horas: 0,
  minutos: 0,
  segundos: 0,
  totalMs: 0,
};

/**
 * Estado da promoção, recalculado a cada segundo no cliente.
 *
 * Antes de montar, retorna `ativa: false` (estado base = R$97) de propósito:
 * assim o HTML estático nunca mostra R$47 depois que a promo expira, e ao
 * montar o cliente "sobe" para R$47 se ainda estiver dentro do prazo.
 */
export function usePromo(): PromoState {
  const [state, setState] = useState<PromoState>({
    montado: false,
    ativa: false,
    tempo: zerado,
  });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      setState({
        montado: true,
        ativa: isPromoAtiva(now),
        tempo: tempoRestante(now),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return state;
}
