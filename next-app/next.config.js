/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 导出静态网站
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
