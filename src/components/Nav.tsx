import Link from "next/link";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--pitch)]/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-medium tracking-tight text-[var(--chalk)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--line-strong)] font-mono text-xs">
            JC
          </span>
          <span className="hidden sm:inline">Jason Cushen</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label rounded-sm px-3 py-2 transition-colors hover:bg-[var(--pitch-2)] hover:text-[var(--chalk)]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/cv.pdf"
            className="label ml-1 rounded-sm border border-[var(--line-strong)] px-3 py-2 text-[var(--chalk)] transition-colors hover:border-[var(--score)] hover:text-[var(--score)]"
          >
            CV ↓
          </a>
        </nav>
      </div>
    </header>
  );
}
