import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Ensures Vercel finds the build output
  reactStrictMode: true,
};

export default nextConfig;
