import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-xs text-center md:text-left">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              O método completo para desenvolver escudos esportivos profissionais no
              CorelDRAW, do zero ao avançado.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 font-mono text-xs uppercase tracking-wide text-muted-foreground md:items-end">
            <Link href="/login" className="transition-colors hover:text-foreground">
              Área do aluno
            </Link>
            <a href="#faq" className="transition-colors hover:text-foreground">
              Perguntas frequentes
            </a>
            <a
              href="mailto:designer@eduhux.com.br"
              className="transition-colors hover:text-foreground"
            >
              Suporte
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} Método Escudo PRO. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-foreground">
              Termos de uso
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
