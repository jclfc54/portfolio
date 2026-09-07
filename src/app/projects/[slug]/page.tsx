import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProject, projects } from "@/data/projects";
import Tag from "@/components/Tag";
import SectionHead from "@/components/SectionHead";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import ProjectPlate from "@/components/ProjectPlate";
import Reveal from "@/components/Reveal";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/Icon";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  return project
    ? { title: project.name, description: project.summary }
    : { title: "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = getProject(slug);
  if (!project) return notFound();

  // Sequential navigation so a reader can move through the work without
  // going back to the index between every project.
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  const hasImages = Boolean(project.images && project.images.length > 0);
  const lead = project.images?.[0];

  const sections = [
    { title: "Problem", body: project.problem },
    { title: "Approach", body: project.approach },
  ].filter((s) => Boolean(s.body));

  const tailSections = [
    { title: "Challenges", body: project.challenges },
    { title: "What's next", body: project.nextSteps },
  ].filter((s) => Boolean(s.body));

  return (
    <div>
      <div className="container-page pt-12 sm:pt-16">
        <Link
          href="/projects"
          className="no-print group label inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          All projects
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="label label-accent">{project.category}</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-line-2" />
              <span className="label">{project.year}</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-line-2" />
              <span className="label">{project.status}</span>
            </div>

            <h1 className="font-display balance mt-5 max-w-3xl text-3xl font-bold leading-[1.05] text-ink sm:text-5xl">
              {project.name}
            </h1>

            <p className="pretty mt-6 max-w-2xl text-lg leading-relaxed text-ink-3">
              {project.summary}
            </p>

            {project.links && project.links.length > 0 ? (
              <div className="mt-7 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 items-center gap-2 rounded-[3px] border border-line-3 px-5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-surface"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Lead visual: a real screenshot if there is one, else the plate. */}
          <div className="self-center overflow-hidden border border-line bg-surface">
            {lead ? (
              <Image
                src={lead.src}
                alt={lead.alt}
                width={1600}
                height={1067}
                priority
                className="aspect-[3/2] w-full object-cover"
              />
            ) : (
              <ProjectPlate project={project} />
            )}
          </div>
        </div>
      </div>

      {/* ---------------- WRITE-UP ---------------- */}
      <div className="container-page mt-20 grid gap-12 sm:mt-28 lg:grid-cols-[16rem_1fr] lg:gap-20">
        {/* Side rail — quick facts, sticky on wide screens. */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border-t border-ink pt-4">
            <dl className="space-y-5">
              <div>
                <dt className="label">Role</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">
                  {project.role}
                </dd>
              </div>
              <div>
                <dt className="label">Status</dt>
                <dd className="mt-1.5 text-sm text-ink-2">{project.status}</dd>
              </div>
              <div>
                <dt className="label">Year</dt>
                <dd className="mt-1.5 text-sm text-ink-2">{project.year}</dd>
              </div>
              <div>
                <dt className="label">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </aside>

        {/* Main write-up — edit content in src/data/projects.ts */}
        <div className="max-w-2xl space-y-14">
          {sections.map((s) => (
            <Reveal key={s.title}>
              <section>
                <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {s.title}
                </h2>
                <p className="pretty mt-4 leading-relaxed text-ink-3">
                  {s.body}
                </p>
              </section>
            </Reveal>
          ))}

          {project.decisions && project.decisions.length > 0 ? (
            <Reveal>
              <section>
                <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  Key decisions
                </h2>
                <ol className="mt-6 space-y-6">
                  {project.decisions.map((d, i) => (
                    <li
                      key={d.title}
                      className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-line pt-5"
                    >
                      <span
                        aria-hidden
                        className="font-mono text-xs text-accent"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-medium text-ink">{d.title}</p>
                        <p className="pretty mt-1.5 leading-relaxed text-ink-3">
                          {d.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
          ) : null}

          {tailSections.map((s) => (
            <Reveal key={s.title}>
              <section>
                <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {s.title}
                </h2>
                <p className="pretty mt-4 leading-relaxed text-ink-3">
                  {s.body}
                </p>
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---------------- SCREENSHOTS ---------------- */}
      {hasImages ? (
        <div className="container-page mt-24 sm:mt-32">
          <SectionHead label="In pictures" meta={`${project.images!.length} figures`} />
          <div className="mt-8">
            <ScreenshotGallery images={project.images!} />
          </div>
        </div>
      ) : null}

      {/* ---------------- PREV / NEXT ---------------- */}
      <nav
        aria-label="More projects"
        className="no-print container-page mt-24 grid gap-4 border-t border-ink pt-8 sm:mt-32 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex flex-col gap-2 border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-3"
          >
            <span className="label flex items-center gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              Previous
            </span>
            <span className="font-display text-lg font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
              {prev.name}
            </span>
          </Link>
        ) : (
          <span aria-hidden />
        )}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col items-end gap-2 border border-line bg-surface p-6 text-right transition-colors duration-200 hover:border-line-3 sm:col-start-2"
          >
            <span className="label flex items-center gap-1.5">
              Next
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
            <span className="font-display text-lg font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
              {next.name}
            </span>
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
