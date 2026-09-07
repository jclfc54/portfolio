import { toolbox, type Tool } from "@/data/profile";
import { projects } from "@/data/projects";

/*
  The tech list, grouped, with a count of how many projects on this site
  actually use each tool.

  The point is that the numbers are derived from `projects[].stack`
  rather than asserted. Nothing here claims a skill level — it says
  "this appears in N pieces of work you can go and read", which is a
  claim a reader can immediately verify and an interviewer can probe.
  It also means the section cannot drift: adding a project updates it.
*/

// Exact, case-insensitive match. Deliberately not a substring test —
// "C" would otherwise match "Chart.js" and every count would be wrong.
function countProjects(tool: Tool) {
  const names = [tool.name, ...(tool.match ?? [])].map((n) => n.toLowerCase());
  return projects.filter((p) =>
    p.stack.some((entry) => names.includes(entry.toLowerCase()))
  ).length;
}

export default function Toolbox() {
  return (
    <div>
      <p className="pretty max-w-xl text-sm leading-relaxed text-ink-3">
        Numbers show how many projects on this site use each tool — everything
        listed is something I have actually built with, not a logo wall.
      </p>

      <div className="mt-8">
        {toolbox.map((group) => (
          <div
            key={group.name}
            className="grid gap-x-12 gap-y-3 border-b border-line py-6 first:pt-0 sm:grid-cols-[14rem_1fr]"
          >
            <p className="label">{group.name}</p>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((tool) => {
                const used = countProjects(tool);
                return (
                  <li key={tool.name}>
                    <span className="flex items-center gap-2 rounded-[3px] border border-line bg-surface py-1.5 pl-2.5 pr-2 text-sm text-ink-2">
                      {tool.name}
                      {used > 0 ? (
                        <>
                          <span
                            aria-hidden
                            className="flex h-4 min-w-4 items-center justify-center rounded-[2px] bg-surface-2 px-1 font-mono text-[0.625rem] leading-none text-ink-3"
                          >
                            {used}
                          </span>
                          <span className="sr-only">
                            — used in {used}{" "}
                            {used === 1 ? "project" : "projects"}
                          </span>
                        </>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
