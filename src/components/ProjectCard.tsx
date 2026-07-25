import Link from "next/link";
import type { Project } from "@/data/projects";
import Tag from "./Tag";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col justify-between rounded-md border border-[var(--line)] bg-[var(--pitch-2)] p-6 transition-all hover:border-[var(--line-strong)] hover:bg-[var(--pitch-3)]"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="label text-[var(--score)]">{project.category}</span>
          <span className="label">{project.year}</span>
        </div>
        <h3 className="font-display mt-4 text-xl font-medium text-[var(--chalk)]">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--chalk-dim)]">
          {project.summary}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
        {project.stack.length > 4 ? (
          <span className="label px-2 py-1">+{project.stack.length - 4}</span>
        ) : null}
      </div>
      <span className="label mt-6 inline-flex items-center gap-1 text-[var(--chalk)] transition-transform group-hover:translate-x-1">
        View case study →
      </span>
    </Link>
  );
}
