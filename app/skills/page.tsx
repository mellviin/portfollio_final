import { unstable_cache } from "next/cache";

const getGithubStats = unstable_cache(
  async () => {
    const response = await fetch("https://api.github.com/users/octocat", {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      public_repos: number;
      public_gists?: number;
    };

    return {
      publicRepos: data.public_repos,
      publicGists: data.public_gists ?? 0,
    };
  },
  ["github-stats"],
  { revalidate: 3600 },
);

const skillGroups = [
  {
    category: "Languages",
    items: ["Java", "Python", "JavaScript (ES6+)", "TypeScript", "SQL", "HTML5", "CSS3", "C", "C++"],
  },
  {
    category: "Frontend",
    items: ["React", "Redux", "Tailwind CSS", "Bootstrap", "Three.js", "WebGL", "Responsive Web Design"],
  },
  {
    category: "Backend & APIs",
    items: ["FastAPI", "Flask", "Django", "Spring Boot", "Node.js", "Express.js", "REST API Design", "Authentication", "Microservices"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Relational Database Design"],
  },
  {
    category: "AI / Machine Learning",
    items: [
      "Machine Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Hugging Face Transformers",
      "Sentence Transformers",
      "spaCy",
      "KeyBERT",
      "FAISS",
      "NLTK",
      "OpenCV",
      "MediaPipe",
      "Librosa",
    ],
  },
  {
    category: "Cloud, DevOps & Tools",
    items: ["Docker", "Docker Compose", "Kubernetes", "Git", "GitHub", "GitHub Actions", "Postman", "VS Code", "Vercel", "Render", "Neon", "Android Studio"],
  },
  {
    category: "Engineering Practices",
    items: ["Object-Oriented Programming (OOP)", "Data Structures & Algorithms", "Software Architecture", "Distributed Systems", "RESTful Architecture", "Agile / Scrum", "SDLC", "Unit Testing"],
  },
];

export default async function SkillsPage() {
  const stats = await getGithubStats();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Skills</p>
        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-5xl">
          A compact map of the stack I work with.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
          Organized for scanning: the systems, tools, and product contexts I can operate in without needing a long ramp-up.
        </p>
      </section>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 text-sm text-[var(--color-text-muted)]">
        {stats ? (
          <p>
            GitHub: {stats.publicRepos} public repos · {stats.publicGists} public gists
          </p>
        ) : (
          <p>GitHub stats unavailable at the moment.</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group) => (
          <section key={group.category} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
            <h2 className="text-lg font-semibold uppercase tracking-[0.24em] text-[var(--color-text)]">
              {group.category}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-text-muted)]">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
