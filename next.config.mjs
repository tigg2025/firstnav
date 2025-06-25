import crypto from 'crypto'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 实验性功能 (生产环境暂时禁用)
  experimental: {
    // optimizeCss: true, // 暂时禁用，可能导致构建问题
    // optimizeServerReact: true,
  },
  
  // 图片优化配置 (Cloudflare Compatible)
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
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
          // Cloudflare 特定优化
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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

  // 移除过时的配置项
  poweredByHeader: false,
  generateEtags: true,
  
  // Cloudflare Pages 兼容配置
  output: 'standalone',
  
  // 优化的 Webpack 配置
  webpack: (config, { dev, isServer, webpack }) => {
    // 生产环境优化
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000, // Cloudflare 限制考虑
        cacheGroups: {
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier())
            },
            name(module) {
              const hash = crypto.createHash('sha1')
              hash.update(module.identifier())
              return hash.digest('hex').substring(0, 8)
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      }
    }

    // 忽略大文件警告
    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }

    return config
  },
}

export default nextConfig
