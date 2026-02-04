import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { TopBar } from "@/components/top-bar";
import { TopBarProvider } from "@/components/top-bar-context";
import { BackToTop } from "@/components/back-to-top";
import { StructuredData } from "@/components/structured-data";

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Odalis",
    default: "Odalis - Centar za podmlađivanje lica i tela u Beogradu",
  },
  description: "Odalis je centar za podmlađivanje lica i tela u Beogradu sa fokusom na neinvazivne, savremene tretmane i individualan pristup svakoj klijentici. Zakažite besplatne konsultacije.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className={`${headingFont.variable} ${bodyFont.variable} relative overflow-x-hidden w-full`}>
        <StructuredData />
        <div className="fixed inset-0 bg-[var(--bg-base)] -z-10" />
        <TopBarProvider>
          <TopBar />
          <Header />
        </TopBarProvider>
        {children}
        <BackToTop />
        {/* Calendly Script - Load globally once */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

