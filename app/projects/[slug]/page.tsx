import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectEntryBySlug } from "@/lib/projects";
import { getLogEntriesForProject } from "@/lib/log";
import { LogBody } from "@/components/build-log/LogBody";

export async function generateStaticParams() {
  const projects = await import("@/lib/projects").then((mod) => mod.getAllProjectEntries());
  const entries = await projects;
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectEntryBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedEntries = await getLogEntriesForProject(slug);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <Link href="/projects" className="text-sm font-semibold text-[var(--color-accent)]">
        ← Back to projects
      </Link>

      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Case study</p>
        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-5xl">
          {project.title}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[var(--color-text-muted)]">{project.summary}</p>
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Embedded demo</p>
        <div className="mt-4 min-h-72 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-8 text-sm text-[var(--color-text-muted)]">
          {/* TODO: Replace with screenshot or embedded demo embed. */}
          Placeholder for a real demo or screenshot.
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Relevant build-log excerpts</h2>
        {relatedEntries.length > 0 ? (
          relatedEntries.map((entry) => (
            <div key={entry.slug} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
              <p className="text-sm font-semibold text-[var(--color-text)]">{entry.title}</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">{entry.summary}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">No related build-log entries yet.</p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Tech stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Links</h2>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-[var(--color-accent)]">
          {project.links.demo ? <a href={project.links.demo}>Live demo</a> : null}
          {project.links.github ? <a href={project.links.github}>GitHub</a> : null}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
        <LogBody source={project.source} />
      </section>
    </main>
  );
}
