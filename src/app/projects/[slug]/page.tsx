import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProject, projects } from "@/data/projects";
import Divider from "@/components/Divider";
import Tag from "@/components/Tag";

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
    ? { title: `${project.name} — Jason Cushen`, description: project.summary }
    : { title: "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) return notFound();

  return (
    <div>
      <div className="container-page pt-16 sm:pt-24">
        <Link href="/projects" className="label transition-colors hover:text-[var(--score)]">
          ← All projects
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="label text-[var(--score)]">{project.category}</span>
          <span className="label">{project.year}</span>
          <span className="label">{project.status}</span>
        </div>

        <h1 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--chalk)] sm:text-5xl">
          {project.name}
        </h1>
        <p className="label mt-3">{project.role}</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--chalk-dim)]">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        {project.links && project.links.length > 0 ? (
          <div className="mt-6 flex gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="label text-[var(--chalk)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:text-[var(--score)]"
              >
                {link.label} →
              </a>
            ))}
          </div>
        ) : null}
      </div>

      <Divider />

      {/* Screenshots — drop files in /public/projects/<slug>/ and list them
          in the project's `images` array in src/data/projects.ts */}
      {project.images && project.images.length > 0 ? (
        <div className="container-page space-y-6">
          {project.images.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={1600}
              height={900}
              className="h-auto w-full rounded-md border border-[var(--line)]"
            />
          ))}
        </div>
      ) : null}

      <div className="container-page grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_2fr]">
        {/* Side rail — quick facts */}
        <aside className="space-y-8">
          <div>
            <p className="label mb-2">Role</p>
            <p className="text-[var(--chalk-dim)]">{project.role}</p>
          </div>
          <div>
            <p className="label mb-2">Status</p>
            <p className="text-[var(--chalk-dim)]">{project.status}</p>
          </div>
          <div>
            <p className="label mb-2">Stack</p>
            <ul className="space-y-1 text-[var(--chalk-dim)]">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main write-up — edit content in src/data/projects.ts */}
        <div className="space-y-14">
          {project.problem ? (
            <section>
              <h2 className="font-display text-xl font-medium text-[var(--chalk)]">
                Problem
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--chalk-dim)]">
                {project.problem}
              </p>
            </section>
          ) : null}

          {project.approach ? (
            <section>
              <h2 className="font-display text-xl font-medium text-[var(--chalk)]">
                Approach
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--chalk-dim)]">
                {project.approach}
              </p>
            </section>
          ) : null}

          {project.decisions && project.decisions.length > 0 ? (
            <section>
              <h2 className="font-display text-xl font-medium text-[var(--chalk)]">
                Key decisions
              </h2>
              <div className="mt-4 space-y-6">
                {project.decisions.map((d) => (
                  <div
                    key={d.title}
                    className="border-l-2 border-[var(--line-strong)] pl-4"
                  >
                    <p className="font-medium text-[var(--chalk)]">{d.title}</p>
                    <p className="mt-1 leading-relaxed text-[var(--chalk-dim)]">
                      {d.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {project.challenges ? (
            <section>
              <h2 className="font-display text-xl font-medium text-[var(--chalk)]">
                Challenges
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--chalk-dim)]">
                {project.challenges}
              </p>
            </section>
          ) : null}

          {project.nextSteps ? (
            <section>
              <h2 className="font-display text-xl font-medium text-[var(--chalk)]">
                What&apos;s next
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--chalk-dim)]">
                {project.nextSteps}
              </p>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
