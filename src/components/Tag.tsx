/*
  Stack chips. Mono, tight radius, faint blue fill — they read as data
  labels rather than buttons, so they are never mistaken for controls.
  whitespace-nowrap stops multi-word entries ("Cloudflare Stream")
  breaking across lines inside the chip.
*/
export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block whitespace-nowrap rounded-[3px] border border-line bg-surface-2 px-2 py-1 font-mono text-[0.7rem] leading-none tracking-wide text-ink-2">
      {children}
    </span>
  );
}
