import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/header";
import { TopBar } from "@/components/top-bar";
import { TopBarProvider } from "@/components/top-bar-context";
import { BackToTop } from "@/components/back-to-top";
import { StructuredData } from "@/components/structured-data";
import { MetaPixelPageView } from "@/components/analytics/MetaPixelPageView";
import { CartProvider } from "@/components/cart/cart-provider";

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
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Odalis",
    default: "Odalis - Centar za negu lica i tela u Beogradu",
  },
  description: "Odalis je centar za negu lica i tela u Beogradu sa fokusom na neinvazivne, savremene tretmane i individualan pristup svakoj klijentici. Zakažite besplatne konsultacije.",
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
        {/* Meta Pixel Base Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1267872981888267');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1267872981888267&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        <StructuredData />
        <div className="fixed inset-0 bg-[var(--bg-base)] -z-10" />
        <CartProvider>
          <TopBarProvider>
            <TopBar />
            <Header />
          </TopBarProvider>
          {children}
          <BackToTop />
          <Suspense fallback={null}>
            <MetaPixelPageView />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
