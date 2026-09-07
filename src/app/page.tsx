import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { hero, heroFacts, homeAbout } from "@/data/profile";
import ProjectCard from "@/components/ProjectCard";
import ProjectPlate from "@/components/ProjectPlate";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import Portrait from "@/components/Portrait";
import Tag from "@/components/Tag";
import { ArrowRight, Download } from "@/components/Icon";

/*
  Home follows the portfolio-grid pattern from the design system:
    Hero (name / role) > Project grid > About > Contact
  The featured project gets a full-width spread above the grid so there
  is one clear first thing to look at; everything else is an even grid.
*/
export default function Home() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.slug !== featured.slug);
  const featuredShot = featured.images?.[0];

  return (
    <div>
      {/* ---------------- HERO ---------------- */}
      <section className="container-page pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-center lg:gap-16">
          <div>
            {hero.availability ? (
              <p className="label flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                />
                {hero.availability}
              </p>
            ) : null}

            <h1 className="font-display balance mt-6 text-[clamp(2.75rem,8vw,5rem)] font-bold leading-[0.98] text-ink">
              Jason Cushen
            </h1>

            <p className="font-display mt-4 text-xl font-medium text-ink-2 sm:text-2xl">
              {hero.role}
            </p>

            <p className="pretty mt-6 max-w-xl text-lg leading-relaxed text-ink-3">
              {hero.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="group flex h-12 items-center gap-2 rounded-[3px] bg-ink px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent"
              >
                View projects
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                href="/Jason_Cushen-CV.pdf"
                className="flex h-12 items-center gap-2 rounded-[3px] border border-line-3 px-6 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-surface"
              >
                Download CV
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Portrait — swap in a real photo via `portrait` in profile.ts. */}
          <div className="mx-auto w-full max-w-[15rem] sm:max-w-[16rem] lg:mx-0 lg:max-w-none">
            <Portrait />
          </div>
        </div>

        {/*
          Fact band — the four things a recruiter checks first, set as one
          hairline-divided strip. gap-px over a line-coloured background is
          what draws the dividers, so there are no double borders where the
          cells meet and the grid stays flush at every breakpoint.
        */}
        <dl className="mt-12 grid grid-cols-2 gap-px border border-line bg-line sm:mt-14 sm:grid-cols-4">
          {heroFacts.map((f) => (
            <div key={f.label} className="bg-bg p-5">
              <dt className="label">{f.label}</dt>
              <dd className="pretty mt-2 text-sm leading-snug text-ink-2">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------------- SELECTED WORK ---------------- */}
      <section className="container-page">
        <SectionHead
          label="Selected work"
          meta={`${projects.length} projects`}
        />

        {/* Featured spread */}
        <Reveal className="mt-10">
          <Link
            href={`/projects/${featured.slug}`}
            className="group grid gap-8 border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-3 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12"
          >
            <div className="order-2 flex flex-col justify-center lg:order-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="label label-accent">Featured</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-line-2" />
                <span className="label">{featured.category}</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-line-2" />
                <span className="label">{featured.year}</span>
              </div>

              <h3 className="font-display balance mt-4 text-2xl font-semibold leading-[1.1] text-ink transition-colors duration-200 group-hover:text-accent sm:text-4xl">
                {featured.name}
              </h3>

              <p className="pretty mt-4 max-w-xl leading-relaxed text-ink-3">
                {featured.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {featured.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>

              <span className="label label-accent mt-7 flex items-center gap-1.5">
                Read the case study
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>

            <div className="order-1 self-center overflow-hidden border border-line lg:order-2">
              {featuredShot ? (
                <Image
                  src={featuredShot.src}
                  alt={featuredShot.alt}
                  width={1600}
                  height={1067}
                  priority
                  className="aspect-[3/2] w-full object-cover"
                />
              ) : (
                <ProjectPlate project={featured} />
              )}
            </div>
          </Link>
        </Reveal>

        {/* The rest */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={i * 60}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- ABOUT ---------------- */}
      <section className="container-page mt-24 sm:mt-32">
        <SectionHead label="About" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <p className="font-display balance text-2xl font-medium leading-[1.25] text-ink sm:text-3xl">
            Turning messy real-world data into tools people actually open.
          </p>
          <div>
            <p className="pretty text-lg leading-relaxed text-ink-3">
              {homeAbout}
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-2"
            >
              More about me
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT CTA ---------------- */}
      <section className="no-print container-page mt-24 sm:mt-32">
        <div className="border border-line bg-surface p-8 sm:p-14">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display balance max-w-lg text-2xl font-semibold leading-tight text-ink sm:text-4xl">
                Looking for a graduate software engineer?
              </h2>
              <p className="pretty mt-3 max-w-md leading-relaxed text-ink-3">
                I&apos;m open to graduate roles and happy to walk through any
                of these projects in more detail.
              </p>
            </div>
            <Link
              href="/contact"
              className="group flex h-12 shrink-0 items-center gap-2 rounded-[3px] bg-ink px-7 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
