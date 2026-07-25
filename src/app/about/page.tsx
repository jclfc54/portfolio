import Divider from "@/components/Divider";
import Tag from "@/components/Tag";

export const metadata = { title: "About — Jason Cushen" };

// EDIT ME — the copy below is a first draft; adjust wording, add your grade,
// placement dates/detail, and any certifications.
const education = {
  institution: "University of Limerick",
  degree: "BSc Computer Science",
  grade: "", // e.g. "First Class Honours" — leave empty to hide
  highlight:
    "Final year project: a Gaelic football match analysis tool with pitch-map visualisations, automated PDF reporting, and a mixed-methods evaluation study with real GAA stakeholders.",
};

const certifications: { name: string; issuer: string; year: string; link?: string }[] = [
  // e.g. { name: "AWS Certified Cloud Practitioner", issuer: "AWS", year: "2025" },
];

const experience = [
  {
    role: "Software Engineering Placement",
    org: "JLR (Jaguar Land Rover), Shannon",
    period: "", // e.g. "Jan — Aug 2024" — leave empty to hide
    summary:
      "Placement at JLR's software engineering centre in Shannon as part of the UL cooperative education programme.",
    stack: [] as string[],
  },
];

export default function AboutPage() {
  return (
    <div>
      <div className="container-page py-16 sm:py-24">
        <p className="label mb-5">About</p>
        <h1 className="font-display max-w-2xl text-4xl font-semibold tracking-tight text-[var(--chalk)] sm:text-5xl">
          A bit about me
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-[var(--chalk-dim)]">
          <p>
            I&apos;m a Computer Science graduate from the University of
            Limerick. My final year project is a match analysis platform for
            Gaelic football — video ingestion, event tagging, pitch-map
            visualisations and automated PDF reports for club coaches.
          </p>
          <p>
            I play GAA myself, which is where the project came from: clubs
            record plenty of footage, and very little of it ever turns into
            something a coach can use. That boundary — messy real-world data
            into tools people actually open — is the kind of work I enjoy
            most.
          </p>
          <p>
            I spent my placement at Jaguar Land Rover in Shannon, and
            I&apos;m now looking for a graduate software engineering role.
          </p>
        </div>
      </div>

      <Divider label="Education" />

      <section className="container-page py-4">
        <div className="rounded-md border border-[var(--line)] bg-[var(--pitch-2)] p-6 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl font-medium text-[var(--chalk)]">
              {education.institution}
            </h2>
            {education.grade ? (
              <span className="label">{education.grade}</span>
            ) : null}
          </div>
          <p className="mt-1 text-[var(--chalk-dim)]">{education.degree}</p>
          <p className="mt-4 leading-relaxed text-[var(--chalk-dim)]">
            {education.highlight}
          </p>
        </div>
      </section>

      {certifications.length > 0 ? (
        <>
          <Divider label="Certifications" />
          <section className="container-page py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((c) => (
                <div
                  key={c.name}
                  className="rounded-md border border-[var(--line)] bg-[var(--pitch-2)] p-5"
                >
                  <p className="font-medium text-[var(--chalk)]">{c.name}</p>
                  <p className="label mt-1">
                    {c.issuer} · {c.year}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}

      <Divider label="Experience" />

      <section className="container-page py-4 pb-24">
        <div className="space-y-8">
          {experience.map((job) => (
            <div
              key={job.role}
              className="rounded-md border border-[var(--line)] bg-[var(--pitch-2)] p-6 sm:p-10"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-medium text-[var(--chalk)]">
                  {job.role}
                </h3>
                {job.period ? <span className="label">{job.period}</span> : null}
              </div>
              <p className="mt-1 text-[var(--chalk-dim)]">{job.org}</p>
              <p className="mt-4 leading-relaxed text-[var(--chalk-dim)]">
                {job.summary}
              </p>
              {job.stack.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
