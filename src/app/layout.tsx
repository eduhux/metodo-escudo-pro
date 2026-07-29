import type { Metadata, Viewport } from "next";
import { Manrope, Archivo } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";
import { PwaRegister } from "@/components/shared/pwa-register";
import "./globals.css";

// Corpo: Manrope (limpo e legível). Títulos: Archivo (display atlético).
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Método Escudo PRO | Desenvolva escudos esportivos profissionais no CorelDRAW",
  description:
    "O método completo para dominar o CorelDRAW e desenvolver escudos esportivos profissionais do zero ao avançado. Aprenda a técnica, monte seu portfólio e conquiste clientes.",
  applicationName: "Método Escudo PRO",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    title: "Escudo PRO",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Método Escudo PRO",
    description:
      "Desenvolva escudos esportivos profissionais no CorelDRAW, do zero ao avançado.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a12",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} font-sans`}>
        <AuthProvider>{children}</AuthProvider>
        <PwaRegister />
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: "hsl(240 6% 8%)",
              border: "1px solid hsl(240 5% 16%)",
              color: "hsl(0 0% 98%)",
            },
          }}
        />
      </body>
    </html>
  );
}
