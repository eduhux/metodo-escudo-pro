import crypto from "crypto";

/**
 * Valida a assinatura do webhook da Kiwify.
 * A Kiwify envia o parâmetro `signature` na query string, calculado como
 * HMAC-SHA1 do corpo (raw body) usando o seu token de webhook como chave.
 *
 * Docs: https://docs.kiwify.com.br/  (Webhooks)
 */
export function isValidKiwifySignature(
  rawBody: string,
  signature: string | null,
  token = process.env.KIWIFY_WEBHOOK_TOKEN
): boolean {
  if (!token || !signature) return false;
  const expected = crypto
    .createHmac("sha1", token)
    .update(rawBody)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(signature)
    );
  } catch {
    return false;
  }
}

export interface KiwifyCustomer {
  full_name?: string;
  first_name?: string;
  email?: string;
}

export interface KiwifyWebhookPayload {
  order_id?: string;
  order_status?: string; // "paid" | "approved" | "refunded" | ...
  webhook_event_type?: string;
  Customer?: KiwifyCustomer;
  customer?: KiwifyCustomer;
  [key: string]: unknown;
}

/** Normaliza os dados do cliente independente do formato do payload. */
export function extractCustomer(payload: KiwifyWebhookPayload) {
  const c = payload.Customer ?? payload.customer ?? {};
  const nome =
    c.full_name ?? c.first_name ?? c.email?.split("@")[0] ?? "Aluno";
  const email = c.email?.toLowerCase().trim();
  return { nome, email, orderId: payload.order_id };
}

/** Status que liberam o acesso ao curso. */
export function isPaidStatus(status?: string): boolean {
  if (!status) return false;
  return ["paid", "approved", "aprovado", "pago"].includes(
    status.toLowerCase()
  );
}
