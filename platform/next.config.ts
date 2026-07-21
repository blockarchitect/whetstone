import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MVP is fully static per skin (generateStaticParams) — output "standalone"
  // keeps the Vercel deploy lean once Phase 5 wires in real hosting.
};

export default nextConfig;
