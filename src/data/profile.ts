/*
  EDIT ME — this is YOUR file. Everything personal on the site lives here:
  the About page intro, education, certifications, experience, and the
  Contact page links. Change the values, save, and the site updates.
  (Projects are separate and stay in src/data/projects.ts.)
*/

// SITE URL — set this to your real deployed domain once you know it
// (e.g. your *.pages.dev URL or a custom domain). Used for social
// previews, the sitemap, and robots.txt.
export const siteUrl = "https://jasoncushen.pages.dev";

// HERO — the top of the home page. Short, factual, recruiter-facing.
export const hero = {
  role: "Software Engineer",
  location: "Limerick, Ireland",
  // Shown with a blue dot in the nav-height eyebrow. Set to "" to hide.
  availability: "Available for graduate roles",
  // One or two sentences. This is the first thing a recruiter reads.
  intro:
    "I build data-driven tools that turn messy real-world data into something people actually use — most recently a match analysis platform for Gaelic football coaches.",
};

// PORTRAIT — a photo of yourself for the top of the home page.
// To add it: drop the file in /public (e.g. /public/jason.jpg) and set
// `src` to its path, like "/jason.jpg". Leave src as "" and a geometric
// placeholder is shown instead, so the page never looks broken.
// The frame is a 4:5 portrait crop — around 1000x1250px looks sharp on
// retina screens without bloating the page.
export const portrait = {
  src: "",
  alt: "Jason Cushen",
};

// FACT BAND — the four facts in the strip under the hero. Scannable in
// seconds, which is roughly how long a first pass on a portfolio lasts.
// Four entries fill the row exactly; add more and they wrap to a new row.
export const heroFacts: { label: string; value: string }[] = [
  { label: "Based", value: "Limerick, Ireland" },
  { label: "Degree", value: "BSc Computer Systems, UL" },
  { label: "Placement", value: "8 months at JLR, Shannon" },
  { label: "Focus", value: "Full-stack · data pipelines" },
];

// HOME — the short "about" block on the home page, above the contact CTA.
export const homeAbout =
  "I'm a Computer Systems graduate from the University of Limerick. I like the boundary between messy real-world data and tools people actually open — which is what my final year project turned into, and what I spent my placement at JLR doing.";

// ABOUT — the intro paragraphs at the top of the About page.
// Each string is one paragraph. The first one gets the drop cap.
export const aboutIntro: string[] = [
  "I'm a Computer Systems graduate from the University of Limerick. I picked this field because I enjoy building projects that have a real-world impact. One of my favourite projects I have worked on is my final year project, which is a match analysis platform for Gaelic football coaches. The web-app includes a variety of features, such as video upload, event tagging, pitch-map visualisations and automated reports and multi-match insights for club coaches.",
  "I play GAA myself, which is where the project came from: clubs record plenty of footage, and very little of it ever turns into something a coach can use. That boundary between messy real-world data and turning it into tools people actually open, is the kind of work I enjoy most.",
  "I spent my 8 month long co-op placement at Jaguar Land Rover in Shannon where I gained valuable experience in a professional software development and testing environment. I worked on a variety of projects and agile teams, including an internal application and a test automation framework for a large-scale software system. I'm now looking for a graduate software engineering role.",
];

// EDUCATION — grade is optional: leave "" to hide it.
export const education = {
  institution: "University of Limerick",
  degree: "BSc Computer Systems",
  grade: "2:1 (Hons)",
  highlight:
    "Gained a strong foundation in software development, data structures and algorithms, and system design, with hands-on experience in building real-world applications and projects.",
};

// CERTIFICATIONS — add one object per cert; the section only appears
// once this list has at least one entry.
export type Certification = {
  name: string;
  issuer: string;
  year: string;
  link?: string; // optional — makes the cert name a clickable link
};

export const certifications: Certification[] = [
  // { name: "AWS Certified Cloud Practitioner", issuer: "AWS", year: "2025" },
];

// EXPERIENCE — add one object per role, most recent first.
// period and stack are optional: "" / [] hides them.
export type Experience = {
  role: string;
  org: string;
  period: string; // e.g. "Jan — Aug 2024"
  summary: string;
  stack: string[]; // e.g. ["Python", "Jenkins"]
};

export const experience: Experience[] = [
  {
    role: "Software Engineering Placement",
    org: "JLR (Jaguar Land Rover), Shannon",
    period: "May 2024 — Jan 2025",
    summary:
      "Placement at JLR's software engineering centre in Shannon for 8 months. Worked across 3 agile teams on a variety of projects.",
    stack: ["Python", "Groovy", "Typescript", "GitLab CI/CD"],
  },
];

// TOOLBOX — the grouped tech list on the About page.
//
// EDIT ME. I built this from what actually appears in your projects and
// your JLR role, plus a few safe implications (Spring Boot => Java,
// PostgreSQL => SQL, Next.js => React). Delete anything you would not
// want to be asked about in an interview — a short honest list beats a
// wall of logos, and every item here is fair game for a question.
//
// The number on each chip is computed, not typed: it counts how many
// projects on this site list that tool. Add a project and the numbers
// update themselves. `match` lets one chip stand for several stack
// entries (Cloudflare covers Stream, R2, Workers and KV); matching is
// exact and case-insensitive, so a chip with no match simply shows no
// number rather than a wrong one.
export type Tool = {
  name: string;
  match?: string[];
};

export type ToolGroup = {
  name: string;
  items: Tool[];
};

export const toolbox: ToolGroup[] = [
  {
    name: "Languages",
    items: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "TypeScript", match: ["Typescript"] },
      { name: "Java", match: ["Spring Boot"] },
      { name: "C" },
      { name: "Groovy" },
      { name: "SQL", match: ["PostgreSQL"] },
    ],
  },
  {
    name: "Frameworks & libraries",
    items: [
      { name: "Next.js" },
      { name: "React", match: ["Next.js"] },
      { name: "Spring Boot" },
      { name: "Node.js" },
      { name: "Electron" },
      { name: "Pandas" },
      { name: "ReportLab" },
      { name: "Chart.js" },
    ],
  },
  {
    name: "Infrastructure & data",
    items: [
      { name: "Supabase" },
      { name: "PostgreSQL" },
      {
        name: "Cloudflare",
        match: ["Cloudflare Stream", "Cloudflare R2", "Cloudflare Workers", "KV"],
      },
      { name: "GitLab CI/CD" },
      { name: "Git" },
    ],
  },
  {
    name: "Practices",
    items: [
      { name: "REST APIs", match: ["REST"] },
      { name: "Microservices" },
      { name: "CI/CD", match: ["GitLab CI/CD"] },
      { name: "Agile delivery" },
      { name: "Test automation" },
    ],
  },
];

// CONTACT — one row per link on the Contact page.
// value is the text shown; href is where it goes.
export const contactLinks = [
  {
    label: "Email",
    value: "jasoncushen1@gmail.com",
    href: "mailto:jasoncushen1@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/jclfc54",
    href: "https://github.com/jclfc54",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/jason-cushen",
    href: "https://www.linkedin.com/in/jason-cushen",
  },
  // { label: "LinkedIn", value: "linkedin.com/in/…", href: "https://linkedin.com/in/…" },
];
