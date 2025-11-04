import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

/** @type {import('next').NextConfig} */
interface WebpackCustomizer {
  (config: Configuration, ...args: unknown[]): Configuration | Promise<Configuration>;
}

interface CustomNextConfig extends NextConfig {
  serverExternalPackages?: string[];
  webpack?: WebpackCustomizer;
}

const nextConfig: CustomNextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma'],
  webpack: (config: Configuration) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true, layers: true };

    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
    });
    return config;
  },
}

module.exports = nextConfig
