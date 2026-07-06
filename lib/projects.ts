import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type ProjectEntry = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  stack: string[];
  links: {
    demo?: string;
    github?: string;
  };
  screenshots?: Array<{ src: string; alt?: string }>;
  source: string;
};

export async function getAllProjectEntries(): Promise<ProjectEntry[]> {
  const fileNames = fs.readdirSync(projectsDirectory).filter((fileName) => fileName.endsWith(".mdx"));

  const entries = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const slug = toSlug(fileName.replace(/\.mdx$/, ""));

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        tags: (data.tags as string[]) ?? [],
        summary: data.summary as string,
        stack: (data.stack as string[]) ?? [],
        links: (data.links as ProjectEntry["links"]) ?? {},
        screenshots: (data.screenshots as Array<{ src: string; alt?: string }> | undefined) ?? undefined,
        source: content,
      };
    }),
  );

  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProjectEntryBySlug(slug: string): Promise<ProjectEntry | null> {
  const entries = await getAllProjectEntries();
  return entries.find((entry) => entry.slug === slug) ?? null;
}
