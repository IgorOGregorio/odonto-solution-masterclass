import type { Metadata } from "next";

import { siteConfig } from "@/content/site";
import { GoogleTag } from "@/components/tracking/google-tag";
import { MetaPixel } from "@/components/tracking/meta-pixel";

import { fontDisplay, fontSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://odonto-solution.vercel.app",
  ),
  title: `${siteConfig.name} | ${siteConfig.subtitle} em Itajubá-MG`,
  description: siteConfig.description,
  keywords: [
    "dentista",
    "Itajubá",
    "odontologia",
    "implantes",
    "botox",
    "clareamento",
    "pediatria",
    siteConfig.name,
  ],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: "pt_BR",
    type: "website",
    images: [{ url: siteConfig.logo, width: 512, height: 512 }],
  },
  icons: {
    icon: siteConfig.logo,
    apple: siteConfig.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fontSans.variable} ${fontDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <MetaPixel />
        <GoogleTag />
      </body>
    </html>
  );
}
