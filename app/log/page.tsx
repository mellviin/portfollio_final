import { getAllLogEntries, getAllLogTags } from "@/lib/log";
import { LogFeed } from "@/components/build-log/LogFeed";

export const dynamic = "force-static";

export default async function LogPage() {
  const entries = await getAllLogEntries();
  const tags = await getAllLogTags();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <section className="flex flex-col gap-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Build Log</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-5xl">
            A feed of hard-earned engineering decisions.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
            These are the moments that usually never make it into release notes: the failed deploys, the weird runtime edge cases, the fixes that only made sense after a long night.
          </p>
        </div>
      </section>

      <LogFeed initialEntries={entries} initialTags={tags} />
    </main>
  );
}
