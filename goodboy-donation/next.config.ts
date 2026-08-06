import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    // for globals + next/font CSS
    inlineCss: true,
  },
  images: {
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920, 2048],
    formats: ["image/webp"],
  },
  compiler: {
    styledComponents: true,
  },
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./src/lib/empty-polyfill.ts",
      "next/dist/build/polyfills/polyfill-module":
        "./src/lib/empty-polyfill.ts",
    },
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "../build/polyfills/polyfill-module": false,
      "next/dist/build/polyfills/polyfill-module": false,
    };

    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: { test?: (value: string) => boolean } }) =>
        typeof rule.test !== "undefined" &&
        typeof rule.test !== "string" &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg"),
    );

    if (fileLoaderRule && typeof fileLoaderRule === "object") {
      (fileLoaderRule as { exclude?: RegExp }).exclude = /\.svg$/i;
    }

    config.module.rules.push(
      {
        test: /\.svg$/i,
        resourceQuery: /url/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    );

    return config;
  },
};

export default nextConfig;
