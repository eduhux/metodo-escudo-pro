import { NextRequest, NextResponse } from "next/server";
import {
  isValidKiwifySignature,
  extractCustomer,
  isPaidStatus,
  type KiwifyWebhookPayload,
} from "@/lib/kiwify";
import { sendSetPasswordEmail } from "@/lib/email";
import { SITE_URL } from "@/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Webhook da Kiwify — chamado quando um pagamento é aprovado.
 *
 * Fluxo:
 *  1. Valida a assinatura (HMAC-SHA1) usando KIWIFY_WEBHOOK_TOKEN.
 *  2. Confere se o status é de pagamento aprovado.
 *  3. Cria o usuário no Firebase (ou reaproveita se já existir) e libera o acesso.
 *  4. Gera um link de definição de senha e envia por e-mail.
 *
 * Configure a URL na Kiwify como:
 *   https://SEU-DOMINIO/api/webhooks/kiwify
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.nextUrl.searchParams.get("signature");

  // 1) Validação de assinatura
  if (!isValidKiwifySignature(rawBody, signature)) {
    return NextResponse.json(
      { error: "Assinatura inválida" },
      { status: 401 }
    );
  }

  let payload: KiwifyWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  // 2) Só provisiona em pagamentos aprovados
  const status = payload.order_status ?? payload.webhook_event_type;

  // [DIAGNÓSTICO TEMPORÁRIO] registra a estrutura recebida da Kiwify.
  console.log(
    "[kiwify webhook] recebido:",
    JSON.stringify({
      keys: Object.keys(payload),
      order_status: payload.order_status,
      webhook_event_type: payload.webhook_event_type,
      statusUsado: status,
      isPaid: isPaidStatus(status),
      customer: extractCustomer(payload),
    })
  );

  if (!isPaidStatus(status)) {
    return NextResponse.json(
      { ignored: true, reason: `Status não aprovado: ${status}` },
      { status: 200 }
    );
  }

  const { nome, email, orderId } = extractCustomer(payload);
  if (!email) {
    return NextResponse.json(
      { error: "E-mail do cliente ausente no payload" },
      { status: 400 }
    );
  }

  try {
    const { adminAuth, adminDb } = await import("@/lib/firebase/admin");
    const auth = adminAuth();
    const db = adminDb();

    // 3) Cria ou recupera o usuário
    let uid: string;
    try {
      const existing = await auth.getUserByEmail(email);
      uid = existing.uid;
    } catch {
      const created = await auth.createUser({
        email,
        displayName: nome,
        emailVerified: false,
      });
      uid = created.uid;
    }

    // Libera acesso no Firestore
    await db
      .collection("users")
      .doc(uid)
      .set(
        {
          nome,
          email,
          acessoLiberado: true,
          kiwifyOrderId: orderId ?? null,
          criadoEm: new Date().toISOString(),
        },
        { merge: true }
      );

    // 4) Gera link de definição de senha e envia o e-mail
    const resetLink = await auth.generatePasswordResetLink(email, {
      url: `${SITE_URL}/login`,
    });

    await sendSetPasswordEmail({ to: email, nome, resetLink });

    return NextResponse.json({ ok: true, uid }, { status: 200 });
  } catch (err) {
    console.error("[kiwify webhook] erro ao provisionar:", err);
    return NextResponse.json(
      { error: "Erro interno ao liberar acesso" },
      { status: 500 }
    );
  }
}

// Healthcheck simples
export async function GET() {
  return NextResponse.json({ status: "kiwify webhook online" });
}
