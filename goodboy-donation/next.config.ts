import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

export default nextConfig;
