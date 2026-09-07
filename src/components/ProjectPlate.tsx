import type { Project } from "@/data/projects";

/*
  PROJECT PLATES
  ------------------------------------------------------------------
  The skill's portfolio-grid pattern says "visuals first" — but no
  project has screenshots yet (every `images` array is empty). Rather
  than ship grey placeholder boxes, each card draws a generated mark:

    - gaa-match-analysis gets a bespoke pitch map, because a pitch is
      literally what the project analyses.
    - everything else gets a modular grid composition derived from its
      slug, so each project has a stable, distinct mark that is drawn
      from the same geometric system (hairline grid, a few filled
      cells, one accent).

  These are deliberately abstract: they give the grid rhythm and colour
  without pretending to be product screenshots. The moment a real image
  is added to a project's `images` array, ProjectCard shows that
  instead and the plate disappears. Nothing here needs deleting later.
*/

// Deterministic hash -> PRNG, so a slug always yields the same mark.
function seeded(slug: string) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function PitchMap() {
  // Tagged shot events, plotted — the project's actual output.
  const events = [
    { cx: 206, cy: 58, r: 5, accent: true },
    { cx: 232, cy: 104, r: 5, accent: true },
    { cx: 180, cy: 132, r: 4, accent: false },
    { cx: 118, cy: 78, r: 4, accent: false },
    { cx: 250, cy: 76, r: 4, accent: true },
    { cx: 152, cy: 46, r: 3.5, accent: false },
  ];
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full" aria-hidden focusable="false">
      <rect x="14" y="14" width="272" height="172" fill="none" stroke="var(--line-2)" strokeWidth="1.25" />
      <line x1="150" y1="14" x2="150" y2="186" stroke="var(--line-2)" strokeWidth="1.25" />
      <line x1="82" y1="14" x2="82" y2="186" stroke="var(--line)" strokeWidth="1" />
      <line x1="218" y1="14" x2="218" y2="186" stroke="var(--line)" strokeWidth="1" />
      <rect x="14" y="72" width="26" height="56" fill="none" stroke="var(--line)" strokeWidth="1" />
      <rect x="260" y="72" width="26" height="56" fill="none" stroke="var(--line)" strokeWidth="1" />
      <path d="M 54 72 A 30 30 0 0 1 54 128" fill="none" stroke="var(--line)" strokeWidth="1" />
      <path d="M 246 72 A 30 30 0 0 0 246 128" fill="none" stroke="var(--line)" strokeWidth="1" />
      <circle cx="150" cy="100" r="3" fill="none" stroke="var(--line-2)" strokeWidth="1" />
      {events.map((e) => (
        <circle
          key={`${e.cx}-${e.cy}`}
          cx={e.cx}
          cy={e.cy}
          r={e.r}
          fill={e.accent ? "var(--accent)" : "none"}
          stroke={e.accent ? "none" : "var(--ink-3)"}
          strokeWidth="1.25"
        />
      ))}
    </svg>
  );
}

function ModularMark({ slug }: { slug: string }) {
  const rand = seeded(slug);
  const cols = 6;
  const rows = 4;
  const w = 300 / cols;
  const h = 200 / rows;

  // Pick a handful of cells to fill; one of them carries the accent.
  const cells: { x: number; y: number; kind: number; accent: boolean }[] = [];
  const accentAt = Math.floor(rand() * 5);
  let picked = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (picked >= 5) break;
      if (rand() > 0.78) {
        cells.push({
          x: c * w,
          y: r * h,
          kind: Math.floor(rand() * 4),
          accent: picked === accentAt,
        });
        picked++;
      }
    }
  }
  // Guarantee at least two marks even for unlucky seeds.
  while (cells.length < 2) {
    const c = Math.floor(rand() * cols);
    const r = Math.floor(rand() * rows);
    cells.push({ x: c * w, y: r * h, kind: cells.length, accent: false });
  }
  // ...and guarantee exactly one of them carries the accent, since the
  // draw above can pick fewer cells than the index it chose for it.
  if (!cells.some((c) => c.accent)) {
    cells[Math.min(accentAt, cells.length - 1)].accent = true;
  }

  return (
    <svg viewBox="0 0 300 200" className="h-full w-full" aria-hidden focusable="false">
      {/* hairline modular grid */}
      {Array.from({ length: cols - 1 }, (_, i) => (
        <line key={`v${i}`} x1={(i + 1) * w} y1="0" x2={(i + 1) * w} y2="200" stroke="var(--line)" strokeWidth="1" />
      ))}
      {Array.from({ length: rows - 1 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={(i + 1) * h} x2="300" y2={(i + 1) * h} stroke="var(--line)" strokeWidth="1" />
      ))}
      {cells.map((cell, i) => {
        const stroke = cell.accent ? "var(--accent)" : "var(--ink-3)";
        const fill = cell.accent ? "var(--accent)" : "var(--ink-3)";
        const pad = 9;
        if (cell.kind === 0) {
          return <rect key={i} x={cell.x + pad} y={cell.y + pad} width={w - pad * 2} height={h - pad * 2} fill={fill} />;
        }
        if (cell.kind === 1) {
          return (
            <circle key={i} cx={cell.x + w / 2} cy={cell.y + h / 2} r={Math.min(w, h) / 2 - pad} fill="none" stroke={stroke} strokeWidth="1.75" />
          );
        }
        if (cell.kind === 2) {
          return (
            <path
              key={i}
              d={`M ${cell.x + pad} ${cell.y + h - pad} A ${w - pad * 2} ${h - pad * 2} 0 0 1 ${cell.x + w - pad} ${cell.y + pad}`}
              fill="none"
              stroke={stroke}
              strokeWidth="1.75"
            />
          );
        }
        return (
          <line key={i} x1={cell.x + pad} y1={cell.y + h - pad} x2={cell.x + w - pad} y2={cell.y + pad} stroke={stroke} strokeWidth="1.75" />
        );
      })}
    </svg>
  );
}

export default function ProjectPlate({ project }: { project: Project }) {
  return (
    <div className="aspect-[3/2] w-full bg-surface p-4 sm:p-6">
      {project.slug === "gaa-match-analysis" ? (
        <PitchMap />
      ) : (
        <ModularMark slug={project.slug} />
      )}
    </div>
  );
}
