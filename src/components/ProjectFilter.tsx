"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

/*
  Category filter for the projects index — the portfolio-grid pattern
  calls for "filter by category" so a visitor looking for one kind of
  work (systems, web, desktop) can get to it without reading everything.

  Accessibility notes:
    - Real <button>s in a group, each with aria-pressed, so the state is
      announced rather than implied by colour.
    - The result count lives in an aria-live region, so filtering
      announces "3 projects" instead of changing silently.
    - Filtering is client-side over an already-loaded list: no spinner,
      no layout shift, and the page still renders every project if JS
      never runs (the default filter is "All").
*/
export default function ProjectFilter({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const p of projects) if (!seen.includes(p.category)) seen.push(p.category);
    return ["All", ...seen];
  }, [projects]);

  const [active, setActive] = useState("All");

  const shown = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [projects, active]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink pt-4">
        <div role="group" aria-label="Filter projects by category" className="no-print flex flex-wrap gap-2">
          {categories.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={isActive}
                className={`label flex h-9 cursor-pointer items-center rounded-[3px] border px-3 transition-colors duration-200 ${
                  isActive
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-surface text-ink-3 hover:border-line-3 hover:text-ink"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="label">
          {shown.length} {shown.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {shown.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
