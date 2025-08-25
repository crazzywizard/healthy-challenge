import type { NextConfig } from 'next';

const baseConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

// In development, use base config
// In production, PWA will be handled by the build process
const nextConfig = baseConfig;

export default nextConfig;
