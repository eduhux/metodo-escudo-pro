import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const nav = [
  { label: "Benefícios", href: "#beneficios" },
  { label: "Conteúdo", href: "#conteudo" },
  { label: "Bônus", href: "#bonus" },
  { label: "Preço", href: "#oferta" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-14">
      <div className="glow-primary pointer-events-none absolute inset-x-0 bottom-0 top-auto h-40 rotate-180" />
      <div className="container relative">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              O método completo para desenvolver escudos esportivos
              profissionais no CorelDRAW — do primeiro traço ao projeto que o
              cliente paga bem para ter.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <p className="eyebrow text-[0.65rem] text-muted-foreground">
                Navegar
              </p>
              <ul className="mt-4 space-y-2.5">
                {nav.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-[0.65rem] text-muted-foreground">
                Suporte
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href="/login"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Área do aluno
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:designer@eduhux.com.br"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Falar com o suporte
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} Método Escudo PRO. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-5">
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
