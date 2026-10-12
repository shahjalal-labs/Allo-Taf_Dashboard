import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
    ],
  },
  async rewrites() {
    return [
      {
        // All RTK Query requests go to /api/proxy/<path>
        // Next.js rewrites them server-side to the real backend — no browser CORS
        source: "/api/proxy/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}:path*`,
      },
    ];
  },
};

export default nextConfig;
