import Link from "next/link";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("group flex items-center gap-2.5", className)}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25 transition-transform group-hover:scale-105">
        <Shield className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        Método Escudo <span className="text-primary">PRO</span>
      </span>
    </Link>
  );
}
