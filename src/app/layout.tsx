import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";
import { PwaRegister } from "@/components/shared/pwa-register";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Método Escudo PRO — Crie escudos esportivos profissionais no CorelDRAW",
  description:
    "O método completo para dominar o CorelDRAW e criar escudos esportivos profissionais do zero ao avançado. Aprenda a técnica, monte seu portfólio e conquiste clientes.",
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
      "Crie escudos esportivos profissionais no CorelDRAW, do zero ao avançado.",
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
      <body className={`${inter.variable} font-sans`}>
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
