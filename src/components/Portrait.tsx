import Image from "next/image";
import { portrait } from "@/data/profile";

/*
  The hero portrait slot.

  Set `portrait.src` in src/data/profile.ts to a file in /public and a real
  photo renders here. Until then this draws a geometric placeholder built
  from the same modular system as the project plates and the social card —
  so the page reads as finished rather than as a missing image, and there
  is nothing to tidy up later when the photo lands.

  The frame is 4:5 and crops with object-cover, so any portrait-ish photo
  sits correctly without needing to be cut to size first.
*/
export default function Portrait() {
  if (portrait.src) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-surface">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          priority
          sizes="(min-width: 1024px) 32vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-surface"
    >
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 h-full w-full"
        aria-hidden
        focusable="false"
      >
        {/* modular hairline grid — 4 columns, 5 rows */}
        {[1, 2, 3].map((i) => (
          <line
            key={`v${i}`}
            x1={i * 100}
            y1="0"
            x2={i * 100}
            y2="500"
            stroke="var(--line)"
            strokeWidth="1"
          />
        ))}
        {[1, 2, 3, 4].map((i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 100}
            x2="400"
            y2={i * 100}
            stroke="var(--line)"
            strokeWidth="1"
          />
        ))}
        {/* one accent cell, echoing the favicon and the social card */}
        <rect x="0" y="0" width="100" height="100" fill="var(--accent)" />
        <rect x="300" y="400" width="100" height="100" fill="var(--ink)" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-6xl font-bold text-line-2 sm:text-7xl">
          JC
        </span>
      </div>
    </div>
  );
}
