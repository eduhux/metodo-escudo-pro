import Link from "next/link";
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
      aria-label="Método Escudo PRO"
      className="inline-flex items-center transition-opacity hover:opacity-80"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt="Método Escudo PRO"
        className={cn("h-10 w-auto select-none", className)}
        draggable={false}
      />
    </Link>
  );
}
