const experiences = [
  {
    role: "Software Development Engineer (SDE) Intern",
    company: "BlueStock Fintech",
    dates: "Nov 2025 – Dec 2025 · Bangalore, India",
    impact:
      "Shipped full-stack features across 2+ production fintech apps, cutting page load time by 20% and authoring 20+ unit tests while working in a 4-person Agile team.",
  },
  {
    role: "Java Developer Intern",
    company: "InternzLearnz",
    dates: "May 2024 – Jun 2024 · Bangalore, India",
    impact:
      "Debugged and refactored core Java modules, resolving 15+ performance bottlenecks and reducing system latency by 15%.",
  },
  {
    role: "3D Environment Artist",
    company: "One Move Studios",
    dates: "Jan 2022 – Dec 2022 · Bangalore, India",
    impact:
      "Delivered production-ready 3D environments and modular assets in Blender, Maya, and Unreal Engine for cross-functional animation pipelines.",
  },
];

export default function ExperiencePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
        <p className="label text-white/70">Experience</p>
        <h1 className="heading">A short, readable record of the roles I've held.</h1>
      </section>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl">
        <div className="grid grid-cols-[1.2fr_0.8fr_0.6fr] gap-4 border-b border-white/10 bg-black/20 px-8 py-5 label text-white/70">
          <span>Role</span>
          <span>Company</span>
          <span>Dates</span>
        </div>
        {experiences.map((item) => (
          <div key={`${item.role}-${item.company}`} className="grid grid-cols-[1.2fr_0.8fr_0.6fr] gap-4 border-b border-white/10 px-8 py-6 last:border-b-0">
            <div>
              <p className="heading-4">{item.role}</p>
              <p className="body-sm mt-3">{item.impact}</p>
            </div>
            <p className="body-sm">{item.company}</p>
            <p className="body-sm">{item.dates}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
