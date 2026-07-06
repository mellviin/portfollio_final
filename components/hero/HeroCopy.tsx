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
    <div className="flex flex-col gap-8">
      <h1
        className={`max-w-[10ch] display transition-opacity duration-400 ease-out motion-reduce:transition-none motion-reduce:duration-0 ${
          showHeadline || reduceMotion ? "opacity-100" : "opacity-0"
        }`}
      >
        {headline}
      </h1>

      <p
        className={`max-w-2xl tagline transition-opacity duration-400 ease-out motion-reduce:transition-none motion-reduce:duration-0 ${
          showSubline || reduceMotion ? "opacity-100" : "opacity-0"
        }`}
      >
        {subline}
      </p>
    </div>
  );
}
