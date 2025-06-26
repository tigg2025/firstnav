/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const isExport = process.env.NEXT_EXPORT === 'true'

const nextConfig = {
  // 生产环境且导出时才启用静态导出
  ...(isProd && isExport && {
    output: 'export',
    trailingSlash: true,
    // GitHub Pages配置 - 为仓库名添加basePath
    assetPrefix: '/firstnav',
    basePath: '/firstnav',
  }),
  
  // 图片配置
  images: {
    // 静态导出时必须禁用图片优化，开发时可以启用
    unoptimized: isProd && isExport,
  },

  // 基本配置
  poweredByHeader: false,
  generateEtags: false,
  
  // ESLint配置
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
    if (!dev && isProd) {
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
