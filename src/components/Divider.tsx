"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Signature element for the whole site: a hairline rule with a small
 * hollow centre dot, evoking a pitch's halfway line and centre spot.
 * Draws in once when it scrolls into view. An optional label sits
 * above it (mono, uppercase) to mark what section follows.
 */
export default function Divider({ label }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container-page py-10 sm:py-14">
      {label ? (
        <div className="label mb-4 text-center">{label}</div>
      ) : null}
      <div ref={ref} className={`halfway ${visible ? "draw" : ""}`} />
    </div>
  );
}
