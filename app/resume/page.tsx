import { ResumeViewer } from "@/components/resume/ResumeViewer";

const pdfUrl = "/Melvin V - Resume.pdf";

export default function ResumePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Resume</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-5xl">
            A fast, readable résumé view.
          </h1>
        </div>
        <a
          href={pdfUrl}
          download
          className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--color-accent-strong)]"
        >
          Download résumé
        </a>
      </section>

      <ResumeViewer />
    </main>
  );
}
