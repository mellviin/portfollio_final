import fs from "fs";
import path from "path";
import matter from "gray-matter";

const logDirectory = path.join(process.cwd(), "content/log");

export type LogEntry = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  source: string;
};

export async function getAllLogEntries(): Promise<LogEntry[]> {
  const fileNames = fs.readdirSync(logDirectory).filter((fileName) => fileName.endsWith(".mdx"));

  const entries = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(logDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const slug = fileName.replace(/\.mdx$/, "");

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        tags: (data.tags as string[]) ?? [],
        summary: data.summary as string,
        source: content,
      };
    }),
  );

  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getLogEntryBySlug(slug: string): Promise<LogEntry | null> {
  const entries = await getAllLogEntries();
  return entries.find((entry) => entry.slug === slug) ?? null;
}

export async function getAllLogTags(): Promise<string[]> {
  const entries = await getAllLogEntries();
  const tags = entries.flatMap((entry) => entry.tags);
  return Array.from(new Set(tags)).sort();
}

export async function getLogEntriesForProject(projectSlug: string): Promise<LogEntry[]> {
  const entries = await getAllLogEntries();
  return entries.filter((entry) => entry.tags.includes(projectSlug));
}
