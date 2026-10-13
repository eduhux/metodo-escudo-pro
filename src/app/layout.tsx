import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";
import { PwaRegister } from "@/components/shared/pwa-register";
import "./globals.css";

// Sistema tipográfico — "Ateliê Atlético":
// Corpo + display: Archivo (grotesca moderna, pesos altos nos títulos).
// Assinatura editorial: Instrument Serif itálica (palavras de destaque).
const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Método Escudo PRO | Desenvolva escudos esportivos profissionais no CorelDRAW",
  description:
    "O método completo para dominar o CorelDRAW e desenvolver escudos esportivos profissionais do zero ao avançado. Aprenda a técnica, monte seu portfólio e conquiste clientes.",
  applicationName: "Método Escudo PRO",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon-192.png",
    apple: "/apple-icon.png",
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
  themeColor: "#0a0b12",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${serif.variable} font-sans`}
      >
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
