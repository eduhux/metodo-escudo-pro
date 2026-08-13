import { KIWIFY_CHECKOUT_URL } from "@/lib/config";

/**
 * ─────────────────────────────────────────────────────────────
 *  PROMOÇÃO RELÂMPAGO — FONTE ÚNICA DE VERDADE
 * ─────────────────────────────────────────────────────────────
 *  Para rodar uma nova promoção no futuro, basta editar este
 *  objeto (datas, preços, links). Nada mais precisa mudar.
 *
 *  - As datas usam ISO 8601 com fuso -03:00 (horário de Brasília).
 *  - `ativaManual`: deixe `null` para que a promo ligue/desligue
 *    sozinha pela data. Use `true`/`false` só para forçar em teste.
 *  - Link do checkout de R$47: preencha via variável de ambiente
 *    NEXT_PUBLIC_KIWIFY_CHECKOUT_URL_PROMO ou troque o fallback abaixo.
 */
export const promo = {
  // Promoção 72h encerrada — forçada desligada. Para uma nova promo,
  // volte para `null` e ajuste as datas/preços abaixo.
  ativaManual: false as boolean | null,

  dataInicio: "2026-08-10T13:20:00-03:00",
  dataFim: "2026-08-13T13:20:00-03:00",

  precoDe: 97,
  precoPor: 47,
  precoPorLabel: "47,00",
  descontoPct: 52,

  // O preço de R$47 é definido direto na Kiwify, no MESMO checkout.
  // Por isso, por padrão, o link promocional usa o mesmo checkout do site.
  // (Se um dia tiver um link separado, é só definir a env abaixo.)
  urlCheckoutPromo:
    process.env.NEXT_PUBLIC_KIWIFY_CHECKOUT_URL_PROMO ?? KIWIFY_CHECKOUT_URL,

  urlCheckoutNormal: KIWIFY_CHECKOUT_URL,

  selos: ["+200 fontes premium", "Garantia de 7 dias", "Acesso vitalício"],
} as const;

export const promoInicioMs = new Date(promo.dataInicio).getTime();
export const promoFimMs = new Date(promo.dataFim).getTime();

/** A promo está ativa agora? (janela início ≤ agora < fim) */
export function isPromoAtiva(now: number = Date.now()): boolean {
  if (promo.ativaManual !== null) return promo.ativaManual;
  return now >= promoInicioMs && now < promoFimMs;
}

/** URL de checkout correta conforme o estado da promo. */
export function checkoutUrl(ativa: boolean): string {
  return ativa ? promo.urlCheckoutPromo : promo.urlCheckoutNormal;
}

export interface TempoRestante {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
  totalMs: number;
}

/** Tempo restante até o fim da promo (nunca negativo). */
export function tempoRestante(now: number = Date.now()): TempoRestante {
  const totalMs = Math.max(0, promoFimMs - now);
  const s = Math.floor(totalMs / 1000);
  return {
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    minutos: Math.floor((s % 3600) / 60),
    segundos: s % 60,
    totalMs,
  };
}
