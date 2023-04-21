/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Generate as a static site (or Single-Page Application)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
