"use client";

import { useEffect, useState } from "react";

const pdfUrl = "/Melvin_V_Resume.pdf";

export function ResumeViewer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 text-sm text-[var(--color-text-muted)]">
        Loading résumé preview…
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4">
      <iframe src={pdfUrl} title="Résumé preview" className="min-h-[720px] w-full rounded-xl border-0" />
    </div>
  );
}
