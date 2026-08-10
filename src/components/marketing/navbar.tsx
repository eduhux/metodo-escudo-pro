"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { usePromo } from "@/hooks/use-promo";
import { checkoutUrl } from "@/lib/promo";
import { cn } from "@/lib/utils";

const links = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#conteudo", label: "Conteúdo" },
  { href: "#bonus", label: "Bônus" },
  { href: "#oferta", label: "Preço" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { ativa: promoAtiva } = usePromo();

  const checkout = checkoutUrl(promoAtiva);
  const ctaLabel = promoAtiva ? "Garantir por R$47" : "Comprar Agora";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: destaca no menu a seção que está no centro da tela.
  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      style={{ top: "var(--promo-h, 0px)" }}
      className={cn(
        "fixed inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container">
        <div
          className={cn(
            "flex items-center justify-between border px-4 py-2.5 transition-all duration-300",
            scrolled
              ? "border-border bg-background/90 backdrop-blur-md"
              : "border-transparent bg-transparent"
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[hsl(var(--energy))]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="font-mono text-xs uppercase tracking-wider"
            >
              <Link href="/login">Portal do Aluno</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-none font-mono text-xs uppercase tracking-wider"
            >
              <a href={checkout} target="_blank" rel="noopener noreferrer">
                {ctaLabel}
              </a>
            </Button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 overflow-hidden border border-border bg-background/95 p-4 backdrop-blur-md md:hidden"
            >
              <nav className="flex flex-col gap-1">
                {links.map((l) => {
                  const isActive = active === l.href.slice(1);
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "px-3 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-accent hover:text-foreground",
                        isActive ? "text-energy" : "text-muted-foreground"
                      )}
                    >
                      {l.label}
                    </Link>
                  );
                })}
                <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
                  <Button asChild variant="outline">
                    <Link href="/login">Portal do Aluno</Link>
                  </Button>
                  <Button asChild>
                    <a href={checkout} target="_blank" rel="noopener noreferrer">
                      {ctaLabel}
                    </a>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
