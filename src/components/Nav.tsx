"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download } from "@/components/Icon";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        {/* The full name does not fit alongside the links and the CV
            button at 375px, so it collapses to the monogram there. */}
        <Link
          href="/"
          aria-label="Jason Cushen — home"
          className="font-display flex items-center text-[0.9375rem] font-bold tracking-tight text-ink"
        >
          <span className="sm:hidden">JC</span>
          <span className="hidden sm:inline">Jason Cushen</span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-0 sm:gap-2">
          {links.map((link) => {
            // A project case study still counts as being "in" /projects.
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`label flex h-11 items-center px-1.5 transition-colors duration-200 sm:px-3 ${
                  active ? "text-ink" : "text-ink-3 hover:text-ink"
                }`}
              >
                <span className="relative">
                  {link.label}
                  {/* Active state is a rule under the word, not colour
                      alone — it survives greyscale and colour blindness. */}
                  <span
                    aria-hidden
                    className={`absolute -bottom-1.5 left-0 h-px w-full bg-ink transition-opacity duration-200 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </span>
              </Link>
            );
          })}

          <a
            href="/Jason_Cushen-CV.pdf"
            className="label ml-1.5 flex h-9 items-center gap-1.5 rounded-[3px] border border-line-3 px-2 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white sm:ml-2 sm:px-3"
          >
            CV
            <Download className="h-3.5 w-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
