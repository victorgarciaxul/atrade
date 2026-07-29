import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterBanner from "@/components/NewsletterBanner";
import FloatingWidgets from "@/components/FloatingWidgets";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

// next/font/local sirve el fichero a través del pipeline de assets de Next.js,
// que respeta basePath/assetPrefix automáticamente (a diferencia de un
// @font-face con url("/fonts/...") hardcodeado en CSS).
const ttFirsNeue = localFont({
  src: "../public/fonts/TTFirsNeue-DemiBold.otf",
  variable: "--font-ttfirs",
  weight: "600",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andalucía TRADE — Revista Digital",
  description: "La revista digital de Andalucía TRADE, agencia de la Junta de Andalucía.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${jakarta.variable} ${inter.variable} ${ttFirsNeue.variable}`}>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <NewsletterBanner />
        <Footer />
        <FloatingWidgets />
      </body>
      <GoogleAnalytics gaId="G-FEFNYNTTFF" />
    </html>
  );
}
