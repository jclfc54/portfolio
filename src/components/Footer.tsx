import Link from "next/link";
import { contactLinks } from "@/data/profile";
import { ArrowUpRight } from "@/components/Icon";

const internal = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="container-page py-12">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto_auto] sm:gap-16">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-ink">
              Jason Cushen
            </p>
            <p className="pretty mt-2 max-w-xs text-sm leading-relaxed text-ink-3">
              Software engineer in Limerick, Ireland. Currently looking for a
              graduate software engineering role.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="label">Site</p>
            {internal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink-2 transition-colors duration-200 hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="label">Elsewhere</p>
            {contactLinks.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group flex items-center gap-1 text-sm text-ink-2 transition-colors duration-200 hover:text-accent"
              >
                {c.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-40 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>

        <p className="label mt-12 border-t border-line pt-6 normal-case tracking-normal">
          © {new Date().getFullYear()} Jason Cushen — built with Next.js,
          deployed on Cloudflare Pages
        </p>
      </div>
    </footer>
  );
}
