import nextMDX from "@next/mdx"

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // Plugins are referenced by package name so that the options stay
    // serializable, which Turbopack (the default bundler since Next.js 16)
    // requires.
    remarkPlugins: [],
    rehypePlugins: ["rehype-slug"],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
    format: 'mdx',
  },
})

const nextConfig = {
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "numpy.org" },
      { protocol: "https", hostname: "dask.org" },
      { protocol: "https", hostname: "chainer.org" },
    ],
  },
  output: 'export'
}

export default withMDX(nextConfig)
