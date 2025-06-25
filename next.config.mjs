/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出配置
  output: 'export',
  trailingSlash: true,
  
  // 静态导出图片配置
  images: {
    unoptimized: true, // 静态导出必须禁用图片优化
  },

  // 基本配置
  poweredByHeader: false,
  generateEtags: false,
  
  // 禁用ESLint在构建时的检查（如果有问题的话）
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript配置
  typescript: {
    ignoreBuildErrors: false,
  },

  // webpack优化
  webpack: (config, { dev, isServer }) => {
    // 生产环境优化
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            maxSize: 150000
          }
        },
      }
    }

    return config
  },
}

export default nextConfig
