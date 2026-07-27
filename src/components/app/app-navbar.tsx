"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Logo } from "@/components/shared/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatName } from "@/lib/utils";

export function AppNavbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const initials = (user?.nome ?? "A")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border glass">
      <div className="container flex h-16 items-center justify-between">
        <Logo href="/dashboard" />

        <nav className="flex items-center gap-1">
          <Link
            href="/dashboard"
            className="group relative hidden items-center gap-2 rounded-lg px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <LayoutDashboard className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-primary" />
            Dashboard
            <span className="pointer-events-none absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent transition-all hover:ring-primary/30">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="flex flex-col">
                <span>{formatName(user?.nome)}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {user?.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                <LayoutDashboard /> Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/perfil")}>
                <User /> Meu perfil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
