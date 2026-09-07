import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { siteUrl } from "@/data/profile";
import "./globals.css";

/*
  Fonts are downloaded and self-hosted at build time by next/font, so there
  are no third-party requests at runtime and no layout shift: Next generates
  a size-adjusted local fallback for each face.
*/
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-src",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-src",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-src",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jason Cushen — Software Engineer",
    template: "%s — Jason Cushen",
  },
  description:
    "Portfolio of Jason Cushen — software engineer building data-driven sports analytics tools. Projects, case studies, experience and education.",
  openGraph: {
    title: "Jason Cushen — Software Engineer",
    description:
      "Software engineer building data-driven sports analytics tools. Projects, case studies, experience and education.",
    url: siteUrl,
    siteName: "Jason Cushen",
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jason Cushen — Software Engineer",
    description:
      "Software engineer building data-driven sports analytics tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
