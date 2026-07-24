"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, LogOut, KeyRound, Mail, User as UserIcon } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";

export default function PerfilPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (next.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (next !== confirm) {
      toast.error("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      if (MOCK_MODE) {
        await new Promise((r) => setTimeout(r, 700));
      } else {
        const { auth } = await import("@/lib/firebase/client");
        const {
          updatePassword,
          reauthenticateWithCredential,
          EmailAuthProvider,
        } = await import("firebase/auth");
        if (!auth?.currentUser) throw new Error("Sessão expirada.");
        const cred = EmailAuthProvider.credential(
          auth.currentUser.email!,
          current
        );
        await reauthenticateWithCredential(auth.currentUser, cred);
        await updatePassword(auth.currentUser, next);
      }
      toast.success("Senha alterada com sucesso!");
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch {
      toast.error("Não foi possível alterar a senha. Verifique a senha atual.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <div className="container max-w-2xl py-10 md:py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Meu perfil</h1>
      <p className="mt-1 text-muted-foreground">
        Gerencie suas informações e o acesso à plataforma.
      </p>

      <div className="mt-8 space-y-5">
        {/* Dados */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações da conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <div className="flex items-center gap-3 rounded-md border border-border bg-secondary/40 px-3.5 py-2.5 text-sm">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                {user?.nome}
              </div>
            </div>
            <div className="space-y-2">
              <Label>E-mail</Label>
              <div className="flex items-center gap-3 rounded-md border border-border bg-secondary/40 px-3.5 py-2.5 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {user?.email}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alterar senha */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alterar senha</CardTitle>
            <CardDescription>
              Escolha uma senha forte com pelo menos 6 caracteres.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              {!MOCK_MODE && (
                <div className="space-y-2">
                  <Label htmlFor="current">Senha atual</Label>
                  <Input
                    id="current"
                    type="password"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="next">Nova senha</Label>
                <Input
                  id="next"
                  type="password"
                  value={next}
                  onChange={(e) => setNext(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirmar nova senha</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <KeyRound /> Salvar nova senha
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Separator />

        <Button variant="outline" onClick={handleLogout} className="w-full">
          <LogOut /> Sair da conta
        </Button>
      </div>
    </div>
  );
}
