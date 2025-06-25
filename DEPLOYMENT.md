# 部署指南

本文档将指导你如何将AI芯片导航项目部署到各种平台并配置自定义域名。

## 🚀 部署平台选择

推荐的部署平台（按易用性排序）：

1. **Vercel** ⭐⭐⭐⭐⭐ (最推荐)
2. **Netlify** ⭐⭐⭐⭐
3. **GitHub Pages** ⭐⭐⭐
4. **自建服务器** ⭐⭐

## 📋 部署前准备

### 1. 确保代码质量
```bash
# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 本地构建测试
pnpm build
```

### 2. 更新配置
在部署前，请更新以下文件中的域名：

- `lib/constants.ts` - 更新 `SITE_CONFIG.url`
- `app/layout.tsx` - 更新 metadata 中的 URL
- `app/sitemap.ts` - 更新 sitemap URL
- `public/robots.txt` - 更新 sitemap URL

## 🌐 Vercel 部署（推荐）

### 方法一：GitHub 集成（推荐）

1. **推送代码到 GitHub**
```bash
git add .
git commit -m "feat: prepare for deployment"
git push origin main
```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 点击 "Deploy"

3. **配置环境变量**（如需要）
   - 在 Vercel 项目设置中添加环境变量
   - 设置 `NODE_VERSION=18`

### 方法二：CLI 部署

1. **安装 Vercel CLI**
```bash
npm i -g vercel
```

2. **登录并部署**
```bash
vercel login
vercel --prod
```

### 自定义域名配置
1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的域名
3. 配置 DNS 记录指向 Vercel

## 🔷 Netlify 部署

### 方法一：Git 集成

1. **连接 Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 点击 "New site from Git"
   - 选择 GitHub 并授权
   - 选择你的仓库

2. **配置构建设置**
   - Build command: `pnpm build`
   - Publish directory: `.next`
   - Node version: `18`

### 方法二：CLI 部署

1. **安装 Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **登录并部署**
```bash
netlify login
netlify init
netlify deploy --prod
```

## 📄 GitHub Pages 部署

GitHub Pages 需要静态导出：

1. **修改 next.config.mjs**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

2. **创建 GitHub Actions 工作流**
创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Build
      run: pnpm build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

3. **启用 GitHub Pages**
   - 在仓库设置中启用 GitHub Pages
   - 选择 "GitHub Actions" 作为源

## 🖥️ 自建服务器部署

### Docker 部署

1. **创建 Dockerfile**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm install -g pnpm && pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

2. **构建和运行**
```bash
docker build -t ai-chip-navigator .
docker run -p 3000:3000 ai-chip-navigator
```

### PM2 部署

1. **安装 PM2**
```bash
npm install -g pm2
```

2. **创建 ecosystem.config.js**
```javascript
module.exports = {
  apps: [{
    name: 'ai-chip-navigator',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

3. **部署**
```bash
pnpm build
pm2 start ecosystem.config.js
```

## 🌍 域名配置

### DNS 配置示例

对于自定义域名 `example.com`：

#### A 记录配置
```
Type: A
Name: @
Value: [服务器IP地址]
TTL: 3600
```

#### CNAME 配置（适用于子域名）
```
Type: CNAME
Name: www
Value: your-app.vercel.app
TTL: 3600
```

#### Vercel 域名配置
```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME 
Name: www
Value: cname.vercel-dns.com
```

#### Netlify 域名配置
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www  
Value: your-site-name.netlify.app
```

### SSL 证书

大多数现代部署平台会自动提供 Let's Encrypt SSL 证书：

- ✅ Vercel: 自动配置
- ✅ Netlify: 自动配置  
- ✅ GitHub Pages: 自动配置
- ⚠️ 自建服务器: 需要手动配置

## 🔧 环境变量

在生产环境中，你可能需要配置以下环境变量：

```bash
# 基本配置
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# 分析工具
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_GTAG_ID=your-gtag-id

# API 密钥（如需要）
API_KEY=your-api-key
DATABASE_URL=your-database-url
```

## 📊 性能监控

部署后建议配置：

1. **Google Analytics** - 网站分析
2. **Google Search Console** - SEO 监控
3. **Vercel Analytics** - 性能监控
4. **Sentry** - 错误监控

## 🚀 部署检查清单

部署前确保：

- [ ] 代码通过所有检查（`pnpm type-check`, `pnpm lint`）
- [ ] 本地构建成功（`pnpm build`）
- [ ] 更新了所有配置文件中的域名
- [ ] 配置了适当的环境变量
- [ ] 测试了所有主要功能
- [ ] 配置了错误监控
- [ ] 设置了备份策略

## 🔄 持续部署

建议设置 CI/CD 流程：

1. **代码推送到 main 分支**
2. **自动运行测试**
3. **自动构建和部署**
4. **发送部署通知**

大多数平台都支持 Git 集成的自动部署。

---

选择最适合你需求的部署方式。如果是个人项目或小型团队，推荐使用 Vercel。如果需要更多控制，可以选择自建服务器。 