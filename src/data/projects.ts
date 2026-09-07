// SCREENSHOTS — to show recruiters your UI, terminal output, reports,
// anything: drop image files in /public/projects/<slug>/ and list them
// in that project's `images` array. They appear on the case-study page
// as numbered figures with a click-to-enlarge lightbox, e.g.
//   images: [
//     {
//       src: "/projects/gaa-match-analysis/pitch-map.png",
//       alt: "Interactive pitch map with tagged shot events",
//       caption: "The interactive pitch map — every tagged event, plotted",
//     },
//   ],
// alt is required (screen readers); caption is optional — shown under
// the figure, falls back to alt if omitted.
export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  role: string; // e.g. "Solo project" / "Team project — Identity & Auth"
  category: string; // short mono tag, e.g. "WEB APP", "SYSTEMS", "TOOLING"
  summary: string; // one or two sentences — used on cards + hero
  status: "Live" | "In progress" | "Archived" | "Coursework";
  year: string;
  stack: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
  // Longer-form content — keep as short or long as you like per project.
  // Leave any section as an empty string / empty array to hide it.
  problem?: string;
  approach?: string;
  decisions?: { title: string; detail: string }[];
  challenges?: string;
  nextSteps?: string;
  images?: ProjectImage[];
};

// EDIT ME — this is the only file you need to touch to update project content.
// The case-study copy below is a first draft written from the project
// summaries — read it through and put anything that's off into your own
// words. Add screenshots to /public/projects/<slug>/ and list them in the
// `images` array to show them on the case-study page.
export const projects: Project[] = [
  {
    slug: "gaa-match-analysis",
    name: "GAA Match Analysis Tool",
    role: "Solo project — final year project",
    category: "WEB APP",
    summary:
      "A web app for analysing Gaelic football matches from video: pitch-map visualisations and automated PDF reports for clubs and coaches.",
    status: "In progress",
    year: "2025 — ongoing",
    stack: [
      "Next.js",
      "Supabase",
      "Cloudflare Stream",
      "Cloudflare R2",
      "Python",
      "Pandas",
      "ReportLab",
    ],
    links: [],
    featured: true,
    problem:
      "Most GAA clubs record their matches, but the footage rarely turns into anything a coach can act on. The analysis platforms built for professional soccer and rugby are priced and designed for full-time analysts, not volunteer coaches — so hours of video sit unwatched.",
    approach:
      "A web app where a club uploads match footage and tags events against the video timeline. Tagged events are plotted on an interactive pitch map, and a Python pipeline turns the same data into an automated PDF match report a coach can share with the panel. Video upload, transcoding and playback run through Cloudflare Stream with originals in R2; Supabase handles auth and the event data.",
    decisions: [
      {
        title: "Cloudflare Stream + R2 for video",
        detail:
          "Match footage is large and club wifi is not. Offloading transcoding and delivery to Stream keeps the app itself thin and cheap to run, which matters when the users are volunteer-run clubs.",
      },
      {
        title: "PDF reports as the primary output",
        detail:
          "Coaches wanted something they could print or drop into the team group chat, not another dashboard behind a login — so the headline feature is a generated report, with the interactive pitch map as the analysis tool behind it.",
      },
    ],
    challenges:
      "The hardest part has been the event-tagging workflow: it has to be fast enough that tagging a full match doesn't take longer than the match itself, which forces ruthless decisions about what one click should mean.",
    nextSteps:
      "Completing a mixed-methods evaluation study with real GAA coaches and analysts, and refining the report templates based on what they actually use.",
    images: [],
  },
  {
    slug: "e-library-microservices",
    name: "E-Library Microservices Platform",
    role: "Team project — owned Identity & Auth bounded context",
    category: "SYSTEMS",
    summary:
      "A microservices-based e-library system built with a team; designed the Identity & Auth service around a UserAccount aggregate root.",
    status: "Coursework",
    year: "2024",
    stack: ["Spring Boot", "PostgreSQL", "Microservices", "REST"],
    links: [],
    featured: false,
    problem:
      "A team coursework brief: build an e-library platform as a set of independently deployable services, with each member owning a bounded context end to end — design, implementation and integration.",
    approach:
      "I owned the Identity & Auth service, modelled around a UserAccount aggregate root — registration, authentication and account lifecycle — implemented in Spring Boot on PostgreSQL and exposed over REST to the rest of the platform.",
    decisions: [],
    challenges:
      "Most of the real difficulty was at the seams between services: agreeing API contracts with teammates early enough that everyone could build in parallel, then holding to them when requirements shifted.",
    nextSteps: "",
    images: [],
  },
  {
    slug: "jarvis-dashboard",
    name: "Jarvis — Desktop Dashboard",
    role: "Solo project",
    category: "DESKTOP APP",
    summary:
      "A personal Electron dashboard with live charts and local storage, built as a base for a conversational assistant layer.",
    status: "In progress",
    year: "2025 — ongoing",
    stack: ["Electron", "JavaScript", "Chart.js", "Node.js"],
    links: [],
    featured: false,
    problem:
      "I wanted one always-on desktop view of the things I check every day — and a codebase deliberately structured so a conversational assistant could be layered on top later.",
    approach:
      "An Electron app with live Chart.js visualisations and local persistence, organised so the data sources the dashboard renders are the same ones a future assistant layer can query and act on.",
    decisions: [],
    challenges: "",
    nextSteps:
      "Building the conversational layer on top of the existing dashboard base.",
    images: [],
  },
  {
    slug: "bucket-list-app",
    name: "Shared Bucket List",
    role: "Solo project",
    category: "WEB APP",
    summary:
      "A small two-user web app for tracking a shared bucket list, deployed on Cloudflare Workers with KV-backed storage.",
    status: "Live",
    year: "2025",
    stack: ["Cloudflare Workers", "KV", "JavaScript"],
    links: [],
    featured: false,
    problem: "",
    approach:
      "Deliberately small: a single Cloudflare Worker serves both the UI and the API, with KV as the entire storage layer. No framework and no build step — it deploys in seconds and costs nothing to run.",
    decisions: [],
    challenges: "",
    nextSteps: "",
    images: [],
  },
  {
    slug: "jibuc-compiler",
    name: "JIBUC Lexer",
    role: "Coursework — compiler construction",
    category: "SYSTEMS",
    summary:
      "A lexical analyser for a custom language, built with Flex and GCC as part of a compiler construction module.",
    status: "Coursework",
    year: "2024",
    stack: ["Flex", "C", "GCC"],
    links: [],
    featured: false,
    problem: "",
    approach:
      "Wrote the token definitions and lexing rules in Flex for the JIBUC teaching language, compiled the generated analyser with GCC, and verified it against a suite of valid and invalid source programs.",
    decisions: [],
    challenges: "",
    nextSteps: "",
    images: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
