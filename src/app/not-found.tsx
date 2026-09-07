import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@/components/Icon";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[64vh] flex-col items-start justify-center py-24">
      <p className="label label-accent">Error 404</p>
      <h1 className="font-display balance mt-5 max-w-2xl text-4xl font-bold leading-[1.05] text-ink sm:text-6xl">
        This page doesn&apos;t exist
      </h1>
      <p className="pretty mt-5 max-w-xl text-lg leading-relaxed text-ink-3">
        The link may be out of date, or the page may have moved. The projects
        index is the best place to pick things back up.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link
          href="/"
          className="group flex h-12 items-center gap-2 rounded-[3px] bg-ink px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back home
        </Link>
        <Link
          href="/projects"
          className="group flex h-12 items-center gap-2 rounded-[3px] border border-line-3 px-6 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-surface"
        >
          View projects
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
