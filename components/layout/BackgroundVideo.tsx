"use client";

import { useEffect, useState } from "react";

export function BackgroundVideo() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  if (reduceMotion) {
    return (
      <>
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_42%),linear-gradient(180deg,_rgba(0,0,0,0.82)_0%,_rgba(0,0,0,0.92)_100%)]" aria-hidden="true" />
        <div className="pointer-events-none fixed inset-0 z-10 bg-black/55" aria-hidden="true" />
      </>
    );
  }

  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/background_grain.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none fixed inset-0 z-10 bg-black/55" aria-hidden="true" />
    </>
  );
}
