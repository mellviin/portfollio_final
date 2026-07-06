import { ResumeViewer } from "@/components/resume/ResumeViewer";

const pdfUrl = "/Melvin V - Resume.pdf";

export default function ResumePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <section className="flex flex-wrap items-end justify-between gap-8 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
        <div className="space-y-4">
          <p className="label text-white/70">Resume</p>
          <h1 className="heading">A fast, readable résumé view.</h1>
        </div>
        <a
          href={pdfUrl}
          download
          className="button-text rounded-full border border-white/30 bg-white/5 px-6 py-3 text-white transition-all duration-200 hover:bg-white/10 hover:border-white/50"
        >
          Download résumé
        </a>
      </section>

      <ResumeViewer />
    </main>
  );
}
