export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="label rounded-sm border border-[var(--line)] px-2 py-1">
      {children}
    </span>
  );
}
