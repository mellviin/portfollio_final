import Link from "next/link";

type ProjectEntryCardProps = {
  title: string;
  summary: string;
  stack: string[];
  slug: string;
  links: { demo?: string; github?: string };
};

export function ProjectEntryCard({ title, summary, stack, slug, links }: ProjectEntryCardProps) {
  return (
    <article className="flex flex-col gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 className="text-2xl font-semibold text-[var(--color-text)]">{title}</h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">{summary}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {stack.map((item) => (
          <span key={item} className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            {item}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-4">
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-[var(--color-accent)]">
          {links.demo ? <a href={links.demo}>Live demo</a> : null}
          {links.github ? <a href={links.github}>GitHub</a> : null}
        </div>
        <Link href={`/projects/${slug}`} className="text-sm font-semibold text-[var(--color-accent)]">
          Case study →
        </Link>
      </div>
    </article>
  );
}
