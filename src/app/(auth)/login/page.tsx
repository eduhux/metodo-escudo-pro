"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { MOCK_MODE } from "@/lib/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card className="glass-strong">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Entrar na plataforma</CardTitle>
        <CardDescription>
          Entre para continuar desenvolvendo seus escudos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="voce@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link
                href="/recuperar-senha"
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <LogIn /> Entrar
              </>
            )}
          </Button>

          {MOCK_MODE && (
            <p className="rounded-lg border border-border bg-secondary/40 p-3 text-center text-xs text-muted-foreground">
              Modo demonstração ativo — use qualquer e-mail e senha para entrar.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
