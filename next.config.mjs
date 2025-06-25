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
  
  // Cloudflare Pages 优化配置
  webpack: (config, { dev, isServer }) => {
    // 完全禁用文件系统缓存
    config.cache = false;
    
    if (!dev) {
      // 简化的代码分割配置
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 30000,
        maxSize: 244000, // 接近但小于25MB/100的安全值
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            maxSize: 200000 // 200KB限制
          }
        },
      }
    }

    // 禁用性能提示以避免构建失败
    config.performance = false;

    return config
  },
}

export default nextConfig
