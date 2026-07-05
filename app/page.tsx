import Link from "next/link";
import { HeroCopy } from "@/components/hero/HeroCopy";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-24 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <section className="flex min-h-[78vh] flex-col justify-center gap-10 pt-8">
        <HeroCopy
          headline="Melvin V."
          subline="Software Developer building full-stack, AI-powered, and distributed systems — from resume-parsing NLP pipelines to a search engine built from scratch."
        />

        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="#projects"
            className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--color-accent-strong)]"
          >
            View projects
          </Link>
          <Link
            href="/resume"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] underline decoration-[var(--color-border)] decoration-1 underline-offset-4 transition-all duration-200 hover:decoration-[var(--color-accent)]"
          >
            <span>Résumé</span>
            <span className="block h-px w-0 bg-[var(--color-accent)] transition-all duration-200 group-hover:w-4" />
          </Link>
        </div>
      </section>

      <section id="projects" className="flex flex-col gap-6 border-t border-[var(--color-border)] pt-12">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Selected work</h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            {/* TODO: Add real project summaries and impact metrics. */}
            Real shipped work, not tutorials.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
            <h3 className="text-xl font-semibold">Project One</h3>
            <p className="mt-3 text-[var(--color-text-muted)]">
              {/* TODO: Describe the first shipped project, stack, and measurable outcome. */}
              Add a concise summary of your product, the problem it solved, and your role.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
            <h3 className="text-xl font-semibold">Project Two</h3>
            <p className="mt-3 text-[var(--color-text-muted)]">
              {/* TODO: Describe the second shipped project, stack, and measurable outcome. */}
              Add a concise summary of your product, the problem it solved, and your role.
            </p>
          </article>
        </div>
      </section>

      <section id="contact" className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8">
        <h2 className="text-2xl font-semibold">Let&apos;s build something meaningful</h2>
        <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
          {/* TODO: Replace with your real contact details and preferred intro. */}
          I&apos;m exploring roles where I can contribute to ambitious products and grow quickly with strong teams.
        </p>
        <Link href="/contact" className="mt-6 inline-flex rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--color-accent-strong)]">
          Open contact form
        </Link>
      </section>
    </main>
  );
}
