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
    <article className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h2 className="heading-4">{title}</h2>
        </div>
        <p className="body-sm max-w-2xl">{summary}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {stack.map((item) => (
          <span key={item} className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.12em] text-white/75 bg-white/5">
            {item}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[var(--color-border)] pt-6">
        <div className="flex flex-wrap gap-6 button-text text-white/90">
          {links.demo ? <a href={links.demo} className="hover:text-white transition-colors">Live demo</a> : null}
          {links.github ? <a href={links.github} className="hover:text-white transition-colors">GitHub</a> : null}
        </div>
        <Link href={`/projects/${slug}`} className="button-text text-white/90 transition-colors duration-200 hover:text-white">
          Case study →
        </Link>
      </div>
    </article>
  );
}
