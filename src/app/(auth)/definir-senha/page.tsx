"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, KeyRound } from "lucide-react";
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

/**
 * Página acessada pelo link do e-mail enviado após a compra na Kiwify.
 * Em produção, o link contém o oobCode do Firebase para confirmar a redefinição
 * de senha (confirmPasswordReset). No modo mock, apenas simulamos o fluxo.
 */
function DefinirSenhaForm() {
  const router = useRouter();
  const params = useSearchParams();
  const oobCode = params.get("oobCode");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      toast.error("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      if (MOCK_MODE) {
        await new Promise((r) => setTimeout(r, 700));
      } else {
        const { auth } = await import("@/lib/firebase/client");
        const { confirmPasswordReset } = await import("firebase/auth");
        if (!auth || !oobCode)
          throw new Error("Link inválido ou expirado.");
        await confirmPasswordReset(auth, oobCode, password);
      }
      toast.success("Senha definida com sucesso! Faça login para começar.");
      router.push("/login");
    } catch {
      toast.error("Não foi possível definir a senha. O link pode ter expirado.");
      setLoading(false);
    }
  }

  return (
    <Card className="glass-strong">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Crie sua senha</CardTitle>
        <CardDescription>
          Seu acesso foi liberado! Defina uma senha para entrar na plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Nova senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Mínimo de 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirmar senha</Label>
            <Input
              id="confirm"
              type="password"
              placeholder="Repita a senha"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <KeyRound /> Definir senha e continuar
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function DefinirSenhaPage() {
  return (
    <Suspense fallback={<div className="text-center text-muted-foreground">Carregando…</div>}>
      <DefinirSenhaForm />
    </Suspense>
  );
}
