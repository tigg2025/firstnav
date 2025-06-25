import crypto from 'crypto'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 禁用可能产生大缓存文件的功能
  experimental: {
    // 全部禁用以避免大文件
  },
  
  // 图片优化配置 (Cloudflare Compatible)
  images: {
    formats: ['image/webp'], // 仅使用WebP
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Cloudflare 优化
    unoptimized: false,
    loader: 'default',
  },

  // 压缩配置
  compress: true,

  // 安全headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },

  // 重定向配置
  async redirects() {
    return [
      {
        source: '/chips',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/chip/:slug',
        destination: '/categories/:slug',
        permanent: true,
      },
    ]
  },

  // 基本配置
  poweredByHeader: false,
  generateEtags: false, // 减少缓存复杂性
  
  // Cloudflare Pages 兼容配置
  output: 'standalone',
  
  // 严格限制的 Webpack 配置
  webpack: (config, { dev, isServer }) => {
    // 生产环境严格限制
    if (!dev && !isServer) {
      // 配置缓存以避免大文件
      config.cache = {
        type: 'memory'
      };
      
      // 平衡的代码分割配置
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 500000, // 适度限制块大小 (500KB)
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
            maxSize: 800000 // 800KB限制
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            chunks: 'all',
            reuseExistingChunk: true
          }
        },
      }
    }

    // 适度的性能配置
    config.performance = {
      hints: 'warning',
      maxEntrypointSize: 1000000, // 1MB
      maxAssetSize: 1000000 // 1MB
    }

    return config
  },
}

export default nextConfig
