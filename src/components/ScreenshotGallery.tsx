"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { Close, ArrowLeft, ArrowRight, Expand } from "@/components/Icon";

/*
  Screenshots presented as numbered figures. Clicking one opens a
  lightbox: arrow keys or the buttons move between figures, Escape or
  the backdrop closes it.

  Accessibility:
    - Focus moves into the dialog on open and returns to the thumbnail
      that opened it on close, so keyboard users never lose their place.
    - Tab is trapped inside the dialog while it is open.
    - Body scroll is locked, and the scrollbar width is compensated so
      the page behind does not shift.
*/
export default function ScreenshotGallery({
  images,
}: {
  images: ProjectImage[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((cur) =>
        cur === null ? cur : (cur + dir + images.length) % images.length
      );
    },
    [images.length]
  );

  const close = useCallback(() => {
    setOpen(null);
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button, [href], [tabindex]:not([tabindex='-1'])"
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);

    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    // Move focus into the dialog once it exists.
    const timer = window.setTimeout(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("button")
        ?.focus();
    }, 0);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
      window.setTimeout(() => {
        document.body.style.overflow = prevOverflow;
        document.body.style.paddingRight = prevPad;
      }, 0);
    };
  }, [open, step, close]);

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2">
        {images.map((img, i) => (
          <figure key={img.src}>
            <button
              type="button"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setOpen(i);
              }}
              className="group relative block w-full cursor-zoom-in overflow-hidden border border-line bg-surface transition-colors duration-200 hover:border-line-3"
              aria-label={`Enlarge figure ${i + 1}: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={1600}
                height={1067}
                className="aspect-[3/2] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
              <span
                aria-hidden
                className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-[3px] bg-ink/85 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <Expand className="h-4 w-4" />
              </span>
            </button>
            <figcaption className="mt-3 flex items-baseline gap-3 border-t border-line pt-3">
              <span className="label label-accent shrink-0">
                Fig {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pretty text-sm leading-relaxed text-ink-3">
                {img.caption ?? img.alt}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Figure ${open + 1} of ${images.length}: ${images[open].alt}`}
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-10"
          onClick={close}
        >
          <div
            className="flex max-h-full w-full max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-3">
              <span className="label text-white/70">
                Fig {String(open + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close figure viewer"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[3px] border border-white/30 text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
              >
                <Close className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 border border-white/20 bg-surface p-2">
              {/* Plain img: the lightbox needs natural sizing, not a fixed box. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[open].src}
                alt={images[open].alt}
                className="mx-auto max-h-[68vh] w-auto max-w-full"
              />
            </div>

            <div className="flex items-start justify-between gap-6 pt-3">
              <p className="pretty max-w-xl text-sm leading-relaxed text-white/80">
                {images[open].caption ?? images[open].alt}
              </p>
              {images.length > 1 ? (
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous figure"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[3px] border border-white/30 text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next figure"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[3px] border border-white/30 text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
