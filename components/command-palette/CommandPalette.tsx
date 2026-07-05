"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type PaletteItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: "page" | "project" | "log";
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<PaletteItem[]>([]);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }

      if (event.key === "Tab" && open) {
        const dialog = document.querySelector("[data-command-palette-root]") as HTMLElement | null;
        if (!dialog) {
          return;
        }

        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const fetchItems = async () => {
      const response = await fetch("/api/command-palette");
      const data = (await response.json()) as { items: PaletteItem[] };
      setItems(data.items);
    };

    void fetchItems();
  }, [open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const filteredItems = useMemo(() => {
    const safeQuery = query.trim().toLowerCase();

    if (!safeQuery) {
      return items.slice(0, 10);
    }

    const fuzzyMatch = (value: string, search: string) => {
      let index = -1;
      for (const char of search) {
        index = value.indexOf(char, index + 1);
        if (index === -1) {
          return false;
        }
      }
      return true;
    };

    return items
      .filter((item) => {
        const haystack = `${item.title} ${item.subtitle} ${item.category}`.toLowerCase();
        return fuzzyMatch(haystack, safeQuery);
      })
      .slice(0, 12);
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
    setHoveredIndex(null);
  }, [query, open]);

  useEffect(() => {
    if (!filteredItems.length) {
      setSelectedIndex(0);
      return;
    }

    if (selectedIndex >= filteredItems.length) {
      setSelectedIndex(filteredItems.length - 1);
    }
  }, [filteredItems, selectedIndex]);

  const navigateTo = (href: string) => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
    setHoveredIndex(null);
    router.push(href);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredItems.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHoveredIndex(null);
      setSelectedIndex((current) => (current + 1) % filteredItems.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHoveredIndex(null);
      setSelectedIndex((current) => (current - 1 + filteredItems.length) % filteredItems.length);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selectedItem = filteredItems[selectedIndex];
      if (selectedItem) {
        navigateTo(selectedItem.href);
      }
    }
  };

  const handleItemClick = (item: PaletteItem, index: number) => {
    setHoveredIndex(index);
    setSelectedIndex(index);
    navigateTo(item.href);
  };

  const activeItemId = filteredItems[selectedIndex]
    ? `command-palette-option-${filteredItems[selectedIndex].id}`
    : undefined;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2 text-sm text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-accent)]"
        aria-label="Open command palette"
      >
        <span className="font-medium text-[var(--color-text)]">⌘K</span>
        <span className="hidden sm:inline">Search</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-[color:rgba(0,0,0,0.35)] px-4 py-16 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              data-command-palette-root
              initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.15 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[0_20px_80px_rgba(0,0,0,0.18)]"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
                  <span className="text-sm text-[var(--color-text-muted)]">⌕</span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={handleKeyDown}
                    role="combobox"
                    aria-controls="command-palette-listbox"
                    aria-expanded={open}
                    aria-autocomplete="list"
                    aria-activedescendant={activeItemId}
                    placeholder="Jump to projects, log entries, or pages"
                    className="w-full border-0 bg-transparent text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
                  />
                </div>

                <div id="command-palette-listbox" role="listbox" className="max-h-[340px] overflow-y-auto px-2 py-2">
                  {!filteredItems.length ? (
                    <div className="px-4 py-6 text-sm text-[var(--color-text-muted)]">No matches yet.</div>
                  ) : null}

                  {filteredItems.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    const isHovered = hoveredIndex === index;
                    const itemId = `command-palette-option-${item.id}`;

                    return (
                      <div
                        key={item.id}
                        id={itemId}
                        role="option"
                        aria-selected={isSelected}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => handleItemClick(item, index)}
                        className={`flex cursor-pointer items-start justify-between rounded-xl px-3 py-3 text-left transition-colors duration-150 ${
                          isSelected ? "bg-[var(--color-bg-elevated)]" : isHovered ? "bg-[var(--color-bg-elevated)]/80" : ""
                        }`}
                      >
                        <span className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-[var(--color-text)]">{item.title}</span>
                          <span className="text-sm text-[var(--color-text-muted)]">{item.subtitle}</span>
                        </span>
                        <span className="rounded-full border border-[var(--color-border)] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                          {item.category}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
