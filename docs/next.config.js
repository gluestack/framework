/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});
module.exports = withMDX({
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  ...nextConfig,
});

// module.exports = { nextConfig };
