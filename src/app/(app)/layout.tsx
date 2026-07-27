"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { AppNavbar } from "@/components/app/app-navbar";
import { SupportButton } from "@/components/app/support-button";
import { Button } from "@/components/ui/button";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user.acessoLiberado) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">
            Acesso não liberado
          </h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Sua conta existe, mas o acesso ao curso não está ativo no momento.
            Se você comprou há pouco, aguarde alguns minutos. Se achar que é um
            engano, fale com o suporte.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="outline">
              <a href="mailto:designer@eduhux.com.br">Falar com o suporte</a>
            </Button>
            <Button
              onClick={async () => {
                await logout();
                router.push("/login");
              }}
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AppNavbar />
      {children}
      <SupportButton />
    </div>
  );
}
