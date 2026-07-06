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
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setSelectedTag(null)}
          aria-pressed={selectedTag === null}
          className={`rounded-full border px-4 py-2 label transition-colors duration-200 ${
            selectedTag === null
              ? "border-white/40 bg-white/10 text-white"
              : "border-white/20 text-white/70 hover:border-white/35 hover:bg-white/10 hover:text-white/85"
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
              className={`rounded-full border px-4 py-2 label transition-colors duration-200 ${
                isActive
                  ? "border-white/40 bg-white/10 text-white"
                  : "border-white/20 text-white/70 hover:border-white/35 hover:bg-white/10 hover:text-white/85"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-6">
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
