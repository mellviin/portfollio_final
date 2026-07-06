import { unstable_cache } from "next/cache";

const getGithubStats = unstable_cache(
  async () => {
    const response = await fetch("https://api.github.com/users/mellviin", {
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
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
        <p className="label text-white/70">Skills</p>
        <h1 className="heading">A compact map of the stack I work with.</h1>
        <p className="body-sm max-w-2xl">
          Organized for scanning: the systems, tools, and product contexts I can operate in without needing a long ramp-up.
        </p>
      </section>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
        {stats ? (
          <p className="caption">
            GitHub: <span className="text-white">{stats.publicRepos}</span> public repos · <span className="text-white">{stats.publicGists}</span> public gists
          </p>
        ) : (
          <p className="caption">GitHub stats unavailable at the moment.</p>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {skillGroups.map((group) => (
          <section key={group.category} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <h2 className="label text-white">{group.category}</h2>
            <ul className="mt-6 space-y-4 text-body-sm">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="h-2 w-2 rounded-full bg-white/80 flex-shrink-0" />
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
