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
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
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
        className={`sticky top-0 z-50 border-b border-transparent bg-[var(--color-bg)]/90 backdrop-blur-sm transition-all duration-300 ease-out ${
          showNav || reduceMotion || pathname !== "/" ? "border-[var(--color-border)] opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-text)]">
            MEL
          </Link>
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)]">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors duration-200 hover:text-[var(--color-accent)]"
              >
                {item.label}
              </Link>
            ))}
            <CommandPalette />
          </nav>
        </div>
      </header>

      <div id="top">{children}</div>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-4 border-t border-[var(--color-border)] px-6 py-8 text-sm text-[var(--color-text-muted)] sm:px-8 lg:px-10">
        <p>© 2026 Mel. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors duration-200 hover:text-[var(--color-accent)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
