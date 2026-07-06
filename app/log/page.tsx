import { getAllLogEntries, getAllLogTags } from "@/lib/log";
import { LogFeed } from "@/components/build-log/LogFeed";

export const dynamic = "force-static";

export default async function LogPage() {
  const entries = await getAllLogEntries();
  const tags = await getAllLogTags();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <section className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
        <div className="space-y-6">
          <p className="label text-white/70">Build Log</p>
          <h1 className="heading">A feed of hard-earned engineering decisions.</h1>
          <p className="body-sm max-w-2xl">
            These are the moments that usually never make it into release notes: the failed deploys, the weird runtime edge cases, the fixes that only made sense after a long night.
          </p>
        </div>
      </section>

      <LogFeed initialEntries={entries} initialTags={tags} />
    </main>
  );
}
