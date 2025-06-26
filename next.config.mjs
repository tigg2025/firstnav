/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/firstnav',
  assetPrefix: '/firstnav/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
