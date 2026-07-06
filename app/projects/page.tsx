import { getAllProjectEntries } from "@/lib/projects";
import { ProjectEntryCard } from "@/components/project/ProjectEntryCard";

export const dynamic = "force-static";

export default async function ProjectsPage() {
  const projects = await getAllProjectEntries();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
        <p className="label text-white/70">Projects</p>
        <h1 className="heading">A short list of systems I built and shipped.</h1>
        <p className="body-sm max-w-2xl">
          Each entry is structured to be skimmed quickly: what it does, what changed, and how the work held up under real constraints.
        </p>
      </section>

      <div className="flex flex-col gap-8">
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
