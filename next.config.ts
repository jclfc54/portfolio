import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages: `next build` emits the full site
  // into /out — point Pages at that directory (build command: npx next build).
  output: "export",
  // The default image optimizer needs a server; serve screenshots as-is.
  images: { unoptimized: true },
};

export default nextConfig;
