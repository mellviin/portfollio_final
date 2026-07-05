"use client";

import { useEffect, useState } from "react";

type HeroCopyProps = {
  headline: string;
  subline: string;
};

export function HeroCopy({ headline, subline }: HeroCopyProps) {
  const [showHeadline, setShowHeadline] = useState(false);
  const [showSubline, setShowSubline] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    if (mediaQuery.matches) {
      setShowHeadline(true);
      setShowSubline(true);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    const headlineTimer = window.setTimeout(() => setShowHeadline(true), 20);
    const sublineTimer = window.setTimeout(() => setShowSubline(true), 420);

    return () => {
      window.clearTimeout(headlineTimer);
      window.clearTimeout(sublineTimer);
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1
        className={`max-w-[10ch] text-5xl font-semibold leading-[0.82] tracking-[-0.05em] text-[var(--color-text)] transition-opacity duration-400 ease-out motion-reduce:transition-none motion-reduce:duration-0 sm:text-7xl lg:text-[7rem] xl:text-[8.25rem] ${
          showHeadline || reduceMotion ? "opacity-100" : "opacity-0"
        }`}
      >
        {headline}
      </h1>

      <p
        className={`max-w-2xl text-lg leading-8 text-[var(--color-text-muted)] transition-opacity duration-400 ease-out motion-reduce:transition-none motion-reduce:duration-0 sm:text-xl ${
          showSubline || reduceMotion ? "opacity-100" : "opacity-0"
        }`}
      >
        {subline}
      </p>
    </div>
  );
}
