/*
  The structural signature of the site: a mono label sitting on a rule
  that runs the full measure, with optional meta text pinned right.
  Replaces boxed section headings — the page stays one continuous grid.
*/
export default function SectionHead({
  label,
  meta,
  title,
  intro,
  className = "",
}: {
  label: string;
  meta?: string;
  title?: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4 border-t border-ink pt-3">
        <span className="label">{label}</span>
        {meta ? <span className="label">{meta}</span> : null}
      </div>
      {title ? (
        <h2 className="font-display balance mt-6 max-w-2xl text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl">
          {title}
        </h2>
      ) : null}
      {intro ? (
        <p className="pretty mt-3 max-w-xl leading-relaxed text-ink-3">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
