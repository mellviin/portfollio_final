import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getProjectSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getProjectSlugCandidates(fileName: string): string[] {
  const baseName = fileName.replace(/\.mdx$/, "");
  const normalizedSlug = getProjectSlug(baseName);

  return [normalizedSlug, baseName].filter((slug, index, values) => slug && values.indexOf(slug) === index);
}

export type ProjectEntry = {
  slug: string;
  legacySlug?: string;
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

export const getAllProjectEntries = cache(async (): Promise<ProjectEntry[]> => {
  const fileNames = fs.readdirSync(projectsDirectory).filter((fileName) => fileName.endsWith(".mdx"));

  const entries = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const [slug, legacySlug] = getProjectSlugCandidates(fileName);

      return {
        slug,
        legacySlug,
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
});

export const getProjectEntryBySlug = cache(async (slug: string): Promise<ProjectEntry | null> => {
  const entries = await getAllProjectEntries();
  return entries.find((entry) => entry.slug === slug || entry.legacySlug === slug) ?? null;
});
