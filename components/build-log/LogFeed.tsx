"use client";

import { useMemo, useState } from "react";
import { LogEntryCard } from "@/components/build-log/LogEntryCard";
import type { LogEntry } from "@/lib/log";

type LogFeedProps = {
  initialEntries: LogEntry[];
  initialTags: string[];
};

export function LogFeed({ initialEntries, initialTags }: LogFeedProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const visibleEntries = useMemo(() => {
    if (!selectedTag) {
      return initialEntries;
    }

    return initialEntries.filter((entry) => entry.tags.includes(selectedTag));
  }, [initialEntries, selectedTag]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedTag(null)}
          aria-pressed={selectedTag === null}
          className={`rounded-full border px-3 py-1.5 text-sm transition-colors duration-200 ${
            selectedTag === null
              ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
              : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          }`}
        >
          All
        </button>
        {initialTags.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              aria-pressed={isActive}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors duration-200 ${
                isActive
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        {visibleEntries.map((entry) => (
          <LogEntryCard
            key={entry.slug}
            slug={entry.slug}
            title={entry.title}
            date={entry.date}
            tags={entry.tags}
            summary={entry.summary}
            source={entry.source}
          />
        ))}
      </div>
    </div>
  );
}
