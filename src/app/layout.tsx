import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "CapyFlow Academy - Domine o Código",
  description: "Plataforma gamificada para acelerar seu aprendizado em desenvolvimento de software. Pratique digitando código real de projetos open-source.",
  manifest: "/manifest.json",
  openGraph: {
    title: "CapyFlow Academy",
    description: "Acelere seu aprendizado de código com gamificação.",
    url: "https://vihisantos.github.io/CapyFlow-Academy/",
    siteName: "CapyFlow Academy",
    images: [
      {
        url: "https://vihisantos.github.io/CapyFlow-Academy/logo.jpg",
        width: 512,
        height: 512,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};




import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/hooks/useAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

