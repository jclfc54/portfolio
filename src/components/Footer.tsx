export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-10">
      <div className="container-page flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="label">
          © {new Date().getFullYear()} Jason Cushen — built with Next.js, deployed on Cloudflare Pages
        </p>
        <div className="flex gap-5">
          <a
            href="mailto:jasoncushen1@gmail.com"
            className="label transition-colors hover:text-[var(--score)]"
          >
            Email
          </a>
          <a
            href="https://github.com/jasoncushen"
            className="label transition-colors hover:text-[var(--score)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
