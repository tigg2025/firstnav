/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  // Remove basePath for root domain deployment
  // basePath and assetPrefix are only needed for subdirectory deployment
};

export default nextConfig;
