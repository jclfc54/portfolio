import { projects } from "@/data/projects";
import ProjectFilter from "@/components/ProjectFilter";

export const metadata = {
  title: "Projects",
  description:
    "Software projects by Jason Cushen — web apps, distributed systems and tooling, each with a short write-up of what it does and how it is built.",
};

export default function ProjectsPage() {
  return (
    <div className="container-page py-16 sm:py-24">
      <p className="label">Selected work</p>
      <h1 className="font-display balance mt-5 max-w-2xl text-4xl font-bold leading-[1.05] text-ink sm:text-6xl">
        Projects
      </h1>
      <p className="pretty mt-5 max-w-xl text-lg leading-relaxed text-ink-3">
        A mix of shipped tools, coursework and ongoing side projects. Each one
        links to a short write-up of what it does and why it is built the way
        it is.
      </p>

      <div className="mt-14">
        <ProjectFilter projects={projects} />
      </div>
    </div>
  );
}
