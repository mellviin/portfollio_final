import Link from "next/link";
import { HeroCopy } from "@/components/hero/HeroCopy";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-24 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <section className="flex min-h-[78vh] flex-col justify-center gap-12 pt-8">
        <HeroCopy
          headline="Melvin V."
          subline="Software Developer building full-stack, AI-powered, and distributed systems — from resume-parsing NLP pipelines to a search engine built from scratch."
        />

        <div className="flex flex-wrap items-center gap-8">
          <Link
            href="#projects"
            className="button-text rounded-full border border-white/30 bg-white/5 px-6 py-3 text-white backdrop-blur-xl transition-all duration-200 hover:bg-white/10 hover:border-white/50"
          >
            View projects
          </Link>
          <Link
            href="/resume"
            className="group inline-flex items-center gap-2 nav-text text-white/82 underline decoration-white/20 decoration-1 underline-offset-4 transition-all duration-200 hover:text-white hover:decoration-white/60"
          >
            <span>Résumé</span>
            <span className="block h-px w-0 bg-white transition-all duration-200 group-hover:w-4" />
          </Link>
        </div>
      </section>

      <section id="projects" className="flex flex-col gap-8 border-t border-white/10 pt-16">
        <div className="flex items-center justify-between gap-6">
          <h2 className="heading-2">Selected work</h2>
          <p className="caption">Real shipped work, not tutorials.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10">
            <h3 className="heading-4">SpideR</h3>
            <p className="body-sm mt-4">
              A distributed semantic search engine with crawling, indexing, PageRank-inspired ranking, and modern retrieval workflows.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10">
            <h3 className="heading-4">hireScope</h3>
            <p className="body-sm mt-4">
              Systems for document understanding, intelligent search experiences, and polished interfaces shaped around user trust and clarity.
            </p>
          </article>
        </div>
      </section>

      <section id="contact" className="rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.22)]">
        <h2 className="heading-2">Let&apos;s build something meaningful</h2>
        <p className="body-sm mt-6 max-w-2xl">
          I&apos;m exploring roles where I can contribute to ambitious products and grow quickly with strong teams.
        </p>
        <Link href="/contact" className="button-text mt-8 inline-flex rounded-full border border-white/30 bg-white/5 px-6 py-3 text-white transition-all duration-200 hover:bg-white/10 hover:border-white/50">
          Open contact form
        </Link>
      </section>
    </main>
  );
}
