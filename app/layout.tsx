import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { studio } from "@/data/studio";

import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL || studio.siteUrl),
  title: {
    default: studio.seo.defaultTitle,
    template: `%s | ${studio.name}`,
  },
  description: studio.seo.description,
  applicationName: `${studio.name} — démonstration fictive`,
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: `${studio.name} — démonstration portfolio`,
    title: studio.seo.socialTitle,
    description: studio.seo.socialDescription,
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1730,
        height: 907,
        alt: `${studio.name} — concept fictif de studio de grooming`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: studio.seo.socialTitle,
    description: studio.seo.socialDescription,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${plexMono.variable}`} data-scroll-behavior="smooth">
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
