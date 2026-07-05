import { getAllProjectEntries } from "@/lib/projects";
import { ProjectEntryCard } from "@/components/project/ProjectEntryCard";

export const dynamic = "force-static";

export default async function ProjectsPage() {
  const projects = await getAllProjectEntries();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Projects</p>
        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-5xl">
          A short list of systems I built and shipped.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
          Each entry is structured to be skimmed quickly: what it does, what changed, and how the work held up under real constraints.
        </p>
      </section>

      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectEntryCard
            key={project.slug}
            title={project.title}
            summary={project.summary}
            stack={project.stack}
            slug={project.slug}
            links={project.links}
          />
        ))}
      </div>
    </main>
  );
}
