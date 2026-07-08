import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { BackgroundVideo } from "@/components/layout/BackgroundVideo";
import { SiteShell } from "@/components/layout/SiteShell";

const displayFont = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
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
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white">
        <BackgroundVideo />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
