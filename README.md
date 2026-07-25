# Portfolio — Jason Cushen

Personal portfolio site. Next.js 16 + TypeScript + Tailwind v4, built to deploy on Cloudflare Pages.

## Where everything lives

| What | File |
|---|---|
| Project content (all case studies) | `src/data/projects.ts` |
| About page (bio, education, experience, certs) | `src/app/about/page.tsx` |
| Contact links | `src/app/contact/page.tsx` |
| Nav / footer links | `src/components/Nav.tsx`, `src/components/Footer.tsx` |
| Site title / meta description | `src/app/layout.tsx` |
| Colours, fonts, the "halfway line" divider style | `src/app/globals.css` |

The case-study copy in `src/data/projects.ts` and the bio in the About page are first drafts — read through and rewrite anything that doesn't sound like you.

## Remaining personal touches

- **CV** — put your CV PDF at `public/cv.pdf`; the "Download CV" buttons already link there.
- **Screenshots** — drop images into `public/projects/<slug>/` and list them in that project's `images` array in `src/data/projects.ts`; they'll render on the case-study page automatically.
- **LinkedIn** — add your profile URL in `src/app/contact/page.tsx` and `src/components/Footer.tsx`.
- **Details** — degree classification and placement dates in `src/app/about/page.tsx` (both hidden until filled in), plus GitHub/live links per project in `src/data/projects.ts`.

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deploy (Cloudflare Pages)

1. In the Cloudflare dashboard: Workers & Pages → Create → Pages → Connect to Git → select this repo.
2. Build command: `npm run build`. Cloudflare Pages auto-detects Next.js and configures the adapter.
3. Add a custom domain once deployed, if you have one.
