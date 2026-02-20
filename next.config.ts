import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel-native: images optimized via Vercel's built-in loader
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },

  // Strict React mode for development correctness
  reactStrictMode: true,

  // Vercel-native: powered by headers in vercel.json, but these apply to `next dev` too
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],

  // [DEFERRED — see build-spec.md]
  // Serwist service worker plugin will wrap this config in V1.1.
  // Structure: `withSerwist({ swSrc, swDest, ... })(nextConfig)` — no rewrite needed,
  // just wrap the export. Keep this config object flat to enable that pattern.
};

export default nextConfig;
