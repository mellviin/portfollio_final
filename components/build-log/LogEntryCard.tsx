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
    <div className="space-y-5">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="heading-4">{title}</h3>
        <time className="caption">{date}</time>
      </div>
      <p className="body-sm">{summary}</p>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.12em] text-white/75 bg-white/5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
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
              <Link href={`/log/${slug}`} className="inline-flex text-sm font-semibold text-white/85 transition-colors duration-200 hover:text-white">
                Open standalone entry →
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
