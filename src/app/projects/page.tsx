import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata = { title: "Projects — Jason Cushen" };

export default function ProjectsPage() {
  return (
    <div className="container-page py-16 sm:py-24">
      <p className="label mb-5">Selected work</p>
      <h1 className="font-display max-w-2xl text-4xl font-semibold tracking-tight text-[var(--chalk)] sm:text-5xl">
        Projects
      </h1>
      <p className="mt-5 max-w-xl leading-relaxed text-[var(--chalk-dim)]">
        A mix of shipped tools, coursework, and ongoing side projects.
        Each one links to a short write-up of what it does and why it&apos;s
        built the way it is.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
