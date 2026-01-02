import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

/** @type {import('next').NextConfig} */
interface WebpackCustomizer {
  (config: Configuration, context: any): Configuration | Promise<Configuration>;
}

interface CustomNextConfig extends NextConfig {
  serverExternalPackages?: string[];
  webpack?: WebpackCustomizer;
}

const nextConfig: CustomNextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma'],
  webpack: (config: Configuration, { isServer, nextRuntime }) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true, layers: true };

    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/source",
    });

    // This is required to make Prisma work in edge functions
    if (isServer && nextRuntime === "edge") {
      config.resolve = config.resolve || {};
      config.resolve.alias = { ...config.resolve.alias, "./query_engine_bg.js": "./query_engine_bg.wasm?module" };
    }

    return config;
  },
  turbopack: {},
}

module.exports = nextConfig;