import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // Legacy Dutch URLs → new English routes
      { source: "/cases", destination: "/my-work", permanent: true },
      { source: "/freelance-sea-specialist", destination: "/audit", permanent: true },
      // /tooling and /audit are real pages now — previous redirects removed
    ];
  },
};

export default nextConfig;
