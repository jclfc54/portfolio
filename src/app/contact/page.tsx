import { contactLinks } from "@/data/profile";
import { ArrowUpRight, Mail, Github, Linkedin } from "@/components/Icon";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Jason Cushen — open to graduate software engineering roles. Email, GitHub and LinkedIn.",
};

// Contact links are edited in src/data/profile.ts — this file only
// handles layout.

// Each link gets its own icon so the rows are distinguishable at a
// glance rather than by reading the label. Falls back to the arrow.
const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
};

export default function ContactPage() {
  return (
    <div className="container-page py-16 sm:py-24">
      <p className="label">Get in touch</p>
      <h1 className="font-display balance mt-5 max-w-2xl text-4xl font-bold leading-[1.05] text-ink sm:text-6xl">
        Let&apos;s talk
      </h1>
      <p className="pretty mt-5 max-w-xl text-lg leading-relaxed text-ink-3">
        Open to graduate software engineering roles. The fastest way to reach
        me is email — happy to send over more detail on any project or a full
        CV.
      </p>

      <div className="mt-14 border-t border-ink">
        {contactLinks.map((c) => {
          const Icon = icons[c.label] ?? ArrowUpRight;
          const external = !c.href.startsWith("mailto:");
          return (
            <a
              key={c.label}
              href={c.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-line py-7 transition-colors duration-200 hover:bg-surface"
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4 shrink-0 text-ink-3 transition-colors duration-200 group-hover:text-accent" />
                <span className="label">{c.label}</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="font-display text-lg font-medium text-ink transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                  {c.value}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </span>
            </a>
          );
        })}
      </div>

      <p className="label mt-10 normal-case tracking-normal">
        Based in Limerick, Ireland · open to hybrid and remote
      </p>
    </div>
  );
}
