import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Divider from "@/components/Divider";
import Tag from "@/components/Tag";

export default function Home() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.slug !== featured.slug);

  return (
    <div>
      {/* HERO */}
      <section className="container-page pt-16 pb-4 sm:pt-24">
        <p className="label mb-5">Software Engineer — University of Limerick</p>
        <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--chalk)] sm:text-6xl">
          Jason Cushen
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--chalk-dim)]">
          I build data-driven tools — most recently a match analysis
          platform for Gaelic football, from video ingestion through to
          automated reporting. Computer Science graduate, currently building
          and looking for a graduate software engineering role.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="/cv.pdf"
            className="rounded-sm bg-[var(--score)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-90"
          >
            Download CV
          </a>
          <Link
            href="/projects"
            className="label rounded-sm border border-[var(--line-strong)] px-5 py-3 text-[var(--chalk)] transition-colors hover:border-[var(--score)] hover:text-[var(--score)]"
          >
            View projects
          </Link>
        </div>
      </section>

      <Divider />

      {/* FEATURED PROJECT */}
      <section className="container-page">
        <div className="mb-6 flex items-center justify-between">
          <span className="label text-[var(--score)]">Featured project</span>
        </div>
        <Link
          href={`/projects/${featured.slug}`}
          className="group grid gap-8 rounded-md border border-[var(--line)] bg-[var(--pitch-2)] p-6 transition-colors hover:border-[var(--line-strong)] sm:grid-cols-5 sm:p-10"
        >
          {/* Stylised pitch map — swap for a real screenshot when ready */}
          <div className="flex aspect-video items-center justify-center rounded-sm border border-[var(--line)] bg-[var(--pitch)] p-4 sm:col-span-2 sm:aspect-auto">
            <svg
              viewBox="0 0 300 180"
              className="h-full w-full"
              role="img"
              aria-label="Stylised Gaelic football pitch map with plotted events"
            >
              {/* pitch boundary + halfway line */}
              <rect x="8" y="8" width="284" height="164" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" rx="2" />
              <line x1="150" y1="8" x2="150" y2="172" stroke="var(--line-strong)" strokeWidth="1" />
              {/* 45m lines */}
              <line x1="75" y1="8" x2="75" y2="172" stroke="var(--line)" strokeWidth="1" />
              <line x1="225" y1="8" x2="225" y2="172" stroke="var(--line)" strokeWidth="1" />
              {/* goal areas */}
              <rect x="8" y="62" width="24" height="56" fill="none" stroke="var(--line)" strokeWidth="1" />
              <rect x="268" y="62" width="24" height="56" fill="none" stroke="var(--line)" strokeWidth="1" />
              {/* the D arcs */}
              <path d="M 46 62 A 30 30 0 0 1 46 118" fill="none" stroke="var(--line)" strokeWidth="1" />
              <path d="M 254 62 A 30 30 0 0 0 254 118" fill="none" stroke="var(--line)" strokeWidth="1" />
              {/* plotted "events" */}
              <circle cx="212" cy="52" r="4" fill="var(--score)" />
              <circle cx="238" cy="96" r="4" fill="var(--score)" />
              <circle cx="186" cy="128" r="4" fill="var(--score)" opacity="0.7" />
              <circle cx="120" cy="74" r="4" fill="var(--score)" opacity="0.45" />
              <circle cx="256" cy="70" r="4" fill="var(--score)" opacity="0.7" />
            </svg>
          </div>
          <div className="flex flex-col justify-center sm:col-span-3">
            <span className="label mb-3">{featured.category} · {featured.year}</span>
            <h2 className="font-display text-2xl font-medium text-[var(--chalk)] sm:text-3xl">
              {featured.name}
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--chalk-dim)]">
              {featured.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {featured.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <span className="label mt-6 inline-flex items-center gap-1 text-[var(--chalk)] transition-transform group-hover:translate-x-1">
              Read the case study →
            </span>
          </div>
        </Link>
      </section>

      <Divider label="Other work" />

      {/* PROJECT GRID */}
      <section className="container-page pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
