"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, User, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { MOCK_MODE } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      toast.success("Bem-vindo de volta!");
      router.push("/dashboard");
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      if (code === "auth/too-many-requests") {
        setError(
          "Muitas tentativas de login. Por segurança, aguarde alguns minutos e tente novamente (ou use \"Esqueceu a senha?\")."
        );
      } else if (code === "auth/network-request-failed") {
        setError("Falha de conexão. Verifique sua internet e tente novamente.");
      } else {
        setError(
          'E-mail ou senha inválidos. Se você acabou de comprar o curso, clique em "Esqueceu a senha?" para criar seu acesso.'
        );
      }
      setLoading(false);
    }
  }

  return (
    <div className="glass-strong rounded-2xl border border-white/15 p-8 shadow-2xl shadow-black/40">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Bem-vindo de volta</h1>
        <p className="mt-2 text-sm text-white/60">
          Entre para continuar desenvolvendo seus escudos.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-white/80">
            E-mail
          </Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              id="email"
              type="email"
              placeholder="voce@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="border-white/15 bg-white/5 pl-9 text-white placeholder:text-white/30 focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-white/80">
              Senha
            </Label>
            <Link
              href="/recuperar-senha"
              className="text-xs text-white/60 transition-colors hover:text-primary"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="border-white/15 bg-white/5 pl-9 text-white placeholder:text-white/30 focus-visible:ring-primary"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="cta-energy group w-full rounded-full font-semibold"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Entrar
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        {MOCK_MODE && (
          <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-center text-xs text-white/60">
            Modo demonstração ativo — use qualquer e-mail e senha para entrar.
          </p>
        )}
      </form>
    </div>
  );
}
