import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // A stray lockfile higher up the tree would otherwise be picked as the workspace root.
  turbopack: { root: __dirname },
};

export default nextConfig;
