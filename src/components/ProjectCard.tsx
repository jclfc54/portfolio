import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import ProjectPlate from "@/components/ProjectPlate";
import { ArrowRight } from "@/components/Icon";

/*
  The unit of the portfolio grid. One card = one project: a visual
  (real screenshot if the project has one, otherwise its generated
  plate), then category/year metadata, title, summary, and stack.

  The whole card is a single link — one target, one tab stop, no
  nested interactive elements for a keyboard user to wade through.
*/
export default function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const shot = project.images?.[0];
  const live = project.status === "Live" || project.status === "In progress";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col border border-line bg-surface transition-colors duration-200 hover:border-line-3 focus-visible:border-line-3"
    >
      <div className="overflow-hidden border-b border-line">
        {shot ? (
          <Image
            src={shot.src}
            alt={shot.alt}
            width={1600}
            height={1067}
            priority={priority}
            className="aspect-[3/2] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <ProjectPlate project={project} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="label">{project.category}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-line-2" />
          <span className="label">{project.year}</span>
          <span className="ml-auto flex items-center gap-1.5">
            {live ? (
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            ) : null}
            <span className="label">{project.status}</span>
          </span>
        </div>

        <h3 className="font-display balance mt-3 text-xl font-semibold leading-tight text-ink transition-colors duration-200 group-hover:text-accent sm:text-2xl">
          {project.name}
        </h3>

        <p className="pretty mt-2 text-[0.9375rem] leading-relaxed text-ink-3">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="whitespace-nowrap rounded-[3px] bg-surface-2 px-2 py-1 font-mono text-[0.6875rem] leading-none text-ink-2"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 4 ? (
            <span className="whitespace-nowrap px-1 py-1 font-mono text-[0.6875rem] leading-none text-ink-3">
              +{project.stack.length - 4}
            </span>
          ) : null}
        </div>

        <span className="label label-accent mt-5 flex items-center gap-1.5 pt-4 border-t border-line">
          Read case study
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
