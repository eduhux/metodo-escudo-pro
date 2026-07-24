/**
 * Configuração central de ambiente.
 * MOCK_MODE permite rodar toda a plataforma sem Firebase/Panda configurados.
 */
export const MOCK_MODE =
  process.env.NEXT_PUBLIC_MOCK_MODE === "true" ||
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

export const KIWIFY_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_KIWIFY_CHECKOUT_URL ??
  "https://pay.kiwify.com.br/seu-checkout";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const PANDA_SUBDOMAIN =
  process.env.NEXT_PUBLIC_PANDA_PLAYER_SUBDOMAIN ?? "player-vz-demo";
