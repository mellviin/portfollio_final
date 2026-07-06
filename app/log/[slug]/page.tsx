import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllLogEntries, getLogEntryBySlug } from "@/lib/log";
import { LogEntryCard } from "@/components/build-log/LogEntryCard";

export async function generateStaticParams() {
  const entries = await getAllLogEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function LogEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getLogEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-12 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <Link href="/log" className="button-text text-white/90 hover:text-white">
        ← Back to build log
      </Link>

      <LogEntryCard
        slug={entry.slug}
        title={entry.title}
        date={entry.date}
        tags={entry.tags}
        summary={entry.summary}
        source={entry.source}
        initialExpanded
      />
    </main>
  );
}
