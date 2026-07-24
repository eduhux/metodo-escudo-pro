import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";
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
  openGraph: {
    title: "Método Escudo PRO",
    description:
      "Crie escudos esportivos profissionais no CorelDRAW, do zero ao avançado.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <AuthProvider>{children}</AuthProvider>
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
