import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";

const displayFont = localFont({
  src: [
    { path: "../public/fonts/segoeui.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/segoeuib.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = localFont({
  src: [{ path: "../public/fonts/segoeui.ttf", weight: "400", style: "normal" }],
  variable: "--font-body",
  display: "swap",
});

const monoFont = localFont({
  src: [
    { path: "../public/fonts/consola.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/consolab.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mel Portfolio",
  description: "A polished portfolio site for a software engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
