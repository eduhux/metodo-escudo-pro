import Link from "next/link";
import { ArrowRight, LogIn, Mail, KeyRound, PlayCircle } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Acesso liberado — Método Escudo PRO",
  robots: { index: false, follow: false },
};

const passos = [
  {
    icon: KeyRound,
    titulo: "Crie sua senha",
    texto:
      'Clique no botão abaixo e informe o MESMO e-mail que você usou na compra.',
  },
  {
    icon: Mail,
    titulo: "Confira seu e-mail",
    texto:
      "Você vai receber um e-mail para definir sua senha. Se não aparecer em alguns minutos, olhe na caixa de spam.",
  },
  {
    icon: LogIn,
    titulo: "Entre e comece",
    texto:
      "Volte ao site, faça login com seu e-mail e a senha criada, e comece a assistir às aulas.",
  },
];

export default function AcessoPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[440px] glow-primary" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="mb-8 flex justify-center">
          <Logo className="h-14" />
        </div>

        <div className="glass-strong rounded-2xl border border-border p-8 text-center md:p-10">
          <Badge className="mx-auto">
            <PlayCircle className="h-3.5 w-3.5" />
            Compra confirmada
          </Badge>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-gradient md:text-3xl">
            Seu acesso está liberado! 🎉
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Bem-vindo ao Método Escudo PRO. Falta só um passo rápido: criar sua
            senha para entrar no curso.
          </p>

          <div className="mt-8 space-y-4 text-left">
            {passos.map((p, i) => (
              <div key={p.titulo} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">
                    {i + 1}. {p.titulo}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {p.texto}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button asChild size="lg" className="mt-8 w-full">
            <Link href="/recuperar-senha">
              Criar minha senha de acesso
              <ArrowRight />
            </Link>
          </Button>

          <p className="mt-5 text-sm text-muted-foreground">
            Já criou sua senha?{" "}
            <Link
              href="/login"
              className="font-medium text-primary transition-colors hover:underline"
            >
              Entrar no curso
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Precisa de ajuda? Fale com o suporte pelo e-mail informado na sua
          confirmação de compra.
        </p>
      </div>
    </div>
  );
}
