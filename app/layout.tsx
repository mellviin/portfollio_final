import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { BackgroundVideo } from "@/components/layout/BackgroundVideo";
import { SiteShell } from "@/components/layout/SiteShell";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Space Grotesk for headings (premium alternative to Cabinet Grotesk)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cabinet",
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${monoFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white">
        <BackgroundVideo />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
