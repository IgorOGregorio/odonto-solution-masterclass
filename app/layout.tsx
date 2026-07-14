import type { Metadata } from "next";
import { fontSans, fontSerif } from "./fonts";
import "./globals.css";

import { GoogleTag } from "@/components/tracking/google-tag";
import { MetaPixel } from "@/components/tracking/meta-pixel";

export const metadata: Metadata = {
  title: "Odonto Solution",
  description: "Odonto Solution — Clínica Odontológica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fontSerif.variable} ${fontSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <MetaPixel />
        <GoogleTag />
      </body>
    </html>
  );
}
