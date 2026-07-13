import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { getProjectSlug } from "@/lib/projects";

type PaletteItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: "page" | "project" | "log";
};

const pages: PaletteItem[] = [
  { id: "page-projects", title: "Projects", subtitle: "Browse the case studies", href: "/projects", category: "page" },
  { id: "page-log", title: "Log", subtitle: "Read the build diary", href: "/log", category: "page" },
  { id: "page-skills", title: "Skills", subtitle: "See the toolchain and strengths", href: "/skills", category: "page" },
  { id: "page-experience", title: "Experience", subtitle: "Review the career timeline", href: "/experience", category: "page" },
  { id: "page-resume", title: "Resume", subtitle: "Open the résumé view", href: "/resume", category: "page" },
  { id: "page-contact", title: "Contact", subtitle: "Jump to the contact section", href: "/#contact", category: "page" },
];

export async function GET() {
  const projectDirectory = path.join(process.cwd(), "content/projects");
  const logDirectory = path.join(process.cwd(), "content/log");

  const projectFiles = fs.readdirSync(projectDirectory).filter((fileName) => fileName.endsWith(".mdx"));
  const logFiles = fs.readdirSync(logDirectory).filter((fileName) => fileName.endsWith(".mdx"));

  const projects = projectFiles.map((fileName) => {
    const fullPath = path.join(projectDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const slug = getProjectSlug(fileName.replace(/\.mdx$/, ""));

    return {
      id: `project-${slug}`,
      title: data.title as string,
      subtitle: data.summary as string,
      href: `/projects/${slug}`,
      category: "project" as const,
    };
  });

  const logs = logFiles.map((fileName) => {
    const fullPath = path.join(logDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const slug = fileName.replace(/\.mdx$/, "");

    return {
      id: `log-${slug}`,
      title: data.title as string,
      subtitle: data.summary as string,
      href: `/log/${slug}`,
      category: "log" as const,
    };
  });

  return NextResponse.json({ items: [...pages, ...projects, ...logs] });
}
