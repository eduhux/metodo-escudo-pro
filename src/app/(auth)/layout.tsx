import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { SmokeyBackground } from "@/components/ui/smokey-background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="portal relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#05060a] px-6 py-12">
      {/* Fundo animado (WebGL) + escurecimento para legibilidade */}
      <SmokeyBackground color="#527AFF" backdropBlurAmount="sm" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo className="h-14" />
        </div>
        {children}
        <p className="mt-8 text-center text-sm text-white/60">
          <Link href="/" className="transition-colors hover:text-white">
            ← Voltar para o site
          </Link>
        </p>
      </div>
    </div>
  );
}
