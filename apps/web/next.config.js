const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@react-shop/design-system', '@react-shop/sdk'],
  eslint: {
    // Next 14's built-in lint runner is incompatible with ESLint 9; linting runs
    // as a separate task (`pnpm lint`) with a flat config. Type-checking stays on.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['@react-shop/design-system'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../../packages/design-system/src/components'),
      '@lib': path.resolve(__dirname, '../../packages/design-system/src/lib'),
      '@entities': path.resolve(__dirname, '../../packages/sdk/src/entities'),
      '@providers': path.resolve(__dirname, '../../packages/sdk/src/providers'),
      '@services': path.resolve(__dirname, '../../packages/sdk/src/services'),
      '@sdk': path.resolve(__dirname, '../../packages/sdk/src'),
    };
    return config;
  },
};

module.exports = nextConfig;
