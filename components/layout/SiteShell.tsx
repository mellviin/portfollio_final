"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CommandPalette = dynamic(
  () => import("@/components/command-palette/CommandPalette").then((mod) => mod.CommandPalette),
  { ssr: false, loading: () => null },
);

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Log", href: "/log" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/mellviin" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mellviin-v/" },
  { label: "Email", href: "mailto:melvinvenk707@gmail.com" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(pathname !== "/");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    const handleScroll = () => {
      if (pathname !== "/") {
        setShowNav(true);
        setHasScrolled(true);
        return;
      }

      const shouldShow = window.scrollY > 24 || hasScrolled;
      setShowNav(shouldShow);
      setHasScrolled((prev) => prev || window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-transparent backdrop-blur-xl transition-all duration-300 ease-out ${
          showNav || reduceMotion || pathname !== "/"
            ? "border-[var(--color-border)] bg-black/40 opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="label text-white">
            MEL
          </Link>
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-4 nav-text text-white/75">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-full px-4 py-2 transition-all duration-200 ${
                    active ? "bg-white/10 text-white" : "hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <CommandPalette />
          </nav>
        </div>
      </header>

      <div id="top" className="relative z-20">{children}</div>

      <footer className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-6 border-t border-white/10 px-6 py-12 caption text-white/70 sm:px-8 lg:px-10">
        <p>© 2026 Mel. All rights reserved.</p>
        <div className="flex flex-wrap gap-6">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors duration-200 hover:text-white/90">
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
