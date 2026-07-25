import Divider from "@/components/Divider";

export const metadata = { title: "Contact — Jason Cushen" };

// EDIT ME — add your LinkedIn profile URL here when ready, e.g.
// { label: "LinkedIn", value: "linkedin.com/in/…", href: "https://linkedin.com/in/…" },
const contactLinks = [
  {
    label: "Email",
    value: "jasoncushen1@gmail.com",
    href: "mailto:jasoncushen1@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/jasoncushen",
    href: "https://github.com/jasoncushen",
  },
];

export default function ContactPage() {
  return (
    <div>
      <div className="container-page py-16 sm:py-24">
        <p className="label mb-5">Get in touch</p>
        <h1 className="font-display max-w-2xl text-4xl font-semibold tracking-tight text-[var(--chalk)] sm:text-5xl">
          Let&apos;s talk
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--chalk-dim)]">
          Open to graduate software engineering roles. The fastest way to
          reach me is email — happy to send over more detail on any project
          or a full CV.
        </p>
      </div>

      <Divider />

      <section className="container-page py-16 pb-24">
        <div className="grid gap-4 sm:grid-cols-2">
          {contactLinks.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group rounded-md border border-[var(--line)] bg-[var(--pitch-2)] p-6 transition-colors hover:border-[var(--score)]"
            >
              <p className="label">{c.label}</p>
              <p className="font-display mt-2 text-lg text-[var(--chalk)] group-hover:text-[var(--score)]">
                {c.value}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
