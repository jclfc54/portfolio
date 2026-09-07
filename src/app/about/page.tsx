import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import Tag from "@/components/Tag";
import Toolbox from "@/components/Toolbox";
import {
  aboutIntro,
  education,
  certifications,
  experience,
} from "@/data/profile";

export const metadata = {
  title: "About",
  description:
    "Jason Cushen — Computer Systems graduate from the University of Limerick, with an eight-month software engineering placement at JLR.",
};

// All personal content on this page is edited in src/data/profile.ts —
// this file only handles layout.

/*
  Everything on this page uses the same two-column record layout:
  mono metadata in a narrow left rail, prose on the right. It reads
  like a well-set CV, which is exactly the job this page has to do.
*/
export default function AboutPage() {
  return (
    <div className="container-page py-16 sm:py-24">
      <p className="label">About</p>
      <h1 className="font-display balance mt-5 max-w-2xl text-4xl font-bold leading-[1.05] text-ink sm:text-6xl">
        A bit about me
      </h1>

      <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-3">
        {aboutIntro.map((paragraph, i) => (
          <p key={i} className="pretty">
            {paragraph}
          </p>
        ))}
      </div>

      {/* ---------------- TOOLBOX ---------------- */}
      {/* Sits above Education because "what has he actually used?" is the
          fastest filter a recruiter applies, and it is the one section
          here that a generic CV does not already answer. */}
      <section className="mt-24 sm:mt-32">
        <SectionHead label="Toolbox" className="mb-8" />
        <Toolbox />
      </section>

      {/* ---------------- EDUCATION ---------------- */}
      <section className="mt-24 sm:mt-32">
        <SectionHead label="Education" />
        <Reveal className="mt-8">
          <div className="grid gap-x-12 gap-y-3 border-b border-line pb-8 sm:grid-cols-[14rem_1fr]">
            <div>
              <p className="label">{education.degree}</p>
              {education.grade ? (
                <p className="mt-2 font-mono text-xs text-accent">
                  {education.grade}
                </p>
              ) : null}
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                {education.institution}
              </h3>
              <p className="pretty mt-3 max-w-xl leading-relaxed text-ink-3">
                {education.highlight}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- CERTIFICATIONS ---------------- */}
      {certifications.length > 0 ? (
        <section className="mt-24 sm:mt-32">
          <SectionHead label="Certifications" />
          <div className="mt-8">
            {certifications.map((c) => (
              <div
                key={c.name}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-5"
              >
                {c.link ? (
                  <a
                    href={c.link}
                    className="font-medium text-ink underline decoration-line-3 underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                  >
                    {c.name}
                  </a>
                ) : (
                  <p className="font-medium text-ink">{c.name}</p>
                )}
                <p className="label">
                  {c.issuer} · {c.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* ---------------- EXPERIENCE ---------------- */}
      <section className="mt-24 sm:mt-32">
        <SectionHead label="Experience" />
        <div className="mt-8">
          {experience.map((job) => (
            <Reveal key={`${job.org}-${job.role}`}>
              <div className="grid gap-x-12 gap-y-3 border-b border-line py-8 first:pt-0 sm:grid-cols-[14rem_1fr]">
                <div>
                  {job.period ? <p className="label">{job.period}</p> : null}
                  <p className="mt-2 text-sm text-ink-2">{job.org}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                    {job.role}
                  </h3>
                  <p className="pretty mt-3 max-w-xl leading-relaxed text-ink-3">
                    {job.summary}
                  </p>
                  {job.stack.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {job.stack.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
