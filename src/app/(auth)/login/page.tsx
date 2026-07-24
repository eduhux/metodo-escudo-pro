"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, LogIn } from "lucide-react";
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Bem-vindo de volta!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("E-mail ou senha inválidos. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <Card className="glass-strong">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Entrar na plataforma</CardTitle>
        <CardDescription>
          Acesse o Método Escudo PRO e continue seus estudos.
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
