import { SITE_URL } from "@/lib/config";

/**
 * Envio do e-mail de definição de senha após a compra.
 *
 * O fluxo recomendado com Firebase é gerar um link de redefinição de senha
 * (generatePasswordResetLink) pelo Admin SDK e enviá-lo por um provider de
 * e-mail transacional (ex.: Resend). O link aponta para /definir-senha.
 *
 * Se RESEND_API_KEY não estiver configurada, apenas registramos no log
 * (útil em desenvolvimento).
 */
export async function sendSetPasswordEmail(params: {
  to: string;
  nome: string;
  resetLink: string;
}) {
  const { to, nome, resetLink } = params;

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.EMAIL_FROM ??
    "Método Escudo PRO <no-reply@seudominio.com.br>";

  const html = buildEmailHtml(nome, resetLink);

  if (!apiKey) {
    console.log(
      `[email] (dev) E-mail de definição de senha para ${to}\nLink: ${resetLink}`
    );
    return { ok: true, dev: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: "Seu acesso ao Método Escudo PRO está liberado 🎉",
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Falha ao enviar e-mail: ${res.status} ${text}`);
  }

  return { ok: true };
}

function buildEmailHtml(nome: string, resetLink: string) {
  return `
  <div style="background:#0a0a0b;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#111113;border:1px solid #26262b;border-radius:16px;padding:40px;">
      <h1 style="color:#fff;font-size:22px;margin:0 0 8px;">Bem-vindo, ${nome}! 🛡️</h1>
      <p style="color:#a1a1aa;font-size:15px;line-height:1.6;">
        Seu pagamento foi aprovado e seu acesso ao <strong style="color:#fff;">Método Escudo PRO</strong> está liberado.
      </p>
      <p style="color:#a1a1aa;font-size:15px;line-height:1.6;">
        Para começar, defina sua senha clicando no botão abaixo:
      </p>
      <a href="${resetLink}" style="display:inline-block;margin:20px 0;background:#f59e0b;color:#1a1205;text-decoration:none;font-weight:600;padding:14px 28px;border-radius:10px;font-size:15px;">
        Criar minha senha
      </a>
      <p style="color:#71717a;font-size:13px;line-height:1.6;">
        Se o botão não funcionar, copie e cole este link no navegador:<br/>
        <span style="color:#f59e0b;word-break:break-all;">${resetLink}</span>
      </p>
      <hr style="border:none;border-top:1px solid #26262b;margin:28px 0;" />
      <p style="color:#52525b;font-size:12px;">
        Você recebeu este e-mail porque adquiriu o Método Escudo PRO. Dúvidas? Responda este e-mail.
      </p>
    </div>
  </div>`;
}

export { SITE_URL };
