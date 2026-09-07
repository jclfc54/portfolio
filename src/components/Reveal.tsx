"use client";

import { useEffect, useRef, useState } from "react";

/*
  Motion tier: Subtle (skill: Scroll Reveal — 300-400ms, ease-out).
  A short fade-and-rise as a block enters the viewport, fired once and
  then disconnected. Implemented with IntersectionObserver + CSS rather
  than an animation library so it costs nothing at runtime and adds no
  dependency. prefers-reduced-motion is handled in globals.css, which
  renders .reveal in its final state.
*/
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the block is already on screen at mount, show it immediately —
    // observing it would otherwise fade in content the user is looking at.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={shown && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
