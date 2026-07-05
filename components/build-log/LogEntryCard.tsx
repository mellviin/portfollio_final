"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LogBody } from "@/components/build-log/LogBody";

type LogEntryCardProps = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  source: string;
  initialExpanded?: boolean;
};

export function LogEntryCard({ slug, title, date, tags, summary, source, initialExpanded = false }: LogEntryCardProps) {
  const [expanded, setExpanded] = useState(initialExpanded);

  const preview = (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-xl font-semibold text-[var(--color-text)]">{title}</h3>
        <time className="text-sm text-[var(--color-text-muted)]">{date}</time>
      </div>
      <p className="text-sm leading-7 text-[var(--color-text-muted)]">{summary}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 shadow-[0_1px_0_rgba(255,255,255,0.02)]">
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        className="w-full text-left"
        aria-expanded={expanded}
        aria-controls={`log-panel-${slug}`}
      >
        {preview}
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            id={`log-panel-${slug}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 space-y-4 border-t border-[var(--color-border)] pt-6">
              <LogBody source={source} />
              <Link href={`/log/${slug}`} className="inline-flex text-sm font-semibold text-[var(--color-accent)]">
                Open standalone entry →
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
